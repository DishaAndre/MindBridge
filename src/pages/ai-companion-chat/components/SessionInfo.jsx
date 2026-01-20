import React from 'react';
import Icon from '../../../components/AppIcon';

const SessionInfo = ({ sessionStart, messageCount, mood }) => {
  const formatDuration = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMinutes = Math.floor((now - start) / 60000);
    
    if (diffMinutes < 1) return 'Just started';
    if (diffMinutes < 60) return `${diffMinutes} min`;
    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-gradient-to-r from-[#E3F2FD] to-[#F3E5F5] rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
            <Icon name="Clock" size={16} color="#4FC3F7" />
          </div>
          <div>
            <p className="text-xs text-[#757575]">Session Duration</p>
            <p className="text-sm md:text-base font-semibold text-[#2E2E2E]">
              {formatDuration(sessionStart)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
            <Icon name="MessageCircle" size={16} color="#AB47BC" />
          </div>
          <div>
            <p className="text-xs text-[#757575]">Messages</p>
            <p className="text-sm md:text-base font-semibold text-[#2E2E2E]">
              {messageCount}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
            <span className="text-lg">{mood}</span>
          </div>
          <div>
            <p className="text-xs text-[#757575]">Current Mood</p>
            <p className="text-sm md:text-base font-semibold text-[#2E2E2E]">
              Feeling Good
            </p>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2 px-3 py-2 rounded-full bg-[#66BB6A] text-white">
          <div className="w-2 h-2 rounded-full bg-white gentle-pulse"></div>
          <span className="text-xs md:text-sm font-medium whitespace-nowrap">AI Active</span>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;