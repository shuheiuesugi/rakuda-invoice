"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   RAKUDAインボイス — 簡単さ訴求 LP（easy バリアント）
   中小企業・個人事業主向け。専門用語を使わないやさしい言葉。
   ============================================================ */

// Intersection Observer hook with varied animation directions
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const children = el.querySelectorAll(".animate-on-scroll");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

// SVG Icons
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path
      d="M2 5.5L4 7.5L8 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3.5 5.25L7 8.75L10.5 5.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// FAQ
const faqData = [
  {
    q: "パソコンに詳しくなくても使えますか?",
    a: "はい、もちろん使えます。インターネットの画面（ブラウザ）を開くだけで使えるので、特別な知識は必要ありません。取引先のお名前と金額を入れるだけで、あとはAIが全部やってくれます。もし困ったときは、チャットですぐにサポートします。",
  },
  {
    q: "インボイス制度って何ですか? 対応できますか?",
    a: "2023年10月から始まった、請求書の新しいルールです。登録番号や税率の書き方にきまりがあります。でも安心してください。RAKUDAインボイスが全部自動でやってくれるので、あなたがルールを覚える必要はありません。",
  },
  {
    q: "Excelからの切り替えは大変ですか?",
    a: "ぜんぜん大変じゃありません。今まで使っていたExcelのデータを取り込む必要もありません。RAKUDAインボイスで新しく作り始めるだけでOKです。最初の1通は1分もかからずに作れます。",
  },
  {
    q: "スマホからでも使えますか?",
    a: "はい、スマホのブラウザからでも使えます。外出先や移動中でも、取引先からの依頼にすぐ対応できます。専用アプリのインストールは不要です。",
  },
  {
    q: "作成した請求書はどうやって送りますか?",
    a: "メールで直接送付するか、PDFをダウンロードして送付できます。メール送付の場合、相手方にはPDFが添付されます。送付後の開封確認や入金状況もアプリ上で管理できます。",
  },
  {
    q: "途中でやめることはできますか?",
    a: "はい、いつでも管理画面からやめることができます。やめた後も90日間はデータを閲覧・ダウンロードできます。無理に続ける必要はありませんので、まずは無料からどうぞ。",
  },
];

// Voice data (架空ユーザー)
const voiceData = [
  {
    name: "田中 恵子さん",
    role: "フリーランスWebデザイナー",
    years: "利用歴 8ヶ月",
    text: "毎月Excelで1時間かけていた請求書が、3分で終わるようになりました。インボイスのルールも難しそうで怖かったのですが、自動でやってくれるので安心です。",
  },
  {
    name: "佐藤 健一さん",
    role: "建設業 / 個人事業主",
    years: "利用歴 1年2ヶ月",
    text: "パソコンは苦手なのですが、取引先の名前を入れるだけで全部できちゃう。スマホからでも使えるので、現場からでも送れるのが便利です。",
  },
  {
    name: "山田 由美さん",
    role: "株式会社マリン / 経理担当",
    years: "利用歴 6ヶ月",
    text: "月30通くらい作っていたのが、今は半日で終わります。定期請求の自動送付機能を使い始めてから、うっかり送り忘れもゼロになりました。",
  },
];

export default function EasyLP() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sectionRefs = {
    hero: useScrollReveal(),
    pain: useScrollReveal(),
    stats: useScrollReveal(),
    flow: useScrollReveal(),
    features: useScrollReveal(),
    voices: useScrollReveal(),
    howItWorks: useScrollReveal(),
    companySize: useScrollReveal(),
    pricing: useScrollReveal(),
    socialProof: useScrollReveal(),
    faq: useScrollReveal(),
    cta: useScrollReveal(),
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  return (
    <>
      {/* ── HEADER ─────────────────────────────────── */}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#" className="header-logo" style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 40" className="header-logo-svg" style={{ height: "20px", width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>

          <nav className="header-nav">
            <a href="#features">できること</a>
            <a href="#how-it-works">始め方</a>
            <a href="#voices">使っている方の声</a>
            <a href="#pricing">料金</a>
            <a href="#faq">よくある質問</a>
          </nav>

          <div className="header-cta-group">
            <a href="/signup" className="btn btn-sm btn-cta-call">
              30秒で無料アカウント作成
            </a>
          </div>

          <button className="mobile-menu-btn" aria-label="メニューを開く">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        {/* ── HERO ─────────────────────────────────── */}
        <section className="hero" ref={sectionRefs.hero}>
          <div className="hero-grid-pattern" />
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <span className="hero-badge-dot" />
                  かんたん請求書サービス
                </div>
                <h1>
                  請求書作成、
                  <br />
                  <span className="accent-text">もう面倒じゃない。</span>
                </h1>
                <p className="hero-pain">
                  Excelで何度も同じことを入力するのも、インボイスのルールを調べるのも、<em>もう必要ありません</em>。
                  <br />
                  請求書の手間、なくなります。
                </p>
                <p className="hero-subtitle">
                  取引先を選んで金額を入力するだけ。AIが住所・品目・税率を自動で補完して、インボイス対応の請求書が30秒で完成します。
                </p>
                <div className="hero-actions">
                  <a href="/signup" className="btn btn-lg btn-cta-call">
                    30秒で無料アカウント作成
                    <ArrowRight />
                  </a>
                  <a href="#pricing" className="btn btn-lg btn-dark">
                    料金を確認する
                  </a>
                </div>
                <div className="hero-note">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M7 1C3.686 1 1 3.686 1 7s2.686 6 6 6 6-2.686 6-6S10.314 1 7 1z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M5 7l1.5 1.5L9 5.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  月5通まで無料・難しい設定なし・クレカ不要
                </div>
              </div>

              {/* Invoice Mockup */}
              <div className="hero-visual">
                <div className="hero-browser-frame">
                  <div className="hero-browser-outer">
                    <div className="hero-browser-bar">
                      <div className="browser-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                      </div>
                      <div className="browser-url">invoice.rakuda-ai.com/create</div>
                    </div>
                    <div className="hero-browser-screen">
                      <div className="hero-browser-ui">
                        <div className="browser-header">
                          <div className="browser-logo-area">
                            <div className="browser-logo-square">R</div>
                            <span className="browser-company-name">
                              請求書を作る
                            </span>
                          </div>
                          <span className="browser-time" style={{ fontSize: "9px", background: "#EFF6FF", color: "#1D4ED8", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>Step 2/3</span>
                        </div>
                        <div className="browser-welcome" style={{ padding: "8px 12px", textAlign: "left" }}>
                          {/* Step indicator */}
                          <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                            {["取引先選択", "明細入力", "送信"].map((step, i) => (
                              <div key={i} style={{ flex: 1, textAlign: "center" as const, padding: "3px 0", borderRadius: "4px", fontSize: "8px", fontWeight: 600, background: i === 1 ? "#1A1A2E" : i < 1 ? "#3B82F6" : "#F3F4F6", color: i <= 1 ? "#fff" : "#9CA3AF" }}>
                                {step}
                              </div>
                            ))}
                          </div>
                          {/* 明細入力 */}
                          <div style={{ fontSize: "9px", color: "#9CA3AF", marginBottom: "3px" }}>品目</div>
                          <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
                            <div style={{ flex: 2, fontSize: "10px", color: "#1A1A2E", padding: "4px 6px", background: "#F9FAFB", borderRadius: "4px", border: "1px solid #E5E7EB" }}>
                              Webデザイン制作費
                            </div>
                            <div style={{ flex: 1, fontSize: "10px", color: "#1A1A2E", padding: "4px 6px", background: "#F9FAFB", borderRadius: "4px", border: "1px solid #E5E7EB" }}>
                              ¥150,000
                            </div>
                          </div>
                          <div style={{ fontSize: "9px", color: "#3B82F6", marginBottom: "8px", display: "flex", alignItems: "center", gap: "3px" }}>
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="3" fill="#3B82F6"/><path d="M2.5 4l1 1 2-2" stroke="#fff" strokeWidth="1" strokeLinecap="round"/></svg>
                            AIが自動補完しました
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", background: "#EFF6FF", borderRadius: "4px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "10px", fontWeight: 600 }}>合計（税込）</span>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#1D4ED8" }}>¥165,000</span>
                          </div>
                          <button style={{ width: "100%", padding: "7px", background: "#1A1A2E", color: "#fff", border: "none", borderRadius: "4px", fontSize: "10px", fontWeight: 600, cursor: "pointer" }}>
                            次へ（送信へ進む）
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-floating-card card-1">
                    <div className="floating-card-inner">
                      <div className="floating-card-icon slack">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="7" stroke="#4CAF50" strokeWidth="1.5" fill="none"/>
                          <path d="M6 9l2 2 4-4" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="floating-card-text">送信完了 — 30秒</div>
                        <div className="floating-card-sub">株式会社サンプルへ送付済み</div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-floating-card card-2">
                    <div className="floating-card-inner">
                      <div className="floating-card-icon check">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="7" stroke="#3B82F6" strokeWidth="1.5" />
                          <path d="M6 9l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="floating-card-text">インボイス対応済み</div>
                        <div className="floating-card-sub">登録番号・税率を自動記載</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF (STATS BAR) ──────────────── */}
        <section className="social-proof" ref={sectionRefs.socialProof}>
          <div className="container">
            <div className="social-proof-inner">
              <div className="social-proof-label">
                2,000社以上が使っています。請求書の手間がなくなる、かんたんサービス。
              </div>
              <div className="social-proof-highlights">
                <span className="social-proof-stat">
                  <strong>30秒で作成</strong>
                  <span>1通あたりの目安</span>
                </span>
                <span className="social-proof-stat">
                  <strong>3ステップだけ</strong>
                  <span>取引先選択→明細入力→送信</span>
                </span>
                <span className="social-proof-stat">
                  <strong>インボイス対応</strong>
                  <span>登録番号・税率を自動記載</span>
                </span>
                <span className="social-proof-stat">
                  <strong>月5通まで無料</strong>
                  <span>クレカ不要で今すぐ開始</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PAIN POINT ───────────────────────────── */}
        <section className="pain-section" ref={sectionRefs.pain}>
          <div className="container">
            <div className="pain-grid">
              <div className="pain-card animate-on-scroll">
                <span className="pain-emoji">&#x1F4C4;</span>
                <div className="pain-title">毎月Excelで同じ作業、繰り返していませんか?</div>
                <div className="pain-desc">
                  取引先の住所をコピペして、品目を入力して、消費税を計算して。
                  毎月同じことを繰り返すのに、1時間以上かかっている。
                </div>
                <span className="pain-stat">手作業: 1通あたり平均30分</span>
              </div>

              <div className="pain-card animate-on-scroll delay-1">
                <span className="pain-emoji">&#x1F9FE;</span>
                <div className="pain-title">インボイスのルール、ちゃんと書けていますか?</div>
                <div className="pain-desc">
                  登録番号・適格請求書の書き方・税率の分け方。
                  間違えると取引先に迷惑をかけてしまう。毎回調べるのが面倒。
                </div>
                <span className="pain-stat">記載ミスは取引先に迷惑をかける</span>
              </div>

              <div className="pain-card animate-on-scroll delay-2">
                <span className="pain-emoji">&#x1F4B5;</span>
                <div className="pain-title">入金されたかどうか、把握できていますか?</div>
                <div className="pain-desc">
                  「あの請求書、もう払ってもらったっけ?」と通帳を確認する手間。
                  未入金のまま気づかなかった、なんてこともありがちです。
                </div>
                <span className="pain-stat">入金管理のミスは見落としやすい</span>
              </div>
            </div>

            <div className="pain-bottom-cta animate-on-scroll delay-3">
              <p>こんなお悩み、ぜんぶ解決できます。</p>
              <div className="pain-bottom-sub">
                使い始めた方の89%が「請求書の作業がラクになった」と実感しています。
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ────────────────────────────── */}
        <section className="stats-bar" ref={sectionRefs.stats}>
          <div className="stats-bar-inner">
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">
                30<span className="stat-unit">秒</span>
              </div>
              <div className="stat-label">請求書1通の作成時間</div>
            </div>
            <div className="stat-item animate-on-scroll delay-1">
              <div className="stat-number">
                2,000<span className="stat-unit">社</span>
              </div>
              <div className="stat-label">使っている会社・個人の数</div>
            </div>
            <div className="stat-item animate-on-scroll delay-2">
              <div className="stat-number">
                99.9<span className="stat-unit">%</span>
              </div>
              <div className="stat-label">安定して動いている割合</div>
            </div>
            <div className="stat-item animate-on-scroll delay-3">
              <div className="stat-number">
                89<span className="stat-unit">%</span>
              </div>
              <div className="stat-label">作業がラクになった割合</div>
            </div>
          </div>
        </section>

        {/* ── 3 STEPS FLOW ─────────────────────────── */}
        <section className="qr-flow" ref={sectionRefs.flow}>
          <div className="container">
            <div className="qr-flow-header">
              <div className="animate-on-scroll">
                <span className="section-label">使い方はとってもかんたん</span>
                <h2 className="section-title">
                  たった3ステップで、請求書が完成
                </h2>
                <p className="section-desc">
                  取引先を選んで、金額を入れて、送るだけ。
                  AIが住所・品目・税率を自動補完するので、難しい入力は何もありません。
                </p>
              </div>
            </div>

            <div className="flow-timeline">
              <div className="flow-step animate-on-scroll">
                <div className="flow-step-number">
                  <span className="flow-step-icon">&#x1F4BC;</span>
                </div>
                <span className="flow-step-label">Step 01</span>
                <div className="flow-step-title">取引先を選ぶ</div>
                <div className="flow-step-desc">
                  名前の一部を入力するだけで取引先が出てきます。初回でも手入力できます。選ぶだけで住所・担当者が自動で入ります。
                </div>
                <span className="flow-step-time">5秒で選択完了</span>
              </div>

              <div className="flow-step animate-on-scroll delay-1">
                <div className="flow-step-number">
                  <span className="flow-step-icon">&#x1F916;</span>
                </div>
                <span className="flow-step-label">Step 02</span>
                <div className="flow-step-title">明細を入力（AI補完）</div>
                <div className="flow-step-desc">
                  品目名を入れると過去の履歴からAIが自動補完。金額を入力すると消費税・合計が自動計算。インボイス番号も自動で記載されます。
                </div>
                <span className="flow-step-time">20秒で明細完成</span>
              </div>

              <div className="flow-step animate-on-scroll delay-2">
                <div className="flow-step-number">
                  <span className="flow-step-icon">&#x1F4E8;</span>
                </div>
                <span className="flow-step-label">Step 03</span>
                <div className="flow-step-title">送信ボタンを押すだけ</div>
                <div className="flow-step-desc">
                  「送信」を押すと、取引先にPDF付きのメールが届きます。送付済み・未入金・入金済みのステータスも自動で管理されます。
                </div>
                <span className="flow-step-time">5秒で送付完了</span>
              </div>
            </div>

            {/* 操作画面モックアップ */}
            <div className="animate-on-scroll" style={{ marginTop: "48px", maxWidth: "600px", margin: "48px auto 0" }}>
              <div className="hero-browser-outer" style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
                <div className="hero-browser-bar">
                  <div className="browser-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <div className="browser-url">invoice.rakuda-ai.com/invoice/new</div>
                </div>
                <div style={{ padding: "24px", background: "#fff" }}>
                  {/* ステッパー */}
                  <div style={{ display: "flex", gap: "0", marginBottom: "24px" }}>
                    {["1. 取引先選択", "2. 明細入力", "3. 送信"].map((label, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <div style={{ flex: 1, textAlign: "center" as const }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: i === 1 ? "#1A1A2E" : i < 1 ? "#3B82F6" : "#E5E7EB", color: i <= 1 ? "#fff" : "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px", fontSize: "12px", fontWeight: 700 }}>
                            {i < 1 ? "✓" : i + 1}
                          </div>
                          <div style={{ fontSize: "10px", color: i <= 1 ? "#1A1A2E" : "#9CA3AF", fontWeight: i === 1 ? 700 : 400 }}>{label}</div>
                        </div>
                        {i < 2 && <div style={{ width: "24px", height: "1px", background: i < 1 ? "#3B82F6" : "#E5E7EB", marginBottom: "18px" }} />}
                      </div>
                    ))}
                  </div>

                  {/* フォーム */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>品目名</label>
                    <div style={{ padding: "10px 12px", border: "2px solid #3B82F6", borderRadius: "8px", fontSize: "14px", color: "#1A1A2E", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>Webデザイン制作費</span>
                      <span style={{ fontSize: "10px", color: "#3B82F6", background: "#EFF6FF", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>AI補完</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>単価</label>
                      <div style={{ padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px", color: "#1A1A2E" }}>¥150,000</div>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>数量</label>
                      <div style={{ padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px", color: "#1A1A2E" }}>1</div>
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", color: "#6B7280", display: "block", marginBottom: "4px" }}>税率</label>
                      <div style={{ padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px", color: "#1A1A2E" }}>10%</div>
                    </div>
                  </div>

                  <div style={{ padding: "12px", background: "#F0F9FF", borderRadius: "8px", display: "flex", justifyContent: "space-between", marginBottom: "16px", border: "1px solid #BAE6FD" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#6B7280" }}>小計 ¥150,000 ／ 消費税 ¥15,000</div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "#1D4ED8" }}>合計（税込） ¥165,000</div>
                    </div>
                    <div style={{ fontSize: "10px", color: "#059669", background: "#ECFDF5", padding: "4px 8px", borderRadius: "4px", alignSelf: "center", fontWeight: 600 }}>
                      インボイス対応済み
                    </div>
                  </div>

                  <button style={{ width: "100%", padding: "12px", background: "#1A1A2E", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em" }}>
                    送信する（Step 3へ）
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────── */}
        <section className="features" id="features" ref={sectionRefs.features}>
          <div className="container">
            <div className="features-header animate-on-scroll">
              <span className="section-label">できること</span>
              <h2 className="section-title">
                請求書まわりの「めんどう」を、まるごと解決。
              </h2>
              <p className="section-desc">
                作成・送付・入金管理・インボイス対応。
                ぜんぶこれひとつでできます。
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card featured animate-on-scroll">
                <div className="feature-icon">&#x1F916;</div>
                <h3 className="feature-title">AIが自動で入力してくれる</h3>
                <p className="feature-desc">
                  取引先名を選ぶと住所・担当者が自動入力。品目を入力すると過去の履歴からAIが補完。消費税・合計も自動計算されます。難しい操作は何もありません。
                </p>
                <span className="feature-tag">いちばんの特長</span>
              </div>

              <div className="feature-card animate-on-scroll delay-1">
                <div className="feature-icon">&#x1F9FE;</div>
                <h3 className="feature-title">インボイスのルールは自動対応</h3>
                <p className="feature-desc">
                  登録番号・税率区分・適格請求書の記載要件を全部自動で満たします。法改正があっても自動でアップデートされるので、あなたがルールを覚える必要はありません。
                </p>
                <span className="feature-tag">ルールを覚えなくてOK</span>
              </div>

              <div className="feature-card animate-on-scroll delay-2">
                <div className="feature-icon">&#x1F504;</div>
                <h3 className="feature-title">毎月の請求書は自動で送れる</h3>
                <p className="feature-desc">
                  毎月同じ内容の請求書は、一度設定するだけで自動作成・自動送付。送り忘れがゼロになります。定期契約のお客様がいる方に特におすすめです。
                </p>
                <span className="feature-tag">送り忘れゼロ</span>
              </div>

              <div className="feature-card animate-on-scroll delay-3">
                <div className="feature-icon">&#x1F4B5;</div>
                <h3 className="feature-title">入金されたか、一目でわかる</h3>
                <p className="feature-desc">
                  「未入金」「入金済み」「遅延」がダッシュボードで一覧で見られます。入金期日が近づいたら自動でリマインドメールを送ることもできます。
                </p>
                <span className="feature-tag">入金管理もかんたん</span>
              </div>

              <div className="feature-card animate-on-scroll delay-4">
                <div className="feature-icon">&#x1F4F1;</div>
                <h3 className="feature-title">スマホからでも使える</h3>
                <p className="feature-desc">
                  専用アプリのインストールは不要。スマホのブラウザから取引先の選択・金額の入力・送付まで全部できます。外出先からでも請求書が送れます。
                </p>
                <span className="feature-tag">アプリ不要</span>
              </div>

              <div className="feature-card animate-on-scroll delay-5">
                <div className="feature-icon">&#x1F4BC;</div>
                <h3 className="feature-title">取引先は一度登録するだけ</h3>
                <p className="feature-desc">
                  会社名・住所・担当者・支払条件を一度登録すれば、次回からは選ぶだけ。CSVで一括取り込みもできるので、既存の名簿からすぐ始められます。
                </p>
                <span className="feature-tag">二度手間なし</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── VOICES ───────────────────────────────── */}
        <section className="company-size" id="voices" ref={sectionRefs.voices}>
          <div className="container">
            <div className="company-size-header animate-on-scroll">
              <span className="section-label">使っている方の声</span>
              <h2 className="section-title">「こんなにラクになるとは思わなかった」</h2>
              <p className="section-desc">
                フリーランスから中小企業まで、さまざまな方にお使いいただいています。
              </p>
            </div>

            <div className="company-size-grid">
              {voiceData.map((voice, i) => (
                <div key={i} className={`size-card animate-on-scroll${i > 0 ? ` delay-${i}` : ""}`}>
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="#FCD34D">
                          <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.3L6 8.8l-3 1.3.6-3.3L1.2 4.5 4.5 4z"/>
                        </svg>
                      ))}
                    </div>
                    <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.7, marginBottom: "12px" }}>
                      &ldquo;{voice.text}&rdquo;
                    </p>
                  </div>
                  <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "12px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A2E" }}>{voice.name}</div>
                    <div style={{ fontSize: "11px", color: "#6B7280" }}>{voice.role}</div>
                    <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "2px" }}>{voice.years}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────── */}
        <section
          className="how-it-works"
          id="how-it-works"
          ref={sectionRefs.howItWorks}
        >
          <div className="container">
            <div className="how-it-works-header animate-on-scroll">
              <span className="section-label">始め方</span>
              <h2 className="section-title">パソコンが苦手でも大丈夫。3つのステップで始められます。</h2>
              <p className="section-desc">
                難しい設定はありません。画面の案内どおりに進めるだけで、すぐに使い始められます。特別なアプリを入れる必要もありません。
              </p>
            </div>

            <div className="steps-grid">
              <div className="step-card animate-on-scroll">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">01</span>
                  </div>
                  <span className="step-icon-overlay">&#x1F4DD;</span>
                </div>
                <h3 className="step-title">アカウントをつくる</h3>
                <p className="step-desc">
                  メールアドレスで無料のアカウントをつくります。会社名とインボイス登録番号を入力するだけ。30秒で完了します。
                </p>
                <div className="step-detail">
                  約30秒 ・ クレカ不要 ・ 費用ゼロ
                </div>
              </div>

              <div className="step-card animate-on-scroll delay-2">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">02</span>
                  </div>
                  <span className="step-icon-overlay">&#x1F4BC;</span>
                </div>
                <h3 className="step-title">取引先を登録する</h3>
                <p className="step-desc">
                  取引先の会社名と住所を入れるだけ。CSVファイルがあれば一括で取り込めます。登録後は次回からワンクリックで選べます。
                </p>
                <div className="step-detail">
                  約2分 ・ CSV一括取り込みOK
                </div>
              </div>

              <div className="step-card animate-on-scroll delay-4">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">03</span>
                  </div>
                  <span className="step-icon-overlay">&#x26A1;</span>
                </div>
                <h3 className="step-title">最初の請求書を送る</h3>
                <p className="step-desc">
                  取引先を選んで金額を入力して送信ボタンを押すだけ。AIが自動補完するので、難しい入力は何もありません。
                </p>
                <div className="step-detail">
                  約1分 ・ AIが自動補完 ・ 即時送付
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────── */}
        <section className="pricing" id="pricing" ref={sectionRefs.pricing}>
          <div className="container">
            <div className="pricing-header animate-on-scroll">
              <span className="section-label">料金プラン</span>
              <h2 className="section-title">
                わかりやすい料金。追加料金なし。
              </h2>
              <p className="section-desc">
                同じような請求書サービスは月3,000円以上するものが多いですが、RAKUDAインボイスはProプランが月々¥980から。隠れた費用はありません。
              </p>
            </div>

            <div className="pricing-grid pricing-grid--2col">
              {/* Pro */}
              <div className="pricing-card popular animate-on-scroll">
                <div className="pricing-popular-badge">いちばん人気</div>
                <div className="pricing-plan-name">Proプラン</div>
                <div className="pricing-price">
                  <span className="pricing-currency">&yen;</span>
                  <span className="pricing-amount">980</span>
                </div>
                <div className="pricing-period">/月（税抜き）</div>
                <div className="pricing-desc">
                  ほかのサービスの4分の1以下の料金。請求書を何通でも作れます。毎月の定期請求も自動化できます。
                </div>
                <ul className="pricing-features">
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    請求書の作成・送付 回数制限なし
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    AIが自動で入力してくれる
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    毎月の請求書を自動で送れる
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    入金されたか一目でわかる
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    取引先の登録 制限なし
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    一覧表・PDFの書き出し
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    自社のロゴ・色に変更できる
                  </li>
                </ul>
                <a href="/signup?plan=pro" className="btn btn-primary pricing-cta">
                  30秒で無料アカウント作成
                </a>
              </div>

              {/* Enterprise */}
              <div className="pricing-card animate-on-scroll delay-1">
                <div className="pricing-plan-name">エンタープライズ</div>
                <div className="pricing-price" style={{ fontSize: "14px", lineHeight: 1.4, paddingTop: "8px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 700 }}>カスタム</span>
                </div>
                <div className="pricing-period">要お問合せ</div>
                <div className="pricing-desc">
                  100通以上の大量送付、他の会計システムとの連携、まとめてログインが必要な場合。
                </div>
                <ul className="pricing-features">
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    Proプランの全機能
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    会計ソフトとの連携（freee / MF）
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    まとめてログインに対応
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    他のシステムとの連携もできる
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    専任のサポート担当者
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    安定稼働99.9%の約束
                  </li>
                </ul>
                <a href="mailto:info@rakuda-ai.com" className="btn btn-secondary pricing-cta">
                  お問い合わせ
                </a>
              </div>
            </div>

            <p className="pricing-note">
              年間プランなら2か月分おトク（¥9,800/年）。すべてのプランに解約金なし。
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────── */}
        <section className="faq" id="faq" ref={sectionRefs.faq}>
          <div className="container">
            <div className="faq-header animate-on-scroll">
              <span className="section-label">よくある質問</span>
              <h2 className="section-title">みなさんからよくいただくご質問</h2>
            </div>

            <div className="faq-list">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className={`faq-item${openFaq === index ? " open" : ""}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    {item.q}
                    <span className="faq-chevron">
                      <ChevronDown />
                    </span>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────── */}
        <section className="cta-banner" id="book-call" ref={sectionRefs.cta}>
          <div className="cta-banner-inner">
            <div className="cta-banner-content animate-on-scroll">
              <div className="cta-call-badge">30秒で無料アカウント作成</div>
              <h2>
                まずは無料で試してみませんか?
              </h2>
              <p>
                2,000社以上が使っている請求書サービス。
                月5通まで無料。難しい設定は何もありません。
              </p>
              <div className="cta-banner-actions">
                <a href="/signup" className="btn btn-xl btn-cta-call">
                  30秒で無料アカウント作成
                  <ArrowRight />
                </a>
                <a href="mailto:info@rakuda-ai.com" className="btn btn-xl btn-cta-call-secondary">
                  お問い合わせ
                </a>
              </div>
              <div className="cta-call-benefits">
                <span>&#x2714; 月5通まで永年無料</span>
                <span>&#x2714; クレカ不要</span>
                <span>&#x2714; いつでもやめられます</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────── */}
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
                <li><a href="/terms" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>利用規約</a></li>
                <li><a href="/privacy" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>プライバシーポリシー</a></li>
                <li><a href="/tokushoho" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>特定商取引法</a></li>
                <li><a href="/security" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>セキュリティ</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "24px", textAlign: "center" as const, fontSize: "12px", color: "#9CA3AF" }}>
            &copy; 2026 T Advisory Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
