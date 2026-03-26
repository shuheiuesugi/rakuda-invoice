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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ ...glassCard, padding: "24px 28px", marginBottom: 16 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#d1d5db", margin: "0 0 16px 0" }}>{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
      <span style={{ fontSize: 12, color: "#7a8494" }}>{label}</span>
      <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function GhostButton({ label }: { label: string }) {
  return (
    <button style={{
      padding: "7px 16px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 6,
      color: "#7a8494",
      fontSize: 11,
      fontWeight: 500,
      cursor: "pointer",
    }}>{label}</button>
  );
}

function ConnectButton({ label }: { label: string }) {
  return (
    <button style={{
      padding: "6px 14px",
      background: "rgba(59, 130, 246, 0.1)",
      border: "1px solid rgba(59, 130, 246, 0.2)",
      borderRadius: 6,
      color: "#60a5fa",
      fontSize: 11,
      fontWeight: 500,
      cursor: "pointer",
    }}>{label}</button>
  );
}

const integrations = [
  { name: "freee", connected: false },
  { name: "マネーフォワード", connected: true },
  { name: "弥生会計", connected: false },
];

export default function SettingsPage() {
  return (
    <>
      {/* 事業者情報 */}
      <SectionCard title="事業者情報">
        <InfoRow label="会社名" value="株式会社サンプル" />
        <InfoRow label="代表者名" value="山田太郎" />
        <InfoRow label="住所" value="東京都渋谷区神宮前1-2-3" />
        <InfoRow label="インボイス登録番号" value="T1234567890123" />
        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
          <GhostButton label="編集" />
        </div>
      </SectionCard>

      {/* 振込先口座 */}
      <SectionCard title="振込先口座">
        <InfoRow label="銀行名" value="三菱UFJ銀行" />
        <InfoRow label="支店名" value="渋谷支店" />
        <InfoRow label="口座種別" value="普通" />
        <InfoRow label="口座番号" value="1234567" />
        <InfoRow label="口座名義" value="カ）サンプル" />
        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
          <GhostButton label="編集" />
        </div>
      </SectionCard>

      {/* メール設定 */}
      <SectionCard title="メール設定">
        <InfoRow label="送信元" value="billing@sample.co.jp" />
        <InfoRow label="CC" value="accounting@sample.co.jp" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
          <span style={{ fontSize: 12, color: "#7a8494" }}>テンプレート</span>
          <select style={{
            padding: "5px 10px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4,
            color: "#e2e8f0",
            fontSize: 12,
            outline: "none",
            cursor: "pointer",
          }}>
            <option>標準送付メール</option>
            <option>リマインドメール</option>
            <option>お礼メール</option>
          </select>
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
          <GhostButton label="編集" />
        </div>
      </SectionCard>

      {/* プラン */}
      <SectionCard title="プラン">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>Free プラン</div>
            <div style={{ fontSize: 11, color: "#7a8494", marginTop: 2 }}>月5通まで</div>
          </div>
          <button style={{
            padding: "8px 18px",
            background: "#3B82F6",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>Pro にアップグレード</button>
        </div>
      </SectionCard>

      {/* 連携サービス */}
      <SectionCard title="連携サービス">
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {integrations.map((svc, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: i < integrations.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {svc.connected && (
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#4ade80", display: "inline-block",
                  }} />
                )}
                <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{svc.name}</span>
                {svc.connected && (
                  <span style={{ fontSize: 10, color: "#4ade80" }}>接続済</span>
                )}
                {!svc.connected && (
                  <span style={{ fontSize: 10, color: "#4b5563" }}>未接続</span>
                )}
              </div>
              {svc.connected ? (
                <GhostButton label="設定" />
              ) : (
                <ConnectButton label="接続" />
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
