import { useState } from "react";

const ROLES = [
  {
    id: "generic",
    label: "No Role (Default)",
    icon: "💬",
    color: "#94A3B8",
    prompt: '"Analyze this business plan"',
    weights: [
      { domain: "Business strategy", pct: 15, color: "#3B82F6" },
      { domain: "Blog posts & advice", pct: 22, color: "#A855F7" },
      { domain: "Reddit opinions", pct: 18, color: "#FF6B2B" },
      { domain: "Academic theory", pct: 12, color: "#10B981" },
      { domain: "News articles", pct: 16, color: "#F59E0B" },
      { domain: "Self-help books", pct: 17, color: "#E8453C" },
    ],
    output: "This is a solid business plan with good market potential. Consider focusing on customer acquisition and refining your value proposition. Make sure to validate your assumptions.",
    outputLabel: "Spread evenly → generic advice",
  },
  {
    id: "vc",
    label: "Skeptical VC",
    icon: "🦈",
    color: "#E8453C",
    prompt: '"As a skeptical VC who has seen 2,000 pitches this year, evaluate this plan. Focus on unit economics, defensibility, and the top 3 reasons you would pass."',
    weights: [
      { domain: "VC deal memos", pct: 32, color: "#E8453C" },
      { domain: "SEC filings & financials", pct: 24, color: "#10B981" },
      { domain: "Startup post-mortems", pct: 18, color: "#F59E0B" },
      { domain: "Market research", pct: 14, color: "#3B82F6" },
      { domain: "Blog posts", pct: 7, color: "#A855F7" },
      { domain: "Academic theory", pct: 5, color: "#64748B" },
    ],
    output: "Pass. CAC payback is 14mo on a $49/mo product with 8% monthly churn — you lose money on every cohort. Defensibility is zero; this is a feature, not a product. TAM math assumes 100% of addressable market uses a paid tool.",
    outputLabel: "Concentrated on financial patterns → surgical critique",
  },
  {
    id: "operator",
    label: "Ops Expert",
    icon: "⚙️",
    color: "#3B82F6",
    prompt: '"As an operations expert who has scaled 3 companies from 0 to $10M ARR, evaluate this plan. Focus on execution risk, team bottlenecks, and what breaks first at 10x scale."',
    weights: [
      { domain: "Ops playbooks", pct: 28, color: "#3B82F6" },
      { domain: "Engineering docs", pct: 22, color: "#06B6D4" },
      { domain: "Scale-up case studies", pct: 20, color: "#10B981" },
      { domain: "HR & team mgmt", pct: 15, color: "#F59E0B" },
      { domain: "Infrastructure", pct: 10, color: "#A855F7" },
      { domain: "Other", pct: 5, color: "#64748B" },
    ],
    output: "Single-founder risk is critical — you're the only person who can do sales AND product. At 50 customers, support tickets will consume 40% of your time. Your architecture won't handle concurrent users past ~200. Hire support first, not engineering.",
    outputLabel: "Concentrated on execution patterns → operational reality",
  },
  {
    id: "customer",
    label: "Target Customer",
    icon: "🎯",
    color: "#10B981",
    prompt: '"As a developer who manages a team of 8 and is tired of existing tools, evaluate this product. Would you actually pay $49/mo? What would make you switch? What would make you churn after month 2?"',
    weights: [
      { domain: "User reviews & forums", pct: 30, color: "#10B981" },
      { domain: "Product comparisons", pct: 22, color: "#3B82F6" },
      { domain: "Developer communities", pct: 20, color: "#06B6D4" },
      { domain: "Support tickets", pct: 14, color: "#F59E0B" },
      { domain: "Pricing discussions", pct: 9, color: "#E8453C" },
      { domain: "Other", pct: 5, color: "#64748B" },
    ],
    output: "I'd try the free tier but won't pay until it integrates with our existing GitHub workflow. $49/mo is fine IF it saves me one meeting per week. I'd churn when I realize the AI suggestions require 20 minutes of editing — at that point I'd just do it myself.",
    outputLabel: "Concentrated on user experience patterns → buying truth",
  },
];

export default function Strength4Visual() {
  const [selectedRole, setSelectedRole] = useState(0);
  const role = ROLES[selectedRole];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0F1A", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>

      <div style={{ maxWidth: 720, width: "100%", marginBottom: 28 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Strength 04 / 07</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px 0", lineHeight: 1.15, background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Lossy Compression of Expert Knowledge</h1>
        <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.65, margin: 0, maxWidth: 620 }}>
          The model has compressed millions of expert-hours. Role prompting isn't a style trick — it <strong style={{ color: "#CBD5E1" }}>activates different weight regions</strong>, literally changing which knowledge clusters fire. Same question, structurally different analysis.
        </p>
      </div>

      {/* Role Selector */}
      <div style={{ maxWidth: 720, width: "100%", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ROLES.map((r, i) => (
            <button key={r.id} onClick={() => setSelectedRole(i)} style={{
              flex: "1 1 140px", padding: "12px 14px", background: selectedRole === i ? `${r.color}12` : "rgba(15,22,41,0.5)",
              border: `1px solid ${selectedRole === i ? r.color + "50" : "rgba(148,163,184,0.06)"}`,
              borderRadius: 10, cursor: "pointer", textAlign: "center", transition: "all 0.3s ease",
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{r.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: selectedRole === i ? r.color : "#94A3B8", fontFamily: "'DM Sans'" }}>{r.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Display */}
      <div style={{ maxWidth: 720, width: "100%", marginBottom: 16, padding: "12px 16px", background: `${role.color}08`, border: `1px solid ${role.color}20`, borderRadius: 10 }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Prompt</div>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: role.color, lineHeight: 1.6 }}>{role.prompt}</div>
      </div>

      {/* Weight Distribution */}
      <div style={{ maxWidth: 720, width: "100%", marginBottom: 16 }}>
        <div style={{ background: "linear-gradient(180deg, #0F1629, #131B2E)", borderRadius: 14, border: "1px solid rgba(148,163,184,0.08)", padding: "20px 24px", boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            Training cluster activation weights
          </div>
          {role.weights.map((w, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "'DM Sans'" }}>{w.domain}</span>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: w.color, fontWeight: 500 }}>{w.pct}%</span>
              </div>
              <div style={{ width: "100%", height: 8, background: "rgba(15,22,41,0.8)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${w.pct}%`, height: "100%", background: `linear-gradient(90deg, ${w.color}90, ${w.color}50)`,
                  borderRadius: 4, transition: "width 0.6s ease",
                  boxShadow: `0 0 8px ${w.color}30`,
                }} />
              </div>
            </div>
          ))}

          {/* Distribution shape indicator */}
          <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(0,0,0,0.2)", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 24, borderRadius: 4, position: "relative", overflow: "hidden",
              background: selectedRole === 0
                ? "linear-gradient(90deg, #3B82F640, #A855F740, #FF6B2B40, #10B98140, #F59E0B40, #E8453C40)"
                : `linear-gradient(90deg, ${role.color}60, ${role.color}20, transparent)`,
              transition: "background 0.5s ease",
            }} />
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#64748B" }}>
              {selectedRole === 0 ? "Flat distribution → generic blend" : `Peaked distribution → ${role.label.toLowerCase()} lens`}
            </div>
          </div>
        </div>
      </div>

      {/* Output */}
      <div style={{ maxWidth: 720, width: "100%", padding: "18px 20px", background: `${role.color}06`, border: `1px solid ${role.color}18`, borderRadius: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: role.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          Resulting output
        </div>
        <div style={{ fontSize: 13.5, color: "#CBD5E1", lineHeight: 1.75, fontFamily: "'DM Sans'", fontStyle: "italic" }}>
          "{role.output}"
        </div>
        <div style={{ marginTop: 12, fontSize: 11.5, color: "#64748B", fontFamily: "'DM Sans'" }}>
          {role.outputLabel}
        </div>
      </div>

      {/* DB Analogy */}
      <div style={{ maxWidth: 720, width: "100%", marginTop: 16, padding: "14px 20px", background: "rgba(15,22,41,0.5)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 10 }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Database analogy</div>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: "#64748B", lineHeight: 1.8 }}>
          {selectedRole === 0 ? (
            <><span style={{ color: "#E8453C" }}>SELECT</span> <span style={{ color: "#94A3B8" }}>*</span> <span style={{ color: "#E8453C" }}>FROM</span> <span style={{ color: "#CBD5E1" }}>knowledge</span><br /><span style={{ color: "#475569" }}>— No WHERE clause. Every table contributes equally → average result.</span></>
          ) : (
            <><span style={{ color: "#E8453C" }}>SELECT</span> <span style={{ color: "#94A3B8" }}>*</span> <span style={{ color: "#E8453C" }}>FROM</span> <span style={{ color: "#CBD5E1" }}>knowledge</span><br /><span style={{ color: "#E8453C" }}>WHERE</span> <span style={{ color: role.color }}>perspective = '{role.id}'</span><br /><span style={{ color: "#E8453C" }}>ORDER BY</span> <span style={{ color: "#CBD5E1" }}>relevance_to_role</span> <span style={{ color: "#E8453C" }}>DESC</span><br /><span style={{ color: "#475569" }}>— Filters for {role.label.toLowerCase()} patterns → specialized, high-signal result.</span></>
          )}
        </div>
      </div>
    </div>
  );
}
