'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import AnimationWrapper from '../components/AnimationWrapper'

export default function Contact() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <Navigation currentPage="contact" />

      {/* Hero Section */}
      <div className="text-center py-20 px-8">
        <AnimationWrapper animation="slideUp" duration={1}>
          <h1 className="text-6xl font-bold text-white mb-6 font-winky">
            Nous <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Contacter</span>
          </h1>
        </AnimationWrapper>
        <AnimationWrapper animation="slideUp" delay={0.3} duration={1}>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Prêt à transformer vos idées en réalité numérique ? Parlons de votre projet !
          </p>
        </AnimationWrapper>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <AnimationWrapper animation="slideLeft" delay={0.5} duration={0.8}>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-8 font-winky">Envoyez-nous un message</h2>
              
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
                    rows={6}
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
          </AnimationWrapper>

          {/* Informations de contact */}
          <AnimationWrapper animation="slideRight" delay={0.7} duration={0.8}>
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 font-winky">Informations de contact</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                      <p className="text-gray-300">contact@oxelya.com</p>
                      <p className="text-sm text-gray-400">Réponse sous 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Téléphone</h4>
                      <p className="text-gray-300">+33 6 43 32 34 12</p>
                      <p className="text-sm text-gray-400">Du lundi au vendredi, 9h-18h</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">Localisation</h4>
                      <p className="text-gray-300">Bordeaux, France</p>
                      <p className="text-sm text-gray-400">Intervention à distance ou sur site</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horaires et disponibilité */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 font-winky">Disponibilité</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">7/7</span>
                    <span className="text-white font-semibold">7h00 - 02h00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-sm text-gray-400">
                      <strong className="text-cyan-400">Urgences :</strong> Disponibilité 24/7 pour les incidents de sécurité critiques
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>

      {/* Section "Pourquoi nous choisir" */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 py-20">
        <div className="max-w-6xl mx-auto px-8">
          <AnimationWrapper animation="slideUp" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6 font-winky">Pourquoi nous choisir ?</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Notre approche personnalisée et notre expertise technique garantissent le succès de vos projets
              </p>
            </div>
          </AnimationWrapper>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimationWrapper animation="slideUp" delay={0.3}>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-3">Réactivité</h3>
                <p className="text-gray-300">Réponse sous 24h et démarrage rapide des projets. Nous comprenons l&apos;urgence de vos besoins.</p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slideUp" delay={0.4}>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-white mb-3">Expertise</h3>
                <p className="text-gray-300">Équipe d&apos;experts avec une expérience éprouvée dans tous nos domaines d&apos;intervention.</p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slideUp" delay={0.5}>
              <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-white mb-3">Accompagnement</h3>
                <p className="text-gray-300">Suivi personnalisé de A à Z avec formation et support continu pour assurer votre autonomie.</p>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-gray-900/50 to-black/50 py-20">
        <div className="text-center max-w-4xl mx-auto px-8">
          <AnimationWrapper animation="slideUp" delay={0.2}>
            <h2 className="text-4xl font-bold text-white mb-6 font-winky">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Transformons ensemble vos idées en solutions numériques performantes et sécurisées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:contact@oxelya.com"
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                Envoyer un email
              </a>
              <a 
                href="tel:+33643323412"
                className="inline-block border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                Appeler maintenant
              </a>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
} 
