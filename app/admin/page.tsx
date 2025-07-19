'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'admin est connecté
    const token = localStorage.getItem('adminToken')
    const adminData = localStorage.getItem('adminData')

    if (token && adminData) {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirection...</div>
    </div>
  )
} 