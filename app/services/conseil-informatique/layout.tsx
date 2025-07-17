import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conseil Informatique & Stratégie IT | Oxelya - Expert à Bordeaux',
  description: 'Expert en conseil informatique à Bordeaux. Audit IT, transformation digitale, stratégie technologique, optimisation systèmes. Accompagnement personnalisé pour PME et entreprises.',
  keywords: [
    'conseil informatique',
    'conseil informatique Bordeaux',
    'audit IT',
    'transformation digitale',
    'stratégie IT',
    'consultant informatique',
    'optimisation systèmes',
    'migration cloud',
    'pilotage projets IT',
    'conseil en systèmes d\'information',
    'accompagnement technologique',
    'expertise IT',
    'sécurité informatique',
    'infrastructure IT'
  ],
  authors: [{ name: 'Oxelya' }],
  creator: 'Oxelya',
  publisher: 'Oxelya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://oxelya.com'),
  alternates: {
    canonical: '/services/conseil-informatique',
  },
  openGraph: {
    title: 'Conseil Informatique & Stratégie IT | Oxelya',
    description: 'Expert en conseil informatique à Bordeaux. Audit IT, transformation digitale, stratégie technologique. Accompagnement personnalisé pour optimiser votre infrastructure.',
    url: 'https://oxelya.com/services/conseil-informatique',
    siteName: 'Oxelya',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-conseil-informatique.jpg',
        width: 1200,
        height: 630,
        alt: 'Conseil Informatique Oxelya - Expert IT Bordeaux',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conseil Informatique & Stratégie IT | Oxelya',
    description: 'Expert en conseil informatique à Bordeaux. Audit IT, transformation digitale, stratégie technologique.',
    images: ['/og-conseil-informatique.jpg'],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function ConseilInformatiqueLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Conseil Informatique",
            "description": "Services de conseil en informatique, audit IT, transformation digitale et stratégie technologique pour entreprises à Bordeaux.",
            "provider": {
              "@type": "Organization",
              "name": "Oxelya",
              "url": "https://oxelya.com",
              "logo": "https://oxelya.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bordeaux",
                "addressCountry": "FR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33-6-43-32-34-12",
                "contactType": "customer service",
                "availableLanguage": "French"
              }
            },
            "serviceType": [
              "Conseil Informatique",
              "Audit IT",
              "Transformation Digitale",
              "Stratégie IT",
              "Migration Cloud",
              "Optimisation Systèmes"
            ],
            "areaServed": {
              "@type": "Place",
              "name": "Bordeaux, France"
            },
            "url": "https://oxelya.com/services/conseil-informatique",
            "mainEntityOfPage": "https://oxelya.com/services/conseil-informatique"
          }),
        }}
      />
      
      {/* Structure de données pour les services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Oxelya - Conseil Informatique",
            "image": "https://oxelya.com/og-conseil-informatique.jpg",
            "description": "Expert en conseil informatique proposant audit IT, transformation digitale, stratégie technologique et optimisation des systèmes d'information.",
            "telephone": "+33-6-43-32-34-12",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bordeaux",
              "addressRegion": "Nouvelle-Aquitaine",
              "addressCountry": "FR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "44.8378",
              "longitude": "-0.5792"
            },
            "url": "https://oxelya.com/services/conseil-informatique",
            "priceRange": "€€",
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "44.8378",
                "longitude": "-0.5792"
              },
              "geoRadius": "100000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de Conseil Informatique",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Audit IT et Sécurité",
                    "description": "Évaluation complète de votre infrastructure informatique et de votre sécurité."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Transformation Digitale",
                    "description": "Accompagnement dans votre transition numérique et modernisation de vos outils."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Stratégie IT",
                    "description": "Élaboration d'une roadmap technologique alignée sur vos objectifs business."
                  }
                }
              ]
            }
          }),
        }}
      />
      
      {children}
    </>
  )
} 