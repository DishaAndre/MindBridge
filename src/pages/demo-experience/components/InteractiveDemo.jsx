import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import DemoMoodSelector from './demo-components/DemoMoodSelector';
import DemoIntensitySlider from './demo-components/DemoIntensitySlider';
import DemoContextSelector from './demo-components/DemoContextSelector';
import DemoAIInsights from './demo-components/DemoAIInsights';
import DemoAIIntroduction from './demo-components/DemoAIIntroduction';
import DemoChatInterface from './demo-components/DemoChatInterface';

const InteractiveDemo = ({ demo, currentStep, onNextStep, onPrevStep, onEndDemo }) => {
  const currentStepData = demo.steps[currentStep];
  const progress = ((currentStep + 1) / demo.steps.length) * 100;

  const renderDemoComponent = () => {
    switch (currentStepData.component) {
      case 'MoodSelector':
        return <DemoMoodSelector onNext={onNextStep} />;
      case 'IntensitySlider':
        return <DemoIntensitySlider onNext={onNextStep} />;
      case 'ContextSelector':
        return <DemoContextSelector onNext={onNextStep} />;
      case 'AIInsights':
        return <DemoAIInsights onNext={onNextStep} />;
      case 'AIIntroduction':
        return <DemoAIIntroduction onNext={onNextStep} />;
      case 'ChatInterface':
        return <DemoChatInterface onNext={onNextStep} />;
      default:
        return (
          <div className="text-center py-12">
            <div className={`w-16 h-16 bg-${demo.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon name={demo.icon} className={`w-8 h-8 text-${demo.color}-600`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentStepData.title}</h3>
            <p className="text-gray-600 mb-6">{currentStepData.description}</p>
            <Button onClick={onNextStep}>
              Continue Demo
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Demo Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 bg-${demo.color}-100 rounded-full flex items-center justify-center mr-3`}>
              <Icon name={demo.icon} className={`w-5 h-5 text-${demo.color}-600`} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{demo.title}</h1>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {demo.steps.length}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onEndDemo}>
            <Icon name="X" className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className={`bg-${demo.color}-600 h-2 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{currentStepData.title}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>

      {/* Demo Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>
        
        {renderDemoComponent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onPrevStep}
          disabled={currentStep === 0}
        >
          <Icon name="ChevronLeft" className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex items-center space-x-2">
          {demo.steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <= currentStep ? `bg-${demo.color}-600` : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        {currentStep < demo.steps.length - 1 ? (
          <Button onClick={onNextStep}>
            Next
            <Icon name="ChevronRight" className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={onEndDemo}>
            <Icon name="Check" className="w-4 h-4 mr-2" />
            Complete Demo
          </Button>
        )}
      </div>

      {/* Demo Completion */}
      {currentStep === demo.steps.length - 1 && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Complete!</h3>
          <p className="text-gray-600 mb-4">
            You've experienced the key features of {demo.title}. Ready to try the real thing?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button>
              <Icon name="UserPlus" className="w-4 h-4 mr-2" />
              Create Account
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
              Try Another Demo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDemo;