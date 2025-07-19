'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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
  // Calculer la note moyenne
  const averageRating = article.ratings.length > 0 
    ? article.ratings.reduce((acc, r) => acc + r.rating, 0) / article.ratings.length 
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${article.slug}`}>
        <article className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 overflow-hidden h-full flex flex-col">
          {/* Image de l'article */}
          {article.imageUrl && (
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <Image 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          )}

          {/* Contenu */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            {/* Métadonnées */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                  {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-sm">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                </span>
              </div>
            </div>

            {/* Titre */}
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 font-winky group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 flex-1">
              {article.title}
            </h2>

            {/* Extrait */}
            {article.excerpt && (
              <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                {article.excerpt}
              </p>
            )}

            {/* Statistiques */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-auto">
              <span>
                {article.comments.length} commentaire{article.comments.length !== 1 ? 's' : ''}
              </span>
              <span>
                Par {article.admin.username}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
} 