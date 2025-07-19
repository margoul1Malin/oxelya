'use client'

import { motion } from 'framer-motion'

export default function BlogEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="text-center py-12 sm:py-20"
    >
      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6" role="img" aria-label="Icône d'article">📝</div>
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 font-winky">
        Aucun article pour le moment
      </h2>
      <p className="text-gray-400 max-w-md mx-auto px-4 text-sm sm:text-base">
        Les premiers articles arrivent bientôt ! Restez connectés pour découvrir 
        nos contenus sur la cybersécurité et le développement web.
      </p>
    </motion.div>
  )
} 