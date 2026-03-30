import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "請求書作成、もう面倒じゃない — 30秒で完成 | RAKUDAインボイス",
  robots: { index: false, follow: false },
};

export default function EasyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
