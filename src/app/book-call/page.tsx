"use client";

import { useState } from "react";

export default function BookCallPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    title: "",
    email: "",
    phone: "",
    format: "online",
    employees: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
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

      <main className="book-call-page">
        <div className="container">
          {submitted ? (
            <div className="book-call-thankyou">
              <div className="book-call-thankyou-icon">&#10003;</div>
              <h1>お問い合わせありがとうございます</h1>
              <p>
                内容を確認のうえ、2営業日以内にご連絡いたします。<br />
                お急ぎの場合は、メールにてお問い合わせください。
              </p>
              <a href="./" className="book-call-back-btn">トップページに戻る</a>
            </div>
          ) : (
            <div className="book-call-layout">
              {/* Form Section */}
              <div className="book-call-form-section">
                <h1 className="book-call-title">導入相談を予約する</h1>
                <p className="book-call-subtitle">
                  ラクダInvoiceの導入をご検討中の企業様向けに、オンラインまたは対面での無料相談を承っております。
                </p>

                <form className="book-call-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="company">
                        会社名 <span className="form-required">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="form-input"
                        placeholder="株式会社ラクダ"
                        value={form.company}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        お名前 <span className="form-required">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder="山田 太郎"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="title">役職</label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="form-input"
                        placeholder="経理部長"
                        value={form.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        メールアドレス <span className="form-required">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder="yamada@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">電話番号</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-input"
                        placeholder="03-1234-5678"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="format">
                        ご希望の相談形式 <span className="form-required">*</span>
                      </label>
                      <select
                        id="format"
                        name="format"
                        className="form-input"
                        value={form.format}
                        onChange={handleChange}
                        required
                      >
                        <option value="online">オンライン（Zoom / Google Meet）</option>
                        <option value="visit">対面（ご来社）</option>
                        <option value="phone">電話</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="employees">
                      導入予定人数
                    </label>
                    <select
                      id="employees"
                      name="employees"
                      className="form-input"
                      value={form.employees}
                      onChange={handleChange}
                    >
                      <option value="">選択してください</option>
                      <option value="1-5">1〜5名</option>
                      <option value="6-20">6〜20名</option>
                      <option value="21-50">21〜50名</option>
                      <option value="51-100">51〜100名</option>
                      <option value="101+">101名以上</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">
                      ご相談内容・ご質問
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      rows={5}
                      placeholder="導入についてのご質問やご要望がございましたらご記入ください。"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    相談を予約する
                  </button>
                </form>
              </div>

              {/* Info Section */}
              <div className="book-call-info-section">
                <div className="book-call-info-card">
                  <h2 className="book-call-info-title">無料相談でわかること</h2>
                  <ul className="book-call-info-list">
                    <li>
                      <span className="book-call-info-icon">&#9889;</span>
                      <div>
                        <strong>貴社に最適なプランのご提案</strong>
                        <p>利用人数や請求書発行頻度に応じた最適なプランをご提案いたします。</p>
                      </div>
                    </li>
                    <li>
                      <span className="book-call-info-icon">&#128640;</span>
                      <div>
                        <strong>導入・セットアップのサポート</strong>
                        <p>インボイス登録番号の設定や会計ソフト連携など、スムーズな導入を支援します。</p>
                      </div>
                    </li>
                    <li>
                      <span className="book-call-info-icon">&#128202;</span>
                      <div>
                        <strong>ROI試算・効果シミュレーション</strong>
                        <p>請求書作業の時間短縮効果を具体的な数値でお見せします。</p>
                      </div>
                    </li>
                    <li>
                      <span className="book-call-info-icon">&#128274;</span>
                      <div>
                        <strong>セキュリティ・コンプライアンス対応</strong>
                        <p>電子帳簿保存法やインボイス制度への対応状況についてご説明します。</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="book-call-contact-card">
                  <h3>その他のお問い合わせ</h3>
                  <p>
                    メール：<a href="mailto:support@rakuda-invoice.com">support@rakuda-invoice.com</a>
                  </p>
                  <p>
                    営業時間：平日 10:00〜18:00（土日祝休み）
                  </p>
                </div>
              </div>
            </div>
          )}
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
