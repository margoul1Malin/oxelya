"use client";
import Link from 'next/link'
import Navigation from '../components/Navigation'
import AnimationWrapper from '../components/AnimationWrapper'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function Services() {
  const [activeStep, setActiveStep] = useState(0)
  const processRef = useRef(null)
  const isInView = useInView(processRef, { once: true, amount: 0.3 })

  const services = [
    {
      icon: '🛡️',
      title: 'Pentest & Cybersécurité',
      subtitle: 'Protection avancée contre les cybermenaces',
      description: 'Tests d\'intrusion professionnels et audits de sécurité complets pour identifier et corriger les vulnérabilités de vos systèmes d\'information. Notre approche méthodologique garantit une protection optimale de vos données sensibles.',
      features: [
        'Tests d\'intrusion web et applications mobiles',
        'Audit de sécurité des infrastructures réseau',
        'Analyse de vulnérabilités OWASP Top 10',
        'Pentest API REST et GraphQL',
        'Tests d\'ingénierie sociale et phishing',
        'Audit de conformité RGPD et ISO 27001',
        'Rapport détaillé avec plan de remediation',
      ],
      color: 'from-red-500 to-pink-600',
      details: 'Nos experts utilisent les dernières méthodologies pour protéger votre entreprise contre les cyberattaques. Nous analysons vos applications web, vos API, votre infrastructure réseau et sensibilisons vos équipes aux bonnes pratiques de sécurité.',
      disabled: true,
      slug: 'pentest-cybersecurite'
    },
    {
      icon: '💻',
      title: 'Développement Web',
      subtitle: 'Applications web modernes et performantes',
      description: 'Conception et développement d\'applications web sur-mesure avec les technologies les plus récentes. Nous créons des solutions évolutives, sécurisées et optimisées pour offrir une expérience utilisateur exceptionnelle. Voir plus d\'infos dans "Autre Plateformes".',
      features: [
        'Applications React, Next.js et TypeScript + Suppélement Three.js',
        'API REST et GraphQL sécurisées',
        'Interface utilisateur responsive et accessible',
        'Optimisation SEO et performances Web Core Vitals',
        'Intégration systèmes tiers et CRM',
        'Monitoring et analytics avancés',
        'UI/UX sur-mesure',
        'Applications Python avec Django',
        'Design 3D en supplément',
        'Intégration Self-Services (Système de notification, Gestion de Tickets, etc...)'
      ],
      color: 'from-blue-500 to-cyan-600',
      details: 'Notre équipe maîtrise l\'écosystème JavaScript moderne : React, Next.js, Node.js, et les frameworks CSS comme Tailwind. Nous développons des applications web performantes, SEO-friendly et parfaitement optimisées pour tous les appareils.',
      disabled: false,
      slug: 'developpement-web'
    },
    {
      icon: '🚀',
      title: 'Conseil Informatique',
      subtitle: 'Stratégie IT et transformation digitale',
      description: 'Accompagnement stratégique pour optimiser votre infrastructure informatique et réussir votre transformation digitale. Nous analysons vos besoins et proposons des solutions technologiques adaptées à votre secteur d\'activité.',
      features: [
        'Optimisation des processus métier',
        'Support technique et maintenance',
        'Veille technologique et innovation',
        'Assistance sur assemblage PC',
        'Conseils pour optimisation SEO',
        'Conseils pour optimisation de la performance Web Core Vitals',
        'Conseils pour optimisation de la sécurité',
        'Conseils pour optimisation de la confidentialité',
        'Conseils pour optimisation de la confidentialité',
      ],
      color: 'from-green-500 to-emerald-600',
      details: 'Nous vous aidons à moderniser votre SI, migrer vers le cloud et optimiser vos coûts IT. Notre approche pragmatique garantit un ROI mesurable et une transition en douceur vers les nouvelles technologies.',
      disabled: false,
      slug: 'conseil-informatique'
    },
    {
      icon: '⚡',
      title: 'Solutions Innovation',
      subtitle: 'Outils sur-mesure et automatisation',
      description: 'Développement de solutions innovantes et d\'outils d\'automatisation pour améliorer votre productivité. Nous créons des gadgets technologiques personnalisés et des intégrations API avancées.',
      features: [
        'Outils d\'automatisation des tâches répétitives',
        'Scripts personnalisés Python, Node.js, Bash',
        'Intégrations API',
        'Extensions navigateur et applications desktop',
        'Pentest Softwares & Hardware',
      ],
      color: 'from-purple-500 to-indigo-600',
      details: 'Innovation et créativité au service de votre productivité. Nous développons des solutions sur-mesure qui automatisent vos processus métier et vous font gagner un temps précieux.',
      disabled: true,
      slug: 'solutions-innovation'
    }
  ];



  const processSteps = [
    {
      number: "01",
      title: "Analyse des besoins",
      description: "Étude approfondie de votre contexte, objectifs et contraintes techniques."
    },
    {
      number: "02", 
      title: "Proposition personnalisée",
      description: "Présentation d'une solution sur-mesure."
    },
    {
      number: "03",
      title: "Développement agile",
      description: "Réalisation itérative avec points réguliers et tests continus. Vous pouvez suivre l'avancement de votre projet en temps réel."
    },
    {
      number: "04",
      title: "Livraison et formation",
      description: "Déploiement sécurisé et nous vous formons à l'utilisation de la solution."
    }
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev < processSteps.length - 1) {
            return prev + 1
          } else {
            clearInterval(interval)
            return prev
          }
        })
      }, 400) // Délai réduit entre chaque étape pour mobile

      return () => clearInterval(interval)
    }
  }, [isInView, processSteps.length])

  const faqItems = [
    {
      question: "Un site web c'est cher ?",
      answer: "Un site web peut coûter entre 120€ et +10000€, cela dépend de la complexité du projet. Mais c'est un investissement qui peut vous rapporter de nombreuses opportunités."
    },
    {
      question: "Quelles technologies utilisez-vous pour le développement web ?",
      answer: "Nous maîtrisons React, Next.js, TypeScript, Node.js, Python, Django, et les principales bases de données. Notre choix technologique s'adapte toujours aux besoins spécifiques de votre projet."
    },
    {
      question: "Proposez-vous de la maintenance après livraison ?",
      answer: "Oui, la maintenance est garantie 6 mois après la livraison. Ensuite elle recquiert un supplément adaptable en fonction du besoin."
    },
    {
      question: "Travaillez-vous avec des entreprises de toute taille ?",
      answer: "Absolument ! Nous accompagnons aussi bien les startups que les grandes entreprises, en adaptant notre approche et nos tarifs à la taille et aux moyens de chaque client."
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <Navigation currentPage="services" />

      {/* Hero Section */}
      <AnimationWrapper animation="fadeIn" duration={0.6}>
        <div className="text-center py-12 sm:py-20 px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-winky">
            Nos <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
            Expert en services numériques à Bordeaux, Oxelya vous accompagne dans votre transformation digitale avec une approche complète : cybersécurité, développement web moderne, conseil IT stratégique et solutions d&apos;innovation sur-mesure. Notre équipe d&apos;experts met son savoir-faire au service de votre réussite.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 px-4">
            <span className="bg-gray-800 px-2 sm:px-3 py-1 rounded-full">Tests d&apos;intrusion</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 rounded-full">Développement Web</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 rounded-full">Cybersécurité</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 rounded-full">Conseil Informatique</span>
            <span className="bg-gray-800 px-2 sm:px-3 py-1 rounded-full">Gadgets</span>
          </div>
        </div>
      </AnimationWrapper>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {services
            .filter(service => !service.disabled)
            .map((service, index) => (
            <AnimationWrapper
              key={index}
              animation="slideUp"
              delay={index * 0.05}
              duration={0.4}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-[1.02] h-full relative">
                <div className="h-full flex flex-col">
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">{service.icon}</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-winky">{service.title}</h2>
                  <h3 className="text-base sm:text-lg text-gray-400 mb-3 sm:mb-4">{service.subtitle}</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">Services inclus :</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mr-2 sm:mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-300 italic">{service.details}</p>
                  </div>

                  <Link 
                    href={`/services/${service.slug}`}
                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg bg-gradient-to-r ${service.color} text-white font-semibold transition-all duration-300 mt-auto hover:scale-105 text-center block text-sm sm:text-base`}
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </div>
      </div>

      {/* Notre processus */}
      <div ref={processRef} className="bg-gradient-to-r from-gray-900/50 to-black/50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <AnimationWrapper animation="fadeIn" delay={0.2} duration={0.6}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 font-winky">Notre Processus</h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Une méthodologie éprouvée pour garantir le succès de vos projets, de l&apos;analyse initiale à la livraison finale.
              </p>
            </div>
          </AnimationWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="relative mb-4 sm:mb-6">
                  <motion.div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto relative overflow-hidden"
                    animate={{
                      background: index <= activeStep 
                        ? "linear-gradient(135deg, #06b6d4, #8b5cf6)" 
                        : "linear-gradient(135deg, #374151, #6b7280)"
                    }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    {/* Barre de progression animée */}
                    {index <= activeStep && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                    <span className="text-lg sm:text-xl font-bold text-white relative z-10">{step.number}</span>
                  </motion.div>
                  
                  {/* Ligne de connexion avec animation */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 sm:top-8 left-1/2 w-full h-px bg-gray-600 transform translate-x-8">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                        initial={{ scaleX: 0 }}
                        animate={index < activeStep ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: (index + 1) * 0.05 }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  )}
                </div>
                
                <motion.h3 
                  className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3"
                  animate={index <= activeStep ? { color: "#ffffff" } : { color: "#6b7280" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="text-xs sm:text-sm"
                  animate={index <= activeStep ? { color: "#d1d5db" } : { color: "#6b7280" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pourquoi nous choisir */}
      <AnimationWrapper animation="fadeIn" delay={0.4} duration={0.6}>
        <div className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 font-winky">Pourquoi Choisir Oxelya ?</h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Notre expertise technique et notre approche personnalisée font de nous le partenaire idéal pour votre transformation numérique.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Expertise Reconnue',
                  description: 'Oxelya étant à ses débuts, nous sommes en pleine évolution mais nous avons déjà réalisé des projets de qualité que vous pouvez consulter dans "Autre Plateformes".'
                },
                {
                  icon: '⚡',
                  title: 'Réactivité',
                  description: 'Délais de réponse rapides et livraisons dans les temps grâce à notre méthodologie agile et notre organisation optimisée. Vous pouvez suivre l\'avancement de votre projet.'
                },
                {
                  icon: '🛡️',
                  title: 'Sécurité par Design',
                  description: 'Toutes nos solutions intègrent la sécurité dès la conception, car nous connaissons les enjeux selon les différents secteurs d\'activité. Nous apportons de la nouveauté.'
                }
              ].map((item, index) => (
                <AnimationWrapper
                  key={index}
                  animation="slideUp"
                  delay={0.5 + index * 0.05}
                  duration={0.4}
                >
                  <div className="text-center p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{item.description}</p>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </AnimationWrapper>

      {/* FAQ */}
      <AnimationWrapper animation="fadeIn" delay={0.6} duration={0.6}>
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 font-winky">Questions Fréquentes</h2>
              <p className="text-lg sm:text-xl text-gray-300 px-4">
                Réponses aux questions les plus courantes sur nos services et notre approche.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {faqItems.map((item, index) => (
                <AnimationWrapper
                  key={index}
                  animation="slideLeft"
                  delay={0.7 + index * 0.05}
                  duration={0.4}
                >
                  <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10 hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">{item.question}</h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{item.answer}</p>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </AnimationWrapper>

      {/* CTA Section */}
      <AnimationWrapper animation="slideUp" delay={0.8} duration={0.6}>
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 py-12 sm:py-20">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 font-winky">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Contactez-nous dès aujourd&apos;hui pour discuter de vos besoins et obtenir un devis personnalisé. 
              Notre équipe d&apos;experts est là pour vous accompagner dans votre transformation numérique.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                Demander un devis gratuit
              </Link>
              <a 
                href="tel:+33643323412"
                className="inline-block border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105"
              >
                Appeler
              </a>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  );
} 
