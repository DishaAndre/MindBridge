import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoTutorial = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const tutorials = [
    {
      id: 1,
      title: "Getting Started with MindBridge",
      description: "A complete walkthrough of setting up your account and exploring the platform",
      duration: "5:30",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial1-1768252373725.png",
      category: "Getting Started",
      videoUrl: "#"
    },
    {
      id: 2,
      title: "How to Use Emotion Check-In",
      description: "Step-by-step guide to tracking your emotions and understanding insights",
      duration: "3:45",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial2-1768252373725.png",
      category: "Core Features",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Chatting with Your AI Companion",
      description: "Learn how to have meaningful conversations with your AI support companion",
      duration: "4:20",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial3-1768252373725.png",
      category: "Core Features",
      videoUrl: "#"
    },
    {
      id: 4,
      title: "Understanding Your Mood Journey",
      description: "Explore your mood visualizations and discover patterns in your emotional health",
      duration: "6:15",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial4-1768252373725.png",
      category: "Analytics",
      videoUrl: "#"
    },
    {
      id: 5,
      title: "Calming Activities Guide",
      description: "Discover and use calming activities to manage stress and anxiety",
      duration: "4:50",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial5-1768252373725.png",
      category: "Wellness Tools",
      videoUrl: "#"
    },
    {
      id: 6,
      title: "Caregiver Dashboard Overview",
      description: "For caregivers: How to monitor and support your loved ones",
      duration: "7:10",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial6-1768252373725.png",
      category: "For Caregivers",
      videoUrl: "#"
    },
    {
      id: 7,
      title: "Safety Features and Crisis Support",
      description: "Understanding safety features and accessing crisis support when needed",
      duration: "5:00",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial7-1768252373725.png",
      category: "Safety",
      videoUrl: "#"
    },
    {
      id: 8,
      title: "Accessibility Features Tour",
      description: "Explore accessibility features designed for users with cognitive disabilities",
      duration: "4:30",
      thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_tutorial8-1768252373725.png",
      category: "Accessibility",
      videoUrl: "#"
    }
  ];

  const categories = [...new Set(tutorials.map(t => t.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTutorials = selectedCategory === 'All' 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'All' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory('All')}
        >
          All Tutorials
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={tutorial.thumbnail} 
                alt={tutorial.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => setSelectedVideo(tutorial)}
                >
                  <Icon name="Play" className="w-4 h-4 mr-2" />
                  Play Video
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {tutorial.duration}
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {tutorial.category}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setSelectedVideo(tutorial)}
              >
                <Icon name="Play" className="w-3 h-3 mr-2" />
                Watch Tutorial
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedVideo.title}</h3>
                <Button variant="ghost" onClick={() => setSelectedVideo(null)}>
                  <Icon name="X" className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center text-white">
                  <Icon name="Play" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm opacity-75">Duration: {selectedVideo.duration}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">About this tutorial:</h4>
                  <p className="text-gray-600">{selectedVideo.description}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Category: {selectedVideo.category}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Download" className="w-3 h-3 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Share" className="w-3 h-3 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Icon name="HelpCircle" className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Need More Help?</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Can't find the tutorial you're looking for? We're here to help you get the most out of MindBridge.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Icon name="MessageSquare" className="w-4 h-4 mr-2" />
            Request Tutorial
          </Button>
          <Button variant="outline">
            <Icon name="Mail" className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline">
            <Icon name="BookOpen" className="w-4 h-4 mr-2" />
            View FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoTutorial;