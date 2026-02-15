"use client";

import { useState } from "react";

const CONSTRAINTS = [
  { id: "budget", label: "Budget < $200", type: "hard", color: "#10B981", eliminates: "Paid ads, agency work, expensive tools" },
  { id: "no-social", label: "No social media ads", type: "exclude", color: "#E8453C", eliminates: "Facebook, Instagram, TikTok, LinkedIn ads" },
  { id: "no-content", label: "No content marketing", type: "exclude", color: "#F59E0B", eliminates: "Blog posts, SEO, newsletters, podcasts" },
  { id: "solo", label: "1 person, 2 weeks", type: "hard", color: "#3B82F6", eliminates: "Team campaigns, event sponsorships, PR" },
  { id: "no-cold", label: "No cold outreach", type: "exclude", color: "#A855F7", eliminates: "Cold email, cold calls, LinkedIn DMs" },
  { id: "measurable", label: "Must show signal in 14 days", type: "quality", color: "#06B6D4", eliminates: "Brand building, community, long-tail SEO" },
];

const OUTPUTS = [
  { constraints: 0, label: "Run Facebook ads", tier: "centroid" },
  { constraints: 0, label: "Start a blog", tier: "centroid" },
  { constraints: 0, label: "Post on social media", tier: "centroid" },
  { constraints: 0, label: "Send cold emails", tier: "centroid" },
  { constraints: 0, label: "Try SEO", tier: "centroid" },
  { constraints: 2, label: "Answer Quora questions in niche", tier: "filtered" },
  { constraints: 2, label: "Guest post on industry blog", tier: "filtered" },
  { constraints: 3, label: "Build a free micro-tool that solves one pain", tier: "filtered" },
  { constraints: 4, label: "Reverse-engineer competitor traffic sources", tier: "edge" },
  { constraints: 4, label: "Comment strategy on HN / niche forums", tier: "edge" },
  { constraints: 5, label: "Scrape job postings for pain-point signal", tier: "edge" },
  { constraints: 5, label: "Partner-swap with complementary tool", tier: "edge" },
  { constraints: 6, label: "Micro-tool on PH alternatives (Uneed, etc.)", tier: "novel" },
  { constraints: 6, label: "API integration marketplace listings", tier: "novel" },
  { constraints: 6, label: "Solve 1 problem in public (build-in-open)", tier: "novel" },
];

const TIER_COLORS: Record<string, string> = { centroid: "#94A3B8", filtered: "#F59E0B", edge: "#3B82F6", novel: "#10B981" };
const TIER_LABELS: Record<string, string> = { centroid: "GENERIC", filtered: "FILTERED", edge: "DISTINCTIVE", novel: "NOVEL" };

export default function Strength3Visual() {
  const [activeConstraints, setActiveConstraints] = useState(0);
  const toggleConstraint = (idx: number) => { setActiveConstraints(idx < activeConstraints ? idx : idx + 1); };
  const remainingArea = Math.max(4, 100 - activeConstraints * 16);

  return (
    <div style={{ color: "#E2E8F0", fontFamily: "var(--font-sans), sans-serif", padding: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* Probability Bar */}
      <div style={{ maxWidth: 960, width: "100%", marginBottom: 12 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Output probability space — {remainingArea}% remaining</div>
        <div style={{ width: "100%", height: 32, background: "rgba(15,22,41,0.6)", borderRadius: 8, border: "1px solid rgba(148,163,184,0.08)", display: "flex", overflow: "hidden" }}>
          {CONSTRAINTS.slice(0, activeConstraints).map((c) => (
            <div key={c.id} style={{ width: "16%", height: "100%", background: `${c.color}30`, borderRight: "1px solid rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s ease" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: c.color }}>{"\u2715"}</span>
            </div>
          ))}
          <div style={{ flex: 1, height: "100%", background: activeConstraints >= 5 ? "linear-gradient(90deg, #10B98120, #10B98108)" : activeConstraints >= 3 ? "linear-gradient(90deg, #3B82F620, #3B82F608)" : "rgba(148,163,184,0.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s ease" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: activeConstraints >= 5 ? "#10B981" : activeConstraints >= 3 ? "#3B82F6" : "#64748B", transition: "color 0.4s ease" }}>
              {activeConstraints === 0 ? "ENTIRE SPACE (GENERIC)" : activeConstraints < 3 ? "NARROWING..." : activeConstraints < 5 ? "DISTINCTIVE ZONE" : "NOVEL TERRITORY"}
            </span>
          </div>
        </div>
      </div>

      {/* Constraint Toggles */}
      <div style={{ maxWidth: 960, width: "100%", marginBottom: 10 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Click constraints to add/remove</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CONSTRAINTS.map((c, i) => {
            const isActive = i < activeConstraints;
            return (
              <button key={c.id} onClick={() => toggleConstraint(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: isActive ? `${c.color}10` : "rgba(15,22,41,0.4)", border: `1px solid ${isActive ? c.color + "40" : "rgba(148,163,184,0.06)"}`, borderRadius: 8, cursor: "pointer", transition: "all 0.3s ease", textAlign: "left" }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, background: isActive ? c.color : "transparent", border: `2px solid ${isActive ? c.color : "#475569"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", flexShrink: 0 }}>
                  {isActive && <span style={{ color: "#0B0F1A", fontSize: 12, fontWeight: 700 }}>{"\u2713"}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: isActive ? c.color : "#94A3B8", fontFamily: "var(--font-sans)" }}>{c.label}</div>
                  {isActive && <div style={{ fontSize: 11, color: "#64748B", marginTop: 2, fontFamily: "var(--font-sans)" }}>Eliminates: {c.eliminates}</div>}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, padding: "3px 8px", borderRadius: 4, background: c.type === "hard" ? "rgba(59,130,246,0.1)" : c.type === "exclude" ? "rgba(232,69,60,0.1)" : "rgba(6,182,212,0.1)", color: c.type === "hard" ? "#60A5FA" : c.type === "exclude" ? "#F87171" : "#22D3EE", letterSpacing: "0.05em", textTransform: "uppercase" }}>{c.type}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Outputs */}
      <div style={{ maxWidth: 960, width: "100%", display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 320px", padding: "16px 18px", background: "rgba(15,22,41,0.4)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 12 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#EF4444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Eliminated (the clich{"\u00E9"}s)</div>
          {OUTPUTS.filter(o => o.tier === "centroid").map((o, i) => (
            <div key={i} style={{ fontSize: 12.5, fontFamily: "var(--font-sans)", padding: "5px 0", color: activeConstraints > 0 ? "#475569" : "#94A3B8", textDecoration: activeConstraints > 0 ? "line-through" : "none", transition: "all 0.3s ease" }}>{o.label}</div>
          ))}
        </div>
        <div style={{ flex: "1 1 320px", padding: "16px 18px", background: activeConstraints >= 4 ? "rgba(16,185,129,0.04)" : "rgba(15,22,41,0.4)", border: `1px solid ${activeConstraints >= 4 ? "rgba(16,185,129,0.15)" : "rgba(148,163,184,0.06)"}`, borderRadius: 12, transition: "all 0.4s ease" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: activeConstraints >= 4 ? "#10B981" : "#64748B", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, transition: "color 0.3s ease" }}>
            {activeConstraints >= 5 ? "🎯 Novel territory unlocked" : activeConstraints >= 3 ? "Getting distinctive..." : "Add constraints to push past generic"}
          </div>
          {OUTPUTS.filter(o => o.tier !== "centroid").map((o, i) => {
            const visible = o.constraints <= activeConstraints;
            return (
              <div key={i} style={{ fontSize: 12.5, fontFamily: "var(--font-sans)", padding: "5px 0", display: "flex", alignItems: "center", gap: 8, opacity: visible ? 1 : 0.15, transform: visible ? "translateX(0)" : "translateX(-4px)", transition: "all 0.4s ease" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: TIER_COLORS[o.tier], flexShrink: 0 }} />
                <span style={{ color: visible ? "#CBD5E1" : "#334155" }}>{o.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: TIER_COLORS[o.tier], letterSpacing: "0.05em", marginLeft: "auto", opacity: visible ? 0.7 : 0 }}>{TIER_LABELS[o.tier]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DB Analogy */}
      <div style={{ maxWidth: 960, width: "100%", marginTop: 16, padding: "14px 20px", background: "rgba(15,22,41,0.5)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 10 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Database analogy</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#64748B", lineHeight: 1.8 }}>
          <span style={{ color: "#E8453C" }}>SELECT</span> <span style={{ color: "#94A3B8" }}>strategy</span> <span style={{ color: "#E8453C" }}>FROM</span> <span style={{ color: "#CBD5E1" }}>marketing</span>
          {activeConstraints >= 1 && <><br /><span style={{ color: "#E8453C" }}>WHERE</span> <span style={{ color: "#10B981" }}>cost &lt; 200</span></>}
          {activeConstraints >= 2 && <><br /><span style={{ color: "#E8453C" }}>AND</span> <span style={{ color: "#CBD5E1" }}>channel</span> <span style={{ color: "#E8453C" }}>NOT IN</span> <span style={{ color: "#F87171" }}>{'(\'facebook\',\'instagram\',\'tiktok\')'}</span></>}
          {activeConstraints >= 3 && <><br /><span style={{ color: "#E8453C" }}>AND</span> <span style={{ color: "#CBD5E1" }}>type</span> <span style={{ color: "#E8453C" }}>NOT IN</span> <span style={{ color: "#F59E0B" }}>{'(\'blog\',\'seo\',\'newsletter\')'}</span></>}
          {activeConstraints >= 4 && <><br /><span style={{ color: "#E8453C" }}>AND</span> <span style={{ color: "#3B82F6" }}>team_size = 1 AND days &lt;= 14</span></>}
          {activeConstraints >= 5 && <><br /><span style={{ color: "#E8453C" }}>AND</span> <span style={{ color: "#CBD5E1" }}>method</span> <span style={{ color: "#E8453C" }}>NOT IN</span> <span style={{ color: "#A855F7" }}>{'(\'cold_email\',\'cold_call\')'}</span></>}
          {activeConstraints >= 6 && <><br /><span style={{ color: "#E8453C" }}>AND</span> <span style={{ color: "#06B6D4" }}>time_to_signal &lt;= 14</span></>}
          <br /><span style={{ color: "#475569" }}>{"\u2014"} {activeConstraints === 0 ? "No filters. Returns the most common rows." : activeConstraints < 4 ? `${activeConstraints} predicates. Noise reducing.` : `${activeConstraints} predicates. Only rare, high-value rows survive.`}</span>
        </div>
      </div>
    </div>
  );
}
