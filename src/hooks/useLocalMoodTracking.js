import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * localStorage-based mood tracking for hackathon demo
 * This provides real data-driven functionality without backend dependency
 */
export const useLocalMoodTracking = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);

  // Load mood entries from localStorage
  useEffect(() => {
    if (user) {
      loadMoodEntries();
    }
  }, [user]);

  const loadMoodEntries = () => {
    try {
      const stored = localStorage.getItem(`moodEntries_${user?.id || 'demo'}`);
      const entries = stored ? JSON.parse(stored) : [];
      setMoodEntries(entries);
    } catch (error) {
      console.error('Error loading mood entries:', error);
      setMoodEntries([]);
    }
  };

  const saveMoodEntries = (entries) => {
    try {
      localStorage.setItem(`moodEntries_${user?.id || 'demo'}`, JSON.stringify(entries));
      setMoodEntries(entries);
    } catch (error) {
      console.error('Error saving mood entries:', error);
    }
  };

  const submitMoodCheckIn = async (moodData) => {
    setLoading(true);
    setError(null);

    try {
      // Create new mood entry
      const newEntry = {
        id: Date.now().toString(),
        userId: user?.id || 'demo',
        moodEmoji: moodData.emoji,
        moodLabel: moodData.label,
        intensity: moodData.intensity,
        contexts: moodData.contexts || [],
        notes: moodData.notes || '',
        created_at: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        timestamp: Date.now()
      };

      // Generate simple AI analysis
      const aiAnalysis = generateMoodAnalysis(moodData);
      newEntry.aiAnalysis = aiAnalysis;
      newEntry.isCrisisDetected = aiAnalysis.crisisDetected;

      // Add to entries (newest first)
      const updatedEntries = [newEntry, ...moodEntries];
      saveMoodEntries(updatedEntries);

      return newEntry;
    } catch (error) {
      console.error('Error submitting mood check-in:', error);
      setError('Failed to save mood check-in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const generateMoodAnalysis = (moodData) => {
    const analysis = {
      emotion: moodData.label,
      intensity: moodData.intensity,
      contexts: moodData.contexts || [],
      timestamp: new Date().toISOString(),
      crisisDetected: false,
      recommendations: []
    };

    // Crisis detection logic
    if (moodData.intensity >= 8 && ['sad', 'anxious', 'overwhelmed', 'angry'].includes(moodData.label.toLowerCase())) {
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

    return analysis;
  };

  // COMPUTED METRICS (This is the key part!)
  const getTotalCheckIns = () => {
    return moodEntries.length;
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.intensity, 0);
    return (sum / moodEntries.length).toFixed(1);
  };

  const getDayStreak = () => {
    if (moodEntries.length === 0) return 0;

    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    // Check each day backwards from today
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasEntryForDate = moodEntries.some(entry => entry.date === dateStr);
      
      if (hasEntryForDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const getBadgesEarned = () => {
    const total = getTotalCheckIns();
    const streak = getDayStreak();
    const avgMood = parseFloat(getAverageMood());
    
    let badges = 0;
    
    // Badge criteria
    if (total >= 1) badges++; // First check-in
    if (total >= 7) badges++; // Week warrior
    if (total >= 30) badges++; // Month master
    if (streak >= 3) badges++; // Streak starter
    if (streak >= 7) badges++; // Week streak
    if (streak >= 30) badges++; // Month streak
    if (avgMood >= 7) badges++; // Positive vibes
    if (total >= 100) badges++; // Century club
    
    return badges;
  };

  const getRecentMoods = (limit = 10) => {
    return moodEntries.slice(0, limit);
  };

  const getMoodTrends = (days = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return moodEntries
      .filter(entry => new Date(entry.created_at) >= cutoffDate)
      .map(entry => ({
        date: entry.date,
        intensity: entry.intensity,
        mood: entry.moodLabel,
        emoji: entry.moodEmoji
      }))
      .reverse(); // Oldest first for charts
  };

  const getMoodDistribution = () => {
    if (moodEntries.length === 0) return {};

    const distribution = {};
    moodEntries.forEach(entry => {
      const mood = entry.moodLabel;
      distribution[mood] = (distribution[mood] || 0) + 1;
    });

    return distribution;
  };

  const getWeeklyData = () => {
    const weeks = {};
    moodEntries.forEach(entry => {
      const date = new Date(entry.created_at);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = { total: 0, sum: 0, count: 0 };
      }
      weeks[weekKey].sum += entry.intensity;
      weeks[weekKey].count += 1;
      weeks[weekKey].average = weeks[weekKey].sum / weeks[weekKey].count;
    });

    return Object.entries(weeks)
      .map(([week, data]) => ({
        week,
        average: data.average.toFixed(1),
        count: data.count
      }))
      .sort((a, b) => new Date(a.week) - new Date(b.week));
  };

  const getLatestMood = () => {
    return moodEntries.length > 0 ? moodEntries[0] : null;
  };

  const needsCheckIn = () => {
    if (moodEntries.length === 0) return true;
    
    const latest = moodEntries[0];
    const latestDate = new Date(latest.created_at);
    const now = new Date();
    const hoursSinceLastCheckIn = (now - latestDate) / (1000 * 60 * 60);
    
    return hoursSinceLastCheckIn >= 12; // Suggest check-in every 12 hours
  };

  return {
    // State
    loading,
    error,
    moodEntries,

    // Actions
    submitMoodCheckIn,
    loadMoodEntries,

    // Real computed metrics (THE KEY PART!)
    getTotalCheckIns,
    getAverageMood,
    getDayStreak,
    getBadgesEarned,
    getRecentMoods,
    getMoodTrends,
    getMoodDistribution,
    getWeeklyData,
    getLatestMood,

    // Helpers
    hasRecentMoods: moodEntries.length > 0,
    needsCheckIn: needsCheckIn()
  };
};
