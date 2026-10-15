import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Printer,
  Bus,
  Droplets,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Zap,
  Wifi,
  Sparkles,
  ArrowRight,
  Shield,
  UploadCloud,
  FileText,
  Copy,
  Check,
  X,
  ChevronRight,
  Headphones,
  Maximize2,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';

export default function UtilityHubView({ onShowToast }) {
  // =========================================================================
  // STATE 1: Floor Selection & Seat Matrix
  // =========================================================================
  const [activeFloor, setActiveFloor] = useState('1st-floor');

  // Initial desks configuration across floors
  const initialFloorDesks = {
    'ground-floor': [
      { id: 'A-01', zone: 'Zone A (Window)', status: 'available', hasPlug: true, isSilent: false },
      { id: 'A-02', zone: 'Zone A (Window)', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'A-03', zone: 'Zone A (Window)', status: 'available', hasPlug: false, isSilent: false },
      { id: 'A-04', zone: 'Zone A (Window)', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'A-05', zone: 'Zone A (Window)', status: 'available', hasPlug: true, isSilent: false },
      { id: 'A-06', zone: 'Zone A (Window)', status: 'hold', hasPlug: true, isSilent: false },
      { id: 'B-01', zone: 'Zone B (Central)', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'B-02', zone: 'Zone B (Central)', status: 'available', hasPlug: true, isSilent: false },
      { id: 'B-03', zone: 'Zone B (Central)', status: 'available', hasPlug: false, isSilent: false },
      { id: 'B-04', zone: 'Zone B (Central)', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'B-05', zone: 'Zone B (Central)', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'B-06', zone: 'Zone B (Central)', status: 'available', hasPlug: true, isSilent: false },
      { id: 'C-01', zone: 'Group Pods C', status: 'available', hasPlug: true, isSilent: false },
      { id: 'C-02', zone: 'Group Pods C', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'C-03', zone: 'Group Pods C', status: 'hold', hasPlug: true, isSilent: false },
      { id: 'C-04', zone: 'Group Pods C', status: 'available', hasPlug: true, isSilent: false },
      { id: 'D-01', zone: 'Newspaper Lounge D', status: 'available', hasPlug: false, isSilent: false },
      { id: 'D-02', zone: 'Newspaper Lounge D', status: 'available', hasPlug: true, isSilent: false },
      { id: 'D-03', zone: 'Newspaper Lounge D', status: 'occupied', hasPlug: false, isSilent: false },
      { id: 'D-04', zone: 'Newspaper Lounge D', status: 'available', hasPlug: true, isSilent: false }
    ],
    '1st-floor': [
      // Zone A (East Window Reading)
      { id: 'A-01', zone: 'Zone A (East Window)', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'A-02', zone: 'Zone A (East Window)', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'A-03', zone: 'Zone A (East Window)', status: 'available', hasPlug: true, isSilent: true },
      { id: 'A-04', zone: 'Zone A (East Window)', status: 'hold', hasPlug: true, isSilent: true },
      { id: 'A-05', zone: 'Zone A (East Window)', status: 'available', hasPlug: true, isSilent: true },
      { id: 'A-06', zone: 'Zone A (East Window)', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'A-07', zone: 'Zone A (East Window)', status: 'available', hasPlug: false, isSilent: true },
      { id: 'A-08', zone: 'Zone A (East Window)', status: 'occupied', hasPlug: true, isSilent: true },
      // Zone B (Central Research Cubicles)
      { id: 'B-01', zone: 'Zone B (Central Cubicles)', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'B-02', zone: 'Zone B (Central Cubicles)', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'B-03', zone: 'Zone B (Central Cubicles)', status: 'hold', hasPlug: false, isSilent: true },
      { id: 'B-04', zone: 'Zone B (Central Cubicles)', status: 'available', hasPlug: true, isSilent: true },
      { id: 'B-05', zone: 'Zone B (Central Cubicles)', status: 'available', hasPlug: true, isSilent: true },
      { id: 'B-06', zone: 'Zone B (Central Cubicles)', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'B-07', zone: 'Zone B (Central Cubicles)', status: 'available', hasPlug: true, isSilent: true },
      { id: 'B-08', zone: 'Zone B (Central Cubicles)', status: 'occupied', hasPlug: true, isSilent: true },
      // Silent Pods C
      { id: 'Pod C-01', zone: 'Silent Focus Pods', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'Pod C-02', zone: 'Silent Focus Pods', status: 'available', hasPlug: true, isSilent: true },
      { id: 'Pod C-03', zone: 'Silent Focus Pods', status: 'hold', hasPlug: true, isSilent: true },
      { id: 'Pod C-04', zone: 'Silent Focus Pods', status: 'available', hasPlug: true, isSilent: true },
      // Quiet Room D
      { id: 'Desk D-01', zone: 'Thesis Reference D', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'Desk D-02', zone: 'Thesis Reference D', status: 'available', hasPlug: true, isSilent: true },
      { id: 'Desk D-03', zone: 'Thesis Reference D', status: 'occupied', hasPlug: true, isSilent: true },
      { id: 'Desk D-04', zone: 'Thesis Reference D', status: 'available', hasPlug: true, isSilent: true }
    ],
    '2nd-floor': [
      { id: 'E-01', zone: 'Digital E-Library', status: 'available', hasPlug: true, isSilent: false },
      { id: 'E-02', zone: 'Digital E-Library', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'E-03', zone: 'Digital E-Library', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'E-04', zone: 'Digital E-Library', status: 'available', hasPlug: true, isSilent: false },
      { id: 'E-05', zone: 'Digital E-Library', status: 'available', hasPlug: true, isSilent: false },
      { id: 'E-06', zone: 'Digital E-Library', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'F-01', zone: 'Coding Clusters', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'F-02', zone: 'Coding Clusters', status: 'available', hasPlug: true, isSilent: false },
      { id: 'F-03', zone: 'Coding Clusters', status: 'hold', hasPlug: true, isSilent: false },
      { id: 'F-04', zone: 'Coding Clusters', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'F-05', zone: 'Coding Clusters', status: 'available', hasPlug: true, isSilent: false },
      { id: 'F-06', zone: 'Coding Clusters', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'Pod G-01', zone: 'AI GPU Workstation Pods', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'Pod G-02', zone: 'AI GPU Workstation Pods', status: 'available', hasPlug: true, isSilent: false },
      { id: 'Pod G-03', zone: 'AI GPU Workstation Pods', status: 'occupied', hasPlug: true, isSilent: false },
      { id: 'Pod G-04', zone: 'AI GPU Workstation Pods', status: 'available', hasPlug: true, isSilent: false }
    ]
  };

  const [desksData, setDesksData] = useState(initialFloorDesks);
  
  // Selected desk state (defaults to B-04 as specified in prompt)
  const [selectedDesk, setSelectedDesk] = useState({
    id: 'B-04',
    zone: 'Zone B (Central Cubicles)',
    floor: '1st Floor — Silent Reference & Thesis Wing',
    hasPlug: true,
    isSilent: true,
    status: 'available'
  });

  // Modal State for Digital Library Check-in Pass
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [reservationPass, setReservationPass] = useState(null);
  const [holdTimerSeconds, setHoldTimerSeconds] = useState(1800); // 30 mins = 1800s

  // Live Timer for 30-min hold countdown in the modal
  useEffect(() => {
    let timer;
    if (isPassModalOpen && holdTimerSeconds > 0) {
      timer = setInterval(() => {
        setHoldTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPassModalOpen, holdTimerSeconds]);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // =========================================================================
  // STATE 2: Cloud Print Dispatcher State
  // =========================================================================
  const [uploadedFileName, setUploadedFileName] = useState('OperatingSystems_ExamNotes_Ch4.pdf');
  const [selectedPrinter, setSelectedPrinter] = useState('library-ground');
  const [issuedPrintPin, setIssuedPrintPin] = useState(null);
  const [isPinCopied, setIsPinCopied] = useState(false);

  // =========================================================================
  // STATE 3: Transit Countdown State (04:20 mins ticking down)
  // =========================================================================
  const [shuttleSeconds, setShuttleSeconds] = useState(260); // 4m 20s

  useEffect(() => {
    const timer = setInterval(() => {
      setShuttleSeconds((prev) => (prev > 0 ? prev - 1 : 360));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatShuttleCountdown = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Handler: Selecting a desk tile
  const handleSelectDesk = (desk) => {
    if (desk.status === 'occupied') {
      if (onShowToast) onShowToast(`${desk.id} is occupied. Choose an available desk (green).`, 'warning');
      return;
    }
    if (desk.status === 'hold') {
      if (onShowToast) onShowToast(`${desk.id} is currently on a 30-minute reservation hold.`, 'warning');
      return;
    }

    const floorName =
      activeFloor === 'ground-floor'
        ? 'Ground Floor — General Reading'
        : activeFloor === '1st-floor'
        ? '1st Floor — Silent Reference & Thesis Wing'
        : '2nd Floor — Digital E-Library & Coding Pods';

    setSelectedDesk({
      ...desk,
      floor: floorName
    });

    if (onShowToast) {
      onShowToast(`Selected ${desk.id} (${desk.zone}). Ready for 30-min hold.`, 'info');
    }
  };

  // Handler: Initiating 30-Minute Hold
  const handleConfirmHold = () => {
    if (!selectedDesk) return;

    // Update desk status in state to 'hold'
    const updatedFloor = desksData[activeFloor].map((d) =>
      d.id === selectedDesk.id ? { ...d, status: 'hold' } : d
    );
    setDesksData({
      ...desksData,
      [activeFloor]: updatedFloor
    });

    const pass = {
      passId: `LIB-HLD-${Math.floor(1000 + Math.random() * 9000)}`,
      deskId: selectedDesk.id,
      floor: selectedDesk.floor,
      zone: selectedDesk.zone,
      reservedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      studentName: 'Ashmit Verma',
      rollId: 'CS-2024-042',
      qrString: `CAMPUSPHERE-ITER-SEAT-${selectedDesk.id}-VERMA`
    };

    setReservationPass(pass);
    setHoldTimerSeconds(1800); // 30 minutes
    setIsPassModalOpen(true);

    if (onShowToast) {
      onShowToast(`30-Minute Hold active for ${selectedDesk.id}! Scan QR at turnstile.`, 'success');
    }
  };

  // Handler: Generate Secure Print Release Token
  const handleGeneratePrintToken = (e) => {
    e.preventDefault();
    const pin = Math.floor(1000 + Math.random() * 9000);
    setIssuedPrintPin(pin);
    setIsPinCopied(false);

    if (onShowToast) {
      onShowToast(`Print token generated: PIN ${pin}. Enter at physical printer keypad.`, 'success');
    }
  };

  const handleCopyPin = () => {
    if (issuedPrintPin) {
      navigator.clipboard?.writeText(String(issuedPrintPin));
      setIsPinCopied(true);
      setTimeout(() => setIsPinCopied(false), 3000);
      if (onShowToast) onShowToast(`PIN ${issuedPrintPin} copied to clipboard!`, 'info');
    }
  };

  // Current floor statistics
  const currentDesks = desksData[activeFloor] || [];
  const availableCount = currentDesks.filter((d) => d.status === 'available').length;
  const occupiedCount = currentDesks.filter((d) => d.status === 'occupied').length;
  const holdCount = currentDesks.filter((d) => d.status === 'hold').length;

  return (
    <div className="cs-utility-hub-root">

      {/* =========================================================================
          MODULE A: TOP BANNER (Quick Utility Quick-Metrics Bar)
          ========================================================================= */}
      <section className="cs-utility-metrics-grid">
        
        {/* Card 1: Central Library Live Capacity */}
        <div className="cs-utility-metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box sage">
              <BookOpen size={18} />
            </div>
            <span className="cs-badge sage">Real-Time Infrared</span>
          </div>
          <div className="metric-card-body">
            <div className="metric-big-row">
              <span className="metric-big-num">164 / 280</span>
              <span className="metric-big-tag">58% Full</span>
            </div>
            <span className="metric-headline">Central Library Live Capacity</span>
            <div className="metric-bar-track">
              <div className="metric-bar-fill amber" style={{ width: '58%' }} />
            </div>
            <span className="metric-footnote">
              <Sparkles size={11} className="terracotta-sparkle" />
              Peak exam surge expected around 14:00
            </span>
          </div>
        </div>

        {/* Card 2: Cloud Print Stations */}
        <div className="cs-utility-metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box terracotta">
              <Printer size={18} />
            </div>
            <span className="cs-badge sage">4 Online</span>
          </div>
          <div className="metric-card-body">
            <div className="metric-big-row">
              <span className="metric-big-num">4 Active</span>
              <span className="metric-big-tag">Avg 2m wait</span>
            </div>
            <span className="metric-headline">Cloud Print Stations</span>
            <div className="metric-bar-track">
              <div className="metric-bar-fill sage" style={{ width: '25%' }} />
            </div>
            <span className="metric-footnote">
              <CheckCircle2 size={11} className="sage-text" />
              Library ground floor zero wait • Ready for print
            </span>
          </div>
        </div>

        {/* Card 3: Campus Transit Shuttles */}
        <div className="cs-utility-metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box amber">
              <Bus size={18} />
            </div>
            <span className="cs-badge amber">Khandagiri Loop</span>
          </div>
          <div className="metric-card-body">
            <div className="metric-big-row">
              <span className="metric-big-num font-mono">{formatShuttleCountdown(shuttleSeconds)}</span>
              <span className="metric-big-tag">Shuttle 01</span>
            </div>
            <span className="metric-headline">Campus Transit Shuttles</span>
            <div className="metric-bar-track">
              <div className="metric-bar-fill amber" style={{ width: '65%' }} />
            </div>
            <span className="metric-footnote">
              <Clock size={11} />
              Arriving at ITER Gate 1 in {formatShuttleCountdown(shuttleSeconds)} min
            </span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          MODULE B: HERO SECTION (Smart Library Live Seat Matrix & Study-Pod Booker)
          ========================================================================= */}
      <section className="cs-library-matrix-card">

        {/* 1. Header & Floor Filter Controls */}
        <div className="matrix-header-bar">
          <div className="matrix-title-group">
            <div className="library-emblem-box">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="title-with-pill">
                <h2 className="matrix-main-title">ITER Central Library // Real-Time Floor Heatmap</h2>
                <span className="sensor-sync-pill">
                  <span className="live-sensor-dot" />
                  Overhead Infrared Sync Active
                </span>
              </div>
              <p className="matrix-subtext">
                Live sensor occupancy telemetry across 3 floors. Select an available desk to place a temporary 30-minute hold.
              </p>
            </div>
          </div>

          {/* Segmented Floor Switcher */}
          <div className="cs-floor-segmented-tabs">
            <button
              className={`floor-tab-btn ${activeFloor === 'ground-floor' ? 'active' : ''}`}
              onClick={() => setActiveFloor('ground-floor')}
            >
              <span>Ground Floor (General)</span>
            </button>
            <button
              className={`floor-tab-btn ${activeFloor === '1st-floor' ? 'active' : ''}`}
              onClick={() => setActiveFloor('1st-floor')}
            >
              <span>1st Floor (Silent & Thesis)</span>
            </button>
            <button
              className={`floor-tab-btn ${activeFloor === '2nd-floor' ? 'active' : ''}`}
              onClick={() => setActiveFloor('2nd-floor')}
            >
              <span>2nd Floor (Digital & Pods)</span>
            </button>
          </div>
        </div>

        {/* Legend Bar */}
        <div className="matrix-legend-strip">
          <div className="legend-items-group">
            <div className="legend-item">
              <span className="seat-preview-box available" />
              <span>Available Desk ({availableCount} Free)</span>
            </div>
            <div className="legend-item">
              <span className="seat-preview-box hold" />
              <span>30-Min Temp Hold ({holdCount})</span>
            </div>
            <div className="legend-item">
              <span className="seat-preview-box occupied" />
              <span>Occupied ({occupiedCount})</span>
            </div>
            <div className="legend-item">
              <Zap size={13} className="terracotta-text" />
              <span>Power Plug & Ethernet</span>
            </div>
            <div className="legend-item">
              <Headphones size={13} className="slate-text" />
              <span>Silent Cubicle Zone</span>
            </div>
          </div>

          <div className="floor-quick-summary">
            <span>Current Floor: <strong>{availableCount} Available</strong> of {currentDesks.length} Tracked Desks</span>
          </div>
        </div>

        {/* 2. Interactive Seat Matrix Grid & 30-Min Hold Companion Sidebar */}
        <div className="matrix-content-split">
          
          {/* LEFT: Desk Layout Arranged in Realistic Zones */}
          <div className="desks-grid-container">
            {/* Zone A: Window Bay */}
            <div className="study-zone-section">
              <div className="zone-header">
                <span className="zone-tag">ZONE A</span>
                <span className="zone-desc">East Window Reading Corridor • High Natural Daylight</span>
              </div>
              <div className="desks-tiles-grid">
                {currentDesks.slice(0, 8).map((desk) => {
                  const isSelected = selectedDesk?.id === desk.id;
                  return (
                    <button
                      key={desk.id}
                      type="button"
                      className={`desk-tile ${desk.status} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectDesk(desk)}
                      title={`Desk ${desk.id}: ${desk.status.toUpperCase()}`}
                    >
                      <div className="desk-tile-top">
                        <span className="desk-id-label">{desk.id}</span>
                        <div className="desk-features-icons">
                          {desk.hasPlug && <Zap size={11} className="feature-icon plug" title="Dual AC Power Outlet" />}
                          {desk.isSilent && <Headphones size={11} className="feature-icon silent" title="Strict Silent Zone" />}
                        </div>
                      </div>
                      <span className="desk-status-pill">{desk.status}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zone B: Central Research Cubicles */}
            <div className="study-zone-section">
              <div className="zone-header">
                <span className="zone-tag">ZONE B</span>
                <span className="zone-desc">Central Reference Cubicles • Individual Partitions</span>
              </div>
              <div className="desks-tiles-grid">
                {currentDesks.slice(8, 16).map((desk) => {
                  const isSelected = selectedDesk?.id === desk.id;
                  return (
                    <button
                      key={desk.id}
                      type="button"
                      className={`desk-tile ${desk.status} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectDesk(desk)}
                      title={`Desk ${desk.id}: ${desk.status.toUpperCase()}`}
                    >
                      <div className="desk-tile-top">
                        <span className="desk-id-label">{desk.id}</span>
                        <div className="desk-features-icons">
                          {desk.hasPlug && <Zap size={11} className="feature-icon plug" title="Dual AC Power Outlet" />}
                          {desk.isSilent && <Headphones size={11} className="feature-icon silent" title="Strict Silent Zone" />}
                        </div>
                      </div>
                      <span className="desk-status-pill">{desk.status}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Zone C & D: Silent Focus Pods & Collaboration Desks */}
            <div className="study-zone-section">
              <div className="zone-header">
                <span className="zone-tag">PODS C & D</span>
                <span className="zone-desc">Acoustic Sound-Dampened Pods & Reference Alcoves</span>
              </div>
              <div className="desks-tiles-grid pods-row">
                {currentDesks.slice(16, 24).map((desk) => {
                  const isSelected = selectedDesk?.id === desk.id;
                  return (
                    <button
                      key={desk.id}
                      type="button"
                      className={`desk-tile pod ${desk.status} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectDesk(desk)}
                      title={`${desk.id}: ${desk.status.toUpperCase()}`}
                    >
                      <div className="desk-tile-top">
                        <span className="desk-id-label">{desk.id}</span>
                        <div className="desk-features-icons">
                          <Zap size={11} className="feature-icon plug" />
                          <Headphones size={11} className="feature-icon silent" />
                        </div>
                      </div>
                      <span className="desk-status-pill">{desk.status}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Smart 30-Minute Hold & Booking Panel */}
          <div className="seat-booking-sidebar">
            <div className="booking-panel-header">
              <div className="panel-badge-icon">
                <QrCode size={18} />
              </div>
              <div>
                <h3 className="panel-title">Seat Reservation Desk</h3>
                <span className="panel-sub">Anti-Hoarding Smart Terminal</span>
              </div>
            </div>

            {selectedDesk ? (
              <div className="selected-desk-card">
                <div className="desk-chip-row">
                  <span className="desk-hero-code">{selectedDesk.id}</span>
                  <span className="cs-badge sage">Available for Hold</span>
                </div>

                <div className="desk-specs-list">
                  <div className="spec-row">
                    <span className="spec-lbl">Campus Venue</span>
                    <strong className="spec-val">ITER Central Library</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-lbl">Floor & Wing</span>
                    <span className="spec-val">{selectedDesk.floor}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-lbl">Zone</span>
                    <span className="spec-val">{selectedDesk.zone}</span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="amenities-container">
                  <span className="amenity-title">Included Amenities:</span>
                  <div className="amenity-chips-wrap">
                    <span className="amenity-chip">
                      <Wifi size={11} /> 1 Gbps Wi-Fi 6
                    </span>
                    <span className="amenity-chip">
                      <Zap size={11} /> Dual AC Outlet
                    </span>
                    <span className="amenity-chip">
                      <Headphones size={11} /> Acoustic Silent
                    </span>
                  </div>
                </div>

                {/* Anti-Hoarding Rule Alert Callout */}
                <div className="anti-hoarding-alert">
                  <div className="alert-icon-wrap">
                    <Clock size={16} />
                  </div>
                  <div className="alert-text-body">
                    <span className="alert-rule-heading">30-Min Anti-Hoarding Rule:</span>
                    <p className="alert-rule-desc">
                      Hold desk now for 30 minutes. You must scan the check-in QR code at the library turnstile gate within 30 minutes, or the seat releases automatically.
                    </p>
                  </div>
                </div>

                {/* Action Button: Hold Desk for 30 Mins */}
                <button
                  type="button"
                  className="cs-btn-primary full-width large-btn"
                  onClick={handleConfirmHold}
                >
                  <Clock size={16} />
                  <span>Hold Desk for 30 Mins ➔</span>
                </button>
              </div>
            ) : (
              <div className="empty-selection-placeholder">
                <BookOpen size={32} className="placeholder-icon" />
                <span className="placeholder-text">Click any green desk tile on the floor map to preview and reserve.</span>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* =========================================================================
          MODULE C: BOTTOM ROW (Companion Utilities: 2-Column Grid)
          ========================================================================= */}
      <section className="cs-companion-utilities-grid">

        {/* 1. Left Card: Automated Cloud Print Queue Dispatcher */}
        <div className="cs-card cs-card-print-hub">
          <div className="cs-card-header">
            <div className="cs-card-title-group">
              <Printer size={18} className="terracotta-text" />
              <h3 className="cs-card-title">Automated Cloud Print Dispatcher</h3>
            </div>
            <span className="cs-badge sage">Zero Queue Routing</span>
          </div>

          <form onSubmit={handleGeneratePrintToken} className="print-dispatcher-form">
            {/* Drag & Drop Mock Upload Zone */}
            <div className="mock-upload-dropzone">
              <UploadCloud size={28} className="upload-icon terracotta-text" />
              <div className="upload-text-group">
                <span className="upload-main-text">Drop assignments / lecture slides (PDF/DOCX)</span>
                <span className="upload-sub-text">Encrypted AES-256 campus spool • Instant token release</span>
              </div>
              <div className="uploaded-file-chip">
                <FileText size={13} />
                <span>{uploadedFileName}</span>
                <span className="file-size-tag">1.8 MB</span>
              </div>
            </div>

            {/* Select Printer Station */}
            <div className="station-selector-group">
              <label className="field-group-label">Select Nearest Campus Print Terminal:</label>
              
              <div className="printer-stations-list">
                {/* Station 1: Recommended */}
                <label className={`station-radio-card ${selectedPrinter === 'library-ground' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="printer"
                    value="library-ground"
                    checked={selectedPrinter === 'library-ground'}
                    onChange={() => setSelectedPrinter('library-ground')}
                  />
                  <div className="station-info-col">
                    <div className="station-name-row">
                      <strong>ITER Central Library Desk</strong>
                      <span className="recom-badge">Recommended</span>
                    </div>
                    <span className="station-meta">1 job in queue • 92% Toner • 0 min wait</span>
                  </div>
                </label>

                {/* Station 2 */}
                <label className={`station-radio-card ${selectedPrinter === 'block-c-xerox' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="printer"
                    value="block-c-xerox"
                    checked={selectedPrinter === 'block-c-xerox'}
                    onChange={() => setSelectedPrinter('block-c-xerox')}
                  />
                  <div className="station-info-col">
                    <div className="station-name-row">
                      <strong>Block C CS Lab Xerox</strong>
                      <span className="cs-badge amber mini">5 in queue</span>
                    </div>
                    <span className="station-meta">Estimated wait: ~6 mins • High volume duplex</span>
                  </div>
                </label>

                {/* Station 3: Offline */}
                <label className="station-radio-card disabled">
                  <input type="radio" name="printer" disabled />
                  <div className="station-info-col">
                    <div className="station-name-row">
                      <strong>Block A Ground Floor</strong>
                      <span className="cs-badge terracotta mini">Paper Refill</span>
                    </div>
                    <span className="station-meta">Temporarily offline • Restocking tray A4</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Button: Generate Secure Print Release Token */}
            <button type="submit" className="cs-btn-primary full-width">
              <QrCode size={15} />
              <span>Generate Secure Print Release Token ➔</span>
            </button>
          </form>

          {/* Generated PIN Badge / Token Feedback */}
          {issuedPrintPin && (
            <div className="print-token-reveal-card">
              <div className="token-reveal-left">
                <span className="token-reveal-lbl">PRINTER RELEASE PASS:</span>
                <span className="token-pin-digits font-mono">PIN: {issuedPrintPin}</span>
                <span className="token-expiry-note">Enter PIN on keypad at selected printer terminal within 2 hours</span>
              </div>
              <button
                type="button"
                className="copy-pin-btn"
                onClick={handleCopyPin}
                title="Copy PIN to clipboard"
              >
                {isPinCopied ? <Check size={14} className="sage-text" /> : <Copy size={14} />}
                <span>{isPinCopied ? 'Copied!' : 'Copy PIN'}</span>
              </button>
            </div>
          )}
        </div>

        {/* 2. Right Card: Campus Shuttle & Water Station Telemetry */}
        <div className="cs-card cs-card-telemetry-hub">
          <div className="cs-card-header">
            <div className="cs-card-title-group">
              <Bus size={18} className="terracotta-text" />
              <h3 className="cs-card-title">Campus Shuttle & Water Station Telemetry</h3>
            </div>
            <span className="cs-badge amber">Mesh Sensors Online</span>
          </div>

          <div className="telemetry-stack">
            
            {/* Sub-Card A: Shuttle Schedule & ETA */}
            <div className="telemetry-subcard shuttle-feed">
              <div className="subcard-title-row">
                <div className="subcard-tag-wrap">
                  <Bus size={15} className="terracotta-text" />
                  <strong className="subcard-name">Transit Route 02 (Khandagiri - ITER Ring)</strong>
                </div>
                <span className="countdown-pill amber font-mono">
                  {formatShuttleCountdown(shuttleSeconds)} MIN
                </span>
              </div>

              <div className="transit-path-nodes">
                <div className="transit-node active">
                  <span className="node-dot" />
                  <span className="node-label">Gate 1 Bay</span>
                  <span className="node-eta">Approaching</span>
                </div>
                <span className="path-dash">➔</span>
                <div className="transit-node">
                  <span className="node-dot" />
                  <span className="node-label">Bansuri Guru</span>
                  <span className="node-eta">+3 mins</span>
                </div>
                <span className="path-dash">➔</span>
                <div className="transit-node">
                  <span className="node-dot" />
                  <span className="node-label">Hostel Bay 2</span>
                  <span className="node-eta">+7 mins</span>
                </div>
              </div>
            </div>

            {/* Sub-Card B: Smart RO Water Station Monitor */}
            <div className="telemetry-subcard ro-water-feed">
              <div className="subcard-title-row">
                <div className="subcard-tag-wrap">
                  <Droplets size={15} className="blue-text" />
                  <strong className="subcard-name">Smart RO Hydration Station Monitor</strong>
                </div>
                <span className="cs-badge sage">UV Sterilized</span>
              </div>

              <div className="ro-stations-list">
                {/* Station 1: Block C */}
                <div className="ro-station-item">
                  <div className="ro-item-top">
                    <span className="ro-loc">Block C 2nd Floor RO Station</span>
                    <span className="ro-status-pill sage">Chilled & Active</span>
                  </div>
                  <div className="ro-metrics-pills">
                    <span className="ro-stat">TDS: <strong>112 ppm</strong> (Pristine)</span>
                    <span className="ro-stat">Filter Life: <strong>84%</strong></span>
                    <span className="ro-stat">Temp: <strong>14°C</strong></span>
                  </div>
                </div>

                {/* Station 2: Block B */}
                <div className="ro-station-item offline">
                  <div className="ro-item-top">
                    <span className="ro-loc">Block B Ground Floor Dispenser</span>
                    <span className="ro-status-pill terracotta">Filter Servicing</span>
                  </div>
                  <div className="ro-metrics-pills">
                    <span className="ro-stat">Offline until <strong>14:00</strong></span>
                    <span className="ro-stat">Diverted to: <strong>Block C Station</strong></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          MODAL: DIGITAL LIBRARY CHECK-IN PASS & QR CODE (30-MIN HOLD)
          ========================================================================= */}
      {isPassModalOpen && reservationPass && (
        <div className="cs-modal-backdrop" onClick={() => setIsPassModalOpen(false)}>
          <div className="cs-modal-box library-pass-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="cs-modal-header">
              <div className="cs-modal-title-wrap">
                <div className="cs-modal-icon-badge sage">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h2 className="cs-modal-heading">Digital Library Turnstile Pass</h2>
                  <span className="cs-modal-sub">30-Minute Anti-Hoarding Hold Active</span>
                </div>
              </div>
              <button className="cs-modal-close-btn" onClick={() => setIsPassModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Boarding-Pass Styled Digital Card */}
            <div className="library-boarding-pass">
              <div className="pass-top-strip">
                <span className="pass-org">ITER CENTRAL LIBRARY // SOA UNIVERSITY</span>
                <span className="pass-token-num font-mono">{reservationPass.passId}</span>
              </div>

              <div className="pass-main-body">
                <div className="pass-seat-display">
                  <span className="seat-large-code">{reservationPass.deskId}</span>
                  <div className="seat-meta-block">
                    <span className="seat-zone-txt">{reservationPass.zone}</span>
                    <span className="seat-floor-txt">{reservationPass.floor}</span>
                  </div>
                </div>

                {/* Live 30:00 Countdown Timer */}
                <div className="hold-countdown-card">
                  <span className="countdown-sub">HOLD EXPIRES IN:</span>
                  <span className="countdown-digits font-mono terracotta-text">
                    {formatTimer(holdTimerSeconds)}
                  </span>
                  <span className="countdown-guidance">
                    Scan at Entrance Turnstiles within 30 mins to confirm check-in.
                  </span>
                </div>

                {/* Generated QR Code Vector */}
                <div className="qr-container-box">
                  <svg className="pass-qr-svg" viewBox="0 0 160 160">
                    <rect width="160" height="160" fill="#FFFFFF" />
                    {/* Corner Squares */}
                    <rect x="15" y="15" width="40" height="40" fill="#23211E" />
                    <rect x="22" y="22" width="26" height="26" fill="#FFFFFF" />
                    <rect x="29" y="29" width="12" height="12" fill="#C26D53" />

                    <rect x="105" y="15" width="40" height="40" fill="#23211E" />
                    <rect x="112" y="22" width="26" height="26" fill="#FFFFFF" />
                    <rect x="119" y="29" width="12" height="12" fill="#C26D53" />

                    <rect x="15" y="105" width="40" height="40" fill="#23211E" />
                    <rect x="22" y="112" width="26" height="26" fill="#FFFFFF" />
                    <rect x="29" y="119" width="12" height="12" fill="#C26D53" />

                    {/* Simulated QR matrix dots */}
                    <rect x="65" y="20" width="8" height="8" fill="#23211E" />
                    <rect x="80" y="20" width="8" height="8" fill="#23211E" />
                    <rect x="65" y="35" width="8" height="8" fill="#C26D53" />
                    <rect x="80" y="45" width="8" height="8" fill="#23211E" />
                    <rect x="20" y="65" width="8" height="8" fill="#23211E" />
                    <rect x="35" y="65" width="8" height="8" fill="#23211E" />
                    <rect x="50" y="65" width="8" height="8" fill="#C26D53" />
                    <rect x="65" y="65" width="8" height="8" fill="#23211E" />
                    <rect x="80" y="65" width="8" height="8" fill="#C26D53" />
                    <rect x="95" y="65" width="8" height="8" fill="#23211E" />
                    <rect x="110" y="65" width="8" height="8" fill="#23211E" />
                    <rect x="125" y="65" width="8" height="8" fill="#C26D53" />
                    <rect x="20" y="80" width="8" height="8" fill="#23211E" />
                    <rect x="50" y="80" width="8" height="8" fill="#23211E" />
                    <rect x="65" y="80" width="8" height="8" fill="#C26D53" />
                    <rect x="95" y="80" width="8" height="8" fill="#23211E" />
                    <rect x="125" y="80" width="8" height="8" fill="#23211E" />
                    <rect x="65" y="95" width="8" height="8" fill="#23211E" />
                    <rect x="80" y="95" width="8" height="8" fill="#C26D53" />
                    <rect x="65" y="110" width="8" height="8" fill="#23211E" />
                    <rect x="95" y="110" width="8" height="8" fill="#23211E" />
                    <rect x="110" y="110" width="8" height="8" fill="#C26D53" />
                    <rect x="125" y="110" width="8" height="8" fill="#23211E" />
                    <rect x="80" y="125" width="8" height="8" fill="#23211E" />
                    <rect x="95" y="125" width="8" height="8" fill="#C26D53" />
                    <rect x="110" y="125" width="8" height="8" fill="#23211E" />
                    <rect x="125" y="125" width="8" height="8" fill="#23211E" />
                  </svg>
                  <span className="qr-pass-caption">Turnstile Scanner Token</span>
                </div>

                {/* Student Credentials Strip */}
                <div className="pass-student-strip">
                  <div>
                    <span className="p-lbl">Student</span>
                    <strong className="p-val">{reservationPass.studentName}</strong>
                  </div>
                  <div>
                    <span className="p-lbl">Roll Number</span>
                    <span className="p-val font-mono">{reservationPass.rollId}</span>
                  </div>
                  <div>
                    <span className="p-lbl">Issued Time</span>
                    <span className="p-val">{reservationPass.reservedAt}</span>
                  </div>
                </div>
              </div>

              {/* Perforation dashed line */}
              <div className="pass-perforation-line">
                <span className="notch-left" />
                <span className="dash-line" />
                <span className="notch-right" />
              </div>

              <div className="pass-footer-strip">
                <Shield size={12} className="sage-text" />
                <span>Encrypted CampusPass • Auto-Checkin Enabled at Gate Turnstiles</span>
              </div>
            </div>

            <div className="modal-actions-row">
              <button
                type="button"
                className="cs-btn-secondary"
                onClick={() => setIsPassModalOpen(false)}
              >
                Close Pass
              </button>
              <button
                type="button"
                className="cs-btn-primary"
                onClick={() => {
                  setIsPassModalOpen(false);
                  if (onShowToast) onShowToast('Digital pass saved to active student wallet.', 'success');
                }}
              >
                <CheckCircle2 size={15} />
                <span>Keep in Wallet</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
