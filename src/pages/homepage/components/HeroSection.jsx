import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ onMoodCheckIn, onAICompanion }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl p-6 md:p-10 lg:p-16 mb-8 md:mb-12 lg:mb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E3F2FD] via-[#F3E5F5] to-[#E8F5E8] opacity-90"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="breathing mb-6 md:mb-8 lg:mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white shadow-lg">
            <span className="text-5xl md:text-6xl lg:text-7xl" role="img" aria-label="Heart emoji representing care and compassion">
              💙
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-800">
          Your Feelings Matter
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
          Technology that speaks your emotional language. A safe space for authentic expression where we understand and support you every step of the way.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            iconName="Heart"
            iconPosition="left"
            onClick={onMoodCheckIn}
            className="w-full sm:w-auto"
          >
            Check In Now
          </Button>

          <Button
            variant="outline"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={onAICompanion}
            className="w-full sm:w-auto"
          >
            Talk to AI Companion
          </Button>
        </div>

        <div className="mt-8 md:mt-10 lg:mt-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
            <Icon name="Shield" size={20} color="#66BB6A" />
            <span className="text-xs md:text-sm font-medium text-gray-700">Safe & Secure</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
            <Icon name="Users" size={20} color="#AB47BC" />
            <span className="text-xs md:text-sm font-medium text-gray-700">Caregiver Connected</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
            <Icon name="Heart" size={20} color="#4FC3F7" />
            <span className="text-xs md:text-sm font-medium text-gray-700">Always Here</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;