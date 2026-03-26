"use client";

import { useState } from "react";

const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: 10,
};
const glassCard: React.CSSProperties = {
  ...card,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

const periods = ["今月", "先月", "四半期", "年間"];

const monthlyData = [
  { month: "10月", value: 1800000 },
  { month: "11月", value: 2100000 },
  { month: "12月", value: 2500000 },
  { month: "1月", value: 2300000 },
  { month: "2月", value: 2600000 },
  { month: "3月", value: 2800000 },
];
const maxValue = Math.max(...monthlyData.map(d => d.value));

const statusBreakdown = [
  { label: "支払済", pct: 65, color: "#4ade80" },
  { label: "送信済", pct: 20, color: "#3B82F6" },
  { label: "期限超過", pct: 10, color: "#f87171" },
  { label: "下書き", pct: 5, color: "#7a8494" },
];

const topClients = [
  { name: "グローバル商事", total: 15840000, count: 12, avg: 1320000 },
  { name: "株式会社テクノロジーズ", total: 4224000, count: 8, avg: 528000 },
  { name: "スタートアップ株式会社", total: 1584000, count: 6, avg: 264000 },
  { name: "ABCコンサルティング", total: 825000, count: 5, avg: 165000 },
];

export default function ReportsPage() {
  const [activePeriod, setActivePeriod] = useState(0);

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db", margin: 0 }}>レポート</h2>
        <div style={{ display: "flex", gap: 4 }}>
          {periods.map((p, i) => (
            <button key={i} onClick={() => setActivePeriod(i)} style={{
              padding: "6px 14px",
              borderRadius: 9999,
              border: "1px solid " + (activePeriod === i ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"),
              background: activePeriod === i ? "rgba(59,130,246,0.12)" : "transparent",
              color: activePeriod === i ? "#60a5fa" : "#7a8494",
              fontSize: 11,
              fontWeight: activePeriod === i ? 600 : 400,
              cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "売上合計", value: "¥2,847,000", color: "#e2e8f0" },
          { label: "回収率", value: "87.3%", color: "#4ade80" },
          { label: "平均支払い日数", value: "18.4日", color: "#e2e8f0" },
        ].map((s, i) => (
          <div key={i} style={{ ...glassCard, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Monthly Revenue Chart */}
        <div style={{ ...glassCard, padding: "24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", marginBottom: 20 }}>月別売上推移</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 180 }}>
            {monthlyData.map((d, i) => {
              const heightPct = (d.value / maxValue) * 100;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 10, color: "#7a8494", whiteSpace: "nowrap" as const }}>
                    {(d.value / 1000000).toFixed(1)}M
                  </div>
                  <div style={{
                    width: "100%",
                    height: `${heightPct}%`,
                    background: "linear-gradient(180deg, #3B82F6, #1d4ed8)",
                    borderRadius: "4px 4px 0 0",
                    minHeight: 4,
                    transition: "height 0.3s",
                  }} />
                  <div style={{ fontSize: 10, color: "#4b5563" }}>{d.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Breakdown */}
        <div style={{ ...glassCard, padding: "24px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", marginBottom: 20 }}>ステータス内訳</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {statusBreakdown.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: "#e2e8f0" }}>{s.label}</span>
                  <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.pct}%</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${s.pct}%`,
                    height: "100%",
                    background: s.color,
                    borderRadius: 3,
                    transition: "width 0.5s",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Clients Table */}
      <div style={{ ...glassCard, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: 0 }}>上位取引先</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["取引先", "合計金額", "請求件数", "平均金額"].map((h, i) => (
                  <th key={i} style={{
                    padding: "10px 20px",
                    textAlign: i === 0 ? "left" : "right",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#4b5563",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topClients.map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{c.name}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#e2e8f0", textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" as const }}>{formatCurrency(c.total)}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#7a8494", textAlign: "right" }}>{c.count}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#7a8494", textAlign: "right", fontVariantNumeric: "tabular-nums" as const }}>{formatCurrency(c.avg)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
