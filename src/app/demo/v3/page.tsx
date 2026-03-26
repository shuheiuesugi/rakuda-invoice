"use client";

import { useState } from "react";

const basePath = "/rakuda-invoice";

const invoices = [
  { id: "INV-2026-0042", client: "株式会社テクノロジーズ", amount: 528000, issued: "2026/03/15", due: "2026/04/14", status: "paid" as const },
  { id: "INV-2026-0041", client: "ABCコンサルティング", amount: 165000, issued: "2026/03/10", due: "2026/04/09", status: "sent" as const },
  { id: "INV-2026-0040", client: "山田デザイン事務所", amount: 88000, issued: "2026/03/05", due: "2026/04/04", status: "overdue" as const },
  { id: "INV-2026-0039", client: "グローバル商事", amount: 1320000, issued: "2026/03/01", due: "2026/03/31", status: "draft" as const },
  { id: "INV-2026-0038", client: "スタートアップ株式会社", amount: 264000, issued: "2026/02/25", due: "2026/03/27", status: "paid" as const },
  { id: "INV-2026-0037", client: "フリーランス田中", amount: 55000, issued: "2026/02/20", due: "2026/03/22", status: "sent" as const },
];

const statusMap: Record<string, { label: string; color: string; bg: string; border: string }> = {
  paid: { label: "支払済", color: "#4ade80", bg: "rgba(74, 222, 128, 0.08)", border: "#4ade80" },
  sent: { label: "送信済", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.08)", border: "#3B82F6" },
  overdue: { label: "期限超過", color: "#f87171", bg: "rgba(248, 113, 113, 0.08)", border: "#f87171" },
  draft: { label: "下書き", color: "#7a8494", bg: "rgba(122, 132, 148, 0.08)", border: "#7a8494" },
};

function NavIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  const s = { width: size, height: size, strokeWidth: 1.5, stroke: "currentColor", fill: "none" };
  if (icon === "grid") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (icon === "file") return <svg viewBox="0 0 24 24" style={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (icon === "plus") return <svg viewBox="0 0 24 24" style={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (icon === "users") return <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
  if (icon === "settings") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
  return null;
}

function WaveLogo({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

const navItems = [
  { label: "ダッシュボード", icon: "grid" },
  { label: "請求書一覧", icon: "file" },
  { label: "新規作成", icon: "plus" },
  { label: "取引先", icon: "users" },
  { label: "設定", icon: "settings" },
];

export default function V3Page() {
  const [activeNav, setActiveNav] = useState(0);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);

  const stats = [
    { label: "月間売上", value: "¥2,847,000", accent: "#60a5fa" },
    { label: "未回収", value: "¥423,000", accent: "#fbbf24" },
    { label: "今月発行", value: "12通", accent: "#a78bfa" },
    { label: "支払済", value: "8通", accent: "#4ade80" },
  ];

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Compact Sidebar - 60px icon only */}
      <aside style={{
        width: 60,
        minHeight: "100vh",
        background: "rgba(6, 10, 18, 0.5)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 16,
        flexShrink: 0,
      }}>
        <div style={{ color: "#60a5fa", marginBottom: 28 }}>
          <WaveLogo size={24} />
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          {navItems.map((item, i) => (
            <div key={i} style={{ position: "relative" }}>
              <button
                onClick={() => setActiveNav(i)}
                onMouseEnter={() => setHoveredNav(i)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: 40,
                  border: "none",
                  background: activeNav === i ? "rgba(59, 130, 246, 0.12)" : "transparent",
                  color: activeNav === i ? "#60a5fa" : "#7a8494",
                  cursor: "pointer",
                  borderLeft: activeNav === i ? "2px solid #3B82F6" : "2px solid transparent",
                }}
              >
                <NavIcon icon={item.icon} />
              </button>
              {hoveredNav === i && (
                <div style={{
                  position: "absolute",
                  left: 60,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 11,
                  color: "#e2e8f0",
                  whiteSpace: "nowrap",
                  zIndex: 100,
                  pointerEvents: "none",
                }}>{item.label}</div>
              )}
            </div>
          ))}
        </nav>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600, color: "#fff",
          marginBottom: 16,
        }}>U</div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "20px 28px", overflow: "auto" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db", margin: 0 }}>ダッシュボード</h1>
          <button style={{
            padding: "8px 16px",
            background: "#3B82F6",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>新規請求書作成</button>
        </div>

        {/* Stats - compact inline */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255, 255, 255, 0.025)",
              borderLeft: `3px solid ${s.accent}`,
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              borderRight: "1px solid rgba(255, 255, 255, 0.05)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "0 8px 8px 0",
              padding: "14px 16px",
            }}>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4, letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Invoice Table - high density */}
        <div style={{
          background: "rgba(255, 255, 255, 0.025)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "12px 18px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: 0 }}>請求書一覧</h2>
            <div style={{ display: "flex", gap: 6 }}>
              {["全て", "支払済", "送信済", "下書き", "期限超過"].map((f, i) => (
                <button key={i} style={{
                  padding: "4px 10px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  background: i === 0 ? "rgba(59, 130, 246, 0.1)" : "transparent",
                  color: i === 0 ? "#60a5fa" : "#7a8494",
                  borderRadius: 4,
                  fontSize: 10,
                  cursor: "pointer",
                }}>{f}</button>
              ))}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["請求番号", "取引先", "金額", "発行日", "支払期日", "ステータス"].map((h, i) => (
                  <th key={i} style={{
                    padding: "8px 18px",
                    textAlign: "left",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#4b5563",
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const st = statusMap[inv.status];
                return (
                  <tr key={i} style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                    borderLeft: `3px solid ${st.border}`,
                  }}>
                    <td style={{ padding: "9px 18px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{inv.id}</td>
                    <td style={{ padding: "9px 18px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
                    <td style={{ padding: "9px 18px", fontSize: 12, color: "#e2e8f0", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</td>
                    <td style={{ padding: "9px 18px", fontSize: 11, color: "#7a8494" }}>{inv.issued}</td>
                    <td style={{ padding: "9px 18px", fontSize: 11, color: "#7a8494" }}>{inv.due}</td>
                    <td style={{ padding: "9px 18px" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 600,
                        color: st.color,
                        background: st.bg,
                      }}>{st.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
          {[
            { label: "今月の請求合計", value: "¥2,420,000", rows: "6件" },
            { label: "回収済み", value: "¥792,000", rows: "2件" },
            { label: "期限超過", value: "¥88,000", rows: "1件" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(255, 255, 255, 0.025)",
              borderLeft: `3px solid ${["#60a5fa", "#4ade80", "#f87171"][i]}`,
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              borderRight: "1px solid rgba(255, 255, 255, 0.05)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "0 8px 8px 0",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 10, color: "#7a8494" }}>{item.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{item.value}</div>
              </div>
              <div style={{ fontSize: 11, color: "#7a8494" }}>{item.rows}</div>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <a key={n} href={`${basePath}/demo/v${n}`} style={{
              padding: "5px 12px",
              borderRadius: 4,
              fontSize: 11,
              color: n === 3 ? "#60a5fa" : "#7a8494",
              background: n === 3 ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              textDecoration: "none",
            }}>V{n}</a>
          ))}
        </div>
      </main>
    </div>
  );
}