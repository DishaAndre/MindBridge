import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "Individual User",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_testimonial1-1768252373725.png",
      quote: "MindBridge has been a game-changer for me. The AI companion is always there when I need support, and the emotion tracking helps me understand my patterns better.",
      rating: 5
    },
    {
      id: 2,
      name: "Dr. Jennifer L.",
      role: "Therapist",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_testimonial2-1768252373725.png",
      quote: "I recommend MindBridge to many of my clients. The accessibility features and simple interface make it perfect for individuals with cognitive disabilities.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael R.",
      role: "Caregiver",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_testimonial3-1768252373725.png",
      quote: "The caregiver dashboard gives me peace of mind. I can stay connected with my daughter's emotional well-being while respecting her privacy.",
      rating: 5
    },
    {
      id: 4,
      name: "Lisa K.",
      role: "Individual User",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_testimonial4-1768252373725.png",
      quote: "The calming activities have really helped me manage my anxiety. I love that I can access support anytime, day or night.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
        <p className="text-gray-600">
          Real feedback from individuals, caregivers, and mental health professionals
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Icon name="User" className="w-8 h-8 text-gray-400" />
          </div>
          
          <div className="flex justify-center mb-4">
            {[...Array(current.rating)].map((_, i) => (
              <Icon key={i} name="Star" className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <blockquote className="text-lg text-gray-800 mb-6 italic leading-relaxed">
            "{current.quote}"
          </blockquote>
          
          <div className="mb-6">
            <div className="font-semibold text-gray-900">{current.name}</div>
            <div className="text-sm text-gray-600">{current.role}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={prevTestimonial}>
            <Icon name="ChevronLeft" className="w-4 h-4" />
          </Button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button variant="ghost" onClick={nextTestimonial}>
            <Icon name="ChevronRight" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
          <div className="text-gray-600">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <div className="text-gray-600">Support Available</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;