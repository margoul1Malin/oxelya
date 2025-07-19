'use client'

import { motion } from 'framer-motion'
import UnifiedCommentForm from './UnifiedCommentForm'
import { useEffect, useState } from 'react'

interface Comment {
  id: string
  content: string
  authorName: string
  createdAt: Date
}

interface ArticleCommentsProps {
  articleId: string
  comments: Comment[]
}

export default function ArticleComments({ articleId, comments }: ArticleCommentsProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const commentsContent = (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      {/* Formulaire unifié */}
      <UnifiedCommentForm articleId={articleId} />

      {/* Liste des commentaires */}
      {comments.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 sm:mb-4 font-winky">
            Commentaires ({comments.length})
          </h3>
          <div className="space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-white/10 pb-3 sm:pb-4 last:border-b-0"
              >
                <div className="flex items-start space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm">
                      {comment.authorName}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-gray-300 text-sm leading-relaxed pl-11">
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {!isClient ? (
        /* Version statique (visible sans JS) */
        commentsContent
      ) : (
        /* Version animée (visible avec JS) */
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3 sm:space-y-4 lg:space-y-6"
        >
          {/* Formulaire unifié */}
          <UnifiedCommentForm articleId={articleId} />

          {/* Liste des commentaires */}
          {comments.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-3 sm:p-4 lg:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 sm:mb-4 font-winky">
                Commentaires ({comments.length})
              </h3>
              <div className="space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                    className="border-b border-white/10 pb-3 sm:pb-4 last:border-b-0"
                  >
                    <div className="flex items-start space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">
                          {comment.authorName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm">
                          {comment.authorName}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm leading-relaxed pl-11">
                      {comment.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  )
} 