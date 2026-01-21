import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ badges }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl" role="img" aria-label="Trophy">🏆</span>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Your Achievements</h3>
          <p className="text-sm text-muted-foreground">Celebrating your progress!</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className={`relative p-4 rounded-xl transition-all duration-300 ${
              badge?.earned
                ? 'bg-gradient-to-br from-accent to-primary text-white shadow-lg celebrate'
                : 'bg-muted opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${
                badge?.earned ? 'bg-white bg-opacity-20' : 'bg-background'
              }`}>
                <span className="text-2xl md:text-3xl" role="img" aria-label={badge?.name}>
                  {badge?.emoji}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-semibold mb-1 truncate">
                  {badge?.name}
                </h4>
                <p className="text-xs md:text-sm opacity-90 line-clamp-2">
                  {badge?.description}
                </p>
                
                {badge?.earned && (
                  <div className="flex items-center gap-2 mt-2">
                    <Icon name="Check" size={14} />
                    <span className="text-xs font-medium">Earned on {badge?.earnedDate}</span>
                  </div>
                )}
                
                {!badge?.earned && badge?.progress && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        Progress: {badge?.progress?.current}/{badge?.progress?.target}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {Math.round((badge?.progress?.current / badge?.progress?.target) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(badge?.progress?.current / badge?.progress?.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {badge?.earned && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-success flex items-center justify-center">
                  <Icon name="Star" size={14} fill="white" color="white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white">
        <div className="flex items-start gap-3">
          <Icon name="Award" size={24} className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base font-semibold mb-1">Keep Going!</p>
            <p className="text-xs md:text-sm opacity-90">
              Every check-in helps you understand yourself better. You're doing great by tracking your feelings!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;