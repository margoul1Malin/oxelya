'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="mentions-legales" />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mentions Légales
            </h1>

            <div className="space-y-8 text-gray-300">
              {/* Éditeur du site */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Éditeur du site</h2>
                <div className="space-y-2">
                  <p><strong className="text-blue-400">Raison sociale :</strong> Oxelya</p>
                  <p><strong className="text-blue-400">Forme juridique :</strong> Entreprise individuelle</p>
                  <p><strong className="text-blue-400">Adresse :</strong> Bordeaux, France</p>
                  <p><strong className="text-blue-400">SIRET :</strong> [En cours de récupération]</p>
                  <p><strong className="text-blue-400">Email :</strong> contact@oxelya.com</p>
                  <p><strong className="text-blue-400">Téléphone :</strong> +33 6 43 32 34 12</p>
                </div>
              </motion.section>

              {/* Directeur de publication */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Directeur de publication</h2>
                <p>Le directeur de la publication est Théo Morio, en qualité de dirigeant de l&apos;entreprise Oxelya.</p>
              </motion.section>

              {/* Hébergement */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Hébergement</h2>
                <div className="space-y-2">
                  <p><strong className="text-blue-400">Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong className="text-blue-400">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                  <p><strong className="text-blue-400">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">vercel.com</a></p>
                </div>
              </motion.section>

              {/* Propriété intellectuelle */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Propriété intellectuelle</h2>
                <p className="mb-4">
                  Le site web d&apos;Oxelya et l&apos;ensemble de son contenu (textes, images, vidéos, logos, etc.) 
                  sont protégés par le droit d&apos;auteur et constituent la propriété exclusive d&apos;Oxelya.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                  des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, 
                  sauf autorisation écrite préalable d&apos;Oxelya.
                </p>
              </motion.section>

              {/* Responsabilité */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Limitation de responsabilité</h2>
                <p className="mb-4">
                  Les informations contenues sur ce site sont aussi précises que possible et le site 
                  remis à jour à différentes périodes de l&apos;année, mais peut toutefois contenir des 
                  inexactitudes ou des omissions.
                </p>
                <p>
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                  merci de bien vouloir le signaler par email à contact@oxelya.com en décrivant 
                  le problème de la manière la plus précise possible.
                </p>
              </motion.section>

              {/* Droit applicable */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Droit applicable et juridiction</h2>
                <p>
                  Tout litige en relation avec l&apos;utilisation du site d&apos;Oxelya est soumis au droit français. 
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de Bordeaux.
                </p>
              </motion.section>

              {/* Contact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/30"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
                <p className="mb-4">
                  Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :
                </p>
                <div className="space-y-2">
                  <p><strong className="text-blue-400">Email :</strong> contact@oxelya.com</p>
                  <p><strong className="text-blue-400">Formulaire de contact :</strong> <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">Accéder au formulaire</a></p>
                </div>
              </motion.section>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center text-gray-500 text-sm mt-12"
              >
                <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 