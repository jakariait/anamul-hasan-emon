import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rifat | Elevate With Rifat",
  description:
    "Helping business owners drive real growth with data-driven marketing, clear ROI, and scalable strategies. Partner with Rifat to elevate your brand.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      {/* Google Tag Manager script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id=GTM-5NCF5TJT'+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5NCF5TJT');
            `,
        }}
      />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    {/* Google Tag Manager (noscript) */}
    <noscript
      dangerouslySetInnerHTML={{
        __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5NCF5TJT"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
      }}
    />
    {children}
    </body>
    </html>
  );
}
