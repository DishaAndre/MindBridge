import React from 'react';
import Icon from '../AppIcon';

const MobileMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mobile-menu-button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <Icon name={isOpen ? 'X' : 'Menu'} size={24} />
    </button>
  );
};

export default MobileMenuButton;