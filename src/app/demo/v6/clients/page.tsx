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

const clients = [
  { name: "株式会社テクノロジーズ", contact: "田中太郎", email: "tanaka@tech.co.jp", invoiceCount: 8, total: 4224000, lastDate: "2026/03/15" },
  { name: "ABCコンサルティング", contact: "佐藤花子", email: "sato@abc.co.jp", invoiceCount: 5, total: 825000, lastDate: "2026/03/10" },
  { name: "山田デザイン事務所", contact: "山田一郎", email: "yamada@design.jp", invoiceCount: 3, total: 264000, lastDate: "2026/03/05" },
  { name: "グローバル商事", contact: "鈴木健一", email: "suzuki@global.co.jp", invoiceCount: 12, total: 15840000, lastDate: "2026/03/01" },
  { name: "スタートアップ株式会社", contact: "高橋美咲", email: "takahashi@startup.jp", invoiceCount: 6, total: 1584000, lastDate: "2026/02/25" },
  { name: "フリーランス田中", contact: "田中裕子", email: "tanaka.y@gmail.com", invoiceCount: 2, total: 110000, lastDate: "2026/02/20" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(c => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db", margin: 0 }}>取引先</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="text"
            placeholder="取引先を検索..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 6,
              color: "#e2e8f0",
              fontSize: 12,
              width: 200,
              outline: "none",
            }}
          />
          <button style={{
            padding: "8px 16px",
            background: "#3B82F6",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>取引先を追加</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ ...glassCard, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["会社名", "担当者", "メール", "請求件数", "合計金額", "最終請求日"].map((h, i) => (
                  <th key={i} style={{
                    padding: "10px 20px",
                    textAlign: i >= 3 ? "right" : "left",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#4b5563",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    whiteSpace: "nowrap" as const,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  transition: "background 0.15s",
                  cursor: "pointer",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{c.name}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#7a8494" }}>{c.contact}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#60a5fa" }}>{c.email}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#7a8494", textAlign: "right" }}>{c.invoiceCount}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#e2e8f0", textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" as const }}>{formatCurrency(c.total)}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12, color: "#7a8494", textAlign: "right" }}>{c.lastDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{
          padding: "10px 20px",
          borderTop: "1px solid rgba(255,255,255,0.03)",
          fontSize: 11,
          color: "#4b5563",
        }}>
          {filtered.length}件の取引先
        </div>
      </div>
    </>
  );
}
