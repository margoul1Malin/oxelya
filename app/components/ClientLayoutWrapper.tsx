'use client'

import { usePathname } from 'next/navigation'
import ProgressiveFooter from './ProgressiveFooter'

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Ne pas afficher le Footer sur la page principale
  const showFooter = pathname !== '/'

  return (
    <>
      {children}
      {showFooter && <ProgressiveFooter />}
    </>
  )
} 