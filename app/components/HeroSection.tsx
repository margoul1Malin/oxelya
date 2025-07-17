'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import PortfolioTooltip from './PortfolioTooltip'
import Image from 'next/image'

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentService, setCurrentService] = useState(0)

  const services = [
    { 
      title: 'Pentest & Cybersécurité', 
      desc: 'Audit de sécurité et tests d\'intrusion pour protéger vos systèmes',
      icon: '🛡️'
    },
    { 
      title: 'Développement Web', 
      desc: 'Applications web modernes, performantes et évolutives',
      icon: '💻'
    },
    { 
      title: 'Conseil Informatique', 
      desc: 'Stratégie IT et accompagnement dans votre transformation digitale',
      icon: '🚀'
    },
    { 
      title: 'Solutions Innovation', 
      desc: 'Gadgets sur-mesure et outils technologiques innovants',
      icon: '⚡'
    }
  ]

  useEffect(() => {
    setMounted(true)
    
    // Délai avant le démarrage du carousel pour éviter le conflit
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentService(prev => (prev + 1) % services.length)
      }, 4000)
      
      return () => clearInterval(interval)
    }, 4000) // Démarre après les animations initiales
    
    return () => clearTimeout(startDelay)
  }, [services.length])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-10 pointer-events-none ">
      {/* Navigation minimaliste */}
      <motion.nav 
        className="absolute top-0 left-0 right-0 z-20 p-4 md:p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex justify-between items-center">
          <motion.a
            href="/"
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent pointer-events-auto cursor-pointer group font-winky"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <Image src="/Logo3.png" alt="Oxelya" width={32} height={32} />
              <span className="text-2xl font-bold">Oxelya</span>
            </div>
            <div className="h-1 rounded-full w-0/100 bg-gradient-to-r from-cyan-400 to-purple-500 hover:w-full transition-all duration-300 group-hover:w-full"></div>
          </motion.a>
          
          <motion.div 
            className="hidden md:flex space-x-8 text-white/80 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.a
              href="/services"
              className="hover:text-cyan-400 transition-colors cursor-pointer relative group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <PortfolioTooltip />
            </motion.div>

            <motion.a
              href="/contact"
              className="hover:text-cyan-400 transition-colors cursor-pointer relative group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              Contact
              <span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          </motion.div>
          
          {/* Menu mobile */}
          <motion.div
            className="md:hidden pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <button 
              className="text-white/80 hover:text-cyan-400 transition-colors"
              onClick={() => {
                const menu = document.createElement('div')
                menu.innerHTML = `
                  <div class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-8 px-8">
                    <a href="/services" class="text-white text-2xl hover:text-cyan-400 transition-colors">Services</a>
                    
                    <div class="text-center space-y-4">
                      <h3 class="text-white text-2xl mb-4">Plateformes</h3>
                      <div class="space-y-3">
                        <a href="https://margoul1.dev" target="_blank" class="block bg-gradient-to-r from-blue-500 to-cyan-600 p-4 rounded-lg hover:scale-105 transition-transform">
                          <div class="flex items-center space-x-3">
                            <span class="text-2xl">💻</span>
                            <div class="text-left">
                              <div class="text-white font-semibold">margoul1.dev</div>
                              <div class="text-gray-200 text-sm">Portfolio développement web</div>
                            </div>
                          </div>
                        </a>
                        <a href="https://margoul1.xyz" target="_blank" class="block bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-lg hover:scale-105 transition-transform">
                          <div class="flex items-center space-x-3">
                            <span class="text-2xl">🚀</span>
                            <div class="text-left">
                              <div class="text-white font-semibold">margoul1.xyz</div>
                              <div class="text-gray-200 text-sm">Projets personnels</div>
                            </div>
                          </div>
                        </a>
                        <a href="https://drhead.org" target="_blank" class="block bg-gradient-to-r from-red-500 to-orange-600 p-4 rounded-lg hover:scale-105 transition-transform">
                          <div class="flex items-center space-x-3">
                            <span class="text-2xl">🛡️</span>
                            <div class="text-left">
                              <div class="text-white font-semibold">DrHead</div>
                              <div class="text-gray-200 text-sm">Plateforme cybersécurité</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    
                    <a href="/contact" class="text-white text-2xl hover:text-cyan-400 transition-colors">Contact</a>
                    <button onclick="this.parentElement.remove()" class="text-white/60 text-lg mt-8">Fermer</button>
                  </div>
                `
                const menuElement = menu.firstElementChild
                if (menuElement) {
                  document.body.appendChild(menuElement)
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Contenu principal centré */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center max-w-4xl px-8">
          
          {/* Titre principal avec effet de machine à écrire */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-light text-white mb-4 font-winky"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              Excellence
            </motion.h1>
            <motion.div 
              className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-winky"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              Evolutivité & Résultats
            </motion.div>
          </motion.div>

          {/* Service en rotation avec AnimatePresence */}
          <motion.div 
            className="mb-12 h-24 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService}
                className="text-center absolute inset-0 flex flex-col justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              >
                <div className="text-4xl mb-2">{services[currentService].icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {services[currentService].title}
                </h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {services[currentService].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Indicateurs de service */}
          <motion.div 
            className="flex justify-center space-x-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            {services.map((_, i) => (
              <motion.button
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 pointer-events-auto ${
                  i === currentService 
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
                    : 'bg-white/20'
                }`}
                onClick={() => setCurrentService(i)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.8 }}
            className="space-y-6"
          >
            <motion.a
              href="/services"
              className="inline-block bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-300 pointer-events-auto shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 212, 255, 0.4), 0 10px 10px -5px rgba(0, 212, 255, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Découvrir nos Services
            </motion.a>
            
            <motion.p 
              className="text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 4.2 }}
            >
              Transformez vos idées en réalité numérique
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Informations latérales - masquées sur mobile */}
      <motion.div 
        className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2 space-y-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 5 }}
      >
        <div className="text-right">
          <div className="text-2xl font-bold text-white">+100</div>
          <div className="text-sm text-gray-400">Projets Réalisés</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">24/7</div>
          <div className="text-sm text-gray-400">Support</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">5+</div>
          <div className="text-sm text-gray-400">Années d&apos;Expertise</div>
        </div>
      </motion.div>

      {/* Statistiques sur mobile - en bas du Hero */}
      <motion.div 
        className="lg:hidden absolute bottom-8 left-0 right-0 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 6 }}
      >
        <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-3 rounded-lg text-center backdrop-blur-sm border border-white/10">
            <h3 className="text-lg font-semibold mb-1 font-winky text-white">+25</h3>
            <p className="text-gray-300 text-xs">Projets</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-lg text-center backdrop-blur-sm border border-white/10">
            <h3 className="text-lg font-semibold mb-1 font-winky text-white">24/7</h3>
            <p className="text-gray-300 text-xs">Support</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 p-3 rounded-lg text-center backdrop-blur-sm border border-white/10">
            <h3 className="text-lg font-semibold mb-1 font-winky text-white">100%</h3>
            <p className="text-gray-300 text-xs">Satisfaction</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-cyan-500/20 p-3 rounded-lg text-center backdrop-blur-sm border border-white/10">
            <h3 className="text-lg font-semibold mb-1 font-winky text-white">5+</h3>
            <p className="text-gray-300 text-xs">Années</p>
          </div>
        </div>
      </motion.div>

    </div>
  )
} 