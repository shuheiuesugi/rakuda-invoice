"use client";

import Link from "next/link";

const basePath = "/rakuda-invoice";

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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, strokeWidth: 1.5, stroke: "currentColor", fill: "none" }}>
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

const items = [
  { name: "Webアプリ開発", qty: 1, price: 400000 },
  { name: "サーバー保守", qty: 1, price: 80000 },
];
const subtotal = 480000;
const tax = 48000;
const total = 528000;

const timeline = [
  { date: "2026/03/15 14:30", text: "請求書を作成" },
  { date: "2026/03/15 14:35", text: "メールで送信" },
  { date: "2026/04/10 09:15", text: "入金確認" },
];

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

export default function InvoiceDetailPage() {
  return (
    <>
      {/* Back link */}
      <Link href="/demo/v6" style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        color: "#7a8494", fontSize: 13, textDecoration: "none", marginBottom: 20,
      }}>
        <ArrowIcon /> 請求書一覧に戻る
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
        {/* ── Left: PDF Preview ── */}
        <div style={{ ...glassCard, padding: 0, overflow: "hidden" }}>
          <div style={{
            background: "rgba(255,255,255,0.95)",
            color: "#1a1a1a",
            padding: "40px 36px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
            minHeight: 600,
          }}>
            {/* Invoice header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111", margin: 0 }}>請求書</h2>
                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>INV-2026-0042</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#999" }}>RAKUDA INVOICE</div>
              </div>
            </div>

            {/* From / To */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: "#999", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8 }}>FROM</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>株式会社サンプル</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 4, lineHeight: 1.6 }}>
                  T1234567890123<br />
                  東京都渋谷区神宮前1-2-3<br />
                  サンプルビル5F
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: "#999", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 8 }}>TO</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>株式会社テクノロジーズ</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 4, lineHeight: 1.6 }}>
                  東京都港区六本木4-5-6<br />
                  テクノビル8F
                </div>
              </div>
            </div>

            {/* Items table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
              <thead>
                <tr>
                  {["品目", "数量", "単価", "金額"].map((h, i) => (
                    <th key={i} style={{
                      padding: "10px 12px",
                      background: "#222",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 600,
                      textAlign: i === 0 ? "left" : "right",
                      letterSpacing: "0.04em",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px", fontSize: 12, color: "#333" }}>{item.name}</td>
                    <td style={{ padding: "12px", fontSize: 12, color: "#333", textAlign: "right" }}>{item.qty}</td>
                    <td style={{ padding: "12px", fontSize: 12, color: "#333", textAlign: "right" }}>{formatCurrency(item.price)}</td>
                    <td style={{ padding: "12px", fontSize: 12, color: "#333", textAlign: "right", fontWeight: 500 }}>{formatCurrency(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: 220 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, color: "#555" }}>
                  <span>小計</span><span>{formatCurrency(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, color: "#555" }}>
                  <span>消費税(10%)</span><span>{formatCurrency(tax)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 16, fontWeight: 700, color: "#111", borderTop: "2px solid #222", marginTop: 6 }}>
                  <span>合計</span><span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Bank info */}
            <div style={{ marginTop: 32, padding: "16px", background: "#f8f8f8", borderRadius: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#999", marginBottom: 6, letterSpacing: "0.04em" }}>振込先</div>
              <div style={{ fontSize: 12, color: "#444", lineHeight: 1.8 }}>
                三菱UFJ銀行 渋谷支店 普通 1234567<br />
                口座名義: カ）サンプル
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Metadata + Actions ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status card */}
          <div style={{ ...glassCard, padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{
                padding: "4px 14px", borderRadius: 9999,
                fontSize: 11, fontWeight: 600,
                color: "#4ade80", background: "rgba(74, 222, 128, 0.1)",
              }}>支払済</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "発行日", value: "2026/03/15" },
                { label: "支払期日", value: "2026/04/14" },
                { label: "支払条件", value: "末締め翌月末払い" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#7a8494" }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ ...glassCard, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#d1d5db", marginBottom: 12 }}>アクション</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "PDF生成", bg: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "rgba(59, 130, 246, 0.2)" },
                { label: "メール送信", bg: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "rgba(59, 130, 246, 0.2)" },
                { label: "編集", bg: "rgba(255,255,255,0.03)", color: "#d1d5db", border: "rgba(255,255,255,0.08)" },
                { label: "複製", bg: "rgba(255,255,255,0.03)", color: "#d1d5db", border: "rgba(255,255,255,0.08)" },
                { label: "削除", bg: "rgba(248, 113, 113, 0.08)", color: "#f87171", border: "rgba(248, 113, 113, 0.2)" },
              ].map((btn, i) => (
                <button key={i} style={{
                  padding: "9px 16px",
                  background: btn.bg,
                  border: `1px solid ${btn.border}`,
                  borderRadius: 6,
                  color: btn.color,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  textAlign: "left" as const,
                }}>{btn.label}</button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ ...glassCard, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#d1d5db", marginBottom: 16 }}>タイムライン</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {timeline.map((entry, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, paddingBottom: i < timeline.length - 1 ? 16 : 0,
                  position: "relative",
                }}>
                  {/* Timeline dot + line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 12 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: i === timeline.length - 1 ? "#4ade80" : "#3B82F6",
                      marginTop: 4, flexShrink: 0,
                    }} />
                    {i < timeline.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.08)", marginTop: 4 }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>{entry.date}</div>
                    <div style={{ fontSize: 12, color: "#e2e8f0" }}>{entry.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
