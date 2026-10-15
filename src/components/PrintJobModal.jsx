import React, { useState } from 'react';
import {
  X,
  Printer,
  QrCode,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  MapPin,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function PrintJobModal({
  isOpen,
  onClose,
  onJobConfirmed
}) {
  const [docName, setDocName] = useState('CampusSphere_PitchDeck_Final.pdf');
  const [pageCount, setPageCount] = useState(14);
  const [selectedStation, setSelectedStation] = useState('cs-annex');
  const [isColor, setIsColor] = useState(false);
  const [isDuplex, setIsDuplex] = useState(true);
  const [issuedToken, setIssuedToken] = useState(null);

  if (!isOpen) return null;

  const handleQueueJob = (e) => {
    e.preventDefault();
    const token = {
      id: `PRN-${Math.floor(1000 + Math.random() * 9000)}`,
      docName: docName,
      stationName: selectedStation === 'cs-annex' ? 'CS & Tech Annex • Bay 1' : 'Academic Library • Ground Floor',
      pages: pageCount,
      pin: Math.floor(1000 + Math.random() * 9000),
      readyTime: selectedStation === 'cs-annex' ? 'Instant (< 45s)' : '1 min 30s',
      cost: `$${(pageCount * (isColor ? 0.08 : 0.02)).toFixed(2)} (Subsidized Student Credit)`
    };

    setIssuedToken(token);
    if (onJobConfirmed) onJobConfirmed();
  };

  const handleClose = () => {
    setIssuedToken(null);
    onClose();
  };

  return (
    <div className="cs-modal-backdrop" onClick={handleClose}>
      <div className="cs-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="cs-modal-header">
          <div className="cs-modal-title-wrap">
            <div className="cs-modal-icon-badge terracotta">
              <Printer size={18} />
            </div>
            <div>
              <h2 className="cs-modal-heading">Automated Print Dispatcher</h2>
              <span className="cs-modal-sub">Hyperlocal Smart Queue & Instant QR Token</span>
            </div>
          </div>
          <button className="cs-modal-close-btn" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {issuedToken ? (
          /* Success QR Token State */
          <div className="cs-print-token-state">
            <div className="cs-token-success-chip">
              <Sparkles size={14} />
              <span>Job Queued Successfully!</span>
            </div>

            {/* Visual Digital Pickup Pass */}
            <div className="cs-digital-print-pass">
              <div className="pass-header-strip">
                <span className="pass-brand">CAMPUSPHERE // SMART PRINTER PASS</span>
                <span className="pass-token-id">#{issuedToken.id}</span>
              </div>

              <div className="pass-content-body">
                <div className="pass-main-row">
                  <div>
                    <span className="pass-lbl">Station Target</span>
                    <span className="pass-val highlight">{issuedToken.stationName}</span>
                  </div>
                  <div className="pass-align-right">
                    <span className="pass-lbl">Ready Window</span>
                    <span className="pass-val sage-text">{issuedToken.readyTime}</span>
                  </div>
                </div>

                <div className="pass-detail-grid">
                  <div>
                    <span className="pass-lbl">Document</span>
                    <span className="pass-val">{issuedToken.docName}</span>
                  </div>
                  <div>
                    <span className="pass-lbl">Volume</span>
                    <span className="pass-val">{issuedToken.pages} Pages • {isDuplex ? '2-Sided' : '1-Sided'}</span>
                  </div>
                  <div>
                    <span className="pass-lbl">Student Charge</span>
                    <span className="pass-val">{issuedToken.cost}</span>
                  </div>
                </div>

                {/* QR Code & Locker PIN */}
                <div className="pass-qr-row">
                  <div className="pass-qr-graphic">
                    <QrCode size={64} />
                  </div>
                  <div className="pass-qr-instructions">
                    <div className="pin-highlight-box">
                      <span className="pin-label">Terminal PIN</span>
                      <span className="pin-code">{issuedToken.pin}#</span>
                    </div>
                    <p className="pin-note">
                      Scan QR at any Xerox kiosk or enter PIN on the touch console to release paper.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="cs-btn-primary full-width" onClick={handleClose}>
              <CheckCircle2 size={16} />
              <span>Done & Return to Cockpit</span>
            </button>
          </div>
        ) : (
          /* Form to Queue Print Job */
          <form onSubmit={handleQueueJob} className="cs-modal-form">
            <div className="cs-form-field">
              <label>Document Payload</label>
              <div className="cs-input-icon-group">
                <FileText size={16} className="input-icon" />
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="Enter or paste document title..."
                  required
                />
              </div>
            </div>

            {/* Print Station Selection */}
            <div className="cs-form-field">
              <label>Select Optimal Dispatch Station</label>
              <div className="station-selection-grid">
                <div
                  className={`station-card ${selectedStation === 'cs-annex' ? 'selected' : ''}`}
                  onClick={() => setSelectedStation('cs-annex')}
                >
                  <div className="station-top">
                    <span className="station-name">CS & Tech Annex Lab</span>
                    <span className="cs-badge sage">Instant Print</span>
                  </div>
                  <span className="station-desc">Zero queue • Nearest to Turing Hall (80m)</span>
                </div>

                <div
                  className={`station-card ${selectedStation === 'library' ? 'selected' : ''}`}
                  onClick={() => setSelectedStation('library')}
                >
                  <div className="station-top">
                    <span className="station-name">Academic Library Xerox</span>
                    <span className="cs-badge amber">2 Min Wait</span>
                  </div>
                  <span className="station-desc">6 jobs waiting in spooler</span>
                </div>
              </div>
            </div>

            {/* Pages & Print Options */}
            <div className="cs-form-row two-col">
              <div className="cs-form-field">
                <label>Page Count</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={pageCount}
                  onChange={(e) => setPageCount(parseInt(e.target.value) || 1)}
                  required
                />
              </div>

              <div className="cs-form-field">
                <label>Output Format</label>
                <div className="cs-toggle-buttons-row">
                  <button
                    type="button"
                    className={`toggle-chip ${!isColor ? 'active' : ''}`}
                    onClick={() => setIsColor(false)}
                  >
                    B&W ($0.02)
                  </button>
                  <button
                    type="button"
                    className={`toggle-chip ${isColor ? 'active' : ''}`}
                    onClick={() => setIsColor(true)}
                  >
                    Color ($0.08)
                  </button>
                </div>
              </div>
            </div>

            {/* Duplex Toggle */}
            <div className="cs-checkbox-row">
              <label className="cs-checkbox-label">
                <input
                  type="checkbox"
                  checked={isDuplex}
                  onChange={(e) => setIsDuplex(e.target.checked)}
                />
                <span>Duplex double-sided printing (Save 50% paper & credits)</span>
              </label>
            </div>

            {/* Actions */}
            <div className="cs-modal-footer">
              <button type="button" className="cs-btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="cs-btn-primary">
                <QrCode size={15} />
                <span>Issue Instant QR Token</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
