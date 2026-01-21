import React from 'react';
import Icon from '../../../components/AppIcon';

const UserModeToggle = ({ currentMode, onModeChange }) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon name="ToggleLeft" size={24} color="#4FC3F7" />
          <span className="text-base md:text-lg font-semibold text-gray-800">View mode:</span>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => onModeChange('individual')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentMode === 'individual' 
                ? 'bg-[#4FC3F7] text-white shadow-md scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={currentMode === 'individual'}
            title="Switch to Individual perspective - view your personal mood tracking, AI companion, and wellness tools"
          >
            <span className="mr-2" role="img" aria-label="Individual perspective">😊</span>
            Individual
          </button>

          <button
            onClick={() => onModeChange('caregiver')}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentMode === 'caregiver' 
                ? 'bg-[#AB47BC] text-white shadow-md scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={currentMode === 'caregiver'}
            title="Switch to Caregiver perspective - view insights dashboard, alerts, and monitoring tools"
          >
            <span className="mr-2" role="img" aria-label="Caregiver perspective">👥</span>
            Caregiver
          </button>
        </div>
      </div>
      
      {/* Mode explanation */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          {currentMode === 'individual' 
            ? "Individual mode: Access your personal mood tracking, AI companion, and wellness activities"
            : "Caregiver mode: View insights dashboard, alerts, trends, and monitoring tools for those in your care"
          }
        </p>
      </div>
    </div>
  );
};

export default UserModeToggle;