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

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

export default function V4Page() {
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);

  const stats = [
    { label: "月間売上合計", value: "¥2,847,000" },
    { label: "未回収", value: "¥423,000" },
    { label: "今月発行", value: "12通" },
    { label: "支払済", value: "8通" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Minimal Top Bar */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: 52,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#60a5fa" }}><WaveLogo /></span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", color: "#d1d5db" }}>RAKUDA INVOICE</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <button style={{
            padding: "8px 18px",
            background: "#3B82F6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>新規請求書作成</button>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}>U</div>
        </div>
      </header>

      {/* Full-screen content with floating panels */}
      <div style={{ padding: "20px 48px 48px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Stats row - elevated cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 36 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 16,
              padding: "28px 24px",
              transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#e2e8f0", lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Navigation breadcrumbs - minimal */}
        <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
          {["ダッシュボード", "請求書一覧", "取引先", "設定"].map((item, i) => (
            <button key={i} style={{
              background: "none",
              border: "none",
              color: i === 0 ? "#60a5fa" : "#4b5563",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              fontWeight: i === 0 ? 600 : 400,
              borderBottom: i === 0 ? "2px solid #3B82F6" : "2px solid transparent",
              paddingBottom: 8,
            }}>{item}</button>
          ))}
        </div>

        {/* Invoice List - spacious floating panel */}
        <div style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "20px 28px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: 0 }}>請求書一覧</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                padding: "6px 14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: 8,
                fontSize: 12,
                color: "#475569",
              }}>検索...</div>
            </div>
          </div>

          {/* Invoice cards - spacious */}
          <div style={{ padding: "16px 28px" }}>
            {invoices.map((inv, i) => {
              const st = statusMap[inv.status];
              const isSelected = selectedInvoice === i;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedInvoice(isSelected ? null : i)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr 140px 120px 120px 100px",
                    alignItems: "center",
                    padding: "18px 0",
                    borderBottom: i < invoices.length - 1 ? "1px solid rgba(255, 255, 255, 0.03)" : "none",
                    cursor: "pointer",
                    opacity: isSelected ? 1 : 0.85,
                    transition: "opacity 0.15s",
                  }}
                >
                  <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{inv.id}</div>
                  <div style={{ fontSize: 13, color: "#c8d1dc" }}>{inv.client}</div>
                  <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</div>
                  <div style={{ fontSize: 12, color: "#7a8494" }}>{inv.issued}</div>
                  <div style={{ fontSize: 12, color: "#7a8494" }}>{inv.due}</div>
                  <div>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 9999,
                      fontSize: 11,
                      fontWeight: 600,
                      color: st.color,
                      background: st.bg,
                    }}>{st.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel - shown when selected */}
        {selectedInvoice !== null && (
          <div style={{
            marginTop: 20,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 16,
            padding: "28px 32px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db", margin: "0 0 4px" }}>{invoices[selectedInvoice].id}</h3>
                <p style={{ fontSize: 13, color: "#7a8494", margin: 0 }}>{invoices[selectedInvoice].client}</p>
              </div>
              <span style={{
                padding: "6px 16px",
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                color: statusMap[invoices[selectedInvoice].status].color,
                background: statusMap[invoices[selectedInvoice].status].bg,
              }}>{statusMap[invoices[selectedInvoice].status].label}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {[
                { label: "金額", value: formatCurrency(invoices[selectedInvoice].amount) },
                { label: "発行日", value: invoices[selectedInvoice].issued },
                { label: "支払期日", value: invoices[selectedInvoice].due },
                { label: "ステータス", value: statusMap[invoices[selectedInvoice].status].label },
              ].map((d, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 4 }}>{d.label}</div>
                  <div style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 600 }}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <a key={n} href={`${basePath}/demo/v${n}`} style={{
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 12,
              color: n === 4 ? "#60a5fa" : "#7a8494",
              background: n === 4 ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              textDecoration: "none",
            }}>V{n}</a>
          ))}
        </div>
      </div>
    </div>
  );
}