# Product Requirements Document (PRD)
## CampusSphere // Unified Student Utilities & Hyperlocal Campus Navigation

**Document Version:** 1.0.0  
**Target Institution:** ITER, Siksha 'O' Anusandhan (SOA) Deemed to be University, Bhubaneswar, Odisha  
**Project Lead & Author:** Hackathon Core Team (Hritik Raj)  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Vision

University campuses spanning dozens of acres frequently suffer from operational fragmentation. At ITER Bhubaneswar (home to over 12,000 engineering students), students experience acute bottlenecks:
1. **Exam-Time Library Overcrowding & Seat Hoarding:** Students place notebooks on desks to reserve study spaces for hours without being present.
2. **Printer Queue Surges:** High-volume queues at central copy centers cause students to miss lecture assignment deadlines.
3. **Hyperlocal Navigation Blind Spots:** First- and second-year students navigate between distant blocks (Gate 1, Bansuri Guru Auditorium, Block B CSE Wing, E-Block Lawn) without real-time corridor advisory telemetry.
4. **Transit & Utility Invisibility:** Students wait unpredictably for campus shuttles and encounter offline RO hydration stations.

**CampusSphere** solves these challenges as a unified **Digital Campus Twin and Hyperlocal Operations Cockpit**, combining real GIS navigation, an anti-hoarding 30-minute library hold mechanism, automated cloud printing with 4-digit PIN release, and telemetry monitoring.

```mermaid
mindmap
  root((CampusSphere))
    Hyperlocal GIS Navigation
      Real ITER Bhubaneswar Coordinates
      Active Corridor 240m Route
      Transit Line 02 Shuttle Kalman ETA
      Watermark-free Cartography
    Smart Library Hub
      24-Desk Interactive Heatmap
      Multi-floor Wing Switcher
      30-Minute Anti-Hoarding Hold
      Turnstile QR Boarding Pass
    Automated Student Utilities
      Zero-Wait Cloud Printing
      Automated PIN Token Release
      Smart RO Station TDS Monitoring
      Walk-in Lab Availability
    Executive Cockpit
      68 Percent Grid Load Gauge
      Incident-Aware Corridors
      AI Crowd Surge Forecast
      Dual Access Auth Terminal
```

---

## 2. Target Personas

| Persona | Role | Primary Goal | Critical Pain Point |
| :--- | :--- | :--- | :--- |
| **Ashmit Verma** | 2nd Year CSE Student | Secure quiet study pod in Central Library & submit lab printouts between classes. | Finding desks occupied only by empty bags; 15-minute printer lines. |
| **Priyanka Dash** | Day Scholar Commuter | Catch Transit Line 02 at Gate 1 Bay to reach Bansuri Guru Auditorium on time. | Missing campus shuttles due to unannounced delays; no live ETA. |
| **Prof. S. Patnaik** | Lab In-Charge (Lab 304) | Regulate walk-in capacity for IoT and embedded systems hardware kits. | Overcrowded benches during project submissions; untracked equipment. |
| **Er. R. K. Mohanty** | Facilities & Utilities Lead | Maintain hydration stations and copy center toners proactively. | Unreported filter failures causing student frustration at Block B. |

---

## 3. MoSCoW Feature Prioritization

```mermaid
flowchart TD
    subgraph Must_Have["Must Have (P0 - MVP)"]
        M1["Real Leaflet GIS Map of ITER (20.2482° N, 85.8010° E)"]
        M2["Smart Library Live Desk Matrix (24 Tiles across 4 Zones)"]
        M3["30-Minute Anti-Hoarding Boarding Pass with Live Countdown"]
        M4["Cloud Print Dispatcher with 4-Digit PIN Token Generator"]
        M5["Live Facility Advisories Plotted on Leaflet & 2.5D Blueprint"]
    end

    subgraph Should_Have["Should Have (P1)"]
        S1["Kalman Filter Smoothing for Moving Transit Shuttle 02"]
        S2["Smart RO Water TDS & Filter Life Telemetry Gauges"]
        S3["Institutional Student/Faculty vs Visitor QR Authentication"]
        S4["Executive Load Radial Ring Gauge & Campus Density Breakdowns"]
    end

    subgraph Could_Have["Could Have (P2)"]
        C1["AI Crowd Surge 2-Hour Predictive Forecaster"]
        C2["Dijkstra Walkway Corridor Obstacle Avoidance"]
        C3["Quick Search Command Palette (Ctrl + K)"]
    end

    subgraph Wont_Have["Won't Have (v1 Scope Boundary)"]
        W1["Native Mobile Swift/Kotlin Builds (PWA & Web First)"]
        W2["Direct In-App UPI Payment Processing for Print Jobs"]
    end

    Must_Have --> Should_Have --> Could_Have
```

---

## 4. User Journey: Library Hold to Turnstile Check-In

```mermaid
sequenceDiagram
    autonumber
    actor User as Student (Ashmit)
    participant UI as CampusSphere Cockpit
    participant LibraryHub as Library Pod Subsystem
    participant Timer as 30-Min Hold Engine
    participant Gate as Physical Library Turnstile

    User->>UI: Selects "Utility Hub" -> Chooses "Floor 1 (Silent Reference)"
    UI->>LibraryHub: Query real-time desk status
    LibraryHub-->>UI: Return Zone Grid (Desk B-04 is Available)
    User->>UI: Clicks "Desk B-04" -> Reviews amenities
    User->>UI: Clicks "Hold Desk for 30 Mins"
    UI->>Timer: Reserve Desk B-04 for Roll CS-2024-042 (TTL: 1800s)
    Timer-->>UI: Issue Signed QR Verification Pass + Token #7842
    UI-->>User: Display Modal with Active Ticking Countdown Clock

    alt Physical Check-In within 30 Minutes
        User->>Gate: Arrives at Library Turnstile & scans QR Pass
        Gate->>Timer: Verify token validity
        Timer->>LibraryHub: Transition B-04 from HOLD to OCCUPIED
        Timer-->>User: Push confirmation: "Session Activated (4h Block)"
    else 30-Minute Timer Expiry
        Timer->>Timer: TTL Reaches 00:00
        Timer->>LibraryHub: Release B-04 to AVAILABLE public pool
        Timer-->>User: Push notification: "Hold Expired. Seat released."
    end
```

---

## 5. Success Metrics & Key Performance Indicators (KPIs)

1. **Desk Utilization & Turnover Efficiency:**
   - Eliminate ghost hoarding by **>85%** within 2 weeks of campus rollout.
   - Boost daily seat turnover from 2.1 to **4.3 students per desk**.
2. **Print Dispatch Velocity:**
   - Reduce peak-hour wait times at Academic Library Xerox from 8.5 minutes to **<90 seconds** using automatic load-balanced rerouting to CS Annex.
3. **Transit Punctuality & Predictability:**
   - Provide sub-30-second arrival accuracy for Transit Line 02 at Gate 1 and Bansuri Guru bays.
4. **User Engagement & Reliability:**
   - Zero-crash frontend performance (<0.1% error rate).
   - <1.2 second time-to-interactive on campus Wi-Fi.
