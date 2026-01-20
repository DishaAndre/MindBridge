import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 breathing"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
              <span className="text-2xl md:text-3xl" role="img" aria-label={stat?.label}>
                {stat?.emoji}
              </span>
            </div>
            
            {stat?.trend && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                stat?.trend === 'up' ?'bg-success bg-opacity-10 text-success' 
                  : stat?.trend === 'down' ?'bg-error bg-opacity-10 text-error' :'bg-muted text-muted-foreground'
              }`}>
                <Icon 
                  name={stat?.trend === 'up' ? 'TrendingUp' : stat?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={12} 
                />
                <span>{stat?.trendValue}</span>
              </div>
            )}
          </div>

          <div>
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {stat?.value}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground font-medium">
              {stat?.label}
            </p>
            {stat?.subtitle && (
              <p className="text-xs text-muted-foreground mt-1 opacity-80">
                {stat?.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;