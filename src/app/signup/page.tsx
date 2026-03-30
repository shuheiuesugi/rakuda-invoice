"use client";

import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") { (window as any).dataLayer?.push({ event: "sign_up", method: "email" }); }
    setDone(true);
  };

  return (
    <>
      <style>{`
        .signup-page { min-height: 100vh; background: var(--bg-cool, #F8FAFC); display: flex; flex-direction: column; }
        .signup-header { padding: 20px 24px; }
        .signup-header a { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; }
        .signup-header .logo-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--primary, #1A2E4A); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.875rem; }
        .signup-header .logo-text { font-weight: 700; font-size: 1rem; color: var(--text, #0F172A); }

        .signup-body { flex: 1; display: flex; align-items: center; justify-content: center; padding: 0 20px 80px; }
        .signup-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid var(--border, #E2E8F0); padding: 48px 40px; width: 100%; max-width: 440px; }
        .signup-card h1 { font-size: 1.5rem; font-weight: 800; text-align: center; margin-bottom: 6px; color: var(--text, #0F172A); }
        .signup-card .sub { text-align: center; font-size: 0.938rem; color: var(--text-secondary, #475569); margin-bottom: 32px; line-height: 1.6; }

        .signup-google { width: 100%; padding: 14px; border: 1px solid var(--border, #E2E8F0); border-radius: 10px; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.938rem; font-weight: 600; color: var(--text, #0F172A); transition: all 0.15s; }
        .signup-google:hover { background: var(--bg-subtle, #F1F5F9); border-color: var(--text-muted, #94A3B8); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .signup-google svg { flex-shrink: 0; }

        .signup-divider { display: flex; align-items: center; gap: 16px; margin: 24px 0; }
        .signup-divider::before, .signup-divider::after { content: ''; flex: 1; height: 1px; background: var(--border, #E2E8F0); }
        .signup-divider span { font-size: 0.75rem; color: var(--text-muted, #94A3B8); text-transform: uppercase; letter-spacing: 0.05em; }

        .signup-form .input-group { position: relative; }
        .signup-form input { width: 100%; padding: 14px 16px; border: 1px solid var(--border, #E2E8F0); border-radius: 10px; font-size: 0.938rem; transition: border-color 0.2s; }
        .signup-form input:focus { outline: none; border-color: var(--accent, #3B82F6); box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        .signup-form input::placeholder { color: var(--text-muted, #94A3B8); }
        .signup-submit { width: 100%; padding: 14px; margin-top: 12px; background: var(--accent, #3B82F6); color: #fff; border: none; border-radius: 10px; font-size: 0.938rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .signup-submit:hover { background: var(--accent-hover, #2563EB); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(59,130,246,0.3); }

        .signup-terms { text-align: center; margin-top: 16px; font-size: 0.75rem; color: var(--text-muted, #94A3B8); line-height: 1.6; }
        .signup-terms a { color: var(--accent, #3B82F6); text-decoration: none; }
        .signup-terms a:hover { text-decoration: underline; }

        .signup-footer { text-align: center; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border, #E2E8F0); font-size: 0.875rem; color: var(--text-secondary, #475569); }
        .signup-footer a { color: var(--accent, #3B82F6); font-weight: 600; text-decoration: none; }
        .signup-footer a:hover { text-decoration: underline; }

        .signup-benefits { display: flex; justify-content: center; gap: 20px; margin-top: 32px; flex-wrap: wrap; }
        .signup-benefits span { display: flex; align-items: center; gap: 5px; font-size: 0.75rem; color: var(--text-muted, #94A3B8); }
        .signup-benefits .bcheck { color: var(--success, #10B981); font-weight: 700; }

        .signup-done { text-align: center; }
        .signup-done-icon { width: 56px; height: 56px; border-radius: 50%; background: var(--success-soft, #D1FAE5); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .signup-done h1 { margin-bottom: 10px; }
        .signup-done p { color: var(--text-secondary, #475569); font-size: 0.938rem; line-height: 1.7; margin-bottom: 6px; }
        .signup-done .email-highlight { display: inline-block; background: var(--accent-soft, #DBEAFE); color: var(--accent, #3B82F6); padding: 4px 12px; border-radius: 6px; font-weight: 600; font-size: 0.875rem; margin: 12px 0; }
        .signup-done .back-link { display: inline-block; margin-top: 16px; color: var(--text-muted, #94A3B8); font-size: 0.875rem; text-decoration: none; }
        .signup-done .back-link:hover { color: var(--text, #0F172A); }

        @media (max-width: 480px) {
          .signup-card { padding: 32px 24px; }
          .signup-benefits { flex-direction: column; align-items: center; gap: 6px; }
        }
      `}</style>

      <div className="signup-page">
        <div className="signup-header">
          <a href="./" style={{ display: "flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: "20px", width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="#1a1a2e" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>
        </div>

        <div className="signup-body">
          <div>
            <div className="signup-card">
              {!done ? (
                <>
                  <h1>無料ではじめる</h1>
                  <p className="sub">
                    AIが請求書を30秒で作成。<br />
                    Starterプランは永年無料です。
                  </p>

                  <button className="signup-google" type="button">
                    <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                    Googleアカウントで登録
                  </button>

                  <div className="signup-divider">
                    <span>または</span>
                  </div>

                  <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input
                        type="email"
                        required
                        placeholder="メールアドレス"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="signup-submit">
                      無料アカウントを作成
                    </button>
                  </form>

                  <p className="signup-terms">
                    登録により<a href="./terms">利用規約</a>と<a href="./privacy">プライバシーポリシー</a>に同意したものとみなされます。
                  </p>

                  <div className="signup-footer">
                    導入前に相談したい方は <a href="./book-call">無料相談を予約</a>
                  </div>
                </>
              ) : (
                <div className="signup-done">
                  <div className="signup-done-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h1>確認メールを送信しました</h1>
                  <p>以下のアドレスに確認メールをお送りしました。</p>
                  <div className="email-highlight">{email}</div>
                  <p>メール内のリンクをクリックして<br />アカウント設定を完了してください。</p>
                  <a href="./" className="back-link">&larr; トップページに戻る</a>
                </div>
              )}
            </div>

            <div className="signup-benefits">
              <span><span className="bcheck">&#x2714;</span> 永年無料プランあり</span>
              <span><span className="bcheck">&#x2714;</span> クレカ不要</span>
              <span><span className="bcheck">&#x2714;</span> 30秒で請求書作成</span>
            </div>
          </div>
        </div>
      </div>

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
