'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [blocked, setBlocked] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.blocked) {
          setBlocked(true)
          setRemainingTime(data.remainingTime || 0)
          throw new Error(data.error || 'Compte temporairement bloqué')
        }
        throw new Error(data.error || 'Erreur de connexion')
      }

      // Stockage du token
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminData', JSON.stringify(data.admin))

      // Redirection vers le dashboard
      router.push('/admin/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Panel Admin
          </h1>
          <p className="text-gray-400">Connexion à l&apos;espace administrateur</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Nom d&apos;utilisateur
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`px-4 py-3 rounded-lg ${
                blocked 
                  ? 'bg-orange-500/20 border border-orange-500/50 text-orange-400' 
                  : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                {blocked && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                )}
                <div>
                  <div className="font-semibold">{error}</div>
                  {blocked && remainingTime > 0 && (
                    <div className="text-sm opacity-75">
                      Temps restant : {Math.ceil(remainingTime / 60)} minutes
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading || blocked}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: blocked ? 1 : 1.02 }}
            whileTap={{ scale: blocked ? 1 : 0.98 }}
          >
            {loading ? 'Connexion...' : blocked ? 'Compte bloqué' : 'Se connecter'}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
          >
            ← Retour au site
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 