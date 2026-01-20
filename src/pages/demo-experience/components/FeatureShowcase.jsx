import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureShowcase = () => {
  const features = [
    {
      id: 1,
      title: "Emotion Tracking Made Simple",
      description: "Track your emotions with our intuitive emoji-based interface. No complex forms or confusing scales.",
      icon: "Heart",
      color: "blue",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_emotion-tracking-1768252373725.png"
    },
    {
      id: 2,
      title: "AI-Powered Insights",
      description: "Get personalized insights and recommendations based on your emotional patterns and triggers.",
      icon: "Brain",
      color: "purple",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_ai-insights-1768252373725.png"
    },
    {
      id: 3,
      title: "24/7 Supportive Companion",
      description: "Chat with our empathetic AI companion anytime you need someone to listen and provide support.",
      icon: "MessageSquare",
      color: "green",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_ai-companion-1768252373725.png"
    },
    {
      id: 4,
      title: "Caregiver Collaboration",
      description: "Keep your support network informed with secure sharing and real-time alerts for concerning patterns.",
      icon: "Users",
      color: "pink",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_caregiver-dashboard-1768252373725.png"
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose MindBridge?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform combines cutting-edge AI with human-centered design to provide accessible, 
          effective mental health support for everyone.
        </p>
      </div>

      <div className="space-y-8">
        {features.map((feature, index) => (
          <div key={feature.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-${feature.color}-100 rounded-full flex items-center justify-center mr-3`}>
                    <Icon name={feature.icon} className={`w-5 h-5 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Icon name="Image" className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Feature Preview</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureShowcase;