'use client'

import { useState } from 'react'

interface ContactFormProps {
  className?: string
  compact?: boolean
}

export default function ContactForm({ className = '', compact = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'envoi du message')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 ${className}`}>
      <h2 className={`font-bold text-white mb-8 font-winky ${compact ? 'text-2xl' : 'text-3xl'}`}>
        {compact ? 'Contactez-nous' : 'Envoyez-nous un message'}
      </h2>
      
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg">
          Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg">
          {error}
        </div>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Nom *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="votre@email.com"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Sujet *</label>
          <select 
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors"
          >
            <option value="" className='text-gray-800'>Sélectionnez un sujet</option>
            <option value="Pentest & Cybersécurité" className='text-gray-800'>Pentest & Cybersécurité</option>
            <option value="Développement Web" className='text-gray-800'>Développement Web</option>
            <option value="Conseil Informatique" className='text-gray-800'>Conseil Informatique</option>
            <option value="Solutions Innovation" className='text-gray-800'>Solutions Innovation</option>
            <option value="Autre" className='text-gray-800'>Autre</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Message *</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={compact ? 4 : 6}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            placeholder="Décrivez-nous votre projet en détail..."
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le message'}
        </button>
      </form>
    </div>
  )
} 