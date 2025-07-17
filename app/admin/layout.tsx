'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Vérifier l'authentification seulement si on n'est pas sur la page de login
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      setIsLoading(false)
      return
    }

    const token = localStorage.getItem('adminToken')
    const adminData = localStorage.getItem('adminData')

    if (!token || !adminData) {
      router.push('/admin/login')
      return
    }

    try {
      JSON.parse(adminData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Erreur:', error)
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminData')
      router.push('/admin/login')
      return
    }

    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null
  }

  return <>{children}</>
} 