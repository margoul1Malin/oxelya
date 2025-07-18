import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oxelya - Mentions Légales",
  description: "Mentions légales d'Oxelya, entreprise de services numériques basée à Bordeaux. Informations légales, SIRET, hébergement, propriété intellectuelle et responsabilité.",
  keywords: [
    // Légal
    "mentions légales", "informations légales Oxelya", "SIRET Oxelya",
    "entreprise services numériques", "société informatique Bordeaux",
    
    // Entreprise
    "Oxelya Bordeaux", "Théo Morio", "directeur publication", 
    "entreprise individuelle", "services numériques France",
    
    // Légal spécifique
    "propriété intellectuelle", "responsabilité site web", "hébergement Vercel",
    "droit applicable", "tribunaux Bordeaux", "contact légal",
    
    // Géographie
    "Bordeaux", "Gironde", "France", "siège social Bordeaux"
  ],
  authors: [{ name: "Oxelya", url: "https://oxelya.com" }],
  creator: "Oxelya - Services Numériques",
  publisher: "Oxelya",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Oxelya - Mentions Légales",
    description: "Informations légales complètes d'Oxelya, entreprise de services numériques spécialisée en cybersécurité et développement web à Bordeaux.",
    url: "https://oxelya.com/mentions-legales",
    siteName: "Oxelya - Services Numériques",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-legal.jpg",
        width: 1200,
        height: 630,
        alt: "Mentions légales Oxelya - Services Numériques Bordeaux",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary",
    title: "Oxelya - Mentions Légales",
    description: "Informations légales et coordonnées officielles d'Oxelya, expert en cybersécurité et développement web à Bordeaux.",
    site: "@oxelya",
    creator: "@oxelya",
  },
  alternates: {
    canonical: "https://oxelya.com/mentions-legales",
    languages: {
      "fr-FR": "https://oxelya.com/mentions-legales",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 