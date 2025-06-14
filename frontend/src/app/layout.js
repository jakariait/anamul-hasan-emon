import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getBrandName, getHomePageDescription } from "@/utils/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: getBrandName(),
  description: getHomePageDescription(),
  icons: {
    icon: [
      { rel: "icon", url: "/favicon-32x32.png", type: "image/x-icon" },
    ],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
