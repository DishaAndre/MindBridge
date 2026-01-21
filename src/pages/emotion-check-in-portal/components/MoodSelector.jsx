import React from 'react';


const MoodSelector = ({ selectedMood, onMoodSelect, isAnimating }) => {
  const moodOptions = [
    {
      id: 'happy',
      emoji: '😊',
      label: 'Happy',
      color: 'bg-[#E8F5E8]',
      description: 'Feeling joyful and content',
    },
    {
      id: 'calm',
      emoji: '😌',
      label: 'Calm',
      color: 'bg-[#E3F2FD]',
      description: 'Peaceful and relaxed',
    },
    {
      id: 'sad',
      emoji: '😔',
      label: 'Sad',
      color: 'bg-[#F3E5F5]',
      description: 'Feeling down or blue',
    },
    {
      id: 'anxious',
      emoji: '😰',
      label: 'Anxious',
      color: 'bg-[#FFF3E0]',
      description: 'Worried or nervous',
    },
    {
      id: 'frustrated',
      emoji: '😡',
      label: 'Frustrated',
      color: 'bg-[#FFEBEE]',
      description: 'Feeling upset or angry',
    },
    {
      id: 'tired',
      emoji: '😴',
      label: 'Tired',
      color: 'bg-[#F5F5F5]',
      description: 'Exhausted or sleepy',
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
          How are you feeling today?
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          Tap the emoji that matches your mood
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {moodOptions?.map((mood) => (
          <button
            key={mood?.id}
            onClick={() => onMoodSelect(mood)}
            className={`${mood?.color} rounded-2xl p-6 md:p-8 lg:p-10 transition-all duration-300 hover:scale-105 active:scale-95 ${
              selectedMood?.id === mood?.id
                ? 'ring-4 ring-primary shadow-2xl scale-105'
                : 'hover:shadow-xl'
            } ${isAnimating && selectedMood?.id === mood?.id ? 'celebrate' : ''}`}
            aria-label={`Select ${mood?.label} mood: ${mood?.description}`}
          >
            <div className="flex flex-col items-center gap-3 md:gap-4">
              <span
                className="text-5xl md:text-6xl lg:text-7xl breathing"
                role="img"
                aria-label={mood?.label}
              >
                {mood?.emoji}
              </span>
              <span className="text-base md:text-lg lg:text-xl font-semibold text-foreground">
                {mood?.label}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground text-center">
                {mood?.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;