import ProgressiveHome from './components/ProgressiveHome'

export default function Home() {
  return (
    <>
      {/* Section hero avec amélioration progressive */}
      <ProgressiveHome />
      
      {/* Section de contenu supplémentaire */}
      <div className="relative w-full min-h-screen bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-8 py-20">
          <section id="about" className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              À propos d&apos;Oxelya
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-300 mb-6">
                  Oxelya est votre partenaire de confiance pour tous vos besoins en services numériques. 
                  Nous combinons expertise technique et innovation pour offrir des solutions sur-mesure 
                  qui propulsent votre entreprise vers l&apos;avenir.
                </p>
                <p className="text-lg text-gray-300">
                  De la sécurisation de vos systèmes au développement d&apos;applications web modernes, 
                  en passant par des conseils stratégiques en informatique, nous mettons notre 
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

          <section id="portfolio" className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-winky">
              Nos Réalisations
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Audit Sécurité Bancaire', desc: 'Pentest complet pour une institution financière', tech: 'Kali Linux, Metasploit, OWASP' },
                { title: 'Application E-commerce', desc: 'Plateforme de vente en ligne moderne et sécurisée', tech: 'Next.js, Stripe, PostgreSQL' },
                { title: 'Plateforme de Contenu', desc: 'Plateforme de contenu pour DrHead', tech: 'Next.js, Tailwind, MongoDB' }
              ].map((project, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-3 font-winky">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(', ').map((tech, i) => (
                      <span key={i} className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
    </>
  )
}
