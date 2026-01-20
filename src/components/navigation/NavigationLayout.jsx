import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileMenuButton from './MobileMenuButton';
import MobileOverlay from './MobileOverlay';

const NavigationLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCrisisClick = () => {
    navigate('/safety-crisis-support');
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileMenuButton
        isOpen={isMobileMenuOpen}
        onClick={handleMobileMenuToggle}
      />

      <MobileOverlay
        isOpen={isMobileMenuOpen}
        onClick={handleMobileMenuToggle}
      />

      <div className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''} ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      </div>

      <Header
        isSidebarCollapsed={isSidebarCollapsed}
        onCrisisClick={handleCrisisClick}
      />

      <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default NavigationLayout;