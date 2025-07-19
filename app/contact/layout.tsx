import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oxelya - Contact",
  description: "Contactez Oxelya pour vos projets de CYBERSECURITÉ, DEVELOPPEMENT WEB et CONSEIL IT à BORDEAUX, MARCHEPRIME, ARCACHON et sur le BASSIN D'ARCACHON en général. Devis gratuit, réponse rapide. Email: contact@oxelya.com - Tél: 06 43 32 34 12",
  keywords: [
    // Contact
    "contact Oxelya", "devis pentest", "devis développement web", "contact cybersécurité",
    "consultation IT Bordeaux", "expert sécurité informatique", 
    
    // Services de contact
    "demande devis", "audit sécurité gratuit", "consultation développement web",
    "contact expert React", "contact développeur Next.js", "conseil IT Bordeaux",
    
    // Géographie  
    "Bordeaux", "Gironde", "Nouvelle-Aquitaine", "contact développeur Bordeaux",
    "pentest Bordeaux", "cybersécurité Bordeaux", "conseil informatique Bordeaux",
    
    // Actions
    "formulaire contact", "prendre rendez-vous", "demander information",
    "projet développement web", "audit infrastructure", "formation cybersécurité"
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
    title: "Oxelya - Contact",
    description: "Besoin d'un expert en cybersécurité ou développement web à Bordeaux ? Contactez Oxelya pour un devis personnalisé. Tests d'intrusion, applications React/Next.js, conseil IT.",
    url: "https://oxelya.com/contact",
    siteName: "Oxelya - Services Numériques",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Oxelya - Expert Cybersécurité et Développement Web Bordeaux",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oxelya - Contact",
    description: "Contactez nos experts en cybersécurité et développement web à Bordeaux. Devis gratuit et réponse rapide pour vos projets.",
    site: "@oxelya",
    creator: "@oxelya",
    images: ["/twitter-contact.jpg"],
  },
  alternates: {
    canonical: "https://oxelya.com/contact",
    languages: {
      "fr-FR": "https://oxelya.com/contact",
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
  category: "business",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 