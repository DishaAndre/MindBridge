import React, { useState, useRef } from 'react';

import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, disabled, currentMood }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-t border-[rgba(117,117,117,0.3)] p-4 md:p-6">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#66BB6A] to-[#81C784] flex items-center justify-center flex-shrink-0">
          <span className="text-xl md:text-2xl">{currentMood}</span>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            disabled={disabled}
            className="w-full px-4 py-3 md:px-5 md:py-4 pr-12 rounded-2xl bg-[#F5F5F5] text-[#2E2E2E] placeholder-[#757575] resize-none focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] disabled:opacity-50 text-sm md:text-base"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
            aria-label="Type your message"
          />
          <button
            type="button"
            className="absolute right-3 bottom-3 p-2 rounded-lg hover:bg-white/50 transition-colors duration-300"
            aria-label="Add emoji"
          >
            <span className="text-xl">😊</span>
          </button>
        </div>
        
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#4FC3F7] to-[#AB47BC] hover:scale-110 transition-transform duration-300 flex-shrink-0"
          iconName="Send"
          iconSize={20}
        />
      </div>
    </form>
  );
};

export default ChatInput;