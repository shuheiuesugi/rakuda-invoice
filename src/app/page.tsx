"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   FAQ data
   ───────────────────────────────────────────── */
const faqData = [
  {
    q: "無料プランと有料プランで、請求書の見た目は変わりますか？",
    a: "いいえ、同じAIエンジンを使っているので品質は同一です。無料プランは月5通の発行枠があるだけで、機能制限はありません。",
  },
  {
    q: "インボイス制度の登録番号はどうやって設定しますか？",
    a: "初回の事業者情報設定で「T+13桁」の登録番号を入力するだけです。以降、すべての請求書に自動記載されます。税率ごとの消費税額や端数処理もインボイス制度のルールに沿って自動計算します。",
  },
  {
    q: "freeeやマネーフォワードと連携できますか？",
    a: "はい。freee・マネーフォワードクラウド・弥生会計にワンクリックで連携可能です。CSV一括エクスポートにも対応しているので、お使いの会計ソフトに合わせた運用ができます。",
  },
  {
    q: "途中でプランを変更できますか？",
    a: "いつでも変更できます。アップグレードは即時反映（日割り計算）、ダウングレードは次回請求サイクルから適用されます。",
  },
  {
    q: "データのセキュリティは大丈夫ですか？",
    a: "AES-256暗号化、AWS東京リージョン保管、TLS 1.3通信保護に加え、SOC 2 Type II認証を取得しています。電子帳簿保存法の保存要件にも対応済みです。",
  },
];

/* ─────────────────────────────────────────────
   Testimonial data
   ───────────────────────────────────────────── */
const testimonials = [
  {
    text: "Excel手打ちで毎月丸一日かかっていた請求書が、本当に数十秒で終わるようになった。最初は疑っていたけど、使い始めた月の月末に感動しました。",
    name: "田中 裕子",
    role: "フリーランスデザイナー / 個人事業主",
    initial: "T",
  },
  {
    text: "インボイス制度が始まってから登録番号の記載漏れが怖かったんですが、ラクダなら勝手にやってくれるので安心。税理士にも「ちゃんとしてますね」と言われました。",
    name: "佐藤 健一",
    role: "Web制作会社 代表 / 従業員3名",
    initial: "S",
  },
  {
    text: "月980円でこの機能は正直バグだと思う。以前使っていた請求書ソフトは月3,000円以上したのに、こっちの方がずっと使いやすい。",
    name: "山本 あかり",
    role: "ECショップ運営 / 副業",
    initial: "Y",
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
   Counter Animation Hook
   ───────────────────────────────────────────── */
function useCountUp(end: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * end));
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [end, duration]);

  return { count, ref };
}

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */
export default function Home() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionRef = useScrollFadeIn();

  /* Stats counters */
  const stat1 = useCountUp(27);
  const stat2 = useCountUp(128400);
  const stat3 = useCountUp(99);
  const stat4 = useCountUp(4200);

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

  /* Format large numbers */
  const formatNumber = (n: number) => n.toLocaleString("ja-JP");

  return (
    <div ref={sectionRef}>
      {/* ═══════════ HEADER ═══════════ */}
      <header
        className={`site-header ${headerScrolled ? "site-header--scrolled" : "site-header--hero"}`}
      >
        <div className="header-inner">
          <a href="#" className="header-logo">
            <span className="header-logo-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L4 16h3l1.5-4h3L13 16h3L9 2zm0 4.5L10.5 11h-3L9 6.5z" fill="currentColor"/>
              </svg>
            </span>
            <span>ラクダ<span className="logo-accent">Invoice</span></span>
          </a>

          <nav className="header-nav" role="navigation" aria-label="メインナビゲーション">
            <a href="#flow" className="header-nav-link">使い方</a>
            <a href="#features" className="header-nav-link">機能</a>
            <a href="#pricing" className="header-nav-link">料金</a>
            <a href="#faq" className="header-nav-link">FAQ</a>
            <a href="./signup" className="header-cta">
              無料で始める
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
            <a href="#flow" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>使い方</a>
            <a href="#features" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>機能</a>
            <a href="#pricing" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>料金</a>
            <a href="#faq" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="./signup" className="mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>無料で始める</a>
          </div>
        )}
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" id="hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-glow hero-glow--1" aria-hidden="true" />
        <div className="hero-glow hero-glow--2" aria-hidden="true" />

        <div className="hero-inner">
          {/* Left: text */}
          <div className="hero-content">
            <div className="hero-badge fade-in">
              <span className="hero-badge-dot" aria-hidden="true" />
              インボイス制度・電帳法 完全対応
            </div>

            <h1 className="hero-title fade-in">
              <span className="hero-title-sub">もう請求書で夜を潰さない。</span>
              <span className="hero-title-main">
                取引先と金額を入れるだけ。
                <br />
                <span className="hero-title-accent">27秒で完成。</span>
              </span>
            </h1>

            <p className="hero-subtitle fade-in">
              品目の分類、税率計算、登録番号の記載、レイアウト調整。
              <br className="hide-sp" />
              面倒な作業はすべてAIにまかせて、あなたは本業に集中してください。
            </p>

            <div className="hero-actions fade-in">
              <a href="./signup" className="btn-primary btn-primary--large">
                無料アカウントを作成
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#flow" className="btn-ghost">
                どう動くか見る
              </a>
            </div>

            <div className="hero-trust fade-in">
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                クレカ登録不要
              </span>
              <span className="hero-trust-divider" aria-hidden="true" />
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                30秒で登録完了
              </span>
              <span className="hero-trust-divider" aria-hidden="true" />
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                月5通まで永久無料
              </span>
            </div>
          </div>

          {/* Right: realistic invoice mockup */}
          <div className="hero-mockup fade-in-right">
            <div className="mockup-float-card mockup-float-card--time" aria-hidden="true">
              <div className="float-card-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#34D399" strokeWidth="1.2"/><path d="M8 5v3.5l2.5 1.5" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="float-card-label">作成完了</div>
                <div className="float-card-value">27<span className="float-card-unit">秒</span></div>
              </div>
            </div>

            <div className="mockup-float-card mockup-float-card--check" aria-hidden="true">
              <div className="float-card-icon float-card-icon--blue">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4.5 8l2.5 2.5L11.5 5" stroke="#60A5FA" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="float-card-label">インボイス</div>
                <div className="float-card-value float-card-value--blue">準拠</div>
              </div>
            </div>

            <div className="invoice-mockup">
              {/* Invoice header with issuer info */}
              <div className="mockup-doc-header">
                <div className="mockup-doc-title">請 求 書</div>
                <div className="mockup-doc-meta">
                  <div className="mockup-doc-no">No. INV-2026-0342</div>
                  <div className="mockup-doc-date">発行日: 2026年3月20日</div>
                  <div className="mockup-doc-due">お支払期限: 2026年4月30日</div>
                </div>
              </div>

              {/* Addressee and issuer */}
              <div className="mockup-parties">
                <div className="mockup-addressee">
                  <div className="mockup-party-label">請求先</div>
                  <div className="mockup-party-name">株式会社サンプルテック 御中</div>
                </div>
                <div className="mockup-issuer">
                  <div className="mockup-party-label">発行者</div>
                  <div className="mockup-issuer-name">山田デザイン事務所</div>
                  <div className="mockup-issuer-reg">
                    <span className="mockup-reg-badge">T</span>
                    1234567890123
                  </div>
                </div>
              </div>

              {/* Table header */}
              <div className="mockup-table-head">
                <span className="mockup-col-item">品目・摘要</span>
                <span className="mockup-col-qty">数量</span>
                <span className="mockup-col-unit">単価</span>
                <span className="mockup-col-tax">税率</span>
                <span className="mockup-col-amount">金額</span>
              </div>

              {/* Rows */}
              <div className="mockup-table-row">
                <span className="mockup-col-item">Webアプリ開発</span>
                <span className="mockup-col-qty">1</span>
                <span className="mockup-col-unit">800,000</span>
                <span className="mockup-col-tax"><span className="tax-badge">10%</span></span>
                <span className="mockup-col-amount">800,000</span>
              </div>
              <div className="mockup-table-row">
                <span className="mockup-col-item">UI/UXデザイン</span>
                <span className="mockup-col-qty">1</span>
                <span className="mockup-col-unit">350,000</span>
                <span className="mockup-col-tax"><span className="tax-badge">10%</span></span>
                <span className="mockup-col-amount">350,000</span>
              </div>
              <div className="mockup-table-row">
                <span className="mockup-col-item">サーバー運用保守（月額）</span>
                <span className="mockup-col-qty">3</span>
                <span className="mockup-col-unit">50,000</span>
                <span className="mockup-col-tax"><span className="tax-badge">10%</span></span>
                <span className="mockup-col-amount">150,000</span>
              </div>

              {/* Summary */}
              <div className="mockup-summary">
                <div className="mockup-summary-row">
                  <span>小計</span>
                  <span>&yen;1,300,000</span>
                </div>
                <div className="mockup-summary-row">
                  <span>消費税（10%対象: &yen;1,300,000）</span>
                  <span>&yen;130,000</span>
                </div>
                <div className="mockup-summary-row mockup-summary-row--total">
                  <span>ご請求金額（税込）</span>
                  <span className="mockup-grand-total">&yen;1,430,000</span>
                </div>
              </div>

              {/* AI generation indicator */}
              <div className="mockup-ai-indicator" aria-hidden="true">
                <div className="mockup-ai-pulse" />
                <span>AIが自動生成しました</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SOCIAL PROOF BAR ═══════════ */}
      <section className="proof-bar">
        <div className="proof-bar-inner">
          <div className="proof-stat" ref={stat1.ref}>
            <span className="proof-number">{stat1.count}<span className="proof-unit">秒</span></span>
            <span className="proof-label">平均作成時間</span>
          </div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-stat" ref={stat2.ref}>
            <span className="proof-number">{formatNumber(stat2.count)}<span className="proof-unit">通</span></span>
            <span className="proof-label">累計発行数</span>
          </div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-stat" ref={stat3.ref}>
            <span className="proof-number">{stat3.count}<span className="proof-unit">%</span></span>
            <span className="proof-label">インボイス準拠率</span>
          </div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-stat" ref={stat4.ref}>
            <span className="proof-number">{formatNumber(stat4.count)}<span className="proof-unit">社</span></span>
            <span className="proof-label">導入事業者</span>
          </div>
        </div>
      </section>

      {/* ═══════════ PAIN POINT ═══════════ */}
      <section className="pain" id="pain">
        <div className="section-container">
          <div className="pain-header fade-in">
            <h2 className="pain-title">
              月末の請求書作業、<br className="hide-sp" />こんな状態になっていませんか？
            </h2>
          </div>
          <div className="pain-grid">
            <div className="pain-card fade-in stagger-1">
              <span className="pain-emoji" aria-hidden="true">&#128553;</span>
              <p className="pain-text">Excelをコピペして品目を手打ち。<strong>毎月同じ作業に2時間</strong>かかっている</p>
            </div>
            <div className="pain-card fade-in stagger-2">
              <span className="pain-emoji" aria-hidden="true">&#128560;</span>
              <p className="pain-text">登録番号の記載漏れが怖い。<strong>インボイス制度の要件を満たしているか不安</strong></p>
            </div>
            <div className="pain-card fade-in stagger-3">
              <span className="pain-emoji" aria-hidden="true">&#128164;</span>
              <p className="pain-text">本業が忙しくて請求書を後回しに。<strong>気づいたら月末の深夜</strong>…</p>
            </div>
          </div>
          <div className="pain-resolve fade-in">
            <div className="pain-arrow" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 5v14m0 0l-5-5m5 5l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="pain-resolve-text">
              ラクダInvoiceなら、<strong>この作業が27秒で終わります。</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ FLOW (TIMELINE) ═══════════ */}
      <section className="flow" id="flow">
        <div className="section-container">
          <div className="section-header section-header--left fade-in">
            <span className="section-eyebrow">How it works</span>
            <h2 className="section-title">入力から送付まで、たった3ステップ</h2>
            <p className="section-desc">
              複雑な設定は不要です。最初の請求書は本当に30秒で完成します。
            </p>
          </div>

          <div className="timeline">
            <div className="timeline-line" aria-hidden="true" />

            <div className="timeline-step fade-in stagger-1">
              <div className="timeline-marker">
                <span className="timeline-number">1</span>
                <span className="timeline-time">~10秒</span>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-card-title">取引先と金額を入力</h3>
                <p className="timeline-card-desc">
                  取引先名を入力し始めると、過去の取引データから候補を自動サジェスト。
                  金額と支払期日を入れたら、あとはAIに任せるだけ。
                </p>
                <div className="timeline-card-visual" aria-hidden="true">
                  <div className="mini-input">
                    <span className="mini-input-label">取引先</span>
                    <span className="mini-input-value">株式会社サンプル<span className="mini-cursor">|</span></span>
                  </div>
                  <div className="mini-input">
                    <span className="mini-input-label">金額</span>
                    <span className="mini-input-value">1,300,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step fade-in stagger-2">
              <div className="timeline-marker">
                <span className="timeline-number">2</span>
                <span className="timeline-time">~15秒</span>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-card-title">AIが請求書を自動生成</h3>
                <p className="timeline-card-desc">
                  品目の分類、税率判定（8%/10%）、インボイス登録番号の記載、
                  レイアウトの最適化をAIが一括で実行します。
                </p>
                <div className="timeline-card-visual" aria-hidden="true">
                  <div className="mini-progress">
                    <div className="mini-progress-bar">
                      <div className="mini-progress-fill" />
                    </div>
                    <div className="mini-progress-steps">
                      <span className="mini-step mini-step--done">品目分類</span>
                      <span className="mini-step mini-step--done">税率判定</span>
                      <span className="mini-step mini-step--active">レイアウト</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-step fade-in stagger-3">
              <div className="timeline-marker">
                <span className="timeline-number">3</span>
                <span className="timeline-time">~2秒</span>
              </div>
              <div className="timeline-card">
                <h3 className="timeline-card-title">確認して即送付</h3>
                <p className="timeline-card-desc">
                  プレビューを確認して、ワンクリックでPDFダウンロードまたはメール送信。
                  控えは自動で電子保存されます。
                </p>
                <div className="timeline-card-visual" aria-hidden="true">
                  <div className="mini-actions">
                    <span className="mini-btn mini-btn--primary">PDF送信</span>
                    <span className="mini-btn mini-btn--secondary">DL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="features" id="features">
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">Features</span>
            <h2 className="section-title">
              請求書の作成だけじゃない。<br className="hide-sp" />
              経理まわり、まるごとラクに。
            </h2>
          </div>

          <div className="features-grid">
            {/* Primary Feature */}
            <div className="feature-card feature-card--primary fade-in stagger-1">
              <div className="feature-icon-wrap feature-icon-wrap--blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="feature-content">
                <span className="feature-badge feature-badge--hot">一番使われている機能</span>
                <h3 className="feature-title">AI自動作成エンジン</h3>
                <p className="feature-desc">
                  取引先名と金額を入力するだけ。AIが品目分類・税率・レイアウトを自動判定。
                  過去の取引パターンを学習して、繰り返し入力を<strong>97%削減</strong>します。
                </p>
              </div>
            </div>

            {/* Compliance Feature */}
            <div className="feature-card feature-card--compliance fade-in stagger-2">
              <div className="feature-icon-wrap feature-icon-wrap--green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="feature-content">
                <span className="feature-badge feature-badge--safe">法令準拠</span>
                <h3 className="feature-title">インボイス制度・電帳法対応</h3>
                <p className="feature-desc">
                  適格請求書の必須要件を自動で満たします。
                  登録番号・税率別消費税額・端数処理まで、制度要件を漏れなくカバー。
                </p>
              </div>
            </div>

            {/* Secondary Features */}
            <div className="feature-card fade-in stagger-3">
              <div className="feature-icon-wrap feature-icon-wrap--purple">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M13 2H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M13 2v5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">PDF一括生成</h3>
              <p className="feature-desc">
                複数の請求書をまとめてPDF化。ダウンロードもメール送信もワンクリック。
              </p>
            </div>

            <div className="feature-card fade-in stagger-4">
              <div className="feature-icon-wrap feature-icon-wrap--amber">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">定期請求の自動化</h3>
              <p className="feature-desc">
                毎月のルーティン請求を設定すれば、指定日にPDF生成からメール送信まで全自動。
              </p>
            </div>

            <div className="feature-card fade-in stagger-5">
              <div className="feature-icon-wrap feature-icon-wrap--rose">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M15 19v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M20 19v-2a3.5 3.5 0 00-2.5-3.37M14.5 3.63a3.5 3.5 0 010 6.74" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">取引先マスタ管理</h3>
              <p className="feature-desc">
                取引先情報を一元管理。住所・口座の変更も全請求書に即時反映されます。
              </p>
            </div>

            <div className="feature-card fade-in stagger-6">
              <div className="feature-icon-wrap feature-icon-wrap--teal">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M3 9h16M9 3v16" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="14" cy="14" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="feature-title">入金ステータス管理</h3>
              <p className="feature-desc">
                未入金アラートで回収漏れを防止。銀行口座との自動照合で消込の手間を削減。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ COMPLIANCE DETAIL ═══════════ */}
      <section className="compliance" id="compliance">
        <div className="section-container">
          <div className="compliance-inner">
            {/* Left: text */}
            <div className="compliance-content fade-in-left">
              <span className="compliance-eyebrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 11s5-2.5 5-6.25V2.5L6 1 1 2.5v2.25C1 8.5 6 11 6 11z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                法令対応
              </span>

              <h2 className="compliance-title">
                制度改正のたびに<br />
                請求書を直す手間、<br />
                もう要りません。
              </h2>

              <p className="compliance-desc">
                2023年10月施行のインボイス制度（適格請求書等保存方式）と電子帳簿保存法に完全対応。
                法改正があればシステム側が自動でアップデートするので、あなたが制度を追いかける必要はありません。
              </p>

              <ul className="compliance-list">
                <li className="compliance-list-item">
                  <span className="compliance-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>適格請求書発行事業者の登録番号（T+13桁）を自動記載</span>
                </li>
                <li className="compliance-list-item">
                  <span className="compliance-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>税率ごとの消費税額を内訳表示（8%・10%自動判定）</span>
                </li>
                <li className="compliance-list-item">
                  <span className="compliance-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>端数処理は税率ごとに1回（国税庁ルール完全準拠）</span>
                </li>
                <li className="compliance-list-item">
                  <span className="compliance-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>電子帳簿保存法の保存要件に対応したデータ管理</span>
                </li>
              </ul>
            </div>

            {/* Right: visual card */}
            <div className="compliance-visual fade-in-right">
              <div className="compliance-card">
                <div className="compliance-card-header">
                  <span className="compliance-card-title">適格請求書フォーマット検証</span>
                  <span className="compliance-card-status">
                    <span className="status-dot status-dot--green" aria-hidden="true" />
                    全項目OK
                  </span>
                </div>

                <div className="compliance-checklist">
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">発行者の氏名・名称</span>
                    <span className="check-value">山田デザイン事務所</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">登録番号</span>
                    <span className="check-value check-value--mono">T1234567890123</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">適用税率</span>
                    <span className="check-value check-value--mono">10% / 8%</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">税率別消費税額</span>
                    <span className="check-value check-value--mono">&yen;130,000</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">端数処理</span>
                    <span className="check-value">切捨て（税率ごと1回）</span>
                  </div>
                  <div className="compliance-check-row compliance-check-row--pass">
                    <span className="check-icon check-icon--pass" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span className="check-label">電子保存要件</span>
                    <span className="check-value">タイムスタンプ付与済み</span>
                  </div>
                </div>
              </div>

              <div className="compliance-stamp" aria-hidden="true">
                <span className="compliance-stamp-inner">
                  適格<br />請求書
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PRICING ═══════════ */}
      <section className="pricing" id="pricing">
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">Pricing</span>
            <h2 className="section-title">
              月額980円。缶コーヒー3杯分で、<br className="hide-sp" />
              請求書の悩みが全部消えます。
            </h2>
            <p className="section-desc">
              まずは無料プランで使ってみてください。アップグレードはいつでも。
            </p>
          </div>

          <div className="pricing-grid">
            {/* Free Plan */}
            <div className="pricing-card fade-in stagger-1">
              <div className="pricing-plan-name">Free</div>
              <div className="pricing-price">
                <span className="pricing-yen">&yen;</span>
                <span className="pricing-amount">0</span>
              </div>
              <div className="pricing-period">ずっと無料</div>
              <p className="pricing-desc">
                個人事業主・フリーランスの方に。毎月の請求が少ない方はこれで十分です。
              </p>

              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  月5通まで請求書作成
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  AI自動作成エンジン
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  インボイス制度完全対応
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  PDFダウンロード
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  取引先5社まで登録
                </li>
              </ul>

              <a href="./signup" className="pricing-btn pricing-btn--free" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>無料で始める</a>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card pricing-card--pro fade-in stagger-2">
              <div className="pricing-popular-tag">一番人気</div>
              <div className="pricing-plan-name">Pro</div>
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
                請求書を6通以上発行する方、または法人・チームでお使いの方に。
              </p>

              <div className="pricing-comparison">
                <span className="pricing-comparison-text">
                  他社の請求書ソフトは月3,000〜5,000円が相場。<br />
                  <strong>ラクダなら約1/3の価格です。</strong>
                </span>
              </div>

              <ul className="pricing-features">
                <li className="pricing-feature-item pricing-feature-item--highlight">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <strong>無制限</strong>の請求書作成
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  Freeプランの全機能
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  定期請求の自動化
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  入金ステータス管理
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  カスタムテンプレート
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  会計ソフト連携（freee/MF/弥生）
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5.5l2.5 2L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  優先サポート（24時間以内返信）
                </li>
              </ul>

              <a href="./signup" className="pricing-btn pricing-btn--pro" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Proプランを始める</a>
            </div>
          </div>

          <p className="pricing-footnote fade-in">
            全プランにインボイス制度対応が含まれます。契約期間の縛りなし。いつでもキャンセル可能。
          </p>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="testimonials" id="testimonials">
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">User Voice</span>
            <h2 className="section-title">使っている人の声</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-card fade-in stagger-${i + 1}`}>
                <blockquote className="testimonial-text">&ldquo;{t.text}&rdquo;</blockquote>
                <div className="testimonial-author">
                  <span className="testimonial-avatar">{t.initial}</span>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="faq" id="faq">
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">よくある質問</h2>
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
            次の月末は、<br className="hide-pc" />
            <span className="cta-title-accent">27秒</span>で終わらせましょう。
          </h2>
          <p className="cta-desc fade-in">
            4,200社が使い始めています。無料プランならリスクゼロで試せます。
          </p>

          <div className="cta-actions fade-in">
            <a href="./signup" className="btn-primary btn-primary--large btn-primary--glow">
              無料で始める
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="./book-call" className="btn-ghost">
              導入相談を予約
            </a>
          </div>

          <div className="cta-trust fade-in">
            <span>クレカ不要</span>
            <span className="cta-trust-dot" aria-hidden="true" />
            <span>30秒で登録</span>
            <span className="cta-trust-dot" aria-hidden="true" />
            <span>いつでもキャンセル</span>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L4 16h3l1.5-4h3L13 16h3L9 2zm0 4.5L10.5 11h-3L9 6.5z" fill="currentColor"/>
                  </svg>
                </span>
                <span>ラクダ<span className="logo-accent">Invoice</span></span>
              </div>
              <p className="footer-brand-desc">
                AIで請求書業務をシンプルに。
                <br />
                フリーランスから法人まで、すべてのビジネスに。
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">プロダクト</h4>
              <ul className="footer-links">
                <li><a href="#features" className="footer-link">機能一覧</a></li>
                <li><a href="#pricing" className="footer-link">料金プラン</a></li>
                <li><a href="#" className="footer-link">APIドキュメント</a></li>
                <li><a href="#" className="footer-link">アップデート情報</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">サポート</h4>
              <ul className="footer-links">
                <li><a href="#faq" className="footer-link">よくある質問</a></li>
                <li><a href="./book-call" className="footer-link">導入相談を予約</a></li>
                <li><a href="#" className="footer-link">ヘルプセンター</a></li>
                <li><a href="#" className="footer-link">サービスステータス</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">会社情報</h4>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">運営会社</a></li>
                <li><a href="./security" className="footer-link">セキュリティ</a></li>
                <li><a href="#" className="footer-link">採用情報</a></li>
                <li><a href="#" className="footer-link">ブログ</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">&copy; 2026 ラクダInvoice. All rights reserved.</p>
            <div className="footer-legal">
              <a href="./terms" className="footer-legal-link">利用規約</a>
              <a href="./privacy" className="footer-legal-link">プライバシーポリシー</a>
              <a href="./tokushoho" className="footer-legal-link">特定商取引法に基づく表記</a>
              <a href="./security" className="footer-legal-link">セキュリティ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
