"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ============================================================
   Rakuda Invoice Landing Page — V10 Overhaul
   invoice.rakuda-ai.com
   ============================================================ */

// ─── Scroll animation hook ─────────────────────────────────
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const elements = document.querySelectorAll(
      ".fade-up, .fade-in, .slide-left, .slide-right, .scale-in, .stagger-item"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ─── Scroll progress hook ───────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// ─── Counter animation hook ─────────────────────────────────
function useCountUp(
  target: number,
  duration: number = 2000,
  startOnView: boolean = true
) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started, startOnView]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}


// ─── SVG Icons ──────────────────────────────────────────────
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 7.5L10 12.5L15 7.5" />
    </svg>
  );
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8H13M9 4L13 8L9 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 5.5L4 7.5L8 3" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <path d="M9 18h6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22 6 12 13 2 6" />
    </svg>
  );
}

// ─── Live Demo Component ────────────────────────────────────
function LiveDemoAnimation() {
  const [step, setStep] = useState(0);
  const [typedClient, setTypedClient] = useState("");
  const [typedAmount, setTypedAmount] = useState("");
  const [aiFields, setAiFields] = useState(0);
  const [invoiceLines, setInvoiceLines] = useState(0);
  const [invoiceFaded, setInvoiceFaded] = useState(false);

  const clientName = "株式会社ABC";
  const amountText = "¥1,200,000";

  const invoiceContent = [
    { type: "header", text: "請求書" },
    { type: "blank", text: "" },
    { type: "meta", text: "請求書番号: INV-2026-0042" },
    { type: "meta", text: "発行日: 2026年4月1日" },
    { type: "meta", text: "T1234567890123" },
    { type: "blank", text: "" },
    { type: "section", text: "■ 株式会社ABC 御中" },
    { type: "blank", text: "" },
    { type: "row", text: "  コンサルティング業務  ¥1,200,000" },
    { type: "row", text: "  消費税 (10%)          ¥120,000" },
    { type: "blank", text: "" },
    { type: "total", text: "  合計（税込）          ¥1,320,000" },
    { type: "blank", text: "" },
    { type: "detail", text: "  振込先: 三菱UFJ銀行 渋谷支店" },
    { type: "detail", text: "  口座番号: 普通 1234567" },
    { type: "detail", text: "  支払期限: 2026年4月30日" },
  ];

  // Step timings
  useEffect(() => {
    const timings = [2500, 3000, 3000, 5000, 2000];
    const timer = setTimeout(() => {
      setStep((s) => (s + 1) % 5);
      setTypedClient("");
      setTypedAmount("");
      setAiFields(0);
      setInvoiceLines(0);
      setInvoiceFaded(false);
    }, timings[step]);
    return () => clearTimeout(timer);
  }, [step]);

  // Typewriter effect for step 0 (form input)
  useEffect(() => {
    if (step !== 0) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i <= clientName.length) {
        setTypedClient(clientName.slice(0, i));
      } else if (i - clientName.length <= amountText.length) {
        setTypedAmount(amountText.slice(0, i - clientName.length));
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [step]);

  // AI auto-complete animation for step 1
  useEffect(() => {
    if (step !== 1) return;
    const t1 = setTimeout(() => setAiFields(1), 600);
    const t2 = setTimeout(() => setAiFields(2), 1200);
    const t3 = setTimeout(() => setAiFields(3), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [step]);

  // Invoice typewriter for step 2
  useEffect(() => {
    if (step !== 2) return;
    const typewriterCount = 7;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setInvoiceLines(i);
      if (i >= typewriterCount) {
        clearInterval(interval);
        setTimeout(() => setInvoiceFaded(true), 300);
      }
    }, 280);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="live-demo-browser">
      {/* Browser chrome */}
      <div className="live-demo-chrome">
        <div className="live-demo-dots">
          <span className="live-demo-dot live-demo-dot--red" />
          <span className="live-demo-dot live-demo-dot--yellow" />
          <span className="live-demo-dot live-demo-dot--green" />
        </div>
        <div className="live-demo-url-bar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span>invoice.rakuda-ai.com</span>
        </div>
      </div>

      {/* Demo content */}
      <div className="live-demo-content">
        {/* Step 0: Form input — typing client + amount */}
        {step === 0 && (
          <div className="live-demo-step live-demo-step--visible">
            <div className="live-demo-search-screen">
              <div className="live-demo-logo-text">RAKUDAインボイス</div>
              <div className="live-demo-form-group">
                <div className="live-demo-form-label">取引先</div>
                <div className="live-demo-search-box live-demo-search-box--active">
                  <DocumentIcon />
                  <span className="live-demo-typed">{typedClient}<span className="live-demo-cursor" /></span>
                </div>
              </div>
              <div className="live-demo-form-group">
                <div className="live-demo-form-label">金額</div>
                <div className="live-demo-search-box" style={{ opacity: typedAmount ? 1 : 0.5 }}>
                  <span className="live-demo-typed">{typedAmount || "---"}</span>
                </div>
              </div>
              <div className="live-demo-form-group">
                <div className="live-demo-form-label">品目</div>
                <div className="live-demo-search-box" style={{ opacity: 0.5 }}>
                  <span>コンサルティング業務</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: AI auto-complete */}
        {step === 1 && (
          <div className="live-demo-step live-demo-step--visible">
            <div className="live-demo-research-screen">
              <div className="live-demo-research-title">AI自動補完中...</div>
              <div className="live-demo-spinner" />
              <div className="live-demo-sources">
                <div className={`live-demo-source-item ${aiFields >= 0 ? "live-demo-source-item--active" : ""} ${aiFields >= 1 ? "live-demo-source-item--done" : ""}`}>
                  <ShieldCheckIcon />
                  <span>インボイス番号を検証中...</span>
                  <span className="live-demo-source-count">{aiFields >= 1 ? "T1234..." : "--"}</span>
                </div>
                {aiFields >= 1 && (
                  <div className={`live-demo-source-item ${aiFields >= 1 ? "live-demo-source-item--active" : ""} ${aiFields >= 2 ? "live-demo-source-item--done" : ""}`} style={{ animation: "liveDemoFadeIn 0.3s ease forwards" }}>
                    <ChartIcon />
                    <span>{aiFields >= 2 ? "税率計算完了" : "消費税を自動計算中..."}</span>
                    <span className="live-demo-source-count">{aiFields >= 2 ? <CheckIcon /> : ""}</span>
                  </div>
                )}
                {aiFields >= 2 && (
                  <div className={`live-demo-source-item ${aiFields >= 2 ? "live-demo-source-item--active" : ""} ${aiFields >= 3 ? "live-demo-source-item--done" : ""}`} style={{ animation: "liveDemoFadeIn 0.3s ease forwards" }}>
                    <DocumentIcon />
                    <span>{aiFields >= 3 ? "振込先・支払条件セット完了" : "振込先情報を自動設定中..."}</span>
                    <span className="live-demo-source-count">{aiFields >= 3 ? <CheckIcon /> : ""}</span>
                  </div>
                )}
              </div>
              <div className="live-demo-progress-bar">
                <div className="live-demo-progress-fill" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Invoice PDF preview — typewriter + fade */}
        {step === 2 && (
          <div className="live-demo-step live-demo-step--visible">
            <div className="live-demo-report-typewriter">
              {invoiceContent.map((line, i) => {
                const typewriterCount = 7;
                const isVisible = i < typewriterCount ? i < invoiceLines : invoiceFaded;
                const isFaded = i >= typewriterCount;
                return (
                  <div
                    key={i}
                    className={`live-demo-rpt-line live-demo-rpt-line--${line.type} ${isVisible ? "live-demo-rpt-line--visible" : ""} ${isFaded ? "live-demo-rpt-line--fade" : ""}`}
                  >
                    {line.text}
                  </div>
                );
              })}
              {invoiceFaded && (
                <button className="live-demo-pdf-btn" style={{ marginTop: "6px", animation: "liveDemoFadeIn 0.4s ease forwards" }}>
                  <DownloadIcon />
                  PDF出力
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Email sending */}
        {step === 3 && (
          <div className="live-demo-step live-demo-step--visible">
            <div className="live-demo-research-screen">
              <div className="live-demo-research-title">メール送付</div>
              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "280px" }}>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "10px 12px", fontSize: "11px" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", marginBottom: "4px" }}>宛先</div>
                  <div style={{ color: "rgba(255,255,255,0.9)" }}>accounting@abc-corp.co.jp</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "10px 12px", fontSize: "11px" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", marginBottom: "4px" }}>件名</div>
                  <div style={{ color: "rgba(255,255,255,0.9)" }}>【請求書】2026年4月分 / INV-2026-0042</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "10px 12px", fontSize: "11px" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px", marginBottom: "4px" }}>添付</div>
                  <div style={{ color: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <DownloadIcon /> INV-2026-0042.pdf (148KB)
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <button className="live-demo-pdf-btn" style={{ flex: 1, animation: "liveDemoFadeIn 0.4s ease forwards" }}>
                    <MailIcon /> ワンクリック送信
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 4 && (
          <div className="live-demo-step live-demo-step--visible">
            <div className="live-demo-complete-screen">
              <div className="live-demo-complete-icon">
                <CheckCircleIcon />
              </div>
              <div className="live-demo-complete-text">請求書送付完了</div>
              <div className="live-demo-complete-sub">株式会社ABC / 30秒 / ステータス追跡開始</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export default function RakudaInvoicePage() {
  useScrollAnimation();
  const scrollProgress = useScrollProgress();
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Counter animations for hero stats
  const stat1 = useCountUp(30, 2200);
  const stat2 = useCountUp(992, 2600);
  const stat3 = useCountUp(49, 1800);

  // Timer animation for Before/After
  const [timerBefore, setTimerBefore] = useState(0);
  const [timerAfter, setTimerAfter] = useState(0);
  const timerRef = useRef<HTMLDivElement>(null);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timer animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timerStarted) {
          setTimerStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (timerRef.current) observer.observe(timerRef.current);
    return () => observer.disconnect();
  }, [timerStarted]);

  useEffect(() => {
    if (!timerStarted) return;
    const duration = 3000;
    const beforeTarget = 28; // 28 min per invoice manually
    const afterTarget = 1; // ~30 seconds with RAKUDA (shown as "30秒")
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setTimerBefore(Math.round(eased * beforeTarget));
      setTimerAfter(Math.round(eased * afterTarget));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [timerStarted]);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}時間${m > 0 ? `${m}分` : ""}`;
    if (m === 0) return "30秒";
    return `${m}分`;
  };

  return (
    <>
      {/* ── Scroll Progress ── */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ══════════════════════════════════════════════════════
          1. STICKY HEADER
          ══════════════════════════════════════════════════════ */}
      <header
        className={`site-header ${headerScrolled ? "site-header--scrolled" : ""}`}
      >
        <div className="header-inner">
          <a href="./" className="header-logo" style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: 20, width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="currentColor" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>

          <nav className="header-nav">
            <a href="#features" className="header-nav-link">
              機能
            </a>
            <a href="#how-it-works" className="header-nav-link">
              使い方
            </a>
            <a href="#pricing" className="header-nav-link">
              料金
            </a>
            <a href="#faq" className="header-nav-link">
              FAQ
            </a>
          </nav>

          <div className="header-cta-group">
            <a href="./book-call" className="header-btn header-btn-dark">
              無料相談
            </a>
            <a href="./signup" className="header-btn header-btn-cta">
              7日間無料で試す
            </a>
          </div>

          <button className={`mobile-menu-btn${mobileMenuOpen ? " active" : ""}`} aria-label="メニューを開く" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>機能</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>使い方</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>料金</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="./book-call" className="mobile-nav-cta-secondary" onClick={() => setMobileMenuOpen(false)}>無料相談</a>
            <a href="./signup" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)}>7日間無料で試す <span>→</span></a>
          </nav>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          2. HERO
          ══════════════════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-grid-pattern" />
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />

        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge fade-up">
              <span className="hero-badge-dot" />
              インボイス制度完全対応
            </div>

            <h1 className="hero-title fade-up fade-up-delay-1">
              AIが請求書を、
              <br />
              <span className="hero-title-accent">30秒で。</span>
            </h1>

            <p className="hero-subtitle fade-up fade-up-delay-2">
              取引先と品目を入力するだけ。AIが税率計算・インボイス番号付与・PDF生成を自動実行。
              ワンクリックで送付、入金管理まで完全自動化。
              <br />
              <span className="hero-trial-note">7日間無料・いつでも解約可能</span>
            </p>

            <div className="hero-actions fade-up fade-up-delay-3">
              <a href="./signup" className="btn-primary-hero">
                7日間無料で試す
                <ArrowRight />
              </a>
            </div>

          </div>

          {/* Right: Live Demo Animation */}
          <div className="hero-visual fade-in">
            <LiveDemoAnimation />
          </div>
        </div>

        {/* Hero stats */}
        <div className="hero-stats-bar fade-up fade-up-delay-4">
          <div className="hero-stat" ref={stat1.ref}>
            <div className="hero-stat-value">{stat1.count}秒</div>
            <div className="hero-stat-label">請求書作成時間</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat" ref={stat2.ref}>
            <div className="hero-stat-value">{(stat2.count / 10).toFixed(1)}%</div>
            <div className="hero-stat-label">インボイス制度適合率</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat" ref={stat3.ref}>
            <div className="hero-stat-value">{(stat3.count / 10).toFixed(1)}</div>
            <div className="hero-stat-label">ユーザー満足度（5段階）</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. TIME COMPRESSION
          ══════════════════════════════════════════════════════ */}
      <section className="section section--time-comparison" ref={timerRef}>
        <div className="section-inner-wide">
          <div className="fade-up">
            <p className="section-eyebrow">The Problem</p>
            <h2 className="section-title section-title--large">
              請求書作成の<span className="text-strike">28分</span>を取り戻す
            </h2>
            <p className="section-subtitle">
              従来の手作業では、Excel入力、インボイス要件チェック、PDF変換、メール送付に平均28分を費やしています。
            </p>
          </div>

          <div className="time-comparison">
            {/* Before */}
            <div className="time-card time-card--before fade-up fade-up-delay-1">
              <div className="time-card-header">
                <span className="time-card-label">従来の請求書作成</span>
              </div>
              <div className="time-card-timer">
                <div className="time-card-timer-value time-card-timer-value--slow">
                  {formatTime(timerBefore)}
                </div>
              </div>
              <div className="time-card-steps">
                <div className="time-step">
                  <div className="time-step-bar time-step-bar--long" />
                  <span>Excel入力・計算</span>
                  <span className="time-step-duration">~10分</span>
                </div>
                <div className="time-step">
                  <div className="time-step-bar time-step-bar--medium" />
                  <span>インボイス要件チェック</span>
                  <span className="time-step-duration">~5分</span>
                </div>
                <div className="time-step">
                  <div className="time-step-bar time-step-bar--medium" />
                  <span>PDF変換・体裁調整</span>
                  <span className="time-step-duration">~8分</span>
                </div>
                <div className="time-step">
                  <div className="time-step-bar time-step-bar--short" />
                  <span>メール作成・送付</span>
                  <span className="time-step-duration">~5分</span>
                </div>
              </div>
              <div className="time-card-pain">
                記載漏れ・計算ミス・送付忘れ、<br />
                「インボイス番号入れ忘れた」の繰り返し
              </div>
            </div>

            {/* Arrow animation */}
            <div className="time-arrow fade-up fade-up-delay-2">
              <div className="time-arrow-line" />
              <div className="time-arrow-icon">
                <ArrowRight size={20} />
              </div>
              <div className="time-arrow-text">98%短縮</div>
            </div>

            {/* After */}
            <div className="time-card time-card--after fade-up fade-up-delay-3">
              <div className="time-card-header">
                <span className="time-card-label">RAKUDAインボイス</span>
                <span className="time-card-badge">AI-Powered</span>
              </div>
              <div className="time-card-timer">
                <div className="time-card-timer-value time-card-timer-value--fast">
                  {formatTime(timerAfter)}
                </div>
              </div>
              <div className="time-card-steps">
                <div className="time-step time-step--done">
                  <div className="time-step-bar time-step-bar--instant" />
                  <span>取引先・品目を入力</span>
                  <span className="time-step-duration">10秒</span>
                </div>
                <div className="time-step time-step--done">
                  <div className="time-step-bar time-step-bar--instant" />
                  <span>AI自動補完・PDF生成</span>
                  <span className="time-step-duration">~15秒</span>
                </div>
                <div className="time-step time-step--done">
                  <div className="time-step-bar time-step-bar--instant" />
                  <span>ワンクリック送付</span>
                  <span className="time-step-duration">~5秒</span>
                </div>
              </div>
              <div className="time-card-result">
                インボイス制度完全対応の請求書が自動完成。<br />
                メール送付・入金追跡まで一気通貫。
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. FEATURE CARDS
          ══════════════════════════════════════════════════════ */}
      <section id="features" className="section section--features">
        <div className="section-inner">
          <div className="fade-up">
            <p className="section-eyebrow">Core Features</p>
            <h2 className="section-title">
              請求業務の全工程を、<br className="hide-mobile" />1つのツールで完結させる
            </h2>
          </div>

          <div className="features-grid">
            <div className="feature-card feature-card--large fade-up fade-up-delay-1">
              <div className="feature-card-icon feature-card-icon--blue">
                <DocumentIcon />
              </div>
              <h3 className="feature-card-title">AI自動作成</h3>
              <p className="feature-card-desc">
                取引先情報と品目を入力するだけ。AIが税率計算・インボイス番号付与・
                レイアウト調整を自動実行。
                定期請求は完全自動化も可能です。
              </p>
              <div className="feature-card-demo">
                <div className="demo-input">
                  <span className="demo-input-icon"><DocumentIcon /></span>
                  <span className="demo-input-text">「株式会社ABC / コンサルティング業務 / ¥1,200,000」</span>
                </div>
                <div className="demo-result-preview">
                  <span className="demo-result-dot" />
                  AI が請求書を自動生成中...
                </div>
              </div>
            </div>

            <div className="feature-card fade-up fade-up-delay-2">
              <div className="feature-card-icon feature-card-icon--purple">
                <ShieldCheckIcon />
              </div>
              <h3 className="feature-card-title">インボイス制度対応</h3>
              <p className="feature-card-desc">
                適格請求書の要件を100%満たすフォーマット。
                登録番号の自動検証機能付き。
                税率別消費税額・端数処理もすべて自動計算。
              </p>
              <span className="feature-card-detail">
                国税庁データベースと自動照合 <ArrowRight />
              </span>
            </div>

            <div className="feature-card fade-up fade-up-delay-3">
              <div className="feature-card-icon feature-card-icon--amber">
                <GridIcon />
              </div>
              <h3 className="feature-card-title">テンプレート管理</h3>
              <p className="feature-card-desc">
                業種別・取引先別のテンプレートを無制限作成。
                ブランドカラー・ロゴのカスタマイズも自在。
                プロ品質の請求書を即座に発行。
              </p>
              <span className="feature-card-detail">
                ロゴ・カラー・フォント自由設定 <ArrowRight />
              </span>
            </div>

            <div className="feature-card fade-up fade-up-delay-4">
              <div className="feature-card-icon feature-card-icon--green">
                <EyeIcon />
              </div>
              <h3 className="feature-card-title">ステータス追跡</h3>
              <p className="feature-card-desc">
                送付済み・閲覧済み・入金済みをリアルタイム追跡。
                未入金アラートで回収漏れを防止。
                期日超過で自動リマインドメールを送信。
              </p>
              <div className="feature-source-demo">
                <div className="source-demo-item">
                  <span className="source-demo-badge source-demo-badge--gov">送付済み</span>
                </div>
                <div className="source-demo-item">
                  <span className="source-demo-badge source-demo-badge--academic">閲覧済み</span>
                </div>
                <div className="source-demo-item">
                  <span className="source-demo-badge source-demo-badge--media">入金済み</span>
                </div>
              </div>
            </div>

            <div className="feature-card fade-up fade-up-delay-5">
              <div className="feature-card-icon feature-card-icon--blue">
                <ChartIcon />
              </div>
              <h3 className="feature-card-title">レポート・分析</h3>
              <p className="feature-card-desc">
                月次売上・取引先別集計・消費税レポートを自動生成。
                確定申告もスムーズに。
                PDF / CSVでエクスポート可能。
              </p>
              <span className="feature-card-detail">
                月次・年次レポート自動生成 <ArrowRight />
              </span>
            </div>

            <div className="feature-card fade-up fade-up-delay-6">
              <div className="feature-card-icon feature-card-icon--purple">
                <BuildingIcon />
              </div>
              <h3 className="feature-card-title">エンタープライズ対応</h3>
              <p className="feature-card-desc">
                チーム管理・承認ワークフロー・API連携。
                大量請求もバッチ処理で効率化。
                SSO/SAML認証、SLA保証も標準装備。
              </p>
              <span className="feature-card-detail">
                REST API / Webhook対応 <ArrowRight />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. INVOICE OUTPUT SHOWCASE
          ══════════════════════════════════════════════════════ */}
      <section className="section section--showcase">
        <div className="section-inner-wide">
          <div className="showcase-header fade-up">
            <div>
              <p className="section-eyebrow">Sample Output</p>
              <h2 className="section-title">
                実際の出力を見てください
              </h2>
              <p className="section-subtitle">
                AIが自動生成した請求書の一例。
                インボイス制度の必須項目をすべて網羅し、プロ品質のPDFを即座に出力。
              </p>
            </div>
          </div>

          <div className="showcase-layout">
            <div className="showcase-report slide-left">
              <div className="showcase-report-chrome">
                <div className="report-chrome-dots">
                  <span /><span /><span />
                </div>
                <span className="report-chrome-tab">請求書プレビュー</span>
              </div>

              <div className="report-content">
                <div className="report-title-area">
                  <h3 className="report-main-title">
                    請求書
                  </h3>
                  <div className="report-meta-row">
                    <span className="report-meta-tag">INV-2026-0042</span>
                    <span className="report-meta-tag">適格請求書</span>
                    <span className="report-meta-date">2026.04.01 発行</span>
                    <span className="report-meta-sources">
                      <ShieldCheckIcon /> インボイス制度対応
                    </span>
                  </div>
                </div>

                <div className="report-section">
                  <h4 className="report-section-heading">
                    <span className="report-section-num">宛先</span>
                    株式会社ABC 御中
                  </h4>
                  <p className="report-text">
                    下記のとおりご請求申し上げます。
                    登録番号: <strong>T1234567890123</strong>
                  </p>
                </div>

                <div className="report-section">
                  <h4 className="report-section-heading">
                    <span className="report-section-num">明細</span>
                    請求内容
                  </h4>
                  <div className="report-data-table">
                    <div className="report-table-row report-table-header">
                      <span>品目</span>
                      <span>数量</span>
                      <span>金額</span>
                    </div>
                    <div className="report-table-row">
                      <span>コンサルティング業務</span>
                      <span>1</span>
                      <span className="report-table-highlight">¥1,200,000</span>
                    </div>
                    <div className="report-table-row">
                      <span>消費税（10%）</span>
                      <span></span>
                      <span>¥120,000</span>
                    </div>
                    <div className="report-table-row">
                      <span><strong>合計（税込）</strong></span>
                      <span></span>
                      <span className="report-table-highlight"><strong>¥1,320,000</strong></span>
                    </div>
                  </div>
                </div>

                <div className="report-sources-area">
                  <div className="report-sources-header">
                    振込先情報
                  </div>
                  <div className="report-source-item">
                    <span className="report-source-num">1</span>
                    <span className="report-source-type report-source-type--gov">銀行</span>
                    <span className="report-source-url">三菱UFJ銀行 渋谷支店 普通 1234567</span>
                  </div>
                  <div className="report-source-item">
                    <span className="report-source-num">2</span>
                    <span className="report-source-type report-source-type--research">期限</span>
                    <span className="report-source-url">支払期限: 2026年4月30日</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase-annotations slide-right">
              <div className="annotation-item annotation-item--1">
                <div className="annotation-connector" />
                <div className="annotation-card">
                  <div className="annotation-icon">01</div>
                  <h4>インボイス番号自動付与</h4>
                  <p>適格請求書発行事業者の登録番号を自動記載。
                  国税庁のデータベースと照合し、正確性を担保。</p>
                </div>
              </div>

              <div className="annotation-item annotation-item--2">
                <div className="annotation-connector" />
                <div className="annotation-card">
                  <div className="annotation-icon">02</div>
                  <h4>税率別自動計算</h4>
                  <p>軽減税率8%と標準税率10%を自動判別。
                  税率ごとの消費税額と端数処理も正確に計算。</p>
                </div>
              </div>

              <div className="annotation-item annotation-item--3">
                <div className="annotation-connector" />
                <div className="annotation-card">
                  <div className="annotation-icon">03</div>
                  <h4>ワンクリック送付</h4>
                  <p>PDF生成・メール作成・送付を一括実行。
                  送付履歴・開封確認もリアルタイムで追跡可能。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. HOW IT WORKS
          ══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="section section--how">
        <div className="section-inner">
          <div className="fade-up how-header">
            <p className="section-eyebrow">How it Works</p>
            <h2 className="section-title">
              取引先を選んで、品目を入力。<br className="hide-mobile" />
              あとはAIがすべてやります。
            </h2>
          </div>

          <div className="steps-timeline">
            <div className="steps-line" />

            <div className="step-item fade-up fade-up-delay-1">
              <div className="step-number-wrap">
                <div className="step-number">1</div>
              </div>
              <div className="step-content">
                <h3 className="step-title">取引先・品目を入力</h3>
                <p className="step-desc">
                  登録済みの取引先を選択し、品目名を入力するだけ。
                  過去の取引データからAIが金額・数量・支払条件を自動補完。
                  定期請求なら入力すら不要です。
                </p>
                <div className="step-input-demo">
                  <span className="step-demo-cursor" />
                  株式会社ABC / コンサルティング業務 / ¥1,200,000
                </div>
              </div>
            </div>

            <div className="step-item fade-up fade-up-delay-2">
              <div className="step-number-wrap">
                <div className="step-number">2</div>
              </div>
              <div className="step-content">
                <h3 className="step-title">AIが自動補完・PDF生成</h3>
                <p className="step-desc">
                  インボイス番号・税率計算・振込先情報をAIが自動セット。
                  適格請求書の要件を100%満たすPDFをリアルタイム生成。
                  プレビューで確認し、必要に応じて編集も可能。
                </p>
                <div className="step-progress-demo">
                  <div className="step-progress-item step-progress-item--done">
                    <CheckIcon /> インボイス番号検証
                  </div>
                  <div className="step-progress-item step-progress-item--done">
                    <CheckIcon /> 税率計算・端数処理
                  </div>
                  <div className="step-progress-item step-progress-item--active">
                    PDF生成中...
                  </div>
                </div>
              </div>
            </div>

            <div className="step-item fade-up fade-up-delay-3">
              <div className="step-number-wrap">
                <div className="step-number">3</div>
              </div>
              <div className="step-content">
                <h3 className="step-title">ワンクリック送付・入金追跡</h3>
                <p className="step-desc">
                  メール送付・Slack通知をワンクリックで実行。
                  送付後は閲覧・入金ステータスをリアルタイム追跡。
                  期日超過で自動リマインドを送信し、回収漏れを防止します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. INTEGRATIONS
          ══════════════════════════════════════════════════════ */}
      <section className="section section--usecases">
        <div className="section-inner">
          <div className="fade-up">
            <p className="section-eyebrow">Integrations</p>
            <h2 className="section-title">
              会計ソフトと、そのまま繋がる
            </h2>
            <p className="section-subtitle">
              freee、マネーフォワード、弥生会計、Slack、Gmail。
              普段使っているツールをそのまま使えます。ワークフローを変えずに、請求だけ自動化。
            </p>
          </div>

          <div className="usecases-grid">
            <div className="usecase-card fade-up fade-up-delay-1">
              <div className="usecase-header">
                <span className="usecase-industry">会計ソフト</span>
                <span className="usecase-metric">対応済み</span>
              </div>
              <h3 className="usecase-title">
                freee
              </h3>
              <p className="usecase-desc">
                請求データが自動で仕訳に反映。売掛金の計上から消込まで、
                freeeとのシームレスな連携で経理業務を完全自動化します。
              </p>
              <div className="usecase-quote">
                <p>&ldquo;請求書作成から仕訳登録まで、手作業がゼロになりました&rdquo;</p>
                <span>-- freee連携ユーザー</span>
              </div>
            </div>

            <div className="usecase-card fade-up fade-up-delay-2">
              <div className="usecase-header">
                <span className="usecase-industry">会計ソフト</span>
                <span className="usecase-metric">対応済み</span>
              </div>
              <h3 className="usecase-title">
                マネーフォワード
              </h3>
              <p className="usecase-desc">
                マネーフォワードクラウドとワンクリック連携。
                請求データの自動仕訳・売上レポートの同期で、月次決算を加速します。
              </p>
              <div className="usecase-quote">
                <p>&ldquo;月末の請求業務が3日から半日に短縮されました&rdquo;</p>
                <span>-- マネーフォワード連携ユーザー</span>
              </div>
            </div>

            <div className="usecase-card fade-up fade-up-delay-3">
              <div className="usecase-header">
                <span className="usecase-industry">会計ソフト・通知</span>
                <span className="usecase-metric">対応済み</span>
              </div>
              <h3 className="usecase-title">
                弥生会計・Slack・Gmail
              </h3>
              <p className="usecase-desc">
                弥生会計へのCSV連携に加え、Slackでの送付通知・入金アラート、
                Gmailでのメール送付にも対応。既存のワークフローをそのまま活用できます。
              </p>
              <div className="usecase-quote">
                <p>&ldquo;Slack通知のおかげで入金の見落としがなくなりました&rdquo;</p>
                <span>-- Slack連携ユーザー</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. PRICING — 2-Column Pro / Enterprise
          ══════════════════════════════════════════════════════ */}
      <section id="pricing" className="section section--pricing">
        <div className="section-inner">
          <div className="fade-up pricing-header">
            <p className="section-eyebrow">Pricing</p>
            <h2 className="section-title">
              まず無料で試す。納得してから課金。
            </h2>
            <p className="section-subtitle section-subtitle--center">
              隠れたコストはありません。7日間の無料トライアル付き。いつでも解約可能です。
            </p>
          </div>

          <div className="pricing-grid pricing-grid--2col">
            {/* Pro */}
            <div className="pricing-card pricing-card--featured fade-up fade-up-delay-2">
              <div className="pricing-popular-badge">最も選ばれています</div>
              <div className="pricing-plan-name">Pro</div>
              <div className="pricing-plan-desc">個人事業主・中小企業向け</div>
              <div className="pricing-price">
                <span className="pricing-amount">&yen;980</span>
                <span className="pricing-period">/月（税込）</span>
              </div>
              <div className="pricing-billing-note">
                7日間無料トライアル付き・クレカ不要
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--accent"><CheckIcon /></span>
                  月100件まで請求書作成
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--accent"><CheckIcon /></span>
                  インボイス制度対応
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--accent"><CheckIcon /></span>
                  テンプレート無制限
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--accent"><CheckIcon /></span>
                  メール送付
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--accent"><CheckIcon /></span>
                  基本レポート
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--accent"><CheckIcon /></span>
                  メールサポート
                </li>
              </ul>
              <a href="./signup?plan=pro" className="pricing-btn pricing-btn--primary">
                7日間無料で試す
              </a>
            </div>

            {/* Enterprise */}
            <div className="pricing-card fade-up fade-up-delay-3">
              <div className="pricing-plan-name">Enterprise</div>
              <div className="pricing-plan-desc">チーム・法人向け</div>
              <div className="pricing-price">
                <span className="pricing-amount pricing-amount--contact">カスタム</span>
              </div>
              <div className="pricing-billing-note">
                カスタム見積り
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--included"><CheckIcon /></span>
                  無制限請求書作成
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--included"><CheckIcon /></span>
                  チーム管理・承認フロー
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--included"><CheckIcon /></span>
                  API連携
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--included"><CheckIcon /></span>
                  カスタムテンプレート
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--included"><CheckIcon /></span>
                  専任サポート
                </li>
                <li className="pricing-feature-item">
                  <span className="pricing-check pricing-check--included"><CheckIcon /></span>
                  SLA保証（稼働率99.9%）
                </li>
              </ul>
              <a href="./book-call" className="pricing-btn pricing-btn--outline">
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. FAQ
          ══════════════════════════════════════════════════════ */}
      <section id="faq" className="section section--faq">
        <div className="section-inner">
          <div className="faq-layout">
            <div className="faq-left fade-up">
              <p className="section-eyebrow">FAQ</p>
              <h2 className="section-title">よくある質問</h2>
              <p className="section-subtitle">
                解決しない場合は<a href="#" className="faq-contact-link">お問い合わせ</a>からどうぞ。
                営業日24時間以内に回答します。
              </p>
            </div>

            <div className="faq-list">
              {[
                {
                  q: "無料トライアルはありますか？",
                  a: "7日間の無料トライアルをご用意しています。クレジットカード不要で全機能をお試しいただけます。トライアル期間中にいつでも解約可能で、その場合は一切課金されません。",
                },
                {
                  q: "インボイス番号はどう設定しますか？",
                  a: "初回設定時に適格請求書発行事業者登録番号を入力するだけです。国税庁のデータベースと自動照合し、正確性を担保します。以降、すべての請求書に自動記載されます。",
                },
                {
                  q: "会計ソフトと連携できますか？",
                  a: "freee、マネーフォワード、弥生会計とワンクリック連携が可能です。請求データが自動で仕訳に反映されます。CSV一括エクスポートにも対応しているので、お使いの会計ソフトに合わせた運用ができます。",
                },
                {
                  q: "プラン変更はできますか？",
                  a: "いつでもアップグレード・ダウングレード可能です。日割り計算で差額を調整します。アップグレードは即時反映、ダウングレードは次回請求サイクルから適用されます。",
                },
                {
                  q: "セキュリティは大丈夫ですか？",
                  a: "AES-256暗号化、SOC2準拠のインフラで運用しています。請求書データは国内データセンターで厳重管理。TLS 1.3通信保護に加え、電子帳簿保存法の保存要件にも対応済みです。",
                },
                {
                  q: "解約はすぐできますか？",
                  a: "いつでもワンクリックで解約可能です。データは解約後30日間保持され、エクスポートも可能です。年額プランの途中解約による返金にも対応しています。",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`faq-item ${openFaq === index ? "faq-item--open" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>{item.q}</span>
                    <ChevronDown className="faq-chevron" />
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. CTA
          ══════════════════════════════════════════════════════ */}
      <section id="cta" className="section cta-section">
        <div className="cta-bg-pattern" />
        <div className="section-inner fade-up cta-inner">
          <h2 className="cta-title">
            次の請求書は、30秒で完成する。
          </h2>
          <p className="cta-subtitle">
            まず無料で試す。納得してから課金。<br />
            隠れたコストはありません。7日間の無料トライアル付き。いつでも解約可能です。
          </p>
          <div className="cta-actions">
            <a href="./signup" className="btn-primary-hero btn-primary-hero--large">
              7日間無料で試す
              <ArrowRight />
            </a>
            <a href="./book-call" className="btn-secondary-hero">
              無料相談
            </a>
          </div>
          <div className="cta-reassurance">
            <span><ClockIcon /> 10秒で登録完了</span>
            <span><ShieldIcon /> いつでも解約可能</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. FOOTER
          ══════════════════════════════════════════════════════ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
              <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </svg>
            <span>RAKUDA AI</span>
          </div>
          <div className="footer-links-grid">
            <div>
              <h3 className="footer-heading">サポート</h3>
              <ul className="footer-link-list">
                <li><a href="mailto:info@rakuda-ai.com">info@rakuda-ai.com</a></li>
              </ul>
            </div>
            <div>
              <h3 className="footer-heading">リンク</h3>
              <ul className="footer-link-list">
                <li><a href="./terms">利用規約</a></li>
                <li><a href="./privacy">プライバシーポリシー</a></li>
                <li><a href="./tokushoho">特定商取引法</a></li>
                <li><a href="./security">セキュリティ</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright">
            &copy; 2026 株式会社T Advisory All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
