import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityCard = ({ activity, onStart, onComplete, isCompleted }) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-orange-100 text-orange-800'
  };

  const emotionColors = {
    anxious: 'bg-purple-100 text-purple-800',
    sad: 'bg-blue-100 text-blue-800',
    frustrated: 'bg-red-100 text-red-800',
    overwhelmed: 'bg-orange-100 text-orange-800',
    calm: 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-card rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] w-full min-w-0">
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
        <Image
          src={activity?.image}
          alt={activity?.imageAlt}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground rounded-full p-2 shadow-lg celebrate">
            <Icon name="Check" size={20} />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors?.[activity?.difficulty]}`}>
            {activity?.difficulty?.charAt(0)?.toUpperCase() + activity?.difficulty?.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl md:text-4xl" role="img" aria-label={activity?.category}>
            {activity?.emoji}
          </span>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground line-clamp-1">
            {activity?.title}
          </h3>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
          {activity?.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {activity?.emotions?.map((emotion, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-lg text-xs font-medium ${emotionColors?.[emotion]}`}
            >
              {emotion?.charAt(0)?.toUpperCase() + emotion?.slice(1)}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span className="text-sm whitespace-nowrap">{activity?.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Users" size={16} />
            <span className="text-sm whitespace-nowrap">{activity?.completions} completed</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isCompleted ? "outline" : "default"}
            fullWidth
            onClick={() => onStart(activity)}
            iconName={isCompleted ? "RotateCcw" : "Play"}
            iconPosition="left"
          >
            {isCompleted ? "Do Again" : "Start Activity"}
          </Button>
          {isCompleted && (
            <Button
              variant="success"
              size="icon"
              onClick={() => onComplete(activity)}
              iconName="Check"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;