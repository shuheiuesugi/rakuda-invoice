"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   FAQ data
   ───────────────────────────────────────────── */
const faqData = [
  {
    q: "無料プランでも請求書の品質は同じですか？",
    a: "はい、無料プランでもProプランと同じAIエンジンを使用しており、生成される請求書の品質に差はありません。無料プランは月5通までの発行制限のみです。",
  },
  {
    q: "インボイス制度の登録番号は自動で記載されますか？",
    a: "初回設定で適格請求書発行事業者の登録番号（T+13桁）を入力いただければ、以降すべての請求書に自動記載されます。税率ごとの消費税額の内訳表示もインボイス制度に完全準拠しています。",
  },
  {
    q: "既存の会計ソフトとの連携は可能ですか？",
    a: "freee・マネーフォワードクラウド・弥生会計との連携に対応しています。発行した請求書データをCSV形式で一括エクスポートすることも可能です。",
  },
  {
    q: "途中でプランを変更できますか？",
    a: "いつでも変更可能です。無料プランからProプランへのアップグレードは即時反映され、日割り計算で請求されます。ダウングレードは次の請求サイクルから適用されます。",
  },
  {
    q: "請求書のデザインはカスタマイズできますか？",
    a: "ロゴ・社名・住所・振込先情報を自由に設定できるほか、カラーテーマの変更にも対応しています。Proプランでは完全カスタムテンプレートの作成も可能です。",
  },
  {
    q: "セキュリティ対策について教えてください",
    a: "すべてのデータはAES-256で暗号化され、AWS東京リージョンで保管されています。通信はTLS 1.3で保護。SOC 2 Type II認証を取得済みです。",
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
  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{question}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-answer" role="region">
        <div className="faq-answer-inner">{answer}</div>
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = node.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right");
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

  const sectionRef = useScrollFadeIn();

  /* Stats counters */
  const stat1 = useCountUp(30);
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
  const toggleFaq = useCallback(
    (idx: number) => {
      setOpenFaq((prev) => (prev === idx ? null : idx));
    },
    []
  );

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
            <span className="header-logo-icon">R</span>
            <span>ラクダInvoice</span>
          </a>

          <nav className="header-nav">
            <a href="#features" className="header-nav-link">
              機能
            </a>
            <a href="#pricing" className="header-nav-link">
              料金
            </a>
            <a href="#faq" className="header-nav-link">
              よくある質問
            </a>
            <a href="#cta" className="header-cta">
              無料で始める
            </a>
          </nav>

          <button
            className="mobile-menu-btn"
            aria-label="メニュー"
            style={{ display: "none" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" id="hero">
        <div className="hero-grid-bg" aria-hidden="true" />

        <div className="hero-inner">
          {/* Left: text */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              2026年インボイス制度 完全対応
            </div>

            <h1 className="hero-title">
              請求書を、
              <br />
              <span className="hero-title-accent">30秒で。</span>
            </h1>

            <p className="hero-subtitle">
              取引先名と金額を入力するだけ。AIが品目・税率・レイアウトを自動判定し、
              インボイス制度に準拠した請求書をその場で生成します。
            </p>

            <div className="hero-actions">
              <a href="#cta" className="btn-primary">
                無料アカウント作成
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#flow" className="btn-secondary-dark">
                使い方を見る
              </a>
            </div>

            <p className="hero-note">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v12M1 7h12"
                  stroke="#64748B"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              クレジットカード不要・30秒で登録完了
            </p>
          </div>

          {/* Right: mockup */}
          <div className="hero-mockup">
            <div className="mockup-float-card" aria-hidden="true">
              <div className="float-card-label">作成時間</div>
              <div className="float-card-value">27秒</div>
            </div>

            <div className="invoice-mockup">
              <div className="mockup-header">
                <div>
                  <div className="mockup-title-text">請求書</div>
                  <div className="mockup-invoice-no">INV-2026-0342</div>
                </div>
                <div className="mockup-status">
                  <span className="mockup-status-dot" />
                  AI生成中
                </div>
              </div>

              {/* Table header */}
              <div className="mockup-row mockup-row--header">
                <span className="mockup-row-item">品目</span>
                <span className="mockup-row-qty">数量</span>
                <span className="mockup-row-price">単価</span>
                <span className="mockup-row-total">金額</span>
              </div>

              {/* Rows */}
              <div className="mockup-row">
                <span className="mockup-row-item">Webアプリ開発</span>
                <span className="mockup-row-qty">1</span>
                <span className="mockup-row-price">800,000</span>
                <span className="mockup-row-total">800,000</span>
              </div>
              <div className="mockup-row">
                <span className="mockup-row-item">UI/UXデザイン</span>
                <span className="mockup-row-qty">1</span>
                <span className="mockup-row-price">350,000</span>
                <span className="mockup-row-total">350,000</span>
              </div>
              <div className="mockup-row">
                <span className="mockup-row-item">サーバー運用保守（月額）</span>
                <span className="mockup-row-qty">3</span>
                <span className="mockup-row-price">50,000</span>
                <span className="mockup-row-total">150,000</span>
              </div>

              {/* Footer */}
              <div className="mockup-footer">
                <div>
                  <div className="mockup-tax-label">消費税（10%）</div>
                  <div className="mockup-tax-detail">
                    T1234567890123
                  </div>
                </div>
                <div>
                  <div className="mockup-total-label">ご請求金額（税込）</div>
                  <div className="mockup-total-amount">&yen;1,430,000</div>
                </div>
              </div>

              <div className="mockup-ai-badge" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 1l1.5 3.5L11 6l-3.5 1.5L6 11 4.5 7.5 1 6l3.5-1.5L6 1z"
                    fill="currentColor"
                  />
                </svg>
                AIが自動生成
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat-item" ref={stat1.ref}>
            <div className="stat-number">
              {stat1.count}
              <span className="stat-unit">秒</span>
            </div>
            <div className="stat-label">平均作成時間</div>
          </div>
          <div className="stat-item" ref={stat2.ref}>
            <div className="stat-number">
              {formatNumber(stat2.count)}
              <span className="stat-unit">通</span>
            </div>
            <div className="stat-label">累計発行数</div>
          </div>
          <div className="stat-item" ref={stat3.ref}>
            <div className="stat-number">
              {stat3.count}
              <span className="stat-unit">%</span>
            </div>
            <div className="stat-label">インボイス準拠率</div>
          </div>
          <div className="stat-item" ref={stat4.ref}>
            <div className="stat-number">
              {formatNumber(stat4.count)}
              <span className="stat-unit">社</span>
            </div>
            <div className="stat-label">導入企業数</div>
          </div>
        </div>
      </section>

      {/* ═══════════ FLOW ═══════════ */}
      <section className="flow" id="flow">
        <div className="section-container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-bar" />
              How it works
            </div>
            <h2 className="section-title">3ステップで請求書が完成</h2>
            <p className="section-desc">
              面倒な入力はAIにおまかせ。必要なのは取引先と金額だけです。
            </p>
          </div>

          <div className="flow-steps">
            <div className="flow-step fade-in stagger-1">
              <div className="flow-step-number flow-step-number--blue">01</div>
              <span className="flow-step-icon" role="img" aria-label="入力">
                &#9997;&#65039;
              </span>
              <h3 className="flow-step-title">情報を入力</h3>
              <p className="flow-step-desc">
                取引先名・金額・支払期日を入力。過去の取引データから候補を自動サジェストします。
              </p>
              <span className="flow-step-time">~ 10秒</span>
            </div>

            <div className="flow-step fade-in stagger-2">
              <div className="flow-step-number flow-step-number--purple">02</div>
              <span className="flow-step-icon" role="img" aria-label="AI">
                &#9889;
              </span>
              <h3 className="flow-step-title">AIが自動生成</h3>
              <p className="flow-step-desc">
                品目の分類・税率判定・レイアウト調整をAIが実行。登録番号も自動で記載されます。
              </p>
              <span className="flow-step-time">~ 15秒</span>
            </div>

            <div className="flow-step fade-in stagger-3">
              <div className="flow-step-number flow-step-number--green">03</div>
              <span className="flow-step-icon" role="img" aria-label="送信">
                &#128640;
              </span>
              <h3 className="flow-step-title">確認して送付</h3>
              <p className="flow-step-desc">
                プレビューを確認し、ワンクリックでPDFダウンロードまたはメール送信が可能です。
              </p>
              <span className="flow-step-time">~ 5秒</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section className="features" id="features">
        <div className="section-container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-bar" />
              Features
            </div>
            <h2 className="section-title">すべてが揃った請求書プラットフォーム</h2>
            <p className="section-desc">
              作成から入金管理まで。経理業務をまるごとシンプルにします。
            </p>
          </div>

          <div className="features-grid">
            {/* Card 1 - wide (7col) */}
            <div className="feature-card feature-card--span7 feature-card--highlight fade-in stagger-1">
              <div className="feature-icon feature-icon--blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"
                    stroke="#60A5FA"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">AI自動作成</h3>
              <p className="feature-desc">
                取引先名と金額を入力するだけで、AIが品目分類・税率・レイアウトを自動判定。
                過去の取引パターンを学習し、繰り返し入力を97%削減します。
                手入力によるミスを防ぎ、経理担当者の作業時間を月平均12.4時間短縮。
              </p>
              <span className="feature-tag feature-tag--popular">人気No.1</span>
            </div>

            {/* Card 2 - narrow (5col) */}
            <div className="feature-card feature-card--span5 fade-in stagger-2">
              <div className="feature-icon feature-icon--green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="#34D399"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="4"
                    stroke="#34D399"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <h3 className="feature-title">インボイス制度対応</h3>
              <p className="feature-desc">
                適格請求書の要件を満たすフォーマットを自動適用。登録番号・税率別消費税額の
                内訳表示など、制度要件を漏れなくカバーします。
              </p>
              <span className="feature-tag feature-tag--new">制度準拠</span>
            </div>

            {/* Card 3 (4col) */}
            <div className="feature-card feature-card--span4 fade-in stagger-3">
              <div className="feature-icon feature-icon--purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
                    stroke="#818CF8"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2v6h6"
                    stroke="#818CF8"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">PDF一括生成</h3>
              <p className="feature-desc">
                複数の請求書をまとめてPDF化。ダウンロードもメール送信もワンクリック。
              </p>
            </div>

            {/* Card 4 (4col) */}
            <div className="feature-card feature-card--span4 fade-in stagger-4">
              <div className="feature-icon feature-icon--amber">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 8v4l3 3"
                    stroke="#FBBF24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#FBBF24"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <h3 className="feature-title">定期請求</h3>
              <p className="feature-desc">
                毎月の請求を自動化。スケジュール設定で、指定日にPDF生成&メール送信。
              </p>
            </div>

            {/* Card 5 (4col) */}
            <div className="feature-card feature-card--span4 fade-in stagger-5">
              <div className="feature-icon feature-icon--rose">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                    stroke="#FB7185"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="#FB7185"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    stroke="#FB7185"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-title">取引先管理</h3>
              <p className="feature-desc">
                取引先情報を一元管理。住所・口座情報の変更も全請求書に即時反映。
              </p>
            </div>

            {/* Card 6 - full width */}
            <div className="feature-card feature-card--span12 fade-in stagger-6">
              <div className="feature-card--wide-inner">
                <div className="feature-icon feature-icon--teal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
                      stroke="#2DD4BF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="4" stroke="#2DD4BF" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="feature-title">入金ステータス管理</h3>
                  <p className="feature-desc">
                    請求書ごとの入金状況をリアルタイムで把握。未入金アラートで回収漏れを防止し、
                    売掛金の管理をダッシュボードで可視化します。銀行口座との自動照合機能で、
                    入金消込の手間を大幅に削減します。
                  </p>
                  <span className="feature-tag feature-tag--new">NEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ COMPLIANCE ═══════════ */}
      <section className="compliance" id="compliance">
        <div className="section-container">
          <div className="compliance-inner">
            {/* Left: text */}
            <div className="compliance-content fade-in-left">
              <div className="compliance-badge">
                <span className="compliance-badge-icon">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                インボイス制度対応済み
              </div>

              <h2 className="compliance-title">
                面倒な制度対応、
                <br />
                すべて自動で。
              </h2>

              <p className="compliance-desc">
                2023年10月施行のインボイス制度（適格請求書等保存方式）に完全対応。
                登録番号の自動記載から税率別消費税額の計算まで、制度要件を漏れなく満たした請求書を生成します。
              </p>

              <ul className="compliance-list">
                <li className="compliance-list-item">
                  <span className="compliance-check">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>適格請求書発行事業者の登録番号を自動記載</span>
                </li>
                <li className="compliance-list-item">
                  <span className="compliance-check">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>税率ごとの消費税額を内訳表示（8%・10%対応）</span>
                </li>
                <li className="compliance-list-item">
                  <span className="compliance-check">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>端数処理は税率ごとに1回（国税庁ルール準拠）</span>
                </li>
                <li className="compliance-list-item">
                  <span className="compliance-check">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>電子帳簿保存法の保存要件に対応した電子データ管理</span>
                </li>
              </ul>
            </div>

            {/* Right: visual card */}
            <div className="compliance-visual fade-in-right">
              <div className="compliance-card">
                <div className="compliance-card-header">
                  <span className="compliance-card-title">適格請求書フォーマット</span>
                  <span className="compliance-card-status">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <circle cx="4" cy="4" r="4" fill="#34D399" />
                    </svg>
                    準拠
                  </span>
                </div>

                <div className="compliance-field">
                  <span className="compliance-field-label">登録番号</span>
                  <span className="compliance-field-value">T1234567890123</span>
                </div>
                <div className="compliance-field">
                  <span className="compliance-field-label">適用税率</span>
                  <span className="compliance-field-value">10% / 8%</span>
                </div>
                <div className="compliance-field">
                  <span className="compliance-field-label">税額（10%対象）</span>
                  <span className="compliance-field-value">&yen;130,000</span>
                </div>
                <div className="compliance-field">
                  <span className="compliance-field-label">税額（8%対象）</span>
                  <span className="compliance-field-value">&yen;0</span>
                </div>
                <div className="compliance-field">
                  <span className="compliance-field-label">端数処理</span>
                  <span className="compliance-field-value">切捨て</span>
                </div>
              </div>

              <div className="compliance-stamp" aria-hidden="true">
                <span className="compliance-stamp-text">
                  適格
                  <br />
                  請求書
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
            <div className="section-label">
              <span className="section-label-bar" />
              Pricing
            </div>
            <h2 className="section-title">シンプルな料金体系</h2>
            <p className="section-desc">
              まずは無料プランで試してみてください。必要に応じていつでもアップグレード可能です。
            </p>
          </div>

          <div className="pricing-grid">
            {/* Free Plan */}
            <div className="pricing-card fade-in stagger-1">
              <div className="pricing-plan">Free</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">0</span>
              </div>
              <div className="pricing-period">ずっと無料</div>
              <p className="pricing-desc">
                個人事業主やフリーランスの方に。月5通まで無料で請求書を作成できます。
              </p>

              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--free">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  月5通まで請求書作成
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--free">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  AI自動作成
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--free">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  インボイス制度対応
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--free">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  PDFダウンロード
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--free">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  取引先5社まで登録
                </li>
              </ul>

              <button className="pricing-btn pricing-btn--free">無料で始める</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card pricing-card--pro fade-in stagger-2">
              <div className="pricing-popular">一番人気</div>
              <div className="pricing-plan">Pro</div>
              <div className="pricing-price">
                <span className="pricing-currency">&yen;</span>
                <span className="pricing-amount">980</span>
                <span className="pricing-period">/月</span>
              </div>
              <div className="pricing-period" style={{ marginTop: "2px" }}>年払いなら&yen;9,800/年（2ヶ月分お得）</div>
              <p className="pricing-desc">
                法人・チームでの利用に最適。請求書の発行数が無制限になります。
              </p>

              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <strong>無制限</strong>の請求書作成
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Freeプランの全機能
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  定期請求の自動化
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  入金ステータス管理
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  カスタムテンプレート
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  会計ソフト連携（CSV/API）
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--pro">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2L6.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  優先サポート
                </li>
              </ul>

              <button className="pricing-btn pricing-btn--pro">Proプランを始める</button>
            </div>
          </div>

          <p className="pricing-note fade-in">
            すべてのプランにインボイス制度対応が含まれます。契約期間の縛りはありません。
          </p>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="faq" id="faq">
        <div className="section-container">
          <div className="section-header fade-in">
            <div className="section-label">
              <span className="section-label-bar" />
              FAQ
            </div>
            <h2 className="section-title">よくある質問</h2>
            <p className="section-desc">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="faq-list">
            {faqData.map((item, idx) => (
              <div key={idx} className="fade-in" style={{ transitionDelay: `${0.05 + idx * 0.06}s` }}>
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
        <div className="cta-inner">
          <h2 className="cta-title fade-in">
            請求書業務、今日から変えませんか？
          </h2>
          <p className="cta-desc fade-in">
            4,200社以上が導入済み。無料プランで今すぐ始められます。
            <br />
            クレジットカードの登録は不要です。
          </p>

          <div className="cta-actions fade-in">
            <a href="#" className="btn-primary">
              無料で始める
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10m0 0L9 4m4 4L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#" className="btn-secondary-dark">
              お問い合わせ
            </a>
          </div>

          <p className="cta-note fade-in">
            30秒で登録完了 &middot; いつでもキャンセル可能
          </p>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">R</span>
                <span>ラクダInvoice</span>
              </div>
              <p className="footer-brand-desc">
                AIで請求書業務をシンプルに。
                <br />
                フリーランスから法人まで、
                <br />
                すべてのビジネスに。
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">プロダクト</h4>
              <ul className="footer-links">
                <li>
                  <a href="#features" className="footer-link">
                    機能一覧
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="footer-link">
                    料金プラン
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    API ドキュメント
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    アップデート情報
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">サポート</h4>
              <ul className="footer-links">
                <li>
                  <a href="#faq" className="footer-link">
                    よくある質問
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    ヘルプセンター
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    ステータス
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">会社情報</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    運営会社
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    採用情報
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    ブログ
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    セキュリティ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; 2026 ラクダInvoice. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#" className="footer-legal-link">
                利用規約
              </a>
              <a href="#" className="footer-legal-link">
                プライバシーポリシー
              </a>
              <a href="#" className="footer-legal-link">
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
