import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | ラクダInvoice",
};

export default function Privacy() {
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
            <h1>プライバシーポリシー</h1>
            <p className="legal-updated">最終更新日: 2026年3月24日</p>

            <section>
              <h2>1. はじめに</h2>
              <p>ラクダInvoice運営事務局（以下「当社」）は、本サービスをご利用いただくお客様の個人情報および請求書関連データの保護に努めています。本プライバシーポリシーでは、当社が収集する情報の種類、利用目的、管理方法についてご説明します。</p>
            </section>

            <section>
              <h2>2. 収集する情報</h2>
              <h3>（1）ユーザー情報</h3>
              <p>アカウント登録時に、会社名、氏名、メールアドレス、電話番号、請求先情報、適格請求書発行事業者登録番号を収集します。</p>
              <h3>（2）請求書データ</h3>
              <p>請求書の作成に伴い、取引先情報、品目・金額、税率区分、発行日・支払期限等のデータを収集します。</p>
              <h3>（3）利用ログ</h3>
              <p>本サービスの利用に伴い、IPアドレス、ブラウザ情報、アクセスログ等の技術的情報を自動的に収集します。</p>
            </section>

            <section>
              <h2>3. 情報の利用目的</h2>
              <ol>
                <li>本サービスの提供・運営・改善</li>
                <li>請求書の自動生成・PDF出力・メール送信</li>
                <li>お問い合わせへの対応</li>
                <li>料金の請求・決済処理</li>
                <li>セキュリティの確保・不正利用の防止</li>
                <li>サービスに関するお知らせの送付</li>
              </ol>
            </section>

            <section>
              <h2>4. 情報の第三者提供</h2>
              <p>当社は、以下の場合を除き、個人情報を第三者に提供しません。</p>
              <ol>
                <li>ユーザーの同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>サービス提供に必要な業務委託先への提供（適切な契約の下）</li>
              </ol>
            </section>

            <section>
              <h2>5. データの保存・保護</h2>
              <p>個人情報および請求書データは、通信時はTLS 1.3、保存時はAES-256により暗号化されます。データはアクセス制御されたクラウド環境（AWS東京リージョン）に保存し、定期的なセキュリティ監査を実施しています。電子帳簿保存法の保存要件に対応したデータ管理を行っています。</p>
            </section>

            <section>
              <h2>6. Cookieの利用</h2>
              <p>本サービスでは、セッション管理およびサービス改善の目的でCookieを使用します。ブラウザの設定によりCookieを無効にすることが可能ですが、一部機能が制限される場合があります。</p>
            </section>

            <section>
              <h2>7. ユーザーの権利</h2>
              <p>ユーザーは、自身の個人情報について、開示、訂正、削除を請求する権利を有します。管理画面からの操作、またはお問い合わせフォームよりご連絡ください。</p>
            </section>

            <section>
              <h2>8. 本ポリシーの変更</h2>
              <p>当社は、必要に応じて本ポリシーを変更する場合があります。重要な変更を行う場合は、本サービスまたはメールにて通知します。</p>
            </section>

            <section>
              <h2>9. お問い合わせ</h2>
              <p>本ポリシーに関するお問い合わせは、以下までご連絡ください。</p>
              <p>ラクダInvoice運営事務局<br />メール: privacy@rakuda-ai.com</p>
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
