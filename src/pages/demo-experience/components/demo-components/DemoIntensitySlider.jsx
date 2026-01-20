import React, { useState } from 'react';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';

const DemoIntensitySlider = ({ onNext }) => {
  const [intensity, setIntensity] = useState(5);
  const [hasInteracted, setHasInteracted] = useState(false);

  const getIntensityLabel = (value) => {
    if (value <= 2) return 'Very Low';
    if (value <= 4) return 'Low';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'High';
    return 'Very High';
  };

  const getIntensityColor = (value) => {
    if (value <= 3) return 'green';
    if (value <= 6) return 'yellow';
    if (value <= 8) return 'orange';
    return 'red';
  };

  const handleSliderChange = (e) => {
    setIntensity(parseInt(e.target.value));
    setHasInteracted(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">How intense is this feeling?</h3>
        <p className="text-gray-600">Use the slider to rate the intensity from 1 (very low) to 10 (very high)</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-${getIntensityColor(intensity)}-100`}>
            <span className={`text-2xl font-bold text-${getIntensityColor(intensity)}-600`}>
              {intensity}
            </span>
          </div>
          <div className={`text-lg font-medium text-${getIntensityColor(intensity)}-600`}>
            {getIntensityLabel(intensity)}
          </div>
        </div>

        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={handleSliderChange}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${(intensity-1)*10}%, #e5e7eb ${(intensity-1)*10}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <span>Very Low</span>
          <span>Very High</span>
        </div>
      </div>

      {hasInteracted && (
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="TrendingUp" className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-lg font-medium text-gray-900">
              Intensity: {intensity}/10 ({getIntensityLabel(intensity)})
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {intensity >= 8 
              ? "That's quite intense. Let's explore what might be contributing to this feeling."
              : intensity >= 6
              ? "A moderate level. Understanding the context can help us provide better support."
              : "That's manageable. Let's see what factors might be influencing your mood."
            }
          </p>
          <Button onClick={onNext}>
            <Icon name="ArrowRight" className="w-4 h-4 mr-2" />
            Add Context
          </Button>
        </div>
      )}

      {!hasInteracted && (
        <div className="text-center text-gray-500">
          <Icon name="Move" className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Drag the slider to set your intensity level</p>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default DemoIntensitySlider;