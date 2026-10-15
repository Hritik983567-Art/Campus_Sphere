import React, { useState, useMemo } from 'react';
import {
  Cpu,
  GitBranch,
  Network,
  Sliders,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ArrowRight,
  Printer,
  Bus,
  Footprints,
  Activity,
  Layers,
  ShieldCheck,
  Terminal
} from 'lucide-react';

export default function LogicPage() {
  // --- 1. PATHFINDING LOGIC SANDBOX STATE ---
  const [startNode, setStartNode] = useState('N0_GATE');
  const [endNode, setEndNode] = useState('N5_TURING');
  const [routingMode, setRoutingMode] = useState('STANDARD'); // 'STANDARD' | 'ACCESSIBLE' | 'LOW_CROWD'

  // Graph Definition
  const GRAPH_NODES = {
    N0_GATE: { name: 'Main Academic Gate', type: 'Entrance', coords: [100, 240] },
    N1_NORTH_QUAD: { name: 'North Quad Promenade', type: 'Walkway', coords: [240, 200] },
    N2_AGORA: { name: 'Central Fountain Agora', type: 'Plaza', coords: [430, 240] },
    N3_LIBRARY: { name: 'Central Academic Library', type: 'Facility', coords: [430, 110] },
    N4_CS_ANNEX: { name: 'CS & Tech Annex (Lab 304)', type: 'Lab', coords: [430, 360] },
    N5_TURING: { name: 'Turing Seminar Hall', type: 'Lecture Block', coords: [640, 240] },
    N6_BAY3: { name: 'Transit Park Bay 3', type: 'Shuttle Stop', coords: [720, 380] }
  };

  const GRAPH_EDGES = [
    { from: 'N0_GATE', to: 'N1_NORTH_QUAD', dist: 90, stairs: false, congestion: 0.1 },
    { from: 'N1_NORTH_QUAD', to: 'N2_AGORA', dist: 80, stairs: false, congestion: 0.3 },
    { from: 'N1_NORTH_QUAD', to: 'N3_LIBRARY', dist: 110, stairs: true, congestion: 0.4 }, // has stairs
    { from: 'N2_AGORA', to: 'N3_LIBRARY', dist: 75, stairs: false, congestion: 0.5 },
    { from: 'N2_AGORA', to: 'N4_CS_ANNEX', dist: 70, stairs: false, congestion: 0.2 },
    { from: 'N2_AGORA', to: 'N5_TURING', dist: 95, stairs: false, congestion: 0.2 },
    { from: 'N3_LIBRARY', to: 'N5_TURING', dist: 130, stairs: true, congestion: 0.6 }, // has stairs
    { from: 'N4_CS_ANNEX', to: 'N5_TURING', dist: 105, stairs: false, congestion: 0.15 },
    { from: 'N4_CS_ANNEX', to: 'N6_BAY3', dist: 85, stairs: false, congestion: 0.1 },
    { from: 'N5_TURING', to: 'N6_BAY3', dist: 120, stairs: false, congestion: 0.2 }
  ];

  // Dijkstra / A* Solver computation
  const solverResult = useMemo(() => {
    // Adjacency
    const adj = {};
    Object.keys(GRAPH_NODES).forEach((k) => (adj[k] = []));
    GRAPH_EDGES.forEach((e) => {
      // Calculate effective edge weight based on routingMode
      let weight = e.dist;
      if (routingMode === 'ACCESSIBLE' && e.stairs) {
        weight = 999999; // Impassable for wheelchairs/step-free
      } else if (routingMode === 'LOW_CROWD') {
        weight = e.dist * (1 + e.congestion * 2.5);
      }
      adj[e.from].push({ to: e.to, cost: weight, rawDist: e.dist, hasStairs: e.stairs });
      adj[e.to].push({ to: e.from, cost: weight, rawDist: e.dist, hasStairs: e.stairs });
    });

    // Dijkstra
    const dists = {};
    const prev = {};
    const unvisited = new Set(Object.keys(GRAPH_NODES));
    Object.keys(GRAPH_NODES).forEach((k) => {
      dists[k] = Infinity;
      prev[k] = null;
    });
    dists[startNode] = 0;

    const evaluationSteps = [];

    while (unvisited.size > 0) {
      let curr = null;
      let minD = Infinity;
      unvisited.forEach((node) => {
        if (dists[node] < minD) {
          minD = dists[node];
          curr = node;
        }
      });

      if (!curr || dists[curr] === Infinity) break;
      if (curr === endNode) break;

      unvisited.delete(curr);

      adj[curr].forEach((edge) => {
        if (!unvisited.has(edge.to)) return;
        const alt = dists[curr] + edge.cost;
        evaluationSteps.push({
          fromNode: curr,
          toNode: edge.to,
          candidateCost: Math.round(alt),
          currentBest: dists[edge.to] === Infinity ? '∞' : Math.round(dists[edge.to]),
          improved: alt < dists[edge.to]
        });
        if (alt < dists[edge.to]) {
          dists[edge.to] = alt;
          prev[edge.to] = curr;
        }
      });
    }

    // Reconstruct
    const path = [];
    let p = endNode;
    while (p) {
      path.unshift(p);
      p = prev[p];
    }

    const totalRawDistance = dists[endNode] < 999999 ? Math.round(dists[endNode]) : 0;
    const estimatedMinutes = (totalRawDistance / 75).toFixed(1);

    return {
      path,
      totalDistance: totalRawDistance,
      estimatedMinutes,
      stepsCount: evaluationSteps.length,
      sampleSteps: evaluationSteps.slice(0, 6)
    };
  }, [startNode, endNode, routingMode]);

  // --- 2. PRINT DISPATCHER RULE ENGINE SIMULATOR ---
  const [simQueueJobs, setSimQueueJobs] = useState(6);
  const [simDocPages, setSimDocPages] = useState(14);
  const [csAnnexOnline, setCsAnnexOnline] = useState(true);

  const printDispatchDecision = useMemo(() => {
    // Logic Rules:
    // Rule 1: IF Library Queue > 3 jobs AND docPages > 10 AND CS Annex is online -> Reroute CS Annex
    // Rule 2: IF Library Queue > 8 jobs -> Reroute to CS Annex regardless of page count
    // Rule 3: Otherwise Route to Library
    if (!csAnnexOnline) {
      return {
        target: 'Academic Library Xerox (Local)',
        status: 'Forced Local Due to CS Annex Offline',
        ruleApplied: 'Rule 0: Fallback to Local',
        waitTime: `${simQueueJobs * 2} mins`,
        recommendation: 'Stand in line at Central Library'
      };
    }

    if (simQueueJobs > 3 && simDocPages > 10) {
      return {
        target: 'CS & Tech Annex • Bay 1',
        status: 'Auto-Rerouted (High Volume Load Balance)',
        ruleApplied: 'Rule 1: IF (Queue > 3 && Pages > 10) ➔ REROUTE(CS_ANNEX)',
        waitTime: 'Instant (< 45 sec)',
        recommendation: `Bypassed ${simQueueJobs} jobs waiting in Library spooler.`
      };
    } else if (simQueueJobs > 7) {
      return {
        target: 'CS & Tech Annex • Bay 1',
        status: 'Auto-Rerouted (Critical Spooler Surge)',
        ruleApplied: 'Rule 2: IF (Queue > 7) ➔ HARD_FAILOVER(CS_ANNEX)',
        waitTime: 'Instant (< 45 sec)',
        recommendation: 'Saved over 14 minutes in queue delay.'
      };
    } else {
      return {
        target: 'Academic Library Xerox (Local)',
        status: 'Direct Local Execution',
        ruleApplied: 'Rule 3: Queue within optimal threshold (≤ 3 jobs)',
        waitTime: `${simQueueJobs * 1.5} mins`,
        recommendation: 'Print locally at Library Ground Floor kiosk.'
      };
    }
  }, [simQueueJobs, simDocPages, csAnnexOnline]);

  return (
    <div className="cs-logic-page-root">
      {/* Page Title & Subtitle Banner */}
      <div className="cs-logic-hero-banner">
        <div className="logic-badge-row">
          <div className="cs-pill-icon terracotta">
            <Cpu size={20} />
          </div>
          <div>
            <h1 className="cs-logic-title">CampusSphere // System Logic & Algorithmic Engines</h1>
            <p className="cs-logic-subtitle">
              Mathematical formulations, graph pathfinding state-machines, automated print load-balancers, and real-time edge telemetry pipelines.
            </p>
          </div>
        </div>

        <div className="logic-status-pills">
          <span className="cs-badge sage">
            <CheckCircle2 size={12} /> A* & Dijkstra 100% Deterministic
          </span>
          <span className="cs-badge terracotta">
            <Zap size={12} /> Real-Time Decision Loop: 40ms
          </span>
        </div>
      </div>

      {/* Grid of Logic Engines */}
      <div className="cs-logic-grid">
        {/* =====================================================================
            ENGINE 1: Hyperlocal Campus Pathfinding & Waypoint Solver (A* / Dijkstra)
            ===================================================================== */}
        <section className="cs-logic-card full-span">
          <div className="logic-card-header">
            <div className="flex-align-center gap-8">
              <div className="cs-pill-icon terracotta">
                <Network size={16} />
              </div>
              <div>
                <h2 className="logic-section-title">1. Hyperlocal Wayfinding & Spatial Graph Algorithm (Dijkstra / A*)</h2>
                <span className="logic-section-subtitle">
                  Autonomous pedestrian edge weighting based on geometric distance, stair barriers, and real-time crowd congestion.
                </span>
              </div>
            </div>
            <span className="cs-badge terracotta">Graph Solver Active</span>
          </div>

          {/* Mathematical Formulation Callout */}
          <div className="cs-math-formulation-box">
            <div className="math-header">
              <Terminal size={14} />
              <span>Edge Cost Function Formulation</span>
            </div>
            <code className="math-equation">
              Cost(u, v) = Distance(u, v) × [ 1 + α × CongestionLevel(u, v) ] + β × StairsPenalty(u, v)
            </code>
            <div className="math-legend-row">
              <span>Where: <strong>α = 2.5</strong> (Crowd Congestion Penalty)</span>
              <span><strong>β = ∞</strong> when Accessible Mode is active (Zero Steps Allowed)</span>
              <span><strong>Adjacency Nodes:</strong> 7 Campus Gateways</span>
            </div>
          </div>

          {/* Interactive Routing Playground */}
          <div className="cs-solver-playground-grid">
            {/* Inputs Column */}
            <div className="solver-inputs-box">
              <h3 className="input-group-title">Configure Route Constraints</h3>

              <div className="cs-form-field">
                <label>Origin Node (u)</label>
                <select value={startNode} onChange={(e) => setStartNode(e.target.value)}>
                  {Object.entries(GRAPH_NODES).map(([k, n]) => (
                    <option key={k} value={k}>
                      {n.name} ({n.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="cs-form-field">
                <label>Target Destination (v)</label>
                <select value={endNode} onChange={(e) => setEndNode(e.target.value)}>
                  {Object.entries(GRAPH_NODES).map(([k, n]) => (
                    <option key={k} value={k}>
                      {n.name} ({n.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="cs-form-field">
                <label>Accessibility & Penalty Constraints</label>
                <div className="cs-toggle-buttons-row">
                  <button
                    className={`toggle-chip ${routingMode === 'STANDARD' ? 'active' : ''}`}
                    onClick={() => setRoutingMode('STANDARD')}
                  >
                    Shortest Path
                  </button>
                  <button
                    className={`toggle-chip ${routingMode === 'ACCESSIBLE' ? 'active' : ''}`}
                    onClick={() => setRoutingMode('ACCESSIBLE')}
                  >
                    Step-Free / Accessible (β=∞)
                  </button>
                  <button
                    className={`toggle-chip ${routingMode === 'LOW_CROWD' ? 'active' : ''}`}
                    onClick={() => setRoutingMode('LOW_CROWD')}
                  >
                    Quiet Corridor (α=2.5)
                  </button>
                </div>
              </div>
            </div>

            {/* Computed Output Column */}
            <div className="solver-results-box">
              <h3 className="input-group-title">Solver Output & Graph Traversal</h3>

              <div className="solver-metrics-strip">
                <div className="s-metric">
                  <span className="s-lbl">Optimal Distance</span>
                  <span className="s-val terracotta-text">{solverResult.totalDistance}m</span>
                </div>
                <div className="s-metric">
                  <span className="s-lbl">Transit Duration</span>
                  <span className="s-val">{solverResult.estimatedMinutes} Mins</span>
                </div>
                <div className="s-metric">
                  <span className="s-lbl">Waypoints Traversed</span>
                  <span className="s-val">{solverResult.path.length} Nodes</span>
                </div>
                <div className="s-metric">
                  <span className="s-lbl">Evaluations</span>
                  <span className="s-val">{solverResult.stepsCount} Iterations</span>
                </div>
              </div>

              {/* Waypoint Traversal Visual Pipeline */}
              <div className="solver-path-sequence">
                <span className="seq-lbl">Calculated Path Sequence:</span>
                <div className="seq-nodes-row">
                  {solverResult.path.map((nodeKey, idx) => (
                    <React.Fragment key={nodeKey}>
                      <span className="node-chip">
                        {GRAPH_NODES[nodeKey]?.name || nodeKey}
                      </span>
                      {idx < solverResult.path.length - 1 && (
                        <ArrowRight size={14} className="node-seq-arrow" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Evaluation Step Trace */}
              <div className="solver-step-trace">
                <span className="seq-lbl">Edge Relaxations Trace:</span>
                <div className="trace-list">
                  {solverResult.sampleSteps.map((step, i) => (
                    <div key={i} className="trace-item">
                      <span>Relaxing edge <strong>{step.fromNode} ➔ {step.toNode}</strong></span>
                      <span className={step.improved ? 'sage-text' : 'muted-text'}>
                        Candidate: {step.candidateCost} | Best: {step.currentBest} {step.improved ? '✓ Updated' : '✕ Skipped'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ENGINE 2: Automated Print Dispatcher & Load-Balancing Logic
            ===================================================================== */}
        <section className="cs-logic-card">
          <div className="logic-card-header">
            <div className="flex-align-center gap-8">
              <div className="cs-pill-icon amber">
                <Printer size={16} />
              </div>
              <div>
                <h2 className="logic-section-title">2. Print Dispatcher Load-Balancing Rule Engine</h2>
                <span className="logic-section-subtitle">
                  Autonomous queue thresholding & heuristic job routing to prevent student printer bottlenecks.
                </span>
              </div>
            </div>
            <span className="cs-badge amber">Queue Balancer</span>
          </div>

          {/* Interactive Simulator Sliders */}
          <div className="cs-slider-control-box">
            <div className="slider-row">
              <div className="slider-label-group">
                <span>Academic Library Spooler Queue Length:</span>
                <strong className="terracotta-text">{simQueueJobs} Jobs Waiting</strong>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={simQueueJobs}
                onChange={(e) => setSimQueueJobs(parseInt(e.target.value))}
              />
            </div>

            <div className="slider-row">
              <div className="slider-label-group">
                <span>Incoming Document Payload:</span>
                <strong>{simDocPages} Pages</strong>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                value={simDocPages}
                onChange={(e) => setSimDocPages(parseInt(e.target.value))}
              />
            </div>

            <div className="slider-toggle-row">
              <label className="cs-checkbox-label">
                <input
                  type="checkbox"
                  checked={csAnnexOnline}
                  onChange={(e) => setCsAnnexOnline(e.target.checked)}
                />
                <span>CS & Tech Annex Laser Grid Status (Online / Available)</span>
              </label>
            </div>
          </div>

          {/* Evaluated Rule Decision Result */}
          <div className="cs-logic-decision-box">
            <div className="decision-top">
              <span className="dec-lbl">Real-Time Routing Decision:</span>
              <span className="dec-badge sage">{printDispatchDecision.status}</span>
            </div>
            <h3 className="dec-target">{printDispatchDecision.target}</h3>
            <p className="dec-rule"><strong>Rule Fired:</strong> {printDispatchDecision.ruleApplied}</p>
            <div className="dec-details-row">
              <span><strong>Calculated Queue Wait:</strong> {printDispatchDecision.waitTime}</span>
              <span><strong>Recommendation:</strong> {printDispatchDecision.recommendation}</span>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ENGINE 3: Shuttle Transit Telemetry & Kalman Filter ETA Logic
            ===================================================================== */}
        <section className="cs-logic-card">
          <div className="logic-card-header">
            <div className="flex-align-center gap-8">
              <div className="cs-pill-icon blue">
                <Bus size={16} />
              </div>
              <div>
                <h2 className="logic-section-title">3. Shuttle Transit ETA & Dead-Reckoning Pipeline</h2>
                <span className="logic-section-subtitle">
                  Predictive Kalman Filter fusing GPS pings, road speed limits, and historical dwell times.
                </span>
              </div>
            </div>
            <span className="cs-badge slate">GPS Telemetry</span>
          </div>

          <div className="cs-math-formulation-box">
            <code className="math-equation">
              ETA = [ Distance_Remaining / Velocity_Moving ] + Σ ( Dwell_Time_k ) + ε_Traffic
            </code>
          </div>

          {/* Live Telemetry Ping Matrix */}
          <div className="cs-telemetry-ping-grid">
            <div className="telemetry-block">
              <span className="t-label">Active Vehicle</span>
              <span className="t-val">Shuttle Unit 02</span>
            </div>
            <div className="telemetry-block">
              <span className="t-label">Current Coordinates</span>
              <span className="t-val font-mono">37.4312° N, 122.1670° W</span>
            </div>
            <div className="telemetry-block">
              <span className="t-label">Moving Velocity</span>
              <span className="t-val sage-text">18.4 km/h (Normal Quad Speed)</span>
            </div>
            <div className="telemetry-block">
              <span className="t-label">Bay 3 Distance</span>
              <span className="t-val">380 meters remaining</span>
            </div>
            <div className="telemetry-block">
              <span className="t-label">Kalman Variance (σ²)</span>
              <span className="t-val">0.042 (High Confidence)</span>
            </div>
            <div className="telemetry-block">
              <span className="t-label">Arrival Window</span>
              <span className="t-val terracotta-text font-bold">04:15 MIN (Real-Time ETA)</span>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ENGINE 4: Full System Architecture & Data Pipeline Topology
            ===================================================================== */}
        <section className="cs-logic-card full-span">
          <div className="logic-card-header">
            <div className="flex-align-center gap-8">
              <div className="cs-pill-icon slate">
                <Layers size={16} />
              </div>
              <div>
                <h2 className="logic-section-title">4. End-to-End Campus Data Architecture & Edge Mesh</h2>
                <span className="logic-section-subtitle">
                  From physical edge sensors to the executive dashboard cockpit and mobile student passes.
                </span>
              </div>
            </div>
            <span className="cs-badge sage">ISO/IEC 27001 Ready</span>
          </div>

          <div className="cs-architecture-flow-diagram">
            <div className="arch-flow-step">
              <div className="step-number">01</div>
              <h4 className="step-title">Edge IoT Sensors</h4>
              <p className="step-desc">
                Infrared gate turnstiles, RO backwash pressure transducers, and Xerox SNMP spooler listeners.
              </p>
            </div>

            <div className="arch-flow-arrow">➔</div>

            <div className="arch-flow-step">
              <div className="step-number">02</div>
              <h4 className="step-title">MQTT & Telemetry Hub</h4>
              <p className="step-desc">
                Ultra-low latency message broker buffering 2,400 sensor frames/min across the Wi-Fi 6E mesh.
              </p>
            </div>

            <div className="arch-flow-arrow">➔</div>

            <div className="arch-flow-step highlight">
              <div className="step-number">03</div>
              <h4 className="step-title">CampusSphere Logic Core</h4>
              <p className="step-desc">
                Dijkstra / A* pathfinder, load-balancing rule engine, Kalman transit estimator, and AI forecaster.
              </p>
            </div>

            <div className="arch-flow-arrow">➔</div>

            <div className="arch-flow-step">
              <div className="step-number">04</div>
              <h4 className="step-title">Student Cockpit & Passes</h4>
              <p className="step-desc">
                Real GIS cartographic view, offline QR token issuance, turn-by-turn routing, and live alerts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
