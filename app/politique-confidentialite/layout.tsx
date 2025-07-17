import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité Oxelya | RGPD | Protection Données Personnelles",
  description: "Politique de confidentialité d'Oxelya conforme RGPD. Protection des données personnelles, cookies, droits utilisateurs, DPO contact. Transparence totale sur le traitement de vos données.",
  keywords: [
    // RGPD
    "politique confidentialité", "RGPD", "protection données personnelles", 
    "droits utilisateur", "consentement", "DPO", "délégué protection données",
    
    // Données
    "traitement données", "cookies", "données navigation", "formulaire contact",
    "conservation données", "transfert international", "sécurité données",
    
    // Droits
    "droit accès", "droit rectification", "droit effacement", "droit portabilité",
    "droit opposition", "retrait consentement", "réclamation CNIL",
    
    // Entreprise
    "Oxelya RGPD", "conformité RGPD", "protection vie privée",
    "responsable traitement", "Bordeaux", "services numériques"
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
    title: "Politique de Confidentialité RGPD | Oxelya Services Numériques",
    description: "Découvrez comment Oxelya protège vos données personnelles conformément au RGPD. Politique de confidentialité transparente et complète.",
    url: "https://oxelya.com/politique-confidentialite",
    siteName: "Oxelya - Services Numériques",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-privacy.jpg",
        width: 1200,
        height: 630,
        alt: "Politique de confidentialité RGPD Oxelya - Protection données personnelles",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary",
    title: "Politique de Confidentialité RGPD | Oxelya",
    description: "Protection de vos données personnelles conforme RGPD. Transparence totale sur nos pratiques de traitement des données.",
    site: "@oxelya",
    creator: "@oxelya",
  },
  alternates: {
    canonical: "https://oxelya.com/politique-confidentialite",
    languages: {
      "fr-FR": "https://oxelya.com/politique-confidentialite",
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

export default function PolitiqueConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 