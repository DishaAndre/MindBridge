import React, { useState, useEffect } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const DemoAIInsights = ({ onNext }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setShowInsights(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const insights = {
    emotion: 'Happy',
    intensity: 7,
    contexts: ['Work/School', 'Exercise'],
    analysis: {
      summary: "You're experiencing a positive mood with moderate-high intensity. The combination of work satisfaction and physical activity appears to be contributing positively to your emotional state.",
      patterns: [
        "Your mood tends to improve after physical activity",
        "Work-related positive emotions often correlate with higher energy levels",
        "You typically feel happiest during mid-week periods"
      ],
      recommendations: [
        {
          title: "Maintain Your Momentum",
          description: "Continue with your current exercise routine as it's positively impacting your mood",
          icon: "Activity",
          type: "continue"
        },
        {
          title: "Celebrate Small Wins",
          description: "Take a moment to acknowledge your work achievements today",
          icon: "Trophy",
          type: "action"
        },
        {
          title: "Share Your Joy",
          description: "Consider connecting with friends or family to share your positive energy",
          icon: "Users",
          type: "social"
        }
      ]
    }
  };

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Icon name="Brain" className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Your Emotions...</h3>
        <p className="text-gray-600 mb-6">Our AI is processing your mood, intensity, and context to provide personalized insights.</p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showInsights && (
        <>
          {/* Analysis Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Icon name="Sparkles" className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI Analysis Complete</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{insights.analysis.summary}</p>
          </div>

          {/* Mood Summary */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">😊</div>
              <div className="font-medium text-gray-900">{insights.emotion}</div>
              <div className="text-sm text-gray-600">Current Mood</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{insights.intensity}/10</div>
              <div className="font-medium text-gray-900">High</div>
              <div className="text-sm text-gray-600">Intensity Level</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💪</div>
              <div className="font-medium text-gray-900">{insights.contexts.length} Factors</div>
              <div className="text-sm text-gray-600">Identified</div>
            </div>
          </div>

          {/* Patterns Discovered */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Icon name="TrendingUp" className="w-5 h-5 text-purple-600 mr-2" />
              <h4 className="font-semibold text-gray-900">Patterns We've Noticed</h4>
            </div>
            <ul className="space-y-2">
              {insights.analysis.patterns.map((pattern, index) => (
                <li key={index} className="flex items-start">
                  <Icon name="Circle" className="w-2 h-2 text-purple-600 mr-3 mt-2 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{pattern}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Icon name="Lightbulb" className="w-5 h-5 text-yellow-600 mr-2" />
              <h4 className="font-semibold text-gray-900">Personalized Recommendations</h4>
            </div>
            <div className="space-y-4">
              {insights.analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Icon name={rec.icon} className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">{rec.title}</h5>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h4 className="font-semibold text-gray-900 mb-2">What's Next?</h4>
            <p className="text-gray-600 mb-4">
              This is just a demo, but in the real app, you could save these insights, 
              try recommended activities, or share with your care team.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline">
                <Icon name="Download" className="w-4 h-4 mr-2" />
                Save Insights
              </Button>
              <Button variant="outline">
                <Icon name="Activity" className="w-4 h-4 mr-2" />
                Try Activities
              </Button>
              <Button onClick={onNext}>
                <Icon name="Check" className="w-4 h-4 mr-2" />
                Complete Demo
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DemoAIInsights;