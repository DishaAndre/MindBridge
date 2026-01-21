import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureExplanationCard = ({ feature, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 bg-${feature.color}-100 rounded-full flex items-center justify-center mr-3`}>
          <Icon name={feature.icon} className={`w-5 h-5 text-${feature.color}-600`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{feature.description}</p>
      
      <div className="space-y-2 mb-4">
        {feature.benefits.slice(0, 2).map((benefit, index) => (
          <div key={index} className="flex items-start">
            <Icon name="Check" className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600">{benefit}</span>
          </div>
        ))}
        {feature.benefits.length > 2 && (
          <div className="text-sm text-gray-500">
            +{feature.benefits.length - 2} more benefits
          </div>
        )}
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        <Icon name="ArrowRight" className="w-3 h-3 mr-2" />
        Learn More
      </Button>
    </div>
  );
};

export default FeatureExplanationCard;