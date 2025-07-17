'use client'

import Link from 'next/link'
import Navigation from '../../components/Navigation'
import AnimationWrapper from '../../components/AnimationWrapper'
import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { FaUsers, FaShieldAlt, FaRocket, FaCogs, FaChartLine, FaCloud, FaMobile, FaDatabase } from 'react-icons/fa'
import { ReactElement } from 'react'

interface Expertise {
  icon: ReactElement
  title: string
  description: string
  details: string
  color: string
}

interface Benefit {
  icon: ReactElement
  title: string
  description: string
}

interface ProcessStep {
  number: string
  title: string
  description: string
  details: string
}

export default function ConseilInformatique() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [particles, setParticles] = useState<Array<{ left: string; top: string; duration: number; delay: number }>>([])
  const [isClient, setIsClient] = useState(false)

  const expertises = useMemo(() => [
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Transformation Digitale",
      description: "Accompagnement dans votre transition numérique",
      details: "Nous analysons vos processus métier et proposons des solutions technologiques adaptées pour optimiser votre productivité et moderniser vos outils de travail.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Audit Sécurité IT",
      description: "Évaluation complète de votre infrastructure",
      details: "Audit approfondi de votre sécurité informatique, identification des vulnérabilités et mise en place d'un plan d'action pour renforcer votre protection.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Stratégie IT",
      description: "Planification technologique à long terme",
      details: "Élaboration d'une roadmap technologique alignée sur vos objectifs business, optimisation des coûts IT et choix des technologies adaptées à votre croissance.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <FaCogs className="w-8 h-8" />,
      title: "Optimisation Systèmes",
      description: "Performance et efficacité maximisées",
      details: "Analyse des performances de vos systèmes existants, optimisation des configurations et mise en place de solutions pour améliorer la productivité.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Pilotage Projets IT",
      description: "Gestion experte de vos projets technologiques",
      details: "Accompagnement dans la conduite de vos projets informatiques, de la conception à la mise en production, avec une méthodologie éprouvée.",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: <FaCloud className="w-8 h-8" />,
      title: "Migration Cloud",
      description: "Transition vers le cloud en toute sérénité",
      details: "Étude de faisabilité, planification de la migration, choix des solutions cloud adaptées et accompagnement dans la transition.",
      color: "from-cyan-500 to-blue-600"
    }
  ], [])

  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Analyse & Diagnostic",
      description: "Audit complet de votre existant IT",
      details: "Nous effectuons un diagnostic approfondi de votre infrastructure, analysons vos processus métier et identifions les points d'amélioration pour établir un état des lieux précis."
    },
    {
      number: "02", 
      title: "Stratégie & Recommandations",
      description: "Élaboration de la roadmap technologique",
      details: "Basé sur l'analyse, nous concevons une stratégie IT sur-mesure avec des recommandations concrètes, un planning de mise en œuvre et une estimation budgétaire détaillée."
    },
    {
      number: "03",
      title: "Mise en Œuvre",
      description: "Implémentation des solutions",
      details: "Accompagnement dans la mise en place des recommandations avec une approche progressive, formation des équipes et validation à chaque étape pour garantir le succès."
    },
    {
      number: "04",
      title: "Suivi & Optimisation",
      description: "Monitoring et amélioration continue",
      details: "Suivi des performances post-implémentation, ajustements nécessaires et optimisations continues pour maintenir l'efficacité des solutions déployées."
    }
  ]

  const benefits: Benefit[] = [
    {
      icon: <FaDatabase className="w-6 h-6" />,
      title: "Expertise Technique",
      description: "Plus de 5 ans d'expérience dans le conseil IT avec une connaissance approfondie des technologies modernes et des enjeux métier."
    },
    {
      icon: <FaMobile className="w-6 h-6" />,
      title: "Approche Personnalisée", 
      description: "Chaque entreprise est unique. Nous adaptons nos recommandations à votre contexte, votre budget et vos objectifs spécifiques."
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "ROI Mesurable",
      description: "Nos conseils visent une amélioration concrète de votre productivité avec des indicateurs de performance clairement définis."
    }
  ]

  // Générer les particules côté client pour éviter l'erreur d'hydratation
  useEffect(() => {
    setIsClient(true)
    const newParticles = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  // Animation en cascade pour les cards
  useEffect(() => {
    const timer = setTimeout(() => {
      expertises.forEach((_: Expertise, index: number) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index])
        }, index * 200)
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [expertises])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation currentPage="services" />

      {/* Hero Section */}
      <div className="relative py-20 px-4 md:px-8 overflow-hidden">
        {/* Particules d'arrière-plan - seulement côté client */}
        <div className="absolute inset-0 overflow-hidden">
          {isClient && particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <AnimationWrapper animation="fadeIn" duration={1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-winky leading-tight">
              Conseil
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent block">
                Informatique
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto">
              Optimisez votre infrastructure IT et accélérez votre transformation digitale avec l&apos;expertise d&apos;Oxelya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105"
              > 
                Demander un audit
              </Link>
              <button className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105">
                Découvrir nos méthodes
              </button>
            </div>
          </AnimationWrapper>
        </div>
      </div>

      {/* Section Introduction */}
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimationWrapper animation="slideUp" duration={1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-winky">
                Votre Partenaire
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Technologique</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Dans un monde où la technologie évolue constamment, avoir une stratégie IT claire et adaptée 
                est essentiel pour rester compétitif. Chez Oxelya, nous vous accompagnons dans toutes les étapes 
                de votre transformation numérique, de l&apos;audit initial à l&apos;optimisation continue de vos systèmes.
              </p>
            </div>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimationWrapper animation="slideLeft" duration={1} delay={0.2}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Pourquoi choisir Oxelya ?</h3>
                <div className="space-y-6">
                  {benefits.map((benefit: Benefit, index: number) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                        <p className="text-gray-300">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper animation="slideRight" duration={1} delay={0.4}>
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 rounded-2xl border border-cyan-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Notre Engagement</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Nous nous engageons à fournir des conseils objectifs et indépendants, adaptés à votre réalité 
                  d&apos;entreprise. Notre objectif n&apos;est pas de vendre des solutions, mais de vous accompagner vers 
                  l&apos;excellence technologique.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">+50</div>
                    <div className="text-sm text-gray-400">Audits Réalisés</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">95%</div>
                    <div className="text-sm text-gray-400">Satisfaction Client</div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </div>

      {/* Section Expertises */}
      <div className="py-20 px-4 md:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimationWrapper animation="fadeIn" duration={1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-winky">
                Nos
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Expertises</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Des compétences diversifiées pour couvrir tous vos besoins en conseil informatique
              </p>
            </div>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertises.map((expertise: Expertise, index: number) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${expertise.color} p-1 rounded-2xl transform transition-all duration-500 hover:scale-105`}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={visibleCards.includes(index) ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gray-900 p-6 rounded-2xl h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${expertise.color} rounded-xl flex items-center justify-center text-white mb-6`}>
                    {expertise.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{expertise.title}</h3>
                  <p className="text-gray-300 mb-4">{expertise.description}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{expertise.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Processus */}
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimationWrapper animation="fadeIn" duration={1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-winky">
                Notre
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Méthodologie</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Une approche structurée en 4 étapes pour garantir le succès de vos projets IT
              </p>
            </div>
          </AnimationWrapper>

          <div className="relative">
            {/* Timeline centrale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 opacity-30"></div>
            
            <div className="space-y-20">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                      <div className={`text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-cyan-400 mb-4 font-semibold">{step.description}</p>
                      <p className="text-gray-300 leading-relaxed">{step.details}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full z-10"></div>
                    <div className="absolute w-8 h-8 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section CTA */}
      <div className="py-20 px-4 md:px-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimationWrapper animation="fadeIn" duration={1}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-winky">
              Prêt à Optimiser
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"> Votre IT ?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Contactez-nous dès aujourd&apos;hui pour discuter de vos défis technologiques et découvrir 
              comment notre expertise peut transformer votre infrastructure IT en avantage concurrentiel.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                Demander un audit gratuit
              </Link>
              <a 
                href="tel:+33643323412"
                className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                Appeler maintenant
              </a>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  )
} 