"use client";

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

function FileIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" style={{ width: size, height: size, strokeWidth: 1, stroke: "currentColor", fill: "none" }}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

const templates = [
  {
    name: "標準請求書",
    description: "シンプルな単発請求向け",
    usageCount: 45,
    lastUsed: "2026/03/15",
    isDefault: true,
  },
  {
    name: "月次請求書",
    description: "定期請求の自動生成に対応",
    usageCount: 23,
    lastUsed: "2026/03/01",
    isDefault: false,
  },
  {
    name: "プロジェクト一括",
    description: "マイルストーン別の分割請求",
    usageCount: 8,
    lastUsed: "2026/02/15",
    isDefault: false,
  },
  {
    name: "簡易見積書",
    description: "見積から請求への変換が可能",
    usageCount: 12,
    lastUsed: "2026/02/28",
    isDefault: false,
  },
];

export default function TemplatesPage() {
  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#d1d5db", margin: 0 }}>テンプレート</h2>
        <button style={{
          padding: "8px 16px",
          background: "#3B82F6",
          border: "none",
          borderRadius: 6,
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
        }}>テンプレートを作成</button>
      </div>

      {/* 2x2 Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {templates.map((t, i) => (
          <div key={i} style={{
            ...glassCard,
            padding: 0,
            overflow: "hidden",
            cursor: "pointer",
            transition: "border-color 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.2)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
          >
            {/* Icon area */}
            <div style={{
              padding: "24px 24px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ color: "#4b5563" }}>
                <FileIcon size={28} />
              </div>
              {t.isDefault && (
                <span style={{
                  padding: "3px 10px",
                  borderRadius: 9999,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#3B82F6",
                  background: "rgba(59, 130, 246, 0.1)",
                }}>デフォルト</span>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "0 24px 12px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: "#7a8494", lineHeight: 1.5 }}>{t.description}</div>
            </div>

            {/* Stats footer */}
            <div style={{
              padding: "12px 24px",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: 11, color: "#4b5563" }}>使用回数: {t.usageCount}回</span>
              <span style={{ fontSize: 11, color: "#4b5563" }}>最終: {t.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
