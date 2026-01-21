import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AICompanionPreview = ({ onStartChat }) => {
  return (
    <section className="bg-gradient-to-br from-[#F3E5F5] to-[#E3F2FD] rounded-3xl p-6 md:p-10 lg:p-16 mb-8 md:mb-12 lg:mb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-4 md:mb-6">
              <span className="text-2xl" role="img" aria-label="Robot">🤖</span>
              <span className="text-sm font-medium text-gray-700">AI Companion</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-800">
              Your 24/7 Emotional Support Friend
            </h2>

            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Our AI companion understands your feelings and provides gentle, supportive responses whenever you need someone to talk to. Available anytime, anywhere.
            </p>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#66BB6A] flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="#FFFFFF" />
                </div>
                <span className="text-sm md:text-base text-gray-700">Understands your emotions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#66BB6A] flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="#FFFFFF" />
                </div>
                <span className="text-sm md:text-base text-gray-700">Never judges or criticizes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#66BB6A] flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={16} color="#FFFFFF" />
                </div>
                <span className="text-sm md:text-base text-gray-700">Provides calming suggestions</span>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={onStartChat}
              className="w-full sm:w-auto"
            >
              Start Chatting
            </Button>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4FC3F7] flex items-center justify-center flex-shrink-0">
                    <span className="text-xl" role="img" aria-label="Robot">🤖</span>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-none p-4">
                    <p className="text-sm md:text-base text-gray-800">
                      Hi there! I'm here to listen. How are you feeling today?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="flex-1 max-w-xs bg-[#4FC3F7] text-white rounded-2xl rounded-tr-none p-4">
                    <p className="text-sm md:text-base">
                      I'm feeling a bit anxious about tomorrow
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#AB47BC] flex items-center justify-center flex-shrink-0">
                    <span className="text-xl" role="img" aria-label="User">😊</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4FC3F7] flex items-center justify-center flex-shrink-0">
                    <span className="text-xl" role="img" aria-label="Robot">🤖</span>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-none p-4">
                    <p className="text-sm md:text-base text-gray-800">
                      I understand. Feeling anxious is completely normal. Would you like to try a calming breathing exercise together?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICompanionPreview;