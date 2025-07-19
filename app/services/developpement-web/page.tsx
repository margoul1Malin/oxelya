import Link from 'next/link'
import Navigation from '../../components/Navigation'
import AnimationWrapper from '../../components/AnimationWrapper'
import DevWebScene from '../../components/DevWebScene'
import ProcessAnimation from '../../components/ProcessAnimation'
import { FaReact, FaNodeJs, FaPython, FaStripe, FaPaypal } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiPrisma, SiMongodb, SiDjango } from 'react-icons/si'
import { TbBrandThreejs } from "react-icons/tb";
import { RiNextjsFill } from "react-icons/ri";

export default function DeveloppementWeb() {
  const technologies = [
    { name: 'React', icon: <FaReact className='text-blue-500'/>, description: 'Bibliothèque JavaScript moderne'},
    { name: 'Next.js', icon: <RiNextjsFill className='text-cyan-500'/>, description: 'Framework React full-stack' },
    { name: 'TypeScript', icon: <SiTypescript className='text-purple-500'/>, description: 'JavaScript typé et sécurisé' },
    { name: 'Three.js', icon: <TbBrandThreejs className='text-green-500'/>, description: 'Rendu 3D dans le navigateur' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className='text-cyan-500'/>, description: 'Framework CSS utilitaire' },
    { name: 'Node.js', icon: <FaNodeJs className='text-green-500'/>, description: 'Runtime JavaScript côté serveur' },
    { name: 'Prisma', icon: <SiPrisma className='text-purple-500'/>, description: 'ORM pour MongoDB' },
    { name: 'MongoDB', icon: <SiMongodb className='text-green-500'/>, description: 'Base de données NoSQL' },
    { name: 'Python', icon: <FaPython className='text-purple-500'/>, description: 'Langage de programmation' },
    { name: 'Django', icon: <SiDjango className='text-cyan-500'/>, description: 'Framework Python' },
    { name: 'Stripe', icon: <FaStripe className='text-purple-500'/>, description: 'Intégration de paiement' },
    { name: '+ autres', icon: <FaPaypal className='text-purple-500'/>, description: 'Intégration de paiement' },
  ]

  const process = [
    {
      number: '01',
      title: 'Analyse & Conception UX/UI',
      description: 'Audit de vos besoins métier, étude de la concurrence, wireframes interactifs et maquettes haute fidélité. Définition de l\'architecture technique et choix des technologies optimales pour votre projet.',
      icon: '🎯'
    },
    {
      number: '02', 
      title: 'Développement Agile',
      description: 'Développement par sprints avec démonstrations régulières. Intégration continue, tests automatisés et déploiements fréquents pour un feedback rapide et une amélioration constante.',
      icon: '⚡'
    },
    {
      number: '03',
      title: 'Optimisation & Tests',
      description: 'Tests de performance, optimisation SEO avancée, tests de sécurité et d\'accessibilité. Validation sur tous les navigateurs et appareils pour une expérience utilisateur parfaite.',
      icon: '🔍'
    },
    {
      number: '04',
      title: 'Déploiement & Maintenance',
      description: 'Mise en production sécurisée avec monitoring continu, formation de vos équipes, documentation complète et support technique pour assurer la pérennité de votre application.',
      icon: '🚀'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation currentPage="services" />

      {/* Hero Section avec Three.js */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animation Three.js en arrière-plan */}
        <div className="absolute inset-0 z-0">
          <DevWebScene />
        </div>
        
        {/* Contenu du hero */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl mx-auto py-20 md:py-0">
          <AnimationWrapper animation="fadeIn" duration={1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 font-winky leading-tight">
              Développement
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent block">
                Web Moderne
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-4xl mx-auto">
              Créons ensemble des applications web exceptionnelles avec les technologies les plus avancées
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105"
              >
                Démarrer un projet
              </Link>
              <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105">
                Voir nos réalisations
              </button>
            </div>
          </AnimationWrapper>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 md:h-3 bg-white/60 rounded-full mt-1 md:mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <AnimationWrapper animation="fadeIn" delay={0.3}>
        <div className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6 font-winky">Technologies Maîtrisées</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Notre expertise couvre l&apos;ensemble de l&apos;écosystème JavaScript moderne et les dernières innovations web
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <AnimationWrapper
                  key={index}
                  animation="slideUp"
                  delay={0.5 + index * 0.1}
                  duration={0.6}
                >
                  <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group `}>
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 ">
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </AnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </AnimationWrapper>

      {/* Services & Offres Section */}
      <AnimationWrapper animation="fadeIn" delay={0.6}>
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6 font-winky">Notre Offre de Développement Web</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Solutions complètes de développement web moderne adaptées à vos besoins spécifiques. 
                De la conception à la mise en production, nous vous accompagnons dans la création d&apos;applications web performantes et évolutives.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Applications Web Modernes */}
              <AnimationWrapper animation="slideLeft" delay={0.8} duration={0.6}>
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                  <div className="text-5xl mb-6">🚀</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Applications Web Modernes</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Développement d&apos;applications web sur-mesure avec React, Next.js et TypeScript (ou d&apos;autres technologies). 
                    Interface responsive, optimisée SEO et parfaitement adaptée à tous les appareils.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Single Page Applications (SPA) ultra-rapides</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Progressive Web Apps (PWA) avec mode hors-ligne</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Optimisation Core Web Vitals et performances</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Intégration API tierces et systèmes existants</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Design 3D en supplément</span>
                    </li>
                  </ul>
                </div>
              </AnimationWrapper>

              {/* E-commerce & Solutions Métier */}
              <AnimationWrapper animation="slideRight" delay={0.9} duration={0.6}>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <div className="text-5xl mb-6">🛒</div>
                  <h3 className="text-2xl font-bold text-white mb-4">E-commerce & Solutions Métier</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Plateformes e-commerce complètes et applications métier sur-mesure. 
                    Gestion des stocks, paiements sécurisés, tableaux de bord analytics et plus encore.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Boutiques en ligne avec Stripe, PayPal, BitPay, etc...</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>CRM personnalisés selon vos processus</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Tableaux de bord avec analytics</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Systèmes multi-utilisateurs avec rôles avancés</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Gestion automatique des factures et CGV</span>
                    </li>
                  </ul>
                </div>
              </AnimationWrapper>

              {/* Expériences 3D & Interactives */}
              <AnimationWrapper animation="slideLeft" delay={1.0} duration={0.6}>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <div className="text-5xl mb-6">🎮</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Expériences 3D & Interactives</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Création d&apos;expériences immersives avec Three.js et WebGL. 
                    Visualisations 3D, configurateurs produits, présentations interactives qui marquent les esprits.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Configurateurs 3D pour produits complexes</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Visites virtuelles et showrooms numériques</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Datavisualisations 3D pour analytics</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Portfolios et sites vitrines immersifs</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Intégration maps interactives</span>
                    </li>
                  </ul>
                </div>
              </AnimationWrapper>

              {/* API & Backend */}
              <AnimationWrapper animation="slideRight" delay={1.1} duration={0.6}>
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                  <div className="text-5xl mb-6">⚡</div>
                  <h3 className="text-2xl font-bold text-white mb-4">API & Architecture Backend</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Développement d&apos;APIs robustes et architecture backend scalable. 
                    REST, microservices, bases de données optimisées pour la performance.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>APIs REST sécurisées</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Architecture microservices avec Docker</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Bases de données PostgreSQL, MongoDB</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Déploiement cloud AWS, Vercel, DigitalOcean, etc...</span>
                    </li>
                    <li className="flex items-start text-gray-300">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>Intégration Self-Services (Système de notification, Gestion de Tickets, etc...)</span>
                    </li>
                  </ul>
                </div>
              </AnimationWrapper>
            </div>
          </div>
        </div>
      </AnimationWrapper>

      {/* Process Section avec Animation */}
      <div className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto px-8">
          <AnimationWrapper animation="fadeIn" delay={1.0} duration={0.8}>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-white mb-6 font-winky">Notre Processus de Développement</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Une méthodologie agile et éprouvée qui garantit la réussite de votre projet web. 
                De l&apos;analyse des besoins à la maintenance, nous vous accompagnons à chaque étape avec transparence et expertise.
              </p>
            </div>
          </AnimationWrapper>

          {/* Version animée (visible avec JS) */}
          <ProcessAnimation steps={process} />

          {/* Version statique SEO-friendly (visible sans JS) - placée en dessous */}
          <div className="mt-16">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {process.map((step, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl mb-2">{step.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Contenu SEO supplémentaire pour les bots */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Méthodologie de Développement Web</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Notre approche de développement web suit une méthodologie agile éprouvée, garantissant la réussite de votre projet digital. 
                Chaque étape est soigneusement planifiée et exécutée avec précision pour maximiser l&apos;efficacité et minimiser les risques.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Analyse et Conception</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Nous commençons par une analyse approfondie de vos besoins métier, de votre audience cible et de vos objectifs commerciaux. 
                    Cette phase inclut l&apos;étude de la concurrence, la création de wireframes interactifs et la définition de l&apos;architecture technique optimale.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Développement Agile</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Le développement se déroule en sprints courts avec des démonstrations régulières. 
                    Cette approche permet un feedback rapide et des ajustements en temps réel, garantissant que le produit final correspond parfaitement à vos attentes.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Tests et Optimisation</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Chaque fonctionnalité est rigoureusement testée pour assurer performance, sécurité et accessibilité. 
                    Nous optimisons également le SEO, la vitesse de chargement et la compatibilité cross-browser pour une expérience utilisateur parfaite.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Déploiement et Maintenance</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    La mise en production est effectuée avec précaution, incluant monitoring continu et sauvegardes automatiques. 
                    Nous formons vos équipes et fournissons une documentation complète pour assurer la pérennité de votre application web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <AnimationWrapper animation="slideUp" delay={1.6}>
        <div className="py-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <div className="text-center max-w-4xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-white mb-6 font-winky">
              Prêt à Créer Votre Application ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transformons vos idées en réalité digitale. Contactez-nous pour discuter de votre projet 
              et obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                Demander un devis
              </Link>
              <a 
                href="tel:+33643323412"
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                Appeler
              </a>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    </div>
  )
} 