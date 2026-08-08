import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = `${siteOrigin}${basePath}/`;
const socialImage = `${siteOrigin}${basePath}/og.png`;
const favicon = `${basePath}/favicon.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI智能医生助手",
  description: "为长者提供便捷的 AI 医生对话、用药提醒和家人关怀信息。",
  icons: {
    icon: favicon,
    shortcut: favicon,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    title: "AI智能医生助手",
    description: "AI 医生对话、用药提醒与家人关怀助手。",
    images: [{ url: socialImage, width: 1733, height: 907, alt: "AI智能医生助手" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI智能医生助手",
    description: "AI 医生对话、用药提醒与家人关怀助手。",
    images: [socialImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
