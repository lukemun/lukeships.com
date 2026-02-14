import { useState } from "react";

const STAGES = [
  {
    id: "draft",
    step: 1,
    label: "Generate",
    icon: "✏️",
    color: "#94A3B8",
    quality: 35,
    text: "Our product helps teams collaborate better. With powerful features and an intuitive interface, we make it easy for teams of any size to get more done. Start your free trial today and see the difference.",
    problems: ["Generic — could be any SaaS product", "No specific value prop", "No proof or differentiation", "Forgettable language"],
    dbNote: "First query: SELECT * FROM marketing_copy — returns the statistical average.",
  },
  {
    id: "critique",
    step: 2,
    label: "Critique",
    icon: "🔍",
    color: "#F59E0B",
    quality: 35,
    text: null,
    critique: [
      { issue: "Zero specificity", severity: "critical", detail: "\"Helps teams collaborate\" describes 4,000 products. Name the exact problem." },
      { issue: "No proof", severity: "high", detail: "No numbers, no case study, no comparison. The reader has no reason to believe this." },
      { issue: "Weak CTA", severity: "medium", detail: "\"Start your free trial\" is the most default CTA in SaaS. What happens after they sign up?" },
      { issue: "Missing the enemy", severity: "high", detail: "Great copy names what it's against. What status quo does this product kill?" },
    ],
    dbNote: "Second query: SELECT weakness FROM output WHERE severity >= 'high' — runs quality checks against the first result set.",
  },
  {
    id: "rewrite",
    step: 3,
    label: "Rewrite",
    icon: "⚡",
    color: "#3B82F6",
    quality: 72,
    text: "Your team wastes 11 hours a week in status meetings that could be a 30-second async update. Pulse replaces your daily standup with AI-generated progress snapshots pulled directly from your tools — Jira, GitHub, Slack. Teams using Pulse cut meeting time by 64% in their first month. Kill the standup. Ship the product.",
    improvements: ["Names the specific enemy (status meetings)", "Concrete number (11 hours)", "Proof point (64% reduction)", "Clear mechanism (AI snapshots from existing tools)", "Sharp CTA with personality"],
    dbNote: "Third query: Regenerates with critique as constraints — WHERE weakness NOT IN (previous_issues). The result set shifts dramatically.",
  },
  {
    id: "stress",
    step: 4,
    label: "Stress Test",
    icon: "🎯",
    color: "#10B981",
    quality: 88,
    text: "Your team wastes 11 hours a week in status meetings that should be a 30-second async check-in. Pulse auto-generates progress snapshots from Jira, GitHub, and Slack — no one types anything. Basecamp's team cut standups entirely. Linear's team reclaimed 8 hours/week. You'll kill your first meeting within 48 hours of setup, or we'll refund the whole month. Try it now — setup takes 4 minutes.",
    improvements: ["Added named social proof (Basecamp, Linear)", "Risk reversal (money-back guarantee)", "Micro-commitment framing (4 minutes)", "Addressed skepticism with specificity"],
    dbNote: "Fourth query: VALIDATE result against objection_patterns, then MERGE strongest elements. Each pass adds constraints that force higher quality.",
  },
];

function QualityMeter({ value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 200, height: 10, background: "rgba(15,22,41,0.8)", borderRadius: 5, overflow: "hidden" }}>
        <div style={{
          width: `${value}%`, height: "100%",
          background: `linear-gradient(90deg, ${color}90, ${color}50)`,
          borderRadius: 5, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 12px ${color}40`,
        }} />
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color, fontWeight: 600, minWidth: 36 }}>{value}%</span>
    </div>
  );
}

export default function Strength5Visual() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = STAGES[activeStage];

  return (
    <div style={{ minHeight: "100vh", background: "#0B0F1A", color: "#E2E8F0", fontFamily: "'DM Sans', sans-serif", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');`}</style>

      <div style={{ maxWidth: 720, width: "100%", marginBottom: 28 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#64748B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Strength 05 / 07</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px 0", lineHeight: 1.15, background: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Iterative Refinement Over Generation</h1>
        <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.65, margin: 0, maxWidth: 620 }}>
          LLMs are measurably <strong style={{ color: "#CBD5E1" }}>better at improving text than generating from scratch</strong>. Editing is a narrower task — the model focuses its attention precisely. Critique-rewrite cycles produce output 30–60% better than single-shot generation.
        </p>
      </div>

      {/* Stage Pipeline */}
      <div style={{ maxWidth: 720, width: "100%", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {STAGES.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <button onClick={() => setActiveStage(i)} style={{
                flex: 1, padding: "12px 10px", textAlign: "center", cursor: "pointer",
                background: activeStage === i ? `${s.color}12` : "rgba(15,22,41,0.4)",
                border: `1px solid ${activeStage === i ? s.color + "50" : "rgba(148,163,184,0.06)"}`,
                borderRadius: 8, transition: "all 0.3s ease", position: "relative",
              }}>
                {activeStage === i && <div style={{ position: "absolute", bottom: 0, left: "10%", width: "80%", height: 2, background: s.color, borderRadius: 2 }} />}
                <div style={{ fontSize: 16, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: activeStage === i ? s.color : "#64748B", letterSpacing: "0.06em", fontWeight: 500 }}>
                  STEP {s.step}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: activeStage === i ? s.color : "#94A3B8" }}>{s.label}</div>
              </button>
              {i < STAGES.length - 1 && <div style={{ color: "#334155", padding: "0 2px", fontSize: 14 }}>›</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Quality Meter */}
      <div style={{ maxWidth: 720, width: "100%", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", background: "linear-gradient(90deg, #0F1629, #131B2E)", borderRadius: 10, border: "1px solid rgba(148,163,184,0.08)" }}>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase" }}>Output quality</span>
          <QualityMeter value={stage.quality} color={stage.color} />
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: 720, width: "100%", padding: "20px 24px", background: `${stage.color}06`, border: `1px solid ${stage.color}18`, borderRadius: 14, minHeight: 220 }}>
        {stage.text && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: stage.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
              {stage.id === "draft" ? "First draft output" : "Refined output"}
            </div>
            <div style={{ fontSize: 14, color: "#CBD5E1", lineHeight: 1.8, fontFamily: "'DM Sans'", padding: "14px 16px", background: "rgba(0,0,0,0.2)", borderRadius: 8, borderLeft: `3px solid ${stage.color}60` }}>
              {stage.text}
            </div>
          </div>
        )}

        {stage.critique && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: stage.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              Critique findings
            </div>
            {stage.critique.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, padding: "10px 14px", background: "rgba(0,0,0,0.15)", borderRadius: 8 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono'", fontSize: 9, padding: "2px 6px", borderRadius: 3, flexShrink: 0, marginTop: 2,
                  background: c.severity === "critical" ? "#EF444420" : c.severity === "high" ? "#F59E0B20" : "#64748B20",
                  color: c.severity === "critical" ? "#EF4444" : c.severity === "high" ? "#F59E0B" : "#94A3B8",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>{c.severity}</span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#CBD5E1", marginBottom: 2 }}>{c.issue}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {stage.problems && (
          <div>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#EF4444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Problems</div>
            {stage.problems.map((p, i) => (
              <div key={i} style={{ fontSize: 12, color: "#F87171", padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#EF4444" }}>✕</span> {p}
              </div>
            ))}
          </div>
        )}

        {stage.improvements && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#10B981", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Improvements</div>
            {stage.improvements.map((p, i) => (
              <div key={i} style={{ fontSize: 12, color: "#6EE7B7", padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#10B981" }}>✓</span> {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DB Analogy */}
      <div style={{ maxWidth: 720, width: "100%", marginTop: 16, padding: "14px 20px", background: "rgba(15,22,41,0.5)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 10 }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Database analogy</div>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: "#64748B", lineHeight: 1.8 }}>{stage.dbNote}</div>
      </div>
    </div>
  );
}
