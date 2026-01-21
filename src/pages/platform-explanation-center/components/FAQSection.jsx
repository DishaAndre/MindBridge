import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: 'Grid' },
    { id: 'getting-started', name: 'Getting Started', icon: 'Play' },
    { id: 'features', name: 'Features', icon: 'Zap' },
    { id: 'privacy', name: 'Privacy & Security', icon: 'Shield' },
    { id: 'technical', name: 'Technical', icon: 'Settings' },
    { id: 'billing', name: 'Billing', icon: 'CreditCard' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I get started with MindBridge?',
      answer: 'Getting started is easy! First, create your account and complete your profile. Then, try your first emotion check-in to see how the platform works. Our getting started guide will walk you through each step, and you can watch video tutorials for additional help.'
    },
    {
      id: 2,
      category: 'features',
      question: 'What is the AI Companion and how does it work?',
      answer: 'The AI Companion is a supportive chatbot available 24/7 to listen and provide emotional support. It uses advanced AI to understand your emotions and provide appropriate responses. While it\'s not a replacement for professional therapy, it can offer comfort, coping strategies, and crisis detection when needed.'
    },
    {
      id: 3,
      category: 'privacy',
      question: 'Is my personal information and mental health data secure?',
      answer: 'Yes, we take your privacy very seriously. All data is encrypted both in transit and at rest. We comply with HIPAA and GDPR regulations. Your mental health information is never shared without your explicit consent, and you have full control over what data you share with caregivers.'
    },
    {
      id: 4,
      category: 'features',
      question: 'How does the caregiver dashboard work?',
      answer: 'The caregiver dashboard allows trusted family members or professionals to monitor your well-being (with your permission). You control what information is shared, and caregivers can see mood trends, receive alerts for concerning patterns, and access communication tools to better support you.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'What devices and browsers are supported?',
      answer: 'MindBridge works on all modern web browsers including Chrome, Firefox, Safari, and Edge. It\'s optimized for both desktop and mobile devices. We also ensure compatibility with screen readers and other assistive technologies.'
    },
    {
      id: 6,
      category: 'features',
      question: 'What happens if the AI detects I\'m in crisis?',
      answer: 'If our AI detects signs of crisis or self-harm, it will immediately provide crisis resources, suggest contacting emergency services or crisis hotlines, and alert your designated emergency contacts (if you\'ve set them up). The system is designed to err on the side of caution to ensure your safety.'
    },
    {
      id: 7,
      category: 'getting-started',
      question: 'Do I need to have a cognitive disability to use MindBridge?',
      answer: 'No, while MindBridge is designed with cognitive disabilities in mind, anyone can benefit from our accessible, supportive mental health tools. Our platform is built to be inclusive and helpful for all users seeking emotional wellness support.'
    },
    {
      id: 8,
      category: 'privacy',
      question: 'Can I delete my data if I want to stop using the platform?',
      answer: 'Yes, you have the right to delete your account and all associated data at any time. You can do this through your account settings, or contact our support team for assistance. We will permanently remove all your personal information within 30 days of your request.'
    },
    {
      id: 9,
      category: 'billing',
      question: 'Is MindBridge free to use?',
      answer: 'MindBridge offers both free and premium features. Basic emotion tracking, AI companion chat, and crisis support are always free. Premium features include advanced analytics, extended caregiver tools, and priority support. Check our pricing page for current details.'
    },
    {
      id: 10,
      category: 'technical',
      question: 'What accessibility features are available?',
      answer: 'MindBridge includes high contrast mode, scalable text, screen reader compatibility, keyboard navigation, simple language options, visual cues, and consistent layouts. We continuously work to improve accessibility based on user feedback.'
    },
    {
      id: 11,
      category: 'features',
      question: 'How accurate is the mood tracking and AI analysis?',
      answer: 'Our AI uses advanced emotion recognition and pattern analysis, but it\'s important to remember that it\'s a tool to support your self-awareness, not a medical diagnosis. The accuracy improves over time as the system learns your patterns. Always consult healthcare professionals for medical concerns.'
    },
    {
      id: 12,
      category: 'getting-started',
      question: 'Can family members or caregivers help me set up my account?',
      answer: 'Absolutely! Family members or caregivers can help you create and set up your account. However, you maintain full control over your data and privacy settings. You can choose what information to share and can change these preferences at any time.'
    }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center"
          >
            <Icon name={category.icon} className="w-3 h-3 mr-2" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <Icon 
                  name={expandedFAQ === faq.id ? "ChevronUp" : "ChevronDown"} 
                  className="w-5 h-5 text-gray-400 flex-shrink-0" 
                />
              </div>
            </button>
            
            {expandedFAQ === faq.id && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-600">Try selecting a different category or contact support.</p>
        </div>
      )}

      {/* Contact Support */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="HelpCircle" className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button>
              <Icon name="Mail" className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline">
              <Icon name="MessageSquare" className="w-4 h-4 mr-2" />
              Live Chat
            </Button>
            <Button variant="outline">
              <Icon name="Phone" className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;