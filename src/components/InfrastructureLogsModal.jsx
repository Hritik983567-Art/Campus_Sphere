import React from 'react';
import {
  X,
  Droplets,
  Printer,
  Key,
  Wifi,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Download
} from 'lucide-react';

export default function InfrastructureLogsModal({
  isOpen,
  onClose
}) {
  if (!isOpen) return null;

  return (
    <div className="cs-modal-backdrop" onClick={onClose}>
      <div className="cs-modal-box large" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cs-modal-header">
          <div className="cs-modal-title-wrap">
            <div className="cs-modal-icon-badge slate">
              <Activity size={18} />
            </div>
            <div>
              <h2 className="cs-modal-heading">Campus Infrastructure Telemetry Logs</h2>
              <span className="cs-modal-sub">Hyperlocal Facility Sensor & Utility Diagnostics // Feed v2.6</span>
            </div>
          </div>
          <button className="cs-modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Logs Content Grid */}
        <div className="cs-logs-body">
          {/* Section 1: RO Water System */}
          <div className="cs-log-card">
            <div className="log-card-top">
              <div className="flex-align-center gap-8">
                <div className="cs-pill-icon blue mini">
                  <Droplets size={14} />
                </div>
                <h4 className="log-facility-name">Central Reverse Osmosis (RO) Purification Plant</h4>
              </div>
              <span className="cs-badge amber">Maintenance Mode</span>
            </div>

            <div className="log-metrics-grid">
              <div className="log-m-item">
                <span className="m-lbl">Block B TDS</span>
                <span className="m-val">42 ppm (Pristine)</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Filter Backpressure</span>
                <span className="m-val amber-text">64 PSI (Exceeded 55 PSI Threshold)</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Technician Assigned</span>
                <span className="m-val">Dave K. (Facilities Mechanical)</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">ETA Clearance</span>
                <span className="m-val">14:00 Today</span>
              </div>
            </div>
          </div>

          {/* Section 2: Library Xerox Spooler */}
          <div className="cs-log-card">
            <div className="log-card-top">
              <div className="flex-align-center gap-8">
                <div className="cs-pill-icon amber mini">
                  <Printer size={14} />
                </div>
                <h4 className="log-facility-name">Academic Xerox Print Fleet & Load Balancer</h4>
              </div>
              <span className="cs-badge terracotta">Auto-Rerouting Active</span>
            </div>

            <div className="log-metrics-grid">
              <div className="log-m-item">
                <span className="m-lbl">Library Spool Queue</span>
                <span className="m-val amber-text">6 Jobs (114 pages in buffer)</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">CS Annex Load</span>
                <span className="m-val sage-text">0 Jobs (Standby Ready)</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Balancing Strategy</span>
                <span className="m-val">Redirect jobs &gt; 10 pages to CS Annex</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Toner Remaining</span>
                <span className="m-val">Tray 1: 91% • Tray 2: 78%</span>
              </div>
            </div>
          </div>

          {/* Section 3: IoT Lab 304 Telemetry */}
          <div className="cs-log-card">
            <div className="log-card-top">
              <div className="flex-align-center gap-8">
                <div className="cs-pill-icon sage mini">
                  <Key size={14} />
                </div>
                <h4 className="log-facility-name">IoT & Embedded Systems Lab 304</h4>
              </div>
              <span className="cs-badge sage">Open Access Active</span>
            </div>

            <div className="log-metrics-grid">
              <div className="log-m-item">
                <span className="m-lbl">Benches Available</span>
                <span className="m-val sage-text">12 of 24 Workstations Free</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Soldering Ventilation</span>
                <span className="m-val">Fume extractors calibrated (0.8 m/s)</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">RFID Door Interlock</span>
                <span className="m-val">Automatic Unlock until 17:30</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Lab TA on Duty</span>
                <span className="m-val">Rohan Shenoy (Graduate Fellow)</span>
              </div>
            </div>
          </div>

          {/* Section 4: Wi-Fi Mesh */}
          <div className="cs-log-card">
            <div className="log-card-top">
              <div className="flex-align-center gap-8">
                <div className="cs-pill-icon slate mini">
                  <Wifi size={14} />
                </div>
                <h4 className="log-facility-name">Aruba Wi-Fi 6E Campus Mesh Telemetry</h4>
              </div>
              <span className="cs-badge sage">94% Health Index</span>
            </div>

            <div className="log-metrics-grid">
              <div className="log-m-item">
                <span className="m-lbl">Average RSSI</span>
                <span className="m-val">-52 dBm across Quad</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Total Connected Clients</span>
                <span className="m-val">2,840 active leases</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Channel Utilization</span>
                <span className="m-val">18% (Sub-GHz band pristine)</span>
              </div>
              <div className="log-m-item">
                <span className="m-lbl">Packet Loss</span>
                <span className="m-val">0.012% (Exceptional)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cs-modal-footer">
          <button className="cs-btn-secondary" onClick={onClose}>
            Close Diagnostics
          </button>
          <button className="cs-btn-primary" onClick={() => alert('Infrastructure diagnostics exported to clipboard.')}>
            <Download size={14} />
            <span>Export Telemetry Snapshot</span>
          </button>
        </div>
      </div>
    </div>
  );
}
