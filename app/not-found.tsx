'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">
        {/* Logo et navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-8"
        >
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform font-winky"
          >
            Oxelya
          </Link>
        </motion.div>

        {/* Message d'erreur principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12"
        >
          <motion.h1
            className="text-8xl md:text-9xl font-bold text-white mb-4 font-winky"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(0, 212, 255, 0.5)",
                "0 0 40px rgba(0, 212, 255, 0.8)",
                "0 0 20px rgba(0, 212, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-white mb-6 font-winky"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Page Introuvable
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-400 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            La page que vous recherchez semble avoir disparu dans le cyberespace.
            <br />
            Peut-être a-t-elle été hackée ou est-elle simplement en maintenance.
          </motion.p>
        </motion.div>

        {/* Code d'erreur stylisé */}
        <motion.div
          className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm">error.log</span>
          </div>
          <div className="text-left">
            <div className="text-cyan-400 text-sm font-mono">
              <span className="text-purple-400">const</span> error = <span className="text-green-400">&quot;404&quot;</span>;
            </div>
            <div className="text-cyan-400 text-sm font-mono mt-1">
              <span className="text-purple-400">const</span> message = <span className="text-green-400">&quot;Page not found&quot;</span>;
            </div>
            <div className="text-cyan-400 text-sm font-mono mt-1">
              <span className="text-purple-400">console</span>.<span className="text-yellow-400">log</span>(error, message);
            </div>
          </div>
        </motion.div>

        {/* Boutons d'action */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              🏠 Retour à l&apos;accueil
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              📞 Nous contacter
            </Link>
          </motion.div>
        </motion.div>

        {/* Suggestions de pages */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-6 font-winky">
            Pages populaires
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { href: '/services', label: 'Services', icon: '⚡' },
              { href: '/contact', label: 'Contact', icon: '📞' },
              { href: '/blog', label: 'Blog', icon: '📝' }
            ].map((page, index) => (
              <motion.div
                key={page.href}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <Link
                  href={page.href}
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-cyan-500/40 transition-all duration-300 group"
                >
                  <div className="text-2xl mb-2">{page.icon}</div>
                  <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                    {page.label}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Message de sécurité */}
        <motion.div
          className="mt-12 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <p className="text-gray-300 text-sm">
            💡 <strong>Conseil :</strong> Si vous pensez qu&apos;il s&apos;agit d&apos;une erreur, 
            n&apos;hésitez pas à nous contacter pour signaler le problème.
          </p>
        </motion.div>
      </div>

      {/* Effet de glitch */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20"></div>
      </motion.div>
    </div>
  )
}
