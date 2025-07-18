import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oxelya - Conception Web & Services Numériques",
  description: "Oxelya offre ses prestantions en conception web, programmation, sécurité informatique, et conseil en informatique.",
  keywords: [
    // Services principaux
    "pentest", "sécurité informatique", "développement web", "services numériques", "conseil IT", "cybersécurité", "transformation numérique", "audit sécurité", "conception web", "programmation", "conseil en informatique",
    
    // Technologies
    "React", "Next.js", "TypeScript", "Node.js", "Python", "API REST", "GraphQL",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
    
    // Géographie
    "Bordeaux", "Gironde", "Nouvelle-Aquitaine", "France", "Arcachon",
    
    // Secteurs
    "sécurité informatique", "développement application web", "migration cloud",
    "audit RGPD", "conformité ISO 27001", "OWASP", "vulnerabilités",
    "applications mobiles", "PWA", "microservices", "CI/CD"
  ],
  authors: [{ name: "Oxelya", url: "https://oxelya.com" }],
  creator: "Oxelya - Conception Web & Services Numériques",
  publisher: "Oxelya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Oxelya - Conception Web & Services Numériques",
    description: "Oxelya offre ses prestantions en conception web, programmation, sécurité informatique, et conseil en informatique.",
    url: "https://oxelya.com/services",
    siteName: "Oxelya - Conception Web & Services Numériques",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Oxelya - Conception Web & Services Numériques",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oxelya - Conception Web & Services Numériques",
    description: "Oxelya offre ses prestantions en conception web, programmation, sécurité informatique, et conseil en informatique.",
    site: "@oxelya",
    creator: "@oxelya",
    images: ["/twitter-services.jpg"],
  },
  alternates: {
    canonical: "https://oxelya.com/services",
    languages: {
      "fr-FR": "https://oxelya.com/services",
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
  verification: {
    google: "verification-code-google",
    other: {
      "msvalidate.01": "verification-code-bing",
    },
  },
  category: "technology",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 