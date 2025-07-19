'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface RatingFormProps {
  articleId: string
}

export default function RatingForm({ articleId }: RatingFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setMessage({ type: 'error', text: 'Veuillez sélectionner une note' })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/blog/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleId,
          rating,
          ...formData
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Note ajoutée avec succès !' })
        setRating(0)
        setFormData({ authorName: '', authorEmail: '' })
        // Recharger la page pour afficher la nouvelle note
        setTimeout(() => window.location.reload(), 1500)
      } else {
        const error = await response.json()
        console.error('Erreur:', error)
        setMessage({ type: 'error', text: error.message || 'Erreur lors de l&apos;ajout de la note' })
      }
    } catch (error) {
      console.error('Erreur:', error)
      setMessage({ type: 'error', text: 'Erreur de connexion' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Message de statut */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
              : 'bg-red-500/20 border border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Système d'étoiles */}
      <div>
        <label className="block text-white font-medium mb-4">
          Votre note *
        </label>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-3xl transition-colors duration-200"
            >
              <span className={`${
                star <= (hoverRating || rating) 
                  ? 'text-yellow-400' 
                  : 'text-gray-400'
              }`}>
                ★
              </span>
            </motion.button>
          ))}
          <span className="ml-4 text-gray-400">
            {rating > 0 && `${rating}/5`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ratingAuthorName" className="block text-white font-medium mb-2">
            Nom *
          </label>
          <input
            type="text"
            id="ratingAuthorName"
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label htmlFor="ratingAuthorEmail" className="block text-white font-medium mb-2">
            Email (optionnel)
          </label>
          <input
            type="email"
            id="ratingAuthorEmail"
            value={formData.authorEmail}
            onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors"
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting || rating === 0}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Publier la note'}
      </motion.button>
    </motion.form>
  )
} 