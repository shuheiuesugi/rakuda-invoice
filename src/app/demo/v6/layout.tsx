"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const basePath = "/rakuda-invoice";

const navItems = [
  { label: "ダッシュボード", icon: "grid", href: `${basePath}/demo/v6` },
  { label: "請求書一覧", icon: "file", href: `${basePath}/demo/v6` },
  { label: "新規作成", icon: "plus", href: `${basePath}/demo/v6/create` },
  { label: "取引先", icon: "users", href: `${basePath}/demo/v6/clients` },
  { label: "テンプレート", icon: "copy", href: `${basePath}/demo/v6/templates` },
  { label: "レポート", icon: "chart", href: `${basePath}/demo/v6/reports` },
  { label: "設定", icon: "settings", href: `${basePath}/demo/v6/settings` },
];

/* ── Components ──────────────────────────────── */

function WaveLogo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <path d="M10,75 C10,75 22,25 38,25 C52,25 44,65 56,65 C68,65 60,20 74,20 C90,20 100,75 100,75" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function NavIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  const s: React.CSSProperties = { width: size, height: size, strokeWidth: 1.5, stroke: "currentColor", fill: "none" };
  if (icon === "grid") return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
  if (icon === "file") return <svg viewBox="0 0 24 24" style={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
  if (icon === "plus") return <svg viewBox="0 0 24 24" style={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
  if (icon === "users") return <svg viewBox="0 0 24 24" style={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
  if (icon === "copy") return <svg viewBox="0 0 24 24" style={s}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
  if (icon === "chart") return <svg viewBox="0 0 24 24" style={s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
  if (icon === "settings") return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
  if (icon === "search") return <svg viewBox="0 0 24 24" style={s}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
  return null;
}

/* ── Page title map ── */
function getPageTitle(pathname: string): string {
  if (pathname.includes("/invoice")) return "請求書詳細";
  if (pathname.includes("/create")) return "新規作成";
  if (pathname.includes("/clients")) return "取引先";
  if (pathname.includes("/templates")) return "テンプレート";
  if (pathname.includes("/reports")) return "レポート";
  if (pathname.includes("/settings")) return "設定";
  return "ダッシュボード";
}

function isActiveNav(pathname: string, href: string, index: number): boolean {
  // Remove basePath for comparison
  const clean = pathname.replace(basePath, "");
  const cleanHref = href.replace(basePath, "");

  // Dashboard and invoice list both point to /demo/v6
  if (index === 0 && clean === "/demo/v6") return true;
  if (index === 1) return false; // 請求書一覧 shares href with dashboard; dashboard takes priority
  if (index > 1 && clean.startsWith(cleanHref)) return true;
  return false;
}

export default function V6Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(165deg, #0a0e17 0%, #0d1a2d 50%, #0f1729 100%)",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif",
      color: "#e2e8f0",
    }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 220,
        minHeight: "100vh",
        background: "rgba(6, 10, 18, 0.5)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px", marginBottom: 36 }}>
          <span style={{ color: "#60a5fa" }}><WaveLogo size={26} /></span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#7a8494" }}>RAKUDA</div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.02em", color: "#d1d5db", marginTop: -1 }}>INVOICE</div>
          </div>
        </div>

        <div style={{ padding: "0 12px", marginBottom: 8 }}>
          <Link href={`${basePath}/demo/v6/create`} style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%",
              padding: "10px 14px",
              background: "#3B82F6",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <NavIcon icon="plus" size={14} />
              新規請求書作成
            </button>
          </Link>
        </div>

        <nav style={{ flex: 1, marginTop: 8 }}>
          {navItems.map((item, i) => {
            const active = isActiveNav(pathname, item.href, i);
            return (
              <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 20px",
                  background: active ? "rgba(59, 130, 246, 0.1)" : "transparent",
                  color: active ? "#60a5fa" : "#7a8494",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  borderLeft: active ? "2px solid #3B82F6" : "2px solid transparent",
                  transition: "all 0.15s",
                }}>
                  <NavIcon icon={item.icon} size={16} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: "#fff",
          }}>U</div>
          <div>
            <div style={{ fontSize: 12, color: "#d1d5db", fontWeight: 500 }}>ユーザー名</div>
            <div style={{ fontSize: 10, color: "#4b5563" }}>Free プラン</div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflow: "auto" }}>
        {/* Header bar */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 56,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(6, 10, 18, 0.3)",
        }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: "#d1d5db", margin: 0 }}>{getPageTitle(pathname)}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4b5563" }}>
                <NavIcon icon="search" size={14} />
              </span>
              <input
                type="text"
                placeholder="検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "7px 12px 7px 32px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  color: "#e2e8f0",
                  fontSize: 12,
                  width: 200,
                  outline: "none",
                }}
              />
            </div>
          </div>
        </header>

        <div style={{ padding: "24px 32px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
