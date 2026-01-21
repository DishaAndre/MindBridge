import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoSelector = ({ demoOptions, onSelectDemo }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Choose Your Demo Experience</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {demoOptions.map((demo) => (
          <div key={demo.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className={`w-12 h-12 bg-${demo.color}-100 rounded-full flex items-center justify-center mr-4`}>
                <Icon name={demo.icon} className={`w-6 h-6 text-${demo.color}-600`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{demo.title}</h3>
                <p className="text-sm text-gray-600">{demo.duration}</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{demo.description}</p>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">What you'll experience:</h4>
              <ul className="space-y-1">
                {demo.steps.slice(0, 3).map((step, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Icon name="Check" className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                    {step.title}
                  </li>
                ))}
                {demo.steps.length > 3 && (
                  <li className="text-sm text-gray-500">
                    +{demo.steps.length - 3} more steps
                  </li>
                )}
              </ul>
            </div>
            
            <Button 
              onClick={() => onSelectDemo(demo)}
              className="w-full"
            >
              <Icon name="Play" className="w-4 h-4 mr-2" />
              Start Demo
            </Button>
          </div>
        ))}
      </div>
      
      {/* Quick Demo Option */}
      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Short on time?</h3>
          <p className="text-gray-600 mb-4">
            Try our 2-minute quick tour to see the key features of MindBridge.
          </p>
          <Button variant="outline">
            <Icon name="Zap" className="w-4 h-4 mr-2" />
            Quick Tour (2 min)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoSelector;