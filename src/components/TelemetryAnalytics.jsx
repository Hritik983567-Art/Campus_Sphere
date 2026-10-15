import React from 'react';
import {
  Zap,
  Sun,
  Users,
  Wind,
  Wifi,
  Activity,
  TrendingUp,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { LIVE_CAMPUS_FEED } from '../data/campusData';

export default function TelemetryAnalytics({ buildings, onSelectBuilding }) {
  // Aggregate calculations
  const totalOccupancy = buildings.reduce((acc, b) => acc + b.occupancy.current, 0);
  const totalCapacity = buildings.reduce((acc, b) => acc + b.occupancy.capacity, 0);
  const totalOccupancyPct = Math.round((totalOccupancy / totalCapacity) * 100);

  const totalPowerKw = buildings.reduce((acc, b) => acc + b.energy.currentKw, 0);
  const totalSolarKw = Math.round(
    buildings.reduce((acc, b) => acc + (b.energy.currentKw * b.energy.solarOffsetPercent) / 100, 0)
  );
  const aggregateSolarPct = Math.round((totalSolarKw / totalPowerKw) * 100);

  const totalActiveDevices = buildings.reduce((acc, b) => acc + b.network.activeDevices, 0);

  return (
    <div className="telemetry-dashboard-container">
      {/* Top Banner Overview */}
      <div className="telemetry-hero-row">
        <div className="telemetry-hero-card">
          <div className="hero-icon-box cyan">
            <Users size={22} />
          </div>
          <div className="hero-data">
            <span className="hero-label">Campus Population</span>
            <div className="hero-num-row">
              <span className="hero-num">{totalOccupancy.toLocaleString()}</span>
              <span className="hero-sub">/ {totalCapacity.toLocaleString()}</span>
            </div>
            <span className="hero-status-pill green">
              <TrendingUp size={12} /> {totalOccupancyPct}% Capacity Load
            </span>
          </div>
        </div>

        <div className="telemetry-hero-card">
          <div className="hero-icon-box amber">
            <Zap size={22} />
          </div>
          <div className="hero-data">
            <span className="hero-label">Total Grid Draw</span>
            <div className="hero-num-row">
              <span className="hero-num">{totalPowerKw}</span>
              <span className="hero-sub">kW</span>
            </div>
            <span className="hero-status-pill amber">
              <Activity size={12} /> Peak Hour Normal
            </span>
          </div>
        </div>

        <div className="telemetry-hero-card">
          <div className="hero-icon-box emerald">
            <Sun size={22} />
          </div>
          <div className="hero-data">
            <span className="hero-label">Solar Generation</span>
            <div className="hero-num-row">
              <span className="hero-num">{totalSolarKw}</span>
              <span className="hero-sub">kW Clean</span>
            </div>
            <span className="hero-status-pill emerald">
              ☀️ {aggregateSolarPct}% Renewable Offset
            </span>
          </div>
        </div>

        <div className="telemetry-hero-card">
          <div className="hero-icon-box purple">
            <Wifi size={22} />
          </div>
          <div className="hero-data">
            <span className="hero-label">Active Mesh IoT Nodes</span>
            <div className="hero-num-row">
              <span className="hero-num">{totalActiveDevices.toLocaleString()}</span>
              <span className="hero-sub">endpoints</span>
            </div>
            <span className="hero-status-pill purple">
              <ShieldCheck size={12} /> 99.99% Mesh Uptime
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Power & Occupancy Analytics */}
      <div className="telemetry-analytics-grid">
        {/* Building Energy & Solar Comparison */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title">Real-time Building Energy & Solar Generation</h3>
              <span className="card-subtitle">Grid Draw vs Rooftop Photovoltaic Yield (kW)</span>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot grid" /> Grid Draw</span>
              <span className="legend-item"><span className="dot solar" /> Solar Yield</span>
            </div>
          </div>

          <div className="energy-bars-list">
            {buildings.map((b) => {
              const solarKw = Math.round((b.energy.currentKw * b.energy.solarOffsetPercent) / 100);
              const maxScale = 220;
              const gridWidth = Math.min(100, (b.energy.currentKw / maxScale) * 100);
              const solarWidth = Math.min(100, (solarKw / maxScale) * 100);

              return (
                <div
                  key={b.id}
                  className="energy-row"
                  onClick={() => onSelectBuilding(b)}
                  title="Click to view building in 3D"
                >
                  <div className="row-meta">
                    <span className="b-code">{b.code}</span>
                    <span className="b-name">{b.shortName}</span>
                    <span className="b-kw">{b.energy.currentKw} kW</span>
                  </div>

                  <div className="dual-track">
                    <div className="bar-grid" style={{ width: `${gridWidth}%` }} />
                    <div className="bar-solar" style={{ width: `${solarWidth}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Building Occupancy & Capacity */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h3 className="card-title">Space Utilization & Headcount</h3>
              <span className="card-subtitle">Live IoT Infrared Counter & Wi-Fi Density</span>
            </div>
            <span className="badge-tag">Dynamic Refresh</span>
          </div>

          <div className="occupancy-bars-list">
            {buildings.map((b) => {
              const pct = b.occupancy.percentage;
              let barColor = '#00e5ff';
              if (pct > 75) barColor = '#ef4444';
              else if (pct > 55) barColor = '#f59e0b';

              return (
                <div
                  key={b.id}
                  className="occupancy-row"
                  onClick={() => onSelectBuilding(b)}
                  title="Click to view building in 3D"
                >
                  <div className="row-meta">
                    <span className="b-name">{b.shortName}</span>
                    <span className="b-count">
                      {b.occupancy.current} / {b.occupancy.capacity} ({pct}%)
                    </span>
                  </div>

                  <div className="occ-track">
                    <div
                      className="occ-fill"
                      style={{ width: `${pct}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Environmental & Climate Matrix */}
      <div className="analytics-card full-width">
        <div className="analytics-card-header">
          <div>
            <h3 className="card-title">HVAC Smart Climate & Indoor Environmental Quality (IEQ)</h3>
            <span className="card-subtitle">Autonomous Building Management System (BMS) Sensor Readings</span>
          </div>
        </div>

        <div className="climate-matrix-grid">
          {buildings.map((b) => (
            <div key={b.id} className="climate-tile" onClick={() => onSelectBuilding(b)}>
              <div className="tile-top">
                <span className="tile-code">{b.code}</span>
                <span className="tile-status optimal">{b.environment.status}</span>
              </div>
              <h4 className="tile-name">{b.shortName}</h4>
              <div className="tile-metrics">
                <div className="m-group">
                  <span className="m-label">Temp</span>
                  <span className="m-value">{b.environment.tempC}°C</span>
                </div>
                <div className="m-group">
                  <span className="m-label">Humidity</span>
                  <span className="m-value">{b.environment.humidityPercent}%</span>
                </div>
                <div className="m-group">
                  <span className="m-label">AQI</span>
                  <span className="m-value">{b.environment.aqi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Campus Feed Stream */}
      <div className="analytics-card full-width">
        <div className="analytics-card-header">
          <div className="flex-center-gap">
            <span className="live-stream-pulse" />
            <h3 className="card-title">Live Campus Digital Twin Telemetry Feed</h3>
          </div>
        </div>

        <div className="live-feed-list">
          {LIVE_CAMPUS_FEED.map((item) => (
            <div key={item.id} className="feed-item">
              <span className="feed-time">{item.time}</span>
              <span className={`feed-tag ${item.type}`}>{item.type.toUpperCase()}</span>
              <span className="feed-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
