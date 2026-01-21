import React from 'react';


const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
  const timeRanges = [
    { value: '7days', label: 'Week', emoji: '📅', description: 'Last 7 days' },
    { value: '30days', label: 'Month', emoji: '🗓️', description: 'Last 30 days' },
    { value: '90days', label: 'Quarter', emoji: '📊', description: 'Last 3 months' },
    { value: '365days', label: 'Year', emoji: '🎯', description: 'Last 12 months' },
  ];

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" role="img" aria-label="Calendar">⏰</span>
        <h3 className="text-lg md:text-xl font-semibold text-foreground">View Your Journey</h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {timeRanges?.map((range) => (
          <button
            key={range?.value}
            onClick={() => onRangeChange(range?.value)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
              selectedRange === range?.value
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-muted hover:bg-accent hover:text-accent-foreground'
            }`}
            aria-label={`${range?.label} - ${range?.description}`}
            aria-pressed={selectedRange === range?.value}
          >
            <span className="text-3xl" role="img" aria-label={range?.label}>
              {range?.emoji}
            </span>
            <span className="text-sm md:text-base font-semibold">{range?.label}</span>
            <span className="text-xs opacity-80">{range?.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;