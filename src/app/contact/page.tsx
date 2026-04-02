"use client";

import { useState } from "react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <>
      <style>{`
        .contact-page { min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
        .contact-header { padding: 20px 24px; border-bottom: 1px solid #E2E8F0; background: #fff; }
        .contact-body { flex: 1; display: flex; align-items: flex-start; justify-content: center; padding: 60px 20px; }
        .contact-inner { width: 100%; max-width: 560px; }
        .contact-inner h1 { font-size: 1.75rem; font-weight: 800; color: #0F172A; margin-bottom: 8px; }
        .contact-inner .lead { font-size: 1rem; color: #475569; margin-bottom: 36px; line-height: 1.7; }
        .contact-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid #E2E8F0; padding: 40px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px 16px; border: 1px solid #E2E8F0; border-radius: 10px; font-size: 0.938rem; transition: border-color 0.2s; box-sizing: border-box; font-family: inherit; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        .form-group textarea { min-height: 140px; resize: vertical; }
        .contact-submit { width: 100%; padding: 14px; background: #3B82F6; color: #fff; border: none; border-radius: 10px; font-size: 0.938rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .contact-submit:hover { background: #2563EB; }
        .contact-info { margin-top: 32px; padding-top: 28px; border-top: 1px solid #E2E8F0; }
        .contact-info h3 { font-size: 0.875rem; font-weight: 700; color: #374151; margin-bottom: 12px; }
        .contact-info a { color: #3B82F6; text-decoration: none; font-size: 0.938rem; }
        .done-state { text-align: center; padding: 20px 0; }
        .done-icon { width: 64px; height: 64px; border-radius: 50%; background: #D1FAE5; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.5rem; }
        .done-state h2 { font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 8px; }
        .done-state p { color: #475569; font-size: 0.938rem; line-height: 1.7; }
        @media (max-width: 480px) { .contact-card { padding: 28px 20px; } }
      `}</style>

      <div className="contact-page">
        <div className="contact-header">
          <a href="./" style={{ display: "inline-flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: "20px", width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="#1a1a2e" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>
        </div>

        <div className="contact-body">
          <div className="contact-inner">
            <h1>お問い合わせ</h1>
            <p className="lead">
              ご質問・ご要望・不具合報告などはこちらからお送りください。<br />
              通常2営業日以内にご返信いたします。
            </p>

            <div className="contact-card">
              {!done ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">お名前</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="山田 太郎"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">メールアドレス</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="taro@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">お問い合わせ内容</label>
                    <textarea
                      id="message"
                      required
                      placeholder="ご質問やご要望をご記入ください"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="contact-submit">送信する</button>
                </form>
              ) : (
                <div className="done-state">
                  <div className="done-icon">✓</div>
                  <h2>送信が完了しました</h2>
                  <p>
                    お問い合わせありがとうございます。<br />
                    2営業日以内にご返信いたします。
                  </p>
                </div>
              )}

              <div className="contact-info">
                <h3>メールでのお問い合わせ</h3>
                <a href="mailto:info@rakuda-ai.com">info@rakuda-ai.com</a>
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
              &copy; 2026 T Advisory Inc. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
