'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BlogHeader() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {!isClient ? (
          /* Version statique (visible sans JS) */
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Blog Oxelya
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Découvrez nos articles sur la cybersécurité, le développement web, 
              et les dernières innovations technologiques.
            </p>
          </div>
        ) : (
          /* Version animée (visible avec JS) */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Blog Oxelya
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              Découvrez nos articles sur la cybersécurité, le développement web, 
              et les dernières innovations technologiques.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
} 