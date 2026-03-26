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
  { name: "株式会社テクノロジーズ", contact: "田中 一郎", email: "tanaka@technologies.co.jp", invoices: 8, total: "¥2,340,000" },
  { name: "ABCコンサルティング", contact: "鈴木 花子", email: "suzuki@abc-consulting.jp", invoices: 5, total: "¥825,000" },
  { name: "山田デザイン事務所", contact: "山田 太郎", email: "yamada@design-office.jp", invoices: 3, total: "¥264,000" },
  { name: "グローバル商事", contact: "佐藤 次郎", email: "sato@global-shoji.co.jp", invoices: 12, total: "¥7,920,000" },
  { name: "スタートアップ株式会社", contact: "高橋 美咲", email: "takahashi@startup.co.jp", invoices: 4, total: "¥528,000" },
  { name: "フリーランス田中", contact: "田中 修", email: "tanaka@freelance.jp", invoices: 2, total: "¥110,000" },
];

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  paid: { label: "支払済", color: "#4ade80", bg: "rgba(74, 222, 128, 0.1)" },
  sent: { label: "送信済", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  overdue: { label: "期限超過", color: "#f87171", bg: "rgba(248, 113, 113, 0.1)" },
  draft: { label: "下書き", color: "#7a8494", bg: "rgba(122, 132, 148, 0.1)" },
};

const tabs = ["ダッシュボード", "請求書一覧", "新規作成", "取引先", "設定"];

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

const card: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  borderRadius: 16,
};

// ---- Tab 0: Dashboard ----
function TabDashboard({ onTabChange }: { onTabChange: (i: number) => void }) {
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);

  const stats = [
    { label: "月間売上合計", value: "¥2,847,000" },
    { label: "未回収", value: "¥423,000" },
    { label: "今月発行", value: "12通" },
    { label: "支払済", value: "8通" },
  ];

  return (
    <>
      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 36 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...card, padding: "28px 24px" }}>
            <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#e2e8f0", lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Invoice list */}
      <div style={{ ...card, overflow: "hidden" }}>
        <div style={{
          padding: "20px 28px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: 0 }}>直近の請求書</h2>
          <button
            onClick={() => onTabChange(1)}
            style={{ background: "none", border: "none", color: "#3B82F6", fontSize: 12, cursor: "pointer", padding: 0 }}
          >すべて表示</button>
        </div>
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
                  borderBottom: i < invoices.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
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
                    display: "inline-block", padding: "4px 12px", borderRadius: 9999,
                    fontSize: 11, fontWeight: 600, color: st.color, background: st.bg,
                  }}>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {selectedInvoice !== null && (
        <div style={{ marginTop: 20, ...card, padding: "28px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db", margin: "0 0 4px" }}>{invoices[selectedInvoice].id}</h3>
              <p style={{ fontSize: 13, color: "#7a8494", margin: 0 }}>{invoices[selectedInvoice].client}</p>
            </div>
            <span style={{
              padding: "6px 16px", borderRadius: 9999, fontSize: 12, fontWeight: 600,
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
    </>
  );
}

// ---- Tab 1: Invoice List ----
function TabInvoiceList() {
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = invoices.filter(inv => {
    const matchStatus = statusFilter === "all" || inv.status === statusFilter;
    const matchSearch = inv.id.includes(search) || inv.client.includes(search);
    return matchStatus && matchSearch;
  });

  const filters = [
    { key: "all", label: "すべて" },
    { key: "paid", label: "支払済" },
    { key: "sent", label: "送信済" },
    { key: "overdue", label: "期限超過" },
    { key: "draft", label: "下書き" },
  ];

  return (
    <div style={{ ...card, overflow: "hidden" }}>
      <div style={{
        padding: "20px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                background: statusFilter === f.key ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.03)",
                color: statusFilter === f.key ? "#60a5fa" : "#7a8494",
                fontSize: 12, fontWeight: statusFilter === f.key ? 600 : 400, cursor: "pointer",
              }}
            >{f.label}</button>
          ))}
        </div>
        <input
          type="text"
          placeholder="請求書番号・取引先で検索..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "7px 14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            fontSize: 12,
            color: "#e2e8f0",
            outline: "none",
            width: 220,
          }}
        />
      </div>

      <div style={{ padding: "16px 28px" }}>
        {filtered.length === 0 && (
          <div style={{ padding: "32px 0", textAlign: "center", color: "#7a8494", fontSize: 13 }}>該当する請求書がありません</div>
        )}
        {filtered.map((inv, i) => {
          const idx = invoices.indexOf(inv);
          const st = statusMap[inv.status];
          const isSelected = selectedInvoice === idx;
          return (
            <div
              key={inv.id}
              onClick={() => setSelectedInvoice(isSelected ? null : idx)}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 140px 120px 120px 100px",
                alignItems: "center",
                padding: "18px 0",
                borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                cursor: "pointer",
                background: isSelected ? "rgba(59,130,246,0.05)" : "transparent",
                borderRadius: isSelected ? 8 : 0,
                transition: "background 0.15s",
              }}
            >
              <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{inv.id}</div>
              <div style={{ fontSize: 13, color: "#c8d1dc" }}>{inv.client}</div>
              <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{formatCurrency(inv.amount)}</div>
              <div style={{ fontSize: 12, color: "#7a8494" }}>{inv.issued}</div>
              <div style={{ fontSize: 12, color: "#7a8494" }}>{inv.due}</div>
              <div>
                <span style={{
                  display: "inline-block", padding: "4px 12px", borderRadius: 9999,
                  fontSize: 11, fontWeight: 600, color: st.color, background: st.bg,
                }}>{st.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedInvoice !== null && (
        <div style={{
          margin: "0 28px 28px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "24px 28px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#d1d5db", margin: "0 0 4px" }}>{invoices[selectedInvoice].id}</h3>
              <p style={{ fontSize: 13, color: "#7a8494", margin: 0 }}>{invoices[selectedInvoice].client}</p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{
                padding: "5px 14px", borderRadius: 9999, fontSize: 11, fontWeight: 600,
                color: statusMap[invoices[selectedInvoice].status].color,
                background: statusMap[invoices[selectedInvoice].status].bg,
              }}>{statusMap[invoices[selectedInvoice].status].label}</span>
              <button style={{
                padding: "5px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)", color: "#d1d5db", fontSize: 11, cursor: "pointer",
              }}>PDFダウンロード</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { label: "金額", value: formatCurrency(invoices[selectedInvoice].amount) },
              { label: "発行日", value: invoices[selectedInvoice].issued },
              { label: "支払期日", value: invoices[selectedInvoice].due },
              { label: "ステータス", value: statusMap[invoices[selectedInvoice].status].label },
            ].map((d, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 4 }}>{d.label}</div>
                <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 600 }}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Tab 2: New Invoice (3-step) ----
function TabNewInvoice() {
  const [step, setStep] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);
  const [dueDate, setDueDate] = useState("");

  const steps = ["取引先情報", "明細入力", "確認・送信"];

  const total = items.reduce((s, it) => s + it.qty * it.price, 0);

  const addItem = () => setItems(prev => [...prev, { name: "", qty: 1, price: 0 }]);
  const updateItem = (i: number, field: string, value: string | number) => {
    setItems(prev => prev.map((it, idx) => idx === i ? { ...it, [field]: value } : it));
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    fontSize: 13,
    color: "#e2e8f0",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    color: "#7a8494",
    marginBottom: 6,
    letterSpacing: "0.04em",
  };

  return (
    <div style={{ ...card, padding: "32px" }}>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: i < step ? "#3B82F6" : i === step ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)",
                border: i === step ? "2px solid #3B82F6" : i < step ? "none" : "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
                color: i <= step ? "#60a5fa" : "#4b5563",
                transition: "all 0.2s",
              }}>{i < step ? "✓" : i + 1}</div>
              <div style={{ fontSize: 11, color: i === step ? "#60a5fa" : "#4b5563", marginTop: 6, whiteSpace: "nowrap" }}>{s}</div>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                flex: 1, height: 1, background: i < step ? "#3B82F6" : "rgba(255,255,255,0.07)",
                margin: "0 12px", marginBottom: 24, transition: "background 0.2s",
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Client info */}
      {step === 0 && (
        <div style={{ maxWidth: 480 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: "0 0 24px" }}>取引先情報を入力</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div style={labelStyle}>取引先名 *</div>
              <input style={inputStyle} value={clientName} onChange={e => setClientName(e.target.value)} placeholder="株式会社..." />
            </div>
            <div>
              <div style={labelStyle}>メールアドレス</div>
              <input style={inputStyle} type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="billing@example.com" />
            </div>
            <div>
              <div style={labelStyle}>支払期日</div>
              <input style={inputStyle} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
          </div>
          <div style={{ marginTop: 32 }}>
            <button
              onClick={() => setStep(1)}
              disabled={!clientName}
              style={{
                padding: "10px 28px", borderRadius: 8, border: "none",
                background: clientName ? "#3B82F6" : "rgba(59,130,246,0.3)",
                color: "#fff", fontSize: 13, fontWeight: 600, cursor: clientName ? "pointer" : "not-allowed",
              }}
            >次へ: 明細入力</button>
          </div>
        </div>
      )}

      {/* Step 1: Items */}
      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: "0 0 24px" }}>明細を入力</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 140px", gap: 10, marginBottom: 4 }}>
              <div style={labelStyle}>品目</div>
              <div style={labelStyle}>数量</div>
              <div style={labelStyle}>単価</div>
            </div>
            {items.map((it, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 140px", gap: 10 }}>
                <input
                  style={inputStyle}
                  value={it.name}
                  onChange={e => updateItem(i, "name", e.target.value)}
                  placeholder="サービス名・品目"
                />
                <input
                  style={{ ...inputStyle, textAlign: "right" }}
                  type="number"
                  value={it.qty}
                  min={1}
                  onChange={e => updateItem(i, "qty", parseInt(e.target.value) || 1)}
                />
                <input
                  style={{ ...inputStyle, textAlign: "right" }}
                  type="number"
                  value={it.price}
                  min={0}
                  onChange={e => updateItem(i, "price", parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            style={{
              marginTop: 12, padding: "7px 16px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)", color: "#7a8494",
              fontSize: 12, cursor: "pointer",
            }}
          >+ 行を追加</button>

          <div style={{
            marginTop: 24, padding: "16px 20px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 13, color: "#7a8494" }}>合計金額</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#e2e8f0" }}>{formatCurrency(total)}</span>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button
              onClick={() => setStep(0)}
              style={{
                padding: "10px 24px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)", color: "#d1d5db", fontSize: 13, cursor: "pointer",
              }}
            >戻る</button>
            <button
              onClick={() => setStep(2)}
              style={{
                padding: "10px 28px", borderRadius: 8, border: "none",
                background: "#3B82F6", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >次へ: 確認</button>
          </div>
        </div>
      )}

      {/* Step 2: Preview */}
      {step === 2 && (
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: "0 0 24px" }}>確認・送信</h3>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "24px 28px",
            marginBottom: 20,
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div>
                <div style={labelStyle}>取引先</div>
                <div style={{ fontSize: 15, color: "#e2e8f0", fontWeight: 600 }}>{clientName || "（未入力）"}</div>
              </div>
              <div>
                <div style={labelStyle}>メールアドレス</div>
                <div style={{ fontSize: 14, color: "#c8d1dc" }}>{clientEmail || "（未入力）"}</div>
              </div>
              <div>
                <div style={labelStyle}>支払期日</div>
                <div style={{ fontSize: 14, color: "#c8d1dc" }}>{dueDate || "（未設定）"}</div>
              </div>
              <div>
                <div style={labelStyle}>合計金額</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>{formatCurrency(total)}</div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
              <div style={labelStyle}>明細</div>
              {items.filter(it => it.name).map((it, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <span style={{ fontSize: 13, color: "#c8d1dc" }}>{it.name} × {it.qty}</span>
                  <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{formatCurrency(it.qty * it.price)}</span>
                </div>
              ))}
              {items.filter(it => it.name).length === 0 && (
                <div style={{ fontSize: 13, color: "#4b5563" }}>明細なし</div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: "10px 24px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)", color: "#d1d5db", fontSize: 13, cursor: "pointer",
              }}
            >戻る</button>
            <button style={{
              padding: "10px 24px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "#d1d5db", fontSize: 13, cursor: "pointer",
            }}>下書き保存</button>
            <button style={{
              padding: "10px 28px", borderRadius: 8, border: "none",
              background: "#3B82F6", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>請求書を送信</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Tab 3: Clients ----
function TabClients() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {clients.map((c, i) => (
        <div key={i} style={{ ...card, padding: "28px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#d1d5db", marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: "#7a8494" }}>{c.contact}</div>
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(167,139,250,0.3))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "#93c5fd",
            }}>{c.name[0]}</div>
          </div>
          <div style={{ fontSize: 12, color: "#475569", marginBottom: 20 }}>{c.email}</div>
          <div style={{
            display: "flex", gap: 0,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 10, overflow: "hidden",
          }}>
            <div style={{ flex: 1, padding: "12px 16px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4, letterSpacing: "0.05em" }}>請求書数</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>{c.invoices}</div>
            </div>
            <div style={{ flex: 1, padding: "12px 16px" }}>
              <div style={{ fontSize: 10, color: "#7a8494", marginBottom: 4, letterSpacing: "0.05em" }}>累計金額</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>{c.total}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Tab 4: Settings ----
function TabSettings() {
  const sections = [
    {
      title: "会社情報",
      fields: [
        { label: "会社名", value: "株式会社サンプル", type: "text" },
        { label: "メールアドレス", value: "billing@sample.co.jp", type: "email" },
        { label: "電話番号", value: "03-1234-5678", type: "text" },
        { label: "住所", value: "東京都渋谷区...", type: "text" },
      ],
    },
    {
      title: "請求書の設定",
      fields: [
        { label: "支払期限（日）", value: "30", type: "number" },
        { label: "デフォルト消費税率", value: "10", type: "number" },
        { label: "請求書番号プレフィックス", value: "INV", type: "text" },
      ],
    },
    {
      title: "通知設定",
      fields: [
        { label: "支払期日リマインダー（日前）", value: "7", type: "number" },
        { label: "通知メールアドレス", value: "notify@sample.co.jp", type: "email" },
      ],
    },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    fontSize: 13,
    color: "#e2e8f0",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {sections.map((sec, si) => (
        <div key={si} style={{ ...card, padding: "28px 32px" }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: "0 0 20px", letterSpacing: "0.02em" }}>{sec.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {sec.fields.map((f, fi) => (
              <div key={fi}>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6 }}>{f.label}</div>
                <input style={inputStyle} type={f.type} defaultValue={f.value} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <button style={{
              padding: "8px 22px", borderRadius: 8, border: "none",
              background: "#3B82F6", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>保存</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Main ----
export default function V4Page() {
  const [activeTab, setActiveTab] = useState(0);

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
          <button
            onClick={() => setActiveTab(2)}
            style={{
              padding: "8px 18px",
              background: "#3B82F6",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >新規請求書作成</button>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}>U</div>
        </div>
      </header>

      {/* Main content */}
      <div style={{ padding: "20px 48px 48px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Stats only on dashboard */}
        {activeTab !== 0 && (
          <div style={{ height: 8 }} />
        )}

        {/* Breadcrumb tabs */}
        <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
          {tabs.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                background: "none",
                border: "none",
                color: activeTab === i ? "#60a5fa" : "#4b5563",
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                fontWeight: activeTab === i ? 600 : 400,
                borderBottom: activeTab === i ? "2px solid #3B82F6" : "2px solid transparent",
                paddingBottom: 8,
                transition: "color 0.15s",
              }}
            >{item}</button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 0 && <TabDashboard onTabChange={setActiveTab} />}
        {activeTab === 1 && <TabInvoiceList />}
        {activeTab === 2 && <TabNewInvoice />}
        {activeTab === 3 && <TabClients />}
        {activeTab === 4 && <TabSettings />}

        {/* Footer nav */}
        <div style={{ marginTop: 36, display: "flex", gap: 12 }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
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
