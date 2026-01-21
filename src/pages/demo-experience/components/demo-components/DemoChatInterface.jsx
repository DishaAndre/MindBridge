import React, { useState, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const DemoChatInterface = ({ onNext }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How are you feeling today? I'm here to listen and support you.",
      isUser: false,
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const quickResponses = [
    { id: 1, text: "I'm feeling a bit anxious today", emotion: "anxious" },
    { id: 2, text: "I'm doing pretty well, thanks!", emotion: "happy" },
    { id: 3, text: "I'm having a tough day", emotion: "sad" },
    { id: 4, text: "I'm not sure how I feel", emotion: "confused" }
  ];

  const aiResponses = {
    anxious: "I understand that anxiety can be really challenging. Can you tell me more about what's making you feel anxious today? Sometimes talking through these feelings can help us find ways to manage them together.",
    happy: "That's wonderful to hear! I'm so glad you're having a good day. What's been going well for you? Celebrating positive moments is important for our overall well-being.",
    sad: "I'm sorry you're having a tough day. It takes courage to reach out when you're struggling, and I'm here to support you. Would you like to talk about what's been difficult, or would you prefer some coping strategies to help you feel better?",
    confused: "It's completely normal to feel uncertain about your emotions sometimes. Feelings can be complex and change throughout the day. Would it help to explore what's been happening in your life recently, or would you like to try a quick mood check-in to help identify how you're feeling?"
  };

  const handleQuickResponse = (response) => {
    setSelectedResponse(response);
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: response.text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI typing and response
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponses[response.emotion],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Try Having a Conversation</h3>
        <p className="text-gray-600">Select a response to see how the AI companion responds</p>
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isUser ? 'bg-blue-100 ml-2' : 'bg-green-100 mr-2'
                }`}>
                  <Icon 
                    name={message.isUser ? 'User' : 'Bot'} 
                    className={`w-4 h-4 ${message.isUser ? 'text-blue-600' : 'text-green-600'}`} 
                  />
                </div>
                <div className={`rounded-lg p-3 ${
                  message.isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-800 shadow-sm'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <div className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start max-w-xs lg:max-w-md">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 mr-2">
                  <Icon name="Bot" className="w-4 h-4 text-green-600" />
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Responses */}
      {!selectedResponse && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Choose a response:</h4>
          <div className="grid gap-2">
            {quickResponses.map((response) => (
              <Button
                key={response.id}
                variant="outline"
                onClick={() => handleQuickResponse(response)}
                className="justify-start text-left h-auto p-3"
              >
                {response.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedResponse && messages.length >= 3 && (
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="MessageSquare" className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-gray-900">Great conversation!</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Notice how the AI provided an empathetic response and asked follow-up questions to better understand and support you.
          </p>
          <Button onClick={onNext}>
            <Icon name="ArrowRight" className="w-4 h-4 mr-2" />
            Continue Demo
          </Button>
        </div>
      )}

      {!selectedResponse && (
        <div className="text-center text-gray-500">
          <Icon name="MessageSquare" className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Click on any response above to see how the AI companion reacts</p>
        </div>
      )}
    </div>
  );
};

export default DemoChatInterface;