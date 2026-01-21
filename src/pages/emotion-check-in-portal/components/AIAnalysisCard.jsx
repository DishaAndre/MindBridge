import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const AIAnalysisCard = ({ mood, intensity, contexts, onComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setTimeout(() => setShowRecommendations(true), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const getAnalysisInsight = () => {
    const intensityText = intensity <= 2 ? 'mild' : intensity <= 3 ? 'moderate' : 'strong';
    return `I understand you're feeling ${mood?.label?.toLowerCase()} at a ${intensityText} level. This is a completely valid emotion, and I'm here to support you.`;
  };

  const getRecommendations = () => {
    const baseRecommendations = [
      {
        id: 1,
        title: 'Breathing Exercise',
        description: 'A 5-minute guided breathing session to help you feel centered',
        icon: 'Wind',
        emoji: '🌬️',
        duration: '5 min',
        color: 'bg-[#E3F2FD]',
      },
      {
        id: 2,
        title: 'Talk to AI Companion',
        description: 'Share more about your feelings in a safe, judgment-free space',
        icon: 'MessageCircle',
        emoji: '🤖',
        duration: 'Anytime',
        color: 'bg-[#F3E5F5]',
      },
      {
        id: 3,
        title: 'Calming Activity',
        description: 'Explore activities designed to help you feel better',
        icon: 'Sparkles',
        emoji: '✨',
        duration: '10-15 min',
        color: 'bg-[#E8F5E8]',
      },
    ];

    if (intensity >= 4) {
      baseRecommendations?.unshift({
        id: 0,
        title: 'Connect with Caregiver',
        description: 'Your support person can help you through this',
        icon: 'Users',
        emoji: '👥',
        duration: 'Now',
        color: 'bg-[#FFF3E0]',
        priority: true,
      });
    }

    return baseRecommendations;
  };

  return (
    <div className="w-full space-y-6 md:space-y-8">
      <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-primary flex items-center justify-center breathing">
              <Icon name="Brain" size={40} className="text-primary-foreground" />
            </div>
            {isAnalyzing && (
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            )}
          </div>
        </div>

        <div className="text-center space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            {isAnalyzing ? 'Understanding your feelings...' : 'Analysis Complete'}
          </h3>

          {analysisComplete && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <span className="text-4xl md:text-5xl lg:text-6xl" role="img" aria-label={mood?.label}>
                  {mood?.emoji}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
                    {mood?.label}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground">
                    Intensity: {intensity}/5
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <Icon name="Lightbulb" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base lg:text-lg text-foreground text-left">
                    {getAnalysisInsight()}
                  </p>
                </div>
              </div>

              {contexts?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  <span className="text-sm md:text-base text-muted-foreground">Related to:</span>
                  {contexts?.map((contextId) => (
                    <span
                      key={contextId}
                      className="px-3 md:px-4 py-1 md:py-2 rounded-full bg-secondary text-secondary-foreground text-xs md:text-sm font-medium"
                    >
                      {contextId}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {showRecommendations && (
        <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg space-y-6 md:space-y-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Recommended Next Steps
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Choose what feels right for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {getRecommendations()?.map((recommendation) => (
              <button
                key={recommendation?.id}
                onClick={() => onComplete(recommendation)}
                className={`${recommendation?.color} rounded-xl p-4 md:p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${
                  recommendation?.priority ? 'ring-4 ring-warning' : ''
                }`}
                aria-label={`${recommendation?.title}: ${recommendation?.description}`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <span className="text-3xl md:text-4xl flex-shrink-0" role="img" aria-label={recommendation?.title}>
                    {recommendation?.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-base md:text-lg font-bold text-foreground">
                        {recommendation?.title}
                      </h4>
                      {recommendation?.priority && (
                        <span className="px-2 py-1 rounded-full bg-warning text-warning-foreground text-xs font-semibold whitespace-nowrap">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3">
                      {recommendation?.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>{recommendation?.duration}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center pt-4 md:pt-6 border-t border-border">
            <button
              onClick={() => onComplete({ id: 'skip' })}
              className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              I'll decide later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysisCard;