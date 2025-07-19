'use client'

import { useProgressiveEnhancement } from '../hooks/useProgressiveEnhancement'
import { useState, useEffect } from 'react'
import ClientThreeWrapper from './ClientThreeWrapper'
import HeroSection from './HeroSection'
import Link from 'next/link'

export default function ProgressiveHome() {
  const isEnhanced = useProgressiveEnhancement()
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string }>>([])
  const [isMobile, setIsMobile] = useState(false)

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Générer les particules côté client pour éviter l'erreur d'hydratation
  useEffect(() => {
    const newParticles = [...Array(isMobile ? 10 : 20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`
    }))
    setParticles(newParticles)
  }, [isMobile])

  // Version statique HTML pour Googlebot et mobile
  if (!isEnhanced || isMobile) {
    return (
      <main className="relative w-full h-screen overflow-hidden">
        {/* Arrière-plan statique qui ressemble à l'original */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* Particules CSS statiques pour simuler l'effet - seulement si côté client */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay
                }}
              />
            ))}
          </div>
        </div>

        {/* Version statique du hero - structure similaire mais sans animations */}
        <div className="absolute inset-0 z-10">
          {/* Navigation statique */}
          <nav className="p-4 md:p-8">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky"
              >
                Oxelya
              </Link>
              
              <div className="hidden md:flex space-x-8 text-white/80">
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Services
                </Link>
                <div className="relative group">
                  <span className="hover:text-cyan-400 transition-colors cursor-pointer">
                    Portfolio
                  </span>
                  {/* Version statique du tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    <div className="bg-black/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-2xl min-w-[280px]">
                      <div className="space-y-3">
                        <Link
                          href="https://margoul1.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              M
                            </div>
                            <div>
                              <div className="font-semibold text-white">margoul1.dev</div>
                              <div className="text-xs text-gray-400">Portfolio technique & projets</div>
                            </div>
                          </div>
                        </Link>
                        <Link
                          href="https://margoul1.xyz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              X
                            </div>
                            <div>
                              <div className="font-semibold text-white">margoul1.xyz</div>
                              <div className="text-xs text-gray-400">Blog & expérimentations</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </div>
              
              {/* Menu mobile (statique) */}
              <div className="md:hidden">
                <button 
                  className="text-white/80 hover:text-cyan-400 transition-colors"
                  onClick={() => {
                    // Pour la version statique, on redirige vers les pages directement
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
                        
                        <a href="/blog" class="text-white text-2xl hover:text-cyan-400 transition-colors">Blog</a>
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
              </div>
            </div>
          </nav>

          {/* Contenu principal statique */}
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-4xl px-8">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-light text-white mb-4 font-winky">
                  Excellence
                </h1>
                <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-winky">
                  Evolutivité & Résultats
                </div>
              </div>

              {/* Service statique */}
              <div className="mb-12 h-24 relative">
                <div className="text-center">
                  <div className="text-4xl mb-3">🛡️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pentest & Cybersécurité</h3>
                  <p className="text-gray-400">Audit de sécurité et tests d&apos;intrusion pour protéger vos systèmes</p>
                </div>
              </div>

              {/* CTA statique */}
              <div className="space-y-4">
                <Link
                  href="/services"
                  className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg mr-4 mb-4"
                >
                  Découvrir nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Version avec animations Three.js et Framer Motion (desktop seulement)
  return (
    <>
      <main className="relative w-full h-screen overflow-hidden">
        <ClientThreeWrapper />
        <HeroSection />
      </main>
      
      {/* Zone statique pour permettre le défilement */}
      <div className="relative w-full bg-gray-900">
        <div className="h-32 flex items-center justify-center">
          <div className="text-center">
            <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mx-auto mb-4"></div>
            <p className="text-white/60 text-sm font-medium">Continuez votre exploration</p>
          </div>
        </div>
      </div>
    </>
  )
} 