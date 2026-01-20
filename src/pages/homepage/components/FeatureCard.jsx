import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureCard = ({ iconName, title, description, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl mb-4 md:mb-6`} style={{ backgroundColor: `${color}20` }}>
        <Icon name={iconName} size={28} color={color} strokeWidth={2} />
      </div>

      <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-gray-800">
        {title}
      </h3>

      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;