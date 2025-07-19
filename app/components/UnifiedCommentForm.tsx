'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface UnifiedCommentFormProps {
  articleId: string
}

export default function UnifiedCommentForm({ articleId }: UnifiedCommentFormProps) {
  const [isClient, setIsClient] = useState(false)
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    content: '',
    rating: 0
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.authorName.trim() || !formData.content.trim()) {
      alert('Veuillez remplir au moins votre nom et votre commentaire')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Envoyer le commentaire
      const commentResponse = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          articleId,
          authorName: formData.authorName,
          authorEmail: formData.authorEmail || undefined,
          content: formData.content
        })
      })

      // Envoyer la note si elle est définie
      if (formData.rating > 0) {
        const ratingResponse = await fetch('/api/blog/ratings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            articleId,
            authorName: formData.authorName,
            authorEmail: formData.authorEmail || undefined,
            rating: formData.rating
          })
        })

        if (!ratingResponse.ok) {
          throw new Error('Erreur lors de l\'envoi de la note')
        }
      }

      if (commentResponse.ok) {
        setSubmitStatus('success')
        setFormData({
          authorName: '',
          authorEmail: '',
          content: '',
          rating: 0
        })
        
        // Recharger la page pour afficher le nouveau commentaire
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        throw new Error('Erreur lors de l\'envoi du commentaire')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const formContent = (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-4 font-winky">
        Donnez votre avis
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Informations personnelles */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Votre nom *
            </label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm"
              placeholder="Votre nom"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Votre email (optionnel)
            </label>
            <input
              type="email"
              value={formData.authorEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, authorEmail: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm"
              placeholder="votre@email.com"
            />
          </div>
        </div>

        {/* Note avec étoiles */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Votre note
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`text-xl transition-all duration-200 hover:scale-110 ${
                  star <= formData.rating 
                    ? 'text-yellow-400' 
                    : 'text-gray-400 hover:text-yellow-300'
                }`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-gray-400 text-xs">
              {formData.rating > 0 ? `${formData.rating}/5` : 'Cliquez pour noter'}
            </span>
          </div>
        </div>

        {/* Commentaire */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Votre commentaire *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-none text-sm"
            placeholder="Partagez votre avis sur cet article..."
            required
          />
        </div>

        {/* Messages de statut */}
        {submitStatus === 'success' && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400">
            ✅ Votre avis a été envoyé avec succès !
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400">
            ❌ Erreur lors de l&apos;envoi. Veuillez réessayer.
          </div>
        )}

        {/* Bouton d'envoi */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            isSubmitting
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Envoi...</span>
            </span>
          ) : (
            '📝 Envoyer mon avis'
          )}
        </button>
      </form>
    </div>
  )

  return (
    <>
      {!isClient ? (
        /* Version statique (visible sans JS) */
        formContent
      ) : (
        /* Version animée (visible avec JS) */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4 font-winky">
            Donnez votre avis
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Informations personnelles */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Votre nom *
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Votre email (optionnel)
                </label>
                <input
                  type="email"
                  value={formData.authorEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorEmail: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Note avec étoiles */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Votre note
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`text-xl transition-all duration-200 hover:scale-110 ${
                      star <= formData.rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-400 hover:text-yellow-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-2 text-gray-400 text-xs">
                  {formData.rating > 0 ? `${formData.rating}/5` : 'Cliquez pour noter'}
                </span>
              </div>
            </div>

            {/* Commentaire */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Votre commentaire *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-none text-sm"
                placeholder="Partagez votre avis sur cet article..."
                required
              />
            </div>

            {/* Messages de statut */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400"
              >
                ✅ Votre avis a été envoyé avec succès !
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-400"
              > 
                ❌ Erreur lors de l&apos;envoi. Veuillez réessayer.
              </motion.div>
            )}

            {/* Bouton d'envoi */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                isSubmitting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white hover:scale-105'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Envoi...</span>
                </span>
              ) : (
                '📝 Envoyer mon avis'
              )}
            </motion.button>
          </form>
        </motion.div>
      )}
    </>
  )
} 