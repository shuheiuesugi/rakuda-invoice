import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | ラクダInvoice",
};

export default function Terms() {
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
            <h1>利用規約</h1>
            <p className="legal-updated">最終更新日: 2026年3月24日</p>

            <section>
              <h2>第1条（適用）</h2>
              <p>本利用規約（以下「本規約」）は、ラクダInvoice運営事務局（以下「当社」）が提供するAI請求書作成サービス「ラクダInvoice」（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、本サービスを利用するものとします。</p>
            </section>

            <section>
              <h2>第2条（定義）</h2>
              <p>本規約において使用する用語の定義は以下のとおりとします。</p>
              <ol>
                <li>「ユーザー」とは、本規約に同意し、本サービスを利用する法人または個人をいいます。</li>
                <li>「請求書データ」とは、ユーザーが本サービスを通じて作成・管理する請求書、取引先情報、品目情報等のデータをいいます。</li>
                <li>「適格請求書」とは、インボイス制度（適格請求書等保存方式）に基づく要件を満たした請求書をいいます。</li>
              </ol>
            </section>

            <section>
              <h2>第3条（アカウント登録）</h2>
              <p>本サービスの利用にはアカウント登録が必要です。ユーザーは正確かつ最新の情報を登録し、変更がある場合は速やかに更新するものとします。アカウント情報の管理はユーザーの責任とし、第三者による不正利用に起因する損害について当社は責任を負いません。</p>
            </section>

            <section>
              <h2>第4条（料金・支払い）</h2>
              <p>本サービスの料金は、料金ページに掲載するプランに基づきます。</p>
              <ol>
                <li>Standardプラン: 月額1,980円（税抜）</li>
                <li>Enterpriseプラン: 月額4,980円（税抜）</li>
              </ol>
              <p>有料プランの料金は月額または年額の前払いとし、クレジットカードまたは請求書払いにてお支払いいただきます。年額プランの途中解約による日割り返金には対応いたします。</p>
            </section>

            <section>
              <h2>第5条（禁止事項）</h2>
              <p>ユーザーは以下の行為を行ってはなりません。</p>
              <ol>
                <li>法令または公序良俗に反する行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                <li>虚偽の情報を登録する行為</li>
                <li>本サービスのリバースエンジニアリング等の行為</li>
              </ol>
            </section>

            <section>
              <h2>第6条（サービスの変更・停止）</h2>
              <p>当社は、事前の通知をもって本サービスの内容を変更し、または提供を停止することができます。ただし、緊急の場合はこの限りではありません。当社はこれによりユーザーに生じた損害について、当社に故意または重大な過失がある場合を除き、責任を負いません。</p>
            </section>

            <section>
              <h2>第7条（知的財産権）</h2>
              <p>本サービスに関する知的財産権は当社に帰属します。ユーザーが本サービスに入力・登録したデータの権利はユーザーに帰属しますが、当社はサービス提供に必要な範囲で当該データを利用できるものとします。</p>
            </section>

            <section>
              <h2>第8条（免責事項）</h2>
              <p>当社は、本サービスの提供にあたり合理的な努力を行いますが、完全性、正確性、有用性等を保証するものではありません。本サービスが生成する適格請求書の形式的要件については可能な限り正確性を担保しますが、税務上の最終判断はユーザーの責任において行うものとします。本サービスの利用に起因してユーザーに損害が生じた場合、当社の賠償責任は当該ユーザーが過去12ヶ月間に支払った利用料金の総額を上限とします。</p>
            </section>

            <section>
              <h2>第9条（準拠法・管轄）</h2>
              <p>本規約は日本法に準拠し、日本法に従って解釈されます。本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
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
