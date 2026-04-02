"use client";

import { useState, useMemo } from "react";

/* ── helpers ───────────────────────────── */
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const MONTH_NAMES = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];

const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30",
];

/* ── main component ────────────────────── */
export default function BookCall() {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form" | "done">("calendar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  /* calendar grid */
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfWeek(currentYear, currentMonth);
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [currentYear, currentMonth]);

  const isDateAvailable = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) return false; // weekends
    if (d < todayStart) return false;
    return true;
  };

  const handleDateClick = (day: number) => {
    if (!isDateAvailable(day)) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setStep("form");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") { (window as any).dataLayer?.push({ event: "generate_lead", event_label: "book_call" }); }
    setStep("done");
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const dow = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${m}月${d}日（${dow}）`;
  };

  return (
    <>
      <style>{`
        .schedule-page { min-height: 100vh; background: var(--bg-cool, #F8FAFC); padding: calc(var(--header-h, 72px) + 40px) 0 80px; }
        .schedule-container { max-width: 960px; margin: 0 auto; padding: 0 20px; }

        .schedule-header { text-align: center; margin-bottom: 40px; }
        .schedule-header .badge { display: inline-flex; align-items: center; gap: 6px; background: var(--accent-soft, #DBEAFE); color: var(--accent, #3B82F6); font-size: 0.813rem; font-weight: 600; padding: 6px 14px; border-radius: 100px; margin-bottom: 16px; }
        .schedule-header .badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent, #3B82F6); animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .schedule-header h1 { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; color: var(--text, #0F172A); margin-bottom: 8px; }
        .schedule-header p { font-size: 1rem; color: var(--text-secondary, #475569); }

        .schedule-main { display: grid; grid-template-columns: 1fr 1fr; gap: 0; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid var(--border, #E2E8F0); }

        /* left: calendar */
        .schedule-left { padding: 32px; border-right: 1px solid var(--border, #E2E8F0); }
        .schedule-info { margin-bottom: 24px; }
        .schedule-info-label { font-size: 0.75rem; color: var(--text-muted, #94A3B8); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .schedule-info-title { font-size: 1.125rem; font-weight: 700; color: var(--text, #0F172A); margin-bottom: 4px; }
        .schedule-info-meta { display: flex; gap: 16px; font-size: 0.813rem; color: var(--text-secondary, #475569); }
        .schedule-info-meta span { display: flex; align-items: center; gap: 4px; }

        /* calendar */
        .cal-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .cal-nav-title { font-size: 1rem; font-weight: 700; color: var(--text, #0F172A); }
        .cal-nav button { background: none; border: 1px solid var(--border, #E2E8F0); border-radius: 8px; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-secondary, #475569); transition: all 0.15s; }
        .cal-nav button:hover { background: var(--bg-subtle, #F1F5F9); border-color: var(--text-muted, #94A3B8); }

        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; }
        .cal-dow { font-size: 0.688rem; font-weight: 600; color: var(--text-muted, #94A3B8); padding: 4px 0 8px; text-transform: uppercase; }
        .cal-day { width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; border-radius: 10px; cursor: default; color: var(--text-muted, #94A3B8); transition: all 0.15s; position: relative; }
        .cal-day.available { color: var(--text, #0F172A); cursor: pointer; font-weight: 500; }
        .cal-day.available:hover { background: var(--accent-soft, #DBEAFE); color: var(--accent, #3B82F6); }
        .cal-day.selected { background: var(--accent, #3B82F6); color: #fff; font-weight: 700; }
        .cal-day.selected:hover { background: var(--accent-hover, #2563EB); color: #fff; }
        .cal-day.today::after { content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: var(--accent, #3B82F6); }
        .cal-day.today.selected::after { background: #fff; }

        /* right: time slots */
        .schedule-right { padding: 32px; display: flex; flex-direction: column; }
        .schedule-right-header { font-size: 0.875rem; font-weight: 600; color: var(--text, #0F172A); margin-bottom: 16px; }
        .schedule-right-empty { flex: 1; display: flex; align-items: center; justify-content: center; text-align: center; color: var(--text-muted, #94A3B8); font-size: 0.875rem; padding: 40px 0; }
        .time-slots { display: flex; flex-direction: column; gap: 8px; flex: 1; overflow-y: auto; max-height: 420px; }
        .time-slot { padding: 12px 16px; border: 1px solid var(--border, #E2E8F0); border-radius: 10px; font-size: 0.875rem; font-weight: 500; color: var(--text, #0F172A); cursor: pointer; transition: all 0.15s; text-align: center; background: #fff; }
        .time-slot:hover { border-color: var(--accent, #3B82F6); background: var(--accent-soft, #DBEAFE); color: var(--accent, #3B82F6); }
        .time-slot.selected { background: var(--accent, #3B82F6); color: #fff; border-color: var(--accent, #3B82F6); }

        .schedule-confirm-wrap { margin-top: 16px; }
        .schedule-confirm-btn { width: 100%; padding: 14px; background: var(--accent, #3B82F6); color: #fff; border: none; border-radius: 10px; font-size: 0.938rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .schedule-confirm-btn:hover { background: var(--accent-hover, #2563EB); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(59,130,246,0.3); }
        .schedule-confirm-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

        /* step 2: minimal form */
        .schedule-form-step { padding: 40px; }
        .schedule-form-step h2 { font-size: 1.25rem; font-weight: 700; margin-bottom: 6px; color: var(--text, #0F172A); }
        .schedule-form-step .form-sub { font-size: 0.875rem; color: var(--text-secondary, #475569); margin-bottom: 24px; }
        .schedule-form-step .selected-slot { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-soft, #DBEAFE); color: var(--accent, #3B82F6); padding: 10px 16px; border-radius: 10px; font-size: 0.875rem; font-weight: 600; margin-bottom: 24px; }
        .schedule-form-step .selected-slot svg { flex-shrink: 0; }
        .sform-group { margin-bottom: 16px; }
        .sform-group label { display: block; font-size: 0.813rem; font-weight: 600; margin-bottom: 6px; color: var(--text, #0F172A); }
        .sform-group input { width: 100%; padding: 12px 14px; border: 1px solid var(--border, #E2E8F0); border-radius: 10px; font-size: 0.938rem; transition: border-color 0.2s; }
        .sform-group input:focus { outline: none; border-color: var(--accent, #3B82F6); box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        .sform-group .req { color: #EF4444; }
        .schedule-form-actions { display: flex; gap: 12px; margin-top: 24px; }
        .schedule-form-actions .btn-back { flex: 0 0 auto; padding: 14px 20px; background: #fff; border: 1px solid var(--border, #E2E8F0); border-radius: 10px; font-size: 0.875rem; font-weight: 600; cursor: pointer; color: var(--text-secondary, #475569); transition: all 0.15s; }
        .schedule-form-actions .btn-back:hover { border-color: var(--text-muted, #94A3B8); background: var(--bg-subtle, #F1F5F9); }
        .schedule-form-actions .btn-submit { flex: 1; padding: 14px; background: var(--accent, #3B82F6); color: #fff; border: none; border-radius: 10px; font-size: 0.938rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .schedule-form-actions .btn-submit:hover { background: var(--accent-hover, #2563EB); }

        /* done */
        .schedule-done { padding: 60px 40px; text-align: center; }
        .schedule-done-icon { width: 64px; height: 64px; border-radius: 50%; background: var(--success-soft, #D1FAE5); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .schedule-done h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 10px; color: var(--text, #0F172A); }
        .schedule-done p { color: var(--text-secondary, #475569); font-size: 1rem; line-height: 1.75; margin-bottom: 6px; }
        .schedule-done .slot-recap { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-soft, #DBEAFE); color: var(--accent, #3B82F6); padding: 10px 20px; border-radius: 10px; font-weight: 600; margin: 20px 0; font-size: 0.938rem; }
        .schedule-done .back-link { display: inline-block; margin-top: 20px; color: var(--text-muted, #94A3B8); font-size: 0.875rem; text-decoration: none; }
        .schedule-done .back-link:hover { color: var(--text, #0F172A); }

        /* benefits bar */
        .schedule-benefits { display: flex; justify-content: center; gap: 24px; margin-top: 24px; flex-wrap: wrap; }
        .schedule-benefits span { display: flex; align-items: center; gap: 6px; font-size: 0.813rem; color: var(--text-secondary, #475569); }
        .schedule-benefits .bcheck { color: var(--success, #10B981); font-weight: 700; }

        @media (max-width: 768px) {
          .schedule-main { grid-template-columns: 1fr; }
          .schedule-left { border-right: none; border-bottom: 1px solid var(--border, #E2E8F0); }
          .schedule-right { min-height: 200px; }
          .time-slots { max-height: 260px; display: grid; grid-template-columns: repeat(2, 1fr); }
          .schedule-benefits { flex-direction: column; align-items: center; gap: 8px; }
        }
      `}</style>

      <header className="sub-header">
        <div className="sub-header-inner">
          <a href="./" className="header-logo" style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 40" style={{ height: "20px", width: "auto" }}>
              <path d="M4,32 C4,32 12,6 24,6 C34,6 28,28 36,28 C44,28 38,4 48,4 C60,4 68,32 68,32" stroke="#1a1a2e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <text x="80" y="28" fontFamily="'Helvetica Neue',Arial,sans-serif" fontSize="22" fontWeight="300" fill="#1a1a2e" letterSpacing="3">RAKUDAインボイス</text>
            </svg>
          </a>
        </div>
      </header>

      <main className="schedule-page">
        <div className="schedule-container">
          <div className="schedule-header">
            <div className="badge">15分の無料相談</div>
            <h1>日程を選んで、すぐに予約</h1>
            <p>ご都合のよい日時を選ぶだけ。確認メールが届きます。</p>
          </div>

          <div className="schedule-main">
            {step === "calendar" && (
              <>
                {/* LEFT: Calendar */}
                <div className="schedule-left">
                  <div className="schedule-info">
                    <div className="schedule-info-label">RAKUDAインボイス</div>
                    <div className="schedule-info-title">無料相談・デモ</div>
                    <div className="schedule-info-meta">
                      <span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        15分
                      </span>
                      <span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 5h12" stroke="currentColor" strokeWidth="1.2"/></svg>
                        Zoom / Google Meet
                      </span>
                    </div>
                  </div>

                  <div className="cal-nav">
                    <button onClick={prevMonth} aria-label="前月">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <span className="cal-nav-title">{currentYear}年 {MONTH_NAMES[currentMonth]}</span>
                    <button onClick={nextMonth} aria-label="翌月">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>

                  <div className="cal-grid">
                    {WEEKDAYS.map((d) => (
                      <div key={d} className="cal-dow">{d}</div>
                    ))}
                    {calendarDays.map((day, i) => {
                      if (day === null) return <div key={`e${i}`} className="cal-day" />;
                      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                      const avail = isDateAvailable(day);
                      const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;
                      const isSel = selectedDate === dateStr;
                      return (
                        <div
                          key={day}
                          className={`cal-day${avail ? " available" : ""}${isSel ? " selected" : ""}${isToday ? " today" : ""}`}
                          onClick={() => avail && handleDateClick(day)}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT: Time slots */}
                <div className="schedule-right">
                  {selectedDate ? (
                    <>
                      <div className="schedule-right-header">
                        {formatDateDisplay(selectedDate)} の空き枠
                      </div>
                      <div className="time-slots">
                        {TIME_SLOTS.map((t) => (
                          <div
                            key={t}
                            className={`time-slot${selectedTime === t ? " selected" : ""}`}
                            onClick={() => handleTimeClick(t)}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                      <div className="schedule-confirm-wrap">
                        <button
                          className="schedule-confirm-btn"
                          disabled={!selectedTime}
                          onClick={handleConfirm}
                        >
                          {selectedTime ? `${formatDateDisplay(selectedDate)} ${selectedTime} で予約する` : "時間を選択してください"}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="schedule-right-empty">
                      <div>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }}>
                          <rect x="3" y="5" width="26" height="24" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M3 12h26" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M10 2v5M22 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        左のカレンダーから<br />日付を選んでください
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {step === "form" && (
              <div className="schedule-form-step" style={{ gridColumn: "1 / -1" }}>
                <h2>あと少しで予約完了</h2>
                <p className="form-sub">以下を入力して予約を確定してください。</p>
                <div className="selected-slot">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6h14" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {selectedDate && formatDateDisplay(selectedDate)} {selectedTime}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="sform-group">
                    <label>お名前 <span className="req">*</span></label>
                    <input type="text" required placeholder="田中 太郎" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="sform-group">
                    <label>メールアドレス <span className="req">*</span></label>
                    <input type="email" required placeholder="tanaka@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="sform-group">
                    <label>会社名</label>
                    <input type="text" placeholder="ラクダ株式会社" value={company} onChange={(e) => setCompany(e.target.value)} />
                  </div>
                  <div className="schedule-form-actions">
                    <button type="button" className="btn-back" onClick={() => setStep("calendar")}>
                      &#8592; 日時を変更
                    </button>
                    <button type="submit" className="btn-submit">
                      予約を確定する
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "done" && (
              <div className="schedule-done" style={{ gridColumn: "1 / -1" }}>
                <div className="schedule-done-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h2>予約が確定しました</h2>
                <p>{email} に確認メールをお送りしました。</p>
                <div className="slot-recap">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6h14" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {selectedDate && formatDateDisplay(selectedDate)} {selectedTime}
                </div>
                <p>当日はZoom / Google Meetのリンクをお送りします。</p>
                <a href="./" className="back-link">&larr; トップページに戻る</a>
              </div>
            )}
          </div>

          <div className="schedule-benefits">
            <span><span className="bcheck">&#x2714;</span> 請求書業務の課題ヒアリング</span>
            <span><span className="bcheck">&#x2714;</span> Zoom / Google Meet / 電話OK</span>
            <span><span className="bcheck">&#x2714;</span> 最短翌営業日に対応</span>
          </div>
        </div>
      </main>

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
    </>
  );
}
