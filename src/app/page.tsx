"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   RAKUDAインボイス — AI請求書自動化 LP
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
    q: "無料プランと有料プランで、請求書の見た目は変わりますか?",
    a: "いいえ、同じAIエンジンを使っているので品質は同一です。無料プランは月5通の発行枠があるだけで、機能制限はありません。",
  },
  {
    q: "インボイス制度の登録番号はどうやって設定しますか?",
    a: "初回の事業者情報設定で「T+13桁」の登録番号を入力するだけです。以降、すべての請求書に自動記載されます。税率ごとの消費税額や端数処理もインボイス制度のルールに沿って自動計算します。",
  },
  {
    q: "freeeやマネーフォワードと連携できますか?",
    a: "はい。freee・マネーフォワードクラウド・弥生会計にワンクリックで連携可能です。CSV一括エクスポートにも対応しているので、お使いの会計ソフトに合わせた運用ができます。",
  },
  {
    q: "途中でプランを変更できますか?",
    a: "いつでも変更できます。アップグレードは即時反映（日割り計算）、ダウングレードは次回請求サイクルから適用されます。",
  },
  {
    q: "データのセキュリティは大丈夫ですか?",
    a: "AES-256暗号化、AWS東京リージョン保管、TLS 1.3通信保護に加え、SOC 2 Type II認証を取得しています。電子帳簿保存法の保存要件にも対応済みです。",
  },
  {
    q: "解約はいつでもできますか?",
    a: "はい、いつでも管理画面から解約できます。契約期間終了日までサービスをご利用いただけます。年額プランの途中解約による返金にも対応しています。",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sectionRefs = {
    hero: useScrollReveal(),
    pain: useScrollReveal(),
    stats: useScrollReveal(),
    flow: useScrollReveal(),
    features: useScrollReveal(),
    integrations: useScrollReveal(),
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
            <svg viewBox="0 0 380 40" style={{ height: "20px", width: "auto" }} className="header-logo-svg">
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32"
                    stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif"
                    fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>

          <nav className="header-nav">
            <a href="#features">機能</a>
            <a href="#integrations">連携</a>
            <a href="#pricing">料金</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-cta-group">
            <a href="./book-call" className="btn btn-sm btn-dark">
              無料相談
            </a>
            <a href="./signup" className="btn btn-sm btn-cta-call">
              無料で始める
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
                  インボイス制度完全対応
                </div>
                <h1>
                  AIが請求書を、
                  <br />
                  <span className="accent-text">30秒で。</span>
                </h1>
                <p className="hero-pain">
                  手作業で<em>時間がかかる</em>。インボイス制度の対応が<em>不安</em>。
                  <br />
                  回収管理が煩雑で、未払いを見落としていませんか?
                </p>
                <p className="hero-subtitle">
                  取引先を選んで明細を入力するだけ。AIが自動で請求書を作成し、
                  ワンクリックで送付。入金管理まで自動化します。
                </p>
                <div className="hero-actions">
                  <a href="./signup" className="btn btn-lg btn-cta-call">
                    無料で始める
                    <ArrowRight />
                  </a>
                  <a href="./book-call" className="btn btn-lg btn-dark">
                    無料相談を予約する
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
                  月5通まで無料 ・ クレジットカード不要
                </div>
              </div>

              {/* Browser Mockup — 請求書作成画面風 */}
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
                    <div className="hero-browser-screen" style={{ background: "#0F172A" }}>
                      <div className="hero-browser-ui" style={{ padding: "16px", color: "#E2E8F0" }}>
                        {/* Header bar */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "#94A3B8" }}>請求書を作成</span>
                          <span style={{ fontSize: "10px", background: "#10B981", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontWeight: 600 }}>AI補完 ON</span>
                        </div>
                        {/* Client field */}
                        <div style={{ marginBottom: "10px" }}>
                          <div style={{ fontSize: "9px", color: "#64748B", marginBottom: "4px", letterSpacing: "0.05em" }}>取引先</div>
                          <div style={{ background: "#1E293B", borderRadius: "6px", padding: "7px 10px", fontSize: "11px", color: "#E2E8F0", border: "1px solid #334155" }}>
                            株式会社サンプル
                          </div>
                        </div>
                        {/* Invoice table */}
                        <div style={{ background: "#1E293B", borderRadius: "6px", overflow: "hidden", marginBottom: "10px", border: "1px solid #334155" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 64px", gap: "0", borderBottom: "1px solid #334155", padding: "5px 8px" }}>
                            <span style={{ fontSize: "9px", color: "#64748B" }}>品目</span>
                            <span style={{ fontSize: "9px", color: "#64748B", textAlign: "right" as const }}>数量</span>
                            <span style={{ fontSize: "9px", color: "#64748B", textAlign: "right" as const }}>金額</span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 64px", padding: "6px 8px", borderBottom: "1px solid #1E293B" }}>
                            <span style={{ fontSize: "10px", color: "#E2E8F0" }}>Webデザイン制作</span>
                            <span style={{ fontSize: "10px", color: "#E2E8F0", textAlign: "right" as const }}>1</span>
                            <span style={{ fontSize: "10px", color: "#E2E8F0", textAlign: "right" as const }}>¥150,000</span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 52px 64px", padding: "6px 8px" }}>
                            <span style={{ fontSize: "10px", color: "#94A3B8", fontStyle: "italic" }}>AIが次の品目を提案中...</span>
                            <span style={{ fontSize: "10px", color: "#94A3B8", textAlign: "right" as const }}>—</span>
                            <span style={{ fontSize: "10px", color: "#94A3B8", textAlign: "right" as const }}>—</span>
                          </div>
                        </div>
                        {/* Total */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 8px", background: "#1E293B", borderRadius: "6px", border: "1px solid #334155" }}>
                          <span style={{ fontSize: "10px", color: "#94A3B8" }}>合計（税込）</span>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#38BDF8" }}>¥165,000</span>
                        </div>
                        {/* Send button */}
                        <button style={{ marginTop: "10px", width: "100%", padding: "8px", background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "#fff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.05em" }}>
                          ワンクリックで送付
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="hero-floating-card card-1">
                    <div className="floating-card-inner">
                      <div className="floating-card-icon check">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="7" stroke="#10B981" strokeWidth="1.5" />
                          <path d="M6 9l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="floating-card-text">請求書を送付しました</div>
                        <div className="floating-card-sub">株式会社サンプル ・ 30秒</div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-floating-card card-2">
                    <div className="floating-card-inner">
                      <div className="floating-card-icon slack">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="7" stroke="#3B82F6" strokeWidth="1.5" />
                          <path d="M9 6v3l2 2" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="floating-card-text">入金確認</div>
                        <div className="floating-card-sub">¥165,000 ・ 自動消込済み</div>
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
                導入企業300社以上。作成時間90%削減、回収率99.2%。
              </div>
              <div className="social-proof-highlights">
                <span className="social-proof-stat">
                  <strong>300社以上</strong>
                  <span>導入企業数</span>
                </span>
                <span className="social-proof-stat">
                  <strong>月間10,000通</strong>
                  <span>処理請求書数</span>
                </span>
                <span className="social-proof-stat">
                  <strong>作成時間90%削減</strong>
                  <span>導入企業平均</span>
                </span>
                <span className="social-proof-stat">
                  <strong>回収率99.2%</strong>
                  <span>自動リマインド効果</span>
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
                <span className="pain-emoji">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="6" width="20" height="16" rx="2" stroke="#6B7280" strokeWidth="1.5"/>
                    <path d="M9 11h10M9 15h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M4 10h20" stroke="#6B7280" strokeWidth="1.5"/>
                  </svg>
                </span>
                <div className="pain-title">手作業で時間がかかる</div>
                <div className="pain-desc">
                  毎月同じ取引先に同じ内容を手入力。Excel管理でヒューマンエラーが発生。
                  請求書1通作るのに30分かかっていませんか?
                </div>
                <span className="pain-stat">平均作成時間 28分/通</span>
              </div>

              <div className="pain-card animate-on-scroll delay-1">
                <span className="pain-emoji">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4L4 10v8l10 6 10-6v-8L14 4z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M14 14v6M14 14l-6-3.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <div className="pain-title">インボイス制度の対応が不安</div>
                <div className="pain-desc">
                  適格請求書の要件、税率ごとの消費税額の記載、端数処理のルール。
                  制度対応を誤ると取引先に迷惑がかかります。
                </div>
                <span className="pain-stat">制度違反リスクをゼロに</span>
              </div>

              <div className="pain-card animate-on-scroll delay-2">
                <span className="pain-emoji">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="9" stroke="#6B7280" strokeWidth="1.5"/>
                    <path d="M14 9v5l3 3" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <div className="pain-title">回収管理が煩雑</div>
                <div className="pain-desc">
                  入金確認をExcelで手動管理。未払いを見落として督促が遅れる。
                  複数取引先の入金状況を把握できていますか?
                </div>
                <span className="pain-stat">未払い見落としをゼロに</span>
              </div>
            </div>

            <div className="pain-bottom-cta animate-on-scroll delay-3">
              <p>これらすべてを、AIが自動で解決します。</p>
              <div className="pain-bottom-sub">
                導入企業の90%が、請求書作成にかかる時間を9割以上削減しています。
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
              <div className="stat-label">請求書作成時間</div>
            </div>
            <div className="stat-item animate-on-scroll delay-1">
              <div className="stat-number">
                月5<span className="stat-unit">通</span>
              </div>
              <div className="stat-label">無料で利用可能</div>
            </div>
            <div className="stat-item animate-on-scroll delay-2">
              <div className="stat-number">
                99.9<span className="stat-unit">%</span>
              </div>
              <div className="stat-label">稼働率（直近12ヶ月）</div>
            </div>
            <div className="stat-item animate-on-scroll delay-3">
              <div className="stat-number">
                SOC<span className="stat-unit">2</span>
              </div>
              <div className="stat-label">セキュリティ認証取得</div>
            </div>
          </div>
        </section>

        {/* ── FLOW（4ステップ）────────────────────── */}
        <section className="qr-flow" ref={sectionRefs.flow}>
          <div className="container">
            <div className="qr-flow-header">
              <div className="animate-on-scroll">
                <span className="section-label">請求書作成の流れ</span>
                <h2 className="section-title">
                  4ステップで請求から回収まで完結
                </h2>
                <p className="section-desc">
                  取引先を選んで明細を入力。あとはAIがすべてやってくれます。
                </p>
              </div>
            </div>

            <div className="flow-timeline">
              <div className="flow-step animate-on-scroll">
                <div className="flow-step-number">
                  <span className="flow-step-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 11a3 3 0 106 0 3 3 0 00-6 0z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </span>
                </div>
                <span className="flow-step-label">Step 01</span>
                <div className="flow-step-title">取引先を選択</div>
                <div className="flow-step-desc">
                  登録済みの取引先から選ぶだけ。インボイス番号・振込先は自動セット。
                </div>
                <span className="flow-step-time">10秒で完了</span>
              </div>

              <div className="flow-step animate-on-scroll delay-1">
                <div className="flow-step-number">
                  <span className="flow-step-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="4" y="5" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 9h8M7 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
                <span className="flow-step-label">Step 02</span>
                <div className="flow-step-title">明細入力（AI補完）</div>
                <div className="flow-step-desc">
                  品目名を入力するとAIが単価・数量を補完提案。前回との差分も自動反映。
                </div>
                <span className="flow-step-time">AI補完で最速</span>
              </div>

              <div className="flow-step animate-on-scroll delay-2">
                <div className="flow-step-number">
                  <span className="flow-step-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M4 11h14M14 7l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <span className="flow-step-label">Step 03</span>
                <div className="flow-step-title">ワンクリック送付</div>
                <div className="flow-step-desc">
                  PDF生成・メール送付・Slack通知をワンクリックで実行。送付記録も自動保存。
                </div>
                <span className="flow-step-time">リアルタイム送付</span>
              </div>

              <div className="flow-step animate-on-scroll delay-3">
                <div className="flow-step-number">
                  <span className="flow-step-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M11 8v3l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <span className="flow-step-label">Step 04</span>
                <div className="flow-step-title">自動入金管理</div>
                <div className="flow-step-desc">
                  入金を自動検知・消込。期限超過で自動リマインド送信。未回収を見逃しません。
                </div>
                <span className="flow-step-time">回収率99.2%</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────── */}
        <section className="features" id="features" ref={sectionRefs.features}>
          <div className="container">
            <div className="features-header animate-on-scroll">
              <span className="section-label">主な機能</span>
              <h2 className="section-title">
                請求業務に必要な機能を、ひとつに。
              </h2>
              <p className="section-desc">
                AI自動作成からインボイス制度対応、入金管理まで。
                請求周りの手間をまとめて解消します。
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card featured animate-on-scroll">
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 10h12M8 14h8M8 18h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="21" cy="21" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M19.5 21l1 1 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="feature-title">AI自動作成</h3>
                <p className="feature-desc">
                  取引先・品目名を選ぶとAIが過去の取引データを学習し、金額・数量・支払条件を自動補完。請求書を30秒で作成できます。定期請求は完全自動化も可能。
                </p>
                <span className="feature-tag">コア機能</span>
              </div>

              <div className="feature-card animate-on-scroll delay-1">
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4L4 10v8l10 6 10-6v-8L14 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M14 16v-6M11 13.5l3-3.5 3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="feature-title">インボイス制度対応</h3>
                <p className="feature-desc">
                  適格請求書の必須記載事項を自動チェック。登録番号・税率別消費税額・端数処理をすべて自動計算。制度違反のリスクをゼロにします。
                </p>
                <span className="feature-tag">法令対応</span>
              </div>

              <div className="feature-card animate-on-scroll delay-2">
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="5" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 11h18" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="8" y="14" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                </div>
                <h3 className="feature-title">テンプレート管理</h3>
                <p className="feature-desc">
                  自社ロゴ・カラー・フォントを設定したオリジナルテンプレートを作成。取引先別・プロジェクト別に複数テンプレートを使い分けられます。
                </p>
                <span className="feature-tag">ブランド対応</span>
              </div>

              <div className="feature-card animate-on-scroll delay-3">
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M14 10v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="14" cy="10" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="feature-title">ステータス追跡</h3>
                <p className="feature-desc">
                  送付済み・開封済み・入金待ち・入金済みの4ステータスをリアルタイム追跡。期日超過で自動リマインドメールを送信。未回収を見逃しません。
                </p>
                <span className="feature-tag">回収管理</span>
              </div>

              <div className="feature-card animate-on-scroll delay-4">
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 20l5-7 4 4 4-6 5 9H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M5 8h18" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
                  </svg>
                </div>
                <h3 className="feature-title">レポート分析</h3>
                <p className="feature-desc">
                  売上推移・取引先別請求額・入金サイクルを自動集計。月次・年次レポートをPDF/CSVで出力。経理・税理士との情報共有もスムーズ。
                </p>
                <span className="feature-tag">分析</span>
              </div>

              <div className="feature-card animate-on-scroll delay-5">
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="20" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M14 10h2a4 4 0 014 4v0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="feature-title">取引先管理</h3>
                <p className="feature-desc">
                  取引先の会社情報・振込先・インボイス登録番号を一元管理。法人番号との突合チェックも自動化。新規取引先登録も数クリックで完了。
                </p>
                <span className="feature-tag">マスタ管理</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── INTEGRATIONS ─────────────────────────── */}
        <section
          className="integrations"
          id="integrations"
          ref={sectionRefs.integrations}
        >
          <div className="container">
            <div className="integrations-content">
              <div className="integrations-text animate-on-scroll slide-left">
                <span className="section-label">連携サービス</span>
                <h2 className="section-title">
                  会計ソフトと、
                  <br />
                  そのまま繋がる。
                </h2>
                <p className="section-desc">
                  freee、マネーフォワード、弥生会計、Slack、Gmail、kintone。
                  普段使っているツールをそのまま使えます。
                  ワークフローを変えずに、請求だけ自動化。
                </p>
                <ul className="integration-list">
                  <li>
                    <span className="integration-list-icon">
                      <CheckIcon />
                    </span>
                    freee / マネーフォワードクラウドへの自動仕訳連携
                  </li>
                  <li>
                    <span className="integration-list-icon">
                      <CheckIcon />
                    </span>
                    弥生会計・弥生販売へのCSV連携
                  </li>
                  <li>
                    <span className="integration-list-icon">
                      <CheckIcon />
                    </span>
                    Slack / Gmailへの送付通知・入金アラート
                  </li>
                  <li>
                    <span className="integration-list-icon">
                      <CheckIcon />
                    </span>
                    kintoneとの顧客・案件データ同期
                  </li>
                  <li>
                    <span className="integration-list-icon">
                      <CheckIcon />
                    </span>
                    Webhook / REST APIで既存システムと接続
                  </li>
                </ul>
              </div>

              <div className="integrations-visual animate-on-scroll slide-right delay-1">
                <div className="integration-hub">
                  {/* freee */}
                  <div className="integration-card">
                    <div className="integration-card-icon" style={{ background: "#EBF5FB" }}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <circle cx="13" cy="13" r="10" fill="#0066FF" fillOpacity="0.12"/>
                        <text x="5" y="18" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#0066FF">freee</text>
                      </svg>
                    </div>
                    <span className="integration-card-name">freee</span>
                    <span className="integration-card-status">対応済み</span>
                  </div>

                  {/* マネーフォワード */}
                  <div className="integration-card">
                    <div className="integration-card-icon" style={{ background: "#E8F5E9" }}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <circle cx="13" cy="13" r="10" fill="#00A251" fillOpacity="0.12"/>
                        <path d="M7 17L11 9l3 6 3-4 2 6" stroke="#00A251" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="integration-card-name">マネーフォワード</span>
                    <span className="integration-card-status">対応済み</span>
                  </div>

                  {/* 弥生会計 */}
                  <div className="integration-card">
                    <div className="integration-card-icon" style={{ background: "#FFF3E0" }}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <circle cx="13" cy="13" r="10" fill="#FF6B00" fillOpacity="0.12"/>
                        <text x="7" y="18" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="700" fill="#FF6B00">弥生</text>
                      </svg>
                    </div>
                    <span className="integration-card-name">弥生会計</span>
                    <span className="integration-card-status">対応済み</span>
                  </div>

                  {/* Slack */}
                  <div className="integration-card">
                    <div className="integration-card-icon slack-icon">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path d="M6 15a2 2 0 01-2-2 2 2 0 012-2h2v2a2 2 0 01-2 2zm5-5V6a2 2 0 114 0v4h-4z" fill="#E01E5A"/>
                        <path d="M11 6a2 2 0 012-2 2 2 0 012 2v2h-2a2 2 0 01-2-2zm5 5h4a2 2 0 110 4h-4v-4z" fill="#36C5F0"/>
                        <path d="M20 11a2 2 0 01-2 2 2 2 0 01-2-2V9h2a2 2 0 012 2zm-5 5v4a2 2 0 11-4 0v-4h4z" fill="#2EB67D"/>
                        <path d="M15 20a2 2 0 01-2-2 2 2 0 01-2 2H9v-2a2 2 0 012-2h4z" fill="#ECB22E"/>
                      </svg>
                    </div>
                    <span className="integration-card-name">Slack</span>
                    <span className="integration-card-status">対応済み</span>
                  </div>

                  {/* Gmail */}
                  <div className="integration-card">
                    <div className="integration-card-icon" style={{ background: "#FCE8E6" }}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <rect x="4" y="7" width="18" height="13" rx="1.5" stroke="#EA4335" strokeWidth="1.5"/>
                        <path d="M4 9l9 7 9-7" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="integration-card-name">Gmail</span>
                    <span className="integration-card-status">対応済み</span>
                  </div>

                  {/* kintone */}
                  <div className="integration-card">
                    <div className="integration-card-icon" style={{ background: "#EDE7F6" }}>
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <circle cx="13" cy="13" r="10" fill="#6C2BD9" fillOpacity="0.12"/>
                        <text x="3" y="18" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#6C2BD9">kintone</text>
                      </svg>
                    </div>
                    <span className="integration-card-name">kintone</span>
                    <span className="integration-card-status">対応済み</span>
                  </div>
                </div>
              </div>
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
              <span className="section-label">導入の流れ</span>
              <h2 className="section-title">3ステップ、すぐに使い始められる</h2>
              <p className="section-desc">
                難しい設定は一切なし。アカウント作成から最初の請求書送付まで、最短30分で完了。
              </p>
            </div>

            <div className="steps-grid">
              <div className="step-card animate-on-scroll">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">01</span>
                  </div>
                  <span className="step-icon-overlay">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2C6.686 2 4 4.686 4 8c0 4 6 10 6 10s6-6 6-10c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </span>
                </div>
                <h3 className="step-title">アカウント作成（30秒）</h3>
                <p className="step-desc">
                  メールアドレスで無料登録。会社名・インボイス登録番号・銀行口座を設定します。
                </p>
                <div className="step-detail">
                  約30秒 ・ クレカ不要
                </div>
              </div>

              <div className="step-card animate-on-scroll delay-2">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">02</span>
                  </div>
                  <span className="step-icon-overlay">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="4" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
                <h3 className="step-title">取引先・テンプレート設定</h3>
                <p className="step-desc">
                  取引先をインポートまたは手動追加。請求書テンプレートにロゴ・カラーを設定します。
                </p>
                <div className="step-detail">
                  約5分 ・ CSVインポート対応
                </div>
              </div>

              <div className="step-card animate-on-scroll delay-4">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">03</span>
                  </div>
                  <span className="step-icon-overlay">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <h3 className="step-title">請求書を作成・送付</h3>
                <p className="step-desc">
                  取引先を選び明細を入力。AIが補完し、ワンクリックで送付完了。入金は自動管理。
                </p>
                <div className="step-detail">
                  最短30秒 ・ AI補完付き
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPANY SIZE ─────────────────────────── */}
        <section
          className="company-size"
          id="company-size"
          ref={sectionRefs.companySize}
        >
          <div className="container">
            <div className="company-size-header animate-on-scroll">
              <span className="section-label">利用規模別の導入メリット</span>
              <h2 className="section-title">フリーランスから成長企業まで</h2>
              <p className="section-desc">
                月1通のフリーランスから月1,000通の成長企業まで。
                規模に応じたプランで最適化できます。
              </p>
            </div>

            <div className="company-size-grid">
              <div className="size-card animate-on-scroll">
                <span className="size-card-badge startup">フリーランス向け</span>
                <div className="size-card-title">個人・副業</div>
                <div className="size-card-range">月1〜5通</div>
                <ul className="size-card-points">
                  <li>
                    <span className="check-icon blue"><CheckIcon /></span>
                    無料プランで十分な発行枚数
                  </li>
                  <li>
                    <span className="check-icon blue"><CheckIcon /></span>
                    インボイス制度を自動対応
                  </li>
                  <li>
                    <span className="check-icon blue"><CheckIcon /></span>
                    プロ品質の請求書でブランド向上
                  </li>
                </ul>
                <div className="size-card-rec">
                  <strong>おすすめ:</strong> Freeプラン
                </div>
              </div>

              <div className="size-card animate-on-scroll delay-1">
                <span className="size-card-badge growth">中小企業向け</span>
                <div className="size-card-title">法人・スタートアップ</div>
                <div className="size-card-range">月6〜100通</div>
                <ul className="size-card-points">
                  <li>
                    <span className="check-icon amber"><CheckIcon /></span>
                    freee / マネーフォワード自動連携
                  </li>
                  <li>
                    <span className="check-icon amber"><CheckIcon /></span>
                    入金自動管理・リマインド送信
                  </li>
                  <li>
                    <span className="check-icon amber"><CheckIcon /></span>
                    請求書作成工数を90%削減
                  </li>
                </ul>
                <div className="size-card-rec">
                  <strong>おすすめ:</strong> Proプラン
                </div>
              </div>

              <div className="size-card animate-on-scroll delay-2">
                <span className="size-card-badge enterprise">成長企業向け</span>
                <div className="size-card-title">急成長中の企業</div>
                <div className="size-card-range">月100通以上</div>
                <ul className="size-card-points">
                  <li>
                    <span className="check-icon purple"><CheckIcon /></span>
                    API連携で基幹システムと接続
                  </li>
                  <li>
                    <span className="check-icon purple"><CheckIcon /></span>
                    複数ユーザー・権限管理
                  </li>
                  <li>
                    <span className="check-icon purple"><CheckIcon /></span>
                    SLA 99.9%保証 + 専任サポート
                  </li>
                </ul>
                <div className="size-card-rec">
                  <strong>おすすめ:</strong> Enterpriseプラン
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
                月5通まで無料。シンプルな料金体系。
              </h2>
              <p className="section-desc">
                まずは無料で試してください。本格導入はPro ¥980/月から。
              </p>
            </div>

            <div className="pricing-grid">
              {/* Free */}
              <div className="pricing-card animate-on-scroll">
                <div className="pricing-plan-name">Free</div>
                <div className="pricing-price">
                  <span className="pricing-currency">&yen;</span>
                  <span className="pricing-amount">0</span>
                </div>
                <div className="pricing-period">永年無料</div>
                <div className="pricing-desc">
                  まずは試したい方に。月5通まで全機能が無料。
                </div>
                <ul className="pricing-features">
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    月5通まで発行
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    インボイス制度対応
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    AI自動補完
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    PDF生成・メール送付
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    取引先10社まで
                  </li>
                </ul>
                <a href="./signup?plan=free" className="btn btn-primary pricing-cta">
                  無料で始める
                </a>
              </div>

              {/* Pro */}
              <div className="pricing-card popular animate-on-scroll delay-1">
                <div className="pricing-popular-badge">一番人気</div>
                <div className="pricing-plan-name">Pro</div>
                <div className="pricing-price">
                  <span className="pricing-currency">&yen;</span>
                  <span className="pricing-amount">980</span>
                </div>
                <div className="pricing-period">/月（税抜）</div>
                <div className="pricing-desc">
                  月100通まで。会計ソフト連携・自動入金管理で業務を完全自動化。
                </div>
                <ul className="pricing-features">
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    月100通まで発行
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    取引先 無制限
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    freee / マネーフォワード連携
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    自動入金管理・リマインド
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    Slack / Gmail通知
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    レポート分析（月次・年次）
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    CSV / PDFエクスポート
                  </li>
                </ul>
                <a href="./signup?plan=pro" className="btn btn-primary pricing-cta">
                  無料で試してみる
                </a>
              </div>

              {/* Enterprise */}
              <div className="pricing-card animate-on-scroll delay-2">
                <div className="pricing-plan-name">Enterprise</div>
                <div className="pricing-price-custom">
                  カスタム
                </div>
                <div className="pricing-period">月額・年額 相談</div>
                <div className="pricing-desc">
                  大量発行・API連携・専任サポートが必要な成長企業向け。
                </div>
                <ul className="pricing-features">
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    発行通数 無制限
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    Proの全機能
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    REST API / Webhook
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    複数ユーザー・権限管理
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    専任カスタマーサクセス
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    SLA 99.9%保証
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    電子帳簿保存法対応
                  </li>
                </ul>
                <a href="./book-call" className="btn btn-secondary pricing-cta">
                  お問い合わせ
                </a>
              </div>
            </div>

            <p className="pricing-note">
              年額プランなら2ヶ月分お得。すべてのプランに14日間の返金保証付き。
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────── */}
        <section className="faq" id="faq" ref={sectionRefs.faq}>
          <div className="container">
            <div className="faq-header animate-on-scroll">
              <span className="section-label">よくある質問</span>
              <h2 className="section-title">気になるポイントをまとめました</h2>
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
              <div className="cta-call-badge">まずは無料で</div>
              <h2>
                まずは無料で始めてみませんか?
              </h2>
              <p>
                300社以上が選んだAI請求書サービス。
                月5通まで無料、クレジットカード不要で今すぐ始められます。
              </p>
              <div className="cta-banner-actions">
                <a href="./signup" className="btn btn-xl btn-cta-call">
                  無料で始める
                  <ArrowRight />
                </a>
                <a href="./book-call" className="btn btn-xl btn-cta-call-secondary">
                  無料相談を予約する
                </a>
              </div>
              <div className="cta-call-benefits">
                <span>&#x2714; 月5通まで無料</span>
                <span>&#x2714; クレジットカード不要</span>
                <span>&#x2714; インボイス制度完全対応</span>
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
