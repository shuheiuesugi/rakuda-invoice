import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | RAKUDAインボイス",
};

export default function Tokushoho() {
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
            <h1>特定商取引法に基づく表記</h1>
            <p className="legal-updated">最終更新日: 2026年3月24日</p>

            <table className="tokushoho-table">
              <tbody>
                <tr>
                  <th>販売業者</th>
                  <td>RAKUDAインボイス運営事務局</td>
                </tr>
                <tr>
                  <th>運営統括責任者</th>
                  <td>代表者名（請求に応じて遅滞なく開示いたします）</td>
                </tr>
                <tr>
                  <th>所在地</th>
                  <td>東京都港区（請求に応じて遅滞なく開示いたします）</td>
                </tr>
                <tr>
                  <th>電話番号</th>
                  <td>請求に応じて遅滞なく開示いたします</td>
                </tr>
                <tr>
                  <th>メールアドレス</th>
                  <td>info@rakuda-ai.com</td>
                </tr>
                <tr>
                  <th>サービスの名称</th>
                  <td>RAKUDAインボイス（AI請求書作成サービス）</td>
                </tr>
                <tr>
                  <th>販売価格</th>
                  <td>
                    Freeプラン: ¥0（無料）<br />
                    Proプラン: 月額980円（税抜）<br />
                    Enterpriseプラン: カスタム料金（お問い合わせください）
                  </td>
                </tr>
                <tr>
                  <th>販売価格以外の必要料金</th>
                  <td>インターネット接続料金、通信費等はお客様のご負担となります。</td>
                </tr>
                <tr>
                  <th>支払方法</th>
                  <td>クレジットカード（Visa, Mastercard, JCB, American Express）<br />請求書払い（Enterpriseプランのみ）</td>
                </tr>
                <tr>
                  <th>支払時期</th>
                  <td>月額プラン: 毎月初日に自動課金<br />年額プラン: 契約開始日に一括課金</td>
                </tr>
                <tr>
                  <th>サービス提供時期</th>
                  <td>アカウント登録後、即時ご利用いただけます。</td>
                </tr>
                <tr>
                  <th>返品・キャンセル</th>
                  <td>
                    全プラン: 14日間の返金保証付き。<br />
                    月額プラン: いつでも管理画面から解約可能（契約期間末日まで利用可）。<br />
                    年額プラン: 途中解約の場合、残存期間分の日割り返金に対応。
                  </td>
                </tr>
                <tr>
                  <th>動作環境</th>
                  <td>
                    Google Chrome, Safari, Microsoft Edge, Firefox の最新版。<br />
                    iOS 15以上 / Android 10以上のモバイルブラウザ。<br />
                    ※専用アプリのインストールは不要です。
                  </td>
                </tr>
              </tbody>
            </table>

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
