'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface TimelineStep {
  id: number
  title: string
  description: string
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Analyse des Besoins",
    description: "Nous étudions vos objectifs et vos contraintes pour définir la meilleure approche."
  },
  {
    id: 2,
    title: "Conception & Design",
    description: "Nous concevons un votre site WEB avec un design moderne et responsive. Que nous vous envoyons pour validation."
  },
  {
    id: 3,
    title: "Développement",
    description: "Avec votre validation, nous procédons au développement de votre site WEB. Grâce aux technologies modernes, nous vous offrons un site WEB performant."
  },
  {
    id: 4,
    title: "Optimisation SEO",
    description: "Nous optimisons les performances de votre site WEB pour qu'il soit le mieux positionné chez GOOGLE et BING."
  },
  {
    id: 5,
    title: "Sécurisation",
    description: "Nous sécurisons votre site WEB pour qu'il soit protégé contre les attaques et les menaces de tout type."
  },
  {
    id: 6,
    title: "Déploiement & Formation",
    description: "Nous déployons votre site WEB et vous formons à son utilisation."
  }
]

export default function ProcessTimeline() {
  const [progress, setProgress] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [internalProgress, setInternalProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)
  const lastScrollTime = useRef(Date.now())

  // Fonction pour bloquer le scroll naturel
  const preventScroll = useCallback((e: WheelEvent) => {
    if (isScrollLocked && !isCompleted) {
      e.preventDefault()
    }
  }, [isScrollLocked, isCompleted])

  // Gestion du scroll controlé
  const handleControlledScroll = useCallback((e: WheelEvent) => {
    if (!isScrollLocked || !containerRef.current || isCompleted) return

    e.preventDefault()
    
    const now = Date.now()
    const timeDiff = now - lastScrollTime.current
    lastScrollTime.current = now

    // Accumuler le scroll (plus le scroll est rapide, plus on avance)
    const scrollDelta = e.deltaY > 0 ? 1 : -1
    const speed = Math.min(timeDiff / 16, 3) // Limiter la vitesse
    scrollAccumulator.current += scrollDelta * speed

    // Convertir l'accumulateur en progression (0-100) - accéléré
    const newProgress = Math.max(0, Math.min(100, scrollAccumulator.current * 2))
    setInternalProgress(newProgress)
    
    // Si on a terminé (100%), marquer comme complété et libérer le scroll
    if (newProgress >= 100) {
      setIsCompleted(true)
      setTimeout(() => {
        setIsScrollLocked(false)
        // Scroll automatique pour sortir de la section
        window.scrollBy({ top: 200, behavior: 'smooth' })
      }, 500)
    }
    
    // Si on scroll vers le haut et qu'on est au début, libérer le scroll
    if (newProgress <= 0 && scrollDelta < 0) {
      setTimeout(() => {
        setIsScrollLocked(false)
        window.scrollBy({ top: -200, behavior: 'smooth' })
      }, 300)
    }

  }, [isScrollLocked, isCompleted])

  // Observer pour détecter quand on entre dans la zone
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5 && !isCompleted) {
          setIsScrollLocked(true)
          scrollAccumulator.current = 0
          setInternalProgress(0)
        }
      },
      { 
        threshold: [0.5],
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isCompleted])

  // Gestion des événements de scroll
  useEffect(() => {
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('wheel', handleControlledScroll, { passive: false })

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('wheel', handleControlledScroll)
    }
  }, [preventScroll, handleControlledScroll])

  // Calculer la progression finale basée sur le progrès interne
  useEffect(() => {
    const finalProgress = Math.min(1, internalProgress / 100)
    setProgress(finalProgress)
    
    // Si c'est complété, garder le progrès à 100%
    if (isCompleted) {
      setProgress(1)
    }
  }, [internalProgress, isCompleted])

  return (
    <div className="hidden md:block min-h-screen bg-gray-900">
      {/* Timeline Section */}
      <div ref={containerRef} className="relative min-h-screen bg-gray-900 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-12">
          {/* Indicateur de progression */}
          {isScrollLocked && !isCompleted && (
            <div className="fixed top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 z-50">
              <div className="text-white text-sm mb-2">Progression: {Math.round(internalProgress)}%</div>
              <div className="w-32 h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-200"
                  style={{ width: `${internalProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Timeline horizontale */}
          <div className="relative">
            {/* Ligne de progression horizontale */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-700 rounded-full">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300 ease-out"
                style={{ 
                  width: `${progress * 100}%`
                }}
              />
            </div>

            {/* Ronds et contenu */}
            <div className="relative">
              {/* Ronds numérotés */}
              <div className="flex justify-between items-center mb-16">
                {timelineSteps.map((step, index) => {
                  const stepThreshold = index * (1 / (timelineSteps.length - 1))
                  const isActive = progress >= stepThreshold
                  // Pour le dernier élément, pas besoin d'attendre l'étape suivante
                  
                  return (
                    <div key={step.id} className="relative flex flex-col items-center">
                      {/* Cercle numéroté */}
                      <div 
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-lg font-bold transition-all duration-500 relative z-20 ${
                          isActive 
                            ? 'border-cyan-400 bg-gradient-to-br from-cyan-400 to-purple-500 text-white shadow-lg shadow-cyan-400/25 scale-110' 
                            : 'border-gray-600 bg-gray-800 text-gray-400'
                        }`}
                      >
                        {step.id}
                      </div>
                      
                      {/* Contenu qui apparaît en pop - alterné haut/bas */}
                      <div 
                        className={`absolute ${index % 2 === 0 ? 'top-20' : 'bottom-20'} left-1/2 transform -translate-x-1/2 w-72 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-xl transition-all duration-500 z-10 ${
                          isActive 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : `opacity-0 ${index % 2 === 0 ? 'translate-y-4' : '-translate-y-4'} scale-95 pointer-events-none`
                        }`}
                      >
                        <h3 className="text-lg font-semibold text-white mb-2 text-center">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-300 text-center leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}