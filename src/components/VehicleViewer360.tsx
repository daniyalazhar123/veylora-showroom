"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Vehicle, VehicleColor } from "@/lib/vehicles";
import { RotateCw, Play, Pause, Compass, Palette, Sparkles, RefreshCcw } from "lucide-react";

interface VehicleViewer360Props {
  vehicle: Vehicle;
  selectedColor: VehicleColor;
  onColorChange: (color: VehicleColor) => void;
}

export default function VehicleViewer360({
  vehicle,
  selectedColor,
  onColorChange,
}: VehicleViewer360Props) {
  const defaultFallback = vehicle?.type === "bike" 
    ? "/images/bikes/placeholder.jpg" 
    : "/images/cars/placeholder.jpg";

  const [angle, setAngle] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>(vehicle?.image || defaultFallback);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const startAngle = useRef(0);

  useEffect(() => {
    if (vehicle?.image) {
      setImgSrc(vehicle.image);
    }
  }, [vehicle]);

  // Auto-spin interval
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 1) % 360);
    }, 45);
    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  // Mouse Drag handlers for 360 interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsAutoSpinning(false);
    setIsDragging(true);
    dragStartX.current = e.clientX;
    startAngle.current = angle;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX.current;
      const degreeShift = Math.floor(deltaX * 0.7);
      const newAngle = (startAngle.current + degreeShift + 360) % 360;
      setAngle(newAngle);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsAutoSpinning(false);
      setIsDragging(true);
      dragStartX.current = e.touches[0].clientX;
      startAngle.current = angle;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    const degreeShift = Math.floor(deltaX * 0.7);
    const newAngle = (startAngle.current + degreeShift + 360) % 360;
    setAngle(newAngle);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Human-readable angle description
  const getAngleLabel = (deg: number) => {
    if (deg >= 335 || deg < 25) return "Direct Profile (0°)";
    if (deg >= 25 && deg < 70) return "Front Three-Quarter (45°)";
    if (deg >= 70 && deg < 115) return "Front Aerodynamic Grille (90°)";
    if (deg >= 115 && deg < 160) return "Rear Three-Quarter (135°)";
    if (deg >= 160 && deg < 205) return "Rear Aero Diffuser (180°)";
    if (deg >= 205 && deg < 250) return "Opposite Rear Quarter (225°)";
    if (deg >= 250 && deg < 295) return "Opposite Front Wing (270°)";
    return "Dynamic Angle (315°)";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 360 Interactive Turntable Stage */}
      <div
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-w-4xl rounded-2xl bg-gradient-to-b from-[#0e0f12] via-[#090a0d] to-[#040405] border border-borderGold/40 shadow-gold-glow flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient Top Light Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-gold-500/15 to-transparent blur-2xl pointer-events-none" />

        {/* Studio Floor Rings (Turntable) */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-32 rounded-full border border-gold-500/20 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent pointer-events-none flex items-center justify-center">
          <div className="w-[70%] h-24 rounded-full border border-gold-500/30 border-dashed animate-spin [animation-duration:30s]" />
        </div>

        {/* 360 Status Readout Header */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-gold-500/40 text-gold-300 text-xs font-mono backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>{getAngleLabel(angle)}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-gold-500/40 text-[11px] font-mono text-neutral-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span>ROTATION: {angle}°</span>
          </div>
        </div>

        {/* 3D Rotatable Vehicle Container */}
        <div
          className="relative z-10 w-[90%] sm:w-[82%] max-w-2xl transition-transform duration-75"
          style={{
            transform: `perspective(1000px) rotateY(${angle}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Subtle paint finish dynamic filter */}
          <div
            className="w-full h-auto transition-all duration-300"
            style={{
              filter:
                selectedColor.name.includes("Black")
                  ? "brightness(0.85) contrast(1.15)"
                  : selectedColor.name.includes("Red")
                  ? "sepia(0.2) saturate(1.4) hue-rotate(-15deg)"
                  : selectedColor.name.includes("Blue")
                  ? "hue-rotate(180deg) saturate(1.2)"
                  : "none",
            }}
          >
            <Image
              src={imgSrc}
              alt={`${vehicle.name} 360 Studio View`}
              width={1200}
              height={800}
              onError={() => setImgSrc(defaultFallback)}
              className="w-full h-auto max-h-[380px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] pointer-events-none rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Drag Helper Overlay */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-neutral-400 bg-black/60 px-3 py-1 rounded-full border border-neutral-800 pointer-events-none">
          ← DRAG HORIZONTALLY TO ROTATE 360° →
        </div>
      </div>

      {/* Turntable Control Bar */}
      <div className="w-full max-w-4xl mt-6 p-4 rounded-xl bg-surface border border-borderGold/30 flex flex-wrap items-center justify-between gap-4">
        {/* Slider & Degree control */}
        <div className="flex-1 min-w-[200px] flex items-center gap-3">
          <RotateCw className="w-4 h-4 text-gold-400 shrink-0" />
          <input
            type="range"
            min="0"
            max="359"
            value={angle}
            onChange={(e) => {
              setIsAutoSpinning(false);
              setAngle(Number(e.target.value));
            }}
            className="w-full accent-gold-500 bg-surface-raised h-2 rounded-lg cursor-pointer"
            aria-label="Rotate vehicle 360 degrees slider"
          />
          <span className="text-xs font-mono text-gold-300 w-12 text-right shrink-0">
            {angle}°
          </span>
        </div>

        {/* Quick Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsAutoSpinning(false);
              setAngle((prev) => (prev - 45 + 360) % 360);
            }}
            className="p-2 rounded-lg border border-borderGold/40 text-neutral-300 hover:text-gold-300 hover:bg-surface-raised text-xs font-mono"
            title="Rotate Left 45°"
          >
            -45°
          </button>

          <button
            onClick={() => {
              setIsAutoSpinning(false);
              setAngle(0);
            }}
            className="p-2 rounded-lg border border-borderGold/40 text-neutral-300 hover:text-gold-300 hover:bg-surface-raised text-xs font-mono flex items-center gap-1"
            title="Reset to 0°"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            0°
          </button>

          <button
            onClick={() => {
              setIsAutoSpinning(false);
              setAngle((prev) => (prev + 45) % 360);
            }}
            className="p-2 rounded-lg border border-borderGold/40 text-neutral-300 hover:text-gold-300 hover:bg-surface-raised text-xs font-mono"
            title="Rotate Right 45°"
          >
            +45°
          </button>

          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all ${
              isAutoSpinning
                ? "bg-gold-500 text-black shadow-gold"
                : "border border-gold-500/40 text-gold-300 hover:bg-gold-500/10"
            }`}
          >
            {isAutoSpinning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto Spin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Color Changer Palette */}
      <div className="w-full max-w-4xl mt-6 p-5 rounded-xl bg-surface-card border border-borderGold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-gold-400" />
          <div>
            <span className="text-xs font-display uppercase tracking-wider text-white font-bold block">
              Exterior Bespoke Paint Finishes
            </span>
            <span className="text-xs text-neutral-400">
              Active Finish: <span className="text-gold-300 font-semibold">{selectedColor.name}</span>
            </span>
          </div>
        </div>

        {/* Color Buttons */}
        <div className="flex items-center gap-3">
          {vehicle.colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => onColorChange(color)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? "border-gold-400 bg-gold-500/15 shadow-gold scale-105"
                    : "border-neutral-700 bg-surface hover:border-neutral-500"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/40"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs text-neutral-200 font-medium hidden md:inline">
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
