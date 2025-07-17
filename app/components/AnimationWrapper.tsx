'use client'

import { motion } from 'framer-motion'
import { useProgressiveEnhancement } from '../hooks/useProgressiveEnhancement'

interface AnimationWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale'
  duration?: number
  once?: boolean
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
  },
  slideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
  },
  slideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }
}

export default function AnimationWrapper({
  children,
  className = '',
  delay = 0,
  animation = 'fadeIn',
  duration = 0.6,
  once = true
}: AnimationWrapperProps) {
  const isEnhanced = useProgressiveEnhancement(50)

  // Sans JavaScript, retourne juste le contenu HTML
  if (!isEnhanced) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  // Avec JavaScript, ajoute les animations
  const animationConfig = animations[animation]
  
  return (
    <motion.div
      className={className}
      initial={animationConfig.initial}
      animate={animationConfig.animate}
      exit={animationConfig.exit}
      transition={{ duration, delay }}
      viewport={{ once }}
      whileInView={once ? animationConfig.animate : undefined}
    >
      {children}
    </motion.div>
  )
} 