'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminNavigation from '../../components/AdminNavigation'
import Image from 'next/image'

interface Article {
  id: string
  title: string
  content: string
  slug: string
  imageUrl: string | null
  excerpt: string | null
  published: boolean
  metaTitle: string | null
  metaDesc: string | null
  metaKeywords: string | null
  createdAt: string
  updatedAt: string
  admin: {
    username: string
  }
  comments: Array<{ id: string }>
  ratings: Array<{ rating: number }>
}

interface AdminData {
  id: string
  username: string
  email: string
  role: string
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  // useEffect pour l'authentification
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const admin = localStorage.getItem('adminData')

    if (!token || !admin) {
      router.push('/admin/login')
      return
    }

    try {
      setAdminData(JSON.parse(admin))
    } catch (error) {
      console.error('Erreur:', error)
      router.push('/admin/login')
      return
    }
  }, [router])

  const fetchArticles = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      })

      const response = await fetch(`/api/admin/articles?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminData')
          router.push('/admin/login')
          return
        }
        throw new Error('Erreur lors de la récupération des articles')
      }

      const data = await response.json()
      setArticles(data.articles)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, statusFilter, searchTerm, router])

  // useEffect pour charger les articles
  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  const deleteArticle = async (articleId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchArticles()
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const togglePublishStatus = async (articleId: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ published: !currentStatus })
      })

      if (response.ok) {
        fetchArticles()
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    router.push('/admin/login')
  }

  const getStatusColor = (published: boolean) => {
    return published ? 'bg-green-500' : 'bg-yellow-500'
  }

  const getStatusText = (published: boolean) => {
    return published ? 'Publié' : 'Brouillon'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNavigation adminData={adminData} onLogout={logout} />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header avec bouton créer */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Gestion des Articles</h2>
          <motion.button
            onClick={() => router.push('/admin/articles/create')}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ✏️ Créer un article
          </motion.button>
        </div>

        {/* Filtres */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                <option value="ALL">Tous les statuts</option>
                <option value="published">Publiés</option>
                <option value="draft">Brouillons</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Recherche
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchArticles}
                className="w-full bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors"
              >
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Liste des articles */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          {articles.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm || statusFilter !== 'ALL' 
                  ? 'Aucun article ne correspond à vos critères'
                  : 'Commencez par créer votre premier article !'
                }
              </p>
              {!searchTerm && statusFilter === 'ALL' && (
                <motion.button
                  onClick={() => router.push('/admin/articles/create')}
                  className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Créer un article
                </motion.button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Statistiques
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {articles.map((article, index) => {
                    const averageRating = article.ratings.length > 0 
                      ? article.ratings.reduce((acc, r) => acc + r.rating, 0) / article.ratings.length 
                      : 0

                    return (
                      <motion.tr
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            {article.imageUrl && (
                              <Image 
                                src={article.imageUrl} 
                                alt={article.title}
                                className="w-12 h-12 rounded-lg object-cover"
                                width={48}
                                height={48}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-white">
                                {article.title}
                              </div>
                              <div className="text-sm text-gray-400">
                                {article.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.published)}`}>
                            {getStatusText(article.published)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <div className="space-y-1">
                            <div>💬 {article.comments.length} commentaires</div>
                            <div>⭐ {article.ratings.length} notes ({averageRating.toFixed(1)})</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => router.push(`/blog/${article.slug}`)}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors"
                              title="Voir l'article"
                            >
                              👁️
                            </button>
                            <button
                              onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Modifier"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => togglePublishStatus(article.id, article.published)}
                              className={`transition-colors ${
                                article.published 
                                  ? 'text-yellow-400 hover:text-yellow-300' 
                                  : 'text-green-400 hover:text-green-300'
                              }`}
                              title={article.published ? 'Dépublier' : 'Publier'}
                            >
                              {article.published ? '📤' : '📥'}
                            </button>
                            <button
                              onClick={() => deleteArticle(article.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                              title="Supprimer"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 