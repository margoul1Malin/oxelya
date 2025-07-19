'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import MarkdownEditor from '../../../../components/MarkdownEditor'
import AdminNavigation from '../../../../components/AdminNavigation'
import Image from 'next/image'
export default function EditArticlePage() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    metaTitle: '',
    metaDesc: '',
    metaKeywords: '',
    published: false
  })
  const [adminData, setAdminData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const params = useParams()
  const articleId = params.id as string

  const fetchArticle = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })

      if (response.ok) {
        const article = await response.json()
        setFormData({
          title: article.title || '',
          slug: article.slug || '',
          excerpt: article.excerpt || '',
          content: article.content || '',
          imageUrl: article.imageUrl || '',
          metaTitle: article.metaTitle || '',
          metaDesc: article.metaDesc || '',
          metaKeywords: article.metaKeywords || '',
          published: article.published || false
        })
      } else {
        alert('Article non trouvé')
        router.push('/admin/articles')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors du chargement de l\'article')
      router.push('/admin/articles')
    } finally {
      setIsLoading(false)
    }
  }, [articleId, router])

  // useEffect pour l'authentification et récupération de l'article
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const admin = localStorage.getItem('adminData')

    if (!token || !admin) {
      router.push('/admin/login')
      return
    }

    try {
      setAdminData(JSON.parse(admin))
      fetchArticle()
    } catch (error) {
      console.error('Erreur:', error)
      router.push('/admin/login')
      return
    }
  }, [router, fetchArticle])

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    router.push('/admin/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Article modifié avec succès !')
        router.push('/admin/articles')
      } else {
        const error = await response.json()
        alert(`Erreur: ${error.error}`)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la modification de l\'article')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement de l&apos;article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNavigation adminData={adminData} onLogout={logout} />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Modifier l&apos;article
          </h1>
          <p className="text-gray-400 text-lg">
            Modifiez votre article et optimisez-le pour le SEO
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Titre */}
          <div className="bg-gray-900 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Titre de l&apos;article *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              placeholder="Titre de votre article"
              required
            />
          </div>

          {/* Slug */}
          <div className="bg-gray-900 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              placeholder="titre-de-larticle"
              required
            />
          </div>

          {/* Extrait */}
          <div className="bg-gray-900 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Extrait (description courte)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              placeholder="Description courte de l'article..."
            />
          </div>

          {/* Image de couverture */}
          <div className="bg-gray-900 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Image de couverture (URL)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
            {formData.imageUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-400 mb-2">Aperçu :</p>
                <Image 
                  src={formData.imageUrl} 
                  alt="Aperçu de l'image de couverture"
                  className="w-full max-w-md h-32 object-cover rounded-lg border border-gray-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  width={1000}
                  height={1000}
                />
              </div>
            )}
          </div>

          {/* Éditeur Markdown */}
          <div className="bg-gray-900 rounded-lg p-6">
            <MarkdownEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              placeholder="Écrivez votre article en Markdown..."
              label="Contenu de l'article"
            />
          </div>

          {/* Métadonnées SEO */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Optimisation SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titre SEO
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Titre optimisé pour SEO (recommandé: 50-60 caractères)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Le titre qui apparaîtra dans les résultats de recherche Google
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description SEO
                </label>
                <textarea
                  value={formData.metaDesc}
                  onChange={(e) => setFormData({ ...formData, metaDesc: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="Description optimisée pour SEO (recommandé: 150-160 caractères)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  La description qui apparaîtra sous le titre dans les résultats de recherche
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mots-clés SEO
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                  placeholder="mot-clé1, mot-clé2, mot-clé3, mot-clé4"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Mots-clés séparés par des virgules pour améliorer le référencement
                </p>
              </div>
            </div>
          </div>

          {/* Statut de publication */}
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-5 w-5 text-cyan-600 focus:ring-cyan-500 border-gray-600 rounded bg-gray-800"
              />
              <label htmlFor="published" className="ml-3 block text-sm text-gray-300">
                Article publié
              </label>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-4">
            <motion.button
              type="button"
              onClick={() => router.push('/admin/articles')}
              className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Annuler
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 text-sm font-medium border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors ${
                isSubmitting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <span className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Modification...</span>
                </span>
              ) : (
                '💾 Sauvegarder les modifications'
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  )
} 