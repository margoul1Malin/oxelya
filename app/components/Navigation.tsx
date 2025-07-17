'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import PortfolioTooltip from './PortfolioTooltip'

interface NavigationProps {
  currentPage?: 'home' | 'services' | 'contact' | 'mentions-legales' | 'politique-confidentialite'
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 md:p-8 relative z-50">
      <div className="flex justify-between items-center">
        <Link 
          href="/"
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform group font-winky"
        >
          Oxelya
          <div className="h-1 rounded-full w-0 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
        </Link>
        
        {/* Menu desktop/tablette */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-white/80">
          <Link 
            href="/services" 
            className={`hover:text-cyan-400 transition-colors cursor-pointer relative group ${
              currentPage === 'services' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          
          <PortfolioTooltip />
          
          <Link 
            href="/contact" 
            className={`hover:text-cyan-400 transition-colors cursor-pointer relative group ${
              currentPage === 'contact' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        {/* Bouton menu hamburger (mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white/80 hover:text-cyan-400 transition-colors focus:outline-none"
          aria-label="Menu de navigation"
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="flex flex-col justify-center items-center w-6 h-6 space-y-1"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 }
              }}
              className="w-6 h-0.5 bg-current block transform transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              className="w-6 h-0.5 bg-current block transition-all duration-300"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 }
              }}
              className="w-6 h-0.5 bg-current block transform transition-all duration-300"
            />
          </motion.div>
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              <Link 
                href="/services" 
                className={`hover:text-cyan-400 transition-colors cursor-pointer relative group text-lg ${
                  currentPage === 'services' ? 'text-cyan-400 font-semibold' : 'text-white/80'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
              
              {/* Version mobile simplifiée des plateformes */}
              <div className="space-y-3">
                <h3 className="text-white/80 text-lg font-semibold">Plateformes</h3>
                <div className="pl-4 space-y-2">
                  <a 
                    href="https://margoul1.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-white/60 hover:text-cyan-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    💻 margoul1.dev
                  </a>
                  <a 
                    href="https://margoul1.xyz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-white/60 hover:text-cyan-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🚀 margoul1.xyz
                  </a>
                  <a 
                    href="https://drhead.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-white/60 hover:text-cyan-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🛡️ DrHead
                  </a>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                className={`hover:text-cyan-400 transition-colors cursor-pointer relative group text-lg ${
                  currentPage === 'contact' ? 'text-cyan-400 font-semibold' : 'text-white/80'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 