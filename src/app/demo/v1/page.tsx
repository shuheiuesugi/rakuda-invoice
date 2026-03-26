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

const navItems = [
  { label: "ダッシュボード", icon: "grid" },
  { label: "請求書一覧", icon: "file" },
  { label: "新規作成", icon: "plus" },
  { label: "取引先", icon: "users" },
  { label: "設定", icon: "settings" },
];

const clients = [
  { id: "c1", name: "株式会社テクノロジーズ", contact: "鈴木 太郎", email: "suzuki@technologies.co.jp", invoiceCount: 14, total: 3850000 },
  { id: "c2", name: "ABCコンサルティング", contact: "田中 花子", email: "tanaka@abc-consulting.jp", invoiceCount: 8, total: 1240000 },
  { id: "c3", name: "山田デザイン事務所", contact: "山田 健一", email: "yamada@design.jp", invoiceCount: 5, total: 440000 },
  { id: "c4", name: "グローバル商事", contact: "佐藤 美佳", email: "sato@global.co.jp", invoiceCount: 22, total: 8910000 },
  { id: "c5", name: "スタートアップ株式会社", contact: "伊藤 直樹", email: "ito@startup.co.jp", invoiceCount: 6, total: 792000 },
  { id: "c6", name: "フリーランス田中", contact: "田中 誠", email: "tanaka.m@freelance.jp", invoiceCount: 3, total: 165000 },
];

const lineItemsInitial = [
  { name: "Webサイト制作（デザイン）", qty: 1, price: 300000 },
  { name: "コーディング実装", qty: 1, price: 150000 },
  { name: "保守・運用サポート（月額）", qty: 3, price: 26000 },
];

function NavIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const s = { width: size, height: size, strokeWidth: 1.5, stroke: "currentColor", fill: "none" };
  if (icon === "grid") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (icon === "file") return <svg viewBox="0 0 24 24" style={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (icon === "plus") return <svg viewBox="0 0 24 24" style={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (icon === "users") return <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
  if (icon === "settings") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
  if (icon === "arrow-left") return <svg viewBox="0 0 24 24" style={s}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
  if (icon === "download") return <svg viewBox="0 0 24 24" style={s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
  if (icon === "send") return <svg viewBox="0 0 24 24" style={s}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
  if (icon === "check") return <svg viewBox="0 0 24 24" style={s}><polyline points="20 6 9 17 4 12"/></svg>;
  if (icon === "search") return <svg viewBox="0 0 24 24" style={s}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
  if (icon === "building") return <svg viewBox="0 0 24 24" style={s}><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/></svg>;
  if (icon === "mail") return <svg viewBox="0 0 24 24" style={s}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
  if (icon === "user") return <svg viewBox="0 0 24 24" style={s}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  if (icon === "bell") return <svg viewBox="0 0 24 24" style={s}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
  if (icon === "credit-card") return <svg viewBox="0 0 24 24" style={s}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
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

const card = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.05)",
  borderRadius: 12,
} as const;

const thStyle: React.CSSProperties = {
  padding: "12px 24px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 600,
  color: "#4b5563",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderBottom: "1px solid rgba(255,255,255,0.03)",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 24px",
  fontSize: 13,
  borderBottom: "1px solid rgba(255,255,255,0.03)",
};

function StatusBadge({ status }: { status: string }) {
  const st = statusMap[status];
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 600,
      color: st.color,
      background: st.bg,
    }}>{st.label}</span>
  );
}

function InvoiceTable({ data, onRowClick }: { data: typeof invoices; onRowClick: (id: string) => void }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {["請求番号", "取引先", "金額", "発行日", "支払期日", "ステータス"].map((h, i) => (
            <th key={i} style={thStyle}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((inv, i) => (
          <tr
            key={i}
            onClick={() => onRowClick(inv.id)}
            style={{ cursor: "pointer", transition: "background 0.1s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <td style={{ ...tdStyle, color: "#60a5fa", fontWeight: 500 }}>{inv.id}</td>
            <td style={{ ...tdStyle, color: "#c8d1dc" }}>{inv.client}</td>
            <td style={{ ...tdStyle, color: "#e2e8f0", fontWeight: 600 }}>{formatCurrency(inv.amount)}</td>
            <td style={{ ...tdStyle, color: "#7a8494" }}>{inv.issued}</td>
            <td style={{ ...tdStyle, color: "#7a8494" }}>{inv.due}</td>
            <td style={tdStyle}><StatusBadge status={inv.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ---- INVOICE DETAIL VIEW ----
function InvoiceDetail({ invoiceId, onBack }: { invoiceId: string; onBack: () => void }) {
  const inv = invoices.find(i => i.id === invoiceId) || invoices[0];
  const st = statusMap[inv.status];
  const items = [
    { name: "Webサイト制作", qty: 1, price: inv.amount * 0.6 },
    { name: "コーディング実装", qty: 1, price: inv.amount * 0.3 },
    { name: "保守サポート（月額）", qty: 2, price: inv.amount * 0.05 },
  ];
  const subtotal = inv.amount;
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  const timeline = [
    { label: "下書き作成", date: inv.issued, done: true },
    { label: "送信", date: inv.issued, done: inv.status !== "draft" },
    { label: "支払確認", date: inv.due, done: inv.status === "paid" },
  ];

  return (
    <div>
      {/* Back + Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button
          onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", color: "#7a8494", cursor: "pointer", fontSize: 13 }}
        >
          <NavIcon icon="arrow-left" size={16} />
          一覧に戻る
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, cursor: "pointer" }}>
            <NavIcon icon="download" size={14} /> PDFダウンロード
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#3B82F6", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <NavIcon icon="send" size={14} /> 送信
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Left: Invoice content */}
        <div style={{ ...card, padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#d1d5db", marginBottom: 4 }}>{inv.id}</div>
              <div style={{ fontSize: 13, color: "#7a8494" }}>発行日: {inv.issued} &nbsp;|&nbsp; 支払期日: {inv.due}</div>
            </div>
            <StatusBadge status={inv.status} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>請求元</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db" }}>株式会社RAKUDA</div>
              <div style={{ fontSize: 12, color: "#7a8494", marginTop: 4 }}>東京都渋谷区神宮前1-1-1</div>
              <div style={{ fontSize: 12, color: "#7a8494" }}>03-1234-5678</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>請求先</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db" }}>{inv.client}</div>
              <div style={{ fontSize: 12, color: "#7a8494", marginTop: 4 }}>ご担当者様</div>
            </div>
          </div>

          {/* Line items */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["品名", "数量", "単価", "金額"].map((h, i) => (
                  <th key={i} style={{ ...thStyle, paddingLeft: i === 0 ? 0 : 16, paddingRight: 0 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ ...tdStyle, color: "#c8d1dc", paddingLeft: 0 }}>{item.name}</td>
                  <td style={{ ...tdStyle, color: "#7a8494", paddingLeft: 16, paddingRight: 0 }}>{item.qty}</td>
                  <td style={{ ...tdStyle, color: "#7a8494", paddingLeft: 16, paddingRight: 0 }}>{formatCurrency(item.price)}</td>
                  <td style={{ ...tdStyle, color: "#e2e8f0", fontWeight: 500, paddingLeft: 16, paddingRight: 0 }}>{formatCurrency(item.qty * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
            <div style={{ display: "flex", gap: 40, fontSize: 13 }}>
              <span style={{ color: "#7a8494" }}>小計</span>
              <span style={{ color: "#e2e8f0" }}>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: "flex", gap: 40, fontSize: 13 }}>
              <span style={{ color: "#7a8494" }}>消費税（10%）</span>
              <span style={{ color: "#e2e8f0" }}>{formatCurrency(tax)}</span>
            </div>
            <div style={{ display: "flex", gap: 40, fontSize: 16, fontWeight: 700, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color: "#d1d5db" }}>合計</span>
              <span style={{ color: "#60a5fa" }}>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Right: Metadata + Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status card */}
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>ステータス</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: st.color, display: "inline-block" }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: st.color }}>{st.label}</span>
            </div>
          </div>

          {/* Dates */}
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>日付情報</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 2 }}>発行日</div>
                <div style={{ fontSize: 13, color: "#e2e8f0" }}>{inv.issued}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 2 }}>支払期日</div>
                <div style={{ fontSize: 13, color: inv.status === "overdue" ? "#f87171" : "#e2e8f0" }}>{inv.due}</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ ...card, padding: 20 }}>
            <div style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16 }}>タイムライン</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {timeline.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                    background: t.done ? "rgba(74, 222, 128, 0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${t.done ? "#4ade80" : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: t.done ? "#4ade80" : "#4b5563",
                  }}>
                    {t.done && <NavIcon icon="check" size={11} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: t.done ? "#d1d5db" : "#7a8494" }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: "#4b5563" }}>{t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- DASHBOARD ----
function Dashboard({ onRowClick, onNewInvoice }: { onRowClick: (id: string) => void; onNewInvoice: () => void }) {
  const stats = [
    { label: "月間売上合計", value: "¥2,847,000" },
    { label: "未回収", value: "¥423,000" },
    { label: "今月発行", value: "12通" },
    { label: "支払済", value: "8通" },
  ];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#d1d5db", margin: 0 }}>ダッシュボード</h1>
          <p style={{ fontSize: 13, color: "#7a8494", margin: "4px 0 0" }}>請求書の管理と売上の確認</p>
        </div>
        <button onClick={onNewInvoice} style={{ padding: "10px 20px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          新規請求書作成
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...card, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, color: "#7a8494", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0" }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ ...card, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", margin: 0 }}>最近の請求書</h2>
        </div>
        <InvoiceTable data={invoices} onRowClick={onRowClick} />
      </div>
    </>
  );
}

// ---- INVOICE LIST ----
function InvoiceList({ onRowClick, onNewInvoice }: { onRowClick: (id: string) => void; onNewInvoice: () => void }) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filterOptions = [
    { key: "all", label: "すべて" },
    { key: "paid", label: "支払済" },
    { key: "sent", label: "送信済" },
    { key: "overdue", label: "期限超過" },
    { key: "draft", label: "下書き" },
  ];

  const filtered = invoices.filter(inv => {
    const matchStatus = filter === "all" || inv.status === filter;
    const matchSearch = search === "" || inv.id.includes(search) || inv.client.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#d1d5db", margin: 0 }}>請求書一覧</h1>
          <p style={{ fontSize: 13, color: "#7a8494", margin: "4px 0 0" }}>全{invoices.length}件の請求書</p>
        </div>
        <button onClick={onNewInvoice} style={{ padding: "10px 20px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          新規請求書作成
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {filterOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              style={{
                padding: "6px 14px",
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 500,
                border: "1px solid",
                cursor: "pointer",
                borderColor: filter === opt.key ? "#3B82F6" : "rgba(255,255,255,0.08)",
                background: filter === opt.key ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.025)",
                color: filter === opt.key ? "#60a5fa" : "#7a8494",
              }}
            >{opt.label}</button>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4b5563", pointerEvents: "none" }}>
            <NavIcon icon="search" size={14} />
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="請求番号・取引先で検索..."
            style={{
              width: "100%",
              padding: "7px 12px 7px 34px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              color: "#e2e8f0",
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      <div style={{ ...card, overflow: "hidden" }}>
        {filtered.length > 0 ? (
          <InvoiceTable data={filtered} onRowClick={onRowClick} />
        ) : (
          <div style={{ padding: 48, textAlign: "center", color: "#4b5563", fontSize: 14 }}>
            該当する請求書が見つかりません
          </div>
        )}
      </div>
    </>
  );
}

// ---- NEW INVOICE FORM ----
function NewInvoice({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const clientList = ["株式会社テクノロジーズ", "ABCコンサルティング", "山田デザイン事務所", "グローバル商事"];
  const lineItems = lineItemsInitial;
  const subtotal = lineItems.reduce((acc, it) => acc + it.qty * it.price, 0);
  const tax = Math.floor(subtotal * 0.1);
  const total = subtotal + tax;

  const stepLabels = ["取引先選択", "明細入力", "確認・送信"];

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 20 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80" }}>
          <NavIcon icon="check" size={28} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db" }}>請求書を作成しました</div>
        <div style={{ fontSize: 13, color: "#7a8494" }}>INV-2026-0043 として保存されました</div>
        <button onClick={onComplete} style={{ padding: "10px 24px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
          一覧に戻る
        </button>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#d1d5db", margin: "0 0 20px" }}>新規請求書作成</h1>
        {/* Step indicators */}
        <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
          {stepLabels.map((label, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: done ? "rgba(74,222,128,0.2)" : active ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${done ? "#4ade80" : active ? "#3B82F6" : "rgba(255,255,255,0.1)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                    color: done ? "#4ade80" : active ? "#60a5fa" : "#4b5563",
                  }}>
                    {done ? <NavIcon icon="check" size={12} /> : num}
                  </div>
                  <span style={{ fontSize: 13, color: active ? "#e2e8f0" : done ? "#7a8494" : "#4b5563" }}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.08)", margin: "0 12px" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div style={{ ...card, padding: 28, maxWidth: 560 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", marginBottom: 20 }}>取引先を選択してください</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {clientList.map((name, i) => (
              <button
                key={i}
                onClick={() => setSelectedClient(name)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 18px",
                  background: selectedClient === name ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedClient === name ? "#3B82F6" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 10, cursor: "pointer", textAlign: "left", width: "100%",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", flexShrink: 0 }}>
                  <NavIcon icon="building" size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: selectedClient === name ? "#60a5fa" : "#e2e8f0" }}>{name}</div>
                </div>
                {selectedClient === name && (
                  <div style={{ marginLeft: "auto", color: "#60a5fa" }}><NavIcon icon="check" size={16} /></div>
                )}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
            <button
              onClick={() => selectedClient && setStep(2)}
              disabled={!selectedClient}
              style={{ padding: "10px 24px", background: selectedClient ? "#3B82F6" : "rgba(255,255,255,0.05)", color: selectedClient ? "#fff" : "#4b5563", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: selectedClient ? "pointer" : "not-allowed" }}
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={{ ...card, padding: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", marginBottom: 6 }}>明細入力</div>
          <div style={{ fontSize: 13, color: "#7a8494", marginBottom: 20 }}>請求先: {selectedClient}</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr>
                {["品名", "数量", "単価", "金額"].map((h, i) => (
                  <th key={i} style={{ ...thStyle, paddingLeft: i === 0 ? 0 : 16, paddingRight: 0 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ ...tdStyle, color: "#c8d1dc", paddingLeft: 0 }}>{item.name}</td>
                  <td style={{ ...tdStyle, color: "#7a8494", paddingLeft: 16, paddingRight: 0 }}>{item.qty}</td>
                  <td style={{ ...tdStyle, color: "#7a8494", paddingLeft: 16, paddingRight: 0 }}>{formatCurrency(item.price)}</td>
                  <td style={{ ...tdStyle, color: "#e2e8f0", fontWeight: 500, paddingLeft: 16, paddingRight: 0 }}>{formatCurrency(item.qty * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 40, fontSize: 13 }}><span style={{ color: "#7a8494" }}>小計</span><span style={{ color: "#e2e8f0" }}>{formatCurrency(subtotal)}</span></div>
            <div style={{ display: "flex", gap: 40, fontSize: 13 }}><span style={{ color: "#7a8494" }}>消費税（10%）</span><span style={{ color: "#e2e8f0" }}>{formatCurrency(tax)}</span></div>
            <div style={{ display: "flex", gap: 40, fontSize: 16, fontWeight: 700, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color: "#d1d5db" }}>合計</span><span style={{ color: "#60a5fa" }}>{formatCurrency(total)}</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(1)} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, cursor: "pointer" }}>戻る</button>
            <button onClick={() => setStep(3)} style={{ padding: "10px 24px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>次へ</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div style={{ maxWidth: 620 }}>
          <div style={{ ...card, padding: 28, marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", marginBottom: 20 }}>内容を確認してください</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div style={{ ...card, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>請求番号</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#60a5fa" }}>INV-2026-0043</div>
              </div>
              <div style={{ ...card, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>請求先</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db" }}>{selectedClient}</div>
              </div>
              <div style={{ ...card, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>発行日</div>
                <div style={{ fontSize: 14, color: "#e2e8f0" }}>2026/03/26</div>
              </div>
              <div style={{ ...card, padding: 16 }}>
                <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>支払期日</div>
                <div style={{ fontSize: 14, color: "#e2e8f0" }}>2026/04/25</div>
              </div>
            </div>
            <div style={{ padding: 16, background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700 }}>
                <span style={{ color: "#d1d5db" }}>請求合計</span>
                <span style={{ color: "#60a5fa" }}>{formatCurrency(total)}</span>
              </div>
              <div style={{ fontSize: 12, color: "#7a8494", marginTop: 4 }}>内消費税: {formatCurrency(tax)}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(2)} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, cursor: "pointer" }}>戻る</button>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "10px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, cursor: "pointer" }}>下書き保存</button>
              <button onClick={() => setSubmitted(true)} style={{ padding: "10px 24px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>作成・送信</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---- CLIENT LIST ----
function ClientList() {
  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#d1d5db", margin: 0 }}>取引先</h1>
        <p style={{ fontSize: 13, color: "#7a8494", margin: "4px 0 0" }}>{clients.length}件の取引先</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {clients.map((c, i) => (
          <div key={i} style={{ ...card, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", flexShrink: 0 }}>
                <NavIcon icon="building" size={18} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#7a8494", marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
                  <NavIcon icon="user" size={11} /> {c.contact}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#7a8494", display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              <NavIcon icon="mail" size={11} /> {c.email}
            </div>
            <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 4 }}>請求件数</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{c.invoiceCount}通</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#4b5563", marginBottom: 4 }}>累計請求額</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#60a5fa" }}>{formatCurrency(c.total)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ---- SETTINGS ----
function Settings() {
  const [notifications, setNotifications] = useState({ payment: true, overdue: true, weekly: false });

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#d1d5db", margin: 0 }}>設定</h1>
        <p style={{ fontSize: 13, color: "#7a8494", margin: "4px 0 0" }}>アカウントと通知の設定</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
        {/* Company info */}
        <div style={{ ...card, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ color: "#60a5fa" }}><NavIcon icon="building" size={16} /></span>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db" }}>事業者情報</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "会社名", value: "株式会社RAKUDA" },
              { label: "住所", value: "東京都渋谷区神宮前1-1-1" },
              { label: "電話番号", value: "03-1234-5678" },
            ].map((f, i) => (
              <div key={i}>
                <div style={{ fontSize: 12, color: "#7a8494", marginBottom: 6 }}>{f.label}</div>
                <input
                  defaultValue={f.value}
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <button style={{ padding: "8px 20px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>保存</button>
            </div>
          </div>
        </div>

        {/* Bank info */}
        <div style={{ ...card, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ color: "#60a5fa" }}><NavIcon icon="credit-card" size={16} /></span>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db" }}>振込先</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "銀行名", value: "三菱UFJ銀行" },
              { label: "支店名", value: "渋谷支店" },
              { label: "口座種別", value: "普通" },
              { label: "口座番号", value: "1234567" },
              { label: "口座名義", value: "カ）ラクダ" },
            ].map((f, i) => (
              <div key={i}>
                <div style={{ fontSize: 12, color: "#7a8494", marginBottom: 6 }}>{f.label}</div>
                <input
                  defaultValue={f.value}
                  style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
              <button style={{ padding: "8px 20px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>保存</button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ ...card, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ color: "#60a5fa" }}><NavIcon icon="bell" size={16} /></span>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db" }}>メール通知</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { key: "payment" as const, label: "支払完了通知", desc: "取引先が支払いを完了した際に通知" },
              { key: "overdue" as const, label: "期限超過アラート", desc: "支払期日を過ぎた請求書がある場合に通知" },
              { key: "weekly" as const, label: "週次レポート", desc: "毎週月曜日に売上サマリーを送信" },
            ].map((item) => (
              <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div>
                  <div style={{ fontSize: 13, color: "#d1d5db", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: "#7a8494" }}>{item.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  style={{
                    width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                    background: notifications[item.key] ? "#3B82F6" : "rgba(255,255,255,0.08)",
                    position: "relative", flexShrink: 0, marginLeft: 20, transition: "background 0.2s",
                  }}
                >
                  <div style={{
                    position: "absolute", top: 3, left: notifications[item.key] ? 23 : 3,
                    width: 18, height: 18, borderRadius: "50%", background: "#fff",
                    transition: "left 0.2s",
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Plan */}
        <div style={{ ...card, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ color: "#60a5fa" }}><NavIcon icon="check" size={16} /></span>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db" }}>プラン</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#60a5fa" }}>スタンダードプラン</div>
              <div style={{ fontSize: 12, color: "#7a8494", marginTop: 2 }}>月額 ¥4,980 / 請求書無制限・取引先50社まで</div>
            </div>
            <button style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e2e8f0", fontSize: 12, cursor: "pointer" }}>
              プランを変更
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ---- PAGE ROOT ----
export default function V1Page() {
  const [activeNav, setActiveNav] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setSelectedInvoice(id);
  };

  const handleBack = () => {
    setSelectedInvoice(null);
  };

  const handleNewInvoice = () => {
    setSelectedInvoice(null);
    setActiveNav(2);
  };

  const handleNavChange = (i: number) => {
    setActiveNav(i);
    setSelectedInvoice(null);
  };

  const pageTitle = [
    "ダッシュボード",
    "請求書一覧",
    "新規作成",
    "取引先",
    "設定",
  ][activeNav];

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Sidebar 200px */}
      <aside style={{
        width: 200,
        minHeight: "100vh",
        background: "rgba(6, 10, 18, 0.5)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px", marginBottom: 40 }}>
          <span style={{ color: "#60a5fa" }}><WaveLogo size={28} /></span>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", color: "#d1d5db" }}>RAKUDA INVOICE</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1 }}>
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavChange(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 20px",
                border: "none",
                background: activeNav === i ? "rgba(59, 130, 246, 0.1)" : "transparent",
                color: activeNav === i ? "#60a5fa" : "#7a8494",
                cursor: "pointer",
                fontSize: 13,
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <NavIcon icon={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "0 20px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, color: "#fff",
          }}>U</div>
          <span style={{ fontSize: 12, color: "#7a8494" }}>ユーザー</span>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 40px", overflow: "auto" }}>

        {/* Invoice Detail (overlay content) */}
        {selectedInvoice ? (
          <InvoiceDetail invoiceId={selectedInvoice} onBack={handleBack} />
        ) : (
          <>
            {activeNav === 0 && <Dashboard onRowClick={handleRowClick} onNewInvoice={handleNewInvoice} />}
            {activeNav === 1 && <InvoiceList onRowClick={handleRowClick} onNewInvoice={handleNewInvoice} />}
            {activeNav === 2 && <NewInvoice onComplete={() => setActiveNav(1)} />}
            {activeNav === 3 && <ClientList />}
            {activeNav === 4 && <Settings />}
          </>
        )}

        {/* Footer nav */}
        <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <a key={n} href={`${basePath}/demo/v${n}`} style={{
              padding: "6px 14px",
              borderRadius: 6,
              fontSize: 12,
              color: n === 1 ? "#60a5fa" : "#7a8494",
              background: n === 1 ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.025)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              textDecoration: "none",
            }}>V{n}</a>
          ))}
        </div>
      </main>
    </div>
  );
}
