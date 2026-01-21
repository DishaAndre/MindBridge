import React from 'react';
import Icon from '../../../components/AppIcon';

const EmotionSelector = ({ emotions, selectedEmotion, onSelectEmotion }) => {
  return (
    <div className="bg-card rounded-2xl shadow-md p-4 md:p-5 lg:p-6 mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Heart" size={20} className="text-primary" />
        <h3 className="text-base md:text-lg font-semibold text-foreground">
          How are you feeling?
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
        {emotions?.map((emotion) => (
          <button
            key={emotion?.id}
            onClick={() => onSelectEmotion(emotion?.id)}
            className={`flex flex-col items-center gap-2 p-4 md:p-5 rounded-xl transition-all duration-300 ${
              selectedEmotion === emotion?.id
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            <span className="text-4xl md:text-5xl lg:text-6xl" role="img" aria-label={emotion?.name}>
              {emotion?.emoji}
            </span>
            <span className="text-xs md:text-sm font-medium text-center">
              {emotion?.name}
            </span>
          </button>
        ))}
      </div>
      {selectedEmotion && (
        <div className="mt-4 p-4 bg-primary/10 rounded-xl">
          <p className="text-sm md:text-base text-foreground text-center">
            We've selected activities that can help you feel better 💙
          </p>
        </div>
      )}
    </div>
  );
};

export default EmotionSelector;