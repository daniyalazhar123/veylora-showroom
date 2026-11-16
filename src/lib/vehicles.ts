export interface VehicleColor {
  name: string;
  hex: string;
  borderHex?: string;
  cssFilter?: string;
}

export interface VehicleSpec {
  engine: string;
  horsepower: string;
  torque: string;
  acceleration: string; // 0-100 km/h
  topSpeed: string;
  transmission: string;
  fuelType: string;
  driveTrain: string;
  consumption?: string;
  curbWeight?: string;
}

export interface Vehicle {
  id: string;
  type: "car" | "bike";
  name: string;
  modelCode: string;
  tagline: string;
  price: number; // In PKR or Base currency
  emiMonthly: number; // 36-60 mo EMI
  image: string;
  featured: boolean;
  colors: VehicleColor[];
  specs: VehicleSpec;
  description: string;
  highlightFeatures: string[];
  receptionistRecommendation?: string;
  stock: number;
}

export const VEHICLES: Vehicle[] = [
  {
    id: "civic-rs",
    type: "car",
    name: "Honda Civic RS Turbo",
    modelCode: "FE1-VTEC-RS",
    tagline: "Unleash Pure Turbocharged Exhilaration",
    price: 9899000,
    emiMonthly: 195000,
    image: "/images/cars/civic.jpg",
    featured: true,
    colors: [
      { name: "Ignite Red Metallic", hex: "#C0392B" },
      { name: "Sonic Gray Pearl", hex: "#78909C" },
      { name: "Crystal Black Pearl", hex: "#111113" },
      { name: "Platinum White Pearl", hex: "#F5F5F5" },
    ],
    specs: {
      engine: "1.5L DOHC VTEC Turbocharged 4-Cylinder",
      horsepower: "176 HP @ 6,000 RPM",
      torque: "220 Nm @ 1,700-4,500 RPM",
      acceleration: "7.8 sec (0-100 km/h)",
      topSpeed: "215 km/h",
      transmission: "M-CVT with Dual Paddle Shifters",
      fuelType: "Hi-Octane Petrol (Euro 5)",
      driveTrain: "Front-Wheel Drive with Agile Handling Assist",
      consumption: "13.8 km/L Combined",
      curbWeight: "1,310 kg",
    },
    description:
      "The 11th Generation Honda Civic RS Turbo elevates sport luxury to an art form. Featuring matte-black aerodynamic accents, dual chrome exhaust finishers, Honda SENSING suite, and a 10.2-inch full digital instrument cluster with Bose Premium 12-speaker acoustic architecture.",
    highlightFeatures: [
      "Honda SENSING Collision Mitigation & Lane Keeping",
      "Red Contrast Stitched Suede & Leather Upholstery",
      "Sport Mode Drive Selector with Throttle Remap",
      "Wireless Apple CarPlay & Ambient LED Illumination",
    ],
    receptionistRecommendation: "Recommended by Sophia Laurent for dynamic urban executives.",
    stock: 4,
  },
  {
    id: "corolla-grande",
    type: "car",
    name: "Toyota Corolla Altis Grande",
    modelCode: "E210-ALTIS-1.8G",
    tagline: "Timeless Prestige, Refined Comfort & Unmatched Reliability",
    price: 7799000,
    emiMonthly: 154000,
    image: "/images/cars/corolla.jpg",
    featured: true,
    colors: [
      { name: "Super White", hex: "#FFFFFF" },
      { name: "Attitude Black", hex: "#151619" },
      { name: "Phantom Brown", hex: "#4A3B32" },
      { name: "Silver Metallic", hex: "#CFD8DC" },
    ],
    specs: {
      engine: "1.8L Dual VVT-i 16-Valve DOHC",
      horsepower: "138 HP @ 6,400 RPM",
      torque: "173 Nm @ 4,000 RPM",
      acceleration: "9.6 sec (0-100 km/h)",
      topSpeed: "198 km/h",
      transmission: "7-Speed Sport Sequential Shiftmatic CVT-i",
      fuelType: "Super Unleaded Petrol",
      driveTrain: "Front-Wheel Drive",
      consumption: "14.5 km/L Highway",
      curbWeight: "1,275 kg",
    },
    description:
      "Crafted for executive prestige and plush ride serenity, the Corolla Altis Grande features panoramic electric sunroof, beige luxury leather seating, bi-beam LED headlights, cruise control, and Toyota's bulletproof engineering pedigree.",
    highlightFeatures: [
      "Electric Sunroof with Jam Protection",
      "9.0-inch High-Definition Floating Infotainment",
      "Paddle Shifter Sport Gear Command",
      "Dual Front SRS Airbags + ABS with EBD & Brake Assist",
    ],
    receptionistRecommendation: "Recommended by Alexander Vance for family comfort and boardroom arrival.",
    stock: 6,
  },
  {
    id: "escalade-v",
    type: "car",
    name: "Cadillac Escalade-V",
    modelCode: "ESCV-6.2SC-AWD",
    tagline: "The Pinnacle of American Monolithic Grandeur",
    price: 78500000,
    emiMonthly: 1450000,
    image: "/images/cars/escalade.jpg",
    featured: true,
    colors: [
      { name: "Black Raven", hex: "#080809" },
      { name: "Dark Emerald Metallic", hex: "#143224" },
      { name: "Argent Silver", hex: "#B0BEC5" },
      { name: "Radiant Red Tintcoat", hex: "#880E4F" },
    ],
    specs: {
      engine: "6.2L Hand-Built Supercharged V8",
      horsepower: "682 HP @ 6,000 RPM",
      torque: "885 Nm @ 4,400 RPM",
      acceleration: "4.3 sec (0-100 km/h)",
      topSpeed: "205 km/h (Governed)",
      transmission: "10-Speed Heavy Duty Electronic Automatic",
      fuelType: "Premium 98 Octane",
      driveTrain: "Full-Time Active All-Wheel Drive with eLSD",
      consumption: "6.5 km/L",
      curbWeight: "2,820 kg",
    },
    description:
      "An apex predator among luxury SUVs. Hand-assembled with a 2.65L supercharger producing 682 horsepower, 38-inch curved OLED display cluster with twice the pixel density of a 4K TV, and AKG Studio Reference 36-speaker surround sound system.",
    highlightFeatures: [
      "Curved 38-inch Diagonal OLED Screen Architecture",
      "Magnetic Ride Control 4.0 with Air Ride Adaptive Suspension",
      "Exclusive V-Mode with Active Performance Quad Exhaust",
      "Semi-Aniline Full Leather with Massage and Seat Heating/Cooling",
    ],
    receptionistRecommendation: "Recommended by Elena Rostova for high-profile dignitaries and estate owners.",
    stock: 2,
  },
  {
    id: "porsche-911-gt3",
    type: "car",
    name: "Porsche 911 GT3",
    modelCode: "992-GT3-CL",
    tagline: "Pure Motorsport DNA Engineered for the Open Highway",
    price: 92000000,
    emiMonthly: 1720000,
    image: "/images/cars/porsche.jpg",
    featured: true,
    colors: [
      { name: "Shark Blue", hex: "#0288D1" },
      { name: "Guards Red", hex: "#D32F2F" },
      { name: "Racing Yellow", hex: "#FBC02D" },
      { name: "Jet Black Metallic", hex: "#0E0E10" },
    ],
    specs: {
      engine: "4.0L High-Revving Naturally Aspirated Boxer-6",
      horsepower: "502 HP @ 8,400 RPM (9,000 RPM Redline)",
      torque: "470 Nm @ 6,100 RPM",
      acceleration: "3.2 sec (0-100 km/h)",
      topSpeed: "318 km/h",
      transmission: "7-Speed Dual-Clutch Porsche Doppelkupplung (PDK)",
      fuelType: "Super Plus Petrol",
      driveTrain: "Rear-Wheel Drive with Rear-Axle Steering",
      consumption: "8.2 km/L",
      curbWeight: "1,435 kg",
    },
    description:
      "Forged directly on the Nürburgring Nordschleife. The 992 GT3 utilizes double-wishbone front axle geometry derived from the Le Mans-winning 911 RSR, carbon fiber swan-neck rear wing, and lightweight carbon ceramic composite brakes.",
    highlightFeatures: [
      "9,000 RPM Naturally Aspirated Engine Symphony",
      "Swan-Neck Aerodynamic Carbon Rear Wing",
      "Center-Lock Forged Monoblock Wheels in Satin Neodyme",
      "Full Carbon Fiber Bucket Racing Seats",
    ],
    receptionistRecommendation: "Recommended by Sophia Laurent for track enthusiasts and connoisseurs.",
    stock: 1,
  },
  {
    id: "maybach-s680",
    type: "car",
    name: "Mercedes-Maybach S 680",
    modelCode: "Z223-V12-4MATIC",
    tagline: "The Zenith of Chauffeur-Driven Opulence",
    price: 118000000,
    emiMonthly: 2150000,
    image: "/images/cars/maybach.jpg",
    featured: true,
    colors: [
      { name: "Two-Tone Kalahari Gold & Obsidian Black", hex: "#D4AF37" },
      { name: "Diamond White Bright", hex: "#F8F9FA" },
      { name: "Nautical Blue", hex: "#1A237E" },
      { name: "Emerald Green", hex: "#004D40" },
    ],
    specs: {
      engine: "6.0L Bi-Turbo Handcrafted V12",
      horsepower: "621 HP @ 5,250 RPM",
      torque: "900 Nm @ 2,000-4,000 RPM",
      acceleration: "4.5 sec (0-100 km/h)",
      topSpeed: "250 km/h (Electronically Limited)",
      transmission: "9G-TRONIC 9-Speed Automatic",
      fuelType: "High Octane 98",
      driveTrain: "4MATIC All-Wheel Drive with 10° Rear Axle Steer",
      consumption: "7.1 km/L",
      curbWeight: "2,350 kg",
    },
    description:
      "A masterpiece of bespoke craftsmanship. Featuring first-class rear executive lounge suite with champagne flute holders, refrigerated compartment, active road noise compensation through 30 Burmester 4D speakers, and electrically assisted comfort rear doors.",
    highlightFeatures: [
      "Burmester High-End 4D Surround Sound (1,750 Watts)",
      "Rear Executive Reclining Seats with Calf Rest Massage",
      "Two-Tone Hand-Painted Coachline Separation",
      "MBUX Augmented Reality Head-Up Display",
    ],
    receptionistRecommendation: "Recommended by Alexander Vance for sovereign leaders and global industrial titans.",
    stock: 2,
  },
  // BIKES
  {
    id: "honda-cg125",
    type: "bike",
    name: "Honda CG 125 Special Edition",
    modelCode: "CG125-SE-5SPD",
    tagline: "The Immortal Sound of Unyielding Power & Heritage",
    price: 292900,
    emiMonthly: 8500,
    image: "/images/bikes/cg125.jpg",
    featured: true,
    colors: [
      { name: "Gloss Radiant Red", hex: "#E74C3C" },
      { name: "Black Golden Edition", hex: "#111111" },
      { name: "Midnight Navy", hex: "#1A237E" },
    ],
    specs: {
      engine: "124.1cc 4-Stroke Air-Cooled OHV Single Cylinder",
      horsepower: "11 HP @ 8,500 RPM",
      torque: "9.5 Nm @ 7,500 RPM",
      acceleration: "11.2 sec (0-80 km/h)",
      topSpeed: "110 km/h",
      transmission: "5-Speed Constant Mesh Gearbox",
      fuelType: "Standard Petrol",
      driveTrain: "Enclosed Roller Chain Final Drive",
      consumption: "45 km/L",
      curbWeight: "100 kg (Dry)",
    },
    description:
      "The undisputed king of two-wheel durability. The Honda CG 125 Special Edition features self-start convenience, an aggressive 5-speed transmission, distinctive chrome megaphone silencer note, reinforced front forks, and legendary low-maintenance overhead valve engineering.",
    highlightFeatures: [
      "Self Start + Kick Starter Dual Ignition",
      "5-Speed Smooth Overdrive Transmission",
      "Teardrop Aerodynamic Fuel Tank with Gold Wings",
      "Heavy Duty Telescopic Front Shock Absorbers",
    ],
    receptionistRecommendation: "Recommended by Elena Rostova for everyday reliability and timeless street respect.",
    stock: 12,
  },
  {
    id: "ducati-panigale-v4s",
    type: "bike",
    name: "Ducati Panigale V4 S",
    modelCode: "V4S-DESMO-CORSE",
    tagline: "Direct MotoGP Technology for Passionate Superbike Riders",
    price: 13500000,
    emiMonthly: 285000,
    image: "/images/bikes/ducati.jpg",
    featured: true,
    colors: [
      { name: "Ducati Red with Dark Stealth", hex: "#E51A24" },
      { name: "Stealth Black Carbon", hex: "#18191B" },
      { name: "Corse Racing White & Red", hex: "#F8F9FA" },
    ],
    specs: {
      engine: "1,103cc Desmosedici Stradale 90° V4 Counter-Rotating",
      horsepower: "215.5 HP @ 13,000 RPM",
      torque: "123.6 Nm @ 9,500 RPM",
      acceleration: "2.9 sec (0-100 km/h)",
      topSpeed: "305 km/h",
      transmission: "6-Speed with Ducati Quick Shift (DQS) EVO 2 Up/Down",
      fuelType: "Premium Unleaded 98",
      driveTrain: "Single-Sided Aluminum Swingarm",
      consumption: "13.2 km/L",
      curbWeight: "174 kg (Dry)",
    },
    description:
      "Born from Ducati Corse's championship-winning MotoGP squad. Equipped with smart Öhlins Smart EC 2.0 electronic suspension, double-profile aerodynamic carbon wings generating 30 kg of downforce at 270 km/h, and 5-inch TFT digital race cockpit.",
    highlightFeatures: [
      "Desmosedici Stradale Counter-Rotating Crank Engine",
      "Öhlins NPX 25/30 Pressurized Fork & TTX36 Shock",
      "Biplane Carbon Downforce Aerodynamic Wings",
      "Brembo Monobloc Stylema M4.30 4-Piston Calipers",
    ],
    receptionistRecommendation: "Recommended by Sophia Laurent for adrenaline purists seeking track supremacy.",
    stock: 2,
  },
  {
    id: "yamaha-r1m",
    type: "bike",
    name: "Yamaha YZF-R1M Carbon",
    modelCode: "R1M-CP4-TRACK",
    tagline: "The Uncompromising Factory Superbike Experience",
    price: 11900000,
    emiMonthly: 245000,
    image: "/images/bikes/yamaha.jpg",
    featured: true,
    colors: [
      { name: "Silver Blu Carbon Livery", hex: "#1565C0" },
      { name: "Tech Black Edition", hex: "#121214" },
    ],
    specs: {
      engine: "998cc Crossplane Inline-4 CP4 DOHC 16-Valve",
      horsepower: "200 HP @ 13,500 RPM",
      torque: "113.3 Nm @ 11,500 RPM",
      acceleration: "3.0 sec (0-100 km/h)",
      topSpeed: "299 km/h",
      transmission: "6-Speed Close-Ratio with Quick Shift System (QSS)",
      fuelType: "Super High Octane",
      driveTrain: "Deltabox Aluminum Frame with Magnesium Subframe",
      consumption: "13.9 km/L",
      curbWeight: "177 kg (Dry)",
    },
    description:
      "A limited-production track marvel clothed in raw polished carbon fiber and satin aluminum. Features Öhlins Electronic Racing Suspension (ERS), Communication Control Unit (CCU) with GPS data logging, and titanium connecting rods.",
    highlightFeatures: [
      "Full Carbon Fiber Fairing, Front Fender & Tail Cowl",
      "Öhlins Electronic Racing Suspension with Gas Chamber Forks",
      "GPS Data Logger for Lap Times & Lean Angle Analysis",
      "Titanium Exhaust System with Mid-Ship Muffler",
    ],
    receptionistRecommendation: "Recommended by Alexander Vance for precision riders demanding surgical control.",
    stock: 3,
  },
  {
    id: "harley-fatboy",
    type: "bike",
    name: "Harley-Davidson Fat Boy 114",
    modelCode: "FLFBS-MILWAUKEE-114",
    tagline: "The Original Muscle Cruiser Icon with Incomparable Road Presence",
    price: 14200000,
    emiMonthly: 295000,
    image: "/images/bikes/harley.jpg",
    featured: true,
    colors: [
      { name: "Vivid Black", hex: "#0E0E10" },
      { name: "Industrial Yellow", hex: "#E5A93C" },
      { name: "Midnight Crimson", hex: "#5C1D24" },
    ],
    specs: {
      engine: "1,868cc Milwaukee-Eight 114 V-Twin Air/Oil-Cooled",
      horsepower: "94 HP @ 5,020 RPM",
      torque: "155 Nm @ 3,250 RPM (Pure Low-End Muscle)",
      acceleration: "4.1 sec (0-100 km/h)",
      topSpeed: "185 km/h",
      transmission: "6-Speed Cruise Drive",
      fuelType: "Premium 95+ Octane",
      driveTrain: "Carbon-Reinforced Belt Drive",
      consumption: "17.8 km/L",
      curbWeight: "317 kg",
    },
    description:
      "The undisputed heavyweight cruiser that revolutionized motorcycling. Features steamroller 160mm front and 240mm rear tyres mounted on solid-cast aluminum Lakester wheels, satin chrome engine casings, and thunderous 114-cubic-inch V-Twin torque.",
    highlightFeatures: [
      "Machined Solid-Cast Aluminum Lakester Disc Wheels",
      "1,868cc Milwaukee-Eight 114ci V-Twin Engine",
      "Satin Chrome Finishes Across Nacelle, Pipes & Covers",
      "Concealed Softail Rear Suspension with Hydraulic Preload Knob",
    ],
    receptionistRecommendation: "Recommended by Elena Rostova for epic transcontinental cruises and commanding presence.",
    stock: 2,
  },
];

export function getVehicleById(id: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.id.toLowerCase() === id.toLowerCase());
}

export function getVehiclesByType(type: "car" | "bike"): Vehicle[] {
  return VEHICLES.filter((v) => v.type === type);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price).replace("PKR", "Rs.");
}
