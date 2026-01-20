import { supabase, TABLES } from '../lib/supabase';
import { alertService } from './alertService';
import { moodService } from './moodService';

export const caregiverService = {
  // Get individuals under caregiver's care
  async getCaregiverIndividuals(caregiverId) {
    const { data, error } = await supabase
      .from(TABLES.CAREGIVER_RELATIONSHIPS)
      .select(`
        *,
        user_profiles!caregiver_relationships_individual_id_fkey (
          user_id,
          first_name,
          last_name,
          avatar_url,
          date_of_birth,
          cognitive_disability_type,
          emergency_contacts
        )
      `)
      .eq('caregiver_id', caregiverId)
      .eq('status', 'active');

    if (error) throw error;

    // Get latest mood data for each individual
    const individualsWithMoodData = await Promise.all(
      data.map(async (relationship) => {
        const individual = relationship.user_profiles;
        
        // Get latest mood check-in
        const latestMood = await moodService.getMoodCheckIns(individual.user_id, { limit: 1 });
        
        // Get mood stats
        const moodStats = await moodService.getMoodStats(individual.user_id, 7);
        
        // Get unacknowledged alerts count
        const { data: alerts } = await supabase
          .from(TABLES.ALERTS)
          .select('id')
          .eq('individual_id', individual.user_id)
          .eq('caregiver_id', caregiverId)
          .eq('is_acknowledged', false);

        return {
          ...relationship,
          individual: {
            ...individual,
            latestMood: latestMood[0] || null,
            moodStats,
            unacknowledgedAlerts: alerts?.length || 0
          }
        };
      })
    );

    return individualsWithMoodData;
  },

  // Get detailed individual data for caregiver dashboard
  async getIndividualDetails(caregiverId, individualId) {
    // Verify caregiver has access to this individual
    const { data: relationship, error: relationshipError } = await supabase
      .from(TABLES.CAREGIVER_RELATIONSHIPS)
      .select('*')
      .eq('caregiver_id', caregiverId)
      .eq('individual_id', individualId)
      .eq('status', 'active')
      .single();

    if (relationshipError || !relationship) {
      throw new Error('Access denied or relationship not found');
    }

    // Get individual profile
    const { data: individual, error: individualError } = await supabase
      .from(TABLES.USER_PROFILES)
      .select('*')
      .eq('user_id', individualId)
      .single();

    if (individualError) throw individualError;

    // Get mood data
    const recentMoods = await moodService.getMoodCheckIns(individualId, { limit: 30 });
    const moodStats = await moodService.getMoodStats(individualId, 30);

    // Get recent alerts
    const recentAlerts = await alertService.getCaregiverAlerts(caregiverId, { 
      limit: 10,
      individualId 
    });

    // Get recent chat activity
    const { data: recentChats } = await supabase
      .from(TABLES.CHAT_SESSIONS)
      .select('*')
      .eq('user_id', individualId)
      .order('started_at', { ascending: false })
      .limit(5);

    // Get activity completions
    const { data: recentActivities } = await supabase
      .from(TABLES.ACTIVITY_COMPLETIONS)
      .select(`
        *,
        activities (title, category)
      `)
      .eq('user_id', individualId)
      .order('completed_at', { ascending: false })
      .limit(10);

    return {
      individual,
      relationship,
      moodData: {
        recent: recentMoods,
        stats: moodStats
      },
      alerts: recentAlerts,
      chatActivity: recentChats,
      activityCompletions: recentActivities
    };
  },

  // Create caregiver relationship (invitation system)
  async inviteIndividual(caregiverId, invitationData) {
    const { data, error } = await supabase
      .from('caregiver_invitations')
      .insert({
        caregiver_id: caregiverId,
        individual_email: invitationData.email,
        relationship_type: invitationData.relationshipType,
        message: invitationData.message,
        status: 'pending',
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      })
      .select()
      .single();

    if (error) throw error;

    // Send invitation email
    // TODO: Implement invitation email

    return data;
  },

  // Accept caregiver invitation
  async acceptInvitation(individualId, invitationId) {
    // Get invitation details
    const { data: invitation, error: invitationError } = await supabase
      .from('caregiver_invitations')
      .select('*')
      .eq('id', invitationId)
      .eq('status', 'pending')
      .single();

    if (invitationError || !invitation) {
      throw new Error('Invitation not found or already processed');
    }

    // Check if invitation is expired
    if (new Date(invitation.expires_at) < new Date()) {
      throw new Error('Invitation has expired');
    }

    // Create caregiver relationship
    const { data: relationship, error: relationshipError } = await supabase
      .from(TABLES.CAREGIVER_RELATIONSHIPS)
      .insert({
        caregiver_id: invitation.caregiver_id,
        individual_id: individualId,
        relationship_type: invitation.relationship_type,
        status: 'active',
        permissions: {
          view_mood_data: true,
          receive_alerts: true,
          view_chat_summaries: false, // Default to false for privacy
          view_activity_data: true
        },
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (relationshipError) throw relationshipError;

    // Update invitation status
    await supabase
      .from('caregiver_invitations')
      .update({ 
        status: 'accepted',
        accepted_at: new Date().toISOString()
      })
      .eq('id', invitationId);

    return relationship;
  },

  // Update caregiver relationship permissions
  async updateRelationshipPermissions(caregiverId, individualId, permissions) {
    const { data, error } = await supabase
      .from(TABLES.CAREGIVER_RELATIONSHIPS)
      .update({
        permissions,
        updated_at: new Date().toISOString()
      })
      .eq('caregiver_id', caregiverId)
      .eq('individual_id', individualId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get communication log between caregiver and individual
  async getCommunicationLog(caregiverId, individualId, limit = 20) {
    const { data, error } = await supabase
      .from('communication_logs')
      .select('*')
      .eq('caregiver_id', caregiverId)
      .eq('individual_id', individualId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Add communication log entry
  async addCommunicationLog(caregiverId, individualId, logData) {
    const { data, error } = await supabase
      .from('communication_logs')
      .insert({
        caregiver_id: caregiverId,
        individual_id: individualId,
        communication_type: logData.type,
        content: logData.content,
        duration_seconds: logData.durationSeconds,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get caregiver dashboard summary
  async getDashboardSummary(caregiverId) {
    try {
      // Get all individuals under care
      const individuals = await this.getCaregiverIndividuals(caregiverId);

      // Get alert statistics
      const alertStats = await alertService.getAlertStats(caregiverId);

      // Calculate summary statistics
      const summary = {
        totalIndividuals: individuals.length,
        individualsNeedingAttention: individuals.filter(i => 
          i.individual.unacknowledgedAlerts > 0 || 
          (i.individual.latestMood && i.individual.latestMood.intensity >= 8)
        ).length,
        totalUnacknowledgedAlerts: alertStats.unacknowledged,
        criticalAlerts: alertStats.critical,
        recentActivity: {
          moodCheckIns: 0,
          chatSessions: 0,
          activitiesCompleted: 0
        }
      };

      // Get recent activity counts
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      
      for (const individual of individuals) {
        const individualId = individual.individual.user_id;
        
        // Count recent mood check-ins
        const { data: recentMoods } = await supabase
          .from(TABLES.MOOD_CHECKINS)
          .select('id')
          .eq('user_id', individualId)
          .gte('created_at', last24Hours);
        
        summary.recentActivity.moodCheckIns += recentMoods?.length || 0;

        // Count recent chat sessions
        const { data: recentChats } = await supabase
          .from(TABLES.CHAT_SESSIONS)
          .select('id')
          .eq('user_id', individualId)
          .gte('started_at', last24Hours);
        
        summary.recentActivity.chatSessions += recentChats?.length || 0;

        // Count recent activity completions
        const { data: recentActivities } = await supabase
          .from(TABLES.ACTIVITY_COMPLETIONS)
          .select('id')
          .eq('user_id', individualId)
          .gte('completed_at', last24Hours);
        
        summary.recentActivity.activitiesCompleted += recentActivities?.length || 0;
      }

      return {
        summary,
        individuals,
        alertStats
      };

    } catch (error) {
      console.error('Error getting dashboard summary:', error);
      throw error;
    }
  },

  // Get mood trends for all individuals under care
  async getMoodTrends(caregiverId, days = 30) {
    const individuals = await this.getCaregiverIndividuals(caregiverId);
    const trends = {};

    for (const individual of individuals) {
      const individualId = individual.individual.user_id;
      const moodData = await moodService.getMoodCheckIns(individualId, { 
        limit: days,
        startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
      });

      trends[individualId] = {
        name: `${individual.individual.first_name} ${individual.individual.last_name}`,
        data: moodData.map(mood => ({
          date: mood.created_at.split('T')[0],
          intensity: mood.intensity,
          mood: mood.mood_label
        }))
      };
    }

    return trends;
  },

  // Subscribe to real-time updates for caregiver
  subscribeToUpdates(caregiverId, callbacks) {
    const subscriptions = [];

    // Subscribe to alerts
    if (callbacks.onAlert) {
      subscriptions.push(
        alertService.subscribeToAlerts(caregiverId, callbacks.onAlert)
      );
    }

    // Subscribe to mood check-ins for all individuals
    if (callbacks.onMoodUpdate) {
      // This would require a more complex setup to monitor all individuals
      // For now, we'll implement polling or manual refresh
    }

    return {
      unsubscribe: () => {
        subscriptions.forEach(sub => sub.unsubscribe());
      }
    };
  }
};
