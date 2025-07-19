'use client'

import { marked } from 'marked'
import { motion } from 'framer-motion'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Configuration de marked pour la sécurité
  marked.setOptions({
    breaks: true,
    gfm: true,
  })

  // Rendu du Markdown en HTML
  const htmlContent = marked(content)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`prose prose-invert prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
} 