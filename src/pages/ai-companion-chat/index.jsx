import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NavigationLayout from '../../components/navigation/NavigationLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import EnhancedChatbot from '../../components/chat/EnhancedChatbot';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AICompanionChat = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [crisisData, setCrisisData] = useState(null);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <NavigationLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
            <p className="text-gray-600">You need to be signed in to chat with your AI companion.</p>
          </div>
        </div>
      </NavigationLayout>
    );
  }

  const handleCrisisDetected = (crisisMessage) => {
    setCrisisData(crisisMessage);
    setShowCrisisModal(true);
  };

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'AI Companion Chat', href: '/ai-companion-chat' }
            ]} 
          />
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Icon name="MessageSquare" className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Companion Chat
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your supportive AI companion is here 24/7 to listen, understand, and provide guidance whenever you need it.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-lg h-[600px] overflow-hidden">
            <EnhancedChatbot onCrisisDetected={handleCrisisDetected} />
          </div>

          {/* Crisis Modal */}
          {showCrisisModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="AlertTriangle" className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Crisis Support Available</h2>
                  <p className="text-gray-600">
                    We've detected that you might be in distress. Immediate help is available.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => window.open('tel:988')}
                  >
                    <Icon name="Phone" className="w-4 h-4 mr-2" />
                    Call 988 Crisis Lifeline
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/safety-crisis-support')}
                  >
                    <Icon name="Shield" className="w-4 h-4 mr-2" />
                    View Crisis Resources
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowCrisisModal(false)}
                  >
                    Continue Conversation
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  If this is a medical emergency, please call 911 immediately.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};

export default AICompanionChat;