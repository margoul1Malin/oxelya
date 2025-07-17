'use client'

import dynamic from 'next/dynamic'

// Import dynamique pour éviter les erreurs de SSR avec Three.js
const ThreeScene = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-white text-2xl">Chargement de l&apos;expérience Oxelya...</div>
    </div>
  )
})

export default function ClientThreeWrapper() {
  return <ThreeScene />
} 