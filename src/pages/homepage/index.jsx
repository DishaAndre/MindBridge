import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useViewMode } from '../../hooks/useViewMode';
import NavigationLayout from '../../components/navigation/NavigationLayout';
import HeroSection from './components/HeroSection';
import QuickActionCard from './components/QuickActionCard';
import FeatureCard from './components/FeatureCard';
import UserModeToggle from './components/UserModeToggle';
import TrustSignal from './components/TrustSignal';
import TestimonialCard from './components/TestimonialCard';
import EmergencyBanner from './components/EmergencyBanner';
import AICompanionPreview from './components/AICompanionPreview';
import AuthModal from '../../components/auth/AuthModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Homepage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userType, userProfile } = useAuth();
  const { viewMode, setViewMode, isIndividualMode, isCaregiverMode } = useViewMode();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleModeChange = (newMode) => {
    setViewMode(newMode);
    // Optional: Add analytics tracking here
    console.log(`View mode switched to: ${newMode}`);
  };

  const handleMoodCheckIn = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate('/emotion-check-in-portal');
  };

  const handleAICompanion = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate('/ai-companion-chat');
  };

  const handleCaregiverDashboard = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    navigate('/caregiver-insights-dashboard');
  };

  const handleCalmingActivities = () => {
    navigate('/calming-activities-hub');
  };

  const handleMoodJourney = () => {
    navigate('/mood-journey-visualization');
  };

  const handleCrisisSupport = () => {
    navigate('/safety-crisis-support');
  };

  const individualActions = [
  {
    emoji: '💭',
    title: 'Check Your Mood',
    description: 'Share how you\'re feeling today with simple emojis and words',
    onClick: handleMoodCheckIn,
    gradient: 'bg-gradient-to-br from-[#E3F2FD] to-[#4FC3F7]'
  },
  {
    emoji: '🤖',
    title: 'Talk to AI Friend',
    description: 'Chat with your supportive AI companion anytime you need',
    onClick: handleAICompanion,
    gradient: 'bg-gradient-to-br from-[#F3E5F5] to-[#AB47BC]'
  },
  {
    emoji: '🧘',
    title: 'Calming Activities',
    description: 'Try breathing exercises, music, or relaxing games',
    onClick: handleCalmingActivities,
    gradient: 'bg-gradient-to-br from-[#E8F5E8] to-[#66BB6A]'
  },
  {
    emoji: '📈',
    title: 'See Your Progress',
    description: 'View your mood journey and celebrate your growth',
    onClick: handleMoodJourney,
    gradient: 'bg-gradient-to-br from-[#FFF3E0] to-[#FFB74D]'
  }];


  const caregiverActions = [
  {
    emoji: '👥',
    title: 'View Dashboard',
    description: 'Monitor mood patterns and receive important alerts',
    onClick: handleCaregiverDashboard,
    gradient: 'bg-gradient-to-br from-[#F3E5F5] to-[#AB47BC]'
  },
  {
    emoji: '📊',
    title: 'Mood Analytics',
    description: 'Understand emotional patterns with detailed insights',
    onClick: handleMoodJourney,
    gradient: 'bg-gradient-to-br from-[#E3F2FD] to-[#4FC3F7]'
  },
  {
    emoji: '🤖',
    title: 'AI Companion Chat',
    description: 'Review AI conversations and support quality',
    onClick: handleAICompanion,
    gradient: 'bg-gradient-to-br from-[#E8F5E8] to-[#66BB6A]'
  },
  {
    emoji: '🧘',
    title: 'Activity Resources',
    description: 'Access therapeutic tools and calming exercises',
    onClick: handleCalmingActivities,
    gradient: 'bg-gradient-to-br from-[#FFF3E0] to-[#FFB74D]'
  }];


  const features = [
  {
    iconName: 'Smile',
    title: 'Emoji-Based Expression',
    description: 'Communicate feelings easily with simple, colorful emojis that everyone understands',
    color: '#4FC3F7'
  },
  {
    iconName: 'Brain',
    title: 'Smart AI Understanding',
    description: 'Our AI learns your patterns and provides personalized emotional support',
    color: '#AB47BC'
  },
  {
    iconName: 'Users',
    title: 'Caregiver Connection',
    description: 'Keep your support network informed with automatic updates and alerts',
    color: '#66BB6A'
  },
  {
    iconName: 'TrendingUp',
    title: 'Progress Tracking',
    description: 'Visualize your emotional journey and celebrate every positive step',
    color: '#FFB74D'
  },
  {
    iconName: 'Shield',
    title: 'Privacy Protected',
    description: 'Your emotional data is encrypted and secure, always under your control',
    color: '#F06292'
  },
  {
    iconName: 'Zap',
    title: 'Crisis Detection',
    description: 'Automatic alerts to caregivers when you need immediate support',
    color: '#4FC3F7'
  }];


  const testimonials = [
  {
    quote: 'MindBridge has transformed how I communicate with my son. The emoji system helps him express feelings he couldn\'t put into words before.',
    author: 'Sarah Johnson',
    role: 'Parent & Caregiver',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_180060c61-1763294571164.png",
    avatarAlt: 'Professional headshot of middle-aged woman with shoulder-length brown hair wearing blue cardigan and warm smile'
  },
  {
    quote: 'The AI companion is like having a patient friend available 24/7. It never judges and always helps me feel calmer when I\'m anxious.',
    author: 'Michael Chen',
    role: 'Individual User',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1287b04-1763296078115.png",
    avatarAlt: 'Professional headshot of young Asian man with short black hair wearing casual gray shirt with friendly expression'
  },
  {
    quote: 'As a therapist, I recommend MindBridge to families. The caregiver dashboard provides insights that help us provide better support.',
    author: 'Dr. Emily Rodriguez',
    role: 'Clinical Psychologist',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac092511-1763296799624.png",
    avatarAlt: 'Professional headshot of Hispanic woman with long dark hair wearing white medical coat and professional demeanor'
  }];


  const currentActions = isIndividualMode ? individualActions : caregiverActions;

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-[#FAFAFA]">
        <UserModeToggle currentMode={viewMode} onModeChange={handleModeChange} />

        <EmergencyBanner onCrisisClick={handleCrisisSupport} />

        <HeroSection onMoodCheckIn={handleMoodCheckIn} onAICompanion={handleAICompanion} />

        <section className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-800">
              {isIndividualMode ? 'What Would You Like to Do?' : 'Caregiver Tools'}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {isIndividualMode ? 'Choose an activity that feels right for you today' : 'Access powerful tools to support your loved ones'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {currentActions?.map((action, index) =>
            <QuickActionCard
              key={index}
              emoji={action?.emoji}
              title={action?.title}
              description={action?.description}
              onClick={action?.onClick}
              gradient={action?.gradient} />

            )}
          </div>
        </section>

        <AICompanionPreview onStartChat={handleAICompanion} />

        <section className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-800">
              Why Choose MindBridge?
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Designed with accessibility and empathy at the core of everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features?.map((feature, index) =>
            <FeatureCard
              key={index}
              iconName={feature?.iconName}
              title={feature?.title}
              description={feature?.description}
              color={feature?.color} />

            )}
          </div>
        </section>

        <TrustSignal />

        <section className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-800">
              Stories from Our Community
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from people who use MindBridge every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials?.map((testimonial, index) =>
            <TestimonialCard
              key={index}
              quote={testimonial?.quote}
              author={testimonial?.author}
              role={testimonial?.role}
              avatar={testimonial?.avatar}
              avatarAlt={testimonial?.avatarAlt} />

            )}
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#4FC3F7] to-[#AB47BC] rounded-3xl p-6 md:p-10 lg:p-16 text-center text-white mb-8 md:mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="breathing mb-6 md:mb-8">
              <span className="text-6xl md:text-7xl lg:text-8xl" role="img" aria-label="Sparkles">
                ✨
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Ready to Start Your Journey?
            </h2>

            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 leading-relaxed">
              Join thousands of individuals and families who are experiencing better emotional understanding and support through MindBridge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleMoodCheckIn}
                className="px-8 py-4 bg-white text-[#4FC3F7] rounded-xl font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">

                <span className="mr-2" role="img" aria-label="Heart">💙</span>
                Start Your First Check-In
              </button>

              <button
                onClick={handleAICompanion}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-base md:text-lg hover:bg-white hover:text-[#AB47BC] transition-all duration-300 hover:scale-105">

                <span className="mr-2" role="img" aria-label="Robot">🤖</span>
                Meet Your AI Companion
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center py-8 md:py-12 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6 md:mb-8">
            <a href="#" className="text-sm md:text-base text-gray-600 hover:text-[#4FC3F7] transition-colors duration-300">
              About Us
            </a>
            <a href="#" className="text-sm md:text-base text-gray-600 hover:text-[#4FC3F7] transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm md:text-base text-gray-600 hover:text-[#4FC3F7] transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm md:text-base text-gray-600 hover:text-[#4FC3F7] transition-colors duration-300">
              Accessibility
            </a>
            <a href="#" className="text-sm md:text-base text-gray-600 hover:text-[#4FC3F7] transition-colors duration-300">
              Contact Support
            </a>
          </div>

          <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#4FC3F7] hover:text-white transition-all duration-300" aria-label="Facebook">
              <Icon name="Facebook" size={20} />
            </a>
            <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#4FC3F7] hover:text-white transition-all duration-300" aria-label="Twitter">
              <Icon name="Twitter" size={20} />
            </a>
            <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#4FC3F7] hover:text-white transition-all duration-300" aria-label="Instagram">
              <Icon name="Instagram" size={20} />
            </a>
            <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#4FC3F7] hover:text-white transition-all duration-300" aria-label="LinkedIn">
              <Icon name="Linkedin" size={20} />
            </a>
          </div>

          <p className="text-sm md:text-base text-gray-600">
            © {new Date()?.getFullYear()} MindBridge. All rights reserved. Made with <span className="text-red-500">❤️</span> for accessibility and inclusion.
          </p>
        </footer>
      </div>
    </NavigationLayout>);

};

export default Homepage;