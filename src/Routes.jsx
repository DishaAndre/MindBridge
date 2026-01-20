import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import EmotionCheckInPortal from './pages/emotion-check-in-portal';
import MoodJourneyVisualization from './pages/mood-journey-visualizer';
import CalmingActivitiesHub from './pages/calming-activities-hub';
import CaregiverInsightsDashboard from './pages/caregiver-insights-dashboard';
import AICompanionChat from './pages/ai-companion-chat';
import Homepage from './pages/homepage';
import SafetyCrisisSupport from './pages/safety-crisis-support';
import PlatformExplanationCenter from './pages/platform-explanation-center';
import DemoExperience from './pages/demo-experience';
import Settings from './pages/settings';
import Help from './pages/help';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/emotion-check-in-portal" element={<EmotionCheckInPortal />} />
        <Route path="/mood-journey-visualization" element={<MoodJourneyVisualization />} />
        <Route path="/calming-activities-hub" element={<CalmingActivitiesHub />} />
        <Route path="/caregiver-insights-dashboard" element={<CaregiverInsightsDashboard />} />
        <Route path="/ai-companion-chat" element={<AICompanionChat />} />
        <Route path="/safety-crisis-support" element={<SafetyCrisisSupport />} />
        <Route path="/platform-explanation-center" element={<PlatformExplanationCenter />} />
        <Route path="/demo-experience" element={<DemoExperience />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
