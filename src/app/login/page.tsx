"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    // Google OAuth - 実装時にSupabase連携を追加
    alert("Google OAuth は準備中です");
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError("");
    // TODO: Supabase認証実装
    setLoading(false);
    setError("現在メール/パスワードログインは準備中です。Googleログインをご利用ください。");
  };

  return (
    <>
      <style>{`
        .login-page { min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
        .login-header { padding: 20px 24px; }
        .login-body { flex: 1; display: flex; align-items: center; justify-content: center; padding: 0 20px 80px; }
        .login-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid #E2E8F0; padding: 48px 40px; width: 100%; max-width: 440px; }
        .login-card h1 { font-size: 1.5rem; font-weight: 800; text-align: center; margin-bottom: 6px; color: #0F172A; }
        .login-card .sub { text-align: center; font-size: 0.938rem; color: #475569; margin-bottom: 32px; line-height: 1.6; }
        .login-google { width: 100%; padding: 14px; border: 1px solid #E2E8F0; border-radius: 10px; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.938rem; font-weight: 600; color: #0F172A; transition: all 0.15s; }
        .login-google:hover { background: #F1F5F9; border-color: #94A3B8; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .login-divider { display: flex; align-items: center; gap: 16px; margin: 24px 0; }
        .login-divider::before, .login-divider::after { content: ''; flex: 1; height: 1px; background: #E2E8F0; }
        .login-divider span { font-size: 0.75rem; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; }
        .login-form input { width: 100%; padding: 14px 16px; border: 1px solid #E2E8F0; border-radius: 10px; font-size: 0.938rem; margin-bottom: 10px; transition: border-color 0.2s; box-sizing: border-box; }
        .login-form input:focus { outline: none; border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        .login-submit { width: 100%; padding: 14px; background: #3B82F6; color: #fff; border: none; border-radius: 10px; font-size: 0.938rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .login-submit:hover { background: #2563EB; }
        .login-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .login-error { color: #EF4444; background: rgba(239,68,68,0.08); padding: 10px 14px; border-radius: 8px; font-size: 0.875rem; text-align: center; margin-bottom: 12px; }
        .login-footer-link { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 0.875rem; color: #475569; }
        .login-footer-link a { color: #3B82F6; font-weight: 600; text-decoration: none; }
        @media (max-width: 480px) { .login-card { padding: 32px 24px; } }
      `}</style>

      <div className="login-page">
        <div className="login-header">
          <a href="./" style={{ display: "inline-flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: "20px", width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="#1a1a2e" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>
        </div>

        <div className="login-body">
          <div className="login-card">
            <h1>ログイン</h1>
            <p className="sub">
              アカウントにログインして<br />AI請求書作成を始めましょう
            </p>

            <button className="login-google" type="button" onClick={handleGoogleLogin}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Googleでログイン
            </button>

            <div className="login-divider"><span>または</span></div>

            <form className="login-form" onSubmit={handleEmailLogin}>
              {error && <div className="login-error">{error}</div>}
              <input
                type="email"
                required
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? "処理中..." : "ログイン"}
              </button>
            </form>

            <div className="login-footer-link">
              アカウントをお持ちでない方は <a href="./signup">無料登録</a>
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
              &copy; 2026 T Advisory Inc. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
