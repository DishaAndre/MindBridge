import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GettingStartedGuide = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [expandedStep, setExpandedStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      description: "Set up your MindBridge profile and preferences",
      estimatedTime: "2 minutes",
      icon: "UserPlus",
      details: [
        "Choose your account type (Individual or Caregiver)",
        "Provide basic information and preferences",
        "Set up your profile with a photo (optional)",
        "Configure notification preferences",
        "Review privacy settings"
      ],
      tips: [
        "Use a strong, memorable password",
        "Enable notifications for important alerts",
        "Consider adding a profile photo to personalize your experience"
      ]
    },
    {
      id: 2,
      title: "Complete Your First Emotion Check-In",
      description: "Learn how to track your emotions and get personalized insights",
      estimatedTime: "3 minutes",
      icon: "Heart",
      details: [
        "Navigate to the Emotion Check-In Portal",
        "Select your current mood using emojis",
        "Rate the intensity of your emotions (1-10)",
        "Choose relevant contexts or triggers",
        "Review your AI-generated insights"
      ],
      tips: [
        "Be honest about your feelings - this helps the AI provide better support",
        "Don't worry if you're not sure about intensity - it gets easier with practice",
        "Check in regularly for better pattern recognition"
      ]
    },
    {
      id: 3,
      title: "Meet Your AI Companion",
      description: "Start your first conversation with your supportive AI companion",
      estimatedTime: "5 minutes",
      icon: "MessageSquare",
      details: [
        "Go to the AI Companion Chat page",
        "Read the welcome message and capabilities",
        "Try one of the conversation starters",
        "Ask questions or share how you're feeling",
        "Explore quick response options"
      ],
      tips: [
        "The AI is here to listen and support, not judge",
        "Feel free to share as much or as little as you're comfortable with",
        "The AI learns your preferences over time"
      ]
    },
    {
      id: 4,
      title: "Explore Calming Activities",
      description: "Discover activities that can help you manage stress and emotions",
      estimatedTime: "10 minutes",
      icon: "Zap",
      details: [
        "Visit the Calming Activities Hub",
        "Browse activities by category or emotion",
        "Try a breathing exercise or mindfulness activity",
        "Rate the effectiveness of activities you complete",
        "Save your favorite activities for quick access"
      ],
      tips: [
        "Start with shorter activities (5 minutes or less)",
        "Try different types to see what works best for you",
        "Use activities when you're feeling stressed or overwhelmed"
      ]
    },
    {
      id: 5,
      title: "Set Up Emergency Contacts",
      description: "Add trusted contacts for support and crisis situations",
      estimatedTime: "5 minutes",
      icon: "Phone",
      details: [
        "Go to Safety & Crisis Support",
        "Add emergency contacts (family, friends, therapists)",
        "Specify availability and relationship types",
        "Test contact methods to ensure they work",
        "Review crisis resources and hotlines"
      ],
      tips: [
        "Include at least 2-3 trusted contacts",
        "Make sure contact information is current",
        "Let your contacts know they're listed as emergency contacts"
      ]
    },
    {
      id: 6,
      title: "Connect with Caregivers (Optional)",
      description: "If you have caregivers, learn how to connect and share information",
      estimatedTime: "3 minutes",
      icon: "Users",
      details: [
        "Decide what information you want to share",
        "Send caregiver invitations through the platform",
        "Set privacy preferences for shared data",
        "Review caregiver dashboard permissions",
        "Test communication features"
      ],
      tips: [
        "You control what information is shared",
        "You can change sharing preferences anytime",
        "Caregivers can provide better support with more information"
      ]
    }
  ];

  const toggleStepCompletion = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
          <span className="text-sm text-gray-600">
            {completedSteps.length} of {steps.length} steps completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Getting Started</span>
          <span className="font-medium text-blue-600">{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isExpanded = expandedStep === step.id;
          
          return (
            <div key={step.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        isCompleted ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {isCompleted ? (
                          <Icon name="Check" className="w-4 h-4 text-green-600" />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                        )}
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        isCompleted ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <Icon name={step.icon} className={`w-5 h-5 ${
                          isCompleted ? 'text-green-600' : 'text-blue-600'
                        }`} />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        isCompleted ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                      <span className="text-sm text-gray-500">Estimated time: {step.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStepCompletion(step.id);
                      }}
                      className="mr-3"
                    >
                      {isCompleted ? (
                        <>
                          <Icon name="Check" className="w-3 h-3 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Icon name="Circle" className="w-3 h-3 mr-2" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                    
                    <Icon 
                      name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                      className="w-4 h-4 text-gray-400" 
                    />
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Step-by-step instructions:</h4>
                      <ol className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Helpful tips:</h4>
                      <ul className="space-y-2">
                        {step.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start">
                            <Icon name="Lightbulb" className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Celebration */}
      {completedSteps.length === steps.length && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
          <p className="text-gray-600 mb-6">
            You've completed the getting started guide. You're now ready to make the most of MindBridge!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button>
              <Icon name="Heart" className="w-4 h-4 mr-2" />
              Start Your First Check-In
            </Button>
            <Button variant="outline">
              <Icon name="MessageSquare" className="w-4 h-4 mr-2" />
              Chat with AI Companion
            </Button>
            <Button variant="outline">
              <Icon name="Zap" className="w-4 h-4 mr-2" />
              Try Calming Activities
            </Button>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Additional Help?</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <Icon name="Play" className="w-6 h-6 mb-2" />
            <span className="font-medium">Video Tutorials</span>
            <span className="text-sm text-gray-600">Watch step-by-step guides</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <Icon name="HelpCircle" className="w-6 h-6 mb-2" />
            <span className="font-medium">FAQ</span>
            <span className="text-sm text-gray-600">Find answers to common questions</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <Icon name="Mail" className="w-6 h-6 mb-2" />
            <span className="font-medium">Contact Support</span>
            <span className="text-sm text-gray-600">Get personalized help</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedGuide;