import React from 'react';

const QuickResponseButton = ({ emoji, text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-xl bg-[#F5F5F5] hover:bg-[#4FC3F7] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 min-w-0"
      aria-label={text}
    >
      <span className="text-lg md:text-xl flex-shrink-0">{emoji}</span>
      <span className="text-xs md:text-sm font-medium whitespace-nowrap">{text}</span>
    </button>
  );
};

export default QuickResponseButton;