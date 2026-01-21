import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ emoji, title, description, onClick, gradient }) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl p-6 md:p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl w-full"
      aria-label={title}
    >
      <div className={`absolute inset-0 ${gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="mb-4 md:mb-6">
          <span className="text-5xl md:text-6xl lg:text-7xl" role="img" aria-label={title}>
            {emoji}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 text-gray-800">
          {title}
        </h3>

        <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
          {description}
        </p>

        <div className="mt-4 md:mt-6 flex items-center gap-2 text-gray-800 font-medium">
          <span className="text-sm md:text-base">Get Started</span>
          <Icon name="ArrowRight" size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;