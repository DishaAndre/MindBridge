import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportOptions = ({ onExport }) => {
  const [showOptions, setShowOptions] = useState(false);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      emoji: '📄',
      description: 'Easy to print and share with doctors',
      icon: 'FileText',
    },
    {
      id: 'csv',
      name: 'Spreadsheet',
      emoji: '📊',
      description: 'Open in Excel or Google Sheets',
      icon: 'Table',
    },
    {
      id: 'image',
      name: 'Chart Image',
      emoji: '🖼️',
      description: 'Save charts as pictures',
      icon: 'Image',
    },
    {
      id: 'email',
      name: 'Email to Caregiver',
      emoji: '📧',
      description: 'Send directly to your support person',
      icon: 'Mail',
    },
  ];

  const handleExport = (format) => {
    if (format === 'image') {
      // For now, show a helpful message about chart screenshots
      alert('💡 Tip: You can take a screenshot of your charts to save them as images! On most devices, use Ctrl+Shift+S (Windows) or Cmd+Shift+4 (Mac).');
      setShowOptions(false);
      return;
    }
    
    if (format === 'email') {
      // For now, show a message about sharing
      alert('📧 Email sharing coming soon! For now, you can export as PDF and attach it to an email to your caregiver.');
      setShowOptions(false);
      return;
    }

    if (onExport) {
      onExport(format);
    }
    setShowOptions(false);
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="Share">📤</span>
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Share Your Journey</h3>
            <p className="text-sm text-muted-foreground">Export to share with healthcare providers</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-2 rounded-lg hover:bg-muted transition-all duration-300"
          aria-label={showOptions ? 'Hide export options' : 'Show export options'}
          aria-expanded={showOptions}
        >
          <Icon name={showOptions ? 'ChevronUp' : 'ChevronDown'} size={20} />
        </button>
      </div>
      {showOptions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {exportFormats?.map((format) => (
            <button
              key={format?.id}
              onClick={() => handleExport(format?.id)}
              className="flex items-start gap-3 p-4 bg-muted hover:bg-accent hover:text-accent-foreground rounded-xl transition-all duration-300 text-left group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary bg-opacity-10 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                <span className="text-2xl" role="img" aria-label={format?.name}>
                  {format?.emoji}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm md:text-base font-semibold">{format?.name}</h4>
                  <Icon name="Download" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-xs md:text-sm opacity-80">{format?.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary to-secondary rounded-xl text-white">
        <div className="flex items-start gap-3">
          <Icon name="Lock" size={20} className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base font-semibold mb-1">Safe Sharing</p>
            <p className="text-xs md:text-sm opacity-90">
              When you export, only the information you choose is included. Your data stays private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;