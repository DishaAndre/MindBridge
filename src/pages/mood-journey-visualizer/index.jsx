import React, { useState } from 'react';
import { useLocalMoodTracking } from '../../hooks/useLocalMoodTracking';
import NavigationLayout from '../../components/navigation/NavigationLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import TimeRangeSelector from './components/TimeRangeSelector';
import MoodChart from './components/MoodChart';
import MoodDistribution from './components/MoodDistribution';
import Achievement from './components/Achievement';
import InsightCards from './components/InsightCards';
import ExportOptions from './components/ExportOptions';
import QuickStats from './components/QuickStats';
import Icon from '../../components/AppIcon';

const MoodJourneyVisualization = () => {
  const [selectedRange, setSelectedRange] = useState('30days');
  const [chartType, setChartType] = useState('line');
  
  // Get real mood data from localStorage
  const {
    getTotalCheckIns,
    getAverageMood,
    getDayStreak,
    getBadgesEarned,
    getMoodTrends,
    getMoodDistribution,
    getWeeklyData,
    moodEntries,
    hasRecentMoods
  } = useLocalMoodTracking();

  // Generate real mood data based on selected range with proper filtering
  const generateMoodData = (range) => {
    const days = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      '365days': 365,
    };

    const daysToShow = days[range] || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    // Filter entries within the selected range
    const filteredEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return entryDate >= cutoffDate;
    });

    // If no data, return empty array
    if (filteredEntries.length === 0) {
      return [];
    }

    // Group by date and calculate average mood for each day
    const dailyMoods = {};
    filteredEntries.forEach(entry => {
      const dateKey = entry.date;
      if (!dailyMoods[dateKey]) {
        dailyMoods[dateKey] = {
          intensities: [],
          moods: [],
          emojis: []
        };
      }
      dailyMoods[dateKey].intensities.push(entry.intensity);
      dailyMoods[dateKey].moods.push(entry.moodLabel);
      dailyMoods[dateKey].emojis.push(entry.moodEmoji);
    });

    // Convert to chart data format
    return Object.entries(dailyMoods)
      .map(([date, data]) => {
        const avgIntensity = data.intensities.reduce((sum, val) => sum + val, 0) / data.intensities.length;
        const mostCommonMood = data.moods[0]; // Use first mood of the day
        const mostCommonEmoji = data.emojis[0]; // Use first emoji of the day
        
        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          moodScore: Math.round(avgIntensity * 10), // Convert 1-10 scale to 10-100 for chart
          fullDate: date,
          mood: mostCommonMood,
          emoji: mostCommonEmoji,
          checkIns: data.intensities.length
        };
      })
      .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate)); // Sort chronologically
  };

  const moodData = generateMoodData(selectedRange);

  // Real mood distribution data filtered by selected range
  const moodDistributionData = () => {
    const days = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      '365days': 365,
    };

    const daysToShow = days[selectedRange] || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    // Filter entries within the selected range
    const filteredEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return entryDate >= cutoffDate;
    });

    // Calculate distribution from filtered data
    const distribution = {};
    filteredEntries.forEach(entry => {
      const mood = entry.moodLabel;
      distribution[mood] = (distribution[mood] || 0) + 1;
    });

    return Object.entries(distribution).map(([mood, count]) => ({
      name: mood,
      value: count
    }));
  };

  // Real achievement badges based on actual data
  const achievementBadges = () => {
    const totalCheckIns = getTotalCheckIns();
    const dayStreak = getDayStreak();
    const avgMood = parseFloat(getAverageMood());
    
    return [
      {
        id: 1,
        name: 'First Step',
        emoji: '🌟',
        description: 'Completed your first mood check-in',
        earned: totalCheckIns >= 1,
        earnedDate: totalCheckIns >= 1 ? moodEntries[moodEntries.length - 1]?.date : null,
      },
      {
        id: 2,
        name: 'Week Warrior',
        emoji: '🎯',
        description: 'Completed 7 mood check-ins',
        earned: totalCheckIns >= 7,
        earnedDate: totalCheckIns >= 7 ? moodEntries[moodEntries.length - 7]?.date : null,
        progress: totalCheckIns < 7 ? { current: totalCheckIns, target: 7 } : null,
      },
      {
        id: 3,
        name: 'Consistency Champion',
        emoji: '🔥',
        description: 'Maintained a 3-day streak',
        earned: dayStreak >= 3,
        progress: dayStreak < 3 ? { current: dayStreak, target: 3 } : null,
      },
      {
        id: 4,
        name: 'Monthly Master',
        emoji: '📅',
        description: 'Completed 30 mood check-ins',
        earned: totalCheckIns >= 30,
        progress: totalCheckIns < 30 ? { current: totalCheckIns, target: 30 } : null,
      },
      {
        id: 5,
        name: 'Positive Vibes',
        emoji: '😊',
        description: 'Maintained average mood above 7',
        earned: avgMood >= 7,
        progress: avgMood < 7 ? { current: avgMood, target: 7 } : null,
      },
      {
        id: 6,
        name: 'Century Club',
        emoji: '💯',
        description: 'Completed 100 mood check-ins',
        earned: totalCheckIns >= 100,
        progress: totalCheckIns < 100 ? { current: totalCheckIns, target: 100 } : null,
      },
    ];
  };

  // Real AI insights based on actual data and selected time range
  const aiInsights = () => {
    const days = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      '365days': 365,
    };

    const daysToShow = days[selectedRange] || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    // Filter entries within the selected range
    const filteredEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return entryDate >= cutoffDate;
    });

    const totalCheckIns = filteredEntries.length;
    const avgMood = totalCheckIns > 0 
      ? filteredEntries.reduce((sum, entry) => sum + entry.intensity, 0) / totalCheckIns
      : 0;
    const dayStreak = getDayStreak();
    const insights = [];

    const rangeLabel = {
      '7days': 'this week',
      '30days': 'this month',
      '90days': 'this quarter',
      '365days': 'this year',
    }[selectedRange] || 'the selected period';

    if (totalCheckIns === 0) {
      insights.push({
        id: 1,
        type: 'suggestion',
        title: 'Start Your Journey',
        description: `No mood data found for ${rangeLabel}. Begin tracking your mood to unlock personalized insights and patterns.`,
        action: {
          label: 'Check In Now',
          link: '/emotion-check-in-portal',
        },
      });
    } else {
      if (avgMood >= 7) {
        insights.push({
          id: 1,
          type: 'positive',
          title: 'Great Progress!',
          description: `Your average mood ${rangeLabel} is ${avgMood.toFixed(1)}/10. You're doing amazing at maintaining positive emotional wellness.`,
          isNew: true,
        });
      } else if (avgMood >= 5) {
        insights.push({
          id: 1,
          type: 'pattern',
          title: 'Steady Progress',
          description: `Your average mood ${rangeLabel} is ${avgMood.toFixed(1)}/10. You're maintaining good emotional balance.`,
        });
      } else {
        insights.push({
          id: 1,
          type: 'support',
          title: 'We\'re Here for You',
          description: `Your average mood ${rangeLabel} is ${avgMood.toFixed(1)}/10. Remember that difficult periods are temporary, and tracking helps you understand patterns.`,
          action: {
            label: 'Get Support',
            link: '/safety-crisis-support',
          },
        });
      }

      if (dayStreak >= 7) {
        insights.push({
          id: 2,
          type: 'milestone',
          title: 'Amazing Consistency!',
          description: `You've maintained a ${dayStreak}-day check-in streak. This level of self-awareness is truly impressive.`,
        });
      } else if (dayStreak >= 3) {
        insights.push({
          id: 2,
          type: 'pattern',
          title: 'Building Habits',
          description: `You've maintained a ${dayStreak}-day check-in streak. Consistency is key to emotional awareness.`,
        });
      }

      if (totalCheckIns >= 10) {
        insights.push({
          id: 3,
          type: 'milestone',
          title: 'Data Rich Period',
          description: `You've completed ${totalCheckIns} check-ins ${rangeLabel}. This rich data helps identify patterns and triggers.`,
        });
      }

      // Contextual suggestions based on time range
      if (selectedRange === '7days') {
        insights.push({
          id: 4,
          type: 'suggestion',
          title: 'Weekly Reflection',
          description: 'Try looking at your monthly view to see longer-term patterns and trends.',
          action: {
            label: 'View Monthly',
            onClick: () => setSelectedRange('30days'),
          },
        });
      } else if (selectedRange === '365days') {
        insights.push({
          id: 4,
          type: 'suggestion',
          title: 'Year in Review',
          description: 'What an incredible journey! Consider sharing this progress with your support network.',
          action: {
            label: 'Export Report',
            onClick: () => handleExport('pdf'),
          },
        });
      } else {
        insights.push({
          id: 4,
          type: 'suggestion',
          title: 'Keep Growing',
          description: 'Try calming activities to enhance your emotional wellness journey.',
          action: {
            label: 'Explore Activities',
            link: '/calming-activities-hub',
          },
        });
      }
    }

    return insights;
  };

  // Real quick stats based on actual data filtered by selected range
  const quickStats = () => {
    const days = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      '365days': 365,
    };

    const daysToShow = days[selectedRange] || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    // Filter entries within the selected range
    const filteredEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return entryDate >= cutoffDate;
    });

    // Calculate stats from filtered data
    const totalCheckIns = filteredEntries.length;
    const avgMood = totalCheckIns > 0 
      ? (filteredEntries.reduce((sum, entry) => sum + entry.intensity, 0) / totalCheckIns).toFixed(1)
      : '0.0';
    
    // Day streak is always global (not filtered by range)
    const dayStreak = getDayStreak();
    const badgesEarned = getBadgesEarned();

    const rangeLabel = {
      '7days': 'this week',
      '30days': 'this month',
      '90days': 'this quarter',
      '365days': 'this year',
    }[selectedRange] || 'selected period';

    return [
      {
        id: 1,
        emoji: '📊',
        value: totalCheckIns.toString(),
        label: 'Check-ins',
        subtitle: `In ${rangeLabel}`,
        trend: totalCheckIns > 0 ? 'up' : 'stable',
        trendValue: totalCheckIns > 0 ? 'Active' : 'Start now',
      },
      {
        id: 2,
        emoji: '😊',
        value: avgMood,
        label: 'Average Mood',
        subtitle: `In ${rangeLabel}`,
        trend: parseFloat(avgMood) >= 7 ? 'up' : parseFloat(avgMood) >= 5 ? 'stable' : 'down',
        trendValue: parseFloat(avgMood) >= 7 ? 'Great!' : parseFloat(avgMood) >= 5 ? 'Good' : 'Improving',
      },
      {
        id: 3,
        emoji: '🔥',
        value: dayStreak.toString(),
        label: 'Current Streak',
        subtitle: dayStreak > 0 ? 'Keep it going!' : 'Start today!',
        trend: dayStreak > 0 ? 'up' : 'stable',
        trendValue: dayStreak > 0 ? 'Active' : 'Ready',
      },
      {
        id: 4,
        emoji: '🎯',
        value: badgesEarned.toString(),
        label: 'Badges Earned',
        subtitle: `${8 - badgesEarned} more available`,
        trend: badgesEarned > 0 ? 'up' : 'stable',
        trendValue: `${Math.round((badgesEarned / 8) * 100)}%`,
      },
    ];
  };

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const handleChartTypeToggle = () => {
    setChartType(chartType === 'line' ? 'area' : 'line');
  };

  const handleExport = (format) => {
    if (moodEntries.length === 0) {
      alert('No mood data to export. Start tracking your mood first!');
      return;
    }

    const days = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      '365days': 365,
    };

    const daysToShow = days[selectedRange] || 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToShow);

    // Filter entries within the selected range
    const filteredEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.created_at);
      return entryDate >= cutoffDate;
    });

    if (format === 'csv') {
      exportToCSV(filteredEntries);
    } else if (format === 'pdf') {
      exportToPDF(filteredEntries);
    }
  };

  const exportToCSV = (entries) => {
    const headers = ['Date', 'Time', 'Mood', 'Intensity', 'Contexts', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.date,
        new Date(entry.created_at).toLocaleTimeString(),
        entry.moodLabel,
        entry.intensity,
        (entry.contexts || []).join('; '),
        (entry.notes || '').replace(/,/g, ';') // Replace commas to avoid CSV issues
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `mindbridge-mood-data-${selectedRange}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = (entries) => {
    // Create a simple HTML report for PDF generation
    const reportContent = `
      <html>
        <head>
          <title>MindBridge Mood Journey Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .stats { display: flex; justify-content: space-around; margin: 20px 0; }
            .stat { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .footer { margin-top: 30px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🧠 MindBridge Mood Journey Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <p>Period: ${selectedRange.replace('days', ' days')}</p>
          </div>
          
          <div class="stats">
            <div class="stat">
              <h3>${entries.length}</h3>
              <p>Total Check-ins</p>
            </div>
            <div class="stat">
              <h3>${entries.length > 0 ? (entries.reduce((sum, e) => sum + e.intensity, 0) / entries.length).toFixed(1) : '0'}</h3>
              <p>Average Mood</p>
            </div>
            <div class="stat">
              <h3>${getDayStreak()}</h3>
              <p>Current Streak</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Mood</th>
                <th>Intensity</th>
                <th>Contexts</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${entries.map(entry => `
                <tr>
                  <td>${entry.date}</td>
                  <td>${new Date(entry.created_at).toLocaleTimeString()}</td>
                  <td>${entry.moodEmoji} ${entry.moodLabel}</td>
                  <td>${entry.intensity}/10</td>
                  <td>${(entry.contexts || []).join(', ')}</td>
                  <td>${entry.notes || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>This report was generated by MindBridge - Your Mental Health Companion</p>
            <p>Keep tracking your mood to build emotional awareness and resilience!</p>
          </div>
        </body>
      </html>
    `;

    // Open in new window for printing/saving as PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(reportContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print dialog after content loads
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-background">
        <Breadcrumbs />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                Your Mood Journey 📈
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                See how your feelings change over time and celebrate your progress
              </p>
            </div>

            <button
              onClick={handleChartTypeToggle}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:shadow-lg transition-all duration-300"
              aria-label={`Switch to ${chartType === 'line' ? 'area' : 'line'} chart`}
            >
              <Icon name={chartType === 'line' ? 'BarChart3' : 'LineChart'} size={20} />
              <span className="text-sm font-medium">
                {chartType === 'line' ? 'Area View' : 'Line View'}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStats stats={quickStats()} />
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <TimeRangeSelector 
            selectedRange={selectedRange}
            onRangeChange={handleRangeChange}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mood Chart */}
          <div className="lg:col-span-2">
            {moodData.length > 0 ? (
              <MoodChart 
                data={moodData}
                chartType={chartType}
                selectedRange={selectedRange}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Icon name="TrendingUp" size={64} className="mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">No mood data yet</h3>
                  <p className="text-center mb-4">Start tracking your mood to see trends and patterns here</p>
                  <button
                    onClick={() => window.location.href = '/emotion-check-in-portal'}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Your First Check-In
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mood Distribution */}
          <div>
            {moodDistributionData().length > 0 ? (
              <MoodDistribution data={moodDistributionData()} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Mood Distribution</h2>
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <Icon name="PieChart" size={48} className="mb-4 opacity-50" />
                  <p className="text-center">Track different moods to see your emotional patterns</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Insights */}
          <div>
            <InsightCards insights={aiInsights()} />
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mb-8">
          <Achievement badges={achievementBadges()} />
        </div>

        {/* Export Options */}
        <div className="mb-8">
          <ExportOptions onExport={handleExport} />
        </div>

        {/* Encouragement Footer */}
        <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-xl p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <span className="text-4xl md:text-5xl" role="img" aria-label="Heart">
                💖
              </span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                You're Doing Amazing!
              </h3>
              <p className="text-sm md:text-base opacity-90">
                Every check-in helps you understand yourself better. Your caregivers are proud of your progress, and so are we. Keep tracking your feelings - you're building important skills for life!
              </p>
            </div>

            <button
              onClick={() => window.location.href = '/emotion-check-in-portal'}
              className="flex-shrink-0 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span>Check In Now</span>
              <Icon name="ArrowRight" size={20} />
            </button>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default MoodJourneyVisualization;