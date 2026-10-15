import React from 'react';
import {
  Layers,
  Compass,
  AlertTriangle,
  Calendar,
  BarChart3,
  Sun,
  Sunset,
  Moon,
  Flame,
  Zap,
  Eye,
  Camera,
  Search,
  Building2,
  ShieldAlert
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  heatmapMode,
  setHeatmapMode,
  timeOfDay,
  setTimeOfDay,
  cameraPreset,
  setCameraPreset,
  searchQuery,
  setSearchQuery,
  onOpenReportModal,
  onTriggerEmergencyAlert
}) {
  return (
    <header className="campus-header">
      {/* Brand & Live Digital Twin Status */}
      <div className="header-left">
        <div className="brand-logo" onClick={() => setActiveTab('twin')}>
          <div className="brand-icon-box">
            <Building2 className="brand-icon" size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">CAMPUS<span className="brand-accent">TWIN</span></span>
            <span className="brand-subtitle">Smart Digital Twin & Operations</span>
          </div>
        </div>

        <div className="live-status-pill">
          <span className="live-pulse" />
          <span className="live-label">LIVE SIMULATION • 60 FPS</span>
        </div>
      </div>

      {/* Navigation Modes */}
      <nav className="header-nav">
        <button
          className={`nav-tab-btn ${activeTab === 'twin' ? 'active' : ''}`}
          onClick={() => setActiveTab('twin')}
        >
          <Layers size={16} />
          <span>3D Twin</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'nav' ? 'active' : ''}`}
          onClick={() => setActiveTab('nav')}
        >
          <Compass size={16} />
          <span>Wayfinding</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'incidents' ? 'active' : ''}`}
          onClick={() => setActiveTab('incidents')}
        >
          <AlertTriangle size={16} />
          <span>Facility Hub</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'booking' ? 'active' : ''}`}
          onClick={() => setActiveTab('booking')}
        >
          <Calendar size={16} />
          <span>Room Booking</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 size={16} />
          <span>Telemetry</span>
        </button>
      </nav>

      {/* Quick Search & Environment Controls */}
      <div className="header-right">
        {/* Quick Search */}
        <div className="search-box">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Search buildings, rooms, labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        {/* Heatmap Layer Selector */}
        <div className="control-group" title="Campus Layer Overlay">
          <button
            className={`tool-btn ${heatmapMode === 'visual' ? 'active' : ''}`}
            onClick={() => setHeatmapMode('visual')}
            title="Visual Realistic"
          >
            <Eye size={15} />
          </button>
          <button
            className={`tool-btn ${heatmapMode === 'occupancy' ? 'active' : ''}`}
            onClick={() => setHeatmapMode('occupancy')}
            title="Occupancy Heatmap"
          >
            <Flame size={15} />
          </button>
          <button
            className={`tool-btn ${heatmapMode === 'energy' ? 'active' : ''}`}
            onClick={() => setHeatmapMode('energy')}
            title="Energy Draw Heatmap"
          >
            <Zap size={15} />
          </button>
        </div>

        {/* Time of Day Cycle */}
        <div className="control-group" title="Time of Day Atmosphere">
          <button
            className={`tool-btn ${timeOfDay === 'day' ? 'active' : ''}`}
            onClick={() => setTimeOfDay('day')}
            title="Daytime"
          >
            <Sun size={15} />
          </button>
          <button
            className={`tool-btn ${timeOfDay === 'sunset' ? 'active' : ''}`}
            onClick={() => setTimeOfDay('sunset')}
            title="Sunset"
          >
            <Sunset size={15} />
          </button>
          <button
            className={`tool-btn ${timeOfDay === 'night' ? 'active' : ''}`}
            onClick={() => setTimeOfDay('night')}
            title="Cyberpunk Night"
          >
            <Moon size={15} />
          </button>
        </div>

        {/* Camera Angles */}
        <div className="control-group" title="Camera Perspectives">
          <button
            className={`tool-btn ${cameraPreset === 'iso' ? 'active' : ''}`}
            onClick={() => setCameraPreset('iso')}
            title="Isometric 45°"
          >
            <Camera size={15} />
          </button>
          <button
            className={`tool-btn ${cameraPreset === 'overhead' ? 'active' : ''}`}
            onClick={() => setCameraPreset('overhead')}
            title="Top-Down Overhead"
          >
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>TOP</span>
          </button>
        </div>

        {/* Action Button: Fast Incident Report */}
        <button
          className="report-incident-btn"
          onClick={onOpenReportModal}
          title="Report Maintenance Issue"
        >
          <AlertTriangle size={15} />
          <span>Report Issue</span>
        </button>
      </div>
    </header>
  );
}
