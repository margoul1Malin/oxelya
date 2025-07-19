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
export const revalidate = 60 // Revalidation toutes les minutes au lieu d'1 heure

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {articles.map((article, index) => (
              <BlogArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Contenu SEO supplémentaire */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 font-winky">Blog Oxelya - Expertise en Développement Web et Cybersécurité</h2>
          <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
            Découvrez notre blog dédié aux dernières innovations technologiques, à la cybersécurité et au développement web. 
            Notre équipe d&apos;experts partage son savoir-faire en pentesting, conseil informatique et transformation numérique 
            pour vous accompagner dans vos projets digitaux.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Développement Web et Technologies Modernes</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Notre blog couvre l&apos;ensemble des technologies web modernes : React, Next.js, TypeScript, 
                et les dernières innovations en développement frontend et backend. Nous partageons nos expériences 
                en création d&apos;applications web performantes et évolutives.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                De la conception UX/UI à l&apos;optimisation des performances, en passant par l&apos;intégration d&apos;APIs 
                et la mise en production, nos articles vous guident dans tous les aspects du développement web moderne.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Cybersécurité et Pentesting</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                La sécurité informatique est au cœur de nos préoccupations. Nos articles traitent des dernières 
                menaces cybernétiques, des bonnes pratiques de sécurité et des techniques de pentesting avancées 
                pour protéger vos systèmes et données.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Nous partageons notre expertise en audit de sécurité, tests d&apos;intrusion et conseil en cybersécurité 
                pour vous aider à renforcer la protection de votre infrastructure informatique.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Conseil Informatique et Transformation Digitale</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                La transformation numérique est un enjeu majeur pour toutes les entreprises. Nos articles abordent 
                les stratégies d&apos;optimisation IT, la migration cloud, et l&apos;accompagnement dans vos projets de 
                modernisation technologique.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Nous vous guidons dans l&apos;élaboration de votre roadmap technologique, l&apos;optimisation de vos coûts IT 
                et l&apos;adoption des meilleures pratiques pour maximiser votre efficacité opérationnelle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Innovation et Tendances Technologiques</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Restez à la pointe de l&apos;innovation avec nos analyses des dernières tendances technologiques. 
                Nous explorons les nouvelles technologies, les frameworks émergents et les méthodologies 
                qui façonnent l&apos;avenir du développement et de la cybersécurité.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                De l&apos;intelligence artificielle aux technologies blockchain, en passant par l&apos;IoT et la réalité virtuelle, 
                nous vous tenons informés des innovations qui peuvent transformer votre business.
              </p>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Expertise Régionale - Bordeaux, Arcachon, Marcheprime</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Basés dans la région bordelaise, nous accompagnons les entreprises de Bordeaux, Arcachon et Marcheprime 
              dans leurs projets de développement web et de cybersécurité. Notre expertise locale nous permet de comprendre 
              les enjeux spécifiques de votre territoire et de proposer des solutions adaptées à votre contexte régional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
