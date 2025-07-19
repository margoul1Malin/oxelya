'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ArticleHeader() {
  return (
    <div className="relative pt-8 pb-8">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <span>←</span>
            <span>Retour au blog</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
} 