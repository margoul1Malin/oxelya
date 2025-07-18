import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développement Web Moderne | Oxelya - Applications Next.js & Django',
  description: 'Expert en développement web à Bordeaux. Création d\'applications modernes avec React, Next.js, TypeScript et Three.js. Solutions sur-mesure, performantes et sécurisées.',
  keywords: [
    'développement web',
    'React',
    'Next.js',
    'TypeScript',
    'Three.js',
    'applications web',
    'JavaScript',
    'développeur web Bordeaux',
    'site web sur mesure',
    'application mobile',
    'API REST',
    'GraphQL',
    'interface utilisateur',
    'UX/UI design',
    'optimisation SEO',
    'performance web'
  ],
  openGraph: {
    title: 'Développement Web Moderne | Oxelya',
    description: 'Création d\'applications web exceptionnelles avec React, Next.js et Three.js. Solutions sur-mesure à Bordeaux.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Oxelya',
    images: [
      {
        url: '/og-developpement-web.jpg',
        width: 1200,
        height: 630,
        alt: 'Développement Web Moderne - Oxelya'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développement Web Moderne | Oxelya',
    description: 'Applications web modernes avec React, Next.js et Three.js',
    images: ['/og-developpement-web.jpg']
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
  alternates: {
    canonical: 'https://oxelya.fr/services/developpement-web'
  }
}

export default function DeveloppementWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Développement Web Moderne",
            "description": "Création d'applications web modernes avec React, Next.js, TypeScript et Three.js",
            "provider": {
              "@type": "Organization",
              "name": "Oxelya",
              "url": "https://oxelya.fr",
              "logo": "https://oxelya.fr/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33643323412",
                "contactType": "customer service",
                "availableLanguage": "French"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bordeaux",
                "addressCountry": "FR"
              }
            },
            "serviceType": "Développement Web",
            "areaServed": {
              "@type": "Place",
              "name": "France"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de Développement Web",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Applications React & Next.js",
                    "description": "Développement d'applications web modernes avec React et Next.js"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Expériences 3D avec Three.js",
                    "description": "Création d'expériences 3D interactives pour le web"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "API REST & GraphQL",
                    "description": "Développement d'APIs sécurisées et performantes"
                  }
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  )
} 