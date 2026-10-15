// Dijkstra Shortest Path & Campus Navigation Utilities
import { CAMPUS_WAYPOINTS, WAYPOINT_EDGES, BUILDING_WAYPOINT_MAP } from '../data/campusData';

export function calculateShortestPath(startWaypointId, endWaypointId) {
  if (startWaypointId === endWaypointId) {
    const wp = CAMPUS_WAYPOINTS.find(w => w.id === startWaypointId);
    return {
      pathWaypoints: [wp],
      totalDistance: 0,
      estimatedMinutes: 0,
      pathPoints: [wp.position]
    };
  }

  // Build adjacency list
  const adj = {};
  CAMPUS_WAYPOINTS.forEach(wp => {
    adj[wp.id] = [];
  });

  WAYPOINT_EDGES.forEach(edge => {
    adj[edge.from].push({ to: edge.to, distance: edge.distance });
    adj[edge.to].push({ to: edge.from, distance: edge.distance });
  });

  const distances = {};
  const previous = {};
  const unvisited = new Set();

  CAMPUS_WAYPOINTS.forEach(wp => {
    distances[wp.id] = Infinity;
    previous[wp.id] = null;
    unvisited.add(wp.id);
  });

  distances[startWaypointId] = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let currentId = null;
    let minDistance = Infinity;

    unvisited.forEach(nodeId => {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        currentId = nodeId;
      }
    });

    if (currentId === null || distances[currentId] === Infinity) {
      break;
    }

    if (currentId === endWaypointId) {
      break;
    }

    unvisited.delete(currentId);

    const neighbors = adj[currentId] || [];
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.to)) continue;

      const alt = distances[currentId] + neighbor.distance;
      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = currentId;
      }
    }
  }

  // Reconstruct path
  const pathWaypoints = [];
  let curr = endWaypointId;

  if (previous[curr] !== null || curr === startWaypointId) {
    while (curr !== null) {
      const wp = CAMPUS_WAYPOINTS.find(w => w.id === curr);
      if (wp) pathWaypoints.unshift(wp);
      curr = previous[curr];
    }
  }

  const totalDistance = distances[endWaypointId] !== Infinity ? distances[endWaypointId] : 0;
  // Avg walking speed ~ 1.3 m/s = ~78 m/min
  const estimatedMinutes = Math.max(1, Math.round(totalDistance / 75));

  const pathPoints = pathWaypoints.map(wp => wp.position);

  return {
    pathWaypoints,
    totalDistance,
    estimatedMinutes,
    pathPoints
  };
}

export function getBuildingWaypoint(buildingId) {
  return BUILDING_WAYPOINT_MAP[buildingId] || 'wp-center';
}
