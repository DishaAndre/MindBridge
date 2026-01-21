import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversationStarter = ({ icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-4 p-4 md:p-6 rounded-2xl bg-[#F5F5F5] hover:bg-gradient-to-br hover:from-[#E3F2FD] hover:to-[#F3E5F5] transition-all duration-300 text-left w-full group"
      aria-label={title}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#4FC3F7] to-[#AB47BC] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <Icon name={icon} size={24} color="#FFFFFF" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm md:text-base font-semibold text-[#2E2E2E] mb-1">
          {title}
        </h4>
        <p className="text-xs md:text-sm text-[#757575] line-clamp-2">
          {description}
        </p>
      </div>
      <Icon name="ChevronRight" size={20} color="#757575" className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  );
};

export default ConversationStarter;