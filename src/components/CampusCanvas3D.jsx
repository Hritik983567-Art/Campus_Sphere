import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { CAMPUS_WAYPOINTS, WAYPOINT_EDGES } from '../data/campusData';

export default function CampusCanvas3D({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  navigationPath,
  heatmapMode = 'visual', // 'visual' | 'occupancy' | 'energy'
  timeOfDay = 'night', // 'day' | 'sunset' | 'night'
  cameraPreset = 'iso'
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animFrameRef = useRef(null);
  const buildingMeshesRef = useRef(new Map());
  const hoveredBuildingRef = useRef(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [hoverScreenPos, setHoverScreenPos] = useState({ x: 0, y: 0 });

  // Camera target animation state
  const cameraTarget = useRef({
    position: new THREE.Vector3(38, 32, 42),
    lookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0)
  });

  // Mouse interaction state for manual orbit controls
  const isDraggingRef = useRef(false);
  const isPanningRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({
    radius: 65,
    theta: Math.PI / 4,
    phi: Math.PI / 3.4
  });

  // Lighting refs for dynamic day/night cycles
  const lightsRef = useRef({
    ambient: null,
    sun: null,
    hemisphere: null,
    buildingPointLights: []
  });

  // Path line and pulse mesh ref
  const pathMeshRef = useRef(null);
  const pathParticlesRef = useRef(null);

  // Re-orient camera based on presets or selected building
  useEffect(() => {
    if (selectedBuilding) {
      const [bx, by, bz] = selectedBuilding.position;
      cameraTarget.current.lookAt.set(bx, 2, bz);
      // Position camera offset from building
      const offsetDist = 26;
      cameraTarget.current.position.set(
        bx + offsetDist * 0.7,
        18,
        bz + offsetDist * 0.7
      );
    } else {
      if (cameraPreset === 'overhead') {
        cameraTarget.current.lookAt.set(0, 0, 0);
        cameraTarget.current.position.set(0, 68, 0.1);
      } else if (cameraPreset === 'entrance') {
        cameraTarget.current.lookAt.set(0, 3, 0);
        cameraTarget.current.position.set(0, 12, 45);
      } else {
        // Isometric default
        cameraTarget.current.lookAt.set(0, 0, 0);
        cameraTarget.current.position.set(38, 34, 42);
      }
    }
  }, [selectedBuilding, cameraPreset]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Fog for depth
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.012);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(38, 34, 42);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    cameraTarget.current.currentLookAt.set(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0x223355, 1.2);
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;

    const hemiLight = new THREE.HemisphereLight(0x4466aa, 0x111625, 0.8);
    scene.add(hemiLight);
    lightsRef.current.hemisphere = hemiLight;

    const sunLight = new THREE.DirectionalLight(0xddeeff, 2.0);
    sunLight.position.set(40, 60, 30);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 160;
    const d = 45;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    lightsRef.current.sun = sunLight;

    // 5. Ground / Campus Terrain
    createCampusEnvironment(scene);

    // 6. Build 3D Campus Structures
    buildCampusBuildings(scene, buildings, buildingMeshesRef);

    // 7. Pathways & Walkways
    buildCampusPathways(scene);

    // 8. Event Listeners for Interaction
    const onResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Mouse Controls
    const onMouseDown = (e) => {
      if (e.button === 0) isDraggingRef.current = true;
      if (e.button === 2) isPanningRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      isPanningRef.current = false;
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle Raycasting for hover
      if (!isDraggingRef.current && !isPanningRef.current) {
        checkHover(mouseX, mouseY, rect, e.clientX, e.clientY);
      }

      // Drag Orbit
      if (isDraggingRef.current) {
        const deltaX = e.clientX - prevMouseRef.current.x;
        const deltaY = e.clientY - prevMouseRef.current.y;

        sphericalRef.current.theta -= deltaX * 0.006;
        sphericalRef.current.phi = Math.max(
          0.1,
          Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi - deltaY * 0.006)
        );

        // Convert spherical to position relative to lookAt
        const radius = sphericalRef.current.radius;
        const sinPhi = Math.sin(sphericalRef.current.phi);
        const cosPhi = Math.cos(sphericalRef.current.phi);
        const sinTheta = Math.sin(sphericalRef.current.theta);
        const cosTheta = Math.cos(sphericalRef.current.theta);

        cameraTarget.current.position.set(
          cameraTarget.current.lookAt.x + radius * sinPhi * sinTheta,
          cameraTarget.current.lookAt.y + radius * cosPhi,
          cameraTarget.current.lookAt.z + radius * sinPhi * cosTheta
        );
      }

      // Pan
      if (isPanningRef.current) {
        const deltaX = e.clientX - prevMouseRef.current.x;
        const deltaY = e.clientY - prevMouseRef.current.y;
        const panFactor = 0.05;
        cameraTarget.current.lookAt.x -= deltaX * panFactor;
        cameraTarget.current.lookAt.z -= deltaY * panFactor;
        cameraTarget.current.position.x -= deltaX * panFactor;
        cameraTarget.current.position.z -= deltaY * panFactor;
      }

      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onWheel = (e) => {
      e.preventDefault();
      const zoomSpeed = 0.04;
      const delta = e.deltaY * zoomSpeed;
      sphericalRef.current.radius = Math.max(12, Math.min(120, sphericalRef.current.radius + delta));

      // Push camera
      const dir = new THREE.Vector3().subVectors(camera.position, cameraTarget.current.lookAt).normalize();
      cameraTarget.current.position.copy(cameraTarget.current.lookAt).addScaledVector(dir, sphericalRef.current.radius);
    };

    const onClick = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const hitMeshes = [];
      buildingMeshesRef.current.forEach((meshGroup) => {
        meshGroup.traverse((child) => {
          if (child.isMesh && child.userData?.buildingId) {
            hitMeshes.push(child);
          }
        });
      });

      const intersects = raycaster.intersectObjects(hitMeshes, false);
      if (intersects.length > 0) {
        const buildingId = intersects[0].object.userData.buildingId;
        const bldg = buildings.find((b) => b.id === buildingId);
        if (bldg) {
          onSelectBuilding(bldg);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    domElement.addEventListener('click', onClick);
    domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    // 9. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.lerp(cameraTarget.current.position, 0.08);
      cameraTarget.current.currentLookAt.lerp(cameraTarget.current.lookAt, 0.08);
      camera.lookAt(cameraTarget.current.currentLookAt);

      // Subtle breathing animations on buildings & beacon rings
      scene.traverse((obj) => {
        if (obj.userData?.isBeacon) {
          const s = 1 + Math.sin(elapsedTime * 3) * 0.15;
          obj.scale.set(s, 1, s);
        }
        if (obj.userData?.isAntennaBeacon) {
          obj.material.opacity = 0.4 + Math.sin(elapsedTime * 6) * 0.5;
        }
        if (obj.userData?.isWater) {
          obj.material.roughness = 0.1 + Math.sin(elapsedTime * 1.5) * 0.05;
        }
      });

      // Animate Navigation Spline Pulses
      if (pathParticlesRef.current && pathParticlesRef.current.geometry) {
        const positions = pathParticlesRef.current.geometry.attributes.position.array;
        const progress = (elapsedTime * 1.5) % 1;
        // update particle flow
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', onResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('mousemove', onMouseMove);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('click', onClick);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [buildings]);

  // Raycast hover check helper
  const checkHover = (mouseX, mouseY, rect, clientX, clientY) => {
    if (!cameraRef.current) return;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

    const hitMeshes = [];
    buildingMeshesRef.current.forEach((meshGroup) => {
      meshGroup.traverse((child) => {
        if (child.isMesh && child.userData?.buildingId) {
          hitMeshes.push(child);
        }
      });
    });

    const intersects = raycaster.intersectObjects(hitMeshes, false);
    if (intersects.length > 0) {
      const bldgId = intersects[0].object.userData.buildingId;
      const bldg = buildings.find((b) => b.id === bldgId);
      if (bldg) {
        hoveredBuildingRef.current = bldg;
        setHoveredBuilding(bldg);
        setHoverScreenPos({ x: clientX - rect.left, y: clientY - rect.top });
        document.body.style.cursor = 'pointer';
        return;
      }
    }

    if (hoveredBuildingRef.current !== null) {
      hoveredBuildingRef.current = null;
      setHoveredBuilding(null);
      document.body.style.cursor = 'default';
    }
  };

  // Update Day/Night Atmosphere
  useEffect(() => {
    if (!sceneRef.current || !lightsRef.current.ambient) return;
    const scene = sceneRef.current;
    const { ambient, sun, hemisphere } = lightsRef.current;

    if (timeOfDay === 'day') {
      scene.background = new THREE.Color(0xb0d6f5);
      scene.fog.color.setHex(0xb0d6f5);
      scene.fog.density = 0.008;
      ambient.color.setHex(0xffffff);
      ambient.intensity = 1.6;
      sun.color.setHex(0xfffaed);
      sun.intensity = 2.4;
      sun.position.set(50, 70, 30);
      hemisphere.color.setHex(0x90c8ff);
      hemisphere.groundColor.setHex(0x3a5d38);
      hemisphere.intensity = 1.0;
    } else if (timeOfDay === 'sunset') {
      scene.background = new THREE.Color(0x3a1e34);
      scene.fog.color.setHex(0x3a1e34);
      scene.fog.density = 0.012;
      ambient.color.setHex(0xffaa77);
      ambient.intensity = 1.1;
      sun.color.setHex(0xff6622);
      sun.intensity = 2.8;
      sun.position.set(70, 20, 20);
      hemisphere.color.setHex(0xff7744);
      hemisphere.groundColor.setHex(0x181022);
      hemisphere.intensity = 0.9;
    } else {
      // Night / Cyberpunk Twin
      scene.background = new THREE.Color(0x070b14);
      scene.fog.color.setHex(0x070b14);
      scene.fog.density = 0.013;
      ambient.color.setHex(0x1a263d);
      ambient.intensity = 0.9;
      sun.color.setHex(0x38bdf8);
      sun.intensity = 0.8;
      sun.position.set(30, 45, 30);
      hemisphere.color.setHex(0x223355);
      hemisphere.groundColor.setHex(0x080c16);
      hemisphere.intensity = 0.5;
    }
  }, [timeOfDay]);

  // Update Building Shaders / Heatmap colors
  useEffect(() => {
    if (!buildingMeshesRef.current) return;

    buildingMeshesRef.current.forEach((meshGroup, buildingId) => {
      const bldg = buildings.find((b) => b.id === buildingId);
      if (!bldg) return;

      meshGroup.traverse((child) => {
        if (child.isMesh && child.userData?.isBuildingFacade) {
          if (heatmapMode === 'occupancy') {
            // green -> yellow -> red
            const pct = bldg.occupancy.percentage;
            let colorHex = 0x10b981; // green
            if (pct > 75) colorHex = 0xef4444; // red
            else if (pct > 55) colorHex = 0xf59e0b; // amber
            child.material.color.setHex(colorHex);
            child.material.emissive.setHex(colorHex);
            child.material.emissiveIntensity = 0.45;
          } else if (heatmapMode === 'energy') {
            // blue -> amber -> intense purple
            const kw = bldg.energy.currentKw;
            let colorHex = 0x06b6d4; // cyan
            if (kw > 150) colorHex = 0xf97316; // high orange
            else if (kw > 100) colorHex = 0xa855f7; // medium purple
            child.material.color.setHex(colorHex);
            child.material.emissive.setHex(colorHex);
            child.material.emissiveIntensity = 0.5;
          } else {
            // Visual standard mode
            const base = parseInt(bldg.baseColor.replace('#', '0x'), 16);
            const accent = parseInt(bldg.accentColor.replace('#', '0x'), 16);
            child.material.color.setHex(base);
            child.material.emissive.setHex(accent);
            child.material.emissiveIntensity = selectedBuilding?.id === bldg.id ? 0.6 : 0.15;
          }
        }

        if (child.isMesh && child.userData?.isSelectedHalo) {
          child.visible = selectedBuilding?.id === buildingId;
        }
      });
    });
  }, [heatmapMode, buildings, selectedBuilding]);

  // Draw 3D Navigation Path
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Clean up previous path
    if (pathMeshRef.current) {
      scene.remove(pathMeshRef.current);
      pathMeshRef.current.geometry.dispose();
      pathMeshRef.current.material.dispose();
      pathMeshRef.current = null;
    }

    if (!navigationPath || navigationPath.length < 2) return;

    // Create a 3D spline curve through the waypoints
    const points3D = navigationPath.map(
      (p) => new THREE.Vector3(p[0], 0.45, p[2])
    );
    const curve = new THREE.CatmullRomCurve3(points3D);
    curve.curveType = 'catmullrom';
    curve.tension = 0.4;

    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.45, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });

    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tubeMesh);
    pathMeshRef.current = tubeMesh;
  }, [navigationPath]);

  return (
    <div className="campus-canvas-wrapper" style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%', outline: 'none' }} />

      {/* Floating 3D Building Tooltip on Hover */}
      {hoveredBuilding && (
        <div
          className="canvas-hover-badge"
          style={{
            position: 'absolute',
            left: `${hoverScreenPos.x + 14}px`,
            top: `${hoverScreenPos.y - 44}px`,
            pointerEvents: 'none',
            zIndex: 30
          }}
        >
          <div className="hover-badge-content">
            <div className="hover-badge-header">
              <span className="hover-badge-code">{hoveredBuilding.code}</span>
              <span
                className="hover-badge-dot"
                style={{ backgroundColor: hoveredBuilding.accentColor }}
              />
            </div>
            <div className="hover-badge-title">{hoveredBuilding.shortName}</div>
            <div className="hover-badge-stats">
              <span>👥 {hoveredBuilding.occupancy.percentage}% Occupied</span>
              <span>⚡ {hoveredBuilding.energy.currentKw} kW</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Canvas Controls & Legend */}
      <div className="canvas-overlay-controls">
        <div className="view-mode-indicator">
          <span className="pulse-dot" />
          <span>Interactive 3D Engine • Three.js v0.186</span>
        </div>
      </div>
    </div>
  );
}

// Procedural Campus Ground & Landscape
function createCampusEnvironment(scene) {
  // 1. Campus Ground Base
  const groundGeo = new THREE.PlaneGeometry(120, 120, 40, 40);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x0e1424,
    roughness: 0.85,
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // 2. High-Tech Grid Overlay
  const gridHelper = new THREE.GridHelper(110, 55, 0x00f2fe, 0x172238);
  gridHelper.position.y = 0.05;
  scene.add(gridHelper);

  // 3. Central Campus Agora / Water Basin Feature
  const waterGeo = new THREE.CylinderGeometry(8, 8, 0.4, 32);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.08,
    metalness: 0.7,
    transparent: true,
    opacity: 0.8
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.position.set(0, 0.15, 0);
  water.userData = { isWater: true };
  scene.add(water);

  // Basin rim
  const rimGeo = new THREE.TorusGeometry(8.2, 0.35, 8, 32);
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.3;
  scene.add(rim);

  // 4. Stylized Campus Trees & Greenery
  const treePositions = [
    [-6, 0, -8], [6, 0, -8], [-8, 0, 8], [8, 0, 8],
    [-28, 0, 0], [28, 0, 0], [0, 0, -32], [0, 0, 32],
    [-24, 0, -24], [24, 0, -24], [-24, 0, 24], [24, 0, 24],
    [-10, 0, -18], [10, 0, -18], [-12, 0, 18], [12, 0, 18]
  ];

  const trunkGeo = new THREE.CylinderGeometry(0.3, 0.45, 1.8, 6);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2716, roughness: 0.9 });

  const foliageGeo = new THREE.ConeGeometry(2.0, 4.2, 7);
  const foliageMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    roughness: 0.65,
    flatShading: true
  });

  treePositions.forEach(([tx, ty, tz]) => {
    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.9;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.y = 3.4;
    foliage.castShadow = true;
    treeGroup.add(foliage);

    treeGroup.position.set(tx, ty, tz);
    scene.add(treeGroup);
  });
}

// Procedural Campus Buildings Builder
function buildCampusBuildings(scene, buildings, buildingMeshesRef) {
  buildings.forEach((bldg) => {
    const bldgGroup = new THREE.Group();
    const [w, h, d] = bldg.dimensions;
    const [bx, by, bz] = bldg.position;

    // 1. Main Facade Geometry
    let mainGeo;
    if (bldg.architectureStyle === 'Arena') {
      mainGeo = new THREE.CylinderGeometry(w * 0.45, w * 0.5, h, 24);
    } else if (bldg.architectureStyle === 'QuantumDome') {
      mainGeo = new THREE.BoxGeometry(w, h * 0.75, d);
    } else {
      mainGeo = new THREE.BoxGeometry(w, h, d);
    }

    const baseColorNum = parseInt(bldg.baseColor.replace('#', '0x'), 16);
    const accentColorNum = parseInt(bldg.accentColor.replace('#', '0x'), 16);

    const facadeMat = new THREE.MeshStandardMaterial({
      color: baseColorNum,
      roughness: 0.25,
      metalness: 0.4,
      emissive: accentColorNum,
      emissiveIntensity: 0.18
    });

    const mainMesh = new THREE.Mesh(mainGeo, facadeMat);
    mainMesh.position.y = h / 2;
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    mainMesh.userData = { buildingId: bldg.id, isBuildingFacade: true };
    bldgGroup.add(mainMesh);

    // 2. Glass Curtain / Floor Separator Strips
    const floorHeight = h / bldg.floorsCount;
    for (let f = 1; f < bldg.floorsCount; f++) {
      const ringGeo = new THREE.BoxGeometry(w + 0.2, 0.25, d + 0.2);
      const ringMat = new THREE.MeshStandardMaterial({
        color: accentColorNum,
        emissive: accentColorNum,
        emissiveIntensity: 0.6
      });
      const floorBand = new THREE.Mesh(ringGeo, ringMat);
      floorBand.position.y = f * floorHeight;
      floorBand.userData = { buildingId: bldg.id };
      bldgGroup.add(floorBand);
    }

    // 3. Architectural Special Features
    if (bldg.architectureStyle === 'HighTechGlass') {
      // Antenna mast on Turing Hall
      const mastGeo = new THREE.CylinderGeometry(0.1, 0.2, 5, 6);
      const mastMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
      const mast = new THREE.Mesh(mastGeo, mastMat);
      mast.position.set(w * 0.3, h + 2.5, d * 0.3);
      bldgGroup.add(mast);

      // Pulsing antenna beacon light
      const beaconGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.9
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(w * 0.3, h + 5.1, d * 0.3);
      beacon.userData = { isAntennaBeacon: true };
      bldgGroup.add(beacon);

      // Rooftop solar panels
      createRooftopSolar(bldgGroup, w * 0.6, d * 0.6, h);
    } else if (bldg.architectureStyle === 'QuantumDome') {
      // Geodesic Observatory Dome
      const domeGeo = new THREE.SphereGeometry(w * 0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x6b21a8,
        emissiveIntensity: 0.3
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = h * 0.75;
      dome.castShadow = true;
      dome.userData = { buildingId: bldg.id };
      bldgGroup.add(dome);
    } else if (bldg.architectureStyle === 'TieredAtrium') {
      // Stepped terrace layer
      const stepGeo = new THREE.BoxGeometry(w * 0.65, 2.5, d * 0.65);
      const stepMat = new THREE.MeshStandardMaterial({
        color: 0x1e3a5f,
        roughness: 0.3,
        metalness: 0.5,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.2
      });
      const step = new THREE.Mesh(stepGeo, stepMat);
      step.position.y = h + 1.25;
      step.castShadow = true;
      step.userData = { buildingId: bldg.id };
      bldgGroup.add(step);
    }

    // 4. Ground Selection Halo (Pulsing ring when active)
    const haloGeo = new THREE.RingGeometry(Math.max(w, d) * 0.7, Math.max(w, d) * 0.82, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: accentColorNum,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.12;
    halo.visible = false;
    halo.userData = { isSelectedHalo: true, isBeacon: true };
    bldgGroup.add(halo);

    bldgGroup.position.set(bx, by, bz);
    scene.add(bldgGroup);
    buildingMeshesRef.current.set(bldg.id, bldgGroup);
  });
}

function createRooftopSolar(group, width, depth, height) {
  const panelGeo = new THREE.PlaneGeometry(width * 0.8, depth * 0.8);
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.1,
    emissive: 0x0284c7,
    emissiveIntensity: 0.15
  });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.rotation.x = -Math.PI / 2 + 0.1;
  panel.position.set(0, height + 0.15, 0);
  group.add(panel);
}

// Campus Walkways & Plazas
function buildCampusPathways(scene) {
  const pathMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.9
  });

  WAYPOINT_EDGES.forEach((edge) => {
    const fromWp = CAMPUS_WAYPOINTS.find((w) => w.id === edge.from);
    const toWp = CAMPUS_WAYPOINTS.find((w) => w.id === edge.to);
    if (!fromWp || !toWp) return;

    const v1 = new THREE.Vector3(...fromWp.position);
    const v2 = new THREE.Vector3(...toWp.position);
    const dist = v1.distanceTo(v2);

    const pathGeo = new THREE.PlaneGeometry(3.5, dist);
    const pathMesh = new THREE.Mesh(pathGeo, pathMat);
    pathMesh.rotation.x = -Math.PI / 2;

    const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
    pathMesh.position.set(mid.x, 0.08, mid.z);

    const angle = Math.atan2(v2.x - v1.x, v2.z - v1.z);
    pathMesh.rotation.z = -angle;
    scene.add(pathMesh);
  });
}
