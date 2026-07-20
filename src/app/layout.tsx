import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import StructuredData from "@/components/shared/StructuredData";
import Header from "@/components/layout/Header";
import {
  GITHUB_URL,
  PERSON_ALTERNATE_NAME,
  PERSON_JOB_TITLE,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_IMAGE_PATH,
  TECHNICAL_TOPICS,
  absoluteUrl,
} from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: `${SITE_TITLE} | ${PERSON_NAME}`,
    template: `%s | ${PERSON_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL.toString() }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  keywords: TECHNICAL_TOPICS,
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
      ? {
          other: {
            "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
          },
        }
      : {}),
  },
  openGraph: {
    title: `${SITE_TITLE} | ${PERSON_NAME}`,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL.toString(),
    siteName: SITE_NAME,
    locale: "ko_KR",
    images: [
      {
        url: absoluteUrl(SOCIAL_IMAGE_PATH),
        width: 1024,
        height: 1024,
        alt: `${PERSON_NAME} 포트폴리오 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} | ${PERSON_NAME}`,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(SOCIAL_IMAGE_PATH)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const siteStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL.toString()}#website`,
    url: SITE_URL.toString(),
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "ko-KR",
    publisher: { "@id": `${SITE_URL.toString()}#person` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL.toString()}#person`,
    name: PERSON_NAME,
    alternateName: PERSON_ALTERNATE_NAME,
    url: SITE_URL.toString(),
    jobTitle: PERSON_JOB_TITLE,
    sameAs: [GITHUB_URL],
    knowsAbout: TECHNICAL_TOPICS,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning // hydration 경고 방지 (next-themes 필수 옵션)
    >
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider>
          <StructuredData id="site-structured-data" data={siteStructuredData} />
          {/* Film grain texture overlay */}
          <div className="noise-overlay" />

          {/* Main Application Container */}
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
