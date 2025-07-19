import { Metadata } from 'next'
import { Viewport } from 'next'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Oxelya - Blog',
  description: 'Le blog d&apos;Oxelya, pour partager nos connaissances et nos expériences. En DEVELOPPEMENT WEB, SECURITÉ INFORMATIQUE, et CONSEIL EN INFORMATIQUE. Nous sommes présents sur tous les fronts.',
  keywords: ['blog', 'Oxelya', 'developpement web', 'securite informatique', 'conseil informatique', 'pentest', 'cybersécurité', 'transformation numérique', 'audit sécurité', 'conception web', 'programmation', 'conseil en informatique'],
  authors: [{ name: 'Oxelya', url: 'https://oxelya.com' }],
  creator: 'Oxelya',
  publisher: 'Oxelya',
  alternates: {
    canonical: 'https://oxelya.com/blog',
  },
  openGraph: {
    title: 'Oxelya - Blog',
    description: 'Le blog d&apos;Oxelya, pour partager nos connaissances et nos expériences. En DEVELOPPEMENT WEB, SECURITÉ INFORMATIQUE, et CONSEIL EN INFORMATIQUE. Nous sommes présents sur tous les fronts.',
    url: 'https://oxelya.com/blog',
    siteName: 'Oxelya',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oxelya - Blog',
    description: 'Le blog d&apos;Oxelya, pour partager nos connaissances et nos expériences. En DEVELOPPEMENT WEB, SECURITÉ INFORMATIQUE, et CONSEIL EN INFORMATIQUE. Nous sommes présents sur tous les fronts.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  metadataBase: new URL('https://oxelya.com'),

}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation currentPage="blog" />
      {children}
      <Footer />
    </div>
  )
}