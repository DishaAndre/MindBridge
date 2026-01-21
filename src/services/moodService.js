import { supabase, TABLES } from '../lib/supabase';

export const moodService = {
  // Create a new mood check-in
  async createMoodCheckIn(moodData) {
    const { data, error } = await supabase
      .from(TABLES.MOOD_CHECKINS)
      .insert({
        user_id: moodData.userId,
        mood_emoji: moodData.moodEmoji,
        mood_label: moodData.moodLabel,
        intensity: moodData.intensity,
        contexts: moodData.contexts || [],
        notes: moodData.notes,
        ai_analysis: moodData.aiAnalysis,
        is_crisis_detected: moodData.isCrisisDetected || false,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get mood check-ins for a user
  async getMoodCheckIns(userId, options = {}) {
    let query = supabase
      .from(TABLES.MOOD_CHECKINS)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.startDate) {
      query = query.gte('created_at', options.startDate);
    }

    if (options.endDate) {
      query = query.lte('created_at', options.endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Get mood statistics
  async getMoodStats(userId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from(TABLES.MOOD_CHECKINS)
      .select('mood_label, intensity, created_at')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString());

    if (error) throw error;

    // Calculate statistics
    const stats = {
      totalCheckIns: data.length,
      averageIntensity: 0,
      moodDistribution: {},
      recentTrend: 'stable'
    };

    if (data.length > 0) {
      stats.averageIntensity = data.reduce((sum, item) => sum + item.intensity, 0) / data.length;
      
      // Calculate mood distribution
      data.forEach(item => {
        stats.moodDistribution[item.mood_label] = (stats.moodDistribution[item.mood_label] || 0) + 1;
      });

      // Calculate trend (simple comparison of first and last week)
      if (data.length >= 7) {
        const recentWeek = data.slice(0, 7);
        const previousWeek = data.slice(-7);
        const recentAvg = recentWeek.reduce((sum, item) => sum + item.intensity, 0) / recentWeek.length;
        const previousAvg = previousWeek.reduce((sum, item) => sum + item.intensity, 0) / previousWeek.length;
        
        if (recentAvg > previousAvg + 0.5) {
          stats.recentTrend = 'improving';
        } else if (recentAvg < previousAvg - 0.5) {
          stats.recentTrend = 'declining';
        }
      }
    }

    return stats;
  },

  // Get mood patterns using AI analysis
  async analyzeMoodPatterns(userId) {
    const { data, error } = await supabase
      .rpc('analyze_mood_patterns', { user_id: userId });

    if (error) throw error;
    return data;
  },

  // Update mood check-in
  async updateMoodCheckIn(checkInId, updates) {
    const { data, error } = await supabase
      .from(TABLES.MOOD_CHECKINS)
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', checkInId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete mood check-in
  async deleteMoodCheckIn(checkInId) {
    const { error } = await supabase
      .from(TABLES.MOOD_CHECKINS)
      .delete()
      .eq('id', checkInId);

    if (error) throw error;
  }
};
