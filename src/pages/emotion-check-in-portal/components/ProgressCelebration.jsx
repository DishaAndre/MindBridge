import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProgressCelebration = ({ onContinue }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const achievements = [
    {
      id: 1,
      title: 'Daily Check-In',
      description: 'You completed today\'s mood check-in',
      icon: 'CheckCircle',
      emoji: '✅',
    },
    {
      id: 2,
      title: 'Self-Awareness',
      description: 'You\'re building emotional awareness',
      icon: 'Brain',
      emoji: '🧠',
    },
    {
      id: 3,
      title: 'Streak Active',
      description: '3 days in a row!',
      icon: 'Flame',
      emoji: '🔥',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-[#E3F2FD] via-[#F3E5F5] to-[#E8F5E8] rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)]?.map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <span className="text-2xl md:text-3xl">
                  {['🎉', '⭐', '✨', '🌟', '💫']?.[Math.floor(Math.random() * 5)]}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 text-center space-y-6 md:space-y-8">
          <div className="celebrate">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-success flex items-center justify-center shadow-2xl">
              <Icon name="Trophy" size={48} className="text-success-foreground" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
              Amazing Work! 🎉
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              You took an important step in understanding your emotions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {achievements?.map((achievement) => (
              <div
                key={achievement?.id}
                className="bg-card rounded-xl p-4 md:p-6 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl" role="img" aria-label={achievement?.title}>
                    {achievement?.emoji}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-foreground text-center">
                    {achievement?.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground text-center">
                    {achievement?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
              <Icon name="TrendingUp" size={24} className="text-primary" />
              <span className="text-base md:text-lg font-semibold text-foreground">
                Your Progress This Week
              </span>
            </div>
            <div className="flex justify-center gap-2 md:gap-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.map((day, index) => (
                <div key={day} className="flex flex-col items-center gap-1 md:gap-2">
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                      index < 3
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index < 3 ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-xs md:text-sm">-</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => onContinue('ai-companion')}
              className="w-full bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 md:gap-3"
              aria-label="Continue to AI Companion"
            >
              <Icon name="MessageCircle" size={24} />
              <span>Talk to AI Companion</span>
            </button>

            <button
              onClick={() => onContinue('activities')}
              className="w-full bg-secondary text-secondary-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 md:gap-3"
              aria-label="Explore calming activities"
            >
              <Icon name="Sparkles" size={24} />
              <span>Explore Activities</span>
            </button>

            <button
              onClick={() => onContinue('home')}
              className="w-full bg-muted text-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3"
              aria-label="Return to homepage"
            >
              <Icon name="Home" size={24} />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCelebration;