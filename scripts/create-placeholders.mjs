import fs from "fs";
import path from "path";
import sharp from "sharp";

const CWD = process.cwd();

async function createLuxuryJpeg(title, subtitle, outputPath) {
  const width = 1200;
  const height = 800;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="goldGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.18" />
        <stop offset="60%" stop-color="#D4AF37" stop-opacity="0.04" />
        <stop offset="100%" stop-color="#08080A" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E1015" />
        <stop offset="50%" stop-color="#08080A" />
        <stop offset="100%" stop-color="#050507" />
      </linearGradient>
      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#997A15" />
        <stop offset="50%" stop-color="#F3E5AB" />
        <stop offset="100%" stop-color="#B8860B" />
      </linearGradient>
      <linearGradient id="turntableGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#08080A" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Base Luxury Backdrop -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

    <!-- Ambient Center Light Dome -->
    <rect width="${width}" height="${height}" fill="url(#goldGlow)" />

    <!-- Studio Floor Turntable Perspective -->
    <ellipse cx="600" cy="620" rx="460" ry="120" fill="url(#turntableGlow)" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="1.5" />
    <ellipse cx="600" cy="620" rx="380" ry="90" fill="none" stroke="#D4AF37" stroke-opacity="0.2" stroke-width="1" stroke-dasharray="8 6" />

    <!-- Studio Stage Pedestal Line -->
    <line x1="140" y1="620" x2="1060" y2="620" stroke="#D4AF37" stroke-opacity="0.15" stroke-width="1" />

    <!-- Center Luxury Monogram & Plaque -->
    <g transform="translate(600, 360)">
      <!-- Outer Plaque Frame -->
      <rect x="-240" y="-120" width="480" height="240" rx="16" fill="#0C0D11" fill-opacity="0.85" stroke="url(#goldBorder)" stroke-width="1.5" />
      
      <!-- Inner Corner Accents -->
      <path d="M -224 -90 L -224 -104 L -210 -104" stroke="#D4AF37" stroke-width="1.5" fill="none" />
      <path d="M 224 -90 L 224 -104 L 210 -104" stroke="#D4AF37" stroke-width="1.5" fill="none" />
      <path d="M -224 90 L -224 104 L -210 104" stroke="#D4AF37" stroke-width="1.5" fill="none" />
      <path d="M 224 90 L 224 104 L 210 104" stroke="#D4AF37" stroke-width="1.5" fill="none" />

      <!-- Luxury Emblem Diamond -->
      <polygon points="0,-75 14,-60 0,-45 -14,-60" fill="#D4AF37" />
      <circle cx="0" cy="-60" r="2" fill="#08080A" />

      <!-- VEYLORA Headline -->
      <text x="0" y="-20" text-anchor="middle" font-family="'Times New Roman', serif" font-size="28" font-weight="bold" letter-spacing="8" fill="#F5E6BE">
        VEYLORA
      </text>

      <text x="0" y="8" text-anchor="middle" font-family="'Courier New', monospace" font-size="11" letter-spacing="4" fill="#D4AF37">
        VIP SHOWROOM SANCTUARY
      </text>

      <!-- Divider -->
      <line x1="-120" y1="24" x2="120" y2="24" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="1" />

      <!-- Vehicle Title -->
      <text x="0" y="52" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="2" fill="#FFFFFF">
        ${title}
      </text>

      <!-- Subtitle -->
      <text x="0" y="78" text-anchor="middle" font-family="'Courier New', monospace" font-size="11" letter-spacing="2" fill="#8E929C">
        ${subtitle}
      </text>
    </g>

    <!-- Bottom Specs Status Tag -->
    <text x="600" y="760" text-anchor="middle" font-family="'Courier New', monospace" font-size="10" letter-spacing="3" fill="#D4AF37" fill-opacity="0.7">
      [ HIGH-RESOLUTION PHOTOGRAPHY STAGE • RAW ASSET READY ]
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 95 })
    .toFile(outputPath);
  console.log(`Generated: ${outputPath}`);
}

async function main() {
  const carsDir = path.join(CWD, "public", "images", "cars");
  const bikesDir = path.join(CWD, "public", "images", "bikes");

  // 1. Placeholders
  await createLuxuryJpeg("AUTOMOTIVE SANCTUARY", "READY FOR HIGH-RES CLIENT PHOTO", path.join(carsDir, "placeholder.jpg"));
  await createLuxuryJpeg("SUPERBIKE SANCTUARY", "READY FOR HIGH-RES CLIENT PHOTO", path.join(bikesDir, "placeholder.jpg"));

  // 2. Individual Vehicles (so everything is ready immediately until user uploads)
  const cars = [
    { file: "civic.jpg", name: "HONDA CIVIC RS TURBO", spec: "176 HP • 1.5L DOHC VTEC" },
    { file: "corolla.jpg", name: "TOYOTA COROLLA ALTIUS GRANDE", spec: "138 HP • 1.8L DUAL VVT-I" },
    { file: "escalade.jpg", name: "CADILLAC ESCALADE-V", spec: "682 HP • 6.2L SUPERCHARGED V8" },
    { file: "porsche.jpg", name: "PORSCHE 911 GT3", spec: "502 HP • 4.0L FLAT-6 9,000 RPM" },
    { file: "maybach.jpg", name: "MERCEDES-MAYBACH S 680", spec: "621 HP • 6.0L BI-TURBO V12" },
  ];

  for (const car of cars) {
    await createLuxuryJpeg(car.name, car.spec, path.join(carsDir, car.file));
  }

  const bikes = [
    { file: "cg125.jpg", name: "HONDA CG 125 SPECIAL EDITION", spec: "5-SPEED • OHV IMMORTAL SOUND" },
    { file: "ducati.jpg", name: "DUCATI PANIGALE V4 S", spec: "215.5 HP • DESMOSEDICI STRADALE" },
    { file: "yamaha.jpg", name: "YAMAHA YZF-R1M CARBON", spec: "200 HP • CP4 CROSSPLANE INLINE-4" },
    { file: "harley.jpg", name: "HARLEY-DAVIDSON FAT BOY 114", spec: "155 NM • 1,868cc MILWAUKEE-EIGHT" },
  ];

  for (const bike of bikes) {
    await createLuxuryJpeg(bike.name, bike.spec, path.join(bikesDir, bike.file));
  }

  console.log("All luxury photography placeholders created successfully.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
