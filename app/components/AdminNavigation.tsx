'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

interface AdminNavigationProps {
  adminData: {
    username: string
  } | null
  onLogout: () => void
}

export default function AdminNavigation({ adminData, onLogout }: AdminNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: '📊',
      description: 'Vue d\'ensemble'
    },
    {
      name: 'Contacts',
      href: '/admin/contacts',
      icon: '📧',
      description: 'Gestion des messages'
    },
    {
      name: 'Articles',
      href: '/admin/articles',
      icon: '📝',
      description: 'Gestion du blog'
    },
    {
      name: 'Nouvel Article',
      href: '/admin/articles/create',
      icon: '✏️',
      description: 'Créer un article'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header principal */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Panel Admin - Oxelya
            </h1>
            <p className="text-gray-400 text-sm">
              Connecté en tant que {adminData?.username}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-gray-800 p-2 rounded-lg"
            >
              <span className="text-white">☰</span>
            </button>
            
            {/* Bouton déconnexion */}
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-white"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden md:block mt-4">
          <div className="flex space-x-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
          </div>
        </nav>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href)
                      setIsMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-cyan-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 