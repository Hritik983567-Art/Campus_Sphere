// Campus Twin - Data Model & Simulation State

export const INITIAL_BUILDINGS = [
  {
    id: 'b-eng',
    name: 'Turing Hall of Engineering & Robotics',
    shortName: 'Engineering & Robotics',
    code: 'ENG-01',
    category: 'STEM',
    categoryColor: '#00e5ff',
    position: [-18, 0, -12], // [x, y, z] in Three.js world space
    dimensions: [16, 12, 14], // [w, h, d]
    floorsCount: 4,
    architectureStyle: 'HighTechGlass',
    accentColor: '#00e5ff',
    baseColor: '#1a2942',
    description: 'Premier hub for AI, Autonomous Robotics, Mechatronics, and Cyber-Physical Systems with high-spec fabrication labs.',
    occupancy: { current: 342, capacity: 450, percentage: 76 },
    energy: { currentKw: 148, baselineKw: 110, solarOffsetPercent: 35 },
    environment: { tempC: 21.8, humidityPercent: 44, aqi: 18, status: 'Optimal' },
    network: { bandwidthMbps: 4800, activeDevices: 580 },
    keyDepartments: ['Computer Science', 'Robotics Engineering', 'Electrical Systems', 'Cybersecurity'],
    floors: [
      {
        floorNumber: 1,
        name: 'Ground Level - Heavy Robotics Atrium',
        rooms: [
          { id: 'eng-101', name: 'Autonomous Drone Flight Cage', type: 'Lab', capacity: 25, status: 'Occupied', equipment: ['Safety Nets', 'Motion Capture Cameras', 'High-Speed Telemetry'] },
          { id: 'eng-102', name: 'Mechatronics MakerSpace', type: 'Workshop', capacity: 40, status: 'Available', equipment: ['3D Printers', 'CNC Mills', 'Soldering Stations'] },
          { id: 'eng-103', name: 'Dean of Engineering Suite', type: 'Office', capacity: 10, status: 'Occupied', equipment: ['Conference Screen', 'Coffee Station'] }
        ]
      },
      {
        floorNumber: 2,
        name: 'Level 2 - AI & Computing Labs',
        rooms: [
          { id: 'eng-201', name: 'Deep Learning Cluster 201', type: 'Lab', capacity: 35, status: 'Occupied', equipment: ['NVIDIA H100 Terminals', 'Dual 4K Displays'] },
          { id: 'eng-202', name: 'Computer Vision Studio', type: 'Lab', capacity: 30, status: 'Available', equipment: ['Spatial VR Headsets', 'RGB-D Cameras'] },
          { id: 'eng-203', name: 'Software Sprint Auditorium', type: 'Auditorium', capacity: 120, status: 'Available', equipment: ['Dolby Audio', 'Dual Laser Projectors'] }
        ]
      },
      {
        floorNumber: 3,
        name: 'Level 3 - Embedded Systems & IoT',
        rooms: [
          { id: 'eng-301', name: 'Smart Sensors Testbed', type: 'Lab', capacity: 28, status: 'Maintenance', equipment: ['Oscilloscopes', 'RF Spectrum Analyzers'] },
          { id: 'eng-302', name: 'Collaboration Pod Alpha', type: 'Study', capacity: 12, status: 'Occupied', equipment: ['Interactive Whiteboard', 'Polycom Mic'] },
          { id: 'eng-303', name: 'Collaboration Pod Beta', type: 'Study', capacity: 12, status: 'Available', equipment: ['Interactive Whiteboard', 'Polycom Mic'] }
        ]
      },
      {
        floorNumber: 4,
        name: 'Level 4 - Faculty Research & Terrace',
        rooms: [
          { id: 'eng-401', name: 'Quantum Software Research', type: 'Lab', capacity: 20, status: 'Available', equipment: ['Cryogenic Telemetry Link', 'Quantum Simulator Host'] },
          { id: 'eng-402', name: 'Executive STEM Boardroom', type: 'Conference', capacity: 24, status: 'Available', equipment: ['Telepresence System', 'Executive Seating'] }
        ]
      }
    ]
  },
  {
    id: 'b-sci',
    name: 'Curie Quantum & Bio-Sciences Complex',
    shortName: 'Quantum & Bio-Sciences',
    code: 'SCI-02',
    category: 'STEM',
    categoryColor: '#a855f7',
    position: [16, 0, -14],
    dimensions: [18, 14, 15],
    floorsCount: 4,
    architectureStyle: 'QuantumDome',
    accentColor: '#a855f7',
    baseColor: '#281a42',
    description: 'State-of-the-art cleanrooms, genomic sequencing chambers, nanotechnology labs, and an astronomical observation terrace.',
    occupancy: { current: 285, capacity: 380, percentage: 75 },
    energy: { currentKw: 195, baselineKw: 160, solarOffsetPercent: 28 },
    environment: { tempC: 20.2, humidityPercent: 38, aqi: 12, status: 'Sterile / Certified' },
    network: { bandwidthMbps: 5400, activeDevices: 420 },
    keyDepartments: ['Bio-Engineering', 'Nanotechnology', 'Theoretical Physics', 'Genomics'],
    floors: [
      {
        floorNumber: 1,
        name: 'Ground Level - Cleanroom & Cryogenics',
        rooms: [
          { id: 'sci-101', name: 'ISO-5 Certified Cleanroom', type: 'Cleanroom', capacity: 15, status: 'Occupied', equipment: ['HEPA Filtration', 'Electron Microscope', 'UV Sterilization'] },
          { id: 'sci-102', name: 'Genomic Sequencing Core', type: 'Lab', capacity: 22, status: 'Occupied', equipment: ['Illumina Sequencers', 'Biohazard Hoods'] }
        ]
      },
      {
        floorNumber: 2,
        name: 'Level 2 - Biophysics & Nanomaterials',
        rooms: [
          { id: 'sci-201', name: 'Nanotech Synthesis Lab', type: 'Lab', capacity: 25, status: 'Available', equipment: ['Atomic Force Microscope', 'Sputter Coater'] },
          { id: 'sci-202', name: 'Spectroscopy Suite', type: 'Lab', capacity: 18, status: 'Maintenance', equipment: ['NMR Spectrometer', 'Mass Spectrometer'] },
          { id: 'sci-203', name: 'Seminar Hall Dirac', type: 'Auditorium', capacity: 90, status: 'Available', equipment: ['Triple Display', 'Surround Sound'] }
        ]
      },
      {
        floorNumber: 3,
        name: 'Level 3 - Graduate Research Chambers',
        rooms: [
          { id: 'sci-301', name: 'Post-Doc Computational Bio Lab', type: 'Lab', capacity: 30, status: 'Occupied', equipment: ['Bioinformatics Workstations'] },
          { id: 'sci-302', name: 'Quiet Review Lounge', type: 'Study', capacity: 15, status: 'Available', equipment: ['Ergonomic Stations', 'Reference Library'] }
        ]
      },
      {
        floorNumber: 4,
        name: 'Level 4 - Rooftop Observatory & Solar Array',
        rooms: [
          { id: 'sci-401', name: 'Astronomical Dome Control', type: 'Observatory', capacity: 16, status: 'Available', equipment: ['0.8m Reflector Telescope', 'CCD Spectrograph'] }
        ]
      }
    ]
  },
  {
    id: 'b-lib',
    name: 'Alexandria Digital Library & Learning Commons',
    shortName: 'Central Library & Commons',
    code: 'LIB-03',
    category: 'Student Life',
    categoryColor: '#3b82f6',
    position: [0, 0, -22],
    dimensions: [22, 10, 16],
    floorsCount: 3,
    architectureStyle: 'TieredAtrium',
    accentColor: '#3b82f6',
    baseColor: '#172740',
    description: 'Iconic architectural landmark with 3 tiers of quiet study zones, VR media creation pods, 24/7 cafe, and digital archives.',
    occupancy: { current: 520, capacity: 700, percentage: 74 },
    energy: { currentKw: 88, baselineKw: 95, solarOffsetPercent: 52 },
    environment: { tempC: 22.4, humidityPercent: 48, aqi: 15, status: 'Optimal' },
    network: { bandwidthMbps: 8200, activeDevices: 890 },
    keyDepartments: ['Digital Humanities', 'Information Sciences', 'Academic Success Center'],
    floors: [
      {
        floorNumber: 1,
        name: 'Ground Level - 24/7 Atrium & Cafe',
        rooms: [
          { id: 'lib-101', name: 'Commons Cafe & Social Lounge', type: 'Dining', capacity: 120, status: 'Occupied', equipment: ['Artisan Coffee Bar', 'Communal Tables', 'Charging Bar'] },
          { id: 'lib-102', name: 'Digital Checkout & Help Desk', type: 'Service', capacity: 15, status: 'Available', equipment: ['Laptop Kiosks', '3D Scanner'] }
        ]
      },
      {
        floorNumber: 2,
        name: 'Level 2 - Collaborative Media & Pods',
        rooms: [
          { id: 'lib-201', name: 'Podcast & Audio Studio', type: 'Media', capacity: 8, status: 'Available', equipment: ['Shure SM7B Mics', 'Acoustic Soundproofing'] },
          { id: 'lib-202', name: 'VR Spatial Exploration Pod', type: 'VR', capacity: 10, status: 'Occupied', equipment: ['Meta Quest Pro Units', 'Haptic Suits'] },
          { id: 'lib-203', name: 'Group Study Room 203', type: 'Study', capacity: 8, status: 'Occupied', equipment: ['Smart Screen', 'Glassboard'] },
          { id: 'lib-204', name: 'Group Study Room 204', type: 'Study', capacity: 8, status: 'Available', equipment: ['Smart Screen', 'Glassboard'] }
        ]
      },
      {
        floorNumber: 3,
        name: 'Level 3 - Silent Sanctuary & Rare Books',
        rooms: [
          { id: 'lib-301', name: 'Deep Focus Reading Hall', type: 'Silent', capacity: 160, status: 'Occupied', equipment: ['Noise dampening architecture', 'Individual desks'] },
          { id: 'lib-302', name: 'Special Collections Reading Room', type: 'Archive', capacity: 20, status: 'Available', equipment: ['Climate-controlled display cases'] }
        ]
      }
    ]
  },
  {
    id: 'b-stu',
    name: 'Nexus Student Center & Innovation Hub',
    shortName: 'Student Hub & Union',
    code: 'STU-04',
    category: 'Student Life',
    categoryColor: '#10b981',
    position: [-16, 0, 10],
    dimensions: [20, 9, 16],
    floorsCount: 3,
    architectureStyle: 'ModernGlass',
    accentColor: '#10b981',
    baseColor: '#122e26',
    description: 'Vibrant epicenter of student societies, career incubator, global cuisine dining hall, gaming arena, and event ballroom.',
    occupancy: { current: 610, capacity: 850, percentage: 72 },
    energy: { currentKw: 162, baselineKw: 140, solarOffsetPercent: 42 },
    environment: { tempC: 23.1, humidityPercent: 52, aqi: 24, status: 'Good' },
    network: { bandwidthMbps: 9500, activeDevices: 1120 },
    keyDepartments: ['Student Government', 'Venture Incubator', 'Career Development', 'International Student Services'],
    floors: [
      {
        floorNumber: 1,
        name: 'Ground Level - Global Food Market',
        rooms: [
          { id: 'stu-101', name: 'International Food Commons', type: 'Dining', capacity: 350, status: 'Occupied', equipment: ['Micro-kitchens', 'Order Kiosks'] },
          { id: 'stu-102', name: 'Campus Convenience & Merch Store', type: 'Retail', capacity: 40, status: 'Available', equipment: ['Automated checkout'] }
        ]
      },
      {
        floorNumber: 2,
        name: 'Level 2 - Startup Incubator & Esports Arena',
        rooms: [
          { id: 'stu-201', name: 'Venture Accelerator Co-working', type: 'Workspace', capacity: 60, status: 'Occupied', equipment: ['Pitch Stage', 'Fiber Uplinks'] },
          { id: 'stu-202', name: 'Varsity Esports Battle Station', type: 'Esports', capacity: 32, status: 'Occupied', equipment: ['360Hz Gaming Rigs', 'Broadcast Desk'] },
          { id: 'stu-203', name: 'Student Club Council Room', type: 'Meeting', capacity: 25, status: 'Available', equipment: ['Conference AV', 'Projector'] }
        ]
      },
      {
        floorNumber: 3,
        name: 'Level 3 - Grand Multipurpose Ballroom',
        rooms: [
          { id: 'stu-301', name: 'Horizon Ballroom & Stage', type: 'Ballroom', capacity: 400, status: 'Available', equipment: ['Concert Line-Array Speakers', 'Dynamic Lighting Rig'] }
        ]
      }
    ]
  },
  {
    id: 'b-rec',
    name: 'Olympus Athletics & Wellness Arena',
    shortName: 'Athletics & Recreation',
    code: 'REC-05',
    category: 'Sports',
    categoryColor: '#f59e0b',
    position: [18, 0, 12],
    dimensions: [22, 11, 18],
    floorsCount: 2,
    architectureStyle: 'Arena',
    accentColor: '#f59e0b',
    baseColor: '#36240d',
    description: 'Olympic-size aquatic center, multi-court hardwood basketball arena, climbing wall, and sports physiology analytics.',
    occupancy: { current: 240, capacity: 550, percentage: 44 },
    energy: { currentKw: 130, baselineKw: 120, solarOffsetPercent: 30 },
    environment: { tempC: 22.0, humidityPercent: 55, aqi: 20, status: 'Ventilated' },
    network: { bandwidthMbps: 3200, activeDevices: 290 },
    keyDepartments: ['Kinesiology', 'Intercollegiate Athletics', 'Recreation & Fitness'],
    floors: [
      {
        floorNumber: 1,
        name: 'Ground Level - Arena & Aquatic Center',
        rooms: [
          { id: 'rec-101', name: 'Main Championship Court', type: 'Arena', capacity: 1200, status: 'Available', equipment: ['Jumbotron', 'Pro Hardwood Floor'] },
          { id: 'rec-102', name: 'Olympic 50m Swimming Pool', type: 'Aquatics', capacity: 80, status: 'Occupied', equipment: ['Timing Touchpads', 'Diving Boards'] }
        ]
      },
      {
        floorNumber: 2,
        name: 'Level 2 - High Performance Fitness & Bouldering',
        rooms: [
          { id: 'rec-201', name: 'Cardio & Strength Training Deck', type: 'Gym', capacity: 120, status: 'Occupied', equipment: ['Free weights', 'Smart treadmills'] },
          { id: 'rec-202', name: 'Indoor 14m Bouldering Wall', type: 'Climbing', capacity: 30, status: 'Available', equipment: ['Auto-belay systems', 'Safety mats'] },
          { id: 'rec-203', name: 'Mind-Body Yoga Studio', type: 'Studio', capacity: 35, status: 'Available', equipment: ['Bamboo floor', 'Audio surround'] }
        ]
      }
    ]
  },
  {
    id: 'b-adm',
    name: 'Apex Pavilion of Administration & Welcome',
    shortName: 'Admin & Welcome Pavilion',
    code: 'ADM-06',
    category: 'Admin',
    categoryColor: '#ec4899',
    position: [0, 0, 22],
    dimensions: [18, 8, 14],
    floorsCount: 2,
    architectureStyle: 'Pavilion',
    accentColor: '#ec4899',
    baseColor: '#36152a',
    description: 'Campus reception center, registrar, chancellor office, financial aid, and admissions visitor lounge.',
    occupancy: { current: 140, capacity: 250, percentage: 56 },
    energy: { currentKw: 65, baselineKw: 60, solarOffsetPercent: 60 },
    environment: { tempC: 21.5, humidityPercent: 42, aqi: 10, status: 'Pristine' },
    network: { bandwidthMbps: 4500, activeDevices: 210 },
    keyDepartments: ['University Registrar', 'Admissions & Tours', 'Chancellor Suite', 'Financial Aid'],
    floors: [
      {
        floorNumber: 1,
        name: 'Ground Level - Campus Welcome Gallery',
        rooms: [
          { id: 'adm-101', name: 'Visitor Welcome Lounge & Kiosks', type: 'Lounge', capacity: 80, status: 'Available', equipment: ['Interactive Campus Map', 'Refreshments'] },
          { id: 'adm-102', name: 'Admissions Presentation Room', type: 'Auditorium', capacity: 70, status: 'Available', equipment: ['Retractable Screen', 'Wireless Mic'] }
        ]
      },
      {
        floorNumber: 2,
        name: 'Level 2 - Executive Leadership Suites',
        rooms: [
          { id: 'adm-201', name: 'University Council Chamber', type: 'Boardroom', capacity: 30, status: 'Available', equipment: ['Voting Consoles', 'Executive Audio'] },
          { id: 'adm-202', name: 'President & Chancellor Office', type: 'Office', capacity: 12, status: 'Occupied', equipment: ['Private Lounge', 'Terrace Access'] }
        ]
      }
    ]
  }
];

// Campus Wayfinding Walking Graph (coordinates and connection matrix)
export const CAMPUS_WAYPOINTS = [
  { id: 'wp-eng', name: 'Turing Hall Plaza', position: [-18, 0, -5] },
  { id: 'wp-sci', name: 'Curie Complex Quad', position: [16, 0, -6] },
  { id: 'wp-lib', name: 'Alexandria Library Fountain', position: [0, 0, -13] },
  { id: 'wp-center', name: 'Central Campus Agora', position: [0, 0, 0] },
  { id: 'wp-stu', name: 'Nexus Promenade', position: [-14, 0, 4] },
  { id: 'wp-rec', name: 'Olympus Sports Walkway', position: [14, 0, 5] },
  { id: 'wp-adm', name: 'Main Campus Gate Plaza', position: [0, 0, 14] }
];

// Navigation edges between waypoints with distance (meters)
export const WAYPOINT_EDGES = [
  { from: 'wp-eng', to: 'wp-center', distance: 160 },
  { from: 'wp-eng', to: 'wp-lib', distance: 140 },
  { from: 'wp-eng', to: 'wp-stu', distance: 110 },
  { from: 'wp-sci', to: 'wp-center', distance: 150 },
  { from: 'wp-sci', to: 'wp-lib', distance: 130 },
  { from: 'wp-sci', to: 'wp-rec', distance: 120 },
  { from: 'wp-lib', to: 'wp-center', distance: 110 },
  { from: 'wp-stu', to: 'wp-center', distance: 130 },
  { from: 'wp-stu', to: 'wp-adm', distance: 150 },
  { from: 'wp-rec', to: 'wp-center', distance: 135 },
  { from: 'wp-rec', to: 'wp-adm', distance: 145 },
  { from: 'wp-adm', to: 'wp-center', distance: 120 }
];

// Mapping each building ID to its primary access waypoint
export const BUILDING_WAYPOINT_MAP = {
  'b-eng': 'wp-eng',
  'b-sci': 'wp-sci',
  'b-lib': 'wp-lib',
  'b-stu': 'wp-stu',
  'b-rec': 'wp-rec',
  'b-adm': 'wp-adm'
};

// Initial Facility Incident Tickets
export const INITIAL_TICKETS = [
  {
    id: 'TCK-2026-891',
    title: 'Precision Climate Control Deviation in Cleanroom ISO-5',
    buildingId: 'b-sci',
    buildingName: 'Curie Quantum & Bio-Sciences Complex',
    room: 'Cleanroom 101',
    category: 'HVAC',
    priority: 'Critical',
    status: 'In Progress',
    reportedBy: 'Dr. Aris Thorne (Nanotech PI)',
    timestamp: '15 mins ago',
    description: 'Cleanroom humidity sensor is reporting 48% (spec limit is 38% +/- 2%). Possible filter bypass or chiller coil valve failure.',
    assignedTo: 'Advanced Tech Mechanical Team',
    eta: '30 mins'
  },
  {
    id: 'TCK-2026-887',
    title: 'Autonomous Drone Cage Perimeter Laser Interlock Fault',
    buildingId: 'b-eng',
    buildingName: 'Turing Hall of Engineering',
    room: 'Drone Cage 101',
    category: 'Safety',
    priority: 'High',
    status: 'In Progress',
    reportedBy: 'Prof. Elena Rostova',
    timestamp: '1 hour ago',
    description: 'Safety light curtain trips sporadically during high-speed quadcopter tests. Systems locked in safe mode.',
    assignedTo: 'Robotics Safety Engineer (Marcus Chen)',
    eta: '1.5 hours'
  },
  {
    id: 'TCK-2026-879',
    title: 'Acoustic Soundboard Amplifier hum in Podcast Studio',
    buildingId: 'b-lib',
    buildingName: 'Alexandria Digital Library',
    room: 'Studio 201',
    category: 'IT / AV',
    priority: 'Medium',
    status: 'Reported',
    reportedBy: 'Kavya Patel (Media Lead)',
    timestamp: '3 hours ago',
    description: '60Hz ground loop hum on channel 3 & 4 audio board. XLR grounding issue suspected.',
    assignedTo: 'Unassigned',
    eta: 'Tomorrow 10:00 AM'
  },
  {
    id: 'TCK-2026-865',
    title: 'Hydraulic Door Closer Resistance on North Entrance',
    buildingId: 'b-adm',
    buildingName: 'Apex Pavilion of Administration',
    room: 'Main Atrium Entry',
    category: 'Structural',
    priority: 'Low',
    status: 'Reported',
    reportedBy: 'Campus Security Desk',
    timestamp: '5 hours ago',
    description: 'Heavy wind causes North glass door to latch slowly. Accessible push-button works normally.',
    assignedTo: 'Facilities Maintenance (Team Beta)',
    eta: '2 days'
  },
  {
    id: 'TCK-2026-842',
    title: 'Smart LED Grid Flicker in Esports Arena',
    buildingId: 'b-stu',
    buildingName: 'Nexus Student Center',
    room: 'Esports Arena 202',
    category: 'Electrical',
    priority: 'Medium',
    status: 'Resolved',
    reportedBy: 'Jordan Tyler (Esports Captain)',
    timestamp: 'Yesterday',
    description: 'DMX controller unit 4 lost sync with the primary lighting desk. Swapped DMX decoder board.',
    assignedTo: 'Electrical Lead (Sarah Gomez)',
    eta: 'Completed'
  }
];

// Live Simulation events ticker
export const LIVE_CAMPUS_FEED = [
  { id: 1, type: 'telemetry', text: 'Turing Hall rooftop solar array output increased to 48.2 kW (+12%)', time: '1m ago' },
  { id: 2, type: 'booking', text: 'Robotics Team booked Mechatronics MakerSpace (eng-102) for 3:00 PM', time: '4m ago' },
  { id: 3, type: 'ticket', text: 'Facility team dispatched to Curie Cleanroom 101 for HVAC calibration', time: '8m ago' },
  { id: 4, type: 'access', text: 'Alexandria Library Silent Sanctuary reached 74% capacity', time: '12m ago' },
  { id: 5, type: 'eco', text: 'Campus aggregate renewable power offset reached 42.8% today', time: '18m ago' }
];
