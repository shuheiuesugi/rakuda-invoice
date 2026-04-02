import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// GTM Container ID (shared with other RAKUDA products)
const GTM_ID = "GTM-MCX2GV78";
// Microsoft Clarity Project ID (shared with other RAKUDA products)
const CLARITY_ID = "w0q16i8af0";

export const metadata: Metadata = {
  title: "RAKUDAインボイス — AI請求書作成",
  description:
    "AIが請求書を30秒で作成。インボイス制度対応、freee・マネーフォワード連携。",
  metadataBase: new URL("https://invoice.rakuda-ai.com"),
  openGraph: {
    title: "RAKUDAインボイス — AI請求書作成",
    description:
      "AIが請求書を30秒で作成。インボイス制度対応、freee・マネーフォワード連携。",
    url: "https://invoice.rakuda-ai.com",
    siteName: "RAKUDAインボイス",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAKUDAインボイス — AI請求書作成",
    description:
      "AIが請求書を30秒で作成。インボイス制度対応、freee・マネーフォワード連携。",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      </head>
      <body className="antialiased">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
