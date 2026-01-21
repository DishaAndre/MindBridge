import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ completedActivities, totalActivities, todayCompleted, weeklyGoal }) => {
  const completionPercentage = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
  const weeklyPercentage = weeklyGoal > 0 ? (todayCompleted / weeklyGoal) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl shadow-md p-4 md:p-5 lg:p-6 mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="TrendingUp" size={24} className="text-primary" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
          Your Progress
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-card rounded-xl p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm md:text-base text-muted-foreground">Overall Progress</span>
            <span className="text-2xl md:text-3xl" role="img" aria-label="Trophy">
              🏆
            </span>
          </div>
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                {completedActivities}
              </span>
              <span className="text-lg md:text-xl text-muted-foreground">
                / {totalActivities}
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Activities completed
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 md:h-4 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm md:text-base text-muted-foreground">Today's Goal</span>
            <span className="text-2xl md:text-3xl" role="img" aria-label="Star">
              ⭐
            </span>
          </div>
          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
                {todayCompleted}
              </span>
              <span className="text-lg md:text-xl text-muted-foreground">
                / {weeklyGoal}
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Completed today
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 md:h-4 overflow-hidden">
            <div
              className="bg-accent h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {todayCompleted >= weeklyGoal && (
        <div className="mt-4 md:mt-6 bg-success/20 rounded-xl p-4 flex items-center gap-3 celebrate">
          <span className="text-3xl md:text-4xl" role="img" aria-label="Celebration">
            🎉
          </span>
          <div>
            <p className="text-sm md:text-base font-semibold text-success-foreground">
              Amazing work!
            </p>
            <p className="text-xs md:text-sm text-success-foreground/80">
              You've reached your daily goal!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;