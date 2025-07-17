'use client'

import { useProgressiveEnhancement } from '../hooks/useProgressiveEnhancement'
import Footer from './Footer'

export default function ProgressiveFooter() {
  const isEnhanced = useProgressiveEnhancement()

  // Version statique HTML
  if (!isEnhanced) {
    return (
      <footer className="bg-gradient-to-r from-gray-900 to-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4 font-winky">Oxelya</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Expert en services numériques à Bordeaux. Nous accompagnons votre transformation 
                digitale avec des solutions sur-mesure en cybersécurité, développement web et conseil IT.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:contact@oxelya.fr" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Email</span>
                  📧
                </a>
                <a href="tel:+33643323412" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Téléphone</span>
                  📞
                </a>
                <a href="https://linkedin.com/company/oxelya" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Pentest & Cybersécurité</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Développement Web</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Conseil Informatique</a></li>
                <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Solutions Innovation</a></li>
              </ul>
            </div>

            {/* Liens utiles */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Liens utiles</h4>
              <ul className="space-y-2">
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">Mentions légales</a></li>
                <li><a href="/politique-confidentialite" className="text-gray-300 hover:text-white transition-colors">Politique de confidentialité</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Oxelya. Tous droits réservés.
              </p>
              <p className="text-gray-400 text-sm mt-2 md:mt-0">
                Bordeaux, France
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  // Version avec animations Framer Motion
  return <Footer />
} 