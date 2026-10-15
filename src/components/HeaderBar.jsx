import React, { useState } from 'react';
import {
  Bell,
  Search,
  Compass,
  LayoutGrid,
  Layers,
  BarChart3,
  Shield,
  CheckCircle2,
  X
} from 'lucide-react';

export default function HeaderBar({
  activeTab,
  setActiveTab,
  unreadCount = 2,
  onOpenNotifications,
  onOpenSearch,
  currentUser = { name: 'Ashmit Verma', role: 'Computer Science (Year 2)' },
  onSignOut
}) {
  return (
    <header className="cs-header-bar">
      {/* Left: App Logo & Shield Vector Badge */}
      <div className="cs-header-left">
        <div className="cs-brand-badge" onClick={() => setActiveTab('Wayfinder & Maps')}>
          <div className="cs-shield-icon-box">
            {/* Academic Shield Vector Badge */}
            <svg
              className="cs-shield-vector"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z"
                fill="#C26D53"
              />
              <path
                d="M12 6.5L6.5 9V11.5C6.5 15.2 8.8 18.6 12 19.6C15.2 18.6 17.5 15.2 17.5 11.5V9L12 6.5Z"
                fill="#F7EDE9"
              />
              <circle cx="12" cy="12" r="2.5" fill="#C26D53" />
            </svg>
          </div>
          <div className="cs-brand-meta">
            <span className="cs-brand-name">Campus<span className="terracotta-text">Sphere</span></span>
            <span className="cs-brand-edition">Command Center // Live Telemetry</span>
          </div>
        </div>
      </div>

      {/* Center: Pill-shaped Segmented Navigation Tabs */}
      <nav className="cs-header-center">
        <div className="cs-segmented-nav-track">
          {[
            { id: 'Overview', label: 'Overview', symbol: '⊞' },
            { id: 'Wayfinder & Maps', label: 'Wayfinder & Maps', symbol: '🧭' },
            { id: 'Utility Hub', label: 'Utility Hub', symbol: '📚' },
            { id: 'Resource Analytics', label: 'Resource Analytics', symbol: '📊' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`cs-segmented-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-symbol">{tab.symbol}</span>
                <span>{tab.label}</span>
                {isActive && <span className="active-pill-indicator" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Right: Quick Notification Bell, Quick Search Pill, User Avatar Chip */}
      <div className="cs-header-right">
        {/* Quick Search Pill Button */}
        <button
          className="cs-header-search-pill"
          onClick={onOpenSearch}
          title="Quick Search Campus Directory & Resources (Ctrl + K)"
        >
          <Search size={14} className="search-icon" />
          <span className="search-text">Quick Search...</span>
          <kbd className="search-kbd">⌘K</kbd>
        </button>

        {/* Notification Bell with Red/Terracotta Active Badge */}
        <button
          className="cs-header-tool-btn has-badge"
          onClick={onOpenNotifications}
          title="Campus Notices & Broadcasts"
        >
          <Bell size={16} />
          {unreadCount > 0 && <span className="cs-bell-active-dot">{unreadCount}</span>}
        </button>

        {/* User Profile Avatar Chip with Sign Out action */}
        <div
          className="cs-user-profile-chip clickable"
          onClick={onSignOut}
          title="Click to Lock / Return to Login Terminal"
        >
          <div className="cs-avatar-wrap">
            <span className="cs-avatar-initials">
              {currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('') : 'AV'}
            </span>
            <span className="cs-avatar-status-dot" />
          </div>
          <div className="cs-user-meta">
            <span className="cs-user-name">{currentUser?.name || 'Ashmit Verma'}</span>
            <span className="cs-user-role">{currentUser?.role || 'CS Year 2'} • Lock 🔒</span>
          </div>
        </div>
      </div>
    </header>
  );
}
