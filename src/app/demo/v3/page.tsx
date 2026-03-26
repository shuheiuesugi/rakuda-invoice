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

const clients = [
  { id: "C-001", name: "株式会社テクノロジーズ", contact: "鈴木 一郎", email: "suzuki@technologies.co.jp", invoices: 8, total: 2640000 },
  { id: "C-002", name: "ABCコンサルティング", contact: "田中 花子", email: "tanaka@abc-consulting.jp", invoices: 3, total: 495000 },
  { id: "C-003", name: "山田デザイン事務所", contact: "山田 太郎", email: "yamada@design-office.jp", invoices: 5, total: 440000 },
  { id: "C-004", name: "グローバル商事", contact: "佐藤 次郎", email: "sato@global-shoji.co.jp", invoices: 2, total: 2640000 },
  { id: "C-005", name: "スタートアップ株式会社", contact: "伊藤 美咲", email: "ito@startup.co.jp", invoices: 4, total: 1056000 },
  { id: "C-006", name: "フリーランス田中", contact: "田中 健", email: "ken.tanaka@freelance.jp", invoices: 6, total: 330000 },
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
  if (icon === "arrow-left") return <svg viewBox="0 0 24 24" style={s}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
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

const navTitles = ["ダッシュボード", "請求書一覧", "新規作成", "取引先", "設定"];

const accentCard = (accent: string) => ({
  background: "rgba(255,255,255,0.025)",
  borderLeft: `3px solid ${accent}`,
  borderTop: "1px solid rgba(255,255,255,0.05)",
  borderRight: "1px solid rgba(255,255,255,0.05)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  borderRadius: "0 8px 8px 0",
});

// --- Dashboard View ---
function DashboardView({ onRowClick }: { onRowClick: (id: string) => void }) {
  const stats = [
    { label: "月間売上", value: "¥2,847,000", accent: "#60a5fa" },
    { label: "未回収", value: "¥423,000", accent: "#fbbf24" },
    { label: "今月発行", value: "12通", accent: "#a78bfa" },
    { label: "支払済", value: "8通", accent: "#4ade80" },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...accentCard(s.accent), padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4, letterSpacing: "0.04em" }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: 8,
        overflow: "hidden",
      }}>
        <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: 0 }}>最近の請求書</h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["請求番号", "取引先", "金額", "発行日", "支払期日", "ステータス"].map((h, i) => (
                <th key={i} style={{ padding: "8px 18px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#4b5563", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => {
              const st = statusMap[inv.status];
              return (
                <tr key={i}
                  onClick={() => onRowClick(inv.id)}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", borderLeft: `3px solid ${st.border}`, cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "9px 18px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{inv.id}</td>
                  <td style={{ padding: "9px 18px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
                  <td style={{ padding: "9px 18px", fontSize: 12, color: "#e2e8f0", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</td>
                  <td style={{ padding: "9px 18px", fontSize: 11, color: "#7a8494" }}>{inv.issued}</td>
                  <td style={{ padding: "9px 18px", fontSize: 11, color: "#7a8494" }}>{inv.due}</td>
                  <td style={{ padding: "9px 18px" }}>
                    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, color: st.color, background: st.bg }}>{st.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16 }}>
        {[
          { label: "今月の請求合計", value: "¥2,420,000", rows: "6件", accent: "#60a5fa" },
          { label: "回収済み", value: "¥792,000", rows: "2件", accent: "#4ade80" },
          { label: "期限超過", value: "¥88,000", rows: "1件", accent: "#f87171" },
        ].map((item, i) => (
          <div key={i} style={{ ...accentCard(item.accent), padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: "#7a8494" }}>{item.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{item.value}</div>
            </div>
            <div style={{ fontSize: 11, color: "#7a8494" }}>{item.rows}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// --- Invoice List View ---
function InvoiceListView({ onRowClick }: { onRowClick: (id: string) => void }) {
  const [activeFilter, setActiveFilter] = useState(0);
  const [search, setSearch] = useState("");
  const filters = ["全て", "支払済", "送信済", "下書き", "期限超過"];
  const filterKeys = ["", "paid", "sent", "draft", "overdue"];

  const filtered = invoices.filter(inv => {
    const matchFilter = activeFilter === 0 || inv.status === filterKeys[activeFilter];
    const matchSearch = search === "" || inv.client.includes(search) || inv.id.includes(search);
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {filters.map((f, i) => (
            <button key={i} onClick={() => setActiveFilter(i)} style={{
              padding: "4px 10px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: activeFilter === i ? "rgba(59,130,246,0.1)" : "transparent",
              color: activeFilter === i ? "#60a5fa" : "#7a8494",
              borderRadius: 4,
              fontSize: 10,
              cursor: "pointer",
            }}>{f}</button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="請求番号・取引先を検索..."
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 5,
            padding: "5px 10px",
            fontSize: 11,
            color: "#e2e8f0",
            outline: "none",
            width: 200,
          }}
        />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["請求番号", "取引先", "金額", "発行日", "支払期日", "ステータス"].map((h, i) => (
              <th key={i} style={{ padding: "8px 18px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "#4b5563", letterSpacing: "0.05em", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((inv, i) => {
            const st = statusMap[inv.status];
            return (
              <tr key={i}
                onClick={() => onRowClick(inv.id)}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", borderLeft: `3px solid ${st.border}`, cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "9px 18px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{inv.id}</td>
                <td style={{ padding: "9px 18px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
                <td style={{ padding: "9px 18px", fontSize: 12, color: "#e2e8f0", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</td>
                <td style={{ padding: "9px 18px", fontSize: 11, color: "#7a8494" }}>{inv.issued}</td>
                <td style={{ padding: "9px 18px", fontSize: 11, color: "#7a8494" }}>{inv.due}</td>
                <td style={{ padding: "9px 18px" }}>
                  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, color: st.color, background: st.bg }}>{st.label}</span>
                </td>
              </tr>
            );
          })}
          {filtered.length === 0 && (
            <tr><td colSpan={6} style={{ padding: "24px 18px", textAlign: "center", fontSize: 12, color: "#7a8494" }}>該当する請求書がありません</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// --- Create Invoice View ---
function CreateInvoiceView() {
  const [step, setStep] = useState(0);
  const steps = ["取引先選択", "明細入力", "プレビュー"];
  const [selectedClient, setSelectedClient] = useState("");
  const [items, setItems] = useState([{ desc: "", qty: 1, price: 0 }]);

  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{
              ...accentCard(i <= step ? "#60a5fa" : "rgba(255,255,255,0.1)"),
              padding: "10px 16px",
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: i < step ? "#60a5fa" : i === step ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                border: i === step ? "1px solid #60a5fa" : "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: i < step ? "#fff" : i === step ? "#60a5fa" : "#7a8494", fontWeight: 700,
              }}>{i < step ? "✓" : i + 1}</div>
              <span style={{ fontSize: 11, color: i === step ? "#d1d5db" : "#7a8494", fontWeight: i === step ? 600 : 400 }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ width: 8, background: "rgba(255,255,255,0.03)", height: "100%", flexShrink: 0 }} />}
          </div>
        ))}
      </div>

      {/* Step 0: Client */}
      {step === 0 && (
        <div style={{ ...accentCard("#60a5fa"), padding: "20px 24px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>取引先を選択</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {clients.map(c => (
              <button key={c.id} onClick={() => setSelectedClient(c.id)} style={{
                background: selectedClient === c.id ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.03)",
                border: selectedClient === c.id ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: 6, padding: "10px 14px", cursor: "pointer", textAlign: "left",
              }}>
                <div style={{ fontSize: 12, color: selectedClient === c.id ? "#60a5fa" : "#e2e8f0", fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "#7a8494", marginTop: 2 }}>{c.contact}</div>
              </button>
            ))}
          </div>
          <button onClick={() => selectedClient && setStep(1)} style={{
            padding: "8px 20px", background: selectedClient ? "#3B82F6" : "rgba(255,255,255,0.05)",
            color: selectedClient ? "#fff" : "#7a8494", border: "none", borderRadius: 6,
            fontSize: 12, fontWeight: 600, cursor: selectedClient ? "pointer" : "default",
          }}>次へ</button>
        </div>
      )}

      {/* Step 1: Items */}
      {step === 1 && (
        <div style={{ ...accentCard("#a78bfa"), padding: "20px 24px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>明細を入力</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
            <thead>
              <tr>
                {["品目・内容", "数量", "単価", "小計"].map((h, i) => (
                  <th key={i} style={{ padding: "6px 8px", textAlign: "left", fontSize: 10, color: "#4b5563", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i}>
                  <td style={{ padding: "6px 8px" }}>
                    <input value={it.desc} onChange={e => { const n = [...items]; n[i].desc = e.target.value; setItems(n); }}
                      placeholder="例：Webサイト制作費"
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "5px 8px", fontSize: 11, color: "#e2e8f0", outline: "none" }} />
                  </td>
                  <td style={{ padding: "6px 8px", width: 60 }}>
                    <input type="number" value={it.qty} onChange={e => { const n = [...items]; n[i].qty = Number(e.target.value); setItems(n); }}
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "5px 8px", fontSize: 11, color: "#e2e8f0", outline: "none" }} />
                  </td>
                  <td style={{ padding: "6px 8px", width: 120 }}>
                    <input type="number" value={it.price} onChange={e => { const n = [...items]; n[i].price = Number(e.target.value); setItems(n); }}
                      placeholder="0"
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "5px 8px", fontSize: 11, color: "#e2e8f0", outline: "none" }} />
                  </td>
                  <td style={{ padding: "6px 8px", fontSize: 11, color: "#e2e8f0", fontVariantNumeric: "tabular-nums" }}>{formatCurrency(it.qty * it.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setItems([...items, { desc: "", qty: 1, price: 0 }])} style={{
              padding: "5px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#7a8494", borderRadius: 4, fontSize: 11, cursor: "pointer",
            }}>+ 行を追加</button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#7a8494" }}>合計:</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{formatCurrency(total)}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={() => setStep(0)} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#7a8494", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>戻る</button>
            <button onClick={() => setStep(2)} style={{ padding: "8px 20px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>プレビュー</button>
          </div>
        </div>
      )}

      {/* Step 2: Preview */}
      {step === 2 && (
        <div style={{ ...accentCard("#4ade80"), padding: "20px 24px" }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>プレビュー・確認</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4 }}>取引先</div>
              <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{clients.find(c => c.id === selectedClient)?.name ?? "-"}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4 }}>請求番号（仮）</div>
              <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>INV-2026-0043</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4 }}>発行日</div>
              <div style={{ fontSize: 12, color: "#c8d1dc" }}>2026/03/26</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4 }}>支払期日</div>
              <div style={{ fontSize: 12, color: "#c8d1dc" }}>2026/04/25</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, marginBottom: 16 }}>
            {items.filter(it => it.desc).map((it, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 12, color: "#c8d1dc" }}>
                <span>{it.desc} x {it.qty}</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatCurrency(it.qty * it.price)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 8 }}>
              <span style={{ fontSize: 12, color: "#7a8494" }}>合計（税込）</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{formatCurrency(total)}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(1)} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#7a8494", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>戻る</button>
            <button style={{ padding: "8px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#7a8494", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>下書き保存</button>
            <button style={{ padding: "8px 20px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>送信する</button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Clients View ---
function ClientsView() {
  const accentColors = ["#60a5fa", "#a78bfa", "#4ade80", "#fbbf24", "#f87171", "#60a5fa"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {clients.map((c, i) => (
        <div key={c.id} style={{ ...accentCard(accentColors[i % accentColors.length]), padding: "14px 18px", cursor: "pointer" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#7a8494", marginTop: 2 }}>{c.contact}</div>
            </div>
            <span style={{ fontSize: 10, color: accentColors[i % accentColors.length], background: `${accentColors[i % accentColors.length]}14`, padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{c.id}</span>
          </div>
          <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 8 }}>{c.email}</div>
          <div style={{ display: "flex", gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: "#7a8494" }}>請求件数</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{c.invoices}件</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#7a8494" }}>累計取引額</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{formatCurrency(c.total)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Settings View ---
function SettingsView() {
  const sections = [
    {
      title: "会社情報",
      accent: "#60a5fa",
      fields: [
        { label: "会社名", value: "株式会社サンプル" },
        { label: "代表者名", value: "代表 太郎" },
        { label: "住所", value: "東京都渋谷区〇〇1-2-3" },
        { label: "電話番号", value: "03-1234-5678" },
      ],
    },
    {
      title: "請求書設定",
      accent: "#a78bfa",
      fields: [
        { label: "デフォルト支払期日", value: "30日後" },
        { label: "消費税率", value: "10%" },
        { label: "請求書番号形式", value: "INV-YYYY-NNNN" },
        { label: "通貨", value: "JPY（日本円）" },
      ],
    },
    {
      title: "通知設定",
      accent: "#4ade80",
      fields: [
        { label: "期限超過アラート", value: "有効（3日前）" },
        { label: "支払確認通知", value: "有効" },
        { label: "メール通知先", value: "admin@example.co.jp" },
      ],
    },
    {
      title: "連携サービス",
      accent: "#fbbf24",
      fields: [
        { label: "会計ソフト", value: "未連携" },
        { label: "決済サービス", value: "未連携" },
        { label: "クラウドストレージ", value: "Google Drive（連携済）" },
      ],
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 800 }}>
      {sections.map((sec, si) => (
        <div key={si} style={{ ...accentCard(sec.accent), padding: "16px 20px" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: "#d1d5db", margin: "0 0 12px", letterSpacing: "0.04em" }}>{sec.title}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sec.fields.map((f, fi) => (
              <div key={fi} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#7a8494" }}>{f.label}</span>
                <span style={{ fontSize: 11, color: "#e2e8f0", fontWeight: 500 }}>{f.value}</span>
              </div>
            ))}
          </div>
          <button style={{
            marginTop: 12, padding: "5px 12px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            color: "#7a8494", borderRadius: 4, fontSize: 10, cursor: "pointer",
          }}>編集</button>
        </div>
      ))}
    </div>
  );
}

// --- Invoice Detail View ---
function InvoiceDetailView({ invoiceId, onBack }: { invoiceId: string; onBack: () => void }) {
  const inv = invoices.find(i => i.id === invoiceId);
  if (!inv) return null;
  const st = statusMap[inv.status];

  const lineItems = [
    { desc: "システム開発費", qty: 1, price: Math.round(inv.amount * 0.7) },
    { desc: "保守・運用費", qty: 1, price: Math.round(inv.amount * 0.2) },
    { desc: "その他費用", qty: 1, price: inv.amount - Math.round(inv.amount * 0.7) - Math.round(inv.amount * 0.2) },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "none", border: "none", color: "#7a8494", cursor: "pointer",
        fontSize: 12, padding: 0, marginBottom: 16,
      }}>
        <NavIcon icon="arrow-left" size={14} />
        一覧に戻る
      </button>

      <div style={{ ...accentCard(st.border), padding: "20px 24px", marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0", margin: "0 0 4px" }}>{inv.id}</h2>
            <div style={{ fontSize: 12, color: "#7a8494" }}>{inv.client}</div>
          </div>
          <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 4, fontSize: 11, fontWeight: 700, color: st.color, background: st.bg }}>{st.label}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "発行日", value: inv.issued },
            { label: "支払期日", value: inv.due },
            { label: "請求金額", value: formatCurrency(inv.amount) },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: i === 2 ? 700 : 500 }}>{m.value}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
          <div style={{ fontSize: 10, color: "#4b5563", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 8 }}>明細</div>
          {lineItems.map((it, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: 12, color: "#c8d1dc", borderBottom: i < lineItems.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
              <span>{it.desc}</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{formatCurrency(it.price)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, marginTop: 4, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 12, color: "#7a8494" }}>合計</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>{formatCurrency(inv.amount)}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ padding: "7px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#7a8494", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>PDFダウンロード</button>
        <button style={{ padding: "7px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#7a8494", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>メール送信</button>
        {inv.status === "draft" && (
          <button style={{ padding: "7px 16px", background: "#3B82F6", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>送信する</button>
        )}
      </div>
    </div>
  );
}

// --- Main Page ---
export default function V3Page() {
  const [activeNav, setActiveNav] = useState(0);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const headerTitle = selectedInvoice ? "請求書詳細" : navTitles[activeNav];

  function handleRowClick(id: string) {
    setSelectedInvoice(id);
  }

  function handleBack() {
    setSelectedInvoice(null);
  }

  function handleNewInvoice() {
    setSelectedInvoice(null);
    setActiveNav(2);
  }

  function handleNavClick(i: number) {
    setActiveNav(i);
    setSelectedInvoice(null);
  }

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
        position: "sticky",
        top: 0,
        height: "100vh",
      }}>
        <div style={{ color: "#60a5fa", marginBottom: 28 }}>
          <WaveLogo size={24} />
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          {navItems.map((item, i) => (
            <div key={i} style={{ position: "relative" }}>
              <button
                onClick={() => handleNavClick(i)}
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
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db", margin: 0 }}>{headerTitle}</h1>
          <button onClick={handleNewInvoice} style={{
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

        {/* Content */}
        {selectedInvoice ? (
          <InvoiceDetailView invoiceId={selectedInvoice} onBack={handleBack} />
        ) : (
          <>
            {activeNav === 0 && <DashboardView onRowClick={handleRowClick} />}
            {activeNav === 1 && <InvoiceListView onRowClick={handleRowClick} />}
            {activeNav === 2 && <CreateInvoiceView />}
            {activeNav === 3 && <ClientsView />}
            {activeNav === 4 && <SettingsView />}
          </>
        )}

        {/* Footer nav */}
        <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
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
