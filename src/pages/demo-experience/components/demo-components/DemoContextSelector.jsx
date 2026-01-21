import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const DemoContextSelector = ({ onNext }) => {
  const [selectedContexts, setSelectedContexts] = useState([]);

  const contexts = [
    { id: 'work', label: 'Work/School', icon: 'Briefcase', color: 'blue' },
    { id: 'family', label: 'Family', icon: 'Users', color: 'green' },
    { id: 'health', label: 'Health', icon: 'Heart', color: 'red' },
    { id: 'relationships', label: 'Relationships', icon: 'Heart', color: 'pink' },
    { id: 'finances', label: 'Finances', icon: 'DollarSign', color: 'yellow' },
    { id: 'social', label: 'Social Situations', icon: 'Users', color: 'purple' },
    { id: 'sleep', label: 'Sleep', icon: 'Moon', color: 'indigo' },
    { id: 'weather', label: 'Weather', icon: 'Cloud', color: 'gray' },
    { id: 'news', label: 'News/Media', icon: 'Tv', color: 'orange' },
    { id: 'exercise', label: 'Exercise', icon: 'Activity', color: 'green' },
    { id: 'food', label: 'Food/Eating', icon: 'Coffee', color: 'brown' },
    { id: 'other', label: 'Other', icon: 'MoreHorizontal', color: 'gray' }
  ];

  const handleContextToggle = (contextId) => {
    setSelectedContexts(prev => 
      prev.includes(contextId)
        ? prev.filter(id => id !== contextId)
        : [...prev, contextId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">What's influencing your mood?</h3>
        <p className="text-gray-600">Select any factors that might be affecting how you feel (optional)</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {contexts.map((context) => {
          const isSelected = selectedContexts.includes(context.id);
          return (
            <button
              key={context.id}
              onClick={() => handleContextToggle(context.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  isSelected ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon 
                    name={context.icon} 
                    className={`w-4 h-4 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`} 
                  />
                </div>
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-blue-900' : 'text-gray-700'
                }`}>
                  {context.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedContexts.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="Tag" className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-900">Selected factors:</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedContexts.map(contextId => {
              const context = contexts.find(c => c.id === contextId);
              return (
                <span 
                  key={contextId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  <Icon name={context.icon} className="w-3 h-3 mr-1" />
                  {context.label}
                </span>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Thanks for sharing! This context helps our AI provide more personalized insights and recommendations.
          </p>
        </div>
      )}

      <div className="text-center">
        <Button onClick={onNext} size="lg">
          <Icon name="Sparkles" className="w-4 h-4 mr-2" />
          Get AI Insights
        </Button>
        {selectedContexts.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">
            You can skip this step or select factors above
          </p>
        )}
      </div>

      {selectedContexts.length === 0 && (
        <div className="text-center text-gray-500">
          <Icon name="Tag" className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Click on any factors that might be influencing your mood</p>
        </div>
      )}
    </div>
  );
};

export default DemoContextSelector;