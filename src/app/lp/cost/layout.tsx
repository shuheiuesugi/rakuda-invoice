import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "月額980円で請求書無制限 — 他社の1/3の価格 | ラクダInvoice",
  robots: { index: false, follow: false },
};

export default function CostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
