"use client";

import { useState } from "react";

const MODES = [
  {
    id: "unstructured",
    label: "No Structure",
    icon: "\uD83D\uDCAD",
    color: "#94A3B8",
    prompt: '"Analyze my three competitors"',
    output: `Sure! Your competitors are strong in different areas. Company A has good brand recognition and a large user base. Company B is known for its pricing strategy and customer service. Company C has innovative features. You should focus on differentiating your product and finding your unique value proposition in the market.\n\nConsider conducting more market research to understand customer preferences better.`,
    score: { precision: 15, consistency: 10, actionability: 8 },
    verdict: "Vague, unstructured, no data, not actionable",
  },
  {
    id: "format",
    label: "Format Specified",
    icon: "\uD83D\uDCCB",
    color: "#F59E0B",
    prompt: '"Analyze my 3 competitors. Return a comparison table with columns: Name, Pricing, Key Strength, Key Weakness, Threat Level (1-5)"',
    output: null,
    table: {
      headers: ["Name", "Pricing", "Key Strength", "Key Weakness", "Threat Level"],
      rows: [
        ["Competitor A", "$29-99/mo", "Brand recognition, 50K users", "Slow feature development", "4/5"],
        ["Competitor B", "$19-49/mo", "Aggressive pricing, fast support", "Limited integrations", "3/5"],
        ["Competitor C", "$0-79/mo", "Innovative AI features", "High churn, poor docs", "3/5"],
      ],
    },
    score: { precision: 62, consistency: 70, actionability: 45 },
    verdict: "Structured but still generic — no specific data points",
  },
  {
    id: "schema",
    label: "Full Schema",
    icon: "\uD83C\uDFD7\uFE0F",
    color: "#3B82F6",
    prompt: `"For each competitor, fill this exact schema:
{
  name, url, pricing_tiers: [{name, price, limits}],
  monthly_traffic_estimate,
  key_feature_they_have_we_dont,
  key_feature_we_have_they_dont,
  customer_complaint_pattern: (from G2/Capterra),
  attack_vector: "specific way to win their customers",
  threat_timeline: "months until they could copy our core feature"
}"`,
    output: null,
    schema: {
      name: "Competitor A — Acme Tools",
      url: "acmetools.io",
      pricing: [
        { tier: "Starter", price: "$29/mo", limits: "5 users, 1K API calls" },
        { tier: "Pro", price: "$99/mo", limits: "25 users, 10K API calls" },
      ],
      traffic: "~180K monthly visits (SimilarWeb est.)",
      theyHave: "Native Salesforce integration (our #1 feature request)",
      weHave: "Real-time collaboration — they only support async",
      complaints: "\"Setup takes forever\" (47 mentions), \"Support is slow\" (31 mentions)",
      attack: "Target their Starter-to-Pro upgrade gap: offer migration tool + 60-day price match",
      timeline: "6-8 months — they'd need to rebuild their sync engine",
    },
    score: { precision: 91, consistency: 95, actionability: 88 },
    verdict: "Specific, consistent, immediately actionable",
  },
  {
    id: "exemplar",
    label: "Schema + Example",
    icon: "\u26A1",
    color: "#10B981",
    prompt: `[Full schema as above] + "Here's an example of the output quality I expect:" + [one completed example showing exact depth/specificity level]`,
    output: null,
    schema: {
      name: "Competitor A — Acme Tools",
      url: "acmetools.io",
      pricing: [
        { tier: "Starter", price: "$29/mo", limits: "5 users, 1K API calls, no SSO" },
        { tier: "Pro", price: "$99/mo", limits: "25 users, 10K calls, SSO, priority support" },
        { tier: "Enterprise", price: "Custom", limits: "Unlimited, SLA, dedicated CSM" },
      ],
      traffic: "~180K/mo visits, ~12K signups/mo (est. from job postings + LinkedIn headcount)",
      theyHave: "Native Salesforce + HubSpot integrations (our top 2 feature requests, 89 upvotes combined)",
      weHave: "Real-time multiplayer editing — they're async-only. This is our moat for 6+ months.",
      complaints: "\"Setup takes 2+ hours\" — 47 G2 mentions. \"Can't customize dashboards\" — 31 mentions. \"Pricing jump from Starter to Pro is brutal\" — 23 mentions",
      attack: "Build a 1-click migration tool. Target their Starter users hitting the Pro paywall with: 'Everything Acme Pro offers, at Acme Starter pricing.' Run comparison landing page with specific feature matrix.",
      timeline: "6-8 months minimum. They'd need to rebuild their sync engine (currently polling-based, confirmed by their public API docs). We have a real-time WebSocket advantage.",
    },
    score: { precision: 97, consistency: 98, actionability: 95 },
    verdict: "Maximum depth — the example set the quality floor",
  },
];

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748B", letterSpacing: "0.05em" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color, fontWeight: 500 }}>{value}%</span>
      </div>
      <div style={{ width: "100%", height: 6, background: "rgba(15,22,41,0.8)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.6s ease", boxShadow: `0 0 6px ${color}30` }} />
      </div>
    </div>
  );
}

export default function Strength6Visual() {
  const [activeMode, setActiveMode] = useState(0);
  const mode = MODES[activeMode];

  return (
    <div style={{ color: "#E2E8F0", fontFamily: "var(--font-sans), sans-serif", padding: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* Mode Selector */}
      <div style={{ maxWidth: 960, width: "100%", marginBottom: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {MODES.map((m, i) => (
          <button key={m.id} onClick={() => setActiveMode(i)} style={{
            flex: "1 1 150px", padding: "12px 12px", textAlign: "center", cursor: "pointer",
            background: activeMode === i ? `${m.color}12` : "rgba(15,22,41,0.5)",
            border: `1px solid ${activeMode === i ? m.color + "50" : "rgba(148,163,184,0.06)"}`,
            borderRadius: 10, transition: "all 0.3s ease",
          }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: activeMode === i ? m.color : "#94A3B8" }}>{m.label}</div>
          </button>
        ))}
      </div>

      {/* Prompt */}
      <div style={{ maxWidth: 960, width: "100%", marginBottom: 12, padding: "12px 16px", background: `${mode.color}06`, border: `1px solid ${mode.color}15`, borderRadius: 10 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Prompt</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: mode.color, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{mode.prompt}</div>
      </div>

      <div style={{ maxWidth: 960, width: "100%", display: "flex", gap: 12, flexWrap: "wrap" }}>
        {/* Output */}
        <div style={{ flex: "1 1 440px", padding: "18px 20px", background: `${mode.color}06`, border: `1px solid ${mode.color}18`, borderRadius: 14, minHeight: 260 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: mode.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Output</div>

          {mode.output && (
            <div style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{mode.output}</div>
          )}

          {mode.table && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
                <thead>
                  <tr>{mode.table.headers.map((h, i) => <th key={i} style={{ padding: "6px 8px", textAlign: "left", color: "#64748B", fontFamily: "var(--font-mono)", fontSize: 9, borderBottom: "1px solid rgba(148,163,184,0.1)", letterSpacing: "0.05em" }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {mode.table.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} style={{ padding: "6px 8px", color: "#CBD5E1", borderBottom: "1px solid rgba(148,163,184,0.05)", fontFamily: "var(--font-sans)" }}>{cell}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
          )}

          {mode.schema && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.7 }}>
              <div style={{ color: "#CBD5E1", fontWeight: 600, marginBottom: 4 }}>{mode.schema.name}</div>
              <div style={{ color: "#64748B", marginBottom: 8 }}>{mode.schema.url} · {mode.schema.traffic}</div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ color: "#475569" }}>pricing: </span>
                {mode.schema.pricing.map((p, i) => <span key={i} style={{ color: "#10B981" }}>{p.tier} {p.price}{i < mode.schema.pricing.length - 1 ? " | " : ""}</span>)}
              </div>
              <div style={{ marginBottom: 4 }}><span style={{ color: "#E8453C" }}>they_have: </span><span style={{ color: "#F87171" }}>{mode.schema.theyHave}</span></div>
              <div style={{ marginBottom: 4 }}><span style={{ color: "#10B981" }}>we_have: </span><span style={{ color: "#6EE7B7" }}>{mode.schema.weHave}</span></div>
              <div style={{ marginBottom: 4 }}><span style={{ color: "#F59E0B" }}>complaints: </span><span style={{ color: "#FCD34D" }}>{mode.schema.complaints}</span></div>
              <div style={{ marginBottom: 4 }}><span style={{ color: "#3B82F6" }}>attack: </span><span style={{ color: "#93C5FD" }}>{mode.schema.attack}</span></div>
              <div><span style={{ color: "#A855F7" }}>timeline: </span><span style={{ color: "#C4B5FD" }}>{mode.schema.timeline}</span></div>
            </div>
          )}
        </div>

        {/* Scores */}
        <div style={{ flex: "0 0 220px", padding: "18px 20px", background: "linear-gradient(180deg, #0F1629, #131B2E)", border: "1px solid rgba(148,163,184,0.08)", borderRadius: 14 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Quality scores</div>
          <ScoreBar label="PRECISION" value={mode.score.precision} color={mode.color} />
          <ScoreBar label="CONSISTENCY" value={mode.score.consistency} color={mode.color} />
          <ScoreBar label="ACTIONABILITY" value={mode.score.actionability} color={mode.color} />
          <div style={{ marginTop: 16, padding: "10px 12px", background: `${mode.color}08`, borderRadius: 6, fontSize: 11.5, color: "#94A3B8", lineHeight: 1.5, fontFamily: "var(--font-sans)" }}>
            {mode.verdict}
          </div>
        </div>
      </div>

      {/* DB Analogy */}
      <div style={{ maxWidth: 960, width: "100%", marginTop: 16, padding: "14px 20px", background: "rgba(15,22,41,0.5)", border: "1px solid rgba(148,163,184,0.06)", borderRadius: 10 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Database analogy</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#64748B", lineHeight: 1.8 }}>
          {activeMode === 0 && <><span style={{ color: "#E8453C" }}>SELECT</span> <span style={{ color: "#94A3B8" }}>*</span> <span style={{ color: "#E8453C" }}>FROM</span> <span style={{ color: "#CBD5E1" }}>competitors</span> — no column spec, returns everything in random order.</>}
          {activeMode === 1 && <><span style={{ color: "#E8453C" }}>SELECT</span> <span style={{ color: "#F59E0B" }}>name, pricing, strength, weakness, threat</span> <span style={{ color: "#E8453C" }}>FROM</span> <span style={{ color: "#CBD5E1" }}>competitors</span> — named columns, but no type constraints.</>}
          {activeMode === 2 && <><span style={{ color: "#E8453C" }}>CREATE TABLE</span> <span style={{ color: "#3B82F6" }}>competitor_analysis</span> <span style={{ color: "#CBD5E1" }}>(name VARCHAR, pricing JSON, traffic INT, ...)</span> — full schema with typed columns. The structure IS the quality control.</>}
          {activeMode === 3 && <><span style={{ color: "#E8453C" }}>CREATE TABLE</span> ... + <span style={{ color: "#10B981" }}>INSERT INTO</span> <span style={{ color: "#CBD5E1" }}>competitor_analysis VALUES (example_row)</span> — schema + seed data. The example row sets the quality floor for all subsequent rows.</>}
        </div>
      </div>
    </div>
  );
}
