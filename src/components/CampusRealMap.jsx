import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Layers,
  MapPin,
  Navigation,
  Bus,
  Compass,
  Building,
  Maximize2,
  RefreshCw,
  Eye
} from 'lucide-react';

// Campus Geo-Coordinates (High-detail Academic Quad)
// Campus Geo-Coordinates (ITER SOA University, Bhubaneswar, Odisha: 20.2482° N, 85.8010° E)
const CAMPUS_COORDS = {
  center: [20.2482, 85.8010],
  gate1: [20.2508, 85.8012], // Main Entrance (Jagamara-Khandagiri Road)
  adminBlock: [20.2484, 85.8003], // Admin Complex & Bansuri Guru Auditorium
  library: [20.2485, 85.8009], // Central Library & Digital Center
  blockA: [20.2489, 85.8014], // Block A (ECE & Core Engineering)
  blockB: [20.2480, 85.8019], // Block B (CSE, IT & Lab 304 - Target)
  eblockLawn: [20.2464, 85.8015], // Block E & Central Lawn
  cafeteria: [20.2477, 85.8006], // Student Food Court & Canteen
  hostels: [20.2452, 85.8020], // ITER Boys Hostel Complex (BH 1-7)
  transitBay: [20.2504, 85.8014], // Gate 1 Campus Shuttle Bay
  userLocation: [20.2492, 85.8012] // Near Academic Quad Walkway
};

// Real Walkway Waypoints connecting ITER Gate 1 -> Central Library -> Block B (CSE Lab 304)
const ROUTE_WAYPOINTS = [
  CAMPUS_COORDS.gate1,
  [20.2500, 85.8012],
  CAMPUS_COORDS.userLocation,
  CAMPUS_COORDS.library,
  [20.2482, 85.8012],
  CAMPUS_COORDS.blockB
];

// Perimeter Shuttle Ring Road Coordinates (Khandagiri - Jagamara - ITER Loop)
const SHUTTLE_RING_COORDS = [
  [20.2518, 85.7995],
  [20.2518, 85.8030],
  [20.2445, 85.8030],
  [20.2445, 85.7995],
  [20.2518, 85.7995]
];

// Campus Facility Advisories & Live Alerts Data
export const CAMPUS_FACILITY_ALERTS = [
  {
    id: 'ro-plant',
    coords: [20.2477, 85.8024],
    facility: 'Block B Ground RO',
    shortName: 'Block B RO Dispenser',
    title: 'Central RO Plant // Filter Servicing',
    badge: 'Offline till 14:00',
    type: 'water',
    severity: 'warning',
    iconEmoji: '💧',
    summary: 'Block B ground dispenser offline for scheduled carbon cartridge servicing till 14:00.',
    solution: 'Hydration Station at Block C 2nd Floor is Active & Chilled (TDS: 112 ppm — 60m walk).',
    reportedBy: 'Facilities & Utilities Dept • Updated 12m ago'
  },
  {
    id: 'xerox',
    aliasId: 'print-queue',
    coords: [20.2486, 85.8006],
    facility: 'Central Library Print',
    shortName: 'Library Xerox Counter',
    title: 'Academic Library Xerox // Queue Surge',
    badge: 'Queue Surge (6 Jobs)',
    type: 'print',
    severity: 'surge',
    iconEmoji: '🖨️',
    summary: '6 jobs in buffer, estimated delay ~8 minutes at ground desk.',
    solution: 'Auto-rerouted: Send jobs to CS Annex Ground Terminal (Zero wait time • 1 min saved).',
    reportedBy: 'Cloud Print Load Balancer • 5m ago'
  },
  {
    id: 'iot-lab',
    coords: [20.2481, 85.8021],
    facility: 'IoT Lab 304 (Block B)',
    shortName: 'IoT Lab 304 Walk-in',
    title: 'IoT Lab 304 // Open Access',
    badge: 'Walk-in Open (18 Free)',
    type: 'lab',
    severity: 'open',
    iconEmoji: '🔬',
    summary: 'Walk-in open lab slots available until 17:30 for embedded systems testing.',
    solution: '18 free benches with calibrated logic analyzers, ESP32 boards & oscilloscopes ready.',
    reportedBy: 'CSE Academic Coordinator • Just now'
  }
];

export default function CampusRealMap({
  onSelectBuildingNode,
  isGridViewActive,
  onToggleGrid,
  activeAlertId = 'ro-plant',
  onSelectAlert
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const shuttleMarkerRef = useRef(null);
  const routePolylineRef = useRef(null);
  const alertMarkersRef = useRef({});
  const [mapStyle, setMapStyle] = useState('creamy'); // 'creamy' | 'satellite' | 'positron'
  const [showAlertsLayer, setShowAlertsLayer] = useState(true);
  const [activeAlertState, setActiveAlertState] = useState(activeAlertId);
  const tileLayerRef = useRef(null);

  // Sync prop changes to local state
  useEffect(() => {
    if (activeAlertId) {
      setActiveAlertState(activeAlertId);
    }
  }, [activeAlertId]);

  // Fly to active alert when it changes
  useEffect(() => {
    if (!mapInstanceRef.current || !activeAlertState) return;

    const matchedAlert = CAMPUS_FACILITY_ALERTS.find(
      (a) => a.id === activeAlertState || a.aliasId === activeAlertState
    );

    if (matchedAlert) {
      mapInstanceRef.current.flyTo(matchedAlert.coords, 17.6, { duration: 0.9 });
      const marker = alertMarkersRef.current[matchedAlert.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    }
  }, [activeAlertState]);

  // Initialize Leaflet Map with real GIS map data for ITER Bhubaneswar
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // 1. Create Leaflet Map Instance centered at ITER Bhubaneswar
    const map = L.map(mapContainerRef.current, {
      center: CAMPUS_COORDS.center,
      zoom: 17,
      minZoom: 15,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false
    });
    mapInstanceRef.current = map;

    // 2. Add Tile Layer matching Dusky Creamy Palette (ESRI Light Gray - zero watermark)
    const creamyTile = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri &mdash; ITER SOA Campus GIS'
      }
    );
    creamyTile.addTo(map);
    tileLayerRef.current = creamyTile;

    // 3. Add Custom Zoom Controls on bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 4. Draw Campus Perimeter Shuttle Road
    const shuttleRoad = L.polyline(SHUTTLE_RING_COORDS, {
      color: '#D4A373',
      weight: 4,
      dashArray: '8, 6',
      opacity: 0.65
    }).addTo(map);

    // 5. Draw Animated Active Pedestrian Route
    const routeGlow = L.polyline(ROUTE_WAYPOINTS, {
      color: 'rgba(194, 109, 83, 0.3)',
      weight: 10,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    const routeLine = L.polyline(ROUTE_WAYPOINTS, {
      color: '#C26D53',
      weight: 4.5,
      dashArray: '6, 8',
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);
    routePolylineRef.current = routeLine;

    // 6. Custom Vector HTML DivIcons for ITER Bhubaneswar Landmarks
    // A. Gate 1 (Main Entrance)
    const gate1Icon = L.divIcon({
      className: 'cs-custom-map-icon',
      html: `
        <div class="map-node-pill origin">
          <div class="node-pin-dot"></div>
          <div class="node-text">
            <strong>ITER GATE 1</strong>
            <span>Main Entrance</span>
          </div>
        </div>
      `,
      iconSize: [115, 42],
      iconAnchor: [57, 21]
    });
    L.marker(CAMPUS_COORDS.gate1, { icon: gate1Icon })
      .addTo(map)
      .bindPopup('<b>ITER Main Gate (Gate 1)</b><br>Jagamara-Khandagiri Road Access • Security Kiosk');

    // B. Central Library Marker
    const libraryIcon = L.divIcon({
      className: 'cs-custom-map-icon',
      html: `
        <div class="map-node-pill library">
          <div class="node-pin-dot blue"></div>
          <div class="node-text">
            <strong>CENTRAL LIBRARY</strong>
            <span class="amber-txt">42% QUIET SEATS</span>
          </div>
        </div>
      `,
      iconSize: [130, 42],
      iconAnchor: [65, 21]
    });
    L.marker(CAMPUS_COORDS.library, { icon: libraryIcon })
      .addTo(map)
      .bindPopup('<b>ITER Central Academic Library</b><br>SOA Digital Resource Center & Quiet Study Pods');

    // C. Block B (CSE Department & Lab 304 - Target)
    const blockBIcon = L.divIcon({
      className: 'cs-custom-map-icon',
      html: `
        <div class="map-node-pill destination">
          <span class="dest-flag">TARGET</span>
          <div class="node-text">
            <strong>BLOCK B (CSE)</strong>
            <span class="terracotta-txt">LAB 304 // CS-302</span>
          </div>
        </div>
      `,
      iconSize: [135, 48],
      iconAnchor: [67, 24]
    });
    L.marker(CAMPUS_COORDS.blockB, { icon: blockBIcon })
      .addTo(map)
      .bindPopup('<b>Block B // Computer Science & Engineering</b><br>Destination: Advanced Computing Lab 304 (18/60 Free)');

    // D. Bansuri Guru Auditorium & Admin Block
    const adminIcon = L.divIcon({
      className: 'cs-custom-map-icon',
      html: `
        <div class="map-node-pill lab">
          <div class="node-pin-dot green"></div>
          <div class="node-text">
            <strong>BANSURI GURU</strong>
            <span class="sage-txt">ADMIN // AUDITORIUM</span>
          </div>
        </div>
      `,
      iconSize: [135, 42],
      iconAnchor: [67, 21]
    });
    L.marker(CAMPUS_COORDS.adminBlock, { icon: adminIcon })
      .addTo(map)
      .bindPopup('<b>Bansuri Guru Auditorium & Admin Complex</b><br>University Administrative Wing & Convention Hall');

    // E. E-Block & Event Lawn
    const eblockIcon = L.divIcon({
      className: 'cs-custom-map-icon',
      html: `
        <div class="map-node-pill">
          <div class="node-pin-dot"></div>
          <div class="node-text">
            <strong>E-BLOCK LAWN</strong>
            <span>Lecture Complex</span>
          </div>
        </div>
      `,
      iconSize: [120, 42],
      iconAnchor: [60, 21]
    });
    L.marker(CAMPUS_COORDS.eblockLawn, { icon: eblockIcon })
      .addTo(map)
      .bindPopup('<b>Block E & Event Lawn</b><br>Auditoriums, Classrooms & Cultural Quad');

    // F. Gate 1 Shuttle Bay Stop
    const transitBayIcon = L.divIcon({
      className: 'cs-custom-map-icon',
      html: `
        <div class="map-node-pill transit">
          <div class="transit-badge">BAY 1</div>
          <span class="transit-time">ETA 03m</span>
        </div>
      `,
      iconSize: [85, 34],
      iconAnchor: [42, 17]
    });
    L.marker(CAMPUS_COORDS.transitBay, { icon: transitBayIcon })
      .addTo(map)
      .bindPopup('<b>ITER Gate 1 Transit Stop</b><br>Transit Line 02 (Khandagiri Loop) arriving in 3 mins');

    // G. User Geolocation Pin with Pulsing Ring
    const userLocationIcon = L.divIcon({
      className: 'cs-user-geo-icon',
      html: `
        <div class="geo-pulse-marker">
          <div class="pulse-core"></div>
          <div class="pulse-wave"></div>
          <div class="geo-tag">YOU ARE HERE</div>
        </div>
      `,
      iconSize: [100, 36],
      iconAnchor: [50, 18]
    });
    L.marker(CAMPUS_COORDS.userLocation, { icon: userLocationIcon }).addTo(map);

    // =========================================================================
    // 7. REAL-TIME FACILITY ADVISORIES & LIVE ALERTS LAYER ON MAP
    // =========================================================================
    CAMPUS_FACILITY_ALERTS.forEach((alert) => {
      const isSelected = alert.id === activeAlertId || alert.aliasId === activeAlertId;
      const alertIcon = L.divIcon({
        className: 'cs-custom-map-icon',
        html: `
          <div class="map-alert-pin-wrapper ${alert.severity} ${isSelected ? 'selected-alert' : ''}" id="map-alert-${alert.id}">
            <div class="alert-pulse-halo ${alert.severity}"></div>
            <div class="map-alert-chip ${alert.severity}">
              <div class="alert-chip-icon">${alert.iconEmoji}</div>
              <div class="alert-chip-details">
                <span class="alert-chip-facility">${alert.facility}</span>
                <span class="alert-chip-badge ${alert.severity}">${alert.badge}</span>
              </div>
            </div>
          </div>
        `,
        iconSize: [165, 46],
        iconAnchor: [82, 23]
      });

      const popupContent = `
        <div class="cs-map-alert-card ${alert.severity}">
          <div class="cs-alert-popup-top">
            <span class="popup-alert-type">${alert.type.toUpperCase()} ADVISORY</span>
            <span class="popup-alert-status ${alert.severity}">${alert.badge}</span>
          </div>
          <h4 class="popup-alert-title">${alert.title}</h4>
          <p class="popup-alert-summary">${alert.summary}</p>
          <div class="popup-alert-resolution">
            <strong>RECOMMENDED ALTERNATIVE:</strong>
            <span>${alert.solution}</span>
          </div>
          <div class="popup-alert-meta">
            <span>${alert.reportedBy}</span>
          </div>
        </div>
      `;

      const alertMarker = L.marker(alert.coords, {
        icon: alertIcon,
        zIndexOffset: 1000
      })
        .addTo(map)
        .bindPopup(popupContent, {
          className: 'cs-leaflet-alert-popup',
          offset: [0, -18],
          maxWidth: 290
        });

      alertMarker.on('click', () => {
        setActiveAlertState(alert.id);
        if (onSelectAlert) onSelectAlert(alert.id);
      });

      alertMarkersRef.current[alert.id] = alertMarker;
    });

    // H. Live Animated Moving Campus Shuttle
    const shuttleIcon = L.divIcon({
      className: 'cs-shuttle-marker',
      html: `
        <div class="shuttle-bus-chip">
          <span class="bus-num">02</span>
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
    const shuttleMarker = L.marker(SHUTTLE_RING_COORDS[0], { icon: shuttleIcon }).addTo(map);
    shuttleMarkerRef.current = shuttleMarker;

    // Animate Shuttle along perimeter road in loop
    let step = 0;
    const shuttleInterval = setInterval(() => {
      step = (step + 1) % 100;
      const t = step / 100;
      let lat, lng;
      if (t < 0.25) {
        const segT = t / 0.25;
        lat = SHUTTLE_RING_COORDS[0][0];
        lng = SHUTTLE_RING_COORDS[0][1] + segT * (SHUTTLE_RING_COORDS[1][1] - SHUTTLE_RING_COORDS[0][1]);
      } else if (t < 0.5) {
        const segT = (t - 0.25) / 0.25;
        lat = SHUTTLE_RING_COORDS[1][0] + segT * (SHUTTLE_RING_COORDS[2][0] - SHUTTLE_RING_COORDS[1][0]);
        lng = SHUTTLE_RING_COORDS[1][1];
      } else if (t < 0.75) {
        const segT = (t - 0.5) / 0.25;
        lat = SHUTTLE_RING_COORDS[2][0];
        lng = SHUTTLE_RING_COORDS[2][1] + segT * (SHUTTLE_RING_COORDS[3][1] - SHUTTLE_RING_COORDS[2][1]);
      } else {
        const segT = (t - 0.75) / 0.25;
        lat = SHUTTLE_RING_COORDS[3][0] + segT * (SHUTTLE_RING_COORDS[4][0] - SHUTTLE_RING_COORDS[3][0]);
        lng = SHUTTLE_RING_COORDS[3][1];
      }
      shuttleMarker.setLatLng([lat, lng]);
    }, 400);

    return () => {
      clearInterval(shuttleInterval);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Layer Style Toggle
  const handleChangeMapStyle = (style) => {
    setMapStyle(style);
    if (!mapInstanceRef.current || !tileLayerRef.current) return;

    mapInstanceRef.current.removeLayer(tileLayerRef.current);

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
    let attribution = 'Tiles &copy; Esri &mdash; ITER SOA Campus GIS';

    if (style === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Source: Esri, Maxar, Earthstar Geographics';
    } else if (style === 'positron') {
      url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
    }

    const newLayer = L.tileLayer(url, { maxZoom: 19, attribution }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  };

  const handleCenterMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(CAMPUS_COORDS.center, 16.5, { duration: 1.2 });
    }
  };

  const handleFlyToAlert = (alert) => {
    setActiveAlertState(alert.id);
    if (onSelectAlert) onSelectAlert(alert.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(alert.coords, 18, { duration: 0.8 });
      const marker = alertMarkersRef.current[alert.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    }
  };

  const activeAlertObj = CAMPUS_FACILITY_ALERTS.find(
    (a) => a.id === activeAlertState || a.aliasId === activeAlertState
  ) || CAMPUS_FACILITY_ALERTS[0];

  return (
    <div className="cs-real-map-container">
      {/* Real Interactive Leaflet Container */}
      <div ref={mapContainerRef} className="cs-leaflet-viewport" />

      {/* Floating Top-Left Map Facility Advisories Bar */}
      <div className="cs-map-advisories-overlay">
        <div className="advisories-bar-header">
          <span className="live-pulsing-amber-dot" />
          <span className="advisories-title">Map Facility Advisories (3)</span>
        </div>
        <div className="advisories-chips-row">
          {CAMPUS_FACILITY_ALERTS.map((alert) => {
            const isSelected = activeAlertState === alert.id || activeAlertState === alert.aliasId;
            return (
              <button
                key={alert.id}
                className={`map-adv-chip ${alert.severity} ${isSelected ? 'active' : ''}`}
                onClick={() => handleFlyToAlert(alert)}
                title={`Click to zoom to ${alert.facility}: ${alert.badge}`}
              >
                <span className="chip-emoji">{alert.iconEmoji}</span>
                <span className="chip-facility-name">{alert.shortName}</span>
                <span className="chip-badge-tag">{alert.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Top-Right Map Controls */}
      <div className="cs-map-floating-controls">
        <div className="cs-map-layer-switcher">
          <button
            className={`layer-btn ${mapStyle === 'creamy' ? 'active' : ''}`}
            onClick={() => handleChangeMapStyle('creamy')}
            title="Dusky Creamy Cartographic (Default)"
          >
            Creamy Map
          </button>
          <button
            className={`layer-btn ${mapStyle === 'satellite' ? 'active' : ''}`}
            onClick={() => handleChangeMapStyle('satellite')}
            title="Real Satellite Aerial View"
          >
            Satellite
          </button>
          <button
            className={`layer-btn ${mapStyle === 'positron' ? 'active' : ''}`}
            onClick={() => handleChangeMapStyle('positron')}
            title="Clean Blueprint"
          >
            Blueprint
          </button>
        </div>

        <button
          className="cs-map-recenter-btn"
          onClick={handleCenterMap}
          title="Recenter Campus Quad"
        >
          <Navigation size={15} />
        </button>
      </div>

      {/* Bottom Map Legend Badge */}
      <div className="cs-map-bottom-legend">
        <span className="legend-chip">
          <span className="dot terracotta" /> Active Pedestrian Corridor (240m)
        </span>
        <span className="legend-chip">
          <span className="dot amber" /> Line 02 Shuttle Transit Ring
        </span>
        <span className="legend-chip active-alert-legend">
          <span className="dot live-pulse" /> 3 Live Facility Advisories Plotted
        </span>
      </div>
    </div>
  );
}
