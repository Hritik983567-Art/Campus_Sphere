import React, { useState, useEffect } from 'react';
import CampusRealMap from './CampusRealMap';
import {
  Grid3X3,
  MapPin,
  Bus,
  Footprints,
  Clock,
  Compass,
  ArrowRight,
  Sparkles,
  Building,
  Navigation,
  CheckCircle2,
  ChevronRight,
  Layers,
  Map as MapIcon
} from 'lucide-react';

export default function CenterMainHero({
  onSelectBuildingNode,
  activeAlertId = 'ro-plant',
  onSelectAlert
}) {
  const [isGridViewActive, setIsGridViewActive] = useState(false);
  const [isCentered, setIsCentered] = useState(true);
  const [activeHoverNode, setActiveHoverNode] = useState(null);

  // Live countdown clock: "04:15 MIN" ticking down in seconds
  const [countdownSeconds, setCountdownSeconds] = useState(255); // 4 min 15 sec

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 360));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCenterGeolocation = () => {
    setIsCentered(true);
  };

  return (
    <section className="cs-center-hero-card">
      {/* =========================================================================
          HEADER OVERLAY
          ========================================================================= */}
      <div className="cs-hero-header-overlay">
        <div className="cs-route-title-badge">
          <div className="cs-route-badge-icon">
            <Compass size={16} />
          </div>
          <div className="cs-route-title-text">
            <h1 className="cs-route-heading">
              ITER Gate 1 <span className="cs-route-arrow">➔</span> Block B (CSE Wing)
            </h1>
            <span className="cs-route-subheading">
              ITER Campus, SOA University, Bhubaneswar • Live GIS Satellite & Cartographic Map Data • 240m Route
            </span>
          </div>
        </div>

        {/* Top-Right Action Badges */}
        <div className="cs-hero-action-buttons">
          <div className="cs-live-map-badge advisory">
            <span className="live-ping-dot amber" />
            <span>3 Active Advisories Plotted</span>
          </div>
          <div className="cs-live-map-badge">
            <span className="live-ping-dot" />
            <span>ITER GIS Map Active</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VISUAL CENTERPIECE: Real Leaflet Interactive GIS Map
          ========================================================================= */}
      <div className="cs-map-viewport">
        <CampusRealMap
          onSelectBuildingNode={onSelectBuildingNode}
          isGridViewActive={isGridViewActive}
          onToggleGrid={() => setIsGridViewActive(!isGridViewActive)}
          activeAlertId={activeAlertId}
          onSelectAlert={onSelectAlert}
        />
      </div>

      {/* =========================================================================
          NEXT SCHEDULED SHUTTLE / CLASS BANNER (Card Bottom Overlay)
          ========================================================================= */}
      <div className="cs-transit-class-banner">
        {/* Left: Shuttle Transit Icon & Route */}
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

        {/* Center: Large Digital Countdown Clock / ETA */}
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

        {/* Right: Next Academic Destination */}
        <div className="cs-banner-col right">
          <div className="cs-next-class-badge">
            <div className="next-class-top">
              <span className="next-class-lbl">Upcoming Academic Slot</span>
              <span className="badge-time">12:00 PM</span>
            </div>
            <h4 className="next-class-title">CS-302 Data Structures</h4>
            <span className="next-class-venue">
              Block B • Lab 304 / Bansuri Guru Hall
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM METRIC BAR (3 Sub-blocks)
          ========================================================================= */}
      <div className="cs-hero-bottom-metrics-bar">
        {/* Sub-block 1: Walking Distance */}
        <div className="cs-metric-subblock">
          <div className="subblock-icon terracotta">
            <Footprints size={18} />
          </div>
          <div className="subblock-content">
            <span className="subblock-label">Walking Distance</span>
            <span className="subblock-val">240m</span>
            <span className="subblock-note">Via Central Paved Quad</span>
          </div>
        </div>

        {/* Sub-block 2: Estimated Transit */}
        <div className="cs-metric-subblock">
          <div className="subblock-icon sage">
            <Clock size={18} />
          </div>
          <div className="subblock-content">
            <span className="subblock-label">Estimated Transit</span>
            <span className="subblock-val">~3.5 Mins</span>
            <span className="subblock-note">Brisk walk • 1.2 m/s avg</span>
          </div>
        </div>

        {/* Sub-block 3: Navigation Advice */}
        <div className="cs-metric-subblock">
          <div className="subblock-icon slate">
            <CheckCircle2 size={18} />
          </div>
          <div className="subblock-content">
            <span className="subblock-label">Navigation Advice</span>
            <span className="subblock-val text-sm">Stairs Clear / Elevator Available</span>
            <span className="subblock-note">West wing wheelchair lift operational</span>
          </div>
        </div>
      </div>
    </section>
  );
}
