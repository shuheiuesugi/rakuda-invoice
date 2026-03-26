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

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: "支払済", color: "#4ade80", bg: "rgba(74, 222, 128, 0.1)" },
  sent: { label: "送信済", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  overdue: { label: "期限超過", color: "#f87171", bg: "rgba(248, 113, 113, 0.1)" },
  draft: { label: "下書き", color: "#7a8494", bg: "rgba(122, 132, 148, 0.1)" },
};

function NavIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const s = { width: size, height: size, strokeWidth: 1.5, stroke: "currentColor", fill: "none" };
  if (icon === "grid") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (icon === "file") return <svg viewBox="0 0 24 24" style={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (icon === "plus") return <svg viewBox="0 0 24 24" style={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (icon === "users") return <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
  if (icon === "settings") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
  return null;
}

function WaveLogo({ size = 28 }: { size?: number }) {
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

export default function V5Page() {
  const [activeNav, setActiveNav] = useState(0);

  const stats = [
    { label: "月間売上合計", value: "¥2,847,000", gradFrom: "rgba(96, 165, 250, 0.12)", gradTo: "rgba(167, 139, 250, 0.06)", accent: "#60a5fa" },
    { label: "未回収", value: "¥423,000", gradFrom: "rgba(251, 191, 36, 0.10)", gradTo: "rgba(251, 191, 36, 0.02)", accent: "#fbbf24" },
    { label: "今月発行", value: "12通", gradFrom: "rgba(167, 139, 250, 0.10)", gradTo: "rgba(96, 165, 250, 0.04)", accent: "#a78bfa" },
    { label: "支払済", value: "8通", gradFrom: "rgba(74, 222, 128, 0.10)", gradTo: "rgba(74, 222, 128, 0.02)", accent: "#4ade80" },
  ];

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        minHeight: "100vh",
        background: "rgba(6, 10, 18, 0.5)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 24px", marginBottom: 36 }}>
          <span style={{ color: "#60a5fa" }}><WaveLogo size={26} /></span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", color: "#d1d5db" }}>RAKUDA INVOICE</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveNav(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "11px 24px",
                border: "none",
                background: activeNav === i ? "rgba(59, 130, 246, 0.08)" : "transparent",
                color: activeNav === i ? "#60a5fa" : "#7a8494",
                cursor: "pointer",
                fontSize: 13,
                textAlign: "left",
                borderRight: activeNav === i ? "2px solid #3B82F6" : "2px solid transparent",
              }}
            >
              <NavIcon icon={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick create */}
        <div style={{ padding: "0 16px", marginBottom: 20 }}>
          <button style={{
            width: "100%",
            padding: "10px 16px",
            background: "#3B82F6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>新規請求書作成</button>
        </div>

        {/* User */}
        <div style={{ padding: "0 24px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}>U</div>
          <div>
            <div style={{ fontSize: 12, color: "#c8d1dc" }}>ユーザー</div>
            <div style={{ fontSize: 10, color: "#4b5563" }}>管理者</div>
          </div>
        </div>
      </aside>

      {/* Main - Asymmetric */}
      <main style={{ flex: 1, padding: "28px 36px", overflow: "auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#d1d5db", margin: "0 0 4px" }}>ダッシュボード</h1>
          <p style={{ fontSize: 12, color: "#7a8494", margin: 0 }}>2026年3月の請求書管理</p>
        </div>

        {/* Stats - Gradient cards, asymmetric: 1 large + 3 small */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${s.gradFrom}, ${s.gradTo})`,
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 12,
              padding: i === 0 ? "24px 28px" : "18px 20px",
            }}>
              <div style={{ fontSize: 11, color: "#7a8494", marginBottom: i === 0 ? 12 : 6, letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ fontSize: i === 0 ? 30 : 20, fontWeight: 700, color: "#e2e8f0", lineHeight: 1 }}>{s.value}</div>
              {i === 0 && <div style={{ fontSize: 11, color: s.accent, marginTop: 8 }}>+12.3% 前月比</div>}
            </div>
          ))}
        </div>

        {/* Content: Asymmetric 2-column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          {/* Invoice Table */}
          <div style={{
            background: "rgba(255, 255, 255, 0.025)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <div style={{
              padding: "16px 22px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: 0 }}>請求書一覧</h2>
              <span style={{ fontSize: 11, color: "#7a8494" }}>全12件中 6件表示</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["請求番号", "取引先", "金額", "期日", "ステータス"].map((h, i) => (
                    <th key={i} style={{
                      padding: "10px 22px",
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
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)" }}>
                      <td style={{ padding: "12px 22px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{inv.id}</td>
                      <td style={{ padding: "12px 22px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
                      <td style={{ padding: "12px 22px", fontSize: 12, color: "#e2e8f0", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</td>
                      <td style={{ padding: "12px 22px", fontSize: 11, color: "#7a8494" }}>{inv.due}</td>
                      <td style={{ padding: "12px 22px" }}>
                        <span style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: 9999,
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

          {/* Right column - stacked panels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Summary */}
            <div style={{
              background: "linear-gradient(135deg, rgba(96, 165, 250, 0.08), rgba(167, 139, 250, 0.04))",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>月次サマリー</h3>
              {[
                { label: "発行済み金額", value: "¥2,420,000", color: "#e2e8f0" },
                { label: "回収済み", value: "¥792,000", color: "#4ade80" },
                { label: "未回収", value: "¥423,000", color: "#fbbf24" },
                { label: "期限超過", value: "¥88,000", color: "#f87171" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: i < 3 ? "1px solid rgba(255, 255, 255, 0.03)" : "none",
                }}>
                  <span style={{ fontSize: 12, color: "#7a8494" }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: item.color, fontVariantNumeric: "tabular-nums" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Top clients */}
            <div style={{
              background: "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>主要取引先</h3>
              {[
                { name: "グローバル商事", amount: "¥1,320,000" },
                { name: "株式会社テクノロジーズ", amount: "¥528,000" },
                { name: "スタートアップ株式会社", amount: "¥264,000" },
              ].map((c, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: i < 2 ? "1px solid rgba(255, 255, 255, 0.03)" : "none",
                }}>
                  <span style={{ fontSize: 12, color: "#c8d1dc" }}>{c.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", fontVariantNumeric: "tabular-nums" }}>{c.amount}</span>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div style={{
              background: "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>最新の更新</h3>
              {[
                { text: "INV-0042 支払確認", time: "2時間前", color: "#4ade80" },
                { text: "INV-0041 送信完了", time: "5時間前", color: "#3B82F6" },
                { text: "INV-0040 期限超過通知", time: "1日前", color: "#f87171" },
              ].map((a, i) => (
                <div key={i} style={{
                  padding: "8px 0",
                  borderBottom: i < 2 ? "1px solid rgba(255, 255, 255, 0.03)" : "none",
                }}>
                  <div style={{ fontSize: 12, color: "#c8d1dc", marginBottom: 2 }}>{a.text}</div>
                  <div style={{ fontSize: 10, color: a.color }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <a key={n} href={`${basePath}/demo/v${n}`} style={{
              padding: "6px 14px",
              borderRadius: 6,
              fontSize: 12,
              color: n === 5 ? "#60a5fa" : "#7a8494",
              background: n === 5 ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              textDecoration: "none",
            }}>V{n}</a>
          ))}
        </div>
      </main>
    </div>
  );
}