'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

interface BlogArticleCardProps {
  article: ArticleWithStats
  index: number
}

export default function BlogArticleCard({ article, index }: BlogArticleCardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculer la note moyenne
  const averageRating = article.ratings.length > 0 
    ? article.ratings.reduce((acc, r) => acc + r.rating, 0) / article.ratings.length 
    : 0

  const articleContent = (
    <Link href={`/blog/${article.slug}`} aria-label={`Lire l'article : ${article.title}`}>
      <article className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 overflow-hidden h-full flex flex-col" role="article">
        {/* Image de l'article */}
        {article.imageUrl && (
          <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
            <Image 
              src={article.imageUrl} 
              alt={`Image pour l'article : ${article.title}`}
              className="w-full h-full object-cover transition-transform duration-700 scale-110 group-hover:scale-120"
              width={378}
              height={213}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 4} // Priorité pour les 4 premiers articles
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true"></div>
          </div>
        )}

        {/* Contenu */}
        <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col bg-gray-900 backdrop-blur-sm rounded-t-2xl -mt-2 relative z-10">
          {/* Métadonnées */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2">
              <time 
                dateTime={new Date(article.createdAt).toISOString()}
                className="text-xs sm:text-sm text-gray-400"
              >
                {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center space-x-1" aria-label={`Note moyenne : ${averageRating > 0 ? averageRating.toFixed(1) : 'Non évalué'}`}>
              <span className="text-yellow-400 text-xs sm:text-sm" aria-hidden="true">★</span>
              <span className="text-white text-xs sm:text-sm">
                {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
              </span>
            </div>
          </div>

          {/* Titre */}
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3 font-winky group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 flex-1">
            {article.title}
          </h2>

          {/* Extrait */}
          {article.excerpt && (
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 flex-1">
              {article.excerpt}
            </p>
          )}

          {/* Statistiques */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-auto">
            <span aria-label={`${article.comments.length} commentaire${article.comments.length !== 1 ? 's' : ''}`}>
              {article.comments.length} commentaire{article.comments.length !== 1 ? 's' : ''}
            </span>
            <span aria-label={`Article écrit par ${article.admin.username}`}>
              Par {article.admin.username}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )

    return (
    <div className="group">
      {!isClient ? (
        /* Version statique (visible sans JS) */
        articleContent
      ) : (
        /* Version animée (visible avec JS) */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
          className="group"
        >
          {articleContent}
        </motion.div>
      )}
    </div>
  )
} 