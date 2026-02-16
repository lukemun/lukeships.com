"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Titan_One } from "next/font/google";

const titanOne = Titan_One({ subsets: ["latin"], weight: ["400"] });

const WORDS = ["LET", "ME", "IN"];

const LETTER_COLORS = [
  "#FF3B30", // L — red
  "#FF9500", // E — orange
  "#FFCC00", // T — yellow
  "#34C759", // M — green
  "#5AC8FA", // E — cyan
  "#007AFF", // I — blue
  "#AF52DE", // N — purple
];

const INK_PHASE1_SPEED = 0.4;
const INK_THRESHOLD = 400;
const INK_BASE_SPEED = 0.4;
const INK_MAX_SCALE = 4000;
const INK_OPACITY = 0.55;
const INK_DT_CAP = 50;
const INK_COVER_THRESHOLD = 2000;

function buildExtrusion(color: string, layers: number): string {
  return Array.from({ length: layers }, (_, i) =>
    `${-(i + 1)}px ${i + 1}px 0 ${color}`
  ).join(", ");
}

export default function DoorPage() {
  const router = useRouter();
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());
  const [inkSpots, setInkSpots] = useState<{ x: number; y: number; color: string }[]>([]);
  const [lettersSinking, setLettersSinking] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [seamVisible, setSeamVisible] = useState(false);
  const [doorsSwinging, setDoorsSwinging] = useState(false);
  const [screenCovered, setScreenCovered] = useState(false);
  const [doorsReady, setDoorsReady] = useState(false);
  const keyRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pressedRef = useRef<Set<number>>(new Set());
  const spotDataRef = useRef<{ scale: number }[]>([]);
  const spotElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const blackoutRef = useRef(false);
  const sequenceStartedRef = useRef(false);

  const handlePress = useCallback((index: number) => {
    if (pressedRef.current.has(index)) return;
    pressedRef.current.add(index);

    setPressedKeys(new Set(pressedRef.current));

    const el = keyRefs.current[index];
    if (el) {
      const rect = el.getBoundingClientRect();
      setInkSpots((prev) => [
        ...prev,
        { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, color: LETTER_COLORS[index] },
      ]);
      spotDataRef.current.push({ scale: 1 });
    }
  }, []);

  const allPressed = pressedKeys.size === 7;

  useEffect(() => {
    if (!allPressed) return;
    const t1 = setTimeout(() => setLettersSinking(true), 600);
    return () => clearTimeout(t1);
  }, [allPressed]);

  // Triggered when ink covers the screen — starts blackout → seam → doors
  useEffect(() => {
    if (!screenCovered) return;
    setBlackout(true);
    // After blackout is solid (500ms), mount doors + remove ink spots
    const t1 = setTimeout(() => setDoorsReady(true), 500);
    // Seam draws on top of the solid black
    const t2 = setTimeout(() => setSeamVisible(true), 1100);
    // Doors swing open, blackout fades out
    const t3 = setTimeout(() => setDoorsSwinging(true), 1800);
    // Navigate to real homepage after doors fully fade (2400ms swing)
    const t4 = setTimeout(() => router.replace("/"), 1800 + 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [screenCovered]);

  useEffect(() => {
    if (inkSpots.length === 0) return;

    const animate = (ts: number) => {
      if (blackoutRef.current) return;
      if (lastTsRef.current === 0) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      let dt = ts - lastTsRef.current;
      lastTsRef.current = ts;
      if (dt > INK_DT_CAP) dt = INK_DT_CAP;

      const pressCount = pressedRef.current.size;
      const spots = spotDataRef.current;
      const els = spotElsRef.current;

      for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        if (spot.scale >= INK_MAX_SCALE) continue;

        if (spot.scale < INK_THRESHOLD) {
          spot.scale += INK_PHASE1_SPEED * dt;
        } else {
          const pressBoost = Math.pow(pressCount, 1.5);
          spot.scale += INK_BASE_SPEED * (INK_THRESHOLD / spot.scale) * pressBoost * dt;
        }

        if (spot.scale > INK_MAX_SCALE) spot.scale = INK_MAX_SCALE;

        const el = els[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) scale(${spot.scale})`;
        }
      }

      // Check if all spots have grown large enough to cover the screen
      if (!sequenceStartedRef.current && pressedRef.current.size === 7) {
        let minScale = Infinity;
        for (let i = 0; i < spots.length; i++) {
          if (spots[i].scale < minScale) minScale = spots[i].scale;
        }
        if (minScale >= INK_COVER_THRESHOLD) {
          sequenceStartedRef.current = true;
          blackoutRef.current = true;
          setScreenCovered(true);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [inkSpots.length]);

  let keyIndex = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <style>{`
        .letter-key {
          color: white;
          -webkit-text-stroke: 1px black;
          text-shadow: var(--shadow-full);
          transform: translate(0px, 0px);
          transition: all 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .letter-key:hover:not(.pressed) {
          text-shadow: var(--shadow-half);
          transform: translate(-4px, 4px);
          transition: all 150ms ease-in;
        }

        .letter-key:active:not(.pressed),
        .letter-key.pressed {
          text-shadow: none;
          transform: translate(-8px, 8px);
          transition: all 50ms ease-out;
        }

        @keyframes seamDraw {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
      {!doorsReady && inkSpots.map((spot, i) => (
        <div
          key={i}
          ref={(el) => { spotElsRef.current[i] = el; }}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: spot.x,
            top: spot.y,
            width: 1,
            height: 1,
            backgroundColor: spot.color,
            opacity: INK_OPACITY,
            mixBlendMode: "multiply",
            transform: "translate(-50%, -50%) scale(1)",
          }}
        />
      ))}
      {screenCovered && (
        <div className="fixed inset-0 z-[55] bg-black"
          style={{
            opacity: blackout && !doorsSwinging ? 1 : 0,
            transition: doorsSwinging ? "opacity 1800ms ease-out" : "opacity 500ms ease-in",
          }}
        />
      )}
      {doorsReady && (
        <iframe
          src="/"
          className="fixed inset-0 z-[58] border-none"
          style={{
            width: "100%", height: "100%",
            opacity: doorsSwinging ? 1 : 0,
            transition: "opacity 600ms ease-out 1200ms",
          }}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
      {doorsReady && (
        <div className="fixed inset-0 z-[60]" style={{
          perspective: "800px",
          perspectiveOrigin: "50% 85%",
          transformStyle: "preserve-3d",
          opacity: doorsSwinging ? 0 : 1,
          transition: "opacity 1600ms ease-in 800ms",
        }}>
          {/* Left door — hinges on left edge */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
            transformOrigin: "left center",
            transform: doorsSwinging ? "rotateY(85deg)" : "rotateY(0deg)",
            transition: "transform 2400ms cubic-bezier(0.15, 0.0, 0.2, 1)",
            transformStyle: "preserve-3d",
          }}>
            {/* Door face */}
            <div style={{ position: "absolute", inset: 0, backgroundColor: "black" }} />
            {/* Door edge — 20px thick, slightly lighter, perpendicular to face */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: "20px", height: "100%",
              backgroundColor: "#1a1a1a",
              transformOrigin: "right center",
              transform: "rotateY(90deg)",
            }} />
          </div>
          {/* Right door — hinges on right edge */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
            transformOrigin: "right center",
            transform: doorsSwinging ? "rotateY(-85deg)" : "rotateY(0deg)",
            transition: "transform 2400ms cubic-bezier(0.15, 0.0, 0.2, 1)",
            transformStyle: "preserve-3d",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundColor: "black" }} />
            <div style={{
              position: "absolute", top: 0, left: 0, width: "20px", height: "100%",
              backgroundColor: "#1a1a1a",
              transformOrigin: "left center",
              transform: "rotateY(-90deg)",
            }} />
          </div>
        </div>
      )}
      {seamVisible && (
        <div className="fixed top-0 z-[65]" style={{
          left: "50%", width: "2px", height: "100%",
          backgroundColor: "white",
          transformOrigin: "top",
          animation: "seamDraw 600ms ease-out forwards",
          opacity: doorsSwinging ? 0 : 1,
          transition: "opacity 500ms ease-out",
        }} />
      )}
      <div className="flex items-center gap-4 md:gap-8"
        style={{
          transition: "opacity 700ms ease-in, transform 700ms ease-in",
          opacity: lettersSinking ? 0 : 1,
          transform: lettersSinking ? "translateY(40px)" : "translateY(0)",
        }}
      >
        {WORDS.map((word, wordIdx) => (
          <div key={wordIdx} className="flex gap-0 md:gap-2">
            {word.split("").map((letter) => {
              const idx = keyIndex++;
              const isPressed = pressedKeys.has(idx);
              return (
                <button
                  key={idx}
                  ref={(el) => { keyRefs.current[idx] = el; }}
                  type="button"
                  onClick={() => handlePress(idx)}
                  className={`letter-key ${titanOne.className} cursor-pointer select-none text-4xl md:text-7xl leading-none${
                    isPressed ? " pressed" : ""
                  }`}
                  style={{
                    "--shadow-full": buildExtrusion(LETTER_COLORS[idx], 8),
                    "--shadow-half": buildExtrusion(LETTER_COLORS[idx], 4),
                  } as React.CSSProperties}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
