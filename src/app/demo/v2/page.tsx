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

function WaveLogo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function NavIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const s = { width: size, height: size, strokeWidth: 1.5, stroke: "currentColor", fill: "none" };
  if (icon === "grid") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (icon === "file") return <svg viewBox="0 0 24 24" style={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (icon === "plus") return <svg viewBox="0 0 24 24" style={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (icon === "users") return <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
  if (icon === "settings") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
  return null;
}

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

export default function V2Page() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["ダッシュボード", "請求書一覧", "新規作成", "取引先", "設定"];

  const stats = [
    { label: "月間売上合計", value: "¥2,847,000", sub: "+12.3% 前月比", subColor: "#4ade80" },
    { label: "未回収", value: "¥423,000", sub: "3件の請求書", subColor: "#fbbf24" },
    { label: "今月発行", value: "12通", sub: "前月: 9通", subColor: "#7a8494" },
    { label: "支払済", value: "8通", sub: "回収率 66.7%", subColor: "#4ade80" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Top Bar */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 56,
        background: "rgba(6, 10, 18, 0.5)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#60a5fa" }}><WaveLogo /></span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", color: "#d1d5db" }}>RAKUDA INVOICE</span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: "8px 16px",
              border: "none",
              background: activeTab === i ? "rgba(59, 130, 246, 0.12)" : "transparent",
              color: activeTab === i ? "#60a5fa" : "#7a8494",
              fontSize: 13,
              cursor: "pointer",
              borderRadius: 6,
              fontWeight: activeTab === i ? 600 : 400,
            }}>{tab}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{
            padding: "7px 16px",
            background: "#3B82F6",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>新規請求書作成</button>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}>U</div>
        </div>
      </header>

      {/* Content */}
      <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Stats - prominent 2-column style */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 10,
              padding: "18px 20px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}>
              <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: s.subColor }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* 2-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          {/* Invoice Table */}
          <div style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 10,
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: 0 }}>最近の請求書</h2>
              <span style={{ fontSize: 11, color: "#7a8494" }}>全12件</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["請求番号", "取引先", "金額", "期日", "ステータス"].map((h, i) => (
                    <th key={i} style={{
                      padding: "10px 20px",
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
                      <td style={{ padding: "11px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{inv.id}</td>
                      <td style={{ padding: "11px 20px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
                      <td style={{ padding: "11px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>{formatCurrency(inv.amount)}</td>
                      <td style={{ padding: "11px 20px", fontSize: 12, color: "#7a8494" }}>{inv.due}</td>
                      <td style={{ padding: "11px 20px" }}>
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

          {/* Right sidebar panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Quick Actions */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 10,
              padding: 20,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>クイック操作</h3>
              {["請求書を作成", "取引先を追加", "レポート出力", "テンプレート管理"].map((action, i) => (
                <button key={i} style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 14px",
                  marginBottom: 6,
                  background: "rgba(255, 255, 255, 0.025)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: 6,
                  color: "#c8d1dc",
                  fontSize: 12,
                  cursor: "pointer",
                  textAlign: "left",
                }}>{action}</button>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 10,
              padding: 20,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>最近のアクティビティ</h3>
              {[
                { text: "INV-0042 が支払われました", time: "2時間前", color: "#4ade80" },
                { text: "INV-0041 を送信しました", time: "5時間前", color: "#3B82F6" },
                { text: "INV-0040 が期限超過です", time: "1日前", color: "#f87171" },
              ].map((a, i) => (
                <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < 2 ? "1px solid rgba(255, 255, 255, 0.03)" : "none" }}>
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
              color: n === 2 ? "#60a5fa" : "#7a8494",
              background: n === 2 ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              textDecoration: "none",
            }}>V{n}</a>
          ))}
        </div>
      </div>
    </div>
  );
}