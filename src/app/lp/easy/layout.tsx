import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "はじめての請求書、カンタンに作れます | ラクダInvoice",
  robots: { index: false, follow: false },
};

export default function EasyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
