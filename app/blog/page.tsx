import { prisma } from '../lib/prisma'
import { Metadata } from 'next'
import BlogHeader from '../components/BlogHeader'
import BlogArticleCard from '../components/BlogArticleCard'
import BlogEmptyState from '../components/BlogEmptyState'

interface ArticleWithStats {
  id: string
  title: string
  content: string
  slug: string
  imageUrl: string | null
  excerpt: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  admin: {
    username: string
  }
  comments: Array<{ id: string }>
  ratings: Array<{ rating: number }>
}

// Métadonnées SEO pour la page blog
export const metadata: Metadata = {
  title: 'Blog Oxelya - Développement Web & Cybersécurité',
  description: 'Découvrez nos articles sur la cybersécurité, le développement web, et les dernières innovations technologiques. Expertise en pentest, conseil informatique et transformation numérique.',
  keywords: [
    'blog oxelya',
    'développement web',
    'sécurité informatique',
    'conseil informatique',
    'cybersécurité',
    'pentest',
    'transformation numérique',
    'audit sécurité',
    'conception web',
    'programmation',
    'conseil en informatique',
    'blog technique',
    'expertise IT',
    'solutions numériques'
  ],
  authors: [{ name: 'Oxelya', url: 'https://oxelya.com' }],
  creator: 'Oxelya',
  publisher: 'Oxelya',
  alternates: {
    canonical: 'https://oxelya.com/blog',
  },
  openGraph: {
    title: 'Blog Oxelya - Développement Web & Cybersécurité',
    description: 'Découvrez nos articles sur la cybersécurité, le développement web, et les dernières innovations technologiques.',
    url: 'https://oxelya.com/blog',
    siteName: 'Oxelya',
    locale: 'fr_FR',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Oxelya - Développement Web & Cybersécurité',
    description: 'Découvrez nos articles sur la cybersécurité, le développement web, et les dernières innovations technologiques.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

// Forcer le rendu statique pour SEO
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidation toutes les heures

export default async function BlogPage() {
  // Récupérer tous les articles publiés
  const articles: ArticleWithStats[] = await prisma.article.findMany({
    where: {
      published: true
    },
    include: {
      admin: {
        select: {
          username: true
        }
      },
      comments: {
        select: {
          id: true
        }
      },
      ratings: {
        select: {
          rating: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <BlogHeader />

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {articles.length === 0 ? (
          <BlogEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <BlogArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
