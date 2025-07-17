'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  createdAt: string
  admin?: {
    username: string
  }
  replies: Array<{
    id: string
    content: string
    createdAt: string
    admin: {
      username: string
    }
  }>
}

interface AdminData {
  id: string
  username: string
  email: string
  role: string
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [sendingReply, setSendingReply] = useState(false)
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

  const fetchContacts = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'ALL' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      })

      const response = await fetch(`/api/admin/contacts?${params}`, {
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
        throw new Error('Erreur lors de la récupération des contacts')
      }

      const data = await response.json()
      setContacts(data.contacts)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, statusFilter, searchTerm, router])

  // useEffect pour charger les contacts
  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const updateContactStatus = async (contactId: string, status: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const sendReply = async () => {
    if (!selectedContact || !replyContent.trim()) return

    setSendingReply(true)
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/contacts/${selectedContact.id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: replyContent })
      })

      if (response.ok) {
        setReplyContent('')
        setSelectedContact(null)
        fetchContacts()
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réponse:', error)
    } finally {
      setSendingReply(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    router.push('/admin/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500'
      case 'IN_PROGRESS': return 'bg-blue-500'
      case 'RESOLVED': return 'bg-green-500'
      case 'CLOSED': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'En attente'
      case 'IN_PROGRESS': return 'En cours'
      case 'RESOLVED': return 'Résolu'
      case 'CLOSED': return 'Fermé'
      default: return status
    }
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
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Panel Admin - Oxelya
            </h1>
            <p className="text-gray-400 text-sm">
              Connecté en tant que {adminData?.username}
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
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
                <option value="PENDING">En attente</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="RESOLVED">Résolu</option>
                <option value="CLOSED">Fermé</option>
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
                placeholder="Rechercher..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchContacts}
                className="w-full bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors"
              >
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Liste des contacts */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Sujet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Statut
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
                {contacts.map((contact) => (
                  <motion.tr
                    key={contact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-white">{contact.name}</div>
                        <div className="text-sm text-gray-400">{contact.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white max-w-xs truncate">
                        {contact.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                        {getStatusText(contact.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Voir/Répondre
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded ${
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

      {/* Modal de détail du contact */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-white">Détail du contact</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Informations</h3>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p><strong>Nom :</strong> {selectedContact.name}</p>
                    <p><strong>Email :</strong> {selectedContact.email}</p>
                    <p><strong>Sujet :</strong> {selectedContact.subject}</p>
                    <p><strong>Date :</strong> {new Date(selectedContact.createdAt).toLocaleString('fr-FR')}</p>
                    <p><strong>Statut :</strong> {getStatusText(selectedContact.status)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Message</h3>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                {selectedContact.replies.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Réponses</h3>
                    <div className="space-y-3">
                      {selectedContact.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-cyan-400">{reply.admin.username}</span>
                            <span className="text-sm text-gray-400">
                              {new Date(reply.createdAt).toLocaleString('fr-FR')}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Actions</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <select
                        value={selectedContact.status}
                        onChange={(e) => updateContactStatus(selectedContact.id, e.target.value)}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
                      >
                        <option value="PENDING">En attente</option>
                        <option value="IN_PROGRESS">En cours</option>
                        <option value="RESOLVED">Résolu</option>
                        <option value="CLOSED">Fermé</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nouvelle réponse
                      </label>
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400"
                        placeholder="Tapez votre réponse..."
                      />
                      <button
                        onClick={sendReply}
                        disabled={sendingReply || !replyContent.trim()}
                        className="mt-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded transition-colors"
                      >
                        {sendingReply ? 'Envoi...' : 'Envoyer la réponse'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 