"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setDone(true);
    }
  };

  return (
    <>
      <style>{`
        /* ── Reset & Base ── */
        .signup-root * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .signup-root {
          min-height: 100vh;
          background: #F9FAFB;
          font-family: "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Noto Sans JP", "BIZ UDPGothic", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #111827;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ── Header ── */
        .signup-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E7EB;
          height: 64px;
          display: flex;
          align-items: center;
        }
        .signup-header-inner {
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
        }
        .signup-header-logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }
        .signup-header-logo:hover {
          opacity: 0.85;
        }

        /* ── Main ── */
        .signup-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 20px 80px;
        }

        /* ── Card ── */
        .signup-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04);
          width: 100%;
          max-width: 440px;
          padding: 40px 36px 36px;
        }
        .signup-card-title {
          font-size: 24px;
          font-weight: 800;
          text-align: center;
          line-height: 1.3;
          color: #111827;
          margin-bottom: 8px;
        }
        .signup-card-subtitle {
          font-size: 14px;
          color: #4B5563;
          text-align: center;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        /* ── Google Button ── */
        .signup-google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 48px;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
          font-family: inherit;
        }
        .signup-google-btn:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
          box-shadow: 0 1px 3px rgb(0 0 0 / 0.06), 0 1px 2px rgb(0 0 0 / 0.04);
        }
        .signup-google-btn:active {
          background: #F3F4F6;
        }
        .signup-google-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        /* ── Divider ── */
        .signup-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
        }
        .signup-divider-line {
          flex: 1;
          height: 1px;
          background: #E5E7EB;
        }
        .signup-divider-text {
          font-size: 12px;
          color: #9CA3AF;
          white-space: nowrap;
        }

        /* ── Form ── */
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .signup-input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          color: #111827;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .signup-input::placeholder {
          color: #9CA3AF;
        }
        .signup-input:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }
        .signup-submit-btn {
          width: 100%;
          height: 48px;
          background: #1D4ED8;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s;
          font-family: inherit;
        }
        .signup-submit-btn:hover {
          background: #1E40AF;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04);
        }
        .signup-submit-btn:active {
          background: #1E3A8A;
        }

        /* ── Terms ── */
        .signup-terms {
          font-size: 12px;
          color: #9CA3AF;
          text-align: center;
          line-height: 1.7;
          margin-top: 20px;
        }
        .signup-terms a {
          color: #2563EB;
          text-decoration: none;
        }
        .signup-terms a:hover {
          text-decoration: underline;
        }

        /* ── Footer link ── */
        .signup-footer-link {
          font-size: 13px;
          color: #4B5563;
          text-align: center;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #E5E7EB;
        }
        .signup-footer-link a {
          color: #1D4ED8;
          text-decoration: none;
          font-weight: 600;
        }
        .signup-footer-link a:hover {
          text-decoration: underline;
        }

        /* ── Checkmarks row ── */
        .signup-checks {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .signup-check-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #4B5563;
        }
        .signup-check-icon {
          width: 18px;
          height: 18px;
          background: #D1FAE5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .signup-check-icon svg {
          width: 10px;
          height: 10px;
        }

        /* ── Confirmation state ── */
        .signup-confirm {
          text-align: center;
          padding: 48px 36px 40px;
        }
        .signup-confirm-icon {
          width: 64px;
          height: 64px;
          background: #DBEAFE;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .signup-confirm-title {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 12px;
        }
        .signup-confirm-email {
          font-size: 15px;
          font-weight: 600;
          color: #1D4ED8;
          margin-bottom: 16px;
          word-break: break-all;
        }
        .signup-confirm-desc {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .signup-confirm-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #1D4ED8;
          text-decoration: none;
        }
        .signup-confirm-back:hover {
          text-decoration: underline;
        }

        /* ── Responsive ── */
        @media (max-width: 520px) {
          .signup-main {
            padding: 32px 16px 60px;
          }
          .signup-card {
            padding: 32px 24px 28px;
          }
          .signup-confirm {
            padding: 36px 24px 28px;
          }
          .signup-card-title {
            font-size: 21px;
          }
          .signup-checks {
            gap: 16px;
          }
        }
      `}</style>

      <div className="signup-root">
        {/* ── Header ── */}
        <header className="signup-header">
          <div className="signup-header-inner">
            <a href="./" className="signup-header-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: "20px", width: "auto" }}>
                <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="#1a1a2e" letterSpacing="3">RAKUDAインボイス</text>
              </svg>
            </a>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="signup-main">
          <div className="signup-card">
            {done ? (
              /* ── Confirmation State ── */
              <div className="signup-confirm">
                <div className="signup-confirm-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h1 className="signup-confirm-title">確認メールを送信しました</h1>
                <p className="signup-confirm-email">{email}</p>
                <p className="signup-confirm-desc">
                  メール内のリンクをクリックして<br />
                  アカウント設定を完了してください。
                </p>
                <a href="./" className="signup-confirm-back">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  トップページに戻る
                </a>
              </div>
            ) : (
              /* ── Signup Form ── */
              <>
                <h1 className="signup-card-title">無料ではじめる</h1>
                <p className="signup-card-subtitle">
                  クレジットカード不要。Freeプランは永年無料です。
                </p>

                {/* Google OAuth */}
                <button type="button" className="signup-google-btn">
                  <svg className="signup-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Googleアカウントで登録
                </button>

                {/* Divider */}
                <div className="signup-divider">
                  <div className="signup-divider-line" />
                  <span className="signup-divider-text">または</span>
                  <div className="signup-divider-line" />
                </div>

                {/* Email form */}
                <form className="signup-form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className="signup-input"
                    placeholder="メールアドレスを入力"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <button type="submit" className="signup-submit-btn">
                    無料アカウントを作成
                  </button>
                </form>

                {/* Terms */}
                <p className="signup-terms">
                  登録により<a href="./terms">利用規約</a>と<a href="./privacy">プライバシーポリシー</a>に同意したものとみなされます。
                </p>

                {/* Footer link */}
                <p className="signup-footer-link">
                  導入前に相談したい方は <a href="./book-call">無料相談を予約</a>
                </p>
              </>
            )}
          </div>

          {/* ── Checkmarks ── */}
          {!done && (
            <div className="signup-checks">
              {[
                "永年無料プランあり",
                "クレカ不要",
                "30秒で登録完了",
              ].map((label) => (
                <div key={label} className="signup-check-item">
                  <div className="signup-check-icon">
                    <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 5.5L4 7.5L8 3" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {label}
                </div>
              ))}
            </div>
          )}
        </main>

        {/* ── Footer ── */}
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
      </div>
    </>
  );
}
