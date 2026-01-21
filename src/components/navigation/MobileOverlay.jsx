import React, { useEffect } from 'react';

const MobileOverlay = ({ isOpen, onClick }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="mobile-overlay"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Close menu"
      onKeyPress={(e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          onClick();
        }
      }}
    />
  );
};

export default MobileOverlay;