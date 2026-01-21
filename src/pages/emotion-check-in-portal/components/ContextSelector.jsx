import React from 'react';
import Icon from '../../../components/AppIcon';

const ContextSelector = ({ selectedContexts, onContextToggle }) => {
  const contextOptions = [
    {
      id: 'family',
      label: 'Family',
      icon: 'Users',
      emoji: '👨‍👩‍👧‍👦',
      color: 'bg-[#E8F5E8]',
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: 'Heart',
      emoji: '👥',
      color: 'bg-[#E3F2FD]',
    },
    {
      id: 'work',
      label: 'Work/School',
      icon: 'Briefcase',
      emoji: '📚',
      color: 'bg-[#FFF3E0]',
    },
    {
      id: 'health',
      label: 'Health',
      icon: 'Activity',
      emoji: '💊',
      color: 'bg-[#F3E5F5]',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      icon: 'Moon',
      emoji: '😴',
      color: 'bg-[#F5F5F5]',
    },
    {
      id: 'other',
      label: 'Other',
      icon: 'MoreHorizontal',
      emoji: '💭',
      color: 'bg-[#FFEBEE]',
    },
  ];

  return (
    <div className="w-full bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
          What's affecting your mood?
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Select all that apply (optional)
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {contextOptions?.map((context) => {
          const isSelected = selectedContexts?.includes(context?.id);
          return (
            <button
              key={context?.id}
              onClick={() => onContextToggle(context?.id)}
              className={`${context?.color} rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-105 active:scale-95 ${
                isSelected
                  ? 'ring-4 ring-primary shadow-xl scale-105'
                  : 'hover:shadow-lg'
              }`}
              aria-label={`${isSelected ? 'Deselect' : 'Select'} ${context?.label} context`}
              aria-pressed={isSelected}
            >
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <span className="text-3xl md:text-4xl" role="img" aria-label={context?.label}>
                  {context?.emoji}
                </span>
                <span className="text-sm md:text-base font-semibold text-foreground text-center">
                  {context?.label}
                </span>
                {isSelected && (
                  <div className="mt-1">
                    <Icon name="Check" size={20} className="text-primary" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {selectedContexts?.length > 0 && (
        <div className="mt-6 md:mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-primary text-primary-foreground">
            <Icon name="CheckCircle" size={20} />
            <span className="text-sm md:text-base font-semibold">
              {selectedContexts?.length} context{selectedContexts?.length > 1 ? 's' : ''} selected
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextSelector;