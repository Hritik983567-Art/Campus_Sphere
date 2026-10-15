import React, { useState, useEffect } from 'react';
import {
  Shield,
  Compass,
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  Phone,
  Briefcase,
  QrCode,
  CheckCircle2,
  Bus,
  Monitor,
  BookOpen,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  Radio,
  ExternalLink,
  ChevronRight,
  Building
} from 'lucide-react';

export default function LoginPage({
  onLoginSuccess,
  onLaunchGuestMode
}) {
  // Auth Tab Mode: 'student' vs 'visitor'
  const [authMode, setAuthMode] = useState('student');

  // Student Credentials (prefilled so it never renders blank)
  const [emailOrRoll, setEmailOrRoll] = useState('ashmit.cse@campus.edu');
  const [password, setPassword] = useState('Campus@2026!Sec');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Visitor Credentials (prefilled)
  const [visitorName, setVisitorName] = useState('Dr. Evelyn Reed');
  const [visitorPhone, setVisitorPhone] = useState('+1 (555) 392-8190');
  const [visitorPurpose, setVisitorPurpose] = useState('Guest Lecture & Research Tour');

  // Interactive submission state
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccessData, setAuthSuccessData] = useState(null);
  const [visitorPassData, setVisitorPassData] = useState(null);

  // Live Shuttle Countdown in Right Column (03:20 mins counting down)
  const [shuttleSeconds, setShuttleSeconds] = useState(200); // 3m 20s

  useEffect(() => {
    const timer = setInterval(() => {
      setShuttleSeconds((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Demo Quick-Fill Presets for Hackathon Judges
  const handleAutofill = (presetType) => {
    setAuthMode('student');
    if (presetType === 'student') {
      setEmailOrRoll('ashmit.cse@campus.edu');
      setPassword('CS-2024-042-pass');
    } else if (presetType === 'admin') {
      setEmailOrRoll('facility.desk@campus.edu');
      setPassword('ADMIN-DESK-KEY-2026');
    }
  };

  // Student Form Submit
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isFacilityDesk = emailOrRoll.includes('facility');
      setAuthSuccessData({
        name: isFacilityDesk ? 'Marcus Vance' : 'Ashmit Verma',
        roll: isFacilityDesk ? 'DESK-FAC-991' : 'CS-2024-042',
        role: isFacilityDesk ? 'Lead Facility Administrator' : 'Computer Science & Engineering (Year 2)',
        department: 'School of Computing & Information Systems',
        sessionToken: `CS-SEC-${Math.floor(10000 + Math.random() * 90000)}`,
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1000);
  };

  // Visitor Form Submit
  const handleVisitorSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setVisitorPassData({
        passId: `VSTR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: visitorName,
        phone: visitorPhone,
        purpose: visitorPurpose,
        validUntil: 'Today • 20:00 (Campus Close)',
        accessZones: ['North Quad', 'Turing Seminar Hall', 'Visitor Parking Bay 3']
      });
    }, 1000);
  };

  const handleEnterCockpit = () => {
    if (onLoginSuccess) {
      onLoginSuccess(authSuccessData || { name: 'Ashmit Verma', role: 'Computer Science & Engineering (Year 2)' });
    }
  };

  return (
    <div className="cs-login-page-root">
      {/* Background Subtle Geometric Atmosphere */}
      <div className="cs-login-ambient-shapes">
        <div className="ambient-circle circle-1" />
        <div className="ambient-circle circle-2" />
      </div>

      <div className="cs-login-wrapper">
        {/* =====================================================================
            SPLIT 2-COLUMN CONTAINER
            ===================================================================== */}
        <div className="cs-login-split-card">
          
          {/* ===================================================================
              LEFT COLUMN: Interactive Authentication Box
              =================================================================== */}
          <div className="cs-login-left-col">
            {/* Header with Academic Shield Vector */}
            <div className="login-header-group">
              <div className="login-brand-row">
                <div className="cs-shield-icon-box login-size">
                  <svg
                    className="cs-shield-vector"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z"
                      fill="#C26D53"
                    />
                    <path
                      d="M12 6.5L6.5 9V11.5C6.5 15.2 8.8 18.6 12 19.6C15.2 18.6 17.5 15.2 17.5 11.5V9L12 6.5Z"
                      fill="#F7EDE9"
                    />
                    <circle cx="12" cy="12" r="2.5" fill="#C26D53" />
                  </svg>
                </div>
                <div className="brand-title-wrap">
                  <span className="brand-name">Campus<span className="terracotta-text">Sphere</span></span>
                  <span className="brand-sub">Unified Student Utilities // Gateway</span>
                </div>
              </div>

              <div className="login-headline-wrap">
                <h1 className="login-main-headline">Campus Access Terminal</h1>
                <p className="login-subtext">
                  Sign in with your university credentials or generate an instant visitor wayfinding pass.
                </p>
              </div>
            </div>

            {/* Dual Tab Switcher: Student / Faculty vs Visitor */}
            <div className="cs-login-segmented-tabs">
              <button
                className={`login-tab-btn ${authMode === 'student' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('student');
                  setAuthSuccessData(null);
                  setVisitorPassData(null);
                }}
              >
                <Lock size={14} />
                <span>Student / Faculty ID</span>
              </button>
              <button
                className={`login-tab-btn ${authMode === 'visitor' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('visitor');
                  setAuthSuccessData(null);
                  setVisitorPassData(null);
                }}
              >
                <QrCode size={14} />
                <span>Visitor QR Pass</span>
              </button>
            </div>

            {/* Hackathon Demo Shortcut Bar (Crucial for live judging) */}
            <div className="demo-quick-fill-bar">
              <div className="demo-label-row">
                <Sparkles size={12} className="terracotta-sparkle" />
                <span className="demo-title">Demo Quick Fill for Judges:</span>
              </div>
              <div className="demo-chips-row">
                <button
                  type="button"
                  className="demo-chip-btn"
                  onClick={() => handleAutofill('student')}
                  title="Autofill Year 2 CS Student Credentials"
                >
                  <span>Student Demo (Roll: CS-2024-042)</span>
                </button>
                <button
                  type="button"
                  className="demo-chip-btn"
                  onClick={() => handleAutofill('admin')}
                  title="Autofill Facilities Admin Credentials"
                >
                  <span>Admin Demo (Facility Desk)</span>
                </button>
              </div>
            </div>

            {/* -------------------------------------------------------------
                STATE A: Successful Student Authentication State
                ------------------------------------------------------------- */}
            {authSuccessData ? (
              <div className="auth-success-card">
                <div className="auth-success-header">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="auth-verified-name">{authSuccessData.name}</h3>
                    <span className="auth-verified-role">{authSuccessData.role}</span>
                  </div>
                </div>

                <div className="auth-token-details-grid">
                  <div className="token-detail-item">
                    <span className="t-lbl">Roll / Employee ID</span>
                    <span className="t-val font-mono">{authSuccessData.roll}</span>
                  </div>
                  <div className="token-detail-item">
                    <span className="t-lbl">Active Session Token</span>
                    <span className="t-val font-mono terracotta-text">{authSuccessData.sessionToken}</span>
                  </div>
                  <div className="token-detail-item">
                    <span className="t-lbl">Session Handshake</span>
                    <span className="t-val sage-text">TLS 1.3 Verified ({authSuccessData.loginTime})</span>
                  </div>
                  <div className="token-detail-item">
                    <span className="t-lbl">Workstation RFID</span>
                    <span className="t-val">Bound to Workstation</span>
                  </div>
                </div>

                {/* Animated Entering CampusSphere Status Bar */}
                <div className="auth-launch-progress-wrap">
                  <div className="launch-text-row">
                    <span className="launch-msg">Entering CampusSphere Cockpit...</span>
                    <span className="launch-pct">Ready</span>
                  </div>
                  <div className="launch-bar-track">
                    <div className="launch-bar-fill" />
                  </div>
                </div>

                <button
                  className="cs-btn-primary full-width large-btn"
                  onClick={handleEnterCockpit}
                >
                  <span>Launch Executive Cockpit</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : visitorPassData ? (
              /* -------------------------------------------------------------
                  STATE B: Successful Visitor Wayfinding Pass Issued
                  ------------------------------------------------------------- */
              <div className="visitor-pass-card">
                <div className="pass-chip-header">
                  <QrCode size={18} className="terracotta-text" />
                  <span className="pass-id-text">VISITOR PASS #{visitorPassData.passId}</span>
                  <span className="cs-badge sage">Active Access</span>
                </div>

                <div className="visitor-body">
                  <div className="v-row">
                    <div>
                      <span className="v-lbl">Guest Name</span>
                      <strong className="v-val">{visitorPassData.name}</strong>
                    </div>
                    <div className="v-right">
                      <span className="v-lbl">Valid Window</span>
                      <span className="v-val font-mono">{visitorPassData.validUntil}</span>
                    </div>
                  </div>

                  <div className="v-purpose-box">
                    <span className="v-lbl">Purpose of Visit:</span>
                    <span className="v-purpose-val">{visitorPassData.purpose}</span>
                  </div>

                  <div className="v-zones-list">
                    <span className="v-lbl">Approved Navigation Zones:</span>
                    <div className="zone-chips">
                      {visitorPassData.accessZones.map((z, idx) => (
                        <span key={idx} className="zone-chip">{z}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="cs-btn-primary full-width"
                  onClick={onLaunchGuestMode || handleEnterCockpit}
                >
                  <Compass size={15} />
                  <span>Launch Hyperlocal Visitor Wayfinder ➔</span>
                </button>
              </div>
            ) : authMode === 'student' ? (
              /* -------------------------------------------------------------
                  STATE C: Student / Faculty Login Form
                  ------------------------------------------------------------- */
              <form onSubmit={handleStudentSubmit} className="cs-login-form">
                {/* Input 1: University Email or Roll ID */}
                <div className="cs-form-field">
                  <label>University Email or Roll ID *</label>
                  <div className="cs-input-icon-group">
                    <Mail size={16} className="input-icon" />
                    <input
                      type="text"
                      value={emailOrRoll}
                      onChange={(e) => setEmailOrRoll(e.target.value)}
                      placeholder="e.g. ashmit.cse@campus.edu or CS-2024-042"
                      required
                    />
                  </div>
                </div>

                {/* Input 2: Password / Passcode */}
                <div className="cs-form-field">
                  <div className="field-label-between">
                    <label>Password / Passcode *</label>
                    <a href="#forgot" className="forgot-pass-link" onClick={(e) => e.preventDefault()}>
                      Forgot Passcode?
                    </a>
                  </div>
                  <div className="cs-input-icon-group">
                    <Lock size={16} className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter workstation passcode..."
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="cs-checkbox-row remember-row">
                  <label className="cs-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember workstation token for 30 days</span>
                  </label>
                </div>

                {/* Primary Button */}
                <button
                  type="submit"
                  className="cs-btn-primary full-width large-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="btn-spinner" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Authenticate & Launch Cockpit</span>
                      <ArrowRight size={16} className="cs-btn-arrow" />
                    </>
                  )}
                </button>

                {/* Secondary SSO Button */}
                <button
                  type="button"
                  className="cs-btn-secondary full-width sso-btn"
                  onClick={handleStudentSubmit}
                >
                  {/* Google / SSO G Icon */}
                  <svg className="sso-logo" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with University SSO (Google Workspace)</span>
                </button>
              </form>
            ) : (
              /* -------------------------------------------------------------
                  STATE D: Visitor Form (when visitor tab is active)
                  ------------------------------------------------------------- */
              <form onSubmit={handleVisitorSubmit} className="cs-login-form">
                <div className="cs-form-field">
                  <label>Full Legal Name *</label>
                  <div className="cs-input-icon-group">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="e.g. Dr. Evelyn Reed"
                      required
                    />
                  </div>
                </div>

                <div className="cs-form-field">
                  <label>Mobile Number (For SMS Wayfinding Pass) *</label>
                  <div className="cs-input-icon-group">
                    <Phone size={16} className="input-icon" />
                    <input
                      type="tel"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="cs-form-field">
                  <label>Purpose of Campus Visit *</label>
                  <div className="cs-input-icon-group">
                    <Briefcase size={16} className="input-icon" />
                    <input
                      type="text"
                      value={visitorPurpose}
                      onChange={(e) => setVisitorPurpose(e.target.value)}
                      placeholder="e.g. Guest Lecture, Campus Tour, Lab Evaluation"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="cs-btn-primary full-width large-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="btn-spinner" />
                      <span>Generating Visitor QR Badge...</span>
                    </>
                  ) : (
                    <>
                      <QrCode size={16} />
                      <span>Issue Instant Wayfinding QR Pass</span>
                      <ArrowRight size={16} className="cs-btn-arrow" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Terminal Security Badge */}
            <div className="terminal-security-footer">
              <Shield size={13} className="sec-icon" />
              <span>CampusSphere FIDO2 & SAML 2.0 Secure Session</span>
            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: Real-Time Campus Pulse & Facility Telemetry Card
              =================================================================== */}
          <div className="cs-login-right-col">
            {/* Live Campus Radar Banner */}
            <div className="pulse-banner-card">
              <div className="radar-status-top">
                <span className="pulse-radar-dot" />
                <span className="radar-title">Campus Grid: 99.4% Operational</span>
              </div>
              <span className="radar-subtext">Telemetry streaming from 14 shuttle transponders & 240 mesh access points.</span>
            </div>

            {/* Card 1: Live Shuttle Tracker Card */}
            <div className="telemetry-box shuttle-telemetry">
              <div className="telemetry-box-header">
                <div className="box-title-wrap">
                  <div className="icon-wrap amber mini">
                    <Bus size={15} />
                  </div>
                  <div>
                    <h3 className="box-title">Live Shuttle Transit Feed</h3>
                    <span className="box-sub">ITER Boys Hostel Loop ➔ Gate 1 Bay</span>
                  </div>
                </div>
                <span className="cs-badge amber">Line 02 Active</span>
              </div>

              <div className="shuttle-countdown-banner">
                <div className="countdown-display">
                  <span className="countdown-number font-mono">{formatCountdown(shuttleSeconds)}</span>
                  <span className="countdown-tag">MINS</span>
                </div>
                <div className="countdown-info">
                  <span className="arrival-label">Next Shuttle Arrival</span>
                  <span className="arrival-venue">ITER Gate 1 Bay (Approaching)</span>
                </div>
              </div>
            </div>

            {/* Card 2: Workstation & Facility Capacity */}
            <div className="telemetry-box capacity-telemetry">
              <div className="telemetry-box-header">
                <div className="box-title-wrap">
                  <div className="icon-wrap sage mini">
                    <Monitor size={15} />
                  </div>
                  <div>
                    <h3 className="box-title">Facility & Space Capacity</h3>
                    <span className="box-sub">Live infrared door counters & bench telemetry</span>
                  </div>
                </div>
              </div>

              {/* Progress 1: Block B CSE Advanced Computing Lab (Lab 304) */}
              <div className="facility-progress-group">
                <div className="progress-info-row">
                  <span className="facility-name">Block B CSE Computing Lab (Lab 304)</span>
                  <span className="facility-free sage-text font-mono">18 / 60 Free</span>
                </div>
                <div className="cs-progress-bar-bg">
                  <div className="cs-progress-bar-fill sage" style={{ width: '70%' }} />
                </div>
                <span className="progress-subnote">Open access walk-in slots available until 17:30</span>
              </div>

              {/* Progress 2: ITER Central Library Reading Pods */}
              <div className="facility-progress-group">
                <div className="progress-info-row">
                  <span className="facility-name">ITER Central Library Reading Pods</span>
                  <span className="facility-free amber-text font-mono">42% Capacity</span>
                </div>
                <div className="cs-progress-bar-bg">
                  <div className="cs-progress-bar-fill amber" style={{ width: '42%' }} />
                </div>
                <span className="progress-subnote">Quiet Zone Lvl 3 has 28 seats available</span>
              </div>
            </div>

            {/* Card 3: Campus Wayfinding Notice */}
            <div className="telemetry-box notice-telemetry">
              <div className="wayfinding-notice-card">
                <div className="notice-icon-box">
                  <Compass size={16} />
                </div>
                <div className="notice-content">
                  <span className="notice-headline">Active Campus Wayfinding Advisory</span>
                  <p className="notice-body">
                    Elevator Service in Academic Block B active. E-Block lawn pathway clear & dry for pedestrian transit.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Jump to Cockpit button for convenience */}
            <button
              className="guest-skip-cockpit-link"
              onClick={handleEnterCockpit}
            >
              <span>Explore Cockpit in Evaluation Mode</span>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
