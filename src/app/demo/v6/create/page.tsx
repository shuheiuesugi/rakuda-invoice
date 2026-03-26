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

function formatCurrency(n: number) {
  return "¥" + n.toLocaleString();
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 6,
  color: "#e2e8f0",
  fontSize: 13,
  outline: "none",
  fontFamily: "inherit",
};

const items = [
  { name: "Webアプリ開発", qty: 1, price: 400000, taxRate: "10%" },
  { name: "サーバー保守", qty: 1, price: 80000, taxRate: "10%" },
];

export default function CreateInvoicePage() {
  const subtotal = 480000;
  const tax = 48000;
  const total = 528000;

  const steps = [
    { num: 1, label: "取引先選択" },
    { num: 2, label: "明細入力" },
    { num: 3, label: "確認" },
  ];
  const activeStep = 2;

  return (
    <>
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 32 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 600,
                background: step.num === activeStep ? "#3B82F6" : step.num < activeStep ? "rgba(74, 222, 128, 0.15)" : "rgba(255,255,255,0.05)",
                color: step.num === activeStep ? "#fff" : step.num < activeStep ? "#4ade80" : "#4b5563",
                border: step.num === activeStep ? "none" : `1px solid ${step.num < activeStep ? "rgba(74, 222, 128, 0.3)" : "rgba(255,255,255,0.08)"}`,
              }}>{step.num}</div>
              <span style={{
                fontSize: 12,
                fontWeight: step.num === activeStep ? 600 : 400,
                color: step.num === activeStep ? "#e2e8f0" : "#4b5563",
              }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.08)", margin: "0 16px" }} />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div style={{ ...glassCard, padding: "28px 32px" }}>
        {/* Client select */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: "#7a8494", fontWeight: 500, display: "block", marginBottom: 6 }}>取引先</label>
          <select style={{ ...inputStyle, cursor: "pointer" }} defaultValue="tech">
            <option value="tech">株式会社テクノロジーズ</option>
            <option value="abc">ABCコンサルティング</option>
            <option value="yamada">山田デザイン事務所</option>
            <option value="global">グローバル商事</option>
          </select>
        </div>

        {/* Subject */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: "#7a8494", fontWeight: 500, display: "block", marginBottom: 6 }}>件名</label>
          <input type="text" defaultValue="Webアプリ開発 3月分" style={inputStyle} />
        </div>

        {/* Items table */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: "#7a8494", fontWeight: 500, display: "block", marginBottom: 10 }}>明細</label>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["品目", "数量", "単価", "税率", "金額"].map((h, i) => (
                  <th key={i} style={{
                    padding: "8px 12px",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#4b5563",
                    textAlign: i === 0 ? "left" : "right",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase" as const,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "8px 4px" }}>
                    <input type="text" defaultValue={item.name} style={{ ...inputStyle, background: "rgba(255,255,255,0.02)" }} />
                  </td>
                  <td style={{ padding: "8px 4px", width: 80 }}>
                    <input type="number" defaultValue={item.qty} style={{ ...inputStyle, textAlign: "right", background: "rgba(255,255,255,0.02)" }} />
                  </td>
                  <td style={{ padding: "8px 4px", width: 140 }}>
                    <input type="text" defaultValue={formatCurrency(item.price)} style={{ ...inputStyle, textAlign: "right", background: "rgba(255,255,255,0.02)" }} />
                  </td>
                  <td style={{ padding: "8px 4px", width: 80 }}>
                    <select defaultValue={item.taxRate} style={{ ...inputStyle, textAlign: "right", background: "rgba(255,255,255,0.02)", cursor: "pointer" }}>
                      <option value="10%">10%</option>
                      <option value="8%">8%</option>
                      <option value="0%">0%</option>
                    </select>
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "#e2e8f0", textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" as const }}>
                    {formatCurrency(item.qty * item.price)}
                  </td>
                </tr>
              ))}
              {/* Empty placeholder row */}
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "8px 4px" }}>
                  <input type="text" placeholder="品目を入力..." style={{ ...inputStyle, background: "rgba(255,255,255,0.02)", color: "#475569" }} />
                </td>
                <td style={{ padding: "8px 4px", width: 80 }}>
                  <input type="number" placeholder="0" style={{ ...inputStyle, textAlign: "right", background: "rgba(255,255,255,0.02)", color: "#475569" }} />
                </td>
                <td style={{ padding: "8px 4px", width: 140 }}>
                  <input type="text" placeholder="¥0" style={{ ...inputStyle, textAlign: "right", background: "rgba(255,255,255,0.02)", color: "#475569" }} />
                </td>
                <td style={{ padding: "8px 4px", width: 80 }}>
                  <select style={{ ...inputStyle, textAlign: "right", background: "rgba(255,255,255,0.02)", color: "#475569", cursor: "pointer" }}>
                    <option value="10%">10%</option>
                    <option value="8%">8%</option>
                    <option value="0%">0%</option>
                  </select>
                </td>
                <td style={{ padding: "8px 12px", fontSize: 13, color: "#4b5563", textAlign: "right" }}>--</td>
              </tr>
            </tbody>
          </table>

          <button style={{
            marginTop: 8,
            padding: "6px 14px",
            background: "transparent",
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: 6,
            color: "#7a8494",
            fontSize: 11,
            cursor: "pointer",
          }}>+ 行を追加</button>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <div style={{ width: 260 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: "#7a8494" }}>
              <span>小計</span><span style={{ color: "#e2e8f0" }}>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, color: "#7a8494" }}>
              <span>消費税</span><span style={{ color: "#e2e8f0" }}>{formatCurrency(tax)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 16, fontWeight: 700, color: "#e2e8f0", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 4 }}>
              <span>合計</span><span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Due date */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, color: "#7a8494", fontWeight: 500, display: "block", marginBottom: 6 }}>支払期日</label>
          <input type="text" defaultValue="2026/04/30" style={{ ...inputStyle, width: 200 }} />
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 12, color: "#7a8494", fontWeight: 500, display: "block", marginBottom: 6 }}>備考</label>
          <textarea rows={3} placeholder="備考を入力..." style={{ ...inputStyle, resize: "vertical" as const }} />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={{
            padding: "10px 20px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6,
            color: "#7a8494",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}>下書き保存</button>
          <button style={{
            padding: "10px 20px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 6,
            color: "#7a8494",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}>プレビュー</button>
          <button style={{
            padding: "10px 20px",
            background: "#3B82F6",
            border: "none",
            borderRadius: 6,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}>送信</button>
        </div>
      </div>
    </>
  );
}
