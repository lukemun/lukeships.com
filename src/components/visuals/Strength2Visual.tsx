"use client";

import { useState, useEffect, useCallback } from "react";

const SOLVED_STRUCTURES = [
  {
    id: "evolution",
    label: "Evolutionary Biology",
    icon: "🧬",
    color: "#10B981",
    nodes: [
      { label: "Natural Selection", x: 0.12, y: 0.2 },
      { label: "Niche Adaptation", x: 0.12, y: 0.4 },
      { label: "Mutation", x: 0.12, y: 0.6 },
      { label: "Fitness Landscape", x: 0.12, y: 0.8 },
    ],
    connections: [[0,1],[1,2],[2,3],[0,3]] as [number, number][],
  },
  {
    id: "poker",
    label: "Poker Strategy",
    icon: "♠️",
    color: "#E8453C",
    nodes: [
      { label: "Position", x: 0.12, y: 0.2 },
      { label: "Pot Odds", x: 0.12, y: 0.4 },
      { label: "Bluff Equity", x: 0.12, y: 0.6 },
      { label: "Range Reading", x: 0.12, y: 0.8 },
    ],
    connections: [[0,1],[1,2],[2,3],[0,2]] as [number, number][],
  },
  {
    id: "music",
    label: "Music Composition",
    icon: "🎵",
    color: "#A855F7",
    nodes: [
      { label: "Tension", x: 0.12, y: 0.2 },
      { label: "Resolution", x: 0.12, y: 0.4 },
      { label: "Counterpoint", x: 0.12, y: 0.6 },
      { label: "Rhythm", x: 0.12, y: 0.8 },
    ],
    connections: [[0,1],[1,2],[2,3],[0,3]] as [number, number][],
  },
  {
    id: "thermo",
    label: "Thermodynamics",
    icon: "🔥",
    color: "#F59E0B",
    nodes: [
      { label: "Entropy", x: 0.12, y: 0.2 },
      { label: "Energy States", x: 0.12, y: 0.4 },
      { label: "Equilibrium", x: 0.12, y: 0.6 },
      { label: "Phase Transitions", x: 0.12, y: 0.8 },
    ],
    connections: [[0,1],[1,2],[2,3],[0,2]] as [number, number][],
  },
];

const TARGET_DOMAINS = [
  {
    id: "startup",
    label: "Startup Strategy",
    mappings: {
      evolution: ["Competitive Fitness", "Market Niche", "Pivoting", "Market Topology"],
      poker: ["Market Timing", "Risk/Reward Calc", "Positioning Bluffs", "Competitor Reads"],
      music: ["Customer Anticipation", "Value Delivery", "Competing Signals", "Engagement Cadence"],
      thermo: ["Org. Disorder", "Resource Allocation", "Market Stability", "Growth Inflections"],
    } as Record<string, string[]>,
    breakdowns: {
      evolution: "Startups can choose their fitness landscape. Species can't.",
      poker: "In poker, the game ends. In markets, infinite repeat play changes everything.",
      music: "Music has an audience. Startups must create their audience first.",
      thermo: "Companies can import energy (funding). Thermodynamic systems are closed.",
    } as Record<string, string>,
  },
];

const TRANSFER_ZONE_X = 0.5;

export default function Strength2Visual() {
  const [selectedDomain, setSelectedDomain] = useState(0);
  const [transferActive, setTransferActive] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showMappings, setShowMappings] = useState(false);

  const solved = SOLVED_STRUCTURES[selectedDomain];
  const target = TARGET_DOMAINS[0];
  const mappings = target.mappings[solved.id];
  const breakdown = target.breakdowns[solved.id];

  const handleDomainChange = useCallback((idx: number) => {
    setTransferActive(false);
    setShowBreakdown(false);
    setShowMappings(false);
    setSelectedDomain(idx);
    setTimeout(() => { setTransferActive(true); setShowMappings(true); }, 300);
    setTimeout(() => setShowBreakdown(true), 1200);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => { setTransferActive(true); setShowMappings(true); }, 500);
    const t2 = setTimeout(() => setShowBreakdown(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const W = 700, H = 220, padX = 20, padY = 10;

  return (
    <div style={{ color: "#E2E8F0", fontFamily: "var(--font-sans), sans-serif", padding: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>

      <div style={{ maxWidth: 960, width: "100%", marginBottom: 10 }}>
        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Choose a solved domain to map from</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SOLVED_STRUCTURES.map((s, i) => (
            <button key={s.id} onClick={() => handleDomainChange(i)} style={{ padding: "10px 16px", background: selectedDomain === i ? `${s.color}15` : "rgba(15,22,41,0.6)", border: `1px solid ${selectedDomain === i ? s.color + "50" : "rgba(148,163,184,0.08)"}`, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s ease" }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 500, color: selectedDomain === i ? s.color : "#94A3B8" }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "linear-gradient(180deg, #0F1629 0%, #131B2E 100%)", borderRadius: 16, border: "1px solid rgba(148,163,184,0.08)", padding: "16px 20px 12px", maxWidth: 960, width: "100%", boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}>
        <svg viewBox={`0 0 ${W + padX * 2} ${H + padY * 2}`} style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            <linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={solved.color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={solved.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
            <filter id="ng"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          <rect x={padX + TRANSFER_ZONE_X * W - 30} y={padY} width={60} height={H} rx={8} fill="url(#tg)" opacity={transferActive ? 0.5 : 0} style={{ transition: "opacity 0.6s ease" }} />
          <text x={padX + TRANSFER_ZONE_X * W} y={padY + 16} textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="var(--font-mono), monospace" letterSpacing="0.15em" opacity={transferActive ? 1 : 0} style={{ transition: "opacity 0.5s ease 0.2s" }}>STRUCTURE TRANSFER</text>
          <text x={padX + 0.12 * W} y={padY + 12} textAnchor="middle" fill={solved.color} fontSize="9" fontFamily="var(--font-mono), monospace" fontWeight="500" letterSpacing="0.08em">{solved.label.toUpperCase()}</text>
          <text x={padX + 0.88 * W} y={padY + 12} textAnchor="middle" fill="#3B82F6" fontSize="9" fontFamily="var(--font-mono), monospace" fontWeight="500" letterSpacing="0.08em">STARTUP STRATEGY</text>

          {solved.connections.map(([a, b], i) => {
            const n1 = solved.nodes[a], n2 = solved.nodes[b];
            return <line key={`sc-${i}`} x1={padX + n1.x * W} y1={padY + n1.y * H} x2={padX + n2.x * W} y2={padY + n2.y * H} stroke={solved.color} strokeWidth={1} strokeOpacity={0.2} />;
          })}
          {solved.connections.map(([a, b], i) => (
            <line key={`tc-${i}`} x1={padX + 0.88 * W} y1={padY + solved.nodes[a].y * H} x2={padX + 0.88 * W} y2={padY + solved.nodes[b].y * H} stroke="#3B82F6" strokeWidth={1} strokeOpacity={showMappings ? 0.2 : 0} style={{ transition: "stroke-opacity 0.6s ease 0.8s" }} />
          ))}

          {solved.nodes.map((node, i) => {
            const sx = padX + node.x * W + 60, sy = padY + node.y * H, tx = padX + 0.88 * W - 70;
            const midX = (sx + tx) / 2, midY = sy - 8;
            return <path key={`ar-${i}`} d={`M ${sx} ${sy} Q ${midX} ${midY} ${tx} ${sy}`} fill="none" stroke={solved.color} strokeWidth={1.5} strokeDasharray="6 3" opacity={showMappings ? 0.5 : 0} style={{ transition: `opacity 0.4s ease ${i * 0.15}s` }} />;
          })}

          {solved.nodes.map((node, i) => {
            const cx = padX + node.x * W, cy = padY + node.y * H;
            return (
              <g key={`src-${i}`}>
                <circle cx={cx} cy={cy} r={18} fill={solved.color} opacity={0.08} />
                <circle cx={cx} cy={cy} r={5} fill={solved.color} opacity={0.7} filter="url(#ng)" />
                <text x={cx + 14} y={cy + 4} fill="#CBD5E1" fontSize="10.5" fontFamily="var(--font-sans)" fontWeight="500">{node.label}</text>
              </g>
            );
          })}

          {mappings.map((label, i) => {
            const cy = padY + solved.nodes[i].y * H, cx = padX + 0.88 * W;
            return (
              <g key={`tgt-${i}`} opacity={showMappings ? 1 : 0} style={{ transition: `opacity 0.4s ease ${0.4 + i * 0.15}s` }}>
                <circle cx={cx} cy={cy} r={18} fill="#3B82F6" opacity={0.08} />
                <circle cx={cx} cy={cy} r={5} fill="#3B82F6" opacity={0.7} filter="url(#ng)" />
                <text x={cx - 14} y={cy + 4} textAnchor="end" fill="#CBD5E1" fontSize="10.5" fontFamily="var(--font-sans)" fontWeight="500">{label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ maxWidth: 960, width: "100%", marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 340px", padding: "18px 20px", background: `${solved.color}08`, border: `1px solid ${solved.color}20`, borderRadius: 12, opacity: showMappings ? 1 : 0, transform: showMappings ? "translateY(0)" : "translateY(8px)", transition: "all 0.5s ease" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Structure Map</div>
          {solved.nodes.map((node, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < 3 ? 8 : 0, fontSize: 12.5, fontFamily: "var(--font-sans)" }}>
              <span style={{ color: solved.color, fontWeight: 500, minWidth: 110 }}>{node.label}</span>
              <span style={{ color: "#475569" }}>{"\u2192"}</span>
              <span style={{ color: "#93C5FD", fontWeight: 500 }}>{mappings[i]}</span>
            </div>
          ))}
        </div>
        <div style={{ flex: "1 1 300px", padding: "18px 20px", background: "rgba(248,113,113,0.04)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 12, opacity: showBreakdown ? 1 : 0, transform: showBreakdown ? "translateY(0)" : "translateY(8px)", transition: "all 0.5s ease" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#F87171", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>⚡ Where the analogy breaks</div>
          <div style={{ fontSize: 13, color: "#CBD5E1", lineHeight: 1.7, fontFamily: "var(--font-sans)" }}>{breakdown}</div>
          <div style={{ fontSize: 11.5, color: "#64748B", lineHeight: 1.6, marginTop: 10, fontFamily: "var(--font-sans)" }}>The breakdown reveals what makes your domain <em>structurally unique</em>.</div>
        </div>
      </div>

      <div style={{ maxWidth: 960, width: "100%", marginTop: 16, padding: "14px 20px", background: "rgba(15,22,41,0.5)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 10 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Database analogy</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#64748B", lineHeight: 1.8 }}>
          <span style={{ color: "#E8453C" }}>SELECT</span> <span style={{ color: "#94A3B8" }}>*</span> <span style={{ color: "#E8453C" }}>FROM</span> <span style={{ color: solved.color }}>{solved.id}_strategy</span> <span style={{ color: "#F59E0B" }}>CROSS JOIN</span> <span style={{ color: "#3B82F6" }}>startup_problems</span> <span style={{ color: "#E8453C" }}>ON</span> <span style={{ color: "#CBD5E1" }}>structural_shape</span>
          <br /><span style={{ color: "#475569" }}>{"\u2014"} Rows that exist in no single source table. Novel by construction.</span>
        </div>
      </div>
    </div>
  );
}
