'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useProgressiveEnhancement } from '../hooks/useProgressiveEnhancement'

export default function PortfolioTooltip() {
  const [isOpen, setIsOpen] = useState(false)
  const isEnhanced = useProgressiveEnhancement(100)

  const portfolioLinks = [
    {
      title: 'margoul1.dev',
      url: 'https://margoul1.dev',
      description: 'Portfolio développement web et projets techniques',
      icon: '💻',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'margoul1.xyz',
      url: 'https://margoul1.xyz',
      description: 'Projets personnels et expérimentations',
      icon: '🚀',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const additionalLinks = [
    {
      title: 'DrHead',
      url: 'https://drhead.org',
      description: 'Plateforme spécialisée en cybersécurité',
      icon: '🛡️',
      color: 'from-red-500 to-orange-600'
    }
  ]

  // Version HTML pure pour les crawlers
  if (!isEnhanced) {
    return (
      <div className="relative group">
        {/* Lien principal visible par Google */}
        <span className="hover:text-cyan-400 transition-colors cursor-pointer relative">
          Plateformes
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
        </span>

        {/* Liens Plateformes visibles par Google au hover CSS pur */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          {/* Flèche */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-white/10 backdrop-blur-sm border-l border-t border-white/20 rotate-45"></div>
          </div>

          {/* Contenu accessible aux crawlers */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 min-w-[300px] shadow-2xl">
            <h1 className="text-white font-semibold mb-4 text-center">Dev & Cyber</h1>
            
            {/* Section Portfolios */}
            <div className="mb-4">
              <h2 className="text-cyan-400 font-semibold text-sm mb-3">Portfolios</h2>
              <nav className="space-y-3" aria-label="Liens Portfolio">
                {portfolioLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:scale-105 transition-transform duration-300"
                    title={`Visiter ${link.title} - ${link.description}`}
                  >
                    <div className={`bg-gradient-to-r ${link.color} p-4 rounded-lg hover:shadow-lg transition-all duration-300`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl" aria-hidden="true">{link.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm">
                            {link.title}
                          </h4>
                          <p className="text-gray-200 text-xs opacity-90">
                            {link.description}
                          </p>
                        </div>
                        <span className="text-white/70 text-sm" aria-hidden="true">→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </nav>
            </div>

            {/* Section Plateformes supplémentaires */}
            <div>
              <h2 className="text-cyan-400 font-semibold text-sm mb-3">Contenu</h2>
              <nav className="space-y-3" aria-label="Autres plateformes">
                {additionalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:scale-105 transition-transform duration-300"
                    title={`Visiter ${link.title} - ${link.description}`}
                  >
                    <div className={`bg-gradient-to-r ${link.color} p-4 rounded-lg hover:shadow-lg transition-all duration-300`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl" aria-hidden="true">{link.icon}</span>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm">
                            {link.title}
                          </h4>
                          <p className="text-gray-200 text-xs opacity-90">
                            {link.description}
                          </p>
                        </div>
                        <span className="text-white/70 text-sm" aria-hidden="true">→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20">
              <p className="text-gray-400 text-xs text-center">
                Découvrez mes réalisations et plateformes spécialisées
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Version avec animations Framer Motion (amélioration progressive)
  return (
    <div className="relative">
      <motion.button
        className="hover:text-cyan-400 transition-colors cursor-pointer relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        whileHover={{ y: -2 }}
        aria-label="Afficher les plateformes"
        aria-expanded={isOpen}
      >
        Plateformes
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Flèche pointant vers le haut */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-white/10 backdrop-blur-sm border-l border-t border-white/20 rotate-45"></div>
            </div>

            {/* Contenu du tooltip avec animations */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 min-w-[300px] shadow-2xl">
              <h1 className="text-white font-semibold mb-4 text-center">Dev & Cyber</h1>
              
              {/* Section Portfolios */}
              <div className="mb-4">
                <h2 className="text-cyan-400 font-semibold text-sm mb-3">Portfolios</h2>
                <nav className="space-y-3" aria-label="Liens Portfolio">
                  {portfolioLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      title={`Visiter ${link.title} - ${link.description}`}
                    >
                      <div className={`bg-gradient-to-r ${link.color} p-4 rounded-lg hover:shadow-lg transition-all duration-300 group`}>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl" aria-hidden="true">{link.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm group-hover:text-gray-100">
                              {link.title}
                            </h4>
                            <p className="text-gray-200 text-xs opacity-90">
                              {link.description}
                            </p>
                          </div>
                          <motion.span 
                            className="text-white/70 text-sm"
                            whileHover={{ x: 3 }}
                            aria-hidden="true"
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Section Plateformes supplémentaires */}
              <div>
                <h2 className="text-cyan-400 font-semibold text-sm mb-3">Contenu</h2>
                <nav className="space-y-3" aria-label="Autres plateformes">
                  {additionalLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (portfolioLinks.length + index) * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      title={`Visiter ${link.title} - ${link.description}`}
                    >
                      <div className={`bg-gradient-to-r ${link.color} p-4 rounded-lg hover:shadow-lg transition-all duration-300 group`}>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl" aria-hidden="true">{link.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm group-hover:text-gray-100">
                              {link.title}
                            </h4>
                            <p className="text-gray-200 text-xs opacity-90">
                              {link.description}
                            </p>
                          </div>
                          <motion.span 
                            className="text-white/70 text-sm"
                            whileHover={{ x: 3 }}
                            aria-hidden="true"
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="mt-4 pt-3 border-t border-white/20">
                <p className="text-gray-400 text-xs text-center">
                  Découvrez mes réalisations et plateformes spécialisées
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 