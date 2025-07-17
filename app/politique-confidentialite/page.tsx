'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation currentPage="politique-confidentialite" />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Politique de Confidentialité
            </h1>

            <div className="space-y-8 text-gray-300">
              {/* Introduction */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/30"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                <p className="mb-4">
                  La présente politique de confidentialité décrit comment Oxelya collecte, utilise, 
                  stocke et protège vos données personnelles conformément au Règlement Général sur 
                  la Protection des Données (RGPD).
                </p>
                <p>
                  En utilisant notre site web et nos services, vous acceptez les pratiques décrites 
                  dans cette politique de confidentialité.
                </p>
              </motion.section>

              {/* Responsable du traitement */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Responsable du traitement</h2>
                <div className="space-y-2">
                  <p><strong className="text-blue-400">Entreprise :</strong> Oxelya</p>
                  <p><strong className="text-blue-400">Adresse :</strong> Bordeaux, France</p>
                  <p><strong className="text-blue-400">Email :</strong> contact@oxelya.com</p>
                  <p><strong className="text-blue-400">DPO :</strong> contact@oxelya.com</p>
                </div>
              </motion.section>

              {/* Données collectées */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Données personnelles collectées</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Via le formulaire de contact :</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Nom et prénom</li>
                      <li>Adresse email</li>
                      <li>Nom de l&apos;entreprise (optionnel)</li>
                      <li>Message et demande</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Données de navigation :</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Adresse IP</li>
                      <li>Type de navigateur et version</li>
                      <li>Pages visitées et durée de visite</li>
                      <li>Données de référencement (site web d&apos;origine)</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Finalités et bases légales */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Finalités du traitement et bases légales</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-blue-400">Finalité</th>
                        <th className="text-left py-3 px-4 text-blue-400">Base légale</th>
                        <th className="text-left py-3 px-4 text-blue-400">Durée de conservation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4">Répondre à vos demandes de contact</td>
                        <td className="py-3 px-4">Consentement</td>
                        <td className="py-3 px-4">3 ans</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4">Améliorer l&apos;expérience utilisateur</td>
                        <td className="py-3 px-4">Intérêt légitime</td>
                        <td className="py-3 px-4">25 mois</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-3 px-4">Analyser le trafic du site</td>
                        <td className="py-3 px-4">Intérêt légitime</td>
                        <td className="py-3 px-4">25 mois</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.section>

              {/* Destinataires */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Destinataires des données</h2>
                <p className="mb-4">Vos données personnelles peuvent être partagées avec :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-blue-400">L&apos;équipe Oxelya :</strong> pour traiter vos demandes</li>
                  <li><strong className="text-blue-400">Hébergeur (Vercel) :</strong> pour le fonctionnement du site</li>
                  <li><strong className="text-blue-400">Prestataires techniques :</strong> dans le cadre de la maintenance du site</li>
                </ul>
                <p className="mt-4 text-yellow-400">
                  ⚠️ Aucune donnée n&apos;est vendue ou transmise à des tiers à des fins commerciales.
                </p>
              </motion.section>

              {/* Transferts internationaux */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Transferts internationaux</h2>
                <p className="mb-4">
                  Certaines de vos données peuvent être transférées vers des pays situés en dehors 
                  de l&apos;Union européenne, notamment :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-blue-400">États-Unis :</strong> hébergement sur Vercel (décision d&apos;adéquation)</li>
                </ul>
                <p className="mt-4">
                  Ces transferts sont encadrés par des garanties appropriées conformément au RGPD.
                </p>
              </motion.section>

              {/* Vos droits */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-lg p-6 border border-green-500/30"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Vos droits RGPD</h2>
                <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Droits d&apos;accès et de portabilité</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Accéder à vos données personnelles</li>
                      <li>Obtenir une copie de vos données</li>
                      <li>Demander la portabilité de vos données</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Droits de modification et suppression</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Rectifier vos données incorrectes</li>
                      <li>Demander l&apos;effacement de vos données</li>
                      <li>Limiter le traitement de vos données</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Droit d&apos;opposition</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Vous opposer au traitement</li>
                      <li>Retirer votre consentement</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">Droit de réclamation</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Déposer une plainte auprès de la CNIL</li>
                      <li>Contacter notre DPO</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                  <p className="text-sm">
                    <strong className="text-green-400">Comment exercer vos droits :</strong><br/>
                    Envoyez un email à <a href="mailto:contact@oxelya.com" className="text-green-400 underline">contact@oxelya.com</a> 
                    en précisant l&apos;objet &quot;Exercice de mes droits RGPD&quot; et en joignant une copie de votre pièce d&apos;identité.
                  </p>
                </div>
              </motion.section>

              {/* Cookies */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Cookies et technologies similaires</h2>
                <p className="mb-4">Notre site utilise des cookies pour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-blue-400">Cookies techniques :</strong> assurer le bon fonctionnement du site</li>
                  <li><strong className="text-blue-400">Cookies de performance :</strong> analyser l&apos;utilisation du site (durée de conservation : 25 mois)</li>
                </ul>
                <p className="mt-4">
                  Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                </p>
              </motion.section>

              {/* Sécurité */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Sécurité des données</h2>
                <p className="mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Chiffrement HTTPS/TLS pour toutes les communications</li>
                  <li>Hébergement sécurisé chez Vercel</li>
                  <li>Accès restreint aux données personnelles</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                  <li>Surveillance des accès et des activités</li>
                </ul>
              </motion.section>

              {/* Modifications */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Modifications de cette politique</h2>
                <p className="mb-4">
                  Cette politique de confidentialité peut être mise à jour pour refléter les changements 
                  dans nos pratiques ou pour des raisons opérationnelles, légales ou réglementaires.
                </p>
                <p>
                  Nous vous encourageons à consulter régulièrement cette page pour rester informé 
                  de nos pratiques en matière de protection des données.
                </p>
              </motion.section>

              {/* Contact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/30"
              >
                <h2 className="text-2xl font-semibold text-white mb-4">Contact - Délégué à la Protection des Données</h2>
                <p className="mb-4">
                  Pour toute question concernant cette politique de confidentialité ou l&apos;exercice de vos droits :
                </p>
                <div className="space-y-2">
                  <p><strong className="text-blue-400">Email DPO :</strong> contact@oxelya.com</p>
                  <p><strong className="text-blue-400">Formulaire de contact :</strong> <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">Accéder au formulaire</a></p>
                  <p><strong className="text-blue-400">CNIL :</strong> <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Déposer une plainte</a></p>
                </div>
              </motion.section>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
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