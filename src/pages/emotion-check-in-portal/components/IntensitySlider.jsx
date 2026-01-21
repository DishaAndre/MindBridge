import React from 'react';
import Icon from '../../../components/AppIcon';

const IntensitySlider = ({ intensity, onIntensityChange, selectedMood }) => {
  const intensityLevels = [
    { value: 1, label: 'Very Low', emoji: '▁', color: 'bg-green-200' },
    { value: 2, label: 'Low', emoji: '▂', color: 'bg-green-300' },
    { value: 3, label: 'Medium', emoji: '▄', color: 'bg-yellow-300' },
    { value: 4, label: 'High', emoji: '▆', color: 'bg-orange-300' },
    { value: 5, label: 'Very High', emoji: '█', color: 'bg-red-300' },
  ];

  return (
    <div className="w-full bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
          How strong is this feeling?
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Move the slider to show intensity
        </p>
      </div>
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <span className="text-3xl md:text-4xl lg:text-5xl" role="img" aria-label="Selected mood">
            {selectedMood?.emoji}
          </span>
          <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
            {intensityLevels?.[intensity - 1]?.emoji}
          </span>
        </div>

        <div className="relative px-4">
          <input
            type="range"
            min="1"
            max="5"
            value={intensity}
            onChange={(e) => onIntensityChange(parseInt(e?.target?.value))}
            className="w-full h-4 md:h-6 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #81C784 0%, #FFB74D 50%, #F06292 100%)`,
            }}
            aria-label="Intensity level slider"
            aria-valuemin="1"
            aria-valuemax="5"
            aria-valuenow={intensity}
            aria-valuetext={intensityLevels?.[intensity - 1]?.label}
          />
          <div className="flex justify-between mt-4">
            {intensityLevels?.map((level) => (
              <button
                key={level?.value}
                onClick={() => onIntensityChange(level?.value)}
                className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-xl transition-all duration-300 ${
                  intensity === level?.value
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'hover:bg-muted'
                }`}
                aria-label={`Set intensity to ${level?.label}`}
              >
                <span className="text-xl md:text-2xl">{level?.emoji}</span>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                  {level?.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-muted">
            <Icon name="Activity" size={20} className="text-primary" />
            <span className="text-sm md:text-base font-semibold text-foreground">
              Intensity: {intensityLevels?.[intensity - 1]?.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntensitySlider;