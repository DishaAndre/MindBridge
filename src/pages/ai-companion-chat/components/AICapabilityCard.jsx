import React from 'react';
import Icon from '../../../components/AppIcon';

const AICapabilityCard = ({ icon, title, description, color }) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[rgba(117,117,117,0.3)]">
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 md:mb-4`}>
        <Icon name={icon} size={24} color="#FFFFFF" />
      </div>
      <h4 className="text-sm md:text-base font-semibold text-[#2E2E2E] mb-2">
        {title}
      </h4>
      <p className="text-xs md:text-sm text-[#757575] line-clamp-3">
        {description}
      </p>
    </div>
  );
};

export default AICapabilityCard;