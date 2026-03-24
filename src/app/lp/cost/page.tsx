"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────
   FAQ data (cost-focused)
   ───────────────────────────────────────────── */
const faqData = [
  {
    q: "本当に月額980円ですか？追加料金は？",
    a: "はい、月額980円（税込）で請求書は無制限に作成できます。追加料金や隠れた手数料は一切ありません。年払いの場合は9,800円/年で、2ヶ月分おトクになります。",
  },
  {
    q: "無料プランの制限は？",
    a: "無料プランでは月5通まで請求書を発行できます。AI自動作成・インボイス制度対応・PDFダウンロードなど、機能面の制限はありません。有料プランと同じ品質の請求書を作成できます。",
  },
  {
    q: "freeeやマネーフォワードより安いけど機能は大丈夫？",
    a: "ご安心ください。AI自動作成エンジン、インボイス制度完全対応、PDF一括生成、定期請求の自動化、取引先マスタ管理、入金ステータス管理など、請求書業務に必要な機能をすべて搭載しています。むしろAIによる自動化で、他社にない利便性を提供しています。",
  },
  {
    q: "途中でプラン変更できますか？",
    a: "いつでも変更できます。アップグレードは即時反映（日割り計算）、ダウングレードは次回請求サイクルから適用されます。契約期間の縛りもありません。",
  },
  {
    q: "解約金はかかりますか？",
    a: "解約金は一切かかりません。いつでもワンクリックで解約でき、解約後も請求期間の終了まで全機能をご利用いただけます。データのエクスポートも無料です。",
  },
];

/* ─────────────────────────────────────────────
   Cost comparison data
   ───────────────────────────────────────────── */
const comparisonData = [
  {
    feature: "月額料金",
    rakuda: "980円",
    freee: "~3,980円",
    mf: "~3,278円",
    billone: "~10,000円",
  },
  {
    feature: "請求書作成数",
    rakuda: "無制限",
    freee: "無制限",
    mf: "無制限",
    billone: "無制限",
  },
  {
    feature: "AI自動作成",
    rakuda: true,
    freee: false,
    mf: false,
    billone: false,
  },
  {
    feature: "インボイス対応",
    rakuda: true,
    freee: true,
    mf: true,
    billone: true,
  },
  {
    feature: "会計ソフト連携",
    rakuda: true,
    freee: true,
    mf: true,
    billone: true,
  },
  {
    feature: "入金管理",
    rakuda: true,
    freee: true,
    mf: true,
    billone: true,
  },
  {
    feature: "定期請求自動化",
    rakuda: true,
    freee: true,
    mf: true,
    billone: true,
  },
  {
    feature: "無料プラン",
    rakuda: true,
    freee: false,
    mf: false,
    billone: false,
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
   Check / Cross Icon helpers
   ───────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#D1FAE5" />
      <path d="M5 8l2 2 4-4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#F3F4F6" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Cost LP Page Component
   ───────────────────────────────────────────── */
export default function CostLP() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionRef = useScrollFadeIn();

  /* ROI counter */
  const roiHours = useCountUp(24);
  const roiSeconds = useCountUp(27);

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
            <a href="#cost-compare" className="header-nav-link">コスト比較</a>
            <a href="#features" className="header-nav-link">機能</a>
            <a href="#pricing" className="header-nav-link">料金</a>
            <a href="#faq" className="header-nav-link">FAQ</a>
            <a href="../signup" className="header-cta">
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
            <a href="#cost-compare" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>コスト比較</a>
            <a href="#features" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>機能</a>
            <a href="#pricing" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>料金</a>
            <a href="#faq" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="../signup" className="mobile-menu-cta" onClick={() => setMobileMenuOpen(false)}>無料で始める</a>
          </div>
        )}
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" id="hero">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-glow hero-glow--1" aria-hidden="true" />
        <div className="hero-glow hero-glow--2" aria-hidden="true" />

        <div className="hero-inner" style={{ gridTemplateColumns: "1fr", maxWidth: "720px", textAlign: "center" }}>
          <div className="hero-content" style={{ maxWidth: "100%", margin: "0 auto" }}>
            <div className="hero-badge fade-in" style={{ justifyContent: "center" }}>
              <span className="hero-badge-dot" aria-hidden="true" />
              他社の約1/3の価格で請求書を無制限に
            </div>

            <h1 className="hero-title fade-in">
              <span className="hero-title-sub">月末の請求書、もう高いソフトは要らない。</span>
              <span className="hero-title-main">
                <span className="hero-title-accent">月額980円で、無制限。</span>
              </span>
            </h1>

            <p className="hero-subtitle fade-in" style={{ maxWidth: "100%", margin: "0 auto 32px" }}>
              他の請求書ソフトは月3,000〜5,000円。ラクダInvoiceならその1/3の価格で、
              <br className="hide-sp" />
              AI自動作成・インボイス対応・入金管理まで、すべて揃います。
            </p>

            <div className="hero-actions fade-in" style={{ justifyContent: "center" }}>
              <a href="../signup" className="btn-primary btn-primary--large">
                無料アカウントを作成
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#cost-compare" className="btn-ghost">
                コスト比較を見る
              </a>
            </div>

            <div className="hero-trust fade-in" style={{ justifyContent: "center" }}>
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                他社の約1/3の価格
              </span>
              <span className="hero-trust-divider" aria-hidden="true" />
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                クレカ不要
              </span>
              <span className="hero-trust-divider" aria-hidden="true" />
              <span className="hero-trust-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l3 3 5-5" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                月5通まで永久無料
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ COST COMPARISON TABLE ═══════════ */}
      <section className="features" id="cost-compare" style={{ padding: "96px 0 88px" }}>
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">Cost Comparison</span>
            <h2 className="section-title">
              同じ機能で、この価格差。<br className="hide-sp" />
              乗り換えない理由がありません。
            </h2>
            <p className="section-desc">
              主要な請求書ソフトと機能・価格を徹底比較しました。
            </p>
          </div>

          <div className="fade-in" style={{ overflowX: "auto", margin: "0 auto", maxWidth: "860px" }}>
            <table style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              fontSize: "0.85rem",
              lineHeight: 1.6,
            }}>
              <thead>
                <tr>
                  <th style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "var(--c-ink-muted)",
                    fontSize: "0.78rem",
                    borderBottom: "2px solid var(--c-border)",
                    background: "var(--c-surface-sunken)",
                    borderRadius: "var(--radius-md) 0 0 0",
                    minWidth: "120px",
                  }}>
                    機能
                  </th>
                  <th style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "var(--c-primary)",
                    fontSize: "0.85rem",
                    borderBottom: "2px solid var(--c-primary)",
                    background: "var(--c-primary-subtle)",
                    minWidth: "130px",
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                      <span>ラクダInvoice</span>
                      <span style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        background: "var(--c-primary)",
                        color: "#fff",
                        borderRadius: "10px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                      }}>おすすめ</span>
                    </div>
                  </th>
                  <th style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: 600,
                    color: "var(--c-ink-secondary)",
                    fontSize: "0.82rem",
                    borderBottom: "2px solid var(--c-border)",
                    background: "var(--c-surface-sunken)",
                    minWidth: "110px",
                  }}>
                    freee
                  </th>
                  <th style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: 600,
                    color: "var(--c-ink-secondary)",
                    fontSize: "0.82rem",
                    borderBottom: "2px solid var(--c-border)",
                    background: "var(--c-surface-sunken)",
                    minWidth: "130px",
                  }}>
                    マネーフォワード
                  </th>
                  <th style={{
                    padding: "14px 16px",
                    textAlign: "center",
                    fontWeight: 600,
                    color: "var(--c-ink-secondary)",
                    fontSize: "0.82rem",
                    borderBottom: "2px solid var(--c-border)",
                    background: "var(--c-surface-sunken)",
                    borderRadius: "0 var(--radius-md) 0 0",
                    minWidth: "110px",
                  }}>
                    Bill One
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td style={{
                      padding: "13px 16px",
                      fontWeight: 600,
                      color: "var(--c-ink)",
                      borderBottom: "1px solid var(--c-border-light)",
                      fontSize: "0.84rem",
                    }}>
                      {row.feature}
                    </td>
                    <td style={{
                      padding: "13px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--c-border-light)",
                      background: "rgba(239, 246, 255, 0.5)",
                      fontWeight: i === 0 ? 800 : 500,
                      color: i === 0 ? "var(--c-primary)" : "var(--c-ink)",
                      fontSize: i === 0 ? "1rem" : "0.85rem",
                    }}>
                      {typeof row.rakuda === "boolean" ? (
                        row.rakuda ? <CheckIcon /> : <CrossIcon />
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                          {row.rakuda}
                        </span>
                      )}
                    </td>
                    <td style={{
                      padding: "13px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--c-border-light)",
                      color: i === 0 ? "var(--c-ink-secondary)" : "var(--c-ink-secondary)",
                      fontWeight: i === 0 ? 600 : 400,
                      fontSize: "0.84rem",
                    }}>
                      {typeof row.freee === "boolean" ? (
                        row.freee ? <CheckIcon /> : <CrossIcon />
                      ) : (
                        row.freee
                      )}
                    </td>
                    <td style={{
                      padding: "13px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--c-border-light)",
                      color: "var(--c-ink-secondary)",
                      fontWeight: i === 0 ? 600 : 400,
                      fontSize: "0.84rem",
                    }}>
                      {typeof row.mf === "boolean" ? (
                        row.mf ? <CheckIcon /> : <CrossIcon />
                      ) : (
                        row.mf
                      )}
                    </td>
                    <td style={{
                      padding: "13px 16px",
                      textAlign: "center",
                      borderBottom: "1px solid var(--c-border-light)",
                      color: "var(--c-ink-secondary)",
                      fontWeight: i === 0 ? 600 : 400,
                      fontSize: "0.84rem",
                    }}>
                      {typeof row.billone === "boolean" ? (
                        row.billone ? <CheckIcon /> : <CrossIcon />
                      ) : (
                        row.billone
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="pricing-footnote fade-in" style={{ marginTop: "20px" }}>
            ※ 他社の料金は2026年3月時点の公開情報に基づく参考価格です。プランやオプションにより変動する場合があります。
          </p>
        </div>
      </section>

      {/* ═══════════ ROI SECTION ═══════════ */}
      <section className="flow" id="roi" style={{ padding: "96px 0" }}>
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">Time Saved</span>
            <h2 className="section-title">
              月末2時間 → 27秒に。<br className="hide-sp" />
              年間24時間を取り戻す。
            </h2>
            <p className="section-desc">
              手作業にかけていた時間を、本業に使いませんか。
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "24px",
            maxWidth: "720px",
            margin: "0 auto",
            alignItems: "center",
          }} className="fade-in">
            {/* Before */}
            <div style={{
              background: "var(--c-surface)",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--radius-xl)",
              padding: "32px 24px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--c-ink-muted)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.06em",
                marginBottom: "12px",
              }}>Before</div>
              <div style={{
                fontSize: "2.4rem",
                fontWeight: 800,
                color: "var(--c-ink)",
                fontFamily: "var(--font-mono)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}>2<span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--c-ink-muted)", marginLeft: "4px" }}>時間</span></div>
              <div style={{
                fontSize: "0.78rem",
                color: "var(--c-ink-muted)",
                marginTop: "8px",
              }}>Excel手打ち / 毎月</div>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: "center", color: "var(--c-accent)" }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M8 16h16m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* After */}
            <div style={{
              background: "linear-gradient(135deg, var(--c-primary-subtle) 0%, var(--c-surface) 60%)",
              border: "2px solid var(--c-primary)",
              borderRadius: "var(--radius-xl)",
              padding: "32px 24px",
              textAlign: "center",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "2px 12px",
                background: "var(--c-primary)",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "0.65rem",
                fontWeight: 700,
                whiteSpace: "nowrap" as const,
              }}>ラクダInvoice</div>
              <div style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--c-primary)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.06em",
                marginBottom: "12px",
              }}>After</div>
              <div ref={roiSeconds.ref} style={{
                fontSize: "2.4rem",
                fontWeight: 800,
                color: "var(--c-primary)",
                fontFamily: "var(--font-mono)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}>{roiSeconds.count}<span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--c-accent)", marginLeft: "4px" }}>秒</span></div>
              <div style={{
                fontSize: "0.78rem",
                color: "var(--c-ink-muted)",
                marginTop: "8px",
              }}>AI自動作成 / 毎月</div>
            </div>
          </div>

          {/* Annual savings */}
          <div className="fade-in" style={{
            maxWidth: "480px",
            margin: "40px auto 0",
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "0.78rem",
              color: "var(--c-ink-muted)",
              fontWeight: 600,
              marginBottom: "8px",
            }}>年間で取り戻せる時間</div>
            <div ref={roiHours.ref} style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              fontFamily: "var(--font-mono)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}>
              <span style={{
                background: "linear-gradient(135deg, #60A5FA 0%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{roiHours.count}</span>
              <span style={{ fontSize: "1rem", fontWeight: 600, color: "var(--c-ink-muted)", marginLeft: "6px" }}>時間</span>
            </div>
            <div style={{
              fontSize: "0.82rem",
              color: "var(--c-ink-secondary)",
              marginTop: "8px",
              lineHeight: 1.6,
            }}>
              毎月2時間 × 12ヶ月 = <strong style={{ color: "var(--c-ink)" }}>24時間</strong>を本業に充てられます
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
              安いのに高機能。<br className="hide-sp" />
              コスト削減と業務効率化を同時に。
            </h2>
          </div>

          <div className="features-grid">
            {/* AI auto-generation */}
            <div className="feature-card feature-card--primary fade-in stagger-1">
              <div className="feature-icon-wrap feature-icon-wrap--blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="feature-content">
                <span className="feature-badge feature-badge--hot">他社にない機能</span>
                <h3 className="feature-title">AI自動作成エンジン</h3>
                <p className="feature-desc">
                  取引先名と金額を入力するだけで、品目・税率・レイアウトをAIが自動判定。
                  月3,000円以上する他社ツールにも搭載されていない独自機能で、作業時間を<strong>97%削減</strong>します。
                </p>
              </div>
            </div>

            {/* Invoice compliance */}
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
                  高額なソフトと同じレベルの法令対応。登録番号・税率別消費税額・端数処理まで自動で完璧にカバーします。
                </p>
              </div>
            </div>

            {/* PDF batch */}
            <div className="feature-card fade-in stagger-3">
              <div className="feature-icon-wrap feature-icon-wrap--purple">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M13 2H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M13 2v5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">PDF一括生成</h3>
              <p className="feature-desc">
                複数の請求書をまとめてPDF化。まとめてメール送信もワンクリックで完了します。
              </p>
            </div>

            {/* Recurring billing */}
            <div className="feature-card fade-in stagger-4">
              <div className="feature-icon-wrap feature-icon-wrap--amber">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">定期請求の自動化</h3>
              <p className="feature-desc">
                毎月のルーティン請求を設定すれば、PDF生成からメール送信まで全自動。月末の作業がゼロに。
              </p>
            </div>

            {/* Client management */}
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

            {/* Payment tracking */}
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
                未入金アラートで回収漏れを防止。銀行口座との自動照合で消込の手間も削減します。
              </p>
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
              他社の1/3の価格。<br className="hide-sp" />
              それなのに機能は妥協ゼロ。
            </h2>
            <p className="section-desc">
              まずは無料で試して、納得してからアップグレード。
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

              <a href="../signup?plan=free" className="pricing-btn pricing-btn--free" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>無料で始める</a>
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
                  freeeは月~3,980円、マネーフォワードは月~3,278円。<br />
                  <strong>ラクダInvoiceなら月980円で全機能が使えます。</strong>
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

              <a href="../signup?plan=pro" className="pricing-btn pricing-btn--pro" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Proプランを始める</a>
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
            全プランにインボイス制度対応が含まれます。契約期間の縛りなし。解約金なし。いつでもキャンセル可能。
          </p>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="faq" id="faq">
        <div className="section-container">
          <div className="section-header fade-in">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">料金についてよくある質問</h2>
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
            まずは無料で<br className="hide-pc" />
            試してみませんか？
          </h2>
          <p className="cta-desc fade-in">
            月5通までずっと無料。クレカ登録も不要です。<br />
            気に入ったら月額980円で無制限に。
          </p>

          <div className="cta-actions fade-in">
            <a href="../signup" className="btn-primary btn-primary--large btn-primary--glow">
              無料で始める
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 9h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="../book-call" className="btn-ghost">
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
