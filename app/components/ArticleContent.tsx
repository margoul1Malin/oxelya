'use client'

import { motion } from 'framer-motion'
import MarkdownRenderer from './MarkdownRenderer'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ArticleContentProps {
  article: {
    id: string
    title: string
    content: string
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    admin: {
      username: string
    }
    ratings: Array<{ rating: number }>
  }
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Calculer la note moyenne
  const averageRating = article.ratings.length > 0 
    ? article.ratings.reduce((acc, r) => acc + r.rating, 0) / article.ratings.length 
    : 0

  const articleContent = (
    <article className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 text-center md:text-left">
      {/* Image de l'article */}
      {article.imageUrl && (
        <div className="relative h-48 sm:h-64 lg:h-80 xl:h-96 rounded-xl overflow-hidden mb-4 sm:mb-6 lg:mb-8">
          <Image 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
            width={346}
            height={195}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 75vw, 66vw"
            priority
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      )}

      {/* Métadonnées */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
          <span>
            Par {article.admin.username}
          </span>
          <span>
            {new Date(article.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400">★</span>
          <span>
            {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'} 
            ({article.ratings.length} avis)
          </span>
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6 font-winky leading-tight">
        {article.title}
      </h1>

      {/* Contenu Markdown */}
      <div>
        <MarkdownRenderer content={article.content} />
      </div>
    </article>
  )

  return (
    <>
      {!isClient ? (
        /* Version statique (visible sans JS) */
        articleContent
      ) : (
        /* Version animée (visible avec JS) */
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-12 text-center md:text-left"
        >
          {/* Image de l'article */}
          {article.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-48 sm:h-64 lg:h-80 xl:h-96 rounded-xl overflow-hidden mb-4 sm:mb-6 lg:mb-8"
            >
              <Image 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
                width={346}
                height={195}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 75vw, 66vw"
                priority
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
          )}

          {/* Métadonnées */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <span>
                Par {article.admin.username}
              </span>
              <span>
                {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★</span>
              <span>
                {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'} 
                ({article.ratings.length} avis)
              </span>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 sm:mb-6 font-winky leading-tight"
          >
            {article.title}
          </motion.h1>

          {/* Contenu Markdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <MarkdownRenderer content={article.content} />
          </motion.div>
        </motion.article>
      )}
    </>
  )
} 