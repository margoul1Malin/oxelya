import ProgressiveHome from './components/ProgressiveHome'
import ProcessTimeline from './components/ProcessTimeline'
import ContactForm from './components/ContactForm'
import Link from 'next/link'
import Footer from './components/Footer'
import { 
  FaShieldAlt, 
  FaRocket, 
  FaHandshake, 
  FaLightbulb, 
  FaUsers, 
  FaChartLine 
} from 'react-icons/fa'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* Section hero avec amélioration progressive */}
      <ProgressiveHome />
      
      {/* Section de contenu supplémentaire */}
      <div className="relative w-full min-h-screen bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <section id="about" className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky ">
              À propos d&apos;Oxelya
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
              <div>
                <p className="text-lg text-gray-300 mb-6">
                  Oxelya est votre partenaire de confiance pour tous vos besoins en <strong>services numériques</strong>.
                  Nous combinons expertise technique et innovation pour offrir des solutions sur-mesure 
                  qui propulsent votre entreprise vers l&apos;avenir.
                  <br />
                  <br />
                  Nous sommes là pour vous accompagner dans la conception <strong>WEB</strong>, la sécurisation de vos systèmes, 
                  le développement d&apos;applications <strong>WEB</strong> modernes, et des conseils stratégiques en <strong>informatique</strong>.
                  <br />
                  <br />
                  Nous mettons notre savoir-faire au service de votre réussite.
                </p>
                <p className="text-lg text-gray-300">
                  De la sécurisation de vos systèmes au développement d&apos;applications <strong>WEB</strong> modernes, 
                  en passant par des conseils stratégiques en <strong>informatique</strong>, nous mettons notre 
                  savoir-faire au service de votre réussite.
                </p>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 font-winky">+25</h3>
                  <p className="text-gray-400">Projets Réalisés</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 font-winky">24/7</h3>
                  <p className="text-gray-400">Support Client</p>
                </div>
                <div className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 font-winky">100%</h3>
                  <p className="text-gray-400">Satisfaction</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-cyan-500/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 font-winky">5+</h3>
                  <p className="text-gray-400">Années d&apos;Expertise</p>
                </div>
              </div>
            </div>
          </section>

          <section id="process" className="mb-20">
            <h1 id="technologies" className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Notre Manière de Procéder
            </h1> 
            <div className="grid gap-8 items-center text-center text-lg">
              <p className="text-gray-200">
                Chez Oxelya, nous n&apos;utilisons <strong>jamais de CMS</strong> (Outils tout-en-un) pour la création de vos sites web. <br />
                <strong>Nous préférons créer le site WEB</strong> de A à Z avec une <strong>efficacité inégalée</strong>.
              </p>
              <p className="">
                Nous utilisons tous les outils nécessaires au bon développement de votre site WEB. Et à la formation de vous, ou vos équipes.
              </p>
            </div>

              <ProcessTimeline />
          </section>

          <section id="nos-services" className="mb-20">
            <h1 id="nos-services" className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              <Link href="/services">Nos Services ↪</Link>
            </h1> 
            <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 font-winky bg-gradient-to-r from-cyan-200 to-purple-300 bg-clip-text text-transparent">
                  Développement Web Sur-Mesure
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Chez Oxelya, nous vous prenons en charge dans la réalisaiton de l&apos;interface <strong>WEB</strong> de votre entreprise.
                  <br /><br />
                  <strong>Nous préférons créer le site WEB de A à Z</strong> avec une <strong>efficacité inégalée</strong>, 
                  en utilisant les technologies les plus modernes pour garantir performance, sécurité et flexibilité. <br />
                  <br />
                  Nous vous offrons un site WEB moderne, performant, sécurisé et adapté à vos besoins. Et nous pouvons aussi gérer la refonte de votre site <strong>WEB</strong>.
                </p>
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mt-6">
                  <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full text-sm border border-cyan-500/30">
                    Next.js
                  </span>
                  <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full text-sm border border-purple-500/30">
                    Django
                  </span>
                  <span className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 px-4 py-2 rounded-full text-sm border border-pink-500/30">
                    CMS
                  </span>
                  <span className="bg-gradient-to-r from-orange-500/20 to-cyan-500/20 px-4 py-2 rounded-full text-sm border border-orange-500/30">
                    Database
                  </span>
                </div>
              </div>
              
              <div className="relative order-first md:order-last">
                <Image
                  src="/WebDev.jpg" 
                  alt="Développement web moderne avec code et technologies" 
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl shadow-cyan-500/20 border border-white/10"
                  width={565}
                  height={318}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={false}
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center my-6 text-center md:text-left">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 font-winky bg-gradient-to-r from-cyan-200 to-purple-300 bg-clip-text text-transparent">
                  Conseils en Informatique
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Nous sommes conscient que l&apos;informatique est un domaine complexe, et que beaucoup de gens ne comprennent pas les enjeux de la sécurité, de la performance, et de la flexibilité de leurs systèmes.
                  <br /><br />
                  Nous vous conseillons sur la meilleure façon de réaliser vos projets, en fonction de vos besoins et de vos contraintes.
                  <br /><br />
                  Nous vous offrons notre aide sur tout un tas de sujets, de la sécurisation Active Directory, à la mise en place de solutions de backup, en passant performance de vos systèmes.
                </p>
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mt-6">
                  <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full text-sm border border-cyan-500/30">
                    Active Directory
                  </span>
                  <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full text-sm border border-purple-500/30">
                    Backup
                  </span>
                  <span className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 px-4 py-2 rounded-full text-sm border border-pink-500/30">
                    Performance
                  </span>
                  <span className="bg-gradient-to-r from-orange-500/20 to-cyan-500/20 px-4 py-2 rounded-full text-sm border border-orange-500/30">
                    Sécurité
                  </span>
                </div>
              </div>
              
              <div className="relative order-first md:order-last">
                <Image
                  src="/ConseilInfo.jpg" 
                  alt="Conseils en informatique et cybersécurité" 
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl shadow-cyan-500/20 border border-white/10"
                  width={477}
                  height={318}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={false}
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center my-6 text-center md:text-left">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 font-winky bg-gradient-to-r from-cyan-200 to-purple-300 bg-clip-text text-transparent">
                  Formations
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Nous vous offrons des formations sur les technologies que nous utilisons, afin que vous puissiez comprendre leur fonctionnement, et les utiliser efficacement.
                  <br /><br />
                  Mais nous ne nous limitons pas à cela. Nous pouvons vous former à l&apos;utilisation de systèmes Linux, Windows, et autres.
                  <br /><br />
                  Nous vous formons également à chaque prestation, à l&apos;utilisation correct de nos outils.
                </p>
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mt-6">
                  <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full text-sm border border-cyan-500/30">
                    Linux
                  </span>
                  <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full text-sm border border-purple-500/30">
                    Windows
                  </span>
                  <span className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 px-4 py-2 rounded-full text-sm border border-pink-500/30">
                    Formations
                  </span>
                  <span className="bg-gradient-to-r from-orange-500/20 to-cyan-500/20 px-4 py-2 rounded-full text-sm border border-orange-500/30">
                    Autres
                  </span>
                </div>
              </div>
              
              <div className="relative order-first md:order-last">
                <Image
                  src="/hacking.png" 
                  alt="Formations en cybersécurité et hacking éthique" 
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl shadow-cyan-500/20 border border-white/10"
                  width={565}
                  height={318}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={false}
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center my-6 text-center md:text-left">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4 font-winky bg-gradient-to-r from-cyan-200 to-purple-300 bg-clip-text text-transparent">
                  Images de Marques
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Nous vous offrons le design du logo de votre entreprise, afin que vous puissiez l&apos;utiliser dans vos projets.
                  <br /><br />
                  Nous l&apos;adaptons à vos besoins, avec et sans texte, sous forme de bannière ou autre...
                </p>
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3 mt-6">
                  <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full text-sm border border-cyan-500/30">
                    Linux
                  </span>
                  <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full text-sm border border-purple-500/30">
                    Windows
                  </span>
                  <span className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 px-4 py-2 rounded-full text-sm border border-pink-500/30">
                    Formations
                  </span>
                  <span className="bg-gradient-to-r from-orange-500/20 to-cyan-500/20 px-4 py-2 rounded-full text-sm border border-orange-500/30">
                    Autres
                  </span>
                </div>
              </div>
              
              <div className="relative order-first md:order-last">
                <Image
                  src="/LogoDesign.jpg" 
                  alt="Design de logos et identité visuelle" 
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl shadow-cyan-500/20 border border-white/10"
                  width={565}
                  height={318}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={false}
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </section>

          <section id="CTA" className="mb-20">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Prêt à transformer vos idées ?
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto text-center">
              Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et découvrir comment 
              Oxelya peut vous accompagner dans votre transformation numérique.
            </p>
            
            <div className="max-w-4xl mx-auto">
              <ContactForm compact={true} />
            </div>
          </section>

          <section id="icons-presentations" className="mb-20">
            <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Nos Valeurs
            </h1>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-winky text-center">
                  Sécurité Maximale
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Protection avancée de vos données et systèmes informatiques avec des solutions de cybersécurité de pointe pour entreprises
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaRocket className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-winky text-center">
                  Performance Optimale
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Développement web haute performance avec des sites internet rapides et optimisés pour améliorer votre visibilité en ligne
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaHandshake className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-winky text-center">
                  Confiance Totale
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Relation client transparente et honnête avec des devis détaillés et un accompagnement personnalisé pour votre projet digital
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaLightbulb className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-winky text-center">
                  Innovation Continue
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Solutions informatiques innovantes et technologies de pointe pour transformer votre entreprise et booster votre croissance
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-winky text-center">
                  Expertise Partagée
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Formation et transfert de compétences pour autonomiser vos équipes et maximiser l&apos;efficacité de vos outils informatiques
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FaChartLine className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-winky text-center">
                  Résultats Mesurables
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Suivi des performances et optimisation continue pour garantir le succès de vos projets informatiques et votre ROI
                </p>
              </div>
            </div>
          </section>


          <section id="portfolio" className="mb-20">
            <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Nos Réalisations
            </h1>
            <h3 className="text-gray-200 text-center mb-12 text-lg">
              Voici quelques exemples de nos réalisations. Ce ne sont que 6 parmis tant d&apos;autres.
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  title: 'DrHead', 
                  desc: 'Plateforme de contenu, articles & vidéos. Systèmes PREMIUM intégrés.', 
                  tech: ['Next.js', 'Tailwind', 'MongoDB', 'Stripe'],
                  image: '/sites/Drhead.png',
                  category: 'Application Web'
                },
                { 
                  title: 'Application E-commerce', 
                  desc: 'Plateforme de vente en ligne moderne avec paiements sécurisés et gestion des stocks', 
                  tech: ['Next.js', 'Stripe', 'PayPal', 'UI/UX'],
                  image: '/sites/OxelyaShop.webp',
                  category: 'E-commerce'
                },
                { 
                  title: 'ClimGO', 
                  desc: 'Site vitrine pour un artisan climatiseur, avec un design moderne et responsive.', 
                  tech: ['Next.js', 'Devis', 'UI/UX'],
                  image: '/sites/Climgo.png',
                  category: 'Site Web Vitrine'
                },
                { 
                  title: 'Margoul1 Dev', 
                  desc: 'Site web professionnel avec design moderne pour un portfolio de développeur.', 
                  tech: ['Next.js', 'Tailwind', 'UI/UX'],
                  image: '/sites/Margoul1Dev.png',
                  category: 'Portfolio'
                },
                { 
                  title: 'Margoul1 Xyz', 
                  desc: 'Site web pour un portfolio de développeur, avec un design moderne et responsive.', 
                  tech: ['Next.js', 'Tailwind', 'UI/UX'],
                  image: '/sites/Margoul1Xyz.png',
                  category: 'Portfolio'
                },
                { 
                  title: 'gOsint', 
                  desc: 'Plateforme OSINT, avec un design moderne. Gestion des workers avec RabbitMQ.', 
                  tech: ['Python', 'BitPay', 'RabbitMQ'],
                  image: '/sites/gOsint.png',
                  category: 'Application Web'
                }
              ].map((project, index) => (
                <div key={index} className="group relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                  {/* Image de fond avec overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={1000}
                      height={1000}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Badge catégorie */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-cyan-500/90 to-purple-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 font-winky text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                      {project.desc}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs px-3 py-1 rounded-full hover:bg-white/20 transition-colors duration-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* Card "Devenir la prochaine" */}
            <div className="mt-12">
              <Link href="/contact" className="block group">
                <div className="relative overflow-hidden bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-12 text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 font-winky bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-300">
                      Devenir la Prochaine
                    </h3>
                    
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                      Prêt à transformer votre idée en réalité numérique ? 
                      <br />
                      Rejoignez nos clients satisfaits et donnez vie à votre projet avec Oxelya.
                    </p>
                    
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 group-hover:scale-105 shadow-lg">
                      <span>Démarrer votre projet</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          <section id="google-advices" className="mb-20">
            <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Avis Google
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Avis 1 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">ClimGO</h4>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span className="text-gray-400 text-xs ml-2">il y a 2 mois</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  &quot;Très professionnel, contact régulier, très efficace. Nous le remercions.&quot;
                </p>
              </div>

              {/* Avis 2 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">J</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Jhonny Sinner</h4>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span className="text-gray-400 text-xs ml-2">il y a 1 mois</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  &quot;Au Top ! Ils m&apos;ont beaucoup aidé pour créer mon site Web, le résultat s&apos;est fait ressentir dès le début&quot;
                </p>
              </div>

              {/* Avis 3 */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">K</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Know Ledger</h4>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                      <span className="text-gray-400 text-xs ml-2">il y a 3 semaines</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  &quot;Je suis le propriétaire de https://drhead.org, ils m&apos;ont fait une plateforme de contenu au top ! Système d&apos;abonnements, de notifications par e-mail et double authentification. Je les remercie.&quot;
                </p>
              </div>

              {/* Card "Laisser un avis" */}
              <Link href="https://www.google.com/search?sca_esv=a200e05b38ad46df&hl=fr&authuser=0&sxsrf=AE3TifNrchhV0FtstjYBUgwjprhzx5r8_g:1752932987133&uds=AOm0WdE2fekQnsyfYEw8JPYozOKzH1IutTvbH_cvBc-Tr9Rc7NyYpLQl2a2IFWOL5VuIR77I8jQ8qx4xEjTCoNo149omX8WDVZfB_L2aemzin4sHQZpjqVZW3s3ck6BAlDcYqo0HAFzO_Xh1jIXhWg9wmcbOGhKEmd6hhddTDaxacDqP1tPCt_9njARDPF1cp5vgvbEOgJz1&q=Oxelya+-+Conception+Web+%26+Services+Num%C3%A9riques+Avis&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E1VFLHlCPyEz4WCunJ685sDGFQvRGeDzj2gI29BCo6aRRtGXipaim_DGcRnU5WX1lXcDZlcxYX-5RT_RsDue9YUUIO5L8n33hhUsNGZdMMRGjW2YO-fcxL1SjPRuz77dB9qaHV4%3D&sa=X&ved=2ahUKEwjko42giMmOAxUFdqQEHaXaNsUQ_4MLegQIMBAL&biw=2560&bih=1318&dpr=1" className="block group">
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group cursor-pointer">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Laisser un avis</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Partagez votre expérience avec Oxelya et aidez d&apos;autres clients à nous découvrir
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-center text-yellow-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <p className="text-cyan-400 text-xs mt-2">Cliquez pour noter</p>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          </section>

          <section id="contact" className="text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Prêt à transformer vos idées ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et découvrir comment 
              Oxelya peut vous accompagner dans votre transformation numérique.
            </p>
            <a 
              href="/contact"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
            >
              Démarrer votre projet
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
