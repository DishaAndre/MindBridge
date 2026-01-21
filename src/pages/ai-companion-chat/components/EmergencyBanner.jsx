import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyBanner = ({ onCrisisClick, onCalmingClick }) => {
  return (
    <div className="bg-gradient-to-r from-[#F06292] to-[#FF6B6B] rounded-2xl p-4 md:p-6 mb-4 md:mb-6 shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 gentle-pulse">
            <Icon name="AlertCircle" size={28} color="#FFFFFF" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-white mb-1">
              Need Immediate Help?
            </h3>
            <p className="text-xs md:text-sm text-white/90">
              We're here for you. Get support right now.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button
            variant="default"
            onClick={onCrisisClick}
            className="bg-white text-[#F06292] hover:bg-white/90 font-semibold whitespace-nowrap"
            iconName="Phone"
            iconPosition="left"
          >
            Crisis Support
          </Button>
          <Button
            variant="outline"
            onClick={onCalmingClick}
            className="bg-white/10 text-white border-white/30 hover:bg-white/20 whitespace-nowrap"
            iconName="Wind"
            iconPosition="left"
          >
            Calming Exercise
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;