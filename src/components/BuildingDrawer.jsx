import React, { useState } from 'react';
import {
  X,
  Users,
  Zap,
  Thermometer,
  Wifi,
  Navigation,
  Calendar,
  AlertTriangle,
  Building,
  CheckCircle2,
  Clock,
  Wrench,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function BuildingDrawer({
  building,
  onClose,
  onBookRoom,
  onReportIncident,
  onNavigateToBuilding,
  onViewTickets
}) {
  const [selectedFloorNum, setSelectedFloorNum] = useState(1);

  if (!building) return null;

  const currentFloor = building.floors.find((f) => f.floorNumber === selectedFloorNum) || building.floors[0];

  return (
    <aside className="building-drawer-panel">
      {/* Drawer Header */}
      <div className="drawer-header">
        <div className="drawer-badge-row">
          <span
            className="category-badge"
            style={{ backgroundColor: `${building.accentColor}22`, color: building.accentColor, borderColor: `${building.accentColor}44` }}
          >
            {building.category} • {building.code}
          </span>
          <button className="close-drawer-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <h2 className="drawer-title">{building.name}</h2>
        <p className="drawer-description">{building.description}</p>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="drawer-actions-row">
        <button
          className="drawer-action-btn primary"
          onClick={() => onNavigateToBuilding(building)}
        >
          <Navigation size={15} />
          <span>Directions Here</span>
        </button>

        <button
          className="drawer-action-btn secondary"
          onClick={() => onReportIncident(building, null)}
        >
          <AlertTriangle size={15} />
          <span>Report Issue</span>
        </button>

        <button
          className="drawer-action-btn secondary"
          onClick={() => onViewTickets(building)}
        >
          <Wrench size={15} />
          <span>Maintenance</span>
        </button>
      </div>

      {/* Real-time Telemetry Metrics */}
      <div className="drawer-telemetry-grid">
        {/* Occupancy Card */}
        <div className="telemetry-card">
          <div className="telemetry-card-header">
            <div className="icon-wrap cyan">
              <Users size={16} />
            </div>
            <span className="telemetry-title">Live Occupancy</span>
          </div>
          <div className="telemetry-value-row">
            <span className="telemetry-big-num">{building.occupancy.current}</span>
            <span className="telemetry-sub-num">/ {building.occupancy.capacity}</span>
          </div>
          <div className="telemetry-progress-track">
            <div
              className="telemetry-progress-fill"
              style={{
                width: `${building.occupancy.percentage}%`,
                backgroundColor: building.occupancy.percentage > 75 ? '#ef4444' : '#00e5ff'
              }}
            />
          </div>
          <span className="telemetry-hint">{building.occupancy.percentage}% capacity load</span>
        </div>

        {/* Energy Card */}
        <div className="telemetry-card">
          <div className="telemetry-card-header">
            <div className="icon-wrap amber">
              <Zap size={16} />
            </div>
            <span className="telemetry-title">Power Draw</span>
          </div>
          <div className="telemetry-value-row">
            <span className="telemetry-big-num">{building.energy.currentKw}</span>
            <span className="telemetry-sub-num">kW</span>
          </div>
          <div className="telemetry-progress-track">
            <div
              className="telemetry-progress-fill"
              style={{
                width: `${Math.min(100, (building.energy.currentKw / 220) * 100)}%`,
                backgroundColor: '#f59e0b'
              }}
            />
          </div>
          <span className="telemetry-hint">☀️ {building.energy.solarOffsetPercent}% Solar Offset</span>
        </div>

        {/* Climate Card */}
        <div className="telemetry-card">
          <div className="telemetry-card-header">
            <div className="icon-wrap emerald">
              <Thermometer size={16} />
            </div>
            <span className="telemetry-title">HVAC Climate</span>
          </div>
          <div className="telemetry-value-row">
            <span className="telemetry-big-num">{building.environment.tempC}°C</span>
            <span className="telemetry-sub-num">{building.environment.humidityPercent}% RH</span>
          </div>
          <span className="telemetry-hint">AQI: {building.environment.aqi} • {building.environment.status}</span>
        </div>

        {/* Network Connectivity Card */}
        <div className="telemetry-card">
          <div className="telemetry-card-header">
            <div className="icon-wrap purple">
              <Wifi size={16} />
            </div>
            <span className="telemetry-title">Smart Campus Mesh</span>
          </div>
          <div className="telemetry-value-row">
            <span className="telemetry-big-num">{building.network.activeDevices}</span>
            <span className="telemetry-sub-num">devices</span>
          </div>
          <span className="telemetry-hint">{(building.network.bandwidthMbps / 1000).toFixed(1)} Gbps Aggregate</span>
        </div>
      </div>

      {/* Departments & Research */}
      <div className="drawer-section">
        <h3 className="section-label">Key Academic Programs & Labs</h3>
        <div className="dept-tags-wrap">
          {building.keyDepartments.map((dept, idx) => (
            <span key={idx} className="dept-tag">
              {dept}
            </span>
          ))}
        </div>
      </div>

      {/* Floor by Floor Explorer */}
      <div className="drawer-section">
        <div className="floor-nav-header">
          <h3 className="section-label">Floor Space Navigator</h3>
          <span className="floor-count-hint">{building.floorsCount} Levels</span>
        </div>

        {/* Floor Tabs */}
        <div className="floor-tabs-bar">
          {building.floors.map((floor) => (
            <button
              key={floor.floorNumber}
              className={`floor-tab-btn ${selectedFloorNum === floor.floorNumber ? 'active' : ''}`}
              onClick={() => setSelectedFloorNum(floor.floorNumber)}
            >
              Lvl {floor.floorNumber}
            </button>
          ))}
        </div>

        {/* Selected Floor Title */}
        <div className="floor-summary-bar">
          <Building size={14} />
          <span>{currentFloor.name}</span>
        </div>

        {/* Rooms List for Selected Floor */}
        <div className="rooms-list-grid">
          {currentFloor.rooms.map((room) => {
            const isAvailable = room.status === 'Available';
            const isOccupied = room.status === 'Occupied';
            const isMaint = room.status === 'Maintenance';

            return (
              <div key={room.id} className={`room-card ${room.status.toLowerCase()}`}>
                <div className="room-card-top">
                  <div>
                    <h4 className="room-name">{room.name}</h4>
                    <span className="room-type-tag">{room.type} • Cap: {room.capacity}</span>
                  </div>

                  <span className={`room-status-pill ${room.status.toLowerCase()}`}>
                    {isAvailable && <CheckCircle2 size={12} />}
                    {isOccupied && <Clock size={12} />}
                    {isMaint && <Wrench size={12} />}
                    <span>{room.status}</span>
                  </span>
                </div>

                {/* Equipment Tags */}
                <div className="room-equip-row">
                  {room.equipment.map((eq, i) => (
                    <span key={i} className="equip-chip">{eq}</span>
                  ))}
                </div>

                {/* Room Action Row */}
                <div className="room-actions-bar">
                  <button
                    className="room-btn book"
                    onClick={() => onBookRoom(building, room)}
                    disabled={isMaint}
                  >
                    <Calendar size={13} />
                    <span>{isAvailable ? 'Book Space' : 'Request Slot'}</span>
                  </button>

                  <button
                    className="room-btn report"
                    onClick={() => onReportIncident(building, room)}
                  >
                    <AlertTriangle size={13} />
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
