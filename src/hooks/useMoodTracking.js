import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { moodService } from '../services/moodService';
import { aiService } from '../services/aiService';

export const useMoodTracking = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentMoods, setRecentMoods] = useState([]);
  const [moodStats, setMoodStats] = useState(null);
  const [insights, setInsights] = useState(null);

  // Load recent mood data
  useEffect(() => {
    if (user) {
      loadRecentMoods();
      loadMoodStats();
    }
  }, [user]);

  const loadRecentMoods = async () => {
    try {
      const moods = await moodService.getMoodCheckIns(user.id, { limit: 10 });
      setRecentMoods(moods);
    } catch (error) {
      console.error('Error loading recent moods:', error);
      setError('Failed to load mood history');
    }
  };

  const loadMoodStats = async () => {
    try {
      const stats = await moodService.getMoodStats(user.id, 30);
      setMoodStats(stats);
    } catch (error) {
      console.error('Error loading mood stats:', error);
    }
  };

  const submitMoodCheckIn = async (moodData) => {
    setLoading(true);
    setError(null);

    try {
      // Generate AI analysis
      const aiAnalysis = await generateMoodAnalysis(moodData);

      // Create mood check-in with AI analysis
      const checkIn = await moodService.createMoodCheckIn({
        userId: user.id,
        moodEmoji: moodData.emoji,
        moodLabel: moodData.label,
        intensity: moodData.intensity,
        contexts: moodData.contexts,
        notes: moodData.notes,
        aiAnalysis,
        isCrisisDetected: aiAnalysis.crisisDetected
      });

      // Update local state
      setRecentMoods(prev => [checkIn, ...prev.slice(0, 9)]);
      
      // Reload stats
      await loadMoodStats();

      return checkIn;
    } catch (error) {
      console.error('Error submitting mood check-in:', error);
      setError('Failed to save mood check-in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateMoodAnalysis = async (moodData) => {
    try {
      // Simple analysis based on mood data
      const analysis = {
        emotion: moodData.label,
        intensity: moodData.intensity,
        contexts: moodData.contexts,
        timestamp: new Date().toISOString(),
        crisisDetected: false,
        recommendations: []
      };

      // Check for crisis indicators
      if (moodData.intensity >= 8 && ['sad', 'anxious', 'overwhelmed'].includes(moodData.label.toLowerCase())) {
        analysis.crisisDetected = true;
        analysis.recommendations.push('Consider reaching out to a mental health professional');
        analysis.recommendations.push('Try calming activities from our activities hub');
        analysis.recommendations.push('Contact your support network');
      } else if (moodData.intensity >= 6) {
        analysis.recommendations.push('Try some calming activities to help manage your emotions');
        analysis.recommendations.push('Consider talking to someone you trust');
      } else {
        analysis.recommendations.push('Keep up the good work with your emotional awareness');
        analysis.recommendations.push('Continue with your self-care practices');
      }

      // Add context-specific recommendations
      if (moodData.contexts.includes('work')) {
        analysis.recommendations.push('Consider taking breaks during work to manage stress');
      }
      if (moodData.contexts.includes('sleep')) {
        analysis.recommendations.push('Focus on good sleep hygiene practices');
      }

      return analysis;
    } catch (error) {
      console.error('Error generating mood analysis:', error);
      return {
        emotion: moodData.label,
        intensity: moodData.intensity,
        crisisDetected: false,
        recommendations: ['Continue tracking your mood regularly'],
        error: 'Analysis temporarily unavailable'
      };
    }
  };

  const generateInsights = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const insights = await aiService.generateMoodInsights(user.id);
      setInsights(insights);
      return insights;
    } catch (error) {
      console.error('Error generating insights:', error);
      setError('Failed to generate insights');
    } finally {
      setLoading(false);
    }
  };

  const getMoodTrends = (days = 7) => {
    if (!recentMoods.length) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return recentMoods
      .filter(mood => new Date(mood.created_at) >= cutoffDate)
      .map(mood => ({
        date: mood.created_at.split('T')[0],
        intensity: mood.intensity,
        mood: mood.mood_label,
        emoji: mood.mood_emoji
      }))
      .reverse();
  };

  const getLatestMood = () => {
    return recentMoods.length > 0 ? recentMoods[0] : null;
  };

  const getMoodDistribution = () => {
    if (!moodStats) return {};
    return moodStats.moodDistribution;
  };

  const getAverageIntensity = () => {
    if (!moodStats) return 0;
    return moodStats.averageIntensity;
  };

  const getTrendDirection = () => {
    if (!moodStats) return 'stable';
    return moodStats.recentTrend;
  };

  return {
    // State
    loading,
    error,
    recentMoods,
    moodStats,
    insights,

    // Actions
    submitMoodCheckIn,
    generateInsights,
    loadRecentMoods,
    loadMoodStats,

    // Computed values
    getMoodTrends,
    getLatestMood,
    getMoodDistribution,
    getAverageIntensity,
    getTrendDirection,

    // Helpers
    hasRecentMoods: recentMoods.length > 0,
    needsCheckIn: !recentMoods.length || 
      (new Date() - new Date(recentMoods[0]?.created_at)) > 24 * 60 * 60 * 1000
  };
};
