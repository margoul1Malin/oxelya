'use client'

import { marked } from 'marked'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Configuration de marked pour la sécurité
  marked.setOptions({
    breaks: true,
    gfm: true,
  })

  // Rendu du Markdown en HTML
  const htmlContent = marked(content)

  const markdownContent = (
    <div
      className={`prose prose-invert prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )

  return (
    <>
      {!isClient ? (
        /* Version statique (visible sans JS) */
        markdownContent
      ) : (
        /* Version animée (visible avec JS) */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`prose prose-invert prose-lg max-w-none ${className}`}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </>
  )
} 