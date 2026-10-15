import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowUpDown,
  Navigation2,
  Footprints,
  Clock,
  Flame,
  Accessibility,
  CheckCircle2,
  MapPin,
  Building
} from 'lucide-react';
import { CAMPUS_WAYPOINTS, BUILDING_WAYPOINT_MAP } from '../data/campusData';

export default function NavigationOverlay({
  buildings,
  startPoint,
  destinationPoint,
  onChangeStart,
  onChangeDestination,
  onSwapPoints,
  routeResult,
  onCloseNav
}) {
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  // Available origins and destinations
  const locations = [
    ...buildings.map((b) => ({
      id: b.id,
      waypointId: BUILDING_WAYPOINT_MAP[b.id],
      name: b.name,
      code: b.code,
      type: 'building'
    })),
    {
      id: 'wp-adm',
      waypointId: 'wp-adm',
      name: 'Main Campus South Gate Plaza',
      code: 'GATE',
      type: 'gate'
    },
    {
      id: 'wp-center',
      waypointId: 'wp-center',
      name: 'Central Campus Agora & Fountain',
      code: 'AGORA',
      type: 'plaza'
    }
  ];

  const estimatedSteps = Math.round(routeResult.totalDistance * 1.35);
  const estimatedCalories = Math.round(routeResult.totalDistance * 0.045);

  return (
    <aside className="nav-overlay-panel">
      {/* Panel Header */}
      <div className="nav-panel-header">
        <div className="nav-title-wrap">
          <div className="nav-icon-badge">
            <Compass size={18} />
          </div>
          <div>
            <h3 className="nav-title">Smart Campus Wayfinding</h3>
            <span className="nav-subtitle">Real-time 3D Pathfinding & Accessibility</span>
          </div>
        </div>
        <button className="nav-close-btn" onClick={onCloseNav}>×</button>
      </div>

      {/* Origin & Destination Selectors */}
      <div className="nav-route-inputs">
        <div className="route-point-field">
          <div className="route-dot start" />
          <div className="route-input-group">
            <label>Start Origin</label>
            <select
              value={startPoint}
              onChange={(e) => onChangeStart(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.waypointId}>
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="route-swap-row">
          <div className="route-connector-line" />
          <button className="swap-points-btn" onClick={onSwapPoints} title="Swap Start & Destination">
            <ArrowUpDown size={15} />
          </button>
        </div>

        <div className="route-point-field">
          <div className="route-dot dest" />
          <div className="route-input-group">
            <label>Destination Target</label>
            <select
              value={destinationPoint}
              onChange={(e) => onChangeDestination(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.waypointId}>
                  {loc.name} ({loc.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Accessible Filter */}
      <div className="nav-accessibility-toggle">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={accessibleOnly}
            onChange={(e) => setAccessibleOnly(e.target.checked)}
          />
          <Accessibility size={15} className="acc-icon" />
          <span className="checkbox-text">Step-Free / Wheelchair Accessible Route</span>
        </label>
      </div>

      {/* Route Metrics Summary */}
      <div className="route-metrics-bar">
        <div className="metric-item">
          <Clock size={16} className="cyan" />
          <div className="metric-details">
            <span className="m-val">{routeResult.estimatedMinutes} min</span>
            <span className="m-lbl">Walk Time</span>
          </div>
        </div>

        <div className="metric-item">
          <Navigation2 size={16} className="amber" />
          <div className="metric-details">
            <span className="m-val">{routeResult.totalDistance} m</span>
            <span className="m-lbl">Distance</span>
          </div>
        </div>

        <div className="metric-item">
          <Footprints size={16} className="emerald" />
          <div className="metric-details">
            <span className="m-val">{estimatedSteps}</span>
            <span className="m-lbl">Steps</span>
          </div>
        </div>

        <div className="metric-item">
          <Flame size={16} className="purple" />
          <div className="metric-details">
            <span className="m-val">{estimatedCalories} kcal</span>
            <span className="m-lbl">Energy</span>
          </div>
        </div>
      </div>

      {/* Step by Step Turn Guidance */}
      <div className="nav-steps-section">
        <h4 className="steps-title">Turn-by-Turn Waypoint Guidance</h4>

        <div className="steps-timeline">
          {routeResult.pathWaypoints.map((wp, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === routeResult.pathWaypoints.length - 1;

            return (
              <div key={wp.id} className={`step-timeline-item ${isLast ? 'last' : ''}`}>
                <div className={`step-dot-wrap ${isFirst ? 'start' : isLast ? 'dest' : 'mid'}`}>
                  {isFirst && <MapPin size={12} />}
                  {!isFirst && !isLast && <span className="mid-dot" />}
                  {isLast && <CheckCircle2 size={12} />}
                </div>

                <div className="step-content">
                  <span className="step-instruction">
                    {isFirst && `Depart from ${wp.name}`}
                    {!isFirst && !isLast && `Proceed along paved corridor through ${wp.name}`}
                    {isLast && `Arrive at destination: ${wp.name}`}
                  </span>
                  <span className="step-detail">
                    {isFirst ? 'Begin walking on campus illuminated pathway' : isLast ? 'Enter ground level atrium' : 'Follow illuminated cyan wayfinding beacon'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
