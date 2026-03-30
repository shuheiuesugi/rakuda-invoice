import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "請求書作成コスト最大90%削減 — 月額¥980のAI請求書 | RAKUDAインボイス",
  robots: { index: false, follow: false },
};

export default function CostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
