import { supabase, TABLES } from '../lib/supabase';
import { emailService } from './emailService';

export const alertService = {
  // Create an alert
  async createAlert(alertData) {
    const { data, error } = await supabase
      .from(TABLES.ALERTS)
      .insert({
        individual_id: alertData.individualId,
        caregiver_id: alertData.caregiverId,
        alert_type: alertData.alertType,
        priority: alertData.priority,
        title: alertData.title,
        description: alertData.description,
        data: alertData.data || {},
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Send email notification for high priority alerts
    if (alertData.priority === 'critical' || alertData.priority === 'high') {
      await this.sendAlertNotification(data);
    }

    return data;
  },

  // Get alerts for a caregiver
  async getCaregiverAlerts(caregiverId, options = {}) {
    let query = supabase
      .from(TABLES.ALERTS)
      .select(`
        *,
        user_profiles!alerts_individual_id_fkey (
          first_name,
          last_name,
          avatar_url
        )
      `)
      .eq('caregiver_id', caregiverId)
      .order('created_at', { ascending: false });

    if (options.unacknowledged) {
      query = query.eq('is_acknowledged', false);
    }

    if (options.priority) {
      query = query.eq('priority', options.priority);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Get alerts for an individual
  async getIndividualAlerts(individualId, options = {}) {
    let query = supabase
      .from(TABLES.ALERTS)
      .select('*')
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false });

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Acknowledge an alert
  async acknowledgeAlert(alertId, acknowledgedBy) {
    const { data, error } = await supabase
      .from(TABLES.ALERTS)
      .update({
        is_acknowledged: true,
        acknowledged_at: new Date().toISOString(),
        acknowledged_by: acknowledgedBy
      })
      .eq('id', alertId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Send alert notification via email
  async sendAlertNotification(alert) {
    try {
      if (!alert.caregiver_id) return;

      // Get caregiver email
      const { data: caregiver, error } = await supabase
        .from('caregiver_profiles')
        .select(`
          *,
          users!caregiver_profiles_user_id_fkey (email, first_name, last_name)
        `)
        .eq('user_id', alert.caregiver_id)
        .single();

      if (error || !caregiver) return;

      // Get individual name
      const { data: individual } = await supabase
        .from('user_profiles')
        .select('first_name, last_name')
        .eq('user_id', alert.individual_id)
        .single();

      const individualName = individual 
        ? `${individual.first_name} ${individual.last_name}`
        : 'Individual under your care';

      await emailService.sendAlertEmail({
        to: caregiver.users.email,
        caregiverName: `${caregiver.users.first_name} ${caregiver.users.last_name}`,
        individualName,
        alertType: alert.alert_type,
        priority: alert.priority,
        title: alert.title,
        description: alert.description,
        timestamp: alert.created_at
      });

    } catch (error) {
      console.error('Error sending alert notification:', error);
    }
  },

  // Monitor mood patterns and create alerts
  async checkMoodPatterns(userId) {
    try {
      // Get recent mood check-ins
      const recentMoods = await supabase
        .from(TABLES.MOOD_CHECKINS)
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      if (recentMoods.data.length < 3) return;

      const moods = recentMoods.data;
      
      // Check for concerning patterns
      const alerts = [];

      // Pattern 1: Consistently high intensity (>= 8) for 3+ days
      const highIntensityMoods = moods.filter(m => m.intensity >= 8);
      if (highIntensityMoods.length >= 3) {
        alerts.push({
          type: 'mood_decline',
          priority: 'high',
          title: 'High Stress Pattern Detected',
          description: `${highIntensityMoods.length} high-intensity mood entries in the past week`,
          data: { pattern: 'high_intensity', count: highIntensityMoods.length }
        });
      }

      // Pattern 2: Declining trend over time
      if (moods.length >= 5) {
        const recent = moods.slice(0, 3).reduce((sum, m) => sum + m.intensity, 0) / 3;
        const older = moods.slice(-3).reduce((sum, m) => sum + m.intensity, 0) / 3;
        
        if (recent < older - 2) {
          alerts.push({
            type: 'mood_decline',
            priority: 'medium',
            title: 'Declining Mood Trend',
            description: `Mood intensity has decreased from ${older.toFixed(1)} to ${recent.toFixed(1)}`,
            data: { pattern: 'declining_trend', recent_avg: recent, previous_avg: older }
          });
        }
      }

      // Pattern 3: No check-ins for 3+ days
      const lastCheckIn = new Date(moods[0].created_at);
      const daysSinceLastCheckIn = (Date.now() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceLastCheckIn >= 3) {
        alerts.push({
          type: 'missed_checkin',
          priority: 'medium',
          title: 'Missed Check-ins',
          description: `No mood check-ins for ${Math.floor(daysSinceLastCheckIn)} days`,
          data: { pattern: 'missed_checkins', days: Math.floor(daysSinceLastCheckIn) }
        });
      }

      // Create alerts for caregivers
      for (const alertData of alerts) {
        await this.createAlertsForCaregivers(userId, alertData);
      }

      return alerts;

    } catch (error) {
      console.error('Error checking mood patterns:', error);
      return [];
    }
  },

  // Create alerts for all caregivers of an individual
  async createAlertsForCaregivers(individualId, alertData) {
    try {
      // Get caregivers for this individual
      const { data: relationships } = await supabase
        .from(TABLES.CAREGIVER_RELATIONSHIPS)
        .select('caregiver_id')
        .eq('individual_id', individualId)
        .eq('status', 'active');

      if (!relationships || relationships.length === 0) return;

      // Create alert for each caregiver
      for (const relationship of relationships) {
        await this.createAlert({
          individualId,
          caregiverId: relationship.caregiver_id,
          alertType: alertData.type,
          priority: alertData.priority,
          title: alertData.title,
          description: alertData.description,
          data: alertData.data
        });
      }

    } catch (error) {
      console.error('Error creating alerts for caregivers:', error);
    }
  },

  // Subscribe to real-time alerts
  subscribeToAlerts(caregiverId, callback) {
    return supabase
      .channel(`alerts:${caregiverId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.ALERTS,
          filter: `caregiver_id=eq.${caregiverId}`
        },
        callback
      )
      .subscribe();
  },

  // Get alert statistics
  async getAlertStats(caregiverId) {
    const { data, error } = await supabase
      .from(TABLES.ALERTS)
      .select('priority, is_acknowledged, created_at')
      .eq('caregiver_id', caregiverId)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (error) throw error;

    const stats = {
      total: data.length,
      unacknowledged: data.filter(a => !a.is_acknowledged).length,
      critical: data.filter(a => a.priority === 'critical').length,
      high: data.filter(a => a.priority === 'high').length,
      medium: data.filter(a => a.priority === 'medium').length,
      low: data.filter(a => a.priority === 'low').length
    };

    return stats;
  }
};
