# CampusSphere // Unified Student Utilities & Hyperlocal Campus Navigation

> **Smart Digital Campus Twin & Student Command Center**  
> Custom-tailored for **ITER Campus, Siksha 'O' Anusandhan (SOA) University, Bhubaneswar, Odisha**.

Built with a strict **Dusky Warm Creamy Alabaster** aesthetic (`#F7F5F0` base, `#FFFFFF` linen cards with `#E5DFD5` borders, `#C26D53` warm terracotta primary, `#6F8F72` sage green, `#D4A373` warm amber). Strictly no pitch black and no dark mode.

---

## 🌟 Key Features

### 1. 🧭 Hyperlocal Wayfinder & Interactive GIS Real Map
- Real Leaflet GIS satellite and cartographic map centered at authentic **ITER SOA University Bhubaneswar coordinates (`20.2482° N, 85.8010° E`)**.
- **Accurate Campus Landmarks**:
  - ITER Gate 1 (Jagamara-Khandagiri Road Entrance)
  - Block B (Computer Science & Engineering, Advanced Lab 304)
  - Central Academic Library & Digital Center
  - Bansuri Guru Convention Auditorium & Admin Complex
  - E-Block & Cultural Quad Lawn
  - Gate 1 Transit Shuttle Bay
- **Live Moving Campus Transit Ring**: Line 02 Khandagiri Loop shuttle moving dynamically in real time.
- **Active Pedestrian Corridor (240m)**: Real path connecting Gate 1 through the Quad to Block B.
- **Watermark-Free Basemap Layers**: ESRI Light Gray Canvas (Creamy Map), High-Res Satellite Imagery, and Clean Blueprint Cartography.

### 2. 🚨 Real-Time Facility Advisories & Incident Notices on the Map
- **Block B Ground RO Dispenser**: Amber pulsing alert pin marking filter servicing, cartridge flush schedule, and auto-reroute to Block C 2nd Floor Hydration Hub.
- **Central Library Print Station**: Terracotta pulsing surge badge marking 6 queued jobs with automated rerouting to CS Annex.
- **IoT Lab 304 (Open Access)**: Soft sage green beacon marking 18 free walk-in benches with calibrated logic analyzers and oscilloscope hardware rigs.
- **Floating Quick Advisory Bar**: Top-left map overlay to fly directly to any alert node and view interactive resolution cards.

### 3. 📚 Smart Library Seat & Study-Pod Availability System (Utility Hub)
- **Central Library Heatmap**: 24 interactive desk tiles across 4 study zones (Zone A General Reading, Zone B Window Desks, Pods C, Quiet Room D).
- **Floor Switcher**: Ground Floor (General Reading), 1st Floor (Silent Reference & Thesis Wing), 2nd Floor (Digital E-Library & Coding Pods).
- **30-Minute Anti-Hoarding Hold**: Reserve desks with an automated 30-minute turnstile check-in boarding pass and live ticking countdown timer.
- **Automated Cloud Print Dispatcher**: Generates secure 4-digit PIN tokens (e.g. `7842`) for zero-wait campus printing.
- **Shuttle & Smart RO Water Station Telemetry**: Real-time TDS (112 ppm), filter life (84%), and countdown to next departure.

### 4. ⊞ Executive Cockpit Overview & 2.5D Architectural Blueprint
- 3-column cockpit with campus load radial gauge (68% load), pulse metrics (14 active shuttles, 8 open labs, 99.2% mesh health).
- Interactive 2.5D SVG isometric blueprint banner with pulsing advisory callouts.
- AI crowd surge predictor and live building headcount (1,420 turnstile check-ins).

### 5. 🔐 Dual-Mode Authentication Terminal
- Split authentication terminal supporting Student/Faculty institutional credentials and Visitor QR Access passes.
- Hackathon demo quick-fill chips for instant evaluator access (`Student: CS-2024-042`, `Admin: Facility Desk`).
- Live telemetry companion card displaying campus pulse metrics.

---

## 🏗️ System Architecture & Telemetry Pipeline

```mermaid
flowchart TD
    subgraph Campus_Telemetry["1. Hyperlocal Campus IoT & Telemetry Layer"]
        S1["Overhead Infrared Seat Grids<br/>(Central Library Floors 1-3)"]
        S2["GPS Shuttle Kalman Telemetry<br/>(Transit Line 02 Khandagiri Ring)"]
        S3["Smart RO TDS & Flow Sensors<br/>(Block B/C Hydration Hubs)"]
        S4["Cloud Print Dispatch Buffer<br/>(Xerox Spool Queues)"]
        S5["Turnstile RFID & QR Readers<br/>(Main Entrance & Turnstiles)"]
    end

    subgraph Twin_Engine["2. Real-Time Campus Twin Processing Core"]
        E1["Dijkstra & A* Adaptive Wayfinder Engine"]
        E2["30-Min Anti-Hoarding Reservation Daemon"]
        E3["Dynamic Print Load Balancer & Token Hash"]
        E4["Facility Advisory & Incident Dispatcher"]
    end

    subgraph Presentation_Cockpit["3. CampusSphere Cockpit Presentation Layer"]
        UI1["⊞ Overview Cockpit & 2.5D Blueprint"]
        UI2["🧭 Interactive GIS Leaflet Real Map"]
        UI3["📚 Smart Library Pod Matrix & Booking"]
        UI4["📊 Real-Time Resource Analytics"]
        UI5["🔐 Institutional Dual Authentication"]
    end

    S1 --> E2
    S2 --> E1
    S3 --> E4
    S4 --> E3
    S5 --> E2

    E1 --> UI2
    E2 --> UI3
    E3 --> UI3
    E4 --> UI1
    E4 --> UI2
    Twin_Engine --> UI4
```

---

## 🔄 Smart Library 30-Minute Hold & Verification Flow

```mermaid
sequenceDiagram
    autonumber
    actor Student as Student App
    participant Hub as Smart Library Hub
    participant Daemon as Anti-Hoarding Daemon
    participant Turnstile as Physical Library Turnstile

    Student->>Hub: Click "Available Desk" (e.g., Desk B-04)
    Hub->>Daemon: Request 30-Minute Temporary Hold
    Daemon-->>Hub: Lock Seat ID • Issue Signed QR Token
    Hub-->>Student: Display Digital Library Pass & 30:00 Timer

    alt Student Scans Turnstile Within 30 Minutes
        Student->>Turnstile: Scan QR Code / Tap RFID at Entrance
        Turnstile->>Daemon: Verify Signed Token & Seat ID
        Daemon->>Hub: Confirm Check-In (Status: OCCUPIED)
        Hub-->>Student: Boarding Pass Confirmed • Session Active
    else 30-Minute Timer Expires (No Check-In)
        Daemon->>Daemon: TTL Elapsed • Trigger Auto-Release
        Daemon->>Hub: Reset Seat State to AVAILABLE
        Hub-->>Student: Alert: Hold Expired • Seat Released to Public
    end
```

---

## 🗺️ Incident-Aware Hyperlocal Navigation Pipeline

```mermaid
flowchart LR
    A["ITER Gate 1<br/>(Start Node)"] --> B["A* Graph Search<br/>Walkway Network"]
    B --> C{"Check Facility<br/>Advisories"}
    C -->|"Filter Servicing<br/>at Block B RO"| D["Reroute Via Block C<br/>Hydration Corridor"]
    C -->|"No Obstacles"| E["Central Quad Paved<br/>Direct Walkway"]
    D --> F["Block B (CSE)<br/>Lab 304 Target"]
    E --> F
```

---

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite 8
- **Styling**: Vanilla CSS with strict HSL tokens & Dusky Creamy Alabaster palette
- **Mapping & GIS**: Leaflet, Carto/ESRI GIS tile providers
- **Diagrams**: Mermaid.js workflow & architecture diagrams
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans, JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone repository
git clone https://github.com/Hritik983567-Art/Campus_Sphere.git
cd Campus_Sphere

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 👥 Hackathon Team
- **Project**: CampusSphere // Unified Student Utilities & Hyperlocal Campus Navigation
- **Campus**: ITER, Siksha 'O' Anusandhan (SOA) Deemed to be University, Bhubaneswar, Odisha


