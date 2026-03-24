"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   FAQ data (beginner-friendly)
   ───────────────────────────────────────────── */
const faqData = [
  {
    q: "パソコンが苦手ですが使えますか？",
    a: "はい、大丈夫です。取引先のお名前と金額を入れるだけなので、むずかしい操作はありません。スマホからでも使えます。わからないことがあれば、チャットサポートがていねいにお手伝いします。",
  },
  {
    q: "インボイス制度って何ですか？",
    a: "2023年10月から始まった、請求書のあたらしいルールです。登録番号や税率の書き方にきまりがあります。でも安心してください。ラクダInvoiceが全部自動でやってくれるので、あなたがルールを覚える必要はありません。",
  },
  {
    q: "Excel（エクセル）からの乗り換えは大変ですか？",
    a: "ぜんぜん大変じゃありません。Excelのデータを移す必要もありません。ラクダInvoiceで新しく作り始めるだけでOKです。最初の1通は1分もかからずに作れます。",
  },
  {
    q: "無料プランだけでも使えますか？",
    a: "はい、ずっと無料で使えます。月に5通まで請求書を作れるので、取引先が少ない方はこれだけで十分です。あとから有料にする必要もありません。",
  },
  {
    q: "途中でやめられますか？",
    a: "はい、いつでもやめられます。解約の手数料もかかりません。有料プランも、やめたい月の月末まで使えます。データはやめたあとも90日間保存されるので安心です。",
  },
];

/* ─────────────────────────────────────────────
   FAQ Item Component
   ───────────────────────────────────────────── */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="faq-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 3v8M3 7h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className="faq-answer"
        role="region"
        style={{ maxHeight: isOpen ? `${height + 32}px` : "0px" }}
      >
        <div className="faq-answer-inner" ref={contentRef}>
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Intersection Observer Hook
   ───────────────────────────────────────────── */
function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in--visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const targets = node.querySelectorAll(
      ".fade-in, .fade-in-left, .fade-in-right, .fade-in-scale"
    );
    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return ref;
}

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */
export default function EasyLP() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionRef = useScrollFadeIn();

  /* Scroll handler for header */
  const handleScroll = useCallback(() => {
    setHeaderScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Toggle FAQ */
  const toggleFaq = useCallback((idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  }, []);

  /* Smooth scroll for anchor links */
  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={sectionRef}>
      {/* ═══════════ HEADER ═══════════ */}
      <header
        className={`site-header ${headerScrolled ? "site-header--scrolled" : "site-header--hero"}`}
      >
        <div className="header-inner">
          <a href="../" className="header-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: "20px", width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>

          <nav className="header-nav" role="navigation" aria-label="メインナビゲーション">
            <button onClick={() => scrollTo("guide")} className="header-nav-link" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}>かんたんガイド</button>
            <button onClick={() => scrollTo("features")} className="header-nav-link" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}>できること</button>
            <button onClick={() => scrollTo("pricing")} className="header-nav-link" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}>料金</button>
            <button onClick={() => scrollTo("faq")} className="header-nav-link" style={{ background: "none", border: "none", cursor: "pointer", font: "inherit" }}>よくある質問</button>
            <a href="../signup" className="header-cta">
              無料ではじめる
            </a>
          </nav>

          <button
            className="mobile-menu-btn"
            aria-label="メニューを開く"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {mobileMenuOpen ? (
                <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              ) : (
                <path d="M4 6h14M4 11h14M4 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu" role="navigation" aria-label="モバイルナビゲーション">
            <button className="mobile-menu-link" onClick={() => scrollTo("guide")} style={{ background: "none", border: "none", borderBottom: "1px solid var(--c-hero-border)", cursor: "pointer", font: "inherit", textAlign: "left", width: "100%", display: "block", padding: "12px 0", fontSize: "1rem", fontWeight: 500, color: "var(--c-hero-text)" }}>かんたんガイド</button>
            <button className="mobile-menu-link" onClick={() => scrollTo("features")} style={{ background: "none", border: "none", borderBottom: "1px solid var(--c-hero-border)", cursor: "pointer", font: "inherit", textAlign: "left", width: "100%", display: "block", padding: "12px 0", fontSize: "1rem", fontWeight: 500, color: "var(--c-hero-text)" }}>できること</button>
            <button className="mobile-menu-link" onClick={() => scrollTo("pricing")} style={{ background: "none", border: "none", borderBottom: "1px solid var(--c-hero-border)", cursor: "pointer", font: "inherit", textAlign: "left", width: "100%", display: "block", padding: "12px 0", fontSize: "1rem", fontWeight: 500, color: "var(--c-hero-text)" }}>料金</button>
            <button className="mobile-menu-link" onClick={() => scrollTo("faq")} style={{ background: "none", border: "none", borderBottom: "1px solid var(--c-hero-border)", cursor: "pointer", font: "inherit", textAlign: "left", width: "100%", display: "block", padding: "12px 0", fontSize: "1rem", fontWeight: 500, color: "var(--c-hero-text)" }}>よくある質問</button>
            <a href="../signup" className="mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>無料ではじめる</a>
          </div>
        )}
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" id="hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-glow hero-glow--1" aria-hidden="true" />
        <div className="hero-glow hero-glow--2" aria-hidden="true" />

        <div className="hero-inner" style={{ gridTemplateColumns: "1fr", textAlign: "center", justifyItems: "center" }}>
          <div className="hero-content" style={{ maxWidth: "600px" }}>
            <div className="hero-badge fade-in" style={{ marginLeft: "auto", marginRight: "auto" }}>
              <span className="hero-badge-dot" aria-hidden="true" />
              はじめてでも安心
            </div>

            <h1 className="hero-title fade-in">
              <span className="hero-title-sub">エクセルも、むずかしいソフトも、もういりません。</span>
              <span className="hero-title-main">
                はじめての請求書でも、
                <br />
                <span className="hero-title-accent">大丈夫。</span>
              </span>
            </h1>

            <p className="hero-subtitle fade-in" style={{ maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
              取引先と金額を入れるだけ。
              <br />
              税金の計算も、登録番号も、キレイなレイアウトも、
              <br className="hide-sp" />
              ぜんぶAIがやってくれます。
            </p>

            <div className="hero-actions fade-in" style={{ justifyContent: "center" }}>
              <a href="../signup" className="btn-primary btn-primary--large">
                無料ではじめる
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <button onClick={() => scrollTo("guide")} className="btn-ghost" style={{ cursor: "pointer" }}>
                かんたんガイドを見る
              </button>
            </div>

            <div className="hero-trust fade-in" style={{ justifyContent: "center" }}>
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                パソコンが苦手でもOK
              </span>
              <span className="hero-trust-divider" aria-hidden="true" />
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                クレカ不要
              </span>
              <span className="hero-trust-divider" aria-hidden="true" />
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ずっと無料で使える
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SIMPLE DEMO / GUIDE ═══════════ */}
      <section className="flow" id="guide">
        <div className="section-container">
          <div className="section-header fade-in" style={{ textAlign: "center" }}>
            <span className="section-eyebrow">かんたんガイド</span>
            <h2 className="section-title">
              こんなにカンタン。<br className="hide-sp" />3つのステップ
            </h2>
            <p className="section-desc">
              むずかしい設定はいりません。やることは3つだけです。
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-line" aria-hidden="true" />

            <div className="timeline-step fade-in stagger-1">
              <div className="timeline-marker">
                <span className="timeline-number">1</span>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-card-title">取引先の名前を入れる</h3>
                <p className="timeline-card-desc">
                  お仕事をもらっている会社や人の名前を入れてください。
                  <br />
                  2回目からは自動で出てくるので、もっとラクになります。
                </p>
                <div className="timeline-card-visual" aria-hidden="true">
                  <div className="mini-input">
                    <span className="mini-input-label">取引先</span>
                    <span className="mini-input-value">株式会社サンプル<span className="mini-cursor">|</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step fade-in stagger-2">
              <div className="timeline-marker">
                <span className="timeline-number">2</span>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-card-title">金額を入れる</h3>
                <p className="timeline-card-desc">
                  請求したい金額を数字で入れるだけ。
                  <br />
                  消費税の計算はAIが自動でやってくれます。
                </p>
                <div className="timeline-card-visual" aria-hidden="true">
                  <div className="mini-input">
                    <span className="mini-input-label">金額</span>
                    <span className="mini-input-value" style={{ fontFamily: "var(--font-mono)" }}>300,000<span style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)", marginLeft: "4px" }}>円</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step fade-in stagger-3">
              <div className="timeline-marker">
                <span className="timeline-number" style={{ background: "var(--c-green)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <div className="timeline-card" style={{ borderColor: "rgba(5, 150, 105, 0.2)", background: "linear-gradient(135deg, var(--c-green-subtle) 0%, var(--c-surface) 60%)" }}>
                <h3 className="timeline-card-title" style={{ color: "var(--c-green)" }}>できあがり！</h3>
                <p className="timeline-card-desc">
                  AIがキレイな請求書を作ってくれます。
                  <br />
                  PDFでダウンロードしたり、そのままメールで送ったりできます。
                </p>
                <div className="timeline-card-visual" aria-hidden="true">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--c-green-light)", color: "var(--c-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--c-green)" }}>請求書が完成しました</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--c-ink-muted)" }}>AIがインボイス制度のルールに沿って作成しました</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ INVOICE SYSTEM SECTION ═══════════ */}
      <section className="compliance" id="invoice-system" style={{ background: "var(--c-surface-sunken)" }}>
        <div className="section-container">
          <div className="compliance-inner">
            {/* Left: text */}
            <div className="compliance-content fade-in-left">
              <span className="compliance-eyebrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 11s5-2.5 5-6.25V2.5L6 1 1 2.5v2.25C1 8.5 6 11 6 11z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                おまかせください
              </span>

              <h2 className="compliance-title">
                インボイス制度？
                <br />
                おまかせください。
              </h2>

              <p className="compliance-desc">
                「インボイス制度ってむずかしそう…」と思っていませんか？
                大丈夫です。ラクダInvoiceがめんどうなルールを
                ぜんぶ自動でやってくれます。
                あなたが覚える必要はありません。
              </p>
            </div>

            {/* Right: checklist visual */}
            <div className="compliance-visual fade-in-right">
              <div className="compliance-card">
                <div className="compliance-card-header">
                  <span className="compliance-card-title">AIがやってくれること</span>
                  <span className="compliance-card-status">
                    <span className="status-dot status-dot--green" aria-hidden="true" />
                    ぜんぶ自動
                  </span>
                </div>

                <div className="compliance-checklist">
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">登録番号の記載</span>
                    <span className="check-value" style={{ color: "var(--c-green)", fontSize: "0.75rem" }}>自動</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">税率の計算（8%と10%）</span>
                    <span className="check-value" style={{ color: "var(--c-green)", fontSize: "0.75rem" }}>自動</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">端数（はすう）の処理</span>
                    <span className="check-value" style={{ color: "var(--c-green)", fontSize: "0.75rem" }}>自動</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">電子保存（ほぞんのルール）</span>
                    <span className="check-value" style={{ color: "var(--c-green)", fontSize: "0.75rem" }}>自動</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">法律がかわったとき</span>
                    <span className="check-value" style={{ color: "var(--c-green)", fontSize: "0.75rem" }}>自動で対応</span>
                  </div>
                </div>

                <div style={{ marginTop: "16px", padding: "12px 14px", background: "var(--c-green-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", color: "var(--c-ink-secondary)", lineHeight: 1.6 }}>
                  あなたがやるのは、取引先と金額を入れるだけ。
                  <br />
                  <strong style={{ color: "var(--c-green)" }}>むずかしいことは、ぜんぶラクダにおまかせください。</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="features" id="features" style={{ background: "var(--c-surface)" }}>
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">できること</span>
            <h2 className="section-title">
              はじめてでも安心。<br className="hide-sp" />
              こんなことができます。
            </h2>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card feature-card--primary fade-in stagger-1">
              <div className="feature-icon-wrap feature-icon-wrap--blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="feature-content">
                <span className="feature-badge feature-badge--hot">いちばん人気</span>
                <h3 className="feature-title">入れるだけで請求書ができる</h3>
                <p className="feature-desc">
                  取引先と金額を入れるだけで、AIがキレイな請求書を作ります。
                  品目の書き方も、税金の計算も、ぜんぶおまかせ。
                  <strong>たった27秒で完成します。</strong>
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-card fade-in stagger-2">
              <div className="feature-icon-wrap feature-icon-wrap--amber">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">毎月の請求を自動でくり返し</h3>
              <p className="feature-desc">
                毎月おなじ取引先に送る請求書は、1回設定するだけ。
                次の月からは自動で作ってくれます。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card fade-in stagger-3">
              <div className="feature-icon-wrap feature-icon-wrap--purple">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M13 2H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M13 2v5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">PDFでダウンロード・メール送信</h3>
              <p className="feature-desc">
                できた請求書はPDFで保存できます。
                そのまま取引先にメールで送ることもできます。
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card fade-in stagger-4">
              <div className="feature-icon-wrap feature-icon-wrap--green">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">会計ソフトにもつながる</h3>
              <p className="feature-desc">
                freee（フリー）やマネーフォワードをお使いなら、
                ボタンひとつでデータを送れます。
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card fade-in stagger-5">
              <div className="feature-icon-wrap feature-icon-wrap--teal">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M3 9h16M9 3v16" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="feature-title">入金があったかチェック</h3>
              <p className="feature-desc">
                「あの請求書、もう振り込まれたかな？」
                ラクダが入金状況を管理して、お知らせしてくれます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section className="pricing" id="pricing">
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">料金</span>
            <h2 className="section-title">
              まずは無料で使ってみてください。
            </h2>
            <p className="section-desc">
              クレジットカードの登録はいりません。無料のままずっと使えます。
            </p>
          </div>

          <div className="pricing-grid">
            {/* Free Plan */}
            <div className="pricing-card fade-in stagger-1">
              <div className="pricing-plan-name">おためしプラン</div>
              <div className="pricing-price">
                <span className="pricing-yen">&yen;</span>
                <span className="pricing-amount">0</span>
              </div>
              <div className="pricing-period">ずっと無料</div>
              <p className="pricing-desc">
                月に5通まで請求書を作れます。取引先が少ない方はこれだけでOKです。
              </p>

              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  月5通まで請求書を作れる
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  AIが自動で作ってくれる
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  インボイス制度に対応
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  PDFでダウンロードできる
                </li>
              </ul>

              <a href="../signup?plan=free" className="pricing-btn pricing-btn--free" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>無料ではじめる</a>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card pricing-card--pro fade-in stagger-2">
              <div className="pricing-popular-tag">たくさん使う人に</div>
              <div className="pricing-plan-name">つかいほうだいプラン</div>
              <div className="pricing-price">
                <span className="pricing-yen">&yen;</span>
                <span className="pricing-amount">980</span>
                <span className="pricing-mo">/月</span>
              </div>
              <div className="pricing-annual">
                年払いなら&yen;9,800/年
                <span className="pricing-save">2ヶ月分おトク</span>
              </div>
              <p className="pricing-desc">
                何通でも請求書を作れます。毎月たくさん送る方はこちらがおすすめです。
              </p>

              <ul className="pricing-features">
                <li className="pricing-feature-item pricing-feature-item--highlight">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <strong>何通でも</strong>請求書を作れる
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  無料プランのぜんぶの機能
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  毎月の自動くり返し
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  入金チェック
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  会計ソフト連携（freee・マネーフォワード）
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  チャットサポート（24時間以内にお返事）
                </li>
              </ul>

              <a href="../signup?plan=pro" className="pricing-btn pricing-btn--pro" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>つかいほうだいプランをはじめる</a>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card pricing-card--enterprise fade-in stagger-3">
              <div className="pricing-plan-name">Enterprise</div>
              <div className="pricing-price">
                <span className="pricing-amount" style={{ fontSize: "1.5rem" }}>お問い合わせ</span>
              </div>
              <div className="pricing-period">カスタム料金・SLA対応</div>
              <p className="pricing-desc">
                経理チーム・法人全体での導入に。IT統制・監査要件にも対応します。
              </p>

              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  Proの全機能
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  チームメンバー無制限
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  SSO / SAML 2.0 連携
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  REST API / Webhook
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  専任カスタマーサクセス
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  SLA 99.9% 稼働率保証
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  監査ログ / コンプライアンス
                </li>
              </ul>

              <a href="../book-call" className="pricing-btn pricing-btn--free" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>お問い合わせ</a>
            </div>
          </div>

          <p className="pricing-footnote fade-in">
            どちらのプランもインボイス制度に対応しています。いつでもプラン変更・キャンセルできます。
          </p>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="faq" id="faq">
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">よくある質問</span>
            <h2 className="section-title">わからないことはありますか？</h2>
          </div>

          <div className="faq-list">
            {faqData.map((item, idx) => (
              <div
                key={idx}
                className="fade-in"
                style={{ transitionDelay: `${0.04 + idx * 0.05}s` }}
              >
                <FaqItem
                  question={item.q}
                  answer={item.a}
                  isOpen={openFaq === idx}
                  onToggle={() => toggleFaq(idx)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="cta" id="cta">
        <div className="cta-glow" aria-hidden="true" />
        <div className="cta-inner">
          <h2 className="cta-title fade-in">
            さっそく、<br className="hide-pc" />
            最初の1通を
            <br />
            作ってみませんか？
          </h2>
          <p className="cta-desc fade-in">
            カンタンです。取引先の名前と金額を入れるだけ。
            <br />
            無料ではじめられるので、気軽に試してください。
          </p>

          <div className="cta-actions fade-in">
            <a href="../signup" className="btn-primary btn-primary--large btn-primary--glow">
              無料ではじめる
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="../book-call" className="btn-ghost">
              相談してみる
            </a>
          </div>

          <div className="cta-trust fade-in">
            <span>クレカ不要</span>
            <span className="cta-trust-dot" aria-hidden="true" />
            <span>30秒で登録</span>
            <span className="cta-trust-dot" aria-hidden="true" />
            <span>いつでもやめられる</span>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
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
                <li><a href="../terms" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>利用規約</a></li>
                <li><a href="../privacy" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>プライバシーポリシー</a></li>
                <li><a href="../tokushoho" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>特定商取引法</a></li>
                <li><a href="../security" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>セキュリティ</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #E5E5E5", paddingTop: "24px", textAlign: "center" as const, fontSize: "12px", color: "#9CA3AF" }}>
            &copy; 2026 Rakuda AI Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
