import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const DemoMoodSelector = ({ onNext }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: 'yellow' },
    { id: 'calm', emoji: '😌', label: 'Calm', color: 'blue' },
    { id: 'excited', emoji: '🤗', label: 'Excited', color: 'orange' },
    { id: 'neutral', emoji: '😐', label: 'Neutral', color: 'gray' },
    { id: 'sad', emoji: '😔', label: 'Sad', color: 'blue' },
    { id: 'anxious', emoji: '😰', label: 'Anxious', color: 'red' },
    { id: 'frustrated', emoji: '😡', label: 'Frustrated', color: 'red' },
    { id: 'confused', emoji: '🤔', label: 'Confused', color: 'purple' }
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 600);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">How are you feeling right now?</h3>
        <p className="text-gray-600">Select the emoji that best represents your current mood</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              selectedMood?.id === mood.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            } ${showAnimation && selectedMood?.id === mood.id ? 'animate-pulse' : ''}`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium text-gray-700">{mood.label}</div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl mr-2">{selectedMood.emoji}</span>
            <span className="text-lg font-medium text-gray-900">
              You're feeling {selectedMood.label.toLowerCase()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Great! Now let's explore how intense this feeling is.
          </p>
          <Button onClick={onNext}>
            <Icon name="ArrowRight" className="w-4 h-4 mr-2" />
            Continue to Intensity
          </Button>
        </div>
      )}

      {!selectedMood && (
        <div className="text-center text-gray-500">
          <Icon name="Hand" className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Click on any emoji to select your mood</p>
        </div>
      )}
    </div>
  );
};

export default DemoMoodSelector;