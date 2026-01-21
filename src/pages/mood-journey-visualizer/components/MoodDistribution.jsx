import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const MoodDistribution = ({ data }) => {
  const moodEmojis = {
    'Very Happy': '😄',
    'Happy': '😊',
    'Calm': '😌',
    'Neutral': '😐',
    'Sad': '😔',
    'Anxious': '😰',
    'Frustrated': '😡',
  };

  const COLORS = {
    'Very Happy': '#66BB6A',
    'Happy': '#81C784',
    'Calm': '#4FC3F7',
    'Neutral': '#FFB74D',
    'Sad': '#F06292',
    'Anxious': '#AB47BC',
    'Frustrated': '#EF5350',
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card p-4 rounded-xl shadow-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" role="img" aria-label={data?.name}>
              {moodEmojis?.[data?.name]}
            </span>
            <p className="text-sm font-semibold text-foreground">{data?.name}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Count: <span className="font-semibold text-foreground">{data?.value}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {((data?.value / data?.payload?.total) * 100)?.toFixed(1)}% of your moods
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs md:text-sm font-semibold"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  const total = data?.reduce((sum, entry) => sum + entry?.value, 0);
  const dataWithTotal = data?.map(entry => ({ ...entry, total }));

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl" role="img" aria-label="Pie chart">🥧</span>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Mood Distribution</h3>
          <p className="text-sm text-muted-foreground">How often you felt each way</p>
        </div>
      </div>
      <div className="w-full h-64 md:h-80" aria-label="Mood distribution pie chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {dataWithTotal?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[entry?.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data?.map((mood) => (
          <div 
            key={mood?.name}
            className="flex items-center gap-2 p-3 bg-muted rounded-lg"
          >
            <span className="text-2xl" role="img" aria-label={mood?.name}>
              {moodEmojis?.[mood?.name]}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{mood?.name}</p>
              <p className="text-xs text-muted-foreground">{mood?.value} times</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-xl">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">What This Means</p>
            <p className="text-xs md:text-sm text-muted-foreground">
              This shows which moods you experience most often. It's okay to have different feelings! Sharing this with your caregiver helps them understand you better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodDistribution;