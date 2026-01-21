import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyBanner = ({ onCrisisClick }) => {
  return (
    <div className="bg-gradient-to-r from-[#F06292] to-[#FFB74D] rounded-2xl p-6 md:p-8 shadow-lg mb-8 md:mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="flex items-start gap-4 text-white">
          <div className="gentle-pulse">
            <Icon name="AlertCircle" size={32} color="#FFFFFF" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Need Immediate Help?</h3>
            <p className="text-sm md:text-base opacity-90">
              If you're in crisis, we're here for you 24/7. Connect with support right now.
            </p>
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          iconName="Phone"
          iconPosition="left"
          onClick={onCrisisClick}
          className="w-full md:w-auto bg-white text-[#F06292] hover:bg-gray-100"
        >
          Get Help Now
        </Button>
      </div>
    </div>
  );
};

export default EmergencyBanner;