import React from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const DemoAIIntroduction = ({ onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Bot" className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Meet Your AI Companion</h3>
        <p className="text-gray-600">
          I'm here to provide 24/7 emotional support and guidance whenever you need it.
        </p>
      </div>

      <div className="bg-green-50 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <Icon name="Bot" className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-gray-800">
                Hello! I'm your MindBridge AI companion. I'm here to listen, support, and help you navigate your emotional journey. 
                I can provide coping strategies, detect when you might need extra help, and connect you with resources when needed.
              </p>
            </div>
            <div className="text-xs text-gray-500 mt-2">AI Companion • Just now</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Icon name="Clock" className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-medium text-gray-900">Available 24/7</h4>
          </div>
          <p className="text-sm text-gray-600">
            I'm always here when you need someone to talk to, day or night.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Icon name="Shield" className="w-5 h-5 text-green-600 mr-2" />
            <h4 className="font-medium text-gray-900">Safe & Private</h4>
          </div>
          <p className="text-sm text-gray-600">
            Our conversations are confidential and designed to be a safe space.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Icon name="Heart" className="w-5 h-5 text-red-600 mr-2" />
            <h4 className="font-medium text-gray-900">Empathetic Support</h4>
          </div>
          <p className="text-sm text-gray-600">
            I'm trained to provide compassionate, non-judgmental responses.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Icon name="AlertTriangle" className="w-5 h-5 text-orange-600 mr-2" />
            <h4 className="font-medium text-gray-900">Crisis Detection</h4>
          </div>
          <p className="text-sm text-gray-600">
            I can recognize when you might need immediate help and connect you to resources.
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <Icon name="Info" className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Important to Remember</h4>
            <p className="text-sm text-yellow-700">
              While I'm here to support you, I'm not a replacement for professional therapy or medical care. 
              I'll always encourage you to seek professional help when appropriate.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={onNext} size="lg">
          <Icon name="MessageSquare" className="w-4 h-4 mr-2" />
          Start Chatting
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Ready to have your first conversation?
        </p>
      </div>
    </div>
  );
};

export default DemoAIIntroduction;