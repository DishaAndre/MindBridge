import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathSegments = location?.pathname?.split('/')?.filter(Boolean);

  const breadcrumbMap = {
    'homepage': { label: 'Home', emoji: '🏠' },
    'emotion-check-in-portal': { label: 'Mood Check-In', emoji: '💭' },
    'ai-companion-chat': { label: 'AI Companion', emoji: '🤖' },
    'caregiver-insights-dashboard': { label: 'Caregiver Insights', emoji: '👥' },
    'calming-activities-hub': { label: 'Calming Activities', emoji: '🧘' },
    'mood-journey-visualization': { label: 'Mood Journey', emoji: '📈' },
  };

  const breadcrumbs = pathSegments?.map((segment, index) => {
    const path = `/${pathSegments?.slice(0, index + 1)?.join('/')}`;
    const breadcrumb = breadcrumbMap?.[segment] || { label: segment, emoji: '📄' };
    return {
      path,
      label: breadcrumb?.label,
      emoji: breadcrumb?.emoji,
      isLast: index === pathSegments?.length - 1,
    };
  });

  if (breadcrumbs?.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <button
            onClick={() => navigate('/homepage')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-300"
            aria-label="Home"
          >
            <span className="text-lg">🏠</span>
            <span className="font-medium">Home</span>
          </button>
        </li>

        {breadcrumbs?.map((crumb, index) => (
          <React.Fragment key={crumb?.path}>
            <li className="text-muted-foreground">
              <Icon name="ChevronRight" size={16} />
            </li>
            <li>
              {crumb?.isLast ? (
                <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
                  <span className="text-lg">{crumb?.emoji}</span>
                  <span>{crumb?.label}</span>
                </span>
              ) : (
                <button
                  onClick={() => navigate(crumb?.path)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-300"
                  aria-label={crumb?.label}
                >
                  <span className="text-lg">{crumb?.emoji}</span>
                  <span className="font-medium">{crumb?.label}</span>
                </button>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;