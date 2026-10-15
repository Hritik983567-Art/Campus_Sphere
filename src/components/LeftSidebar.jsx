import React from 'react';
import {
  Droplets,
  Printer,
  Key,
  Bus,
  Monitor,
  Wifi,
  ExternalLink,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export default function LeftSidebar({
  onViewLogs,
  onSelectAlert,
  activeAlertId
}) {
  return (
    <aside className="cs-left-sidebar">
      {/* =========================================================================
          CARD 1: Live Alerts & Notices (Top)
          ========================================================================= */}
      <div className="cs-card cs-card-alerts">
        <div className="cs-card-header">
          <div className="cs-card-title-group">
            <span className="cs-card-title">Live Alerts & Notices</span>
            <span className="cs-badge terracotta">3 Active</span>
          </div>
          <span className="cs-card-meta-hint">Real-time Feed</span>
        </div>

        <div className="cs-alerts-list">
          {/* List item 1: Cloud/Water icon */}
          <div
            className={`cs-alert-item ${activeAlertId === 'ro-plant' ? 'selected' : ''}`}
            onClick={() => onSelectAlert && onSelectAlert('ro-plant')}
          >
            <div className="cs-alert-icon-box blue">
              <Droplets size={16} />
            </div>
            <div className="cs-alert-content">
              <div className="cs-alert-heading">
                <span className="cs-alert-facility">Central RO Plant</span>
                <span className="cs-alert-tag-divider">//</span>
                <span className="cs-alert-subject">Filter Maintenance</span>
              </div>
              <p className="cs-alert-detail">
                Block B dispenser offline till <strong className="time-highlight">14:00</strong>
              </p>
              <div className="cs-alert-subinfo">
                <Clock size={11} />
                <span>Updated 12m ago • Facilities Dept</span>
              </div>
            </div>
          </div>

          {/* List item 2: Printer icon */}
          <div
            className={`cs-alert-item ${activeAlertId === 'xerox' ? 'selected' : ''}`}
            onClick={() => onSelectAlert && onSelectAlert('xerox')}
          >
            <div className="cs-alert-icon-box amber">
              <Printer size={16} />
            </div>
            <div className="cs-alert-content">
              <div className="cs-alert-heading">
                <span className="cs-alert-facility">Academic Library Xerox</span>
                <span className="cs-alert-tag-divider">//</span>
                <span className="cs-alert-subject">Queue Surge</span>
              </div>
              <p className="cs-alert-detail">
                6 jobs waiting, rerouting to <span className="loc-chip">CS Annex</span>
              </p>
              <div className="cs-alert-subinfo">
                <Clock size={11} />
                <span>Auto-rerouted • 3 min wait saved</span>
              </div>
            </div>
          </div>

          {/* List item 3: Key/Lab icon */}
          <div
            className={`cs-alert-item ${activeAlertId === 'iot-lab' ? 'selected' : ''}`}
            onClick={() => onSelectAlert && onSelectAlert('iot-lab')}
          >
            <div className="cs-alert-icon-box green">
              <Key size={16} />
            </div>
            <div className="cs-alert-content">
              <div className="cs-alert-heading">
                <span className="cs-alert-facility">IoT Lab 304</span>
                <span className="cs-alert-tag-divider">//</span>
                <span className="cs-alert-subject">Open Access</span>
              </div>
              <p className="cs-alert-detail">
                Walk-in slots open until <strong className="time-highlight">17:30</strong>
              </p>
              <div className="cs-alert-subinfo">
                <Sparkles size={11} />
                <span>12 benches free • Logic analyzers calibrated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CARD 2: Quick Stats (Compact 3-Pill Bar)
          ========================================================================= */}
      <div className="cs-card cs-card-quick-stats">
        <div className="cs-quick-pills-row">
          {/* Pill 1: Active Shuttles */}
          <div className="cs-metric-pill">
            <div className="cs-pill-icon terracotta">
              <Bus size={15} />
            </div>
            <div className="cs-pill-body">
              <span className="cs-pill-value">14</span>
              <span className="cs-pill-label">Active Shuttles</span>
            </div>
          </div>

          {/* Pill 2: Computer Labs Open */}
          <div className="cs-metric-pill">
            <div className="cs-pill-icon sage">
              <Monitor size={15} />
            </div>
            <div className="cs-pill-body">
              <span className="cs-pill-value">08</span>
              <span className="cs-pill-label">Computer Labs</span>
            </div>
          </div>

          {/* Pill 3: Wi-Fi Mesh Health */}
          <div className="cs-metric-pill">
            <div className="cs-pill-icon slate">
              <Wifi size={15} />
            </div>
            <div className="cs-pill-body">
              <span className="cs-pill-value">94%</span>
              <span className="cs-pill-label">Mesh Health</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CARD 3: Campus Utility Status & Radial Gauge
          ========================================================================= */}
      <div className="cs-card cs-card-utility-radial">
        <div className="cs-card-header">
          <span className="cs-card-title">Campus Utility Status</span>
          <span className="cs-badge sage">Nominal Load</span>
        </div>

        {/* Radial Donut Gauge & Center Percentage */}
        <div className="cs-radial-section">
          <div className="cs-radial-gauge-container">
            <svg className="cs-radial-svg" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#ECE6DC"
                strokeWidth="11"
              />
              {/* Radial Donut Progress: 68% of 2*PI*48 = ~301.59 -> 68% = 205.08 */}
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="url(#terracotta-radial-gradient)"
                strokeWidth="11"
                strokeDasharray="301.59"
                strokeDashoffset="96.5" /* 301.59 * (1 - 0.68) */
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="terracotta-radial-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C26D53" />
                  <stop offset="100%" stopColor="#D4A373" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Center Content */}
            <div className="cs-radial-center-content">
              <span className="cs-radial-percent">68%</span>
              <span className="cs-radial-sublabel">Resource Load</span>
            </div>
          </div>

          {/* Legend Breakdown */}
          <div className="cs-radial-legend-list">
            <div className="cs-legend-row">
              <span className="cs-legend-dot blue" />
              <div className="cs-legend-text">
                <span className="cs-legend-name">Library Seating</span>
                <span className="cs-legend-val">82% full</span>
              </div>
            </div>

            <div className="cs-legend-row">
              <span className="cs-legend-dot green" />
              <div className="cs-legend-text">
                <span className="cs-legend-name">Lab Workstations</span>
                <span className="cs-legend-val">45% occupied</span>
              </div>
            </div>

            <div className="cs-legend-row">
              <span className="cs-legend-dot amber" />
              <div className="cs-legend-text">
                <span className="cs-legend-name">Dining / Cafeteria</span>
                <span className="cs-legend-val">76% busy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width clean secondary button */}
        <button className="cs-btn-secondary full-width" onClick={onViewLogs}>
          <span>View Detailed Infrastructure Logs</span>
          <ExternalLink size={14} className="cs-btn-arrow" />
        </button>
      </div>
    </aside>
  );
}
