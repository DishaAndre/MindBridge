import React from 'react';
import Icon from '../../../components/AppIcon';

const EmergencySupport = ({ onClose, onContactCaregiver }) => {
  const emergencyResources = [
    {
      id: 1,
      name: 'Crisis Hotline',
      number: '988',
      description: 'Suicide & Crisis Lifeline - Available 24/7',
      icon: 'Phone',
      color: 'bg-error',
    },
    {
      id: 2,
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free 24/7 support via text message',
      icon: 'MessageSquare',
      color: 'bg-warning',
    },
    {
      id: 3,
      name: 'Emergency Services',
      number: '911',
      description: 'For immediate life-threatening emergencies',
      icon: 'AlertCircle',
      color: 'bg-destructive',
    },
  ];

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-error text-error-foreground p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-error-foreground/20 flex items-center justify-center gentle-pulse">
                <Icon name="Heart" size={32} className="text-error-foreground" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">You're Not Alone</h2>
                <p className="text-sm md:text-base opacity-90">Help is available right now</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-error-foreground/20 transition-colors duration-300"
              aria-label="Close emergency support"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6 md:space-y-8">
          <div className="bg-muted rounded-xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm md:text-base text-foreground mb-2">
                  If you're having thoughts of harming yourself or others, please reach out for help immediately.
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  These resources are confidential, free, and available 24/7.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-foreground">Emergency Resources</h3>
            {emergencyResources?.map((resource) => (
              <div
                key={resource?.id}
                className={`${resource?.color} rounded-xl p-4 md:p-6 text-white`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={resource?.icon} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base md:text-lg font-bold mb-1">{resource?.name}</h4>
                    <p className="text-xl md:text-2xl font-bold mb-2">{resource?.number}</p>
                    <p className="text-sm md:text-base opacity-90">{resource?.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6 md:pt-8">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
              Contact Your Support Person
            </h3>
            <button
              onClick={onContactCaregiver}
              className="w-full bg-primary text-primary-foreground px-6 md:px-8 py-4 md:py-5 rounded-xl text-base md:text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 md:gap-3"
              aria-label="Contact your caregiver"
            >
              <Icon name="Users" size={24} />
              <span>Alert My Caregiver</span>
            </button>
            <p className="text-xs md:text-sm text-muted-foreground text-center mt-3">
              This will send an immediate notification to your support person
            </p>
          </div>

          <div className="bg-[#E8F5E8] rounded-xl p-4 md:p-6">
            <div className="flex items-start gap-3">
              <Icon name="Heart" size={24} className="text-success flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm md:text-base text-foreground font-semibold mb-2">
                  Remember: This feeling is temporary
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  You've gotten through difficult times before, and you can get through this too. Help is here for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySupport;