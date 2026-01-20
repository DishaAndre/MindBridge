import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from '../../utils/notifications';
import AuthModal from '../auth/AuthModal';
import AlertNotification from '../alerts/AlertNotification';
import Icon from '../AppIcon';

const Header = ({ isSidebarCollapsed = false, onCrisisClick }) => {
  const navigate = useNavigate();
  const { user, userProfile, signOut, isAuthenticated, isDemoMode } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentMood, setCurrentMood] = useState('😊');

  const moodOptions = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😡', label: 'Frustrated' },
  ];

  const handleMoodChange = (mood) => {
    setCurrentMood(mood);
    // In production, this would save to backend
    console.log('Mood updated to:', mood);
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    navigate('/settings'); // Profile functionality is in settings page
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    navigate('/settings');
  };

  const handleHelp = () => {
    setShowUserMenu(false);
    navigate('/help');
  };

  const handleCrisisSupport = () => {
    setShowUserMenu(false);
    if (onCrisisClick) {
      onCrisisClick();
    } else {
      navigate('/safety-crisis-support');
    }
  };

  const handleSignOut = async () => {
    // Add confirmation for better UX
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (!confirmed) return;

    try {
      setShowUserMenu(false);
      await signOut();
      toast.success('You have been signed out successfully');
      // Redirect to homepage after successful sign out
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out, but you have been logged out locally');
      // Even if there's an error, redirect to homepage
      navigate('/');
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <header className={`header ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="header-content">
            <div className="header-left">
              <h1 className="text-xl font-bold text-gray-900">MindBridge</h1>
            </div>
            <div className="header-right">
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </header>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  return (
    <header className={`header ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <div className="mood-indicator breathing">
            <span className="text-2xl" role="img" aria-label="Current mood">
              {currentMood}
            </span>
            <span className="text-sm font-medium hidden sm:inline">
              How are you feeling?
            </span>
          </div>
          
          {/* Demo Mode Indicator */}
          {isDemoMode && (
            <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200">
              <Icon name="Play" size={12} className="inline mr-1" />
              Demo Mode
            </div>
          )}
        </div>

        <div className="header-right">
          <button
            onClick={handleCrisisSupport}
            className="crisis-badge hidden sm:flex"
            aria-label="Crisis support - Get immediate help"
          >
            <Icon name="AlertCircle" size={20} />
            <span className="text-sm font-semibold">Crisis Support</span>
          </button>

          <AlertNotification />

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="user-avatar"
              aria-label="User menu"
              aria-expanded={showUserMenu}
            >
              {userProfile?.avatar_url ? (
                <img 
                  src={userProfile.avatar_url} 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <Icon name="User" size={20} />
              )}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-card rounded-xl shadow-lg p-4 z-50">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <button 
                    onClick={handleProfile}
                    className="user-avatar hover:ring-2 hover:ring-primary transition-all duration-200"
                    title="View Profile"
                  >
                    {userProfile?.avatar_url ? (
                      <img 
                        src={userProfile.avatar_url} 
                        alt="User avatar" 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <Icon name="User" size={20} />
                    )}
                  </button>
                  <div className="flex-1">
                    <button 
                      onClick={handleProfile}
                      className="text-left hover:text-primary transition-colors"
                      title="View Profile"
                    >
                      <p className="font-semibold text-sm">
                        {userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'Welcome Back'}
                      </p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </button>
                  </div>
                </div>

                <div className="py-3 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Quick Mood Update
                  </p>
                  <div className="flex gap-2">
                    {moodOptions?.map((mood) => (
                      <button
                        key={mood?.emoji}
                        onClick={() => handleMoodChange(mood?.emoji)}
                        className={`text-2xl p-2 rounded-lg transition-all duration-300 ${
                          currentMood === mood?.emoji
                            ? 'bg-primary scale-110' :'hover:bg-muted'
                        }`}
                        aria-label={mood?.label}
                        title={mood?.label}
                      >
                        {mood?.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 space-y-2">
                  <button 
                    onClick={handleProfile}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-300 text-left"
                  >
                    <Icon name="User" size={18} />
                    <span className="text-sm">My Profile</span>
                  </button>
                  <button 
                    onClick={handleSettings}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-300 text-left"
                  >
                    <Icon name="Settings" size={18} />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button 
                    onClick={handleHelp}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-300 text-left"
                  >
                    <Icon name="HelpCircle" size={18} />
                    <span className="text-sm">Help & Support</span>
                  </button>
                  <button 
                    onClick={handleCrisisSupport}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-300 text-left"
                  >
                    <Icon name="AlertTriangle" size={18} />
                    <span className="text-sm">Crisis Support</span>
                  </button>
                  <hr className="border-border my-2" />
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 text-left"
                  >
                    <Icon name="LogOut" size={18} />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;