'use client'

import { useEffect, useState } from 'react'

export function useProgressiveEnhancement(delay: number = 100) {
  const [isEnhanced, setIsEnhanced] = useState(false)

  useEffect(() => {
    // Petite attente pour que le contenu HTML soit bien visible d'abord
    const timer = setTimeout(() => {
      setIsEnhanced(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isEnhanced
} 