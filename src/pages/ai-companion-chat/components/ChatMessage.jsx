import React from 'react';



const ChatMessage = ({ message, isUser, timestamp, mood, isTyping }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#AB47BC] flex items-center justify-center flex-shrink-0">
          <span className="text-xl md:text-2xl">🤖</span>
        </div>
        <div className="flex-1 max-w-[85%] md:max-w-[75%]">
          <div className="bg-[#F5F5F5] rounded-2xl rounded-tl-none px-4 py-3 md:px-6 md:py-4">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-[#4FC3F7] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#AB47BC] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-[#66BB6A] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 mb-4 md:mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-[#66BB6A] to-[#81C784]' 
          : 'bg-gradient-to-br from-[#4FC3F7] to-[#AB47BC]'
      }`}>
        <span className="text-xl md:text-2xl">{isUser ? (mood || '😊') : '🤖'}</span>
      </div>
      
      <div className={`flex-1 max-w-[85%] md:max-w-[75%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 md:px-6 md:py-4 ${
          isUser 
            ? 'bg-gradient-to-br from-[#4FC3F7] to-[#AB47BC] text-white rounded-tr-none' 
            : 'bg-[#F5F5F5] text-[#2E2E2E] rounded-tl-none'
        }`}>
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
        <span className="text-xs text-[#757575] mt-1 px-2">
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;