'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface ProcessAnimationProps {
  steps: ProcessStep[];
}

export default function ProcessAnimation({ steps }: ProcessAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{x: number, y: number}>>([]);
  const [currentVisibleSteps, setCurrentVisibleSteps] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const isInView = useInView(containerRef, { 
    once: false, 
    margin: "-20%",
    amount: 0.3
  });

  // Générer les particules côté client uniquement pour éviter l'erreur d'hydratation
  useEffect(() => {
    setIsClient(true);
    setParticles(Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    })));
  }, []);

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Utiliser useTransform pour avoir une valeur réactive du nombre de steps visibles
  const visibleStepsCount = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.10) return 0;  // Aucune carte avant 10%
    if (progress < 0.25) return 1;  // 1ère carte à 10%
    if (progress < 0.40) return 2;  // 2ème carte à 25%
    if (progress < 0.65) return 3;  // 3ème carte à 40%
    return 4;                       // 4ème carte à 65%
  });

  // Mettre à jour l'état local quand visibleStepsCount change
  useEffect(() => {
    const unsubscribe = visibleStepsCount.on('change', (latest) => {
      setCurrentVisibleSteps(latest);
    });
    return unsubscribe;
  }, [visibleStepsCount]);

  if (!isClient) {
    return (
      <div ref={containerRef} className="relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Timeline centrale animée */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-cyan-500/30 transform -translate-x-1/2 hidden lg:block">
        <motion.div
          style={{ height: progressHeight }}
          className="w-full bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 shadow-lg shadow-blue-500/50"
        />
      </div>

      {/* Particules flottantes en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={isInView ? {
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              opacity: [0, 0.8, 0]
            } : {}}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="space-y-16 md:space-y-32 py-10 md:py-20">
        {steps.map((step, index) => {
          const isVisible = index < currentVisibleSteps;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={
                isVisible ? 
                  { opacity: 1, scale: 1, y: 0 } : 
                  { opacity: 0, scale: 0.8, y: 100 }
              }
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100,
                damping: 15,
                delay: isVisible ? index * 0.2 : 0
              }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex-col lg:gap-16 gap-8`}
            >
              {/* Numéro de l'étape avec animation */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={
                    isVisible ? 
                      { scale: 1, rotate: 0 } : 
                      { scale: 0, rotate: -180 }
                  }
                  transition={{ 
                    duration: 0.6, 
                    delay: isVisible ? 0.2 + index * 0.1 : 0,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="relative"
                >
                  {/* Cercle extérieur pulsant */}
                  <motion.div
                    animate={isVisible ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.1, 0.4]
                    } : {}}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: isVisible ? 0.5 + index * 0.2 : 0
                    }}
                    className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />

                  {/* Cercle principal */}
                  <div className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/60 border-2 border-white/20">
                    <span className="text-lg md:text-3xl font-bold text-white">{step.number}</span>
                  </div>

                  {/* Points de connexion pour desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={currentVisibleSteps > index + 1 ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className={`hidden lg:block absolute top-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left ${
                        index % 2 === 0 ? 'left-full' : 'right-full scale-x-[-1]'
                      }`}
                    />
                  )}
                </motion.div>
              </div>

              {/* Contenu de l'étape */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={
                  isVisible ? 
                    { opacity: 1, x: 0 } : 
                    { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
                }
                transition={{ duration: 0.8, delay: isVisible ? 0.4 + index * 0.1 : 0 }}
                className="flex-1 max-w-lg w-full"
              >
                <div className={`p-6 md:p-8 rounded-xl bg-gradient-to-br ${
                  index % 4 === 0 ? 'from-blue-500/15 to-cyan-500/15 border-blue-500/30' :
                  index % 4 === 1 ? 'from-purple-500/15 to-pink-500/15 border-purple-500/30' :
                  index % 4 === 2 ? 'from-green-500/15 to-emerald-500/15 border-green-500/30' :
                  'from-orange-500/15 to-red-500/15 border-orange-500/30'
                } backdrop-blur-lg border-2 hover:scale-[1.02] transition-all duration-500 group shadow-xl relative overflow-hidden`}>
                  
                  {/* Icône */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      isVisible ? 
                        { opacity: 1, scale: 1 } : 
                        { opacity: 0, scale: 0.5 }
                    }
                    transition={{ duration: 0.6, delay: isVisible ? 0.5 + index * 0.1 : 0 }}
                    className="text-4xl md:text-6xl mb-4"
                  >
                    {step.icon}
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isVisible ? 
                        { opacity: 1, y: 0 } : 
                        { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: isVisible ? 0.6 + index * 0.1 : 0 }}
                    className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors"
                  >
                    {step.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isVisible ? 
                        { opacity: 1, y: 0 } : 
                        { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: isVisible ? 0.8 + index * 0.1 : 0 }}
                    className="text-gray-200 mb-6 leading-relaxed text-sm md:text-lg"
                  >
                    {step.description}
                  </motion.p>

                  {/* Effet de brillance au hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileHover={{ opacity: [0, 0.3, 0], x: 100 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none rounded-xl"
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Effet de brillance globale */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent pointer-events-none"
      />


    </div>
  );
} 