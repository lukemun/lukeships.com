"use client";

import { useState } from "react";

const DIMENSIONS = [
  { id: "tone", label: "Tone", options: ["Urgent", "Playful", "Authoritative", "Vulnerable", "Provocative"] },
  { id: "angle", label: "Angle", options: ["Pain point", "Aspiration", "Curiosity", "Social proof", "Contrarian"] },
  { id: "length", label: "Length", options: ["6 words", "12 words", "25 words"] },
  { id: "audience", label: "Audience", options: ["Technical", "Executive", "Creative", "Skeptic"] },
];

const HEADLINES = [
  { text: "Boost Your Team's Productivity Today", dims: [2, 1, 0, 1], score: 22, tier: "generic", note: "The statistical centroid. Could be any product." },
  { text: "Collaboration Made Simple for Everyone", dims: [1, 1, 0, 1], score: 18, tier: "generic", note: "Equally generic. \"Made simple\" is the most overused phrase in SaaS." },
  { text: "Work Smarter, Not Harder — Try It Free", dims: [0, 1, 1, 1], score: 25, tier: "generic", note: "A cliché wrapped in a cliché. Options 1-3 are always like this." },
  { text: "Your Standup Meeting Is Stealing 11 Hours a Week", dims: [0, 0, 1, 3], score: 64, tier: "better", note: "Now we're naming a specific enemy with a specific number." },
  { text: "We Analyzed 10,000 Slack Messages. Most Were Useless.", dims: [4, 2, 1, 0], score: 71, tier: "better", note: "Curiosity + data = attention. Starting to get interesting." },
  { text: "What If Your Team Never Had Another Status Meeting?", dims: [1, 2, 1, 1], score: 58, tier: "better", note: "Good angle but still generic execution." },
  { text: "Your Best Engineer Spends 40% of Their Time Not Engineering", dims: [4, 0, 2, 3], score: 82, tier: "novel", note: "Option 7: The obvious approaches exhausted. This reframes the entire problem." },
  { text: "Basecamp Killed Their Standups. Their Shipping Speed Doubled.", dims: [2, 3, 1, 1], score: 85, tier: "novel", note: "Option 8: Social proof + specific outcome. Concrete and credible." },
  { text: "The Meeting You Just Scheduled Already Has an AI Replacement", dims: [4, 4, 2, 0], score: 89, tier: "novel", note: "Option 9: Provocative + immediate. Makes you pause and think." },
  { text: "Delete Slack. (We're Serious.)", dims: [4, 4, 0, 3], score: 91, tier: "novel", note: "Option 10: Pure provocation. Most polarizing — and most memorable." },
];

const TIER_CONFIG: Record<string, { color: string; label: string; bg: string }> = {
  generic: { color: "#64748B", label: "GENERIC", bg: "#64748B10" },
  better: { color: "#F59E0B", label: "BETTER", bg: "#F59E0B10" },
  novel: { color: "#10B981", label: "NOVEL", bg: "#10B98110" },
};

export default function Strength7Visual() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const addMore = () => {
    setVisibleCount(Math.min(visibleCount + 1, HEADLINES.length));
  };

  return (
    <div style={{ color: "#E2E8F0", fontFamily: "var(--font-sans), sans-serif", padding: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>

      <div style={{ maxWidth: 960, width: "100%", marginBottom: 28 }}>
        <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: "#64748B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Strength 07 / 07</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px 0", lineHeight: 1.15, background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rapid Combinatorial Exploration</h1>
        <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.65, margin: 0, maxWidth: 820 }}>
          No human generates 10 variations in 30 seconds spanning different <strong style={{ color: "#CBD5E1" }}>dimensions of variation</strong> simultaneously. Ask for 3 and you get clichés. Ask for 10 and <strong style={{ color: "#10B981" }}>options 7–10 are where the interesting ideas live</strong> — the obvious approaches exhaust by option 5.
        </p>
      </div>

      {/* Dimensions */}
      <div style={{ maxWidth: 960, width: "100%", marginBottom: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {DIMENSIONS.map((d) => (
          <div key={d.id} style={{ flex: "1 1 140px", padding: "10px 12px", background: "rgba(15,22,41,0.5)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 8 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{d.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {d.options.map((o, i) => (
                <span key={i} style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "#94A3B8", padding: "2px 6px", background: "rgba(148,163,184,0.06)", borderRadius: 3 }}>{o}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Headlines List */}
      <div style={{ maxWidth: 960, width: "100%", marginBottom: 16 }}>
        <div style={{ background: "linear-gradient(180deg, #0F1629, #131B2E)", borderRadius: 14, border: "1px solid rgba(148,163,184,0.08)", padding: "20px 24px", boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Generated variations — showing {visibleCount} of 10
            </div>
            {visibleCount < 10 && (
              <button onClick={addMore} style={{
                padding: "6px 14px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: 6, cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 10, color: "#3B82F6",
                letterSpacing: "0.05em",
              }}>
                + GENERATE NEXT
              </button>
            )}
          </div>

          {HEADLINES.slice(0, visibleCount).map((h, i) => {
            const tier = TIER_CONFIG[h.tier];
            const isHovered = hoveredIdx === i;
            const isNovel = h.tier === "novel";
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  padding: "12px 16px", marginBottom: 6,
                  background: isHovered ? tier.bg : "rgba(0,0,0,0.1)",
                  border: `1px solid ${isHovered ? tier.color + "30" : "transparent"}`,
                  borderRadius: 8, cursor: "default",
                  transition: "all 0.2s ease",
                  borderLeft: isNovel ? `3px solid ${tier.color}` : "3px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: isHovered ? 6 : 0 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", minWidth: 14 }}>#{i + 1}</span>
                  <span style={{ fontSize: 14, color: h.tier === "generic" ? "#94A3B8" : "#CBD5E1", fontWeight: h.tier === "novel" ? 600 : 400, flex: 1, textDecoration: h.tier === "generic" && visibleCount > 5 ? "line-through" : "none", textDecorationColor: "#475569" }}>
                    {h.text}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* Score bar mini */}
                    <div style={{ width: 50, height: 4, background: "rgba(0,0,0,0.3)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${h.score}%`, height: "100%", background: tier.color, borderRadius: 2, transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: tier.color, letterSpacing: "0.05em", minWidth: 50 }}>{tier.label}</span>
                  </div>
                </div>
                {isHovered && (
                  <div style={{ marginLeft: 24, fontSize: 11.5, color: "#64748B", lineHeight: 1.5, fontFamily: "var(--font-sans)" }}>
                    {h.note}
                    <div style={{ marginTop: 4, display: "flex", gap: 4 }}>
                      {DIMENSIONS.map((d, di) => (
                        <span key={di} style={{ fontSize: 9, fontFamily: "var(--font-mono)", padding: "1px 5px", background: "rgba(148,163,184,0.06)", borderRadius: 3, color: "#94A3B8" }}>
                          {d.label}: {d.options[h.dims[di]]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {visibleCount >= 7 && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: 8 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#10B981", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                {"\u26A1"} The sweet spot: options 7–10
              </div>
              <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>
                By option 7, the model has exhausted the "safe" center of its training distribution. It's now forced to explore unusual combinations — different tone × angle × audience intersections it wouldn't reach with fewer requested variations. This is why "give me 10" beats "give me 3" even if you only use one.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* The Principle */}
      <div style={{ maxWidth: 960, width: "100%", display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 340px", padding: "16px 18px", background: "rgba(232,69,60,0.04)", border: "1px solid rgba(232,69,60,0.12)", borderRadius: 12 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#E8453C", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>The wrong way</div>
          <div style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.65 }}>
            "Give me a headline for my product" {"\u2192"} Get 1 cliché. Accept it. Move on.
          </div>
        </div>
        <div style={{ flex: "1 1 340px", padding: "16px 18px", background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: 12 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#10B981", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>The right way</div>
          <div style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.65 }}>
            "Give me 10 headlines that each use a fundamentally different persuasion angle" {"\u2192"} Scan options 7-10. Use human judgment to pick. Refine.
          </div>
        </div>
      </div>

      {/* DB Analogy */}
      <div style={{ maxWidth: 960, width: "100%", marginTop: 16, padding: "14px 20px", background: "rgba(15,22,41,0.5)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 10 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Database analogy</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#64748B", lineHeight: 1.8 }}>
          <span style={{ color: "#E8453C" }}>SELECT TOP 10</span> <span style={{ color: "#94A3B8" }}>headline</span> <span style={{ color: "#E8453C" }}>FROM</span> <span style={{ color: "#CBD5E1" }}>possibilities</span><br />
          <span style={{ color: "#E8453C" }}>WHERE</span> <span style={{ color: "#F59E0B" }}>each_row.angle != previous_row.angle</span><br />
          <span style={{ color: "#E8453C" }}>ORDER BY</span> <span style={{ color: "#10B981" }}>novelty DESC</span><br />
          <span style={{ color: "#475569" }}>— Full scan across the possibility space. LIMIT 3 only returns generic; LIMIT 10 forces exploration into rare rows.</span>
        </div>
      </div>
    </div>
  );
}
