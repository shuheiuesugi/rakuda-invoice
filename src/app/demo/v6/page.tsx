"use client";

import { useState, useMemo, useCallback } from "react";

const basePath = "/rakuda-invoice";

/* ── Data ────────────────────────────────────── */
type Status = "paid" | "sent" | "overdue" | "draft";
interface Invoice {
  id: string;
  client: string;
  amount: number;
  issued: string;
  due: string;
  status: Status;
  summary: string;
  category: string;
}

const invoices: Invoice[] = [
  { id: "INV-2026-0042", client: "株式会社テクノロジーズ", amount: 528000, issued: "2026/03/15", due: "2026/04/14", status: "paid", summary: "Webアプリ開発 3月分", category: "開発" },
  { id: "INV-2026-0041", client: "ABCコンサルティング", amount: 165000, issued: "2026/03/10", due: "2026/04/09", status: "sent", summary: "コンサルティング料 3月", category: "コンサル" },
  { id: "INV-2026-0040", client: "山田デザイン事務所", amount: 88000, issued: "2026/03/05", due: "2026/04/04", status: "overdue", summary: "ロゴデザイン制作費", category: "デザイン" },
  { id: "INV-2026-0039", client: "グローバル商事", amount: 1320000, issued: "2026/03/01", due: "2026/03/31", status: "draft", summary: "輸入代行手数料 Q1", category: "商社" },
  { id: "INV-2026-0038", client: "スタートアップ株式会社", amount: 264000, issued: "2026/02/25", due: "2026/03/27", status: "paid", summary: "MVP開発費用 2月分", category: "開発" },
  { id: "INV-2026-0037", client: "フリーランス田中", amount: 55000, issued: "2026/02/20", due: "2026/03/22", status: "sent", summary: "記事執筆 5本", category: "ライティング" },
  { id: "INV-2026-0036", client: "東京マーケティング", amount: 440000, issued: "2026/02/15", due: "2026/03/17", status: "paid", summary: "広告運用代行 2月", category: "マーケ" },
  { id: "INV-2026-0035", client: "クラウドシステムズ", amount: 792000, issued: "2026/02/10", due: "2026/03/12", status: "overdue", summary: "SaaS利用料 年額", category: "IT" },
];

const statusMap: Record<Status, { label: string; color: string; bg: string }> = {
  paid: { label: "支払済", color: "#4ade80", bg: "rgba(74, 222, 128, 0.1)" },
  sent: { label: "送信済", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.1)" },
  overdue: { label: "期限超過", color: "#f87171", bg: "rgba(248, 113, 113, 0.1)" },
  draft: { label: "下書き", color: "#7a8494", bg: "rgba(122, 132, 148, 0.1)" },
};

const allColumns = [
  { key: "id" as const, label: "請求番号", default: true },
  { key: "client" as const, label: "取引先", default: true },
  { key: "amount" as const, label: "金額", default: true },
  { key: "summary" as const, label: "摘要", default: true },
  { key: "issued" as const, label: "発行日", default: false },
  { key: "due" as const, label: "支払期日", default: true },
  { key: "status" as const, label: "ステータス", default: true },
  { key: "category" as const, label: "カテゴリ", default: false },
];

const navItems = [
  { label: "ダッシュボード", icon: "grid", active: true },
  { label: "請求書一覧", icon: "file", active: false },
  { label: "新規作成", icon: "plus", active: false },
  { label: "取引先", icon: "users", active: false },
  { label: "テンプレート", icon: "copy", active: false },
  { label: "レポート", icon: "chart", active: false },
  { label: "設定", icon: "settings", active: false },
];

/* ── Components ──────────────────────────────── */

function WaveLogo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function NavIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const s: React.CSSProperties = { width: size, height: size, strokeWidth: 1.5, stroke: "currentColor", fill: "none" };
  if (icon === "grid") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (icon === "file") return <svg viewBox="0 0 24 24" style={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (icon === "plus") return <svg viewBox="0 0 24 24" style={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (icon === "users") return <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
  if (icon === "copy") return <svg viewBox="0 0 24 24" style={s}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
  if (icon === "chart") return <svg viewBox="0 0 24 24" style={s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
  if (icon === "settings") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
  if (icon === "filter") return <svg viewBox="0 0 24 24" style={s}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
  if (icon === "columns") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
  if (icon === "sort-asc") return <svg viewBox="0 0 24 24" style={s}><path d="M12 5v14M5 12l7-7 7 7"/></svg>;
  if (icon === "sort-desc") return <svg viewBox="0 0 24 24" style={s}><path d="M12 19V5M5 12l7 7 7-7"/></svg>;
  if (icon === "search") return <svg viewBox="0 0 24 24" style={s}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
  return null;
}

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

/* ── Styles ──────────────────────────────────── */
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

/* ── Main ────────────────────────────────────── */
type SortKey = keyof Invoice;
type SortDir = "asc" | "desc";

export default function V6Page() {
  const [activeNav, setActiveNav] = useState(0);
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("due");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [visibleCols, setVisibleCols] = useState<Set<string>>(
    () => new Set(allColumns.filter(c => c.default).map(c => c.key))
  );
  const [showColumnPicker, setShowColumnPicker] = useState(false);

  const toggleColumn = useCallback((key: string) => {
    setVisibleCols(prev => {
      const next = new Set(prev);
      if (next.has(key)) { if (next.size > 2) next.delete(key); }
      else next.add(key);
      return next;
    });
  }, []);

  const handleSort = useCallback((key: SortKey) => {
    setSortKey(prev => {
      if (prev === key) { setSortDir(d => d === "asc" ? "desc" : "asc"); return prev; }
      setSortDir("asc");
      return key;
    });
  }, []);

  const filtered = useMemo(() => {
    let data = [...invoices];
    if (statusFilter !== "all") data = data.filter(inv => inv.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(inv =>
        inv.id.toLowerCase().includes(q) ||
        inv.client.toLowerCase().includes(q) ||
        inv.summary.toLowerCase().includes(q) ||
        inv.category.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === "number" ? av - (bv as number) : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [statusFilter, searchQuery, sortKey, sortDir]);

  const stats = [
    { label: "月間売上合計", value: "¥2,847,000", sub: "+12.3% 前月比", subColor: "#4ade80" },
    { label: "未回収", value: "¥423,000", sub: "3件の請求書", subColor: "#fbbf24" },
    { label: "今月発行", value: "12通", sub: "前月: 9通", subColor: "#7a8494" },
    { label: "支払済", value: "8通", sub: "回収率 66.7%", subColor: "#4ade80" },
  ];

  const statusFilters: { key: Status | "all"; label: string }[] = [
    { key: "all", label: "すべて" },
    { key: "paid", label: "支払済" },
    { key: "sent", label: "送信済" },
    { key: "overdue", label: "期限超過" },
    { key: "draft", label: "下書き" },
  ];

  const visibleColumns = allColumns.filter(c => visibleCols.has(c.key));

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* ── Sidebar ── */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px", marginBottom: 36 }}>
          <span style={{ color: "#60a5fa" }}><WaveLogo size={26} /></span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#7a8494" }}>RAKUDA</div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.02em", color: "#d1d5db", marginTop: -1 }}>INVOICE</div>
          </div>
        </div>

        <div style={{ padding: "0 12px", marginBottom: 8 }}>
          <button style={{
            width: "100%",
            padding: "10px 14px",
            background: "#3B82F6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <NavIcon icon="plus" size={14} />
            新規請求書作成
          </button>
        </div>

        <nav style={{ flex: 1, marginTop: 8 }}>
          {navItems.map((item, i) => (
            <button key={i} onClick={() => setActiveNav(i)} style={{
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
              fontWeight: activeNav === i ? 600 : 400,
              textAlign: "left",
              transition: "all 0.15s",
              borderLeft: activeNav === i ? "2px solid #3B82F6" : "2px solid transparent",
            }}>
              <NavIcon icon={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}>U</div>
          <div>
            <div style={{ fontSize: 12, color: "#d1d5db", fontWeight: 500 }}>ユーザー名</div>
            <div style={{ fontSize: 10, color: "#4b5563" }}>Free プラン</div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {/* Header bar */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 56,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(6, 10, 18, 0.3)",
        }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#d1d5db", margin: 0 }}>ダッシュボード</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4b5563" }}>
                <NavIcon icon="search" size={14} />
              </span>
              <input
                type="text"
                placeholder="請求書を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "7px 12px 7px 32px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  color: "#e2e8f0",
                  fontSize: 12,
                  width: 200,
                  outline: "none",
                }}
              />
            </div>
          </div>
        </header>

        <div style={{ padding: "24px 32px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ ...glassCard, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: "#7a8494", marginBottom: 6, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0", marginBottom: 3 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: s.subColor }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Table Card */}
          <div style={{ ...glassCard, overflow: "hidden" }}>
            {/* Table Toolbar */}
            <div style={{
              padding: "12px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: 0, marginRight: 12 }}>請求書一覧</h2>
                {/* Status filter pills */}
                {statusFilters.map(f => (
                  <button key={f.key} onClick={() => setStatusFilter(f.key)} style={{
                    padding: "4px 12px",
                    borderRadius: 9999,
                    border: "1px solid " + (statusFilter === f.key ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"),
                    background: statusFilter === f.key ? "rgba(59,130,246,0.12)" : "transparent",
                    color: statusFilter === f.key ? "#60a5fa" : "#7a8494",
                    fontSize: 11,
                    fontWeight: statusFilter === f.key ? 600 : 400,
                    cursor: "pointer",
                  }}>{f.label}</button>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#4b5563" }}>{filtered.length}件</span>
                {/* Column picker toggle */}
                <div style={{ position: "relative" }}>
                  <button onClick={() => setShowColumnPicker(!showColumnPicker)} style={{
                    padding: "5px 10px",
                    background: showColumnPicker ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    color: showColumnPicker ? "#60a5fa" : "#7a8494",
                    fontSize: 11,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                    <NavIcon icon="columns" size={12} />
                    列
                  </button>
                  {showColumnPicker && (
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      right: 0,
                      background: "rgba(13, 18, 30, 0.97)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      padding: 8,
                      zIndex: 50,
                      minWidth: 160,
                      backdropFilter: "blur(20px)",
                    }}>
                      <div style={{ fontSize: 10, color: "#4b5563", padding: "4px 8px", marginBottom: 4 }}>表示する列</div>
                      {allColumns.map(col => (
                        <label key={col.key} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "6px 8px",
                          borderRadius: 4,
                          cursor: "pointer",
                          fontSize: 12,
                          color: visibleCols.has(col.key) ? "#e2e8f0" : "#4b5563",
                        }}>
                          <input
                            type="checkbox"
                            checked={visibleCols.has(col.key)}
                            onChange={() => toggleColumn(col.key)}
                            style={{ accentColor: "#3B82F6" }}
                          />
                          {col.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {visibleColumns.map(col => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key as SortKey)}
                        style={{
                          padding: "10px 20px",
                          textAlign: "left",
                          fontSize: 10,
                          fontWeight: 600,
                          color: sortKey === col.key ? "#60a5fa" : "#4b5563",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase" as const,
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                          cursor: "pointer",
                          userSelect: "none" as const,
                          whiteSpace: "nowrap" as const,
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {col.label}
                          {sortKey === col.key && (
                            <span style={{ color: "#60a5fa" }}>
                              <NavIcon icon={sortDir === "asc" ? "sort-asc" : "sort-desc"} size={10} />
                            </span>
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={visibleColumns.length} style={{ padding: "40px 20px", textAlign: "center", color: "#4b5563", fontSize: 13 }}>
                        該当する請求書がありません
                      </td>
                    </tr>
                  ) : (
                    filtered.map((inv, i) => {
                      const st = statusMap[inv.status];
                      return (
                        <tr key={i} style={{
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                          cursor: "pointer",
                          transition: "background 0.15s",
                        }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {visibleCols.has("id") && (
                            <td style={{ padding: "12px 20px", fontSize: 12, color: "#60a5fa", fontWeight: 500 }}>{inv.id}</td>
                          )}
                          {visibleCols.has("client") && (
                            <td style={{ padding: "12px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{inv.client}</td>
                          )}
                          {visibleCols.has("amount") && (
                            <td style={{ padding: "12px 20px", fontSize: 12, color: "#e2e8f0", fontWeight: 600, fontVariantNumeric: "tabular-nums" as const }}>{formatCurrency(inv.amount)}</td>
                          )}
                          {visibleCols.has("summary") && (
                            <td style={{ padding: "12px 20px", fontSize: 12, color: "#7a8494", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{inv.summary}</td>
                          )}
                          {visibleCols.has("issued") && (
                            <td style={{ padding: "12px 20px", fontSize: 12, color: "#7a8494" }}>{inv.issued}</td>
                          )}
                          {visibleCols.has("due") && (
                            <td style={{ padding: "12px 20px", fontSize: 12, color: inv.status === "overdue" ? "#f87171" : "#7a8494", fontWeight: inv.status === "overdue" ? 600 : 400 }}>{inv.due}</td>
                          )}
                          {visibleCols.has("status") && (
                            <td style={{ padding: "12px 20px" }}>
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
                          )}
                          {visibleCols.has("category") && (
                            <td style={{ padding: "12px 20px", fontSize: 11, color: "#4b5563" }}>{inv.category}</td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div style={{
              padding: "10px 20px",
              borderTop: "1px solid rgba(255,255,255,0.03)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: 11, color: "#4b5563" }}>
                {filtered.length}件中 {filtered.length}件を表示
              </span>
              <span style={{ fontSize: 11, color: "#4b5563" }}>
                合計: {formatCurrency(filtered.reduce((sum, inv) => sum + inv.amount, 0))}
              </span>
            </div>
          </div>

          {/* Footer nav */}
          <div style={{ marginTop: 24, display: "flex", gap: 12, alignItems: "center" }}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <a key={n} href={`${basePath}/demo/v${n}`} style={{
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 12,
                color: n === 6 ? "#60a5fa" : "#7a8494",
                background: n === 6 ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.025)",
                border: "1px solid " + (n === 6 ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 255, 255, 0.05)"),
                textDecoration: "none",
                fontWeight: n === 6 ? 600 : 400,
              }}>V{n}{n === 6 ? " (Hybrid)" : ""}</a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
