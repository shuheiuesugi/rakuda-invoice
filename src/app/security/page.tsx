import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "セキュリティ | ラクダInvoice",
};

export default function Security() {
  return (
    <>
      <header className="sub-header">
        <div className="sub-header-inner">
          <a href="./" className="sub-header-logo" style={{ color: "#1a1a2e" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: "20px", width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>
        </div>
      </header>

      <main className="legal-page">
        <div className="container">
          <div className="legal-content">
            <h1>セキュリティ</h1>
            <p className="legal-updated">最終更新日: 2026年3月24日</p>

            <p className="security-lead">
              ラクダInvoiceは、お客様の請求書データと事業者情報を守ることを最優先に設計されています。
              電子帳簿保存法に完全対応し、以下のセキュリティ対策を実施しています。
            </p>

            <div className="security-grid">
              <div className="security-card">
                <div className="security-card-icon">&#x1F512;</div>
                <h3>通信の暗号化</h3>
                <p>すべての通信はTLS 1.3で暗号化。中間者攻撃やデータ傍受を防止します。HSTS（HTTP Strict Transport Security）も有効化済みです。</p>
              </div>

              <div className="security-card">
                <div className="security-card-icon">&#x1F5C4;&#xFE0F;</div>
                <h3>保存時の暗号化</h3>
                <p>請求書データを含むすべてのデータは、AES-256で暗号化して保存。暗号鍵は定期的にローテーションされます。</p>
              </div>

              <div className="security-card">
                <div className="security-card-icon">&#x1F6E1;&#xFE0F;</div>
                <h3>SOC 2 Type II</h3>
                <p>SOC 2 Type II認証を取得済み。セキュリティ、可用性、機密保持の統制が第三者機関により監査されています。</p>
              </div>

              <div className="security-card">
                <div className="security-card-icon">&#x1F4D1;</div>
                <h3>電子帳簿保存法対応</h3>
                <p>電子帳簿保存法の保存要件に完全対応。タイムスタンプ付与、検索機能、訂正削除の履歴管理を標準装備しています。</p>
              </div>

              <div className="security-card">
                <div className="security-card-icon">&#x1F50D;</div>
                <h3>定期セキュリティ監査</h3>
                <p>年2回の第三者ペネトレーションテストと、継続的な脆弱性スキャンを実施。発見された問題は即座に対処します。</p>
              </div>

              <div className="security-card">
                <div className="security-card-icon">&#x1F4CA;</div>
                <h3>データ保持ポリシー</h3>
                <p>請求書データの保持期間はお客様が管理画面から設定可能。電子帳簿保存法で求められる7年間の保存にも対応します。</p>
              </div>
            </div>

            <section>
              <h2>インフラストラクチャ</h2>
              <ul className="security-infra-list">
                <li>データセンター: AWS東京リージョン（ap-northeast-1）</li>
                <li>稼働率保証: SLA 99.9%（Enterpriseプラン）</li>
                <li>バックアップ: 日次自動バックアップ + 地理的冗長化</li>
                <li>監視: 24/7のインフラ監視とアラート体制</li>
              </ul>
            </section>

            <section>
              <h2>脆弱性報告</h2>
              <p>セキュリティに関する脆弱性を発見された場合は、以下までご報告ください。責任ある開示に基づき対応いたします。</p>
              <p>メール: security@rakuda-ai.com</p>
            </section>

            <div className="legal-back">
              <a href="./" className="legal-back-btn">トップページに戻る</a>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ borderTop: "1px solid #E5E5E5", background: "#fff", padding: "40px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
              <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75" stroke="#1A1A2E" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: "14px", fontWeight: 300, letterSpacing: "0.15em", color: "#111" }}>RAKUDA AI</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "32px" }}>
            <div>
              <h3 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "12px" }}>サポート</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                <li><a href="mailto:info@rakuda-ai.com" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>info@rakuda-ai.com</a></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#9CA3AF", marginBottom: "12px" }}>リンク</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                <li><a href="./terms" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>利用規約</a></li>
                <li><a href="./privacy" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>プライバシーポリシー</a></li>
                <li><a href="./tokushoho" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>特定商取引法</a></li>
                <li><a href="./security" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>セキュリティ</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "24px", textAlign: "center" as const, fontSize: "12px", color: "#9CA3AF" }}>
            &copy; 2026 Rakuda AI Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
