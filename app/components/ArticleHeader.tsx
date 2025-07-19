'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ArticleHeader() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const headerContent = (
    <Link 
      href="/blog"
      className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
    >
      <span>←</span>
      <span>Retour au blog</span>
    </Link>
  )

  return (
    <div className="relative pt-8 pb-8">
      <div className="max-w-4xl mx-auto px-8">
        {!isClient ? (
          /* Version statique (visible sans JS) */
          headerContent
        ) : (
          /* Version animée (visible avec JS) */
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {headerContent}
          </motion.div>
        )}
      </div>
    </div>
  )
} 