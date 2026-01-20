import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLocalMoodTracking } from '../../hooks/useLocalMoodTracking';
import NavigationLayout from '../../components/navigation/NavigationLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import Icon from '../../components/AppIcon';
import MoodSelector from './components/MoodSelector';
import IntensitySlider from './components/IntensitySlider';
import ContextSelector from './components/ContextSelector';
import AIAnalysisCard from './components/AIAnalysisCard';
import ProgressCelebration from './components/ProgressCelebration';
import EmergencySupport from './components/EmergencySupport';

const EmotionCheckInPortal = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { submitMoodCheckIn, loading } = useLocalMoodTracking();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(3);
  const [selectedContexts, setSelectedContexts] = useState([]);
  const [notes, setNotes] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEmergencySupport, setShowEmergencySupport] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [checkInComplete, setCheckInComplete] = useState(false);

  const totalSteps = 5;

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <NavigationLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
            <p className="text-gray-600">You need to be signed in to track your emotions.</p>
          </div>
        </div>
      </NavigationLayout>
    );
  }

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentStep(2);
    }, 600);
  };

  const handleIntensityComplete = () => {
    if (intensity >= 8) {
      setShowEmergencySupport(true);
    } else {
      setCurrentStep(3);
    }
  };

  const handleSubmitCheckIn = async () => {
    try {
      const moodData = {
        emoji: selectedMood.emoji,
        label: selectedMood.label,
        intensity,
        contexts: selectedContexts,
        notes
      };

      const checkIn = await submitMoodCheckIn(moodData);
      setAiAnalysis(checkIn.ai_analysis);
      
      if (checkIn.is_crisis_detected) {
        setShowEmergencySupport(true);
      } else {
        setCheckInComplete(true);
        setCurrentStep(5);
      }
    } catch (error) {
      console.error('Error submitting check-in:', error);
      // Handle error - could show error message
    }
  };

  const handleContextToggle = (contextId) => {
    setSelectedContexts((prev) =>
      prev?.includes(contextId)
        ? prev?.filter((id) => id !== contextId)
        : [...prev, contextId]
    );
  };

  const handleContextComplete = () => {
    setCurrentStep(4);
  };

  const handleAnalysisComplete = (recommendation) => {
    setCurrentStep(5);
  };

  const handleCelebrationContinue = (destination) => {
    switch (destination) {
      case 'ai-companion': navigate('/ai-companion-chat');
        break;
      case 'activities': navigate('/calming-activities-hub');
        break;
      case 'home': navigate('/homepage');
        break;
      default:
        navigate('/homepage');
    }
  };

  const handleEmergencyClose = () => {
    setShowEmergencySupport(false);
    setCurrentStep(3);
  };

  const handleContactCaregiver = () => {
    // In production, this would send real alerts to caregivers
    // For now, show success message and continue
    setShowEmergencySupport(false);
    setCurrentStep(3);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedMood(null);
    setIntensity(3);
    setSelectedContexts([]);
  };

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-background">
        <Breadcrumbs />

        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-3">
                  Daily Mood Check-In
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
                  Let's understand how you're feeling today
                </p>
              </div>
              {currentStep < 5 && (
                <button
                  onClick={() => setShowEmergencySupport(true)}
                  className="crisis-badge hidden md:flex"
                  aria-label="Access emergency support"
                >
                  <Icon name="AlertCircle" size={20} />
                  <span className="text-sm font-semibold">Need Help Now?</span>
                </button>
              )}
            </div>

            {currentStep < 5 && (
              <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-sm md:text-base font-semibold text-foreground">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground">
                    {Math.round((currentStep / totalSteps) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 md:h-4 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    role="progressbar"
                    aria-valuenow={currentStep}
                    aria-valuemin="1"
                    aria-valuemax={totalSteps}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8 md:space-y-12">
            {currentStep === 1 && (
              <MoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
                isAnimating={isAnimating}
              />
            )}

            {currentStep === 2 && selectedMood && (
              <div className="space-y-6 md:space-y-8">
                <IntensitySlider
                  intensity={intensity}
                  onIntensityChange={setIntensity}
                  selectedMood={selectedMood}
                />
                <div className="flex justify-center">
                  <button
                    onClick={handleIntensityComplete}
                    className="bg-primary text-primary-foreground px-8 md:px-12 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 md:gap-3"
                    aria-label="Continue to next step"
                  >
                    <span>Continue</span>
                    <Icon name="ArrowRight" size={24} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 md:space-y-8">
                <ContextSelector
                  selectedContexts={selectedContexts}
                  onContextToggle={handleContextToggle}
                />
                <div className="flex justify-center gap-4 md:gap-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-muted text-foreground px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    aria-label="Go back to previous step"
                  >
                    <Icon name="ArrowLeft" size={24} />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleContextComplete}
                    className="bg-primary text-primary-foreground px-8 md:px-12 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 md:gap-3"
                    aria-label="Continue to AI analysis"
                  >
                    <span>Analyze My Mood</span>
                    <Icon name="Sparkles" size={24} />
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && selectedMood && (
              <AIAnalysisCard
                mood={selectedMood}
                intensity={intensity}
                contexts={selectedContexts}
                onComplete={handleAnalysisComplete}
              />
            )}

            {currentStep === 5 && (
              <ProgressCelebration onContinue={handleCelebrationContinue} />
            )}
          </div>

          {currentStep < 5 && currentStep > 1 && (
            <div className="mt-8 md:mt-12 text-center">
              <button
                onClick={handleRestart}
                className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 mx-auto"
                aria-label="Start over from beginning"
              >
                <Icon name="RotateCcw" size={20} />
                <span>Start Over</span>
              </button>
            </div>
          )}
        </div>

        {showEmergencySupport && (
          <EmergencySupport
            onClose={handleEmergencyClose}
            onContactCaregiver={handleContactCaregiver}
          />
        )}
      </div>
    </NavigationLayout>
  );
};

export default EmotionCheckInPortal;