import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import LeftSidebar from './components/LeftSidebar';
import CenterMainHero from './components/CenterMainHero';
import RightSidebar from './components/RightSidebar';
import PrintJobModal from './components/PrintJobModal';
import InfrastructureLogsModal from './components/InfrastructureLogsModal';
import NotificationsPopover from './components/NotificationsPopover';
import QuickSearchModal from './components/QuickSearchModal';
import LogicPage from './components/LogicPage';
import LoginPage from './components/LoginPage';
import OverviewView from './components/OverviewView';
import UtilityHubView from './components/UtilityHubView';
import {
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Info,
  Lock,
  LayoutDashboard
} from 'lucide-react';

export default function App() {
  // Authentication & View Mode: 'login' vs 'cockpit'
  const [viewMode, setViewMode] = useState('login'); // default to login page as requested
  const [currentUser, setCurrentUser] = useState({
    name: 'Ashmit Verma',
    role: 'Computer Science & Engineering (Year 2)',
    roll: 'CS-2024-042'
  });

  // Navigation tab state inside cockpit: 'Overview' is active by default
  const [activeTab, setActiveTab] = useState('Overview');

  // Modals state
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  // Document counter
  const [processedPrintCount, setProcessedPrintCount] = useState(42);

  // Active selected alert state for interactive highlight
  const [activeAlertId, setActiveAlertId] = useState('ro-plant');

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLoginSuccess = (userData) => {
    if (userData) setCurrentUser(userData);
    setViewMode('cockpit');
    setActiveTab('Overview');
    showToast(`Welcome back, ${userData?.name || 'Ashmit Verma'}! Active session authorized.`, 'success');
  };

  const handleSignOut = () => {
    setViewMode('login');
    showToast('Workstation locked. Returned to Campus Access Terminal.', 'info');
  };

  const handlePrintJobConfirmed = () => {
    setProcessedPrintCount((prev) => prev + 1);
    showToast('Print token generated! QR pass active at CS Annex terminal.', 'success');
  };

  const handleClearNotifications = () => {
    setUnreadNotifications(0);
    showToast('All notifications marked as read.', 'info');
  };

  const handleSearchSelect = (item) => {
    showToast(`Focused on ${item.title} (${item.location})`, 'info');
  };

  return (
    <div className="cs-app-root">
      {/* =========================================================================
          VIEW A: LOGIN & CAMPUS PORTAL AUTHENTICATION PAGE
          ========================================================================= */}
      {viewMode === 'login' ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onLaunchGuestMode={() => {
            setViewMode('cockpit');
            setActiveTab('Wayfinder & Maps');
            showToast('Guest Visitor Wayfinder Mode Initialized.', 'info');
          }}
        />
      ) : (
        /* =========================================================================
            VIEW B: COCKPIT DASHBOARD & SYSTEM LOGIC VIEW
            ========================================================================= */
        <>
          {/* Top Header Bar */}
          <HeaderBar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              showToast(`Switched cockpit view to: ${tab}`, 'info');
            }}
            unreadCount={unreadNotifications}
            onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
            onOpenSearch={() => setIsSearchOpen(true)}
            currentUser={currentUser}
            onSignOut={handleSignOut}
          />

          {/* Notifications Popover Dropdown */}
          <NotificationsPopover
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            onClearAll={handleClearNotifications}
          />

          {/* Main View Switcher */}
          {activeTab === 'Overview' ? (
            <main className="cs-overview-container">
              <OverviewView
                onOpenPrintModal={() => setIsPrintModalOpen(true)}
                onViewLogs={() => setIsLogsModalOpen(true)}
                totalPrintCount={processedPrintCount}
                onShowToast={showToast}
              />
            </main>
          ) : activeTab === 'System Logic' ? (
            <main className="cs-logic-container">
              <LogicPage />
            </main>
          ) : activeTab === 'Wayfinder & Maps' ? (
            /* Strict 3-Column Cockpit Layout with Real GIS Map */
            <main className="cs-cockpit-grid">
              {/* Left Sidebar Column (Campus Alerts & Facility Status) */}
              <LeftSidebar
                onViewLogs={() => setIsLogsModalOpen(true)}
                onSelectAlert={(alertId) => {
                  setActiveAlertId(alertId);
                  showToast(`Inspecting facility ticket: ${alertId.toUpperCase()}`, 'info');
                }}
                activeAlertId={activeAlertId}
              />

              {/* Center Main Hero Column (Hyperlocal Wayfinder & Interactive Transit Hub) */}
              <CenterMainHero
                onSelectBuildingNode={(bldgName) => {
                  showToast(`Focused route to ${bldgName}`, 'info');
                }}
                activeAlertId={activeAlertId}
                onSelectAlert={(alertId) => {
                  setActiveAlertId(alertId);
                  showToast(`Inspecting facility ticket: ${alertId.toUpperCase()}`, 'info');
                }}
              />

              {/* Right Sidebar Column (Utilities, Print Queue & AI Load Prediction) */}
              <RightSidebar
                onOpenPrintModal={() => setIsPrintModalOpen(true)}
                totalPrintCount={processedPrintCount}
              />
            </main>
          ) : activeTab === 'Utility Hub' ? (
            /* Dedicated Utility Hub: Smart Library Seat Matrix & Study-Pod Booker */
            <main className="cs-utility-container">
              <UtilityHubView onShowToast={showToast} />
            </main>
          ) : (
            /* Resource Analytics fallback */
            <main className="cs-overview-container">
              <OverviewView
                onOpenPrintModal={() => setIsPrintModalOpen(true)}
                onViewLogs={() => setIsLogsModalOpen(true)}
                totalPrintCount={processedPrintCount}
                onShowToast={showToast}
              />
            </main>
          )}
        </>
      )}

      {/* Floating Mode Switcher Chip for Hackathon Evaluators (Bottom-Left) */}
      <aside className="cs-floating-mode-switcher" aria-label="Demo View Switcher">
        <button
          className={`mode-toggle-btn ${viewMode === 'login' ? 'active' : ''}`}
          onClick={() => setViewMode('login')}
          title="Open Authentication Terminal"
        >
          <Lock size={13} />
          <span>Login Terminal</span>
        </button>
        <button
          className={`mode-toggle-btn ${viewMode === 'cockpit' ? 'active' : ''}`}
          onClick={() => setViewMode('cockpit')}
          title="Open Executive Cockpit"
        >
          <LayoutDashboard size={13} />
          <span>Cockpit Dashboard</span>
        </button>
      </aside>

      {/* =========================================================================
          MODALS & OVERLAYS
          ========================================================================= */}
      {/* 1. Automated Print Dispatcher Modal */}
      <PrintJobModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        onJobConfirmed={handlePrintJobConfirmed}
      />

      {/* 2. Detailed Infrastructure Logs Modal */}
      <InfrastructureLogsModal
        isOpen={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
      />

      {/* 3. Quick Search Modal (Ctrl + K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleSearchSelect}
      />

      {/* Feedback Toast Notification */}
      {toast && (
        <div className={`cs-toast-badge ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle2 size={16} />}
            {toast.type === 'info' && <Sparkles size={16} />}
            {toast.type === 'warning' && <AlertTriangle size={16} />}
          </div>
          <span className="toast-msg">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
