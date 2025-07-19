'use client'

import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { motion } from 'framer-motion'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Écrivez votre article en Markdown...",
  label = "Contenu de l'article"
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Header avec label et toggle preview */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          {isPreview ? 'Éditer' : 'Prévisualiser'}
        </button>
      </div>

      {/* Éditeur Markdown */}
      <div className="border border-gray-300 rounded-lg overflow-hidden dark:border-gray-600">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || '')}
          preview={isPreview ? 'preview' : 'live'}
          height={400}
          className="dark:bg-gray-900"
          textareaProps={{
            placeholder: placeholder,
            className: "dark:bg-gray-900 dark:text-white"
          }}
          previewOptions={{
            className: "dark:bg-gray-900 dark:text-white prose prose-invert max-w-none"
          }}
        />
      </div>


    </motion.div>
  )
} 