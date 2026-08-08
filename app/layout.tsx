import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "AI智能医生助手",
    description: "为长者提供便捷的 AI 医生对话、用药提醒和家人关怀信息。",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
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
}

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
