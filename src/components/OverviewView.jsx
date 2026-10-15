import React, { useState, useEffect } from 'react';
import {
  Droplets,
  Printer,
  Key,
  Bus,
  Monitor,
  Wifi,
  ExternalLink,
  Clock,
  Sparkles,
  Users,
  Compass,
  Footprints,
  CheckCircle2,
  QrCode,
  ArrowRight,
  Maximize2,
  Crosshair,
  MapPin,
  Building,
  Navigation,
  Info,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function OverviewView({
  onOpenPrintModal,
  onViewLogs,
  totalPrintCount = 42,
  onShowToast
}) {
  // Selected alert for interactive highlight
  const [selectedAlertId, setSelectedAlertId] = useState('ro-plant');

  // Blueprint view toggle: 'isometric' vs 'plan'
  const [isIsometricView, setIsIsometricView] = useState(true);
  const [isCentered, setIsCentered] = useState(true);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);

  // Live countdown clock: "03:45 MIN" counting down in real-time
  const [countdownSeconds, setCountdownSeconds] = useState(225); // 3m 45s

  // AI Rush Predictor dropdown state
  const [forecastWindow, setForecastWindow] = useState('Next 2 Hours');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 270));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCenterLocation = () => {
    setIsCentered(true);
    if (onShowToast) onShowToast('Recentered view on current user waypoint (Gate 1 Entry).', 'info');
  };

  const handleToggleIsometric = () => {
    setIsIsometricView(!isIsometricView);
    if (onShowToast) {
      onShowToast(`Switched blueprint view to ${!isIsometricView ? 'Isometric 2.5D Projection' : 'Top-Down Orthographic Plan'}.`, 'info');
    }
  };

  return (
    <div className="cs-overview-view">
      {/* 3-Column Executive Cockpit Grid */}
      <div className="cs-cockpit-grid">

        {/* =====================================================================
            COLUMN 1: Left Panel (Alerts & Infrastructure Health)
            ===================================================================== */}
        <aside className="cs-left-sidebar">

          {/* 1. Live Facility Alerts Card (Top) */}
          <div className="cs-card cs-card-alerts">
            <div className="cs-card-header">
              <div className="cs-card-title-group">
                <span className="cs-card-title">Facility Advisories</span>
                <span className="cs-badge terracotta">3 Active</span>
              </div>
              <span className="cs-card-meta-hint">Campus Mesh Sync</span>
            </div>

            <div className="cs-alerts-list">
              {/* Item 1: RO Water Filter */}
              <div
                className={`cs-alert-item ${selectedAlertId === 'ro-plant' ? 'selected' : ''}`}
                onClick={() => setSelectedAlertId('ro-plant')}
              >
                <div className="cs-alert-icon-box blue">
                  <Droplets size={16} />
                </div>
                <div className="cs-alert-content">
                  <div className="cs-alert-heading">
                    <span className="cs-alert-facility">Block B Dispenser</span>
                    <span className="cs-alert-tag-divider">//</span>
                    <span className="cs-alert-subject">Filter Servicing</span>
                  </div>
                  <p className="cs-alert-detail">
                    Offline until <strong className="time-highlight">14:00</strong>
                  </p>
                  <div className="cs-alert-subinfo">
                    <Clock size={11} />
                    <span>Hydration station at Block C active</span>
                  </div>
                </div>
              </div>

              {/* Item 2: High Queue Print */}
              <div
                className={`cs-alert-item ${selectedAlertId === 'print-queue' ? 'selected' : ''}`}
                onClick={() => setSelectedAlertId('print-queue')}
              >
                <div className="cs-alert-icon-box amber">
                  <Printer size={16} />
                </div>
                <div className="cs-alert-content">
                  <div className="cs-alert-heading">
                    <span className="cs-alert-facility">Central Library Print Station</span>
                    <span className="cs-alert-tag-divider">//</span>
                    <span className="cs-alert-subject">High Load</span>
                  </div>
                  <p className="cs-alert-detail">
                    Rerouting print jobs to <span className="loc-chip">CS Annex</span>
                  </p>
                  <div className="cs-alert-subinfo">
                    <Clock size={11} />
                    <span>Avg wait: 1m vs 8m saved</span>
                  </div>
                </div>
              </div>

              {/* Item 3: Open Lab Access */}
              <div
                className={`cs-alert-item ${selectedAlertId === 'iot-lab' ? 'selected' : ''}`}
                onClick={() => setSelectedAlertId('iot-lab')}
              >
                <div className="cs-alert-icon-box green">
                  <Key size={16} />
                </div>
                <div className="cs-alert-content">
                  <div className="cs-alert-heading">
                    <span className="cs-alert-facility">IoT Lab 304</span>
                    <span className="cs-alert-tag-divider">//</span>
                    <span className="cs-alert-subject">Open Lab Access</span>
                  </div>
                  <p className="cs-alert-detail">
                    Walk-in slots available until <strong className="time-highlight">17:30</strong>
                  </p>
                  <div className="cs-alert-subinfo">
                    <Sparkles size={11} />
                    <span>18 free benches • Hardware kits ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Campus Pulse Quick Stats (3 Compact Pills side-by-side) */}
          <div className="cs-card cs-card-quick-stats">
            <div className="cs-quick-pills-row">
              {/* Pill 1: 14 Active Shuttles */}
              <div className="cs-metric-pill" title="14 GPS Shuttles active on campus ring">
                <div className="cs-pill-icon terracotta">
                  <Bus size={15} />
                </div>
                <div className="cs-pill-body">
                  <span className="cs-pill-value">14</span>
                  <span className="cs-pill-label">Active Shuttles</span>
                </div>
              </div>

              {/* Pill 2: 08 Open Computer Labs */}
              <div className="cs-metric-pill" title="8 Computer Labs currently open for student walk-in">
                <div className="cs-pill-icon sage">
                  <Monitor size={15} />
                </div>
                <div className="cs-pill-body">
                  <span className="cs-pill-value">08</span>
                  <span className="cs-pill-label">Open Labs</span>
                </div>
              </div>

              {/* Pill 3: 99.2% Mesh Wi-Fi */}
              <div className="cs-metric-pill" title="Campus-wide 6GHz Mesh Network Health">
                <div className="cs-pill-icon slate">
                  <Wifi size={15} />
                </div>
                <div className="cs-pill-body">
                  <span className="cs-pill-value">99.2%</span>
                  <span className="cs-pill-label">Mesh Wi-Fi</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Campus Resource Load Gauge Card */}
          <div className="cs-card cs-card-utility-radial">
            <div className="cs-card-header">
              <div className="cs-card-title-group">
                <span className="cs-card-title">Campus Resource Load</span>
                <span className="cs-badge sage">Grid Nominal</span>
              </div>
              <span className="cs-card-meta-hint">Load Gauge</span>
            </div>

            {/* Circular SVG radial progress ring showing 68% Total Campus Density */}
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
                    stroke="url(#overview-terracotta-radial)"
                    strokeWidth="11"
                    strokeDasharray="301.59"
                    strokeDashoffset="96.5"
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="overview-terracotta-radial" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C26D53" />
                      <stop offset="100%" stopColor="#D4A373" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Center Content */}
                <div className="cs-radial-center-content">
                  <span className="cs-radial-percent">68%</span>
                  <span className="cs-radial-sublabel">Total Density</span>
                </div>
              </div>

              {/* Breakdown legend */}
              <div className="cs-radial-legend-list">
                {/* Sage dot: Library Seating (42% quiet) */}
                <div className="cs-legend-row">
                  <span className="cs-legend-dot green" />
                  <div className="cs-legend-text">
                    <span className="cs-legend-name">Library Seating</span>
                    <span className="cs-legend-val sage-text">42% quiet</span>
                  </div>
                </div>

                {/* Indigo dot: Lab Workstations (78% busy) */}
                <div className="cs-legend-row">
                  <span className="cs-legend-dot blue" />
                  <div className="cs-legend-text">
                    <span className="cs-legend-name">Lab Workstations</span>
                    <span className="cs-legend-val slate-text">78% busy</span>
                  </div>
                </div>

                {/* Amber dot: Food Court (65% moderate) */}
                <div className="cs-legend-row">
                  <span className="cs-legend-dot amber" />
                  <div className="cs-legend-text">
                    <span className="cs-legend-name">Food Court</span>
                    <span className="cs-legend-val amber-text">65% moderate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action: "View Infrastructure Diagnostics ↗" link */}
            <button className="cs-btn-secondary full-width" onClick={onViewLogs}>
              <span>View Infrastructure Diagnostics</span>
              <ExternalLink size={14} className="cs-btn-arrow" />
            </button>
          </div>

        </aside>

        {/* =====================================================================
            COLUMN 2: Center Main Hero (Transit & Next Destination Wayfinder)
            ===================================================================== */}
        <section className="cs-center-hero-card">

          {/* 1. Hero Campus Status Card Header Overlay */}
          <div className="cs-hero-header-overlay">
            <div className="cs-route-title-badge">
              <div className="cs-route-badge-icon">
                <Compass size={17} />
              </div>
              <div className="cs-route-title-text">
                <h1 className="cs-route-heading">
                  ITER Gate 1 <span className="cs-route-arrow">➔</span> Block B (CSE Wing)
                </h1>
                <span className="cs-route-subheading">
                  ITER Campus, SOA University, Bhubaneswar • 2.5D Architectural Corridor
                </span>
              </div>
            </div>

            {/* Action Buttons: [Isometric View] & [Center My Location] */}
            <div className="cs-hero-action-buttons">
              <div className="cs-live-map-badge advisory">
                <span className="live-ping-dot amber" />
                <span>3 Advisories on Map</span>
              </div>

              <button
                className={`cs-map-ctrl-btn ${isIsometricView ? 'active' : ''}`}
                onClick={handleToggleIsometric}
                title="Toggle Isometric 2.5D Perspective Projection"
              >
                <Layers size={13} />
                <span>{isIsometricView ? 'Isometric 2.5D' : 'Top-Down Plan'}</span>
              </button>

              <button
                className="cs-map-ctrl-btn"
                onClick={handleCenterLocation}
                title="Center on Current Student Location"
              >
                <Crosshair size={13} />
                <span>Center My Location</span>
              </button>
            </div>
          </div>

          {/* Floating Live Facility Advisory Strip across Blueprint */}
          <div className="cs-blueprint-advisory-banner">
            <div className="advisory-pill-active">
              <span className="live-ping-dot amber" />
              <strong>Facility Advisory:</strong>
              <span className="advisory-text">
                {selectedAlertId === 'ro-plant' && '💧 Block B Dispenser Offline (Filter Servicing till 14:00) — Use Block C Station'}
                {selectedAlertId === 'print-queue' && '🖨️ Central Library Print Surge (6 jobs queued) — Rerouted to CS Annex'}
                {selectedAlertId === 'iot-lab' && '🔬 IoT Lab 304 Walk-in Open (18 Benches Free) — Available until 17:30'}
              </span>
            </div>
            <div className="advisory-quick-actions">
              <button
                className={`adv-btn ${selectedAlertId === 'ro-plant' ? 'active' : ''}`}
                onClick={() => setSelectedAlertId('ro-plant')}
                title="Inspect Block B RO Dispenser"
              >
                💧 RO Water
              </button>
              <button
                className={`adv-btn ${selectedAlertId === 'print-queue' ? 'active' : ''}`}
                onClick={() => setSelectedAlertId('print-queue')}
                title="Inspect Library Print Surge"
              >
                🖨️ Print Surge
              </button>
              <button
                className={`adv-btn ${selectedAlertId === 'iot-lab' ? 'active' : ''}`}
                onClick={() => setSelectedAlertId('iot-lab')}
                title="Inspect IoT Lab 304 Walk-in"
              >
                🔬 Open Lab
              </button>
            </div>
          </div>

          {/* Architectural 2.5D Visual Campus Blueprint Banner */}
          <div className={`cs-blueprint-viewport ${isIsometricView ? 'view-isometric' : 'view-ortho'}`}>
            <svg
              className="cs-blueprint-svg"
              viewBox="0 0 800 480"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Architectural Grid Pattern */}
                <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5DFD5" strokeWidth="0.75" strokeDasharray="3 3" />
                </pattern>
                
                {/* Linear Gradients for 2.5D isometric buildings */}
                <linearGradient id="bldg-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F5F1EA" />
                </linearGradient>

                <linearGradient id="bldg-side" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ECE6DC" />
                  <stop offset="100%" stopColor="#DDD6CB" />
                </linearGradient>

                <linearGradient id="bldg-active-top" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FDF7F5" />
                  <stop offset="100%" stopColor="#F5E4DE" />
                </linearGradient>

                <linearGradient id="bldg-active-side" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E2A694" />
                  <stop offset="100%" stopColor="#C26D53" />
                </linearGradient>

                {/* Soft glow filter */}
                <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Architectural Canvas */}
              <rect width="100%" height="100%" fill="#FBF9F5" />
              <rect width="100%" height="100%" fill="url(#arch-grid)" />

              {/* Campus Roads and Pathways */}
              <g className="blueprint-roads" stroke="#E5DFD5" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 80,420 L 720,420" />
                <path d="M 120,420 L 260,260 L 480,260 L 680,140" />
                <path d="M 380,420 L 380,100" />
              </g>

              {/* Pathway Centers */}
              <g stroke="#FFFFFF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M 80,420 L 720,420" />
                <path d="M 120,420 L 260,260 L 480,260 L 680,140" />
                <path d="M 380,420 L 380,100" />
              </g>

              {/* Green Lawns & Courtyards: E-Block Lawn */}
              <rect x="160" y="290" width="180" height="90" rx="14" fill="#EBF2EC" stroke="#D3E2D5" strokeWidth="1.5" />
              <text x="250" y="340" fill="#6F8F72" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">E-BLOCK LAWN (ITER)</text>

              <rect x="420" y="140" width="160" height="80" rx="14" fill="#EBF2EC" stroke="#D3E2D5" strokeWidth="1.5" />
              <text x="500" y="185" fill="#6F8F72" fontSize="10" fontWeight="700" textAnchor="middle" letterSpacing="1">CENTRAL QUAD GARDEN</text>

              {/* Campus Isometric Building 1: Gate 1 Main Entrance (Khandagiri Road) */}
              <g
                className="blueprint-bldg"
                onMouseEnter={() => setHoveredBuilding('ITER Gate 1')}
                onMouseLeave={() => setHoveredBuilding(null)}
                cursor="pointer"
              >
                <polygon points="100,410 160,410 160,370 100,370" fill="url(#bldg-side)" stroke="#D5CEC3" />
                <polygon points="100,370 160,370 180,345 120,345" fill="url(#bldg-top)" stroke="#D5CEC3" />
                <polygon points="160,410 180,385 180,345 160,370" fill="#E0D8CC" stroke="#D5CEC3" />
                <text x="140" y="428" fill="#6E685F" fontSize="10" fontWeight="800" textAnchor="middle">ITER Gate 1</text>
              </g>

              {/* Campus Isometric Building 2: Central Library */}
              <g
                className="blueprint-bldg"
                onMouseEnter={() => setHoveredBuilding('ITER Central Library')}
                onMouseLeave={() => setHoveredBuilding(null)}
                cursor="pointer"
              >
                <polygon points="260,240 360,240 360,180 260,180" fill="url(#bldg-side)" stroke="#D5CEC3" />
                <polygon points="260,180 360,180 390,140 290,140" fill="url(#bldg-top)" stroke="#D5CEC3" />
                <polygon points="360,240 390,200 390,140 360,180" fill="#E0D8CC" stroke="#D5CEC3" />
                <text x="325" y="215" fill="#23211E" fontSize="11" fontWeight="800" textAnchor="middle">Central Library</text>
                <text x="325" y="230" fill="#6F8F72" fontSize="9" fontWeight="700" textAnchor="middle">SOA Digital Wing</text>
              </g>

              {/* Campus Isometric Building 3: Bansuri Guru Auditorium & Admin Wing */}
              <g
                className="blueprint-bldg"
                onMouseEnter={() => setHoveredBuilding('Bansuri Guru Auditorium')}
                onMouseLeave={() => setHoveredBuilding(null)}
                cursor="pointer"
              >
                <polygon points="440,380 540,380 540,320 440,320" fill="url(#bldg-side)" stroke="#D5CEC3" />
                <polygon points="440,320 540,320 570,285 470,285" fill="url(#bldg-top)" stroke="#D5CEC3" />
                <polygon points="540,380 570,345 570,285 540,320" fill="#E0D8CC" stroke="#D5CEC3" />
                <text x="505" y="355" fill="#23211E" fontSize="11" fontWeight="800" textAnchor="middle">Bansuri Guru Hall</text>
              </g>

              {/* Campus Isometric Building 4: BLOCK B (CSE & Data Science - Target Destination) */}
              <g
                className="blueprint-bldg destination"
                onMouseEnter={() => setHoveredBuilding('Block B (CSE Wing)')}
                onMouseLeave={() => setHoveredBuilding(null)}
                cursor="pointer"
              >
                {/* Glowing drop shadow / ground ring */}
                <ellipse cx="660" cy="190" rx="80" ry="40" fill="rgba(194, 109, 83, 0.12)" />
                <polygon points="600,180 720,180 720,100 600,100" fill="url(#bldg-active-side)" stroke="#C26D53" strokeWidth="1.5" />
                <polygon points="600,100 720,100 755,60 635,60" fill="url(#bldg-active-top)" stroke="#C26D53" strokeWidth="1.5" />
                <polygon points="720,180 755,140 755,60 720,100" fill="#D3816A" stroke="#C26D53" strokeWidth="1.5" />
                
                {/* Destination Badge on Roof */}
                <circle cx="695" cy="80" r="14" fill="#C26D53" />
                <text x="695" y="84" fill="#FFFFFF" fontSize="11" fontWeight="800" textAnchor="middle">B</text>
                
                <text x="660" y="145" fill="#FFFFFF" fontSize="13" fontWeight="800" textAnchor="middle">Block B (CSE)</text>
                <text x="660" y="162" fill="#FDF7F5" fontSize="10" fontWeight="700" textAnchor="middle">Lab 304 • Destination</text>
              </g>

              {/* =============================================================
                  ANIMATED DOTTED WAYFINDING PATH FROM GATE 1 TO BLOCK B
                  ============================================================= */}
              <g className="cs-animated-wayfinding-trajectory">
                {/* Outer route halo */}
                <path
                  d="M 130,370 C 180,370 200,310 260,260 C 330,200 420,260 490,240 C 560,220 590,140 660,130"
                  fill="none"
                  stroke="rgba(194, 109, 83, 0.2)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Animated Terracotta Dotted Polyline */}
                <path
                  className="cs-dotted-flow-path"
                  d="M 130,370 C 180,370 200,310 260,260 C 330,200 420,260 490,240 C 560,220 590,140 660,130"
                  fill="none"
                  stroke="#C26D53"
                  strokeWidth="3.5"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />

                {/* Start Pin: ITER Gate 1 */}
                <circle cx="130" cy="370" r="7" fill="#6F8F72" stroke="#FFFFFF" strokeWidth="2.5" />
                <circle cx="130" cy="370" r="14" fill="none" stroke="#6F8F72" strokeWidth="1.5" opacity="0.6">
                  <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Destination Pin: Block B */}
                <circle cx="660" cy="130" r="8" fill="#C26D53" stroke="#FFFFFF" strokeWidth="3" />
                <circle cx="660" cy="130" r="18" fill="none" stroke="#C26D53" strokeWidth="2" opacity="0.8">
                  <animate attributeName="r" values="10;24;10" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" />
                </circle>

                {/* Moving Student Waypoint Walker */}
                <circle cx="360" cy="225" r="5" fill="#23211E" stroke="#FFFFFF" strokeWidth="2" />
                <rect x="330" y="195" width="60" height="20" rx="6" fill="#23211E" />
                <text x="360" y="209" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle">You (1.2 m/s)</text>
              </g>

              {/* =============================================================
                  LIVE FACILITY ADVISORIES & INCIDENT NOTICES PLOTTED ON BLUEPRINT
                  ============================================================= */}
              <g className="cs-blueprint-advisories-group">
                {/* Advisory 1: Block B Ground RO Dispenser (Filter Servicing) */}
                <g
                  className={`blueprint-advisory-pin ${selectedAlertId === 'ro-plant' ? 'active-alert' : ''}`}
                  onClick={() => setSelectedAlertId('ro-plant')}
                  cursor="pointer"
                  transform="translate(630, 205)"
                >
                  {/* Pulsing Alert Ring */}
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#D4A373" strokeWidth="2">
                    <animate attributeName="r" values="8;22;8" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0;0.9" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="7" fill="#D4A373" stroke="#FFFFFF" strokeWidth="2" />
                  {/* Floating Pill Label */}
                  <g transform="translate(14, -16)">
                    <rect
                      x="0"
                      y="0"
                      width="168"
                      height="32"
                      rx="8"
                      fill="#FFFFFF"
                      stroke={selectedAlertId === 'ro-plant' ? '#C26D53' : '#D4A373'}
                      strokeWidth={selectedAlertId === 'ro-plant' ? 2 : 1.5}
                      filter={selectedAlertId === 'ro-plant' ? 'url(#route-glow)' : 'none'}
                    />
                    <text x="8" y="18" fontSize="13" fill="#D4A373">💧</text>
                    <text x="26" y="14" fill="#23211E" fontSize="9.5" fontWeight="800">RO Plant // Filter Servicing</text>
                    <text x="26" y="26" fill="#B85A3C" fontSize="8" fontWeight="700">Offline till 14:00 • Alt: Block C</text>
                  </g>
                </g>

                {/* Advisory 2: Central Library Print Station (High Load / Queue Surge) */}
                <g
                  className={`blueprint-advisory-pin ${selectedAlertId === 'print-queue' ? 'active-alert' : ''}`}
                  onClick={() => setSelectedAlertId('print-queue')}
                  cursor="pointer"
                  transform="translate(260, 115)"
                >
                  {/* Pulsing Alert Ring */}
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#C26D53" strokeWidth="2">
                    <animate attributeName="r" values="8;22;8" dur="1.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0;0.9" dur="1.7s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="7" fill="#C26D53" stroke="#FFFFFF" strokeWidth="2" />
                  {/* Floating Pill Label */}
                  <g transform="translate(14, -16)">
                    <rect
                      x="0"
                      y="0"
                      width="170"
                      height="32"
                      rx="8"
                      fill="#FFFFFF"
                      stroke={selectedAlertId === 'print-queue' ? '#C26D53' : '#E5DFD5'}
                      strokeWidth={selectedAlertId === 'print-queue' ? 2 : 1.5}
                      filter={selectedAlertId === 'print-queue' ? 'url(#route-glow)' : 'none'}
                    />
                    <text x="8" y="18" fontSize="13" fill="#C26D53">🖨️</text>
                    <text x="26" y="14" fill="#23211E" fontSize="9.5" fontWeight="800">Library Print // Queue Surge</text>
                    <text x="26" y="26" fill="#C26D53" fontSize="8" fontWeight="700">6 in queue • Reroute: CS Annex</text>
                  </g>
                </g>

                {/* Advisory 3: IoT Lab 304 (Open Lab Access) */}
                <g
                  className={`blueprint-advisory-pin ${selectedAlertId === 'iot-lab' ? 'active-alert' : ''}`}
                  onClick={() => setSelectedAlertId('iot-lab')}
                  cursor="pointer"
                  transform="translate(540, 36)"
                >
                  {/* Pulsing Glow Ring */}
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#6F8F72" strokeWidth="2">
                    <animate attributeName="r" values="8;20;8" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0;0.9" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="7" fill="#6F8F72" stroke="#FFFFFF" strokeWidth="2" />
                  {/* Floating Pill Label */}
                  <g transform="translate(14, -16)">
                    <rect
                      x="0"
                      y="0"
                      width="168"
                      height="32"
                      rx="8"
                      fill="#FFFFFF"
                      stroke={selectedAlertId === 'iot-lab' ? '#6F8F72' : '#D3E2D5'}
                      strokeWidth={selectedAlertId === 'iot-lab' ? 2 : 1.5}
                      filter={selectedAlertId === 'iot-lab' ? 'url(#route-glow)' : 'none'}
                    />
                    <text x="8" y="18" fontSize="13" fill="#6F8F72">🔬</text>
                    <text x="26" y="14" fill="#23211E" fontSize="9.5" fontWeight="800">IoT Lab 304 // Open Access</text>
                    <text x="26" y="26" fill="#6F8F72" fontSize="8" fontWeight="700">18 Benches Free until 17:30</text>
                  </g>
                </g>
              </g>

              {/* Shuttle Ring Loop Path (Khandagiri - ITER Loop) */}
              <path
                d="M 80,430 L 720,430"
                fill="none"
                stroke="#D4A373"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle cx="580" cy="430" r="6" fill="#D4A373" stroke="#FFFFFF" strokeWidth="2" />
              <text x="580" y="450" fill="#D4A373" fontSize="9" fontWeight="800" textAnchor="middle">Khandagiri Shuttle 02</text>
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredBuilding && (
              <div className="cs-blueprint-floating-tooltip">
                <Building size={13} className="terracotta-text" />
                <span>{hoveredBuilding} • Verified Navigation Node</span>
              </div>
            )}
          </div>

          {/* 2. Next Transit & Class Countdown Card (Attached / Integrated Section) */}
          <div className="cs-transit-class-banner">
            {/* Left: Shuttle Transit Line */}
            <div className="cs-banner-col left">
              <div className="cs-shuttle-icon-box">
                <Bus size={20} />
              </div>
              <div className="cs-banner-info">
                <span className="cs-banner-tag">Scheduled Shuttle</span>
                <h3 className="cs-banner-title">Transit Line 02</h3>
                <span className="cs-banner-sub">Khandagiri - ITER Campus Loop</span>
              </div>
            </div>

            {/* Center: Large Digital Countdown Clock (03:45 MIN) */}
            <div className="cs-banner-col center">
              <div className="cs-countdown-box">
                <div className="cs-countdown-clock">
                  <span className="countdown-digits">{formatCountdown(countdownSeconds)}</span>
                  <span className="countdown-unit">MIN</span>
                </div>
                <div className="cs-countdown-arrival-hint">
                  <span className="arrival-dot" />
                  <span>Next Arrival: <strong>ITER Gate 1 Bay</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Next Lecture Slot */}
            <div className="cs-banner-col right">
              <div className="cs-next-class-badge">
                <div className="next-class-top">
                  <span className="next-class-lbl">Upcoming Lecture</span>
                  <span className="badge-time">12:00 PM</span>
                </div>
                <h4 className="next-class-title">CS-302 Data Structures</h4>
                <span className="next-class-venue">
                  Block B • Lab 304 / Bansuri Guru Hall
                </span>
              </div>
            </div>
          </div>
          <div className="cs-hero-bottom-metrics-bar">
            {/* Pill 1: Walking 220m */}
            <div className="cs-metric-subblock">
              <div className="subblock-icon terracotta">
                <Footprints size={18} />
              </div>
              <div className="subblock-content">
                <span className="subblock-label">Walking Distance</span>
                <span className="subblock-val">220m</span>
                <span className="subblock-note">Via Central Paved Quad</span>
              </div>
            </div>

            {/* Pill 2: Transit Time ~3 mins */}
            <div className="cs-metric-subblock">
              <div className="subblock-icon sage">
                <Clock size={18} />
              </div>
              <div className="subblock-content">
                <span className="subblock-label">Transit Time</span>
                <span className="subblock-val">~3 mins</span>
                <span className="subblock-note">Brisk walk / Step-free</span>
              </div>
            </div>

            {/* Pill 3: Route: Step-free / Elevator OK */}
            <div className="cs-metric-subblock">
              <div className="subblock-icon slate">
                <CheckCircle2 size={18} />
              </div>
              <div className="subblock-content">
                <span className="subblock-label">Route Accessibility</span>
                <span className="subblock-val text-sm">Step-free / Elevator OK</span>
                <span className="subblock-note">Block B lift operational</span>
              </div>
            </div>
          </div>

        </section>

        {/* =====================================================================
            COLUMN 3: Right Panel (Utility Quick Actions & Load Forecast)
            ===================================================================== */}
        <aside className="cs-right-sidebar">

          {/* 1. Print Queue Status Card */}
          <div className="cs-card cs-card-print-dispatcher">
            <div className="cs-card-header">
              <div className="cs-card-title-group">
                <span className="cs-card-title">Print Queue Status</span>
                <span className="cs-badge sage">Grid Online</span>
              </div>
              <span className="cs-card-meta-hint">Zero Wait Route</span>
            </div>

            {/* Hero Number: 42 Jobs Dispatched Today */}
            <div className="cs-print-hero-stat">
              <div className="print-hero-number-wrap">
                <span className="print-hero-number">{totalPrintCount}</span>
                <span className="print-hero-label">Jobs Dispatched Today</span>
              </div>
              <div className="print-badge-icon">
                <Printer size={22} />
              </div>
            </div>

            {/* Segmented Queue Visualizer */}
            <div className="cs-print-queue-section">
              <div className="queue-bar-header">
                <span className="queue-label">Campus Station Latency</span>
                <span className="queue-capacity">Auto-Routed</span>
              </div>

              {/* Visual distribution bar */}
              <div className="cs-segmented-queue-bar">
                <div className="bar-segment sage" style={{ width: '35%' }} title="Library Ground: 1 min" />
                <div className="bar-segment amber" style={{ width: '65%' }} title="Block A Xerox: 8 min" />
              </div>

              {/* Sub-metric text: Library Ground Floor (1 min) vs Block A Xerox (8 min) */}
              <div className="cs-print-submetrics-box">
                <div className="submetric-col">
                  <span className="station-dot sage" />
                  <span className="submetric-text">
                    <strong>Library Ground Floor:</strong> 1 min wait (instant)
                  </span>
                </div>
                <span className="metric-divider">|</span>
                <div className="submetric-col">
                  <span className="station-dot amber" />
                  <span className="submetric-text">
                    <strong>Block A Xerox:</strong> 8 min wait
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Button: "Queue Quick Print & Get Token" */}
            <button
              className="cs-btn-primary full-width"
              onClick={onOpenPrintModal}
            >
              <QrCode size={15} />
              <span>Queue Quick Print & Get Token</span>
              <ArrowRight size={14} className="cs-btn-arrow" />
            </button>
          </div>

          {/* 2. Live Building Headcount Card */}
          <div className="cs-card cs-card-facility-attendance">
            <div className="cs-card-header">
              <div className="cs-card-title-group">
                <span className="cs-card-title">Live Building Headcount</span>
                <span className="cs-badge terracotta">Live Sensor Feed</span>
              </div>
              <span className="cs-card-meta-hint">Active Density</span>
            </div>

            {/* Hero Number: 1,420 Active Occupancy */}
            <div className="cs-attendance-hero">
              <div className="attendance-number-wrap">
                <span className="attendance-number">1,420</span>
                <span className="attendance-label">Active Occupancy</span>
              </div>
              <div className="attendance-pill-badge">
                <Users size={14} />
                <span>Infrared Turnstiles</span>
              </div>
            </div>

            {/* Two Progress Bars */}
            <div className="cs-attendance-bars-wrap">
              {/* Bar 1: Central Reading Pods: 88% Filled */}
              <div className="cs-attendance-track-group">
                <div className="track-info-row">
                  <span className="track-name">Central Reading Pods</span>
                  <span className="track-pct amber-text">88% Filled</span>
                </div>
                <div className="cs-progress-bar-bg">
                  <div
                    className="cs-progress-bar-fill amber"
                    style={{ width: '88%' }}
                  />
                </div>
                <span className="track-subnote">12 pods left on Level 3 Quiet Study</span>
              </div>

              {/* Bar 2: Student Cafeteria: 52% Filled */}
              <div className="cs-attendance-track-group">
                <div className="track-info-row">
                  <span className="track-name">Student Cafeteria</span>
                  <span className="track-pct sage-text">52% Filled</span>
                </div>
                <div className="cs-progress-bar-bg">
                  <div
                    className="cs-progress-bar-fill sage"
                    style={{ width: '52%' }}
                  />
                </div>
                <span className="track-subnote">Normal seating flow • Fast counter lanes open</span>
              </div>
            </div>
          </div>

          {/* 3. AI Rush Predictor Card */}
          <div className="cs-card cs-card-ai-prediction">
            <div className="cs-card-header">
              <div className="cs-ai-header-title">
                <Sparkles size={15} className="terracotta-sparkle" />
                <span className="cs-card-title">AI Crowd Surge Forecast</span>
              </div>

              {/* Dropdown: [Next 2 Hours ▾] */}
              <div className="cs-dropdown-select-wrapper">
                <select
                  value={forecastWindow}
                  onChange={(e) => setForecastWindow(e.target.value)}
                  className="cs-mini-select"
                >
                  <option value="Next 1 Hour">Next 1 Hour</option>
                  <option value="Next 2 Hours">Next 2 Hours ▾</option>
                  <option value="Next 4 Hours">Next 4 Hours</option>
                </select>
              </div>
            </div>

            {/* Indicators */}
            <div className="cs-ai-forecaster-list">
              {/* Indicator 1: Library Floor 2: Peak surge expected at 13:00 (+35%) */}
              <div className="cs-ai-forecast-item">
                <div className="ai-item-top">
                  <div className="ai-loc-name">
                    <span className="ai-dot red" />
                    <span className="loc-label">Library Floor 2</span>
                  </div>
                  <span className="ai-pct-tag red">+35% Surge</span>
                </div>
                <div className="ai-progress-track">
                  <div className="ai-progress-bar terracotta" style={{ width: '85%' }} />
                </div>
                <span className="ai-status-description">
                  Peak surge expected at <strong>13:00</strong> (Post-lecture study rush)
                </span>
              </div>

              {/* Indicator 2: Hardware Lab: Expected low density (Optimal time to work) */}
              <div className="cs-ai-forecast-item">
                <div className="ai-item-top">
                  <div className="ai-loc-name">
                    <span className="ai-dot green" />
                    <span className="loc-label">Hardware Lab</span>
                  </div>
                  <span className="ai-pct-tag green">Low Density</span>
                </div>
                <div className="ai-progress-track">
                  <div className="ai-progress-bar sage" style={{ width: '25%' }} />
                </div>
                <span className="ai-status-description">
                  Expected low density • <strong>Optimal time to work</strong>
                </span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
