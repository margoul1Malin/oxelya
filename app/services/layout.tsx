import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services Numériques Oxelya | Pentest, Développement Web, Conseil IT | Bordeaux",
  description: "Oxelya propose des services numériques complets à Bordeaux : tests d'intrusion et cybersécurité, développement web moderne React/Next.js, conseil IT stratégique et solutions d'innovation sur-mesure. Experts certifiés CEH et OSCP.",
  keywords: [
    // Services principaux
    "pentest Bordeaux", "test intrusion", "cybersécurité", "audit sécurité", 
    "développement web Bordeaux", "développeur React", "développeur Next.js",
    "conseil informatique", "transformation digitale", "infrastructure IT",
    "solutions innovation", "automatisation", "DevOps",
    
    // Technologies
    "React", "Next.js", "TypeScript", "Node.js", "Python", "API REST", "GraphQL",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
    
    // Géographie
    "Bordeaux", "Gironde", "Nouvelle-Aquitaine", "France",
    
    // Secteurs
    "sécurité informatique", "développement application web", "migration cloud",
    "audit RGPD", "conformité ISO 27001", "OWASP", "vulnerabilités",
    "applications mobiles", "PWA", "microservices", "CI/CD"
  ],
  authors: [{ name: "Oxelya", url: "https://oxelya.com" }],
  creator: "Oxelya - Services Numériques",
  publisher: "Oxelya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Services Numériques Professionnels | Oxelya Bordeaux",
    description: "Expertise en cybersécurité, développement web React/Next.js et conseil IT. Tests d'intrusion, audits sécurité, applications web modernes et accompagnement transformation digitale à Bordeaux.",
    url: "https://oxelya.com/services",
    siteName: "Oxelya - Services Numériques",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Services numériques Oxelya - Pentest, Développement Web, Conseil IT",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Numériques Oxelya | Pentest & Développement Web Bordeaux",
    description: "Tests d'intrusion, développement React/Next.js, conseil IT. Experts certifiés pour votre transformation digitale à Bordeaux.",
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