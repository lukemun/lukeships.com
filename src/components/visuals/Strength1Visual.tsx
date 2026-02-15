"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const DOMAINS = [
  { id: "consulting", label: "Consulting Frameworks", color: "#E8453C", x: 0.18, y: 0.22, size: 38, docs: "~2.4M docs" },
  { id: "academic", label: "Academic Papers", color: "#3B82F6", x: 0.78, y: 0.18, size: 42, docs: "~8.1M docs" },
  { id: "reddit", label: "Reddit Discussions", color: "#FF6B2B", x: 0.15, y: 0.72, size: 44, docs: "~12M posts" },
  { id: "sec", label: "SEC Filings", color: "#10B981", x: 0.82, y: 0.68, size: 32, docs: "~1.8M docs" },
  { id: "blogs", label: "Blog Posts & Articles", color: "#A855F7", x: 0.5, y: 0.82, size: 46, docs: "~15M posts" },
  { id: "books", label: "Published Books", color: "#F59E0B", x: 0.35, y: 0.42, size: 36, docs: "~4.2M books" },
  { id: "code", label: "Code Repositories", color: "#06B6D4", x: 0.68, y: 0.42, size: 40, docs: "~6.7M repos" },
];

const SCENARIOS = [
  {
    id: "vanilla",
    label: "Generic Prompt",
    prompt: '"What should my pricing strategy be?"',
    description: "Hits the statistical center — the most average, most common blend of all training patterns. You get safe, forgettable advice.",
    pullTo: { x: 0.5, y: 0.48 },
    weights: { consulting: 0.18, academic: 0.12, reddit: 0.15, sec: 0.08, blogs: 0.2, books: 0.15, code: 0.02 } as Record<string, number>,
    outputLabel: "CENTROID OUTPUT",
    outputColor: "#94A3B8",
  },
  {
    id: "constrained",
    label: "Constrained Prompt",
    prompt: '"As a behavioral economist analyzing loss aversion in SaaS pricing…"',
    description: "Activates academic + consulting clusters heavily, suppresses Reddit and blog patterns. Output draws on deeper, more specialized knowledge.",
    pullTo: { x: 0.42, y: 0.25 },
    weights: { consulting: 0.32, academic: 0.35, reddit: 0.02, sec: 0.12, blogs: 0.05, books: 0.12, code: 0.02 } as Record<string, number>,
    outputLabel: "SPECIALIZED OUTPUT",
    outputColor: "#3B82F6",
  },
  {
    id: "cross",
    label: "Cross-Domain Prompt",
    prompt: '"Analyze my pricing using poker strategy: position, pot odds, and bluff equity."',
    description: "Forces a JOIN between training clusters that never normally connect. The model must compute novel relationships — producing insights that exist in no single training document.",
    pullTo: { x: 0.32, y: 0.58 },
    weights: { consulting: 0.15, academic: 0.08, reddit: 0.28, sec: 0.05, blogs: 0.12, books: 0.22, code: 0.1 } as Record<string, number>,
    outputLabel: "EDGE OUTPUT",
    outputColor: "#E8453C",
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function Particle({ x, y, size, color, opacity, delay }: { x: number; y: number; size: number; color: string; opacity: number; delay: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      opacity={opacity}
      style={{
        animation: `pulse ${2 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

function generateParticles(domain: typeof DOMAINS[number], canvasW: number, canvasH: number, pad: number) {
  const particles = [];
  const count = 12;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 15 + Math.random() * (domain.size * 0.9);
    particles.push({
      x: pad + domain.x * canvasW + Math.cos(angle) * dist,
      y: pad + domain.y * canvasH + Math.sin(angle) * dist,
      size: 1.5 + Math.random() * 2.5,
      color: domain.color,
      opacity: 0.15 + Math.random() * 0.3,
      delay: Math.random() * 3,
    });
  }
  return particles;
}

export default function Strength1Visual() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [animProgress, setAnimProgress] = useState(1);
  const [prevTarget, setPrevTarget] = useState(SCENARIOS[0].pullTo);
  const [currentPos, setCurrentPos] = useState(SCENARIOS[0].pullTo);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const scenario = SCENARIOS[activeScenario];
  const canvasW = 580;
  const canvasH = 260;
  const pad = 20;

  const handleScenarioChange = useCallback(
    (idx: number) => {
      if (idx === activeScenario) return;
      setPrevTarget(currentPos);
      setActiveScenario(idx);
      setAnimProgress(0);
      startTimeRef.current = null;
    },
    [activeScenario, currentPos]
  );

  useEffect(() => {
    if (animProgress >= 1) return;
    const target = SCENARIOS[activeScenario].pullTo;
    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const duration = 800;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimProgress(eased);
      setCurrentPos({
        x: lerp(prevTarget.x, target.x, eased),
        y: lerp(prevTarget.y, target.y, eased),
      });
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeScenario, animProgress, prevTarget]);

  const cursorX = pad + currentPos.x * canvasW;
  const cursorY = pad + currentPos.y * canvasH;

  const allParticles = DOMAINS.flatMap((d) => generateParticles(d, canvasW, canvasH, pad));

  return (
    <div
      style={{
        color: "#E2E8F0",
        fontFamily: "var(--font-sans), sans-serif",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0% { r: 8; opacity: 0.6; }
          100% { r: 28; opacity: 0; }
        }
        @keyframes dashMove {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Main Visualization */}
      <div
        style={{
          background: "linear-gradient(180deg, #0F1629 0%, #131B2E 100%)",
          borderRadius: 16,
          border: "1px solid rgba(148, 163, 184, 0.08)",
          padding: "16px 20px 12px",
          maxWidth: 960,
          width: "100%",
          boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
        }}
      >
        <svg
          viewBox={`0 0 ${canvasW + pad * 2} ${canvasH + pad * 2}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            {DOMAINS.map((d) => (
              <radialGradient key={d.id} id={`glow-${d.id}`}>
                <stop offset="0%" stopColor={d.color} stopOpacity="0.25" />
                <stop offset="60%" stopColor={d.color} stopOpacity="0.06" />
                <stop offset="100%" stopColor={d.color} stopOpacity="0" />
              </radialGradient>
            ))}
            <radialGradient id="cursor-glow">
              <stop offset="0%" stopColor={scenario.outputColor} stopOpacity="0.5" />
              <stop offset="50%" stopColor={scenario.outputColor} stopOpacity="0.1" />
              <stop offset="100%" stopColor={scenario.outputColor} stopOpacity="0" />
            </radialGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background particles */}
          {allParticles.map((p, i) => (
            <Particle key={i} {...p} />
          ))}

          {/* Connection lines from domains to cursor */}
          {DOMAINS.map((d) => {
            const weight = scenario.weights[d.id];
            const dx = pad + d.x * canvasW;
            const dy = pad + d.y * canvasH;
            return (
              <line
                key={`line-${d.id}`}
                x1={dx}
                y1={dy}
                x2={cursorX}
                y2={cursorY}
                stroke={d.color}
                strokeWidth={weight * 5}
                strokeOpacity={weight * 0.6 + 0.05}
                strokeDasharray={`${weight * 8} ${4}`}
                style={{
                  transition: "stroke-width 0.6s ease, stroke-opacity 0.6s ease",
                }}
              />
            );
          })}

          {/* Domain clusters */}
          {DOMAINS.map((d) => {
            const cx = pad + d.x * canvasW;
            const cy = pad + d.y * canvasH;
            const weight = scenario.weights[d.id];
            const scale = 0.6 + weight * 1.2;
            return (
              <g key={d.id}>
                {/* Glow */}
                <circle cx={cx} cy={cy} r={d.size * 1.8} fill={`url(#glow-${d.id})`} />
                {/* Core */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={d.size * scale * 0.5}
                  fill={d.color}
                  opacity={0.15 + weight * 0.4}
                  style={{ transition: "all 0.6s ease" }}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={d.size * scale * 0.25}
                  fill={d.color}
                  opacity={0.4 + weight * 0.4}
                  style={{ transition: "all 0.6s ease" }}
                />
                {/* Label */}
                <text
                  x={cx}
                  y={cy - d.size * 0.6 - 8}
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontSize="10"
                  fontFamily="var(--font-sans), sans-serif"
                  fontWeight="500"
                >
                  {d.label}
                </text>
                {/* Weight indicator */}
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fill={d.color}
                  fontSize="11"
                  fontFamily="var(--font-mono), monospace"
                  fontWeight="500"
                  opacity={0.7 + weight * 0.3}
                  style={{ transition: "all 0.6s ease" }}
                >
                  {Math.round(weight * 100)}%
                </text>
                <text
                  x={cx}
                  y={cy + 17}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="8"
                  fontFamily="var(--font-mono), monospace"
                >
                  {d.docs}
                </text>
              </g>
            );
          })}

          {/* Output cursor */}
          <circle cx={cursorX} cy={cursorY} r={50} fill={`url(#cursor-glow)`} />
          <circle
            cx={cursorX}
            cy={cursorY}
            r={8}
            fill={scenario.outputColor}
            filter="url(#softGlow)"
            style={{ transition: "fill 0.5s ease" }}
          />
          <circle
            cx={cursorX}
            cy={cursorY}
            r={8}
            fill="none"
            stroke={scenario.outputColor}
            strokeWidth="1.5"
            opacity="0.5"
            style={{ animation: "ringPulse 2s ease-out infinite" }}
          />
          {/* Cursor label */}
          <rect
            x={cursorX - 52}
            y={cursorY + 16}
            width={104}
            height={20}
            rx={4}
            fill="#0B0F1A"
            opacity="0.85"
          />
          <text
            x={cursorX}
            y={cursorY + 30}
            textAnchor="middle"
            fill={scenario.outputColor}
            fontSize="9"
            fontFamily="var(--font-mono), monospace"
            fontWeight="500"
            letterSpacing="0.08em"
            style={{ transition: "fill 0.5s ease" }}
          >
            {scenario.outputLabel}
          </text>
        </svg>
      </div>

      {/* Scenario Selector */}
      <div style={{ maxWidth: 960, width: "100%", marginTop: 24 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            color: "#475569",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Select prompt type to see how the blend shifts
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(i)}
              style={{
                flex: "1 1 200px",
                padding: "14px 16px",
                background: activeScenario === i
                  ? `linear-gradient(135deg, ${s.outputColor}18, ${s.outputColor}08)`
                  : "rgba(15, 22, 41, 0.6)",
                border: `1px solid ${activeScenario === i ? s.outputColor + "50" : "rgba(148,163,184,0.08)"}`,
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {activeScenario === i && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 3,
                    height: "100%",
                    background: s.outputColor,
                    borderRadius: "3px 0 0 3px",
                  }}
                />
              )}
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: activeScenario === i ? s.outputColor : "#94A3B8",
                  marginBottom: 4,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 10.5,
                  color: "#64748B",
                  lineHeight: 1.5,
                }}
              >
                {s.prompt}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation Card */}
      <div
        key={activeScenario}
        style={{
          maxWidth: 960,
          width: "100%",
          marginTop: 16,
          padding: "20px 24px",
          background: `linear-gradient(135deg, ${scenario.outputColor}08, transparent)`,
          border: `1px solid ${scenario.outputColor}20`,
          borderRadius: 12,
          animation: "fadeIn 0.4s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: `${scenario.outputColor}15`,
              border: `1px solid ${scenario.outputColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 14,
              color: scenario.outputColor,
              fontWeight: 600,
            }}
          >
            {activeScenario === 0 ? "\u2295" : activeScenario === 1 ? "\u25CE" : "\u27D0"}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#CBD5E1",
                marginBottom: 6,
                fontFamily: "var(--font-sans), sans-serif",
              }}
            >
              {scenario.label === "Generic Prompt"
                ? "Why this produces boring output"
                : scenario.label === "Constrained Prompt"
                ? "Why this produces expert-quality output"
                : "Why this produces novel insights"}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#94A3B8",
                lineHeight: 1.7,
                fontFamily: "var(--font-sans), sans-serif",
              }}
            >
              {scenario.description}
            </div>
          </div>
        </div>
      </div>

      {/* DB analogy */}
      <div
        style={{
          maxWidth: 960,
          width: "100%",
          marginTop: 20,
          padding: "16px 20px",
          background: "rgba(15, 22, 41, 0.5)",
          border: "1px solid rgba(148,163,184,0.06)",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            color: "#475569",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          The database analogy
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            color: "#64748B",
            lineHeight: 1.8,
          }}
        >
          {activeScenario === 0 && (
            <span>
              <span style={{ color: "#E8453C" }}>SELECT</span>{" "}
              <span style={{ color: "#94A3B8" }}>*</span>{" "}
              <span style={{ color: "#E8453C" }}>FROM</span>{" "}
              <span style={{ color: "#CBD5E1" }}>knowledge</span>
              <span style={{ color: "#64748B" }}> — no filters, no joins.</span>
              <br />
              <span style={{ color: "#64748B" }}>Result: the most common rows. The statistical average.</span>
            </span>
          )}
          {activeScenario === 1 && (
            <span>
              <span style={{ color: "#E8453C" }}>SELECT</span>{" "}
              <span style={{ color: "#94A3B8" }}>*</span>{" "}
              <span style={{ color: "#E8453C" }}>FROM</span>{" "}
              <span style={{ color: "#CBD5E1" }}>knowledge</span>{" "}
              <span style={{ color: "#E8453C" }}>WHERE</span>{" "}
              <span style={{ color: "#3B82F6" }}>domain</span>{" "}
              <span style={{ color: "#94A3B8" }}>IN</span>{" "}
              <span style={{ color: "#10B981" }}>('behavioral_econ','saas_pricing')</span>
              <br />
              <span style={{ color: "#64748B" }}>Result: filtered to specialized rows. Higher signal, less noise.</span>
            </span>
          )}
          {activeScenario === 2 && (
            <span>
              <span style={{ color: "#E8453C" }}>SELECT</span>{" "}
              <span style={{ color: "#94A3B8" }}>*</span>{" "}
              <span style={{ color: "#E8453C" }}>FROM</span>{" "}
              <span style={{ color: "#CBD5E1" }}>pricing</span>{" "}
              <span style={{ color: "#F59E0B" }}>CROSS JOIN</span>{" "}
              <span style={{ color: "#CBD5E1" }}>poker_strategy</span>{" "}
              <span style={{ color: "#E8453C" }}>ON</span>{" "}
              <span style={{ color: "#3B82F6" }}>structural_similarity</span>
              <br />
              <span style={{ color: "#64748B" }}>
                Result: rows that exist in no single table. Computed novelty.
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
