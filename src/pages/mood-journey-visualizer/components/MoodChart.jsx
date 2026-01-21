import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const MoodChart = ({ data, chartType, selectedRange }) => {
  const moodColors = {
    'Very Happy': '#66BB6A',
    'Happy': '#81C784',
    'Calm': '#4FC3F7',
    'Neutral': '#FFB74D',
    'Sad': '#F06292',
    'Anxious': '#AB47BC',
    'Frustrated': '#EF5350',
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload[0]?.payload;
      return (
        <div className="bg-card p-4 rounded-xl shadow-lg border border-border">
          <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry?.name}: <span className="font-semibold text-foreground">{entry?.value}</span>
              </span>
            </div>
          ))}
          {data?.checkIns && data.checkIns > 1 && (
            <p className="text-xs text-muted-foreground mt-2">
              📊 {data.checkIns} check-ins this day
            </p>
          )}
          {data?.mood && (
            <p className="text-xs text-muted-foreground">
              {data.emoji} {data.mood}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getRangeLabel = () => {
    const labels = {
      '7days': 'Past Week',
      '30days': 'Past Month',
      '90days': 'Past Quarter',
      '365days': 'Past Year',
    };
    return labels?.[selectedRange] || 'Your Journey';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="Chart">📈</span>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Mood Patterns</h3>
            <p className="text-sm text-muted-foreground">{getRangeLabel()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>Tracking your emotional journey</span>
        </div>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Mood patterns visualization chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(117, 117, 117, 0.2)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="moodScore" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', r: 4 }}
                activeDot={{ r: 6 }}
                name="Mood Score"
              />
            </LineChart>
          ) : (
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(117, 117, 117, 0.2)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Area 
                type="monotone" 
                dataKey="moodScore" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorMood)"
                name="Mood Score"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-xl">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Understanding Your Chart</p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Higher scores mean happier moods. Look for patterns - do certain days feel better? This helps you and your caregivers understand what makes you feel good.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodChart;