'use client'

import { motion } from 'framer-motion'

export default function BlogEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center py-20"
    >
      <div className="text-6xl mb-6">📝</div>
      <h2 className="text-2xl font-semibold text-white mb-4 font-winky">
        Aucun article pour le moment
      </h2>
      <p className="text-gray-400 max-w-md mx-auto">
        Les premiers articles arrivent bientôt ! Restez connectés pour découvrir 
        nos contenus sur la cybersécurité et le développement web.
      </p>
    </motion.div>
  )
} 