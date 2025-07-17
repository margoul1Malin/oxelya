'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/login')
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirection...</div>
    </div>
  )
} 