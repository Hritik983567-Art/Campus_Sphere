import React, { useState } from 'react';
import {
  Printer,
  Sparkles,
  Users,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode
} from 'lucide-react';

export default function RightSidebar({
  onOpenPrintModal,
  totalPrintCount = 42
}) {
  const [forecastTimeframe, setForecastTimeframe] = useState('Next 3 Hours');

  return (
    <aside className="cs-right-sidebar">
      {/* =========================================================================
          CARD 1: Automated Print Dispatcher
          ========================================================================= */}
      <div className="cs-card cs-card-print-dispatcher">
        <div className="cs-card-header">
          <div className="cs-card-title-group">
            <span className="cs-card-title">Automated Print Dispatcher</span>
          </div>
          <span className="cs-badge sage">Grid Online</span>
        </div>

        {/* Hero Number & Summary */}
        <div className="cs-print-hero-stat">
          <div className="print-hero-number-wrap">
            <span className="print-hero-number">{totalPrintCount}</span>
            <span className="print-hero-label">Documents Processed Today</span>
          </div>
          <div className="print-badge-icon">
            <Printer size={22} />
          </div>
        </div>

        {/* Segmented Visual Progress Bar / Station Queue Distribution */}
        <div className="cs-print-queue-section">
          <div className="queue-bar-header">
            <span className="queue-label">Campus Station Load Distribution</span>
            <span className="queue-capacity">82% Available</span>
          </div>

          {/* Segmented Queue Distribution Bars */}
          <div className="cs-segmented-queue-bar">
            {/* Library Hub (Occupied segment) */}
            <div className="bar-segment amber" style={{ width: '42%' }} title="Library Hub: 6 jobs" />
            {/* CS Lab (Clear segment) */}
            <div className="bar-segment sage" style={{ width: '24%' }} title="CS Annex Lab: 1 job" />
            {/* Engineering Terminal */}
            <div className="bar-segment slate" style={{ width: '18%' }} title="Eng Terminal: 2 jobs" />
            {/* Idle buffer */}
            <div className="bar-segment idle" style={{ width: '16%' }} title="Available Capacity" />
          </div>

          {/* Sub-metric text */}
          <div className="cs-print-submetrics-box">
            <div className="submetric-col">
              <span className="station-dot amber" />
              <span className="submetric-text">
                <strong>Library Hub:</strong> 2 min wait
              </span>
            </div>
            <span className="metric-divider">|</span>
            <div className="submetric-col">
              <span className="station-dot sage" />
              <span className="submetric-text">
                <strong>CS Lab:</strong> Instant print
              </span>
            </div>
          </div>
        </div>

        {/* Compact Primary Button: Queue Print Job & Get Token */}
        <button
          className="cs-btn-primary full-width"
          onClick={onOpenPrintModal}
        >
          <QrCode size={15} />
          <span>Queue Print Job & Get Token</span>
          <ArrowRight size={14} className="cs-btn-arrow" />
        </button>
      </div>

      {/* =========================================================================
          CARD 2: Real-Time Facility Attendance / Density
          ========================================================================= */}
      <div className="cs-card cs-card-facility-attendance">
        <div className="cs-card-header">
          <span className="cs-card-title">Real-Time Facility Attendance</span>
          <span className="cs-badge terracotta">Peak Afternoon</span>
        </div>

        {/* Large Metric: 1,420 Active Students */}
        <div className="cs-attendance-hero">
          <div className="attendance-number-wrap">
            <span className="attendance-number">1,420</span>
            <span className="attendance-label">Active Students on Campus</span>
          </div>
          <div className="attendance-pill-badge">
            <Users size={14} />
            <span>Infrared Gate Count</span>
          </div>
        </div>

        {/* Two Comparative Progress Bars */}
        <div className="cs-attendance-bars-wrap">
          {/* Bar 1: Central Library Reading Pods (88% filled) */}
          <div className="cs-attendance-track-group">
            <div className="track-info-row">
              <span className="track-name">Central Library Reading Pods</span>
              <span className="track-pct amber-text">88% filled</span>
            </div>
            <div className="cs-progress-bar-bg">
              <div
                className="cs-progress-bar-fill amber"
                style={{ width: '88%' }}
              />
            </div>
            <span className="track-subnote">12 pods remaining in Silent Zone (Lvl 3)</span>
          </div>

          {/* Bar 2: Student Dining Hall & Cafe (54% filled) */}
          <div className="cs-attendance-track-group">
            <div className="track-info-row">
              <span className="track-name">Student Dining Hall & Cafe</span>
              <span className="track-pct sage-text">54% filled</span>
            </div>
            <div className="cs-progress-bar-bg">
              <div
                className="cs-progress-bar-fill sage"
                style={{ width: '54%' }}
              />
            </div>
            <span className="track-subnote">Seating available at Courtyard & Annex</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CARD 3: AI Capacity & Crowd Prediction
          ========================================================================= */}
      <div className="cs-card cs-card-ai-prediction">
        <div className="cs-card-header">
          <div className="cs-ai-header-title">
            <Sparkles size={15} className="terracotta-sparkle" />
            <span className="cs-card-title">AI Peak Load Forecaster</span>
          </div>

          {/* Dropdown Selector: [Next 3 Hours ▾] */}
          <div className="cs-dropdown-select-wrapper">
            <select
              value={forecastTimeframe}
              onChange={(e) => setForecastTimeframe(e.target.value)}
              className="cs-mini-select"
            >
              <option value="Next 1 Hour">Next 1 Hour</option>
              <option value="Next 3 Hours">Next 3 Hours ▾</option>
              <option value="Rest of Day">Rest of Day</option>
            </select>
          </div>
        </div>

        {/* Horizontal Probability / Occupancy Bars with Status Tags */}
        <div className="cs-ai-forecaster-list">
          {/* Item 1: Central Library Level 2: 92% */}
          <div className="cs-ai-forecast-item">
            <div className="ai-item-top">
              <div className="ai-loc-name">
                <span className="ai-dot red" />
                <span className="loc-label">Central Library Level 2</span>
              </div>
              <span className="ai-pct-tag red">92% Surge</span>
            </div>
            <div className="ai-progress-track">
              <div className="ai-progress-bar terracotta" style={{ width: '92%' }} />
            </div>
            <span className="ai-status-description">
              High Surge expected at <strong>13:00</strong> (Post-Lecture Study)
            </span>
          </div>

          {/* Item 2: Mechanical CAD Lab: 28% */}
          <div className="cs-ai-forecast-item">
            <div className="ai-item-top">
              <div className="ai-loc-name">
                <span className="ai-dot green" />
                <span className="loc-label">Mechanical CAD Lab</span>
              </div>
              <span className="ai-pct-tag green">28% Low</span>
            </div>
            <div className="ai-progress-track">
              <div className="ai-progress-bar sage" style={{ width: '28%' }} />
            </div>
            <span className="ai-status-description">
              Optimal quiet space • Free rendering clusters available
            </span>
          </div>

          {/* Item 3: Cafeteria Counter B: 74% */}
          <div className="cs-ai-forecast-item">
            <div className="ai-item-top">
              <div className="ai-loc-name">
                <span className="ai-dot amber" />
                <span className="loc-label">Cafeteria Counter B</span>
              </div>
              <span className="ai-pct-tag amber">74% Busy</span>
            </div>
            <div className="ai-progress-track">
              <div className="ai-progress-bar amber" style={{ width: '74%' }} />
            </div>
            <span className="ai-status-description">
              Moderate rush • Express checkout lanes recommended
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
