import { prisma } from '../../lib/prisma'
import { notFound } from 'next/navigation'
import ArticleHeader from '../../components/ArticleHeader'
import ArticleContent from '../../components/ArticleContent'
import ArticleComments from '../../components/ArticleComments'
import { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

// Génération des métadonnées SEO dynamiques
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const article = await prisma.article.findUnique({
    where: {
      slug: resolvedParams.slug,
      published: true
    },
    include: {
      admin: {
        select: {
          username: true
        }
      }
    }
  })

  if (!article) {
    return {
      title: 'Article non trouvé | Oxelya',
      description: 'L\'article que vous recherchez n\'existe pas ou n\'est pas encore publié.'
    }
  }

  // Calculer la note moyenne
  const ratings = await prisma.rating.findMany({
    where: { articleId: article.id },
    select: { rating: true }
  })
  
  const averageRating = ratings.length > 0 
    ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length 
    : 0

  // Extraire les mots-clés du contenu (premiers 200 caractères)
  const contentPreview = article.content.replace(/<[^>]*>/g, '').substring(0, 200)
  
  // Utiliser les métadonnées personnalisées ou générer automatiquement
  const metaTitle = article.metaTitle || `${article.title} | Blog Oxelya`
  const metaDesc = article.metaDesc || article.excerpt || contentPreview + '...'
  const metaKeywords = article.metaKeywords || [
    'blog oxelya',
    'développement web',
    'sécurité informatique',
    'conseil informatique',
    'cybersécurité',
    'pentest',
    'transformation numérique',
    article.title.toLowerCase(),
    ...contentPreview.toLowerCase().split(' ').slice(0, 10)
  ].filter((word, index, arr) => arr.indexOf(word) === index && word.length > 3).join(', ')

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: metaKeywords,
    authors: [{ name: article.admin.username, url: 'https://oxelya.com' }],
    creator: 'Oxelya',
    publisher: 'Oxelya',
    alternates: {
      canonical: `https://oxelya.com/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt || contentPreview + '...',
      url: `https://oxelya.com/blog/${article.slug}`,
      siteName: 'Oxelya',
      locale: 'fr_FR',
      type: 'article',
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.admin.username],
      images: article.imageUrl ? [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/jpeg',
        }
      ] : ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || contentPreview + '...',
      images: article.imageUrl ? [article.imageUrl] : ['/og-image.jpg'],
    },
    other: {
      'article:author': article.admin.username,
      'article:published_time': article.createdAt.toISOString(),
      'article:modified_time': article.updatedAt.toISOString(),
      'article:section': 'Blog',
      'article:tag': metaKeywords.split(', ').slice(0, 5).join(', '),
      'rating:value': averageRating.toString(),
      'rating:scale': '5',
      'rating:count': ratings.length.toString(),
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

// Génération statique des pages pour SEO
export async function generateStaticParams() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    select: { slug: true }
  })

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Forcer le rendu statique
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidation toutes les heures

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Récupérer l'article par son slug
  const resolvedParams = await params
  const article = await prisma.article.findUnique({
    where: {
      slug: resolvedParams.slug,
      published: true
    },
    include: {
      admin: {
        select: {
          username: true
        }
      },
      comments: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      ratings: {
        select: {
          rating: true
        }
      }
    }
  })

  if (!article) {
    notFound()
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header avec navigation */}
      <ArticleHeader />

      {/* Article principal et commentaires */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Article principal - Plus large sur desktop */}
          <div className="xl:col-span-3">
            <ArticleContent article={article} />
          </div>

          {/* Section commentaires et notes - Plus compact sur desktop */}
          <div className="xl:col-span-1">
            <ArticleComments articleId={article.id} comments={article.comments} />
          </div>
        </div>
      </div>
    </div>
  )
} 