"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   RAKUDAインボイス — 請求書コスト訴求 LP（cost バリアント）
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

// Invoice Mockup Pattern (document lines)
const invoiceLines = [
  { w: "60%", h: 8, color: "#1A1A2E" },
  { w: "40%", h: 6, color: "#6B7280" },
  { w: "80%", h: 4, color: "#E5E7EB" },
  { w: "80%", h: 4, color: "#E5E7EB" },
  { w: "80%", h: 4, color: "#E5E7EB" },
  { w: "50%", h: 6, color: "#3B82F6" },
];

// FAQ
const faqData = [
  {
    q: "本当に隠れコストはありませんか?",
    a: "はい、ありません。Pro ¥980/月に請求書作成無制限・AI自動作成・インボイス制度対応がすべて含まれています。初期費用・セットアップ費用・PDF送信費用は一切かかりません。",
  },
  {
    q: "無料プランから有料プランへの切り替えは簡単ですか?",
    a: "管理画面からワンクリックでアップグレードできます。作成済みの請求書データや取引先マスタはすべてそのまま引き継がれます。ダウングレードもいつでも可能です。",
  },
  {
    q: "年額プランの2ヶ月分お得とはどういう意味ですか?",
    a: "年額プランはProプランの10ヶ月分でお支払いいただくプランです。月額¥980 x 12ヶ月 = ¥11,760のところ、年額プランなら¥9,800（月あたり約¥817）となり、年間¥1,960お得です。",
  },
  {
    q: "途中解約した場合、返金はありますか?",
    a: "はい。年額プランを途中解約される場合、未利用月分の料金を日割りで返金いたします。月額プランはいつでも解約でき、契約期間の終了日まで利用可能です。解約手数料はかかりません。",
  },
  {
    q: "freeeやマネーフォワードからの乗り換えは手間がかかりますか?",
    a: "無料で移行サポートを提供しています。取引先データのCSVインポート、過去の請求書PDF取り込みなど、専任スタッフがサポートします。最短1営業日で切り替えが完了します。",
  },
  {
    q: "請求書の作成に時間がかかりませんか?",
    a: "AIが取引先・品目・金額を自動補完するため、1通あたり平均30秒で作成できます。定期請求の自動化機能もあり、毎月同じ請求書は自動送付が可能です。手作業の時間を大幅に削減します。",
  },
];

export default function CostLP() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sectionRefs = {
    hero: useScrollReveal(),
    pain: useScrollReveal(),
    stats: useScrollReveal(),
    flow: useScrollReveal(),
    features: useScrollReveal(),
    comparison: useScrollReveal(),
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
            <a href="#features">機能</a>
            <a href="#comparison">料金比較</a>
            <a href="#how-it-works">始め方</a>
            <a href="#pricing">料金</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-cta-group">
            <a href="/signup" className="btn btn-sm btn-cta-call">
              月5通まで無料で試す
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
                  請求書作成コスト、最大90%削減
                </div>
                <h1>
                  請求書作成コスト、
                  <br />
                  <span className="accent-text">最大90%削減。</span>
                </h1>
                <p className="hero-pain">
                  手作業で1通30分。月20通なら<em>年間120時間</em>を請求書に費やしている。
                  <br />
                  そのコストと時間、本当に必要ですか?
                </p>
                <p className="hero-subtitle">
                  AIが取引先・品目・税率を自動補完。1通30秒で作成完了。
                  月額¥980のProプランで請求書作成が無制限。他社サービスの1/4以下の料金で、AI機能付き。
                </p>
                <div className="hero-actions">
                  <a href="/signup" className="btn btn-lg btn-cta-call">
                    月5通まで無料で試す
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
                  初期費用0円・解約金0円・クレカ不要で無料開始
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
                              新規請求書の作成
                            </span>
                          </div>
                          <span className="browser-time" style={{ fontSize: "10px", color: "#3B82F6", fontWeight: 600 }}>AI補完中...</span>
                        </div>
                        <div className="browser-welcome" style={{ padding: "8px 12px", textAlign: "left" }}>
                          <div style={{ fontSize: "9px", color: "#9CA3AF", marginBottom: "4px" }}>取引先</div>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: "#1A1A2E", marginBottom: "8px", padding: "4px 8px", background: "#F9FAFB", borderRadius: "4px", border: "1px solid #E5E7EB" }}>
                            株式会社サンプル <span style={{ color: "#3B82F6", fontSize: "9px" }}>AI補完</span>
                          </div>
                          <div style={{ fontSize: "9px", color: "#9CA3AF", marginBottom: "4px" }}>品目</div>
                          <div style={{ fontSize: "10px", color: "#1A1A2E", marginBottom: "6px", padding: "4px 8px", background: "#F9FAFB", borderRadius: "4px", border: "1px solid #E5E7EB" }}>
                            Webデザイン制作費 — ¥150,000
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 8px", background: "#EFF6FF", borderRadius: "4px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "10px", fontWeight: 600 }}>合計（税込）</span>
                            <span style={{ fontSize: "11px", fontWeight: 700, color: "#1D4ED8" }}>¥165,000</span>
                          </div>
                          <button style={{ width: "100%", padding: "6px", background: "#1A1A2E", color: "#fff", border: "none", borderRadius: "4px", fontSize: "10px", fontWeight: 600, cursor: "pointer" }}>
                            PDF送付
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-floating-card card-1">
                    <div className="floating-card-inner">
                      <div className="floating-card-icon check">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="7" stroke="#3B82F6" strokeWidth="1.5" />
                          <path d="M6 9l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="floating-card-text">作成完了 — 30秒</div>
                        <div className="floating-card-sub">インボイス番号自動付与済み</div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-floating-card card-2">
                    <div className="floating-card-inner">
                      <div className="floating-card-icon slack">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <rect x="3" y="3" width="12" height="12" rx="2" stroke="#4CAF50" strokeWidth="1.5" fill="none"/>
                          <path d="M6 9h6M9 6v6" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="floating-card-text">月額 ¥980</div>
                        <div className="floating-card-sub">他社比 1/4以下の料金</div>
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
                2,000社以上が導入。他社の1/4以下の料金でAI請求書作成を。
              </div>
              <div className="social-proof-highlights">
                <span className="social-proof-stat">
                  <strong>1/4以下</strong>
                  <span>他社比の料金</span>
                </span>
                <span className="social-proof-stat">
                  <strong>30秒</strong>
                  <span>1通あたりの作成時間</span>
                </span>
                <span className="social-proof-stat">
                  <strong>年間96時間</strong>
                  <span>月20通の場合の削減時間</span>
                </span>
                <span className="social-proof-stat">
                  <strong>97%</strong>
                  <span>コスト満足度</span>
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
                <span className="pain-emoji">&#x1F4B8;</span>
                <div className="pain-title">請求書1通に30分、かけ続けますか?</div>
                <div className="pain-desc">
                  取引先の住所確認、品目入力、消費税計算、インボイス番号の記載。
                  月20通なら年間120時間。そのコストと時間、本当に必要ですか?
                </div>
                <span className="pain-stat">手作業: 1通あたり平均30分</span>
              </div>

              <div className="pain-card animate-on-scroll delay-1">
                <span className="pain-emoji">&#x1F4CA;</span>
                <div className="pain-title">他社サービスに月4,000円、払い続けますか?</div>
                <div className="pain-desc">
                  freee・マネーフォワードなど主要サービスは月額3,278〜3,980円。
                  請求書だけに使うには、高すぎませんか?
                </div>
                <span className="pain-stat">他社平均 月額3,500円〜</span>
              </div>

              <div className="pain-card animate-on-scroll delay-2">
                <span className="pain-emoji">&#x1F9FE;</span>
                <div className="pain-title">インボイス制度の対応、できていますか?</div>
                <div className="pain-desc">
                  登録番号・適格請求書の記載ルール・税率区分。
                  手作業では記載漏れのリスクが常にあります。
                </div>
                <span className="pain-stat">記載ミスリスク: 手作業は常にゼロではない</span>
              </div>
            </div>

            <div className="pain-bottom-cta animate-on-scroll delay-3">
              <p>必要な機能だけを、適正価格で。月額¥980。</p>
              <div className="pain-bottom-sub">
                導入企業の97%が「コストに満足している」と回答しています。
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
              <div className="stat-label">1通あたりの作成時間</div>
            </div>
            <div className="stat-item animate-on-scroll delay-1">
              <div className="stat-number">
                0<span className="stat-unit">円</span>
              </div>
              <div className="stat-label">初期費用・解約金</div>
            </div>
            <div className="stat-item animate-on-scroll delay-2">
              <div className="stat-number">
                96<span className="stat-unit">時間</span>
              </div>
              <div className="stat-label">年間削減時間（月20通の場合）</div>
            </div>
            <div className="stat-item animate-on-scroll delay-3">
              <div className="stat-number">
                97<span className="stat-unit">%</span>
              </div>
              <div className="stat-label">コスト満足度</div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ─────────────────────── */}
        <section className="qr-flow" id="comparison" ref={sectionRefs.comparison}>
          <div className="container">
            <div className="qr-flow-header">
              <div className="animate-on-scroll">
                <span className="section-label">手作業 vs RAKUDAインボイス</span>
                <h2 className="section-title">
                  1通30分 vs 1通30秒。年間コストの差。
                </h2>
                <p className="section-desc">
                  月20通作成する場合のROIシミュレーション。
                  作業時間の削減だけで、年間数十万円相当のコストカットが実現できます。
                </p>
              </div>
            </div>

            {/* 手作業 vs RAKUDA 比較表 */}
            <div className="pricing-comparison animate-on-scroll">
              <h3 className="comparison-title">手作業 vs RAKUDAインボイス</h3>
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>手作業（Excel等）</th>
                      <th className="comparison-highlight">RAKUDAインボイス Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="comparison-row-label">1通あたりの作成時間</td>
                      <td>約30分</td>
                      <td className="comparison-highlight"><strong className="comparison-price-accent">約30秒</strong></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">月20通の合計時間</td>
                      <td>約600分（10時間）</td>
                      <td className="comparison-highlight"><strong className="comparison-price-accent">約10分</strong></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">年間作業時間</td>
                      <td>約120時間</td>
                      <td className="comparison-highlight"><strong className="comparison-price-accent">約2時間</strong></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">月額コスト</td>
                      <td>0円（時間コストは別）</td>
                      <td className="comparison-highlight"><strong className="comparison-price-accent">¥980/月</strong></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">インボイス制度対応</td>
                      <td><span className="comparison-no">&#x2715; 手動確認が必要</span></td>
                      <td className="comparison-highlight"><span className="comparison-yes">&#x25CB; 自動対応</span></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">記載ミスリスク</td>
                      <td><span className="comparison-no">&#x2715; 常にリスクあり</span></td>
                      <td className="comparison-highlight"><span className="comparison-yes">&#x25CB; AI自動チェック</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="comparison-note">※ 時間コストは時給換算で試算。年間削減時間118時間 x 時給2,000円 = 年間約236,000円相当のコスト削減（推定）。</p>
            </div>

            {/* 月額料金比較表 */}
            <div className="pricing-comparison animate-on-scroll" style={{ marginTop: "40px" }}>
              <h3 className="comparison-title">他社請求書サービスとの月額料金比較</h3>
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="comparison-highlight">RAKUDAインボイス</th>
                      <th>freee</th>
                      <th>マネーフォワード</th>
                      <th>Bill One</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="comparison-row-label">月額料金（無制限プラン）</td>
                      <td className="comparison-highlight"><strong className="comparison-price-accent">&yen;980</strong></td>
                      <td>&yen;3,980〜</td>
                      <td>&yen;3,278〜</td>
                      <td>&yen;10,000〜</td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">年間コスト</td>
                      <td className="comparison-highlight"><strong className="comparison-price-accent">&yen;11,760</strong></td>
                      <td>&yen;47,760〜</td>
                      <td>&yen;39,336〜</td>
                      <td>&yen;120,000〜</td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">AI自動作成</td>
                      <td className="comparison-highlight"><span className="comparison-yes">&#x25CB;</span></td>
                      <td><span className="comparison-no">&#x2715;</span></td>
                      <td><span className="comparison-no">&#x2715;</span></td>
                      <td><span className="comparison-no">&#x2715;</span></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">インボイス制度対応</td>
                      <td className="comparison-highlight"><span className="comparison-yes">&#x25CB;</span></td>
                      <td><span className="comparison-yes">&#x25CB;</span></td>
                      <td><span className="comparison-yes">&#x25CB;</span></td>
                      <td><span className="comparison-yes">&#x25CB;</span></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">無料プランあり</td>
                      <td className="comparison-highlight"><span className="comparison-yes">&#x25CB;</span></td>
                      <td><span className="comparison-no">&#x2715;</span></td>
                      <td><span className="comparison-no">&#x2715;</span></td>
                      <td><span className="comparison-no">&#x2715;</span></td>
                    </tr>
                    <tr>
                      <td className="comparison-row-label">初期費用</td>
                      <td className="comparison-highlight"><strong>無料</strong></td>
                      <td>無料</td>
                      <td>無料</td>
                      <td>要問合せ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="comparison-note">※ 各社公式サイトの公開情報に基づく比較（2026年3月時点）。年間コストは月額料金 x 12ヶ月で算出。</p>
            </div>

            {/* ROI計算 */}
            <div className="animate-on-scroll" style={{ marginTop: "40px", padding: "32px", background: "#F0F9FF", borderRadius: "16px", border: "1px solid #BAE6FD" }}>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <span className="section-label">ROI計算</span>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1A1A2E", margin: "8px 0 4px" }}>月20通作成の場合の年間削減額</h3>
                <p style={{ fontSize: "14px", color: "#6B7280" }}>時給2,000円で換算した場合の試算（推定）</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", textAlign: "center" }}>
                <div style={{ padding: "16px", background: "#fff", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>年間削減時間</div>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#1D4ED8" }}>118<span style={{ fontSize: "14px" }}>時間</span></div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>（120h - 2h）</div>
                </div>
                <div style={{ padding: "16px", background: "#fff", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>年間削減コスト（推定）</div>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#059669" }}>約<span>23.6</span><span style={{ fontSize: "14px" }}>万円</span></div>
                  <div style={{ fontSize: "11px", color: "#6B7280" }}>118h x 時給2,000円</div>
                </div>
                <div style={{ padding: "16px", background: "#1A1A2E", borderRadius: "12px" }}>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>RAKUDAインボイス年間費用</div>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#FCD34D" }}>¥<span>9,800</span></div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF" }}>年額プランの場合</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────── */}
        <section className="features" id="features" ref={sectionRefs.features}>
          <div className="container">
            <div className="features-header animate-on-scroll">
              <span className="section-label">この価格に含まれる機能</span>
              <h2 className="section-title">
                月額¥980で、これだけ使える。
              </h2>
              <p className="section-desc">
                他社では高額オプション扱いのAI自動作成も、RAKUDAインボイスなら標準搭載。
                追加料金は一切かかりません。
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card featured animate-on-scroll">
                <div className="feature-icon">&#x1F916;</div>
                <h3 className="feature-title">AI自動作成</h3>
                <p className="feature-desc">
                  取引先名を入力するだけで、住所・担当者・過去の品目・税率を自動補完。インボイス登録番号も自動入力。1通あたり平均30秒で作成完了します。他社にはないAI機能が標準搭載。
                </p>
                <span className="feature-tag">他社にはないAI機能</span>
              </div>

              <div className="feature-card animate-on-scroll delay-1">
                <div className="feature-icon">&#x1F4CB;</div>
                <h3 className="feature-title">インボイス制度完全対応</h3>
                <p className="feature-desc">
                  適格請求書の記載要件（登録番号・税率区分・消費税額）を自動で満たします。記載漏れ・ミスをAIが自動チェック。法改正があっても自動でアップデートされます。
                </p>
                <span className="feature-tag">法改正自動対応</span>
              </div>

              <div className="feature-card animate-on-scroll delay-2">
                <div className="feature-icon">&#x1F504;</div>
                <h3 className="feature-title">定期請求の自動化</h3>
                <p className="feature-desc">
                  毎月同じ内容の請求書は、自動作成・自動送付が可能。設定は初回のみ。月次の繰り返し作業をゼロにします。送付後の入金確認も自動通知。
                </p>
                <span className="feature-tag">追加料金なし</span>
              </div>

              <div className="feature-card animate-on-scroll delay-3">
                <div className="feature-icon">&#x1F4B3;</div>
                <h3 className="feature-title">入金ステータス管理</h3>
                <p className="feature-desc">
                  未入金・入金済み・遅延をダッシュボードで一覧管理。入金期日が近づいたら自動リマインド送信。回収漏れを防止します。CSV/PDFエクスポートも標準搭載。
                </p>
                <span className="feature-tag">追加料金なし</span>
              </div>

              <div className="feature-card animate-on-scroll delay-4">
                <div className="feature-icon">&#x1F4BC;</div>
                <h3 className="feature-title">取引先マスタ管理</h3>
                <p className="feature-desc">
                  取引先の会社情報・担当者・支払条件を一元管理。請求書作成時に自動入力されるため、毎回入力する手間がゼロに。CSVインポートで既存データも取り込み可能。
                </p>
                <span className="feature-tag">追加料金なし</span>
              </div>

              <div className="feature-card animate-on-scroll delay-5">
                <div className="feature-icon">&#x1F310;</div>
                <h3 className="feature-title">ブラウザ完結・アプリ不要</h3>
                <p className="feature-desc">
                  専用アプリのインストール不要。PC・スマホ・タブレット、どのデバイスのブラウザからでも利用可能。外出先からでも請求書の作成・確認・送付ができます。
                </p>
                <span className="feature-tag">デバイスコスト0円</span>
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
              <h2 className="section-title">初期費用0円、5分で導入完了</h2>
              <p className="section-desc">
                セットアップ費用・導入コンサル費用は一切なし。アカウント作成から最初の請求書送付まで、最短5分。クレジットカードも不要です。
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
                <h3 className="step-title">無料アカウント登録</h3>
                <p className="step-desc">
                  メールアドレスで無料アカウントを作成。会社名・インボイス登録番号を入力するだけ。導入コンサルは不要です。
                </p>
                <div className="step-detail">
                  約2分 ・ クレカ不要 ・ 費用0円
                </div>
              </div>

              <div className="step-card animate-on-scroll delay-2">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">02</span>
                  </div>
                  <span className="step-icon-overlay">&#x1F4BC;</span>
                </div>
                <h3 className="step-title">取引先を登録</h3>
                <p className="step-desc">
                  取引先の情報をCSVで一括インポート、または手動で入力。登録後は請求書作成時に自動入力されます。
                </p>
                <div className="step-detail">
                  約2分 ・ CSV一括インポート対応
                </div>
              </div>

              <div className="step-card animate-on-scroll delay-4">
                <div className="step-number-wrap">
                  <div className="step-number-bg">
                    <span className="step-number-inner">03</span>
                  </div>
                  <span className="step-icon-overlay">&#x26A1;</span>
                </div>
                <h3 className="step-title">最初の請求書を送付</h3>
                <p className="step-desc">
                  取引先を選択して金額を入力。AIが自動補完してPDF生成。メール直送付またはダウンロードで即送付完了。
                </p>
                <div className="step-detail">
                  約1分 ・ AI自動補完 ・ 即時送付
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
              <span className="section-label">規模別のコストメリット</span>
              <h2 className="section-title">どんな規模でも、コスト最適化</h2>
              <p className="section-desc">
                フリーランスから中小企業まで。
                請求書の発行数や規模に応じた最適な料金プランをご用意しています。
              </p>
            </div>

            <div className="company-size-grid">
              <div className="size-card animate-on-scroll">
                <span className="size-card-badge startup">フリーランス・個人事業主向け</span>
                <div className="size-card-title">月1〜5通</div>
                <div className="size-card-range">副業・フリーランス</div>
                <ul className="size-card-points">
                  <li>
                    <span className="check-icon blue"><CheckIcon /></span>
                    無料プランで十分。コストは0円
                  </li>
                  <li>
                    <span className="check-icon blue"><CheckIcon /></span>
                    インボイス制度対応が自動で完結
                  </li>
                  <li>
                    <span className="check-icon blue"><CheckIcon /></span>
                    スマホからでも作成・送付が可能
                  </li>
                </ul>
                <div className="size-card-rec">
                  <strong>おすすめ:</strong> Freeプラン（月額¥0）
                </div>
              </div>

              <div className="size-card animate-on-scroll delay-1">
                <span className="size-card-badge growth">中小企業・スタートアップ向け</span>
                <div className="size-card-title">月6〜100通</div>
                <div className="size-card-range">社員5〜100名</div>
                <ul className="size-card-points">
                  <li>
                    <span className="check-icon amber"><CheckIcon /></span>
                    他社月額3,980円の機能が月額¥980
                  </li>
                  <li>
                    <span className="check-icon amber"><CheckIcon /></span>
                    年額プランなら月あたり約¥817
                  </li>
                  <li>
                    <span className="check-icon amber"><CheckIcon /></span>
                    年間で約3.8万円のコスト削減（freee比）
                  </li>
                </ul>
                <div className="size-card-rec">
                  <strong>おすすめ:</strong> Proプラン（月額¥980）
                </div>
              </div>

              <div className="size-card animate-on-scroll delay-2">
                <span className="size-card-badge enterprise">大企業・エンタープライズ向け</span>
                <div className="size-card-title">月100通以上</div>
                <div className="size-card-range">社員100名以上</div>
                <ul className="size-card-points">
                  <li>
                    <span className="check-icon purple"><CheckIcon /></span>
                    他社月額1万円相当がカスタム価格
                  </li>
                  <li>
                    <span className="check-icon purple"><CheckIcon /></span>
                    会計システム連携・SSO・API接続
                  </li>
                  <li>
                    <span className="check-icon purple"><CheckIcon /></span>
                    専任CSサポート・SLA保証付き
                  </li>
                </ul>
                <div className="size-card-rec">
                  <strong>おすすめ:</strong> Enterpriseプラン（カスタム）
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
                他社の1/4以下。圧倒的な低価格。
              </h2>
              <p className="section-desc">
                freee・マネーフォワードが月額3,000円以上かかる中、RAKUDAインボイスはPro ¥980/月。隠れコストは一切ありません。
              </p>
            </div>

            <div className="pricing-grid pricing-grid--2col">
              {/* Pro */}
              <div className="pricing-card popular animate-on-scroll">
                <div className="pricing-popular-badge">一番人気 ・ 他社の1/4以下</div>
                <div className="pricing-plan-name">Pro</div>
                <div className="pricing-price">
                  <span className="pricing-currency">&yen;</span>
                  <span className="pricing-amount">980</span>
                </div>
                <div className="pricing-period">/月（税抜）</div>
                <div className="pricing-desc">
                  他社なら月額3,000円以上の機能が¥980。年額プランなら月あたり約¥817。
                </div>
                <ul className="pricing-features">
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    請求書作成・送付 無制限
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    AI自動作成（全機能）
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    定期請求の自動化
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    入金ステータス管理
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    取引先マスタ 無制限
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    CSV / PDFエクスポート
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    自社ロゴ・カラーカスタマイズ
                  </li>
                </ul>
                <a href="/signup?plan=pro" className="btn btn-primary pricing-cta">
                  無料で試してみる
                </a>
              </div>

              {/* Enterprise */}
              <div className="pricing-card animate-on-scroll delay-1">
                <div className="pricing-plan-name">Enterprise</div>
                <div className="pricing-price" style={{ fontSize: "14px", lineHeight: 1.4, paddingTop: "8px" }}>
                  <span style={{ fontSize: "28px", fontWeight: 700 }}>カスタム</span>
                </div>
                <div className="pricing-period">要お問合せ</div>
                <div className="pricing-desc">
                  月100通以上、または会計システム連携・SSO・API接続が必要な場合。
                </div>
                <ul className="pricing-features">
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    Proの全機能
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    会計システム連携（freee / MF）
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    SSO（SAML 2.0）
                  </li>
                  <li>
                    <span className="pricing-check"><CheckIcon /></span>
                    REST API / Webhook
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
                    カスタム請求書テンプレート
                  </li>
                </ul>
                <a href="mailto:info@rakuda-ai.com" className="btn btn-secondary pricing-cta">
                  お問い合わせ
                </a>
              </div>
            </div>

            <p className="pricing-note">
              全プラン初期費用ゼロ。年額プランなら2ヶ月分お得（¥9,800/年）。いつでも解約可能。
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────── */}
        <section className="faq" id="faq" ref={sectionRefs.faq}>
          <div className="container">
            <div className="faq-header animate-on-scroll">
              <span className="section-label">よくある質問</span>
              <h2 className="section-title">料金・コストに関するFAQ</h2>
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
              <div className="cta-call-badge">請求書コストを見直す</div>
              <h2>
                月額¥980で始めませんか?
              </h2>
              <p>
                2,000社以上が選んだ、業界最安水準の請求書サービス。
                初期費用ゼロ・解約金ゼロ。まず月5通まで無料でお試しください。
              </p>
              <div className="cta-banner-actions">
                <a href="/signup" className="btn btn-xl btn-cta-call">
                  月5通まで無料で試す
                  <ArrowRight />
                </a>
                <a href="mailto:info@rakuda-ai.com" className="btn btn-xl btn-cta-call-secondary">
                  お問い合わせ
                </a>
              </div>
              <div className="cta-call-benefits">
                <span>&#x2714; 初期費用ゼロ</span>
                <span>&#x2714; クレカ不要で無料プラン開始</span>
                <span>&#x2714; いつでも解約可能</span>
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
            &copy; 2026 株式会社T Advisory. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
