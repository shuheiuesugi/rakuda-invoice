import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ラクダInvoice — AI請求書",
  description: "請求書を30秒で作成・送付。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
