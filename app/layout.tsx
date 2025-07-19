import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const winkyRough = localFont({
  src: [
    {
      path: "../public/fonts/static/WinkyRough-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/static/WinkyRough-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/static/WinkyRough-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/static/WinkyRough-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/static/WinkyRough-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/static/WinkyRough-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/static/WinkyRough-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/static/WinkyRough-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/static/WinkyRough-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/static/WinkyRough-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/static/WinkyRough-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/static/WinkyRough-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/static/WinkyRough-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/static/WinkyRough-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-winky-rough",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.oxelya.com'),
  title: {
    default: "Oxelya - Conception Web & Services Numériques",
    template: "%s | Oxelya"
  },
  icons: {
    icon: "/favicon.ico",
  },
  description: "Oxelya offre ses prestantions en conception WEB, PROGRAMMATION, SECURITÉ INFORMATIQUE, et CONSEIL EN INFORMATIQUE. Nous sommes spécialisés pour le référencement SEO chez GOOGLE, BING, YANDEX, etc...",
  keywords: ["pentest", "SÉCURITÉ INFORMATIQUE", "développement web", "SERVICES  NUMÉRIQUES", "CONSEIL IT", "CONCEPTION WEB", "cybersécurité", "transformation numérique", "audit sécurité", "conception web", "programmation", "conseil en informatique"],
  authors: [{ name: "Oxelya", url: "https://oxelya.com" }],
  creator: "Oxelya",
  publisher: "Oxelya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://oxelya.com",
    title: "Oxelya - Conception Web & Services Numériques",
    description: "Votre partenaire de confiance pour la transformation numérique et la sécurité informatique",
    siteName: "Oxelya",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oxelya - Services Numériques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oxelya - Conception Web & Services Numériques",
    description: "Votre partenaire de confiance pour la transformation numérique et la sécurité informatique",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: "https://oxelya.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${winkyRough.variable} antialiased`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
