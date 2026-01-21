import React, { useState } from 'react';
import NavigationLayout from '../../components/navigation/NavigationLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DemoSelector from './components/DemoSelector';
import InteractiveDemo from './components/InteractiveDemo';
import FeatureShowcase from './components/FeatureShowcase';
import TestimonialCarousel from './components/TestimonialCarousel';

const DemoExperience = () => {
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [demoStep, setDemoStep] = useState(0);

  const demoOptions = [
    {
      id: 'emotion-checkin',
      title: 'Emotion Check-In Demo',
      description: 'Experience our guided emotion tracking process',
      icon: 'Heart',
      color: 'blue',
      duration: '3 minutes',
      steps: [
        {
          title: 'Select Your Mood',
          description: 'Choose how you\'re feeling right now using our emoji interface',
          component: 'MoodSelector'
        },
        {
          title: 'Rate Intensity',
          description: 'Use the slider to indicate how strong your emotions are',
          component: 'IntensitySlider'
        },
        {
          title: 'Add Context',
          description: 'Select what might be influencing your mood today',
          component: 'ContextSelector'
        },
        {
          title: 'Get Insights',
          description: 'See personalized insights and recommendations from our AI',
          component: 'AIInsights'
        }
      ]
    },
    {
      id: 'ai-chat',
      title: 'AI Companion Demo',
      description: 'Chat with our supportive AI companion',
      icon: 'MessageSquare',
      color: 'green',
      duration: '5 minutes',
      steps: [
        {
          title: 'Meet Your Companion',
          description: 'Get introduced to your AI support companion',
          component: 'AIIntroduction'
        },
        {
          title: 'Start Conversation',
          description: 'Try different conversation starters and responses',
          component: 'ChatInterface'
        },
        {
          title: 'Get Support',
          description: 'Experience empathetic responses and helpful suggestions',
          component: 'SupportResponse'
        },
        {
          title: 'Crisis Detection',
          description: 'See how the AI responds to concerning messages',
          component: 'CrisisDemo'
        }
      ]
    },
    {
      id: 'caregiver-dashboard',
      title: 'Caregiver Dashboard Demo',
      description: 'Explore tools for supporting loved ones',
      icon: 'Users',
      color: 'purple',
      duration: '4 minutes',
      steps: [
        {
          title: 'Dashboard Overview',
          description: 'See real-time mood updates and alerts',
          component: 'DashboardOverview'
        },
        {
          title: 'Mood Patterns',
          description: 'Analyze mood trends and patterns over time',
          component: 'MoodPatterns'
        },
        {
          title: 'Alert System',
          description: 'Understand how alerts work and when they\'re triggered',
          component: 'AlertSystem'
        },
        {
          title: 'Communication Tools',
          description: 'Use tools to stay connected and provide support',
          component: 'CommunicationTools'
        }
      ]
    },
    {
      id: 'calming-activities',
      title: 'Calming Activities Demo',
      description: 'Try our stress-relief and mindfulness activities',
      icon: 'Zap',
      color: 'orange',
      duration: '6 minutes',
      steps: [
        {
          title: 'Browse Activities',
          description: 'Explore activities by category and emotion',
          component: 'ActivityBrowser'
        },
        {
          title: 'Breathing Exercise',
          description: 'Try a guided breathing exercise',
          component: 'BreathingExercise'
        },
        {
          title: 'Mindfulness Activity',
          description: 'Experience a short mindfulness practice',
          component: 'MindfulnessActivity'
        },
        {
          title: 'Track Progress',
          description: 'See how activities are tracked and rated',
          component: 'ProgressTracking'
        }
      ]
    }
  ];

  const handleStartDemo = (demo) => {
    setSelectedDemo(demo);
    setDemoStep(0);
  };

  const handleNextStep = () => {
    if (selectedDemo && demoStep < selectedDemo.steps.length - 1) {
      setDemoStep(demoStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (demoStep > 0) {
      setDemoStep(demoStep - 1);
    }
  };

  const handleEndDemo = () => {
    setSelectedDemo(null);
    setDemoStep(0);
  };

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Demo Experience', href: '/demo-experience' }
            ]} 
          />
          
          {!selectedDemo ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Icon name="Play" className="w-8 h-8 text-purple-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Try MindBridge Demo
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience our mental health platform firsthand. Try our interactive demos to see how MindBridge can support your emotional wellness journey.
                </p>
              </div>

              {/* Demo Options */}
              <DemoSelector 
                demoOptions={demoOptions} 
                onSelectDemo={handleStartDemo}
              />

              {/* Feature Showcase */}
              <FeatureShowcase />

              {/* Testimonials */}
              <TestimonialCarousel />

              {/* Call to Action */}
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of users who are already improving their mental health with MindBridge.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg">
                    <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                    Create Free Account
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Info" className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Phone" className="w-4 h-4 mr-2" />
                    Contact Sales
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <InteractiveDemo
              demo={selectedDemo}
              currentStep={demoStep}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onEndDemo={handleEndDemo}
            />
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};

export default DemoExperience;