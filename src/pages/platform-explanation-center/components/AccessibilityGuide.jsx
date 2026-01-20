import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccessibilityGuide = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const accessibilityFeatures = [
    {
      id: 'visual',
      title: 'Visual Accessibility',
      icon: 'Eye',
      color: 'blue',
      description: 'Features designed for users with visual impairments or preferences',
      features: [
        'High contrast mode for better visibility',
        'Large text options and scalable fonts',
        'Screen reader compatibility (NVDA, JAWS, VoiceOver)',
        'Alternative text for all images and icons',
        'Keyboard navigation support',
        'Focus indicators for interactive elements'
      ],
      howToUse: [
        'Go to Settings > Accessibility',
        'Enable high contrast mode',
        'Adjust text size using the slider',
        'Test with your preferred screen reader',
        'Use Tab key to navigate between elements'
      ]
    },
    {
      id: 'cognitive',
      title: 'Cognitive Support',
      icon: 'Brain',
      color: 'purple',
      description: 'Simplified interfaces and memory aids for cognitive disabilities',
      features: [
        'Simple, clear language throughout the platform',
        'Visual cues and icons to support understanding',
        'Consistent navigation and layout patterns',
        'Progress indicators for multi-step processes',
        'Reminder notifications and prompts',
        'Simplified color schemes to reduce overwhelm'
      ],
      howToUse: [
        'Enable simplified mode in Settings',
        'Turn on reminder notifications',
        'Use visual guides for complex tasks',
        'Take advantage of progress indicators',
        'Set up regular check-in reminders'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <Icon name="Heart" className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Accessibility at MindBridge</h2>
        </div>
        <p className="text-gray-600 mb-4">
          MindBridge is designed to be accessible to everyone, including individuals with cognitive disabilities, 
          visual impairments, and other accessibility needs. We believe mental health support should be available 
          to all users, regardless of their abilities.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Eye" className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">Visual Support</h3>
            <p className="text-sm text-gray-600">High contrast, large text, screen reader support</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Brain" className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900">Cognitive Support</h3>
            <p className="text-sm text-gray-600">Simple language, visual cues, consistent patterns</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Keyboard" className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Motor Support</h3>
            <p className="text-sm text-gray-600">Keyboard navigation, large click targets</p>
          </div>
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="grid md:grid-cols-2 gap-6">
        {accessibilityFeatures.map((feature) => (
          <div key={feature.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 bg-${feature.color}-100 rounded-full flex items-center justify-center mr-3`}>
                <Icon name={feature.icon} className={`w-5 h-5 text-${feature.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setSelectedFeature(feature)}
            >
              <Icon name="ArrowRight" className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessibilityGuide;