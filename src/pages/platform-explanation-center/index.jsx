import React, { useState } from 'react';
import NavigationLayout from '../../components/navigation/NavigationLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FeatureExplanationCard from './components/FeatureExplanationCard';
import VideoTutorial from './components/VideoTutorial';
import FAQSection from './components/FAQSection';
import GettingStartedGuide from './components/GettingStartedGuide';
import AccessibilityGuide from './components/AccessibilityGuide';

const PlatformExplanationCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFeature, setSelectedFeature] = useState(null);

  const tabs = [
    { id: 'overview', name: 'Platform Overview', icon: 'Info' },
    { id: 'features', name: 'Features Guide', icon: 'Grid' },
    { id: 'tutorials', name: 'Video Tutorials', icon: 'Play' },
    { id: 'getting-started', name: 'Getting Started', icon: 'BookOpen' },
    { id: 'accessibility', name: 'Accessibility', icon: 'Eye' },
    { id: 'faq', name: 'FAQ', icon: 'HelpCircle' }
  ];

  const platformFeatures = [
    {
      id: 'emotion-checkin',
      title: 'Emotion Check-In Portal',
      description: 'Track your daily emotions with our simple, guided check-in process',
      icon: 'Heart',
      color: 'blue',
      benefits: [
        'Easy emoji-based mood selection',
        'AI-powered insights and recommendations',
        'Pattern recognition over time',
        'Crisis detection and support'
      ],
      howItWorks: [
        'Select your current mood using emojis',
        'Rate the intensity on a 1-10 scale',
        'Choose relevant contexts or triggers',
        'Receive personalized insights and suggestions',
        'Track your progress over time'
      ]
    },
    {
      id: 'ai-companion',
      title: 'AI Companion Chat',
      description: '24/7 supportive conversation with our empathetic AI companion',
      icon: 'MessageSquare',
      color: 'green',
      benefits: [
        'Available anytime, day or night',
        'Non-judgmental listening and support',
        'Personalized responses based on your needs',
        'Crisis detection and emergency support'
      ],
      howItWorks: [
        'Start a conversation anytime you need support',
        'Share your thoughts and feelings openly',
        'Receive empathetic responses and suggestions',
        'Get connected to human help when needed',
        'Build a history of supportive conversations'
      ]
    },
    {
      id: 'mood-journey',
      title: 'Mood Journey Visualizer',
      description: 'Visualize your emotional patterns and celebrate your progress',
      icon: 'TrendingUp',
      color: 'purple',
      benefits: [
        'Beautiful charts showing your mood trends',
        'Pattern recognition and insights',
        'Achievement badges for milestones',
        'Export data for healthcare providers'
      ],
      howItWorks: [
        'Your check-ins automatically create visualizations',
        'View trends over days, weeks, or months',
        'Discover patterns in your emotional journey',
        'Celebrate achievements and progress',
        'Share insights with your care team'
      ]
    },
    {
      id: 'calming-activities',
      title: 'Calming Activities Hub',
      description: 'Guided activities to help you manage stress and find peace',
      icon: 'Zap',
      color: 'orange',
      benefits: [
        'Variety of evidence-based activities',
        'Personalized recommendations',
        'Progress tracking and completion badges',
        'Activities for different emotions and situations'
      ],
      howItWorks: [
        'Browse activities by category or emotion',
        'Follow guided instructions or videos',
        'Track your completion and effectiveness',
        'Build a personalized toolkit of strategies',
        'Get recommendations based on your needs'
      ]
    },
    {
      id: 'caregiver-dashboard',
      title: 'Caregiver Insights Dashboard',
      description: 'Help caregivers stay connected and provide better support',
      icon: 'Users',
      color: 'pink',
      benefits: [
        'Real-time mood updates from individuals',
        'Alert system for concerning patterns',
        'Communication tools and logs',
        'Resource library for caregivers'
      ],
      howItWorks: [
        'Individuals grant access to their caregivers',
        'Caregivers see mood trends and alerts',
        'Communication tools facilitate check-ins',
        'Resources help caregivers provide better support',
        'Privacy controls ensure appropriate access'
      ]
    },
    {
      id: 'safety-crisis',
      title: 'Safety & Crisis Support',
      description: 'Immediate help and resources when you need them most',
      icon: 'Shield',
      color: 'red',
      benefits: [
        'Immediate access to crisis hotlines',
        'Personal safety planning tools',
        'Emergency contact management',
        'Crisis assessment and intervention'
      ],
      howItWorks: [
        'Access crisis resources anytime',
        'Create and maintain your safety plan',
        'Get immediate help during crisis situations',
        'Connect with emergency contacts quickly',
        'Receive appropriate level of intervention'
      ]
    }
  ];

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Platform Explanation Center', href: '/platform-explanation-center' }
            ]} 
          />
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Icon name="Info" className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Explanation Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn how MindBridge works and discover all the ways we can support your mental health journey.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center"
              >
                <Icon name={tab.icon} className="w-4 h-4 mr-2" />
                {tab.name}
              </Button>
            ))}
          </div>

          {/* Content Sections */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Platform Overview */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What is MindBridge?</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 mb-4">
                      MindBridge is a comprehensive mental health platform designed specifically for individuals 
                      with cognitive disabilities and their caregivers. We provide accessible, supportive tools 
                      to help manage emotions, track progress, and stay connected with support networks.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Our platform combines AI-powered insights with human-centered design to create a safe, 
                      supportive environment where everyone can thrive.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Icon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Accessible design for all abilities</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">24/7 AI companion support</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Caregiver collaboration tools</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Check" className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Crisis detection and support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Heart" className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Emotional Wellness</h3>
                  <p className="text-gray-600">Track, understand, and improve your emotional well-being with guided tools and insights.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Connected Care</h3>
                  <p className="text-gray-600">Stay connected with caregivers and support networks through secure, collaborative tools.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety First</h3>
                  <p className="text-gray-600">Built-in crisis detection and immediate access to emergency resources when needed.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformFeatures.map((feature) => (
                  <FeatureExplanationCard
                    key={feature.id}
                    feature={feature}
                    onClick={() => setSelectedFeature(feature)}
                  />
                ))}
              </div>
              
              {selectedFeature && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${selectedFeature.color}-100 rounded-full flex items-center justify-center mr-4`}>
                        <Icon name={selectedFeature.icon} className={`w-6 h-6 text-${selectedFeature.color}-600`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedFeature.title}</h3>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedFeature(null)}>
                      <Icon name="X" className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h4>
                      <ul className="space-y-2">
                        {selectedFeature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <Icon name="Check" className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
                      <ol className="space-y-2">
                        {selectedFeature.howItWorks.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className={`w-6 h-6 bg-${selectedFeature.color}-100 text-${selectedFeature.color}-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0`}>
                              {index + 1}
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tutorials' && <VideoTutorial />}
          {activeTab === 'getting-started' && <GettingStartedGuide />}
          {activeTab === 'accessibility' && <AccessibilityGuide />}
          {activeTab === 'faq' && <FAQSection />}
        </div>
      </div>
    </NavigationLayout>
  );
};

export default PlatformExplanationCenter;