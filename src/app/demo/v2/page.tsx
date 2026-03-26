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
  { id: "INV-2026-0036", client: "株式会社フューチャーラボ", amount: 740000, issued: "2026/02/15", due: "2026/03/17", status: "paid" as const },
  { id: "INV-2026-0035", client: "東京マーケティング", amount: 198000, issued: "2026/02/10", due: "2026/03/12", status: "overdue" as const },
];

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: "支払済", color: "#4ade80", bg: "rgba(74, 222, 128, 0.1)" },
  sent: { label: "送信済", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  overdue: { label: "期限超過", color: "#f87171", bg: "rgba(248, 113, 113, 0.1)" },
  draft: { label: "下書き", color: "#7a8494", bg: "rgba(122, 132, 148, 0.1)" },
};

const clients = [
  { name: "株式会社テクノロジーズ", contact: "鈴木 一郎", email: "suzuki@technologies.co.jp", invoices: 8, total: "¥3,240,000" },
  { name: "ABCコンサルティング", contact: "田中 花子", email: "tanaka@abc-consulting.jp", invoices: 5, total: "¥825,000" },
  { name: "山田デザイン事務所", contact: "山田 太郎", email: "yamada@design.jp", invoices: 3, total: "¥264,000" },
  { name: "グローバル商事", contact: "佐藤 次郎", email: "sato@global-shoji.jp", invoices: 12, total: "¥7,920,000" },
  { name: "スタートアップ株式会社", contact: "中村 悠", email: "nakamura@startup.co.jp", invoices: 4, total: "¥528,000" },
  { name: "フリーランス田中", contact: "田中 誠", email: "t.makoto@freelance.jp", invoices: 2, total: "¥110,000" },
];

function WaveLogo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

const card: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  borderRadius: 10,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

function StatusBadge({ status }: { status: string }) {
  const st = statusMap[status];
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 9999,
      fontSize: 10,
      fontWeight: 600,
      color: st.color,
      background: st.bg,
    }}>{st.label}</span>
  );
}

// ── Invoice Detail ──────────────────────────────────────────────────────────
function InvoiceDetail({ invoiceId, onBack }: { invoiceId: string; onBack: () => void }) {
  const inv = invoices.find(i => i.id === invoiceId);
  if (!inv) return null;
  const st = statusMap[inv.status];
  const timeline = [
    { label: "請求書作成", date: inv.issued, color: "#7a8494" },
    { label: "取引先へ送信", date: inv.issued, color: "#3B82F6" },
    ...(inv.status === "paid" ? [{ label: "入金確認済み", date: inv.due, color: "#4ade80" }] : []),
    ...(inv.status === "overdue" ? [{ label: "支払期限超過", date: inv.due, color: "#f87171" }] : []),
  ];
  return (
    <div>
      <button onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "none", border: "none", color: "#60a5fa",
        fontSize: 13, cursor: "pointer", marginBottom: 20, padding: 0,
      }}>
        <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: "currentColor", fill: "none", strokeWidth: 2 }}><polyline points="15 18 9 12 15 6" /></svg>
        一覧に戻る
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Invoice info */}
        <div style={{ ...card, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>{inv.id}</div>
              <div style={{ fontSize: 12, color: "#7a8494", marginTop: 2 }}>発行日: {inv.issued}</div>
            </div>
            <StatusBadge status={inv.status} />
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 4 }}>請求先</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{inv.client}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 4 }}>支払期日</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: inv.status === "overdue" ? "#f87171" : "#e2e8f0" }}>{inv.due}</div>
              </div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["品名", "数量", "単価", "金額"].map((h, i) => (
                    <th key={i} style={{ padding: "8px 12px", textAlign: i === 0 ? "left" : "right" as const, fontSize: 10, color: "#4b5563", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "システム開発費", qty: 1, unit: Math.round(inv.amount * 0.7) },
                  { name: "保守・運用費", qty: 1, unit: Math.round(inv.amount * 0.2) },
                  { name: "その他費用", qty: 1, unit: Math.round(inv.amount * 0.1) },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: "#c8d1dc" }}>{row.name}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: "#7a8494", textAlign: "right" as const }}>{row.qty}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: "#7a8494", textAlign: "right" as const }}>{formatCurrency(row.unit)}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: "#e2e8f0", fontWeight: 600, textAlign: "right" as const }}>{formatCurrency(row.unit * row.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.15)", borderRadius: 8, padding: "12px 20px", textAlign: "right" as const }}>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 4 }}>合計金額（税込）</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#60a5fa" }}>{formatCurrency(inv.amount)}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Metadata + Timeline */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
          <div style={{ ...card, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>詳細情報</h3>
            {[
              { label: "請求番号", value: inv.id },
              { label: "ステータス", value: st.label },
              { label: "発行日", value: inv.issued },
              { label: "支払期日", value: inv.due },
              { label: "請求金額", value: formatCurrency(inv.amount) },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 11, color: "#7a8494" }}>{row.label}</span>
                <span style={{ fontSize: 11, color: "#e2e8f0", fontWeight: 500 }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div style={{ ...card, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>タイムライン</h3>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < timeline.length - 1 ? 12 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.color, flexShrink: 0, marginTop: 3 }} />
                  {i < timeline.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#c8d1dc" }}>{t.label}</div>
                  <div style={{ fontSize: 10, color: "#7a8494", marginTop: 1 }}>{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Dashboard ──────────────────────────────────────────────────────────
function TabDashboard({ onSelectInvoice }: { onSelectInvoice: (id: string) => void }) {
  const stats = [
    { label: "月間売上合計", value: "¥2,847,000", sub: "+12.3% 前月比", subColor: "#4ade80" },
    { label: "未回収", value: "¥423,000", sub: "3件の請求書", subColor: "#fbbf24" },
    { label: "今月発行", value: "12通", sub: "前月: 9通", subColor: "#7a8494" },
    { label: "支払済", value: "8通", sub: "回収率 66.7%", subColor: "#4ade80" },
  ];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...card, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.subColor }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* Invoice Table */}
        <div style={{ ...card, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: 0 }}>最近の請求書</h2>
            <span style={{ fontSize: 11, color: "#7a8494" }}>全12件</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["請求番号", "取引先", "金額", "期日", "ステータス"].map((h, i) => (
                  <th key={i} style={{
                    padding: "10px 20px", textAlign: "left" as const, fontSize: 10,
                    fontWeight: 600, color: "#4b5563", letterSpacing: "0.05em",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 6).map((inv, i) => (
                <tr key={i}
                  onClick={() => onSelectInvoice(inv.id)}
                  style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "11px 20px", fontSize: 12, color: "#60a5fa", fontWeight: 500 }}>{inv.id}</td>
                  <td style={{ padding: "11px 20px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
                  <td style={{ padding: "11px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>{formatCurrency(inv.amount)}</td>
                  <td style={{ padding: "11px 20px", fontSize: 12, color: "#7a8494" }}>{inv.due}</td>
                  <td style={{ padding: "11px 20px" }}><StatusBadge status={inv.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
          <div style={{ ...card, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>クイック操作</h3>
            {["請求書を作成", "取引先を追加", "レポート出力", "テンプレート管理"].map((action, i) => (
              <button key={i} style={{
                display: "block", width: "100%", padding: "10px 14px", marginBottom: 6,
                background: "rgba(255, 255, 255, 0.025)", border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: 6, color: "#c8d1dc", fontSize: 12, cursor: "pointer", textAlign: "left" as const,
              }}>{action}</button>
            ))}
          </div>
          <div style={{ ...card, padding: 20 }}>
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
    </>
  );
}

// ── Tab: Invoice List ───────────────────────────────────────────────────────
function TabInvoiceList({ onSelectInvoice }: { onSelectInvoice: (id: string) => void }) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const filters = [
    { key: "all", label: "すべて" },
    { key: "paid", label: "支払済" },
    { key: "sent", label: "送信済" },
    { key: "overdue", label: "期限超過" },
    { key: "draft", label: "下書き" },
  ];
  const filtered = invoices.filter(inv => {
    const matchStatus = filterStatus === "all" || inv.status === filterStatus;
    const matchSearch = search === "" || inv.id.includes(search) || inv.client.includes(search);
    return matchStatus && matchSearch;
  });
  return (
    <div style={{ ...card, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", margin: 0 }}>請求書一覧</h2>
          <span style={{ fontSize: 11, color: "#7a8494" }}>{filtered.length}件</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" as const }}>
          <div style={{ display: "flex", gap: 6 }}>
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilterStatus(f.key)} style={{
                padding: "5px 14px", border: "none", borderRadius: 9999, fontSize: 12, cursor: "pointer",
                background: filterStatus === f.key ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)",
                color: filterStatus === f.key ? "#60a5fa" : "#7a8494",
                fontWeight: filterStatus === f.key ? 600 : 400,
                transition: "all 0.15s",
              }}>{f.label}</button>
            ))}
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="請求番号・取引先で検索"
            style={{
              marginLeft: "auto", padding: "6px 14px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6, color: "#e2e8f0", fontSize: 12, outline: "none", width: 220,
            }}
          />
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["請求番号", "取引先", "金額", "発行日", "期日", "ステータス"].map((h, i) => (
              <th key={i} style={{
                padding: "10px 20px", textAlign: "left" as const, fontSize: 10,
                fontWeight: 600, color: "#4b5563", letterSpacing: "0.05em",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={6} style={{ padding: "32px 20px", textAlign: "center" as const, color: "#7a8494", fontSize: 13 }}>該当する請求書がありません</td></tr>
          ) : filtered.map((inv, i) => (
            <tr key={i}
              onClick={() => onSelectInvoice(inv.id)}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "11px 20px", fontSize: 12, color: "#60a5fa", fontWeight: 500 }}>{inv.id}</td>
              <td style={{ padding: "11px 20px", fontSize: 12, color: "#c8d1dc" }}>{inv.client}</td>
              <td style={{ padding: "11px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>{formatCurrency(inv.amount)}</td>
              <td style={{ padding: "11px 20px", fontSize: 12, color: "#7a8494" }}>{inv.issued}</td>
              <td style={{ padding: "11px 20px", fontSize: 12, color: "#7a8494" }}>{inv.due}</td>
              <td style={{ padding: "11px 20px" }}><StatusBadge status={inv.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Tab: New Invoice (3-step form) ──────────────────────────────────────────
function TabNewInvoice({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState("");
  const [items] = useState([
    { name: "システム開発費", qty: 1, unit: 300000 },
    { name: "保守・運用費", qty: 1, unit: 50000 },
    { name: "その他費用", qty: 1, unit: 20000 },
  ]);
  const total = items.reduce((s, r) => s + r.qty * r.unit, 0);
  const stepLabels = ["取引先選択", "明細入力", "確認・送信"];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        {stepLabels.map((label, i) => {
          const n = i + 1;
          const active = n === step;
          const done = n < step;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : undefined }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                  background: done ? "#3B82F6" : active ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
                  color: done || active ? "#60a5fa" : "#7a8494",
                  border: active ? "1px solid rgba(59,130,246,0.4)" : "1px solid transparent",
                }}>{done ? "✓" : n}</div>
                <span style={{ fontSize: 12, color: active ? "#e2e8f0" : "#7a8494", fontWeight: active ? 600 : 400 }}>{label}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)", margin: "0 14px" }} />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Client selection */}
      {step === 1 && (
        <div style={{ ...card, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: "0 0 18px" }}>請求先の取引先を選択してください</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {clients.map((c, i) => (
              <div key={i}
                onClick={() => setSelectedClient(c.name)}
                style={{
                  padding: "14px 16px", borderRadius: 8, cursor: "pointer",
                  background: selectedClient === c.name ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${selectedClient === c.name ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 3 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#7a8494" }}>{c.contact}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => selectedClient && setStep(2)} style={{
              padding: "9px 24px", background: selectedClient ? "#3B82F6" : "rgba(255,255,255,0.05)",
              color: selectedClient ? "#fff" : "#7a8494", border: "none", borderRadius: 6,
              fontSize: 13, fontWeight: 600, cursor: selectedClient ? "pointer" : "default",
            }}>次へ</button>
          </div>
        </div>
      )}

      {/* Step 2: Line items */}
      {step === 2 && (
        <div style={{ ...card, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: "0 0 4px" }}>請求明細</h3>
          <div style={{ fontSize: 12, color: "#7a8494", marginBottom: 18 }}>請求先: {selectedClient}</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["品名", "数量", "単価", "金額"].map((h, i) => (
                  <th key={i} style={{ padding: "8px 12px", textAlign: i === 0 ? "left" as const : "right" as const, fontSize: 11, color: "#4b5563", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "12px" }}>
                    <input defaultValue={row.name} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 5, color: "#e2e8f0", fontSize: 12, padding: "6px 10px", width: "100%", outline: "none",
                    }} />
                  </td>
                  <td style={{ padding: "12px" }}>
                    <input defaultValue={row.qty} type="number" style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 5, color: "#e2e8f0", fontSize: 12, padding: "6px 10px", width: 60, textAlign: "right" as const, outline: "none",
                    }} />
                  </td>
                  <td style={{ padding: "12px" }}>
                    <input defaultValue={row.unit} type="number" style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 5, color: "#e2e8f0", fontSize: 12, padding: "6px 10px", width: 120, textAlign: "right" as const, outline: "none",
                    }} />
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" as const, fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>{formatCurrency(row.qty * row.unit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 8, padding: "10px 20px" }}>
              <span style={{ fontSize: 11, color: "#7a8494", marginRight: 12 }}>合計（税込）</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#60a5fa" }}>{formatCurrency(total)}</span>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{
                padding: "9px 20px", background: "rgba(255,255,255,0.05)", color: "#c8d1dc",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, fontSize: 13, cursor: "pointer",
              }}>戻る</button>
              <button onClick={() => setStep(3)} style={{
                padding: "9px 24px", background: "#3B82F6", color: "#fff",
                border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>次へ</button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div style={{ ...card, padding: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: "0 0 18px" }}>内容を確認して送信してください</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            {[
              { label: "請求先", value: selectedClient },
              { label: "発行日", value: "2026/03/26" },
              { label: "支払期日", value: "2026/04/25" },
              { label: "合計金額", value: formatCurrency(total) },
            ].map((row, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{row.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(74, 222, 128, 0.05)", border: "1px solid rgba(74, 222, 128, 0.15)", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 600, marginBottom: 2 }}>送信準備完了</div>
            <div style={{ fontSize: 11, color: "#7a8494" }}>メールで請求書PDFを送信します。送信後は「送信済」ステータスになります。</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setStep(2)} style={{
              padding: "9px 20px", background: "rgba(255,255,255,0.05)", color: "#c8d1dc",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, fontSize: 13, cursor: "pointer",
            }}>戻る</button>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{
                padding: "9px 20px", background: "rgba(255,255,255,0.05)", color: "#c8d1dc",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, fontSize: 13, cursor: "pointer",
              }}>下書き保存</button>
              <button onClick={onDone} style={{
                padding: "9px 24px", background: "#3B82F6", color: "#fff",
                border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>請求書を送信</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tab: Clients ────────────────────────────────────────────────────────────
function TabClients() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", margin: 0 }}>取引先一覧</h2>
        <button style={{
          padding: "7px 16px", background: "#3B82F6", color: "#fff",
          border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}>取引先を追加</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {clients.map((c, i) => (
          <div key={i} style={{ ...card, padding: 20, cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.25)")}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)")}
          >
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `linear-gradient(135deg, hsl(${(i * 60) % 360}, 60%, 50%), hsl(${(i * 60 + 40) % 360}, 60%, 40%))`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12,
            }}>{c.name[0]}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "#7a8494", marginBottom: 12 }}>{c.contact} &nbsp;·&nbsp; {c.email}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 2 }}>請求件数</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{c.invoices}件</div>
              </div>
              <div style={{ textAlign: "right" as const }}>
                <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 2 }}>累計金額</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#60a5fa" }}>{c.total}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab: Settings ───────────────────────────────────────────────────────────
function TabSettings() {
  const sections = [
    {
      title: "事業者情報",
      fields: [
        { label: "事業者名", value: "株式会社サンプル" },
        { label: "代表者名", value: "代表 太郎" },
        { label: "住所", value: "東京都渋谷区〇〇1-2-3" },
        { label: "電話番号", value: "03-0000-0000" },
        { label: "メールアドレス", value: "billing@sample.co.jp" },
      ],
    },
    {
      title: "振込先情報",
      fields: [
        { label: "銀行名", value: "〇〇銀行" },
        { label: "支店名", value: "渋谷支店" },
        { label: "口座種別", value: "普通" },
        { label: "口座番号", value: "1234567" },
        { label: "口座名義", value: "カ）サンプル" },
      ],
    },
  ];
  return (
    <div style={{ maxWidth: 720 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#d1d5db", margin: "0 0 20px" }}>設定</h2>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
        {sections.map((sec, si) => (
          <div key={si} style={{ ...card, padding: 24 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>{sec.title}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {sec.fields.map((f, fi) => (
                <div key={fi}>
                  <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 5 }}>{f.label}</div>
                  <input defaultValue={f.value} style={{
                    width: "100%", padding: "8px 12px", boxSizing: "border-box" as const,
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6, color: "#e2e8f0", fontSize: 12, outline: "none",
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <button style={{
                padding: "8px 20px", background: "#3B82F6", color: "#fff",
                border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>保存</button>
            </div>
          </div>
        ))}

        {/* メール通知 */}
        <div style={{ ...card, padding: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>メール通知</h3>
          {[
            { label: "支払い確認時に通知", desc: "取引先からの入金が確認された際にメールを送信" },
            { label: "期限超過時に通知", desc: "支払期日を超過した請求書がある際に通知" },
            { label: "週次レポートを受信", desc: "毎週月曜日に請求状況のサマリーを送信" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div>
                <div style={{ fontSize: 13, color: "#c8d1dc", marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#7a8494" }}>{item.desc}</div>
              </div>
              <div style={{
                width: 40, height: 22, borderRadius: 11, background: i === 0 ? "#3B82F6" : "rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", padding: "0 3px", cursor: "pointer",
                justifyContent: i === 0 ? "flex-end" : "flex-start",
              }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Plan */}
        <div style={{ ...card, padding: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px" }}>プラン</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#60a5fa", marginBottom: 4 }}>スタンダードプラン</div>
              <div style={{ fontSize: 12, color: "#7a8494" }}>月額 ¥3,800 · 請求書無制限 · 取引先無制限</div>
            </div>
            <button style={{
              padding: "8px 18px", background: "rgba(255,255,255,0.05)", color: "#c8d1dc",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, fontSize: 12, cursor: "pointer",
            }}>プランを変更</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
export default function V2Page() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const tabs = ["ダッシュボード", "請求書一覧", "新規作成", "取引先", "設定"];

  function handleSelectInvoice(id: string) {
    setSelectedInvoice(id);
  }

  function handleBackFromDetail() {
    setSelectedInvoice(null);
  }

  function renderContent() {
    // Invoice detail overlay (from dashboard or list)
    if (selectedInvoice && (activeTab === 0 || activeTab === 1)) {
      return <InvoiceDetail invoiceId={selectedInvoice} onBack={handleBackFromDetail} />;
    }
    switch (activeTab) {
      case 0: return <TabDashboard onSelectInvoice={handleSelectInvoice} />;
      case 1: return <TabInvoiceList onSelectInvoice={handleSelectInvoice} />;
      case 2: return <TabNewInvoice onDone={() => setActiveTab(1)} />;
      case 3: return <TabClients />;
      case 4: return <TabSettings />;
      default: return null;
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Top Bar */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 56,
        background: "rgba(6, 10, 18, 0.5)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "sticky" as const, top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#60a5fa" }}><WaveLogo /></span>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", color: "#d1d5db" }}>RAKUDA INVOICE</span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => { setActiveTab(i); setSelectedInvoice(null); }} style={{
              padding: "8px 16px", border: "none",
              background: activeTab === i ? "rgba(59, 130, 246, 0.12)" : "transparent",
              color: activeTab === i ? "#60a5fa" : "#7a8494",
              fontSize: 13, cursor: "pointer", borderRadius: 6,
              fontWeight: activeTab === i ? 600 : 400,
            }}>{tab}</button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => { setActiveTab(2); setSelectedInvoice(null); }}
            style={{
              padding: "7px 16px", background: "#3B82F6", color: "#fff",
              border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
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
        {renderContent()}

        {/* Footer nav */}
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <a key={n} href={`${basePath}/demo/v${n}`} style={{
              padding: "6px 14px", borderRadius: 6, fontSize: 12,
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
