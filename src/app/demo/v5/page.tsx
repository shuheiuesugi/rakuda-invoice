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
  { id: "INV-2026-0036", client: "株式会社テクノロジーズ", amount: 330000, issued: "2026/02/15", due: "2026/03/17", status: "paid" as const },
  { id: "INV-2026-0035", client: "グローバル商事", amount: 770000, issued: "2026/02/10", due: "2026/03/12", status: "paid" as const },
];

const allInvoices = invoices;

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: "支払済", color: "#4ade80", bg: "rgba(74, 222, 128, 0.1)" },
  sent: { label: "送信済", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  overdue: { label: "期限超過", color: "#f87171", bg: "rgba(248, 113, 113, 0.1)" },
  draft: { label: "下書き", color: "#7a8494", bg: "rgba(122, 132, 148, 0.1)" },
};

const clients = [
  { name: "株式会社テクノロジーズ", contact: "田中 一郎", email: "tanaka@techco.jp", total: "¥858,000", invoices: 3, status: "active" },
  { name: "ABCコンサルティング", contact: "鈴木 花子", email: "suzuki@abc-consulting.jp", total: "¥165,000", invoices: 1, status: "active" },
  { name: "山田デザイン事務所", contact: "山田 次郎", email: "yamada@design.jp", total: "¥88,000", invoices: 1, status: "overdue" },
  { name: "グローバル商事", contact: "佐藤 三郎", email: "sato@global.co.jp", total: "¥2,090,000", invoices: 2, status: "active" },
  { name: "スタートアップ株式会社", contact: "高橋 四郎", email: "takahashi@startup.jp", total: "¥264,000", invoices: 1, status: "active" },
  { name: "フリーランス田中", contact: "田中 五郎", email: "tanaka5@free.jp", total: "¥55,000", invoices: 1, status: "pending" },
];

function NavIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const s = { width: size, height: size, strokeWidth: 1.5, stroke: "currentColor", fill: "none" };
  if (icon === "grid") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (icon === "file") return <svg viewBox="0 0 24 24" style={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (icon === "plus") return <svg viewBox="0 0 24 24" style={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (icon === "users") return <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
  if (icon === "settings") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
  if (icon === "arrow-left") return <svg viewBox="0 0 24 24" style={s}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
  if (icon === "check") return <svg viewBox="0 0 24 24" style={s}><polyline points="20 6 9 17 4 12"/></svg>;
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

const navTitles = ["ダッシュボード", "請求書一覧", "新規請求書作成", "取引先管理", "設定"];
const navSubtitles = [
  "2026年3月の請求書管理",
  "全請求書の確認・管理",
  "新しい請求書を作成します",
  "取引先情報の管理",
  "システム設定",
];

// --- Shared table row ---
function InvoiceRow({ inv, onClick }: { inv: typeof invoices[0]; onClick: () => void }) {
  const st = statusMap[inv.status];
  return (
    <tr
      onClick={onClick}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      <td style={{ padding: "12px 22px", fontSize: 12, color: "#60a5fa", fontWeight: 500 }}>{inv.id}</td>
      <td style={{ padding: "12px 22px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
      <td style={{ padding: "12px 22px", fontSize: 12, color: "#e2e8f0", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</td>
      <td style={{ padding: "12px 22px", fontSize: 11, color: "#7a8494" }}>{inv.issued}</td>
      <td style={{ padding: "12px 22px", fontSize: 11, color: "#7a8494" }}>{inv.due}</td>
      <td style={{ padding: "12px 22px" }}>
        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 9999, fontSize: 10, fontWeight: 600, color: st.color, background: st.bg }}>{st.label}</span>
      </td>
    </tr>
  );
}

// --- Invoice Detail View ---
function InvoiceDetail({ invoiceId, onBack }: { invoiceId: string; onBack: () => void }) {
  const inv = allInvoices.find(i => i.id === invoiceId);
  if (!inv) return null;
  const st = statusMap[inv.status];

  return (
    <div>
      <button
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#7a8494", cursor: "pointer", fontSize: 13, marginBottom: 20, padding: 0 }}
      >
        <NavIcon icon="arrow-left" size={16} />
        一覧に戻る
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
        {/* Main invoice card */}
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 4 }}>請求書番号</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>{inv.id}</div>
            </div>
            <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600, color: st.color, background: st.bg }}>{st.label}</span>
          </div>

          <div style={{ padding: "24px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6 }}>請求先</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{inv.client}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6 }}>請求金額</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#60a5fa", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6 }}>発行日</div>
                <div style={{ fontSize: 13, color: "#c8d1dc" }}>{inv.issued}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6 }}>支払期限</div>
                <div style={{ fontSize: 13, color: inv.status === "overdue" ? "#f87171" : "#c8d1dc" }}>{inv.due}</div>
              </div>
            </div>

            {/* Line items */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#d1d5db", marginBottom: 12 }}>明細</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["品目", "数量", "単価", "金額"].map(h => (
                      <th key={h} style={{ textAlign: "left", fontSize: 10, color: "#4b5563", fontWeight: 600, letterSpacing: "0.05em", paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "システム開発費", qty: 1, unit: Math.floor(inv.amount * 0.8) },
                    { name: "保守・サポート", qty: 1, unit: Math.floor(inv.amount * 0.2) },
                  ].map((item, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "#c8d1dc" }}>{item.name}</td>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "#7a8494" }}>1式</td>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "#c8d1dc", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(item.unit)}</td>
                      <td style={{ padding: "10px 0", fontSize: 12, color: "#e2e8f0", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(item.unit)}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td colSpan={3} style={{ padding: "12px 0", fontSize: 12, color: "#7a8494", textAlign: "right" }}>小計</td>
                    <td style={{ padding: "12px 0", fontSize: 13, fontWeight: 600, color: "#e2e8f0", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ padding: "4px 0", fontSize: 12, color: "#7a8494", textAlign: "right" }}>消費税(10%)</td>
                    <td style={{ padding: "4px 0", fontSize: 12, color: "#c8d1dc", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(Math.floor(inv.amount * 0.1))}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} style={{ padding: "12px 0", fontSize: 13, fontWeight: 700, color: "#d1d5db", textAlign: "right" }}>合計</td>
                    <td style={{ padding: "12px 0", fontSize: 16, fontWeight: 700, color: "#60a5fa", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(Math.floor(inv.amount * 1.1))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.12), rgba(167,139,250,0.06))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", marginBottom: 14 }}>アクション</div>
            {[
              { label: "PDFをダウンロード", color: "#3B82F6", bg: "rgba(59,130,246,0.15)" },
              { label: "メールで送信", color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
              { label: "支払済にする", color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
            ].map((btn, i) => (
              <button key={i} style={{ display: "block", width: "100%", padding: "10px 14px", marginBottom: i < 2 ? 8 : 0, background: btn.bg, border: `1px solid ${btn.color}30`, borderRadius: 8, color: btn.color, fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "left" }}>
                {btn.label}
              </button>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", marginBottom: 14 }}>履歴</div>
            {[
              { text: "請求書を作成", date: inv.issued, color: "#7a8494" },
              { text: "取引先に送信", date: inv.issued, color: "#3B82F6" },
              inv.status === "paid" ? { text: "支払確認", date: inv.due, color: "#4ade80" } : null,
              inv.status === "overdue" ? { text: "期限超過", date: inv.due, color: "#f87171" } : null,
            ].filter(Boolean).map((item, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                <div style={{ fontSize: 12, color: item!.color }}>{item!.text}</div>
                <div style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>{item!.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Dashboard ---
function Dashboard({ onInvoiceClick }: { onInvoiceClick: (id: string) => void }) {
  const stats = [
    { label: "月間売上合計", value: "¥2,847,000", gradFrom: "rgba(96, 165, 250, 0.12)", gradTo: "rgba(167, 139, 250, 0.06)", accent: "#60a5fa" },
    { label: "未回収", value: "¥423,000", gradFrom: "rgba(251, 191, 36, 0.10)", gradTo: "rgba(251, 191, 36, 0.02)", accent: "#fbbf24" },
    { label: "今月発行", value: "12通", gradFrom: "rgba(167, 139, 250, 0.10)", gradTo: "rgba(96, 165, 250, 0.04)", accent: "#a78bfa" },
    { label: "支払済", value: "8通", gradFrom: "rgba(74, 222, 128, 0.10)", gradTo: "rgba(74, 222, 128, 0.02)", accent: "#4ade80" },
  ];

  return (
    <>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: `linear-gradient(135deg, ${s.gradFrom}, ${s.gradTo})`, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: i === 0 ? "24px 28px" : "18px 20px" }}>
            <div style={{ fontSize: 11, color: "#7a8494", marginBottom: i === 0 ? 12 : 6, letterSpacing: "0.04em" }}>{s.label}</div>
            <div style={{ fontSize: i === 0 ? 30 : 20, fontWeight: 700, color: "#e2e8f0", lineHeight: 1 }}>{s.value}</div>
            {i === 0 && <div style={{ fontSize: 11, color: s.accent, marginTop: 8 }}>+12.3% 前月比</div>}
          </div>
        ))}
      </div>

      {/* Content: Asymmetric 2-column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {/* Invoice Table */}
        <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: 0 }}>最近の請求書</h2>
            <span style={{ fontSize: 11, color: "#7a8494" }}>クリックで詳細表示</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["請求番号", "取引先", "金額", "発行日", "期日", "ステータス"].map((h) => (
                  <th key={h} style={{ padding: "10px 22px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#4b5563", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 6).map((inv) => (
                <InvoiceRow key={inv.id} inv={inv} onClick={() => onInvoiceClick(inv.id)} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.08), rgba(167,139,250,0.04))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>月次サマリー</h3>
            {[
              { label: "発行済み金額", value: "¥2,420,000", color: "#e2e8f0" },
              { label: "回収済み", value: "¥792,000", color: "#4ade80" },
              { label: "未回収", value: "¥423,000", color: "#fbbf24" },
              { label: "期限超過", value: "¥88,000", color: "#f87171" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                <span style={{ fontSize: 12, color: "#7a8494" }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: item.color, fontVariantNumeric: "tabular-nums" }}>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>主要取引先</h3>
            {[
              { name: "グローバル商事", amount: "¥1,320,000" },
              { name: "株式会社テクノロジーズ", amount: "¥528,000" },
              { name: "スタートアップ株式会社", amount: "¥264,000" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                <span style={{ fontSize: 12, color: "#c8d1dc" }}>{c.name}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", fontVariantNumeric: "tabular-nums" }}>{c.amount}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>最新の更新</h3>
            {[
              { text: "INV-0042 支払確認", time: "2時間前", color: "#4ade80" },
              { text: "INV-0041 送信完了", time: "5時間前", color: "#3B82F6" },
              { text: "INV-0040 期限超過通知", time: "1日前", color: "#f87171" },
            ].map((a, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                <div style={{ fontSize: 12, color: "#c8d1dc", marginBottom: 2 }}>{a.text}</div>
                <div style={{ fontSize: 10, color: a.color }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// --- Invoice List ---
function InvoiceList({ onInvoiceClick }: { onInvoiceClick: (id: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filters = [
    { key: "all", label: "すべて" },
    { key: "sent", label: "送信済" },
    { key: "paid", label: "支払済" },
    { key: "overdue", label: "期限超過" },
    { key: "draft", label: "下書き" },
  ];

  const filtered = allInvoices.filter(inv => {
    const matchStatus = activeFilter === "all" || inv.status === activeFilter;
    const matchSearch = search === "" || inv.client.includes(search) || inv.id.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div>
      {/* Filter & Search bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                border: "1px solid",
                cursor: "pointer",
                background: activeFilter === f.key
                  ? "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(167,139,250,0.1))"
                  : "rgba(255,255,255,0.025)",
                borderColor: activeFilter === f.key ? "rgba(96,165,250,0.4)" : "rgba(255,255,255,0.06)",
                color: activeFilter === f.key ? "#60a5fa" : "#7a8494",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="請求番号・取引先で検索..."
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#e2e8f0",
            fontSize: 12,
            outline: "none",
            width: 220,
          }}
        />
      </div>

      <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db" }}>請求書一覧</span>
          <span style={{ fontSize: 11, color: "#7a8494" }}>{filtered.length}件</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["請求番号", "取引先", "金額", "発行日", "期日", "ステータス"].map(h => (
                <th key={h} style={{ padding: "10px 22px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#4b5563", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: "32px 22px", textAlign: "center", fontSize: 13, color: "#4b5563" }}>該当する請求書がありません</td></tr>
            ) : (
              filtered.map(inv => (
                <InvoiceRow key={inv.id} inv={inv} onClick={() => onInvoiceClick(inv.id)} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Create Invoice (3-step form) ---
function CreateInvoice() {
  const [step, setStep] = useState(1);

  const steps = [
    { num: 1, label: "取引先選択" },
    { num: 2, label: "明細入力" },
    { num: 3, label: "確認・送信" },
  ];

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{ display: "flex", alignItems: "center" }}>
            <div
              onClick={() => s.num < step && setStep(s.num)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 20px",
                borderRadius: 10,
                background: step === s.num
                  ? "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(167,139,250,0.1))"
                  : step > s.num
                    ? "rgba(74,222,128,0.08)"
                    : "rgba(255,255,255,0.025)",
                border: "1px solid",
                borderColor: step === s.num ? "rgba(96,165,250,0.4)" : step > s.num ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.06)",
                cursor: s.num < step ? "pointer" : "default",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: step > s.num ? "#4ade80" : step === s.num ? "#60a5fa" : "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: step >= s.num ? "#0a0e17" : "#4b5563",
                flexShrink: 0,
              }}>
                {step > s.num ? <NavIcon icon="check" size={12} /> : s.num}
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: step === s.num ? "#60a5fa" : step > s.num ? "#4ade80" : "#4b5563" }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.08)", margin: "0 4px" }} />}
          </div>
        ))}
      </div>

      {/* Step 1: Client selection */}
      {step === 1 && (
        <div style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.10), rgba(167,139,250,0.05))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", margin: "0 0 20px" }}>取引先を選択</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {clients.map((c, i) => (
              <div key={i} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(96,165,250,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#7a8494" }}>{c.contact}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: "#7a8494", display: "block", marginBottom: 6 }}>または新規取引先を入力</label>
            <input placeholder="取引先名を入力..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={() => setStep(2)} style={{ padding: "10px 24px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            次へ：明細入力
          </button>
        </div>
      )}

      {/* Step 2: Line items */}
      {step === 2 && (
        <div style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.10), rgba(96,165,250,0.05))", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", margin: "0 0 20px" }}>明細を入力</h3>
          <div style={{ marginBottom: 16 }}>
            {[
              { label: "品目名", placeholder: "例：Webサイト制作費" },
              { label: "数量", placeholder: "1" },
              { label: "単価（円）", placeholder: "300000" },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, color: "#7a8494", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 18px", background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 8, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#7a8494", marginBottom: 6 }}><span>小計</span><span style={{ color: "#e2e8f0" }}>¥300,000</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#7a8494", marginBottom: 6 }}><span>消費税(10%)</span><span style={{ color: "#e2e8f0" }}>¥30,000</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#60a5fa", marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}><span>合計</span><span>¥330,000</span></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(1)} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.05)", color: "#7a8494", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>戻る</button>
            <button onClick={() => setStep(3)} style={{ padding: "10px 24px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>次へ：確認</button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm & send */}
      {step === 3 && (
        <div style={{ background: "linear-gradient(135deg, rgba(74,222,128,0.08), rgba(96,165,250,0.05))", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 12, padding: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", margin: "0 0 20px" }}>内容を確認して送信</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {[
              { label: "請求先", value: "株式会社テクノロジーズ" },
              { label: "担当者", value: "田中 一郎" },
              { label: "発行日", value: "2026/03/26" },
              { label: "支払期限", value: "2026/04/25" },
            ].map((f, i) => (
              <div key={i} style={{ padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 }}>
                <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "16px 18px", background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 8, marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: "#7a8494", marginBottom: 4 }}>請求金額（税込）</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#4ade80" }}>¥330,000</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep(2)} style={{ padding: "10px 20px", background: "rgba(255,255,255,0.05)", color: "#7a8494", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>戻る</button>
            <button style={{ padding: "10px 20px", background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>下書き保存</button>
            <button style={{ padding: "10px 24px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>送信する</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Clients ---
function Clients() {
  const clientStatusMap: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: "取引中", color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
    overdue: { label: "期限超過", color: "#f87171", bg: "rgba(248,113,113,0.1)" },
    pending: { label: "未決済", color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {clients.map((c, i) => {
          const cs = clientStatusMap[c.status];
          return (
            <div key={i} style={{ background: "linear-gradient(135deg, rgba(96,165,250,0.08), rgba(167,139,250,0.04))", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 20, cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(96,165,250,0.25)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #60a5fa, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#0a0e17" }}>
                  {c.name[0]}
                </div>
                <span style={{ padding: "3px 10px", borderRadius: 9999, fontSize: 10, fontWeight: 600, color: cs.color, background: cs.bg }}>{cs.label}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "#7a8494", marginBottom: 12 }}>{c.contact} · {c.email}</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>取引総額</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", fontVariantNumeric: "tabular-nums" }}>{c.total}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#4b5563", marginBottom: 2 }}>請求書数</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>{c.invoices}件</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Settings ---
function Settings() {
  const sections = [
    {
      title: "会社情報",
      gradFrom: "rgba(96,165,250,0.10)",
      gradTo: "rgba(167,139,250,0.05)",
      fields: [
        { label: "会社名", value: "株式会社サンプル" },
        { label: "代表者名", value: "代表 太郎" },
        { label: "郵便番号", value: "100-0001" },
        { label: "住所", value: "東京都千代田区..." },
        { label: "電話番号", value: "03-0000-0000" },
        { label: "メールアドレス", value: "info@example.co.jp" },
      ],
    },
    {
      title: "銀行口座",
      gradFrom: "rgba(74,222,128,0.08)",
      gradTo: "rgba(74,222,128,0.02)",
      fields: [
        { label: "銀行名", value: "○○銀行" },
        { label: "支店名", value: "渋谷支店" },
        { label: "口座種別", value: "普通" },
        { label: "口座番号", value: "1234567" },
      ],
    },
    {
      title: "請求書設定",
      gradFrom: "rgba(167,139,250,0.08)",
      gradTo: "rgba(96,165,250,0.04)",
      fields: [
        { label: "支払期限（日数）", value: "30日" },
        { label: "消費税率", value: "10%" },
        { label: "請求書番号プレフィックス", value: "INV-" },
        { label: "備考デフォルト文", value: "お振込みの際は..." },
      ],
    },
    {
      title: "通知設定",
      gradFrom: "rgba(251,191,36,0.08)",
      gradTo: "rgba(251,191,36,0.02)",
      fields: [
        { label: "期限前リマインダー", value: "7日前" },
        { label: "期限超過通知", value: "有効" },
        { label: "支払確認通知", value: "有効" },
        { label: "週次レポート", value: "毎週月曜" },
      ],
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {sections.map((sec, i) => (
        <div key={i} style={{ background: `linear-gradient(135deg, ${sec.gradFrom}, ${sec.gradTo})`, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 22 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>{sec.title}</h3>
          {sec.fields.map((f, j) => (
            <div key={j} style={{ marginBottom: j < sec.fields.length - 1 ? 12 : 0 }}>
              <label style={{ fontSize: 10, color: "#7a8494", display: "block", marginBottom: 4 }}>{f.label}</label>
              <input
                defaultValue={f.value}
                style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: 12, outline: "none", boxSizing: "border-box" }}
              />
            </div>
          ))}
          <button style={{ marginTop: 16, padding: "8px 16px", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 6, color: "#60a5fa", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>保存する</button>
        </div>
      ))}
    </div>
  );
}

// --- Main Page ---
export default function V5Page() {
  const [activeNav, setActiveNav] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const handleNavChange = (i: number) => {
    setActiveNav(i);
    setSelectedInvoice(null);
  };

  const handleInvoiceClick = (id: string) => {
    setSelectedInvoice(id);
  };

  const handleBack = () => {
    setSelectedInvoice(null);
  };

  const getTitle = () => {
    if (selectedInvoice) return selectedInvoice;
    return navTitles[activeNav];
  };
  const getSubtitle = () => {
    if (selectedInvoice) return "請求書詳細";
    return navSubtitles[activeNav];
  };

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
              onClick={() => handleNavChange(i)}
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
          <button
            onClick={() => handleNavChange(2)}
            style={{
              width: "100%",
              padding: "10px 16px",
              background: "#3B82F6",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >新規請求書作成</button>
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

      {/* Main */}
      <main style={{ flex: 1, padding: "28px 36px", overflow: "auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#d1d5db", margin: "0 0 4px" }}>{getTitle()}</h1>
          <p style={{ fontSize: 12, color: "#7a8494", margin: 0 }}>{getSubtitle()}</p>
        </div>

        {/* Content routing */}
        {selectedInvoice ? (
          <InvoiceDetail invoiceId={selectedInvoice} onBack={handleBack} />
        ) : activeNav === 0 ? (
          <Dashboard onInvoiceClick={handleInvoiceClick} />
        ) : activeNav === 1 ? (
          <InvoiceList onInvoiceClick={handleInvoiceClick} />
        ) : activeNav === 2 ? (
          <CreateInvoice />
        ) : activeNav === 3 ? (
          <Clients />
        ) : (
          <Settings />
        )}

        {/* Footer nav */}
        <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
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
