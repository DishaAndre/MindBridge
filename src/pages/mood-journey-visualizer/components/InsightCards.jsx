import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightCards = ({ insights }) => {
  const getInsightIcon = (type) => {
    const icons = {
      positive: 'TrendingUp',
      pattern: 'Activity',
      suggestion: 'Lightbulb',
      milestone: 'Award',
      support: 'Heart',
    };
    return icons?.[type] || 'Info';
  };

  const getInsightColor = (type) => {
    const colors = {
      positive: 'from-success to-accent',
      pattern: 'from-primary to-secondary',
      suggestion: 'from-warning to-accent',
      milestone: 'from-secondary to-primary',
      support: 'from-purple-500 to-pink-500',
    };
    return colors?.[type] || 'from-muted to-card';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl" role="img" aria-label="Brain">🧠</span>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">AI Insights</h3>
          <p className="text-sm text-muted-foreground">Understanding your patterns</p>
        </div>
      </div>
      <div className="space-y-4">
        {insights?.map((insight) => (
          <div
            key={insight?.id}
            className={`p-4 rounded-xl bg-gradient-to-r ${getInsightColor(insight?.type)} text-white transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <Icon name={getInsightIcon(insight?.type)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm md:text-base font-semibold">{insight?.title}</h4>
                  {insight?.isNew && (
                    <span className="px-2 py-1 text-xs font-semibold bg-white bg-opacity-20 rounded-full">
                      New
                    </span>
                  )}
                </div>
                
                <p className="text-xs md:text-sm opacity-90 mb-3">
                  {insight?.description}
                </p>

                {insight?.details && (
                  <div className="space-y-2">
                    {insight?.details?.map((detail, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Icon name="Check" size={14} className="flex-shrink-0 mt-1" />
                        <span className="text-xs md:text-sm opacity-90">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {insight?.action && (
                  <button 
                    onClick={() => {
                      if (insight.action.onClick) {
                        insight.action.onClick();
                      } else if (insight.action.link) {
                        window.location.href = insight.action.link;
                      }
                    }}
                    className="mt-3 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <span>{insight?.action?.label}</span>
                    <Icon name="ArrowRight" size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-xl">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} className="text-primary mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Your Privacy Matters</p>
            <p className="text-xs md:text-sm text-muted-foreground">
              All insights are created just for you. Your mood data is encrypted and only shared with people you choose.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightCards;