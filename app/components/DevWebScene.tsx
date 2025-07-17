'use client'

import React, { useRef, useEffect, useMemo, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {  useTexture, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

// Composant de loader
function SceneLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-white/80 text-lg">Chargement de l&apos;expérience 3D...</p>
      </div>
    </div>
  )
}

// Shader material personnalisé pour les particules bleues
const CodeParticlesMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.1, 0.8, 1.0),
    size: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float size;
    attribute float alpha;
    attribute vec3 offset;
    
    varying float vAlpha;
    varying vec3 vColor;
    
    void main() {
      vAlpha = alpha;
      
      vec3 pos = position + offset;
      pos.y += sin(time * 2.0 + pos.x * 0.1) * 0.5;
      pos.z += cos(time * 1.5 + pos.z * 0.1) * 0.3;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      
      vColor = vec3(0.1 + sin(time + pos.x) * 0.3, 0.8, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    varying float vAlpha;
    varying vec3 vColor;
    
    void main() {
      float distance = length(gl_PointCoord - vec2(0.5));
      if (distance > 0.5) discard;
      
      float strength = 1.0 - distance * 2.0;
      gl_FragColor = vec4(vColor, vAlpha * strength);
    }
  `
)

extend({ CodeParticlesMaterial })

// Particules de code avec performance optimisée
function CodeParticles() {
  const mesh = useRef<THREE.Points>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  
  const [positions, colors, alphas, offsets] = useMemo(() => {
    const count = Math.min(typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 1500, 2000) // Réduire sur mobile
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const alphas = new Float32Array(count)
    const offsets = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80
      
      colors[i * 3] = 0.1 + Math.random() * 0.5
      colors[i * 3 + 1] = 0.8
      colors[i * 3 + 2] = 1.0
      
      alphas[i] = Math.random() * 0.8 + 0.2
      
      offsets[i * 3] = (Math.random() - 0.5) * 2
      offsets[i * 3 + 1] = (Math.random() - 0.5) * 2
      offsets[i * 3 + 2] = (Math.random() - 0.5) * 2
    }
    
    return [positions, colors, alphas, offsets]
  }, [])

  useFrame((state) => {
    if (materialRef.current && 'time' in materialRef.current) {
      (materialRef.current as THREE.ShaderMaterial & { time: number }).time = state.clock.elapsedTime * 0.5 // Ralentir l'animation
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-alpha" args={[alphas, 1]} />
        <bufferAttribute attach="attributes-offset" args={[offsets, 3]} />
      </bufferGeometry>
              <primitive 
          object={new (CodeParticlesMaterial as typeof THREE.ShaderMaterial)()}
          ref={materialRef}
        transparent 
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        size={typeof window !== 'undefined' && window.innerWidth < 768 ? 2.0 : 4.0} // Plus petit sur mobile
      />
    </points>
  )
}

// Images en orbite optimisées
function OrbitalImages() {
  const groupRef = useRef<THREE.Group>(null!)
  
  // Charger les textures de façon optimisée
  const imageFiles = [
    'Oxelya.png', 'Margoul1Dev.png', 'BoucherieAlienor.png', 'Margoul1Xyz.png',
    'Climgo.png', 'Drhead.png', 'LDA.png', 'gOsint.png', 'Margoul1Doc.png', 'OxelyaShop.webp'
  ]
  
  const textures = useTexture(
    imageFiles.map(file => `/sites/${file}`),
    (textures) => {
      // Optimiser les textures une fois chargées
      textures.forEach(texture => {
        texture.generateMipmaps = false
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
      })
    }
  )

  const imagePositions = useMemo(() => {
    const positions = []
    const radii = [12, 18, 24, 30]
    
    for (let i = 0; i < imageFiles.length; i++) {
      const radius = radii[i % radii.length]
      const angle = (i / imageFiles.length) * Math.PI * 2
      const height = Math.sin(i * 0.7) * 4
      
      positions.push({
        x: Math.cos(angle) * radius,
        y: height,
        z: Math.sin(angle) * radius,
        texture: textures[i],
        rotationSpeed: 0.002 + Math.random() * 0.003
      })
    }
    
    return positions
  }, [textures, imageFiles.length])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {imagePositions.map((pos, index) => (
        <mesh key={index} position={[pos.x, pos.y, pos.z]}>
          <planeGeometry args={[5, 3.5]} />
          <meshBasicMaterial 
            map={pos.texture} 
            transparent 
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// Particules dorées optimisées
function GoldenParticles() {
  const mesh = useRef<THREE.Points>(null!)
  
  const [positions, colors] = useMemo(() => {
    const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 600 // Réduire sur mobile
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
      colors[i * 3 + 2] = 0.0
    }
    
    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial 
        size={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.5 : 1.0} 
        vertexColors 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Grille de connexions optimisée
function ConnectionGrid() {
  const linesRef = useRef<THREE.LineSegments>(null!)
  
  const geometry = useMemo(() => {
    const points = []
    const colors = []
    const gridSize = typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 12 // Plus petit sur mobile
    const spacing = 6
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * spacing
        const z = (j - gridSize / 2) * spacing
        const y = Math.sin(i * 0.5) * Math.cos(j * 0.5) * 2
        
        points.push(x, y, z)
        
        if (i < gridSize - 1) {
          const nextX = ((i + 1) - gridSize / 2) * spacing
          const nextY = Math.sin((i + 1) * 0.5) * Math.cos(j * 0.5) * 2
          points.push(nextX, nextY, z)
        }
        
        colors.push(0.2, 0.6, 1.0, 0.2, 0.6, 1.0)
      }
    }
    
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    
    return geometry
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.3} />
    </lineSegments>
  )
}

// Composant principal de la scène optimisé
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4FC3F7" />
      
      <CodeParticles />
      <OrbitalImages />
      <GoldenParticles />
      <ConnectionGrid />
    </>
  )
}

export default function DevWebScene() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Détecter si on est sur mobile
    setIsMobile(window.innerWidth < 768)
    
    // Simuler un délai de chargement puis marquer comme chargé
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <SceneLoader />
        </div>
      )}
      
      <Canvas
        camera={{ 
          position: [0, 0, 20], 
          fov: isMobile ? 80 : 75 // FOV plus large sur mobile
        }}
        gl={{ 
          antialias: !isMobile, // Désactiver l'antialiasing sur mobile
          powerPreference: "high-performance",
          alpha: true
        }}
        dpr={isMobile ? 1 : (typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1)} // Limiter DPR sur mobile
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
} 