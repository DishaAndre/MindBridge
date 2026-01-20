import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      path: '/homepage',
      label: 'Home',
      icon: 'Home',
      emoji: '🏠',
    },
    {
      path: '/emotion-check-in-portal',
      label: 'Mood Check-In',
      icon: 'Heart',
      emoji: '💭',
    },
    {
      path: '/ai-companion-chat',
      label: 'AI Companion',
      icon: 'MessageCircle',
      emoji: '🤖',
    },
    {
      path: '/caregiver-insights-dashboard',
      label: 'Caregiver Insights',
      icon: 'Users',
      emoji: '👥',
    },
    {
      path: '/calming-activities-hub',
      label: 'Calming Activities',
      icon: 'Wind',
      emoji: '🧘',
    },
    {
      path: '/mood-journey-visualization',
      label: 'Mood Journey',
      icon: 'TrendingUp',
      emoji: '📈',
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Icon name="Heart" size={32} color="#FFFFFF" />
        </div>
        <span className="sidebar-logo-text">MindBridge</span>
      </div>
      <nav className="sidebar-nav">
        {navigationItems?.map((item) => (
          <div
            key={item?.path}
            className={`sidebar-nav-item ${isActive(item?.path) ? 'active' : ''}`}
            onClick={() => handleNavigation(item?.path)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e?.key === 'Enter' || e?.key === ' ') {
                handleNavigation(item?.path);
              }
            }}
            aria-label={item?.label}
            aria-current={isActive(item?.path) ? 'page' : undefined}
          >
            <span className="text-2xl" role="img" aria-label={item?.label}>
              {item?.emoji}
            </span>
            <span className="sidebar-nav-item-text">{item?.label}</span>
          </div>
        ))}
      </nav>
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          <Icon
            name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
            size={20}
          />
          {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;