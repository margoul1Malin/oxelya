'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshDistortMaterial, Sphere, Box, Float, Stars, Html, useProgress, Preload } from '@react-three/drei'
import { useRef, useMemo, useState, Suspense, useCallback } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

// Composant de chargement 3D optimisé
function Loader() {
  const { progress } = useProgress()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  return (
    <Html center>
      <div className="text-white text-center">
        <div className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent`}>
            <Image src="/Logo3.png" alt="Oxelya" width={isMobile ? 24 : 32} height={isMobile ? 24 : 32} />
            Oxelya
        </div>
        <div className={`${isMobile ? 'w-48' : 'w-64'} h-2 bg-gray-800 rounded-full overflow-hidden`}>
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-400 mt-2">{Math.round(progress)}%</div>
      </div>
    </Html>
  )
}

// Particules de données flottantes optimisées
function DataParticles() {
  // Réduire drastiquement sur mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const count = isMobile ? 30 : 500 // Seulement 30 particules sur mobile
  const mesh = useRef<THREE.InstancedMesh>(null!)
  
  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Position aléatoire dans une sphère
      const radius = Math.random() * (isMobile ? 12 : 25) + (isMobile ? 3 : 10)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Couleurs dégradées
      const hue = (i / count) * 360
      const color = new THREE.Color(`hsl(${hue}, 70%, 60%)`)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [count, isMobile])
  
  // Animation optimisée avec useCallback et throttling
  const animateParticles = useCallback((time: number) => {
    if (!mesh.current) return
    
    // Throttling plus agressif sur mobile
    const throttleRate = isMobile ? 0.05 : 0.016 // ~20fps sur mobile, ~60fps sur desktop
    if (time % throttleRate > throttleRate / 2) return
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]
      
      // Animation simplifiée pour de meilleures performances
      const matrix = new THREE.Matrix4()
      const scale = Math.sin(time * 0.3 + i * 0.01) * 0.3 + 1
      
      matrix.makeTranslation(
        x + Math.sin(time * 0.2 + i * 0.01) * 1.5,
        y + Math.cos(time * 0.15 + i * 0.02) * 1.5,
        z + Math.sin(time * 0.25 + i * 0.015) * 1.5
      )
      matrix.scale(new THREE.Vector3(scale, scale, scale))
      
      mesh.current.setMatrixAt(i, matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }, [positions, count, isMobile])
  
  useFrame((state) => {
    animateParticles(state.clock.getElapsedTime())
  })
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 4, 4]} /> {/* Réduit les segments */}
      <meshBasicMaterial vertexColors />
    </instancedMesh>
  )
}

// Hologramme central d'Oxelya avec effet de vague optimisé
function CentralHologram() {
  const group = useRef<THREE.Group>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [distortIntensity, setDistortIntensity] = useState(0.3)
  const [speedIntensity, setSpeedIntensity] = useState(0.5)
  
  // Animation optimisée
  const animateHologram = useCallback((time: number) => {
    if (!group.current) return
    
    group.current.rotation.y = time * 0.15 // Réduit la vitesse
    group.current.position.y = Math.sin(time * 0.3) * 0.3 // Réduit l'amplitude
    
    // Transition progressive de l'intensité
    if (hovered) {
      setDistortIntensity(prev => Math.min(prev + 0.01, 0.6))
      setSpeedIntensity(prev => Math.min(prev + 0.02, 1.5))
    } else {
      setDistortIntensity(prev => Math.max(prev - 0.005, 0.3))
      setSpeedIntensity(prev => Math.max(prev - 0.01, 0.5))
    }
  }, [hovered])
  
  useFrame((state) => {
    animateHologram(state.clock.getElapsedTime())
  })
  
  // const handlePointerMove = useCallback((event: any) => {
  //if (hovered && sphereRef.current) {
    // Utiliser les coordonnées normalisées de Three.js
    // const x = event.point.x / 2
    // const y = event.point.y / 2
    // const z = event.point.z / 2
  // }
  // }, [hovered])

  return (
    <group ref={group}>
      {/* Sphère centrale avec effet de vague progressif */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Sphere 
          ref={sphereRef}
          args={[2, 64, 64]} // Réduit les segments de 128 à 64
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          //onPointerMove={handlePointerMove}
        >
          <MeshDistortMaterial
            color="#00d4ff"
            transparent
            opacity={0.9}
            distort={distortIntensity}
            speed={speedIntensity}
            roughness={0.1}
            metalness={0.9}
            emissive="#00d4ff"
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </Sphere>
      </Float>
      
      {/* Anneaux orbitaux optimisés */}
      {[...Array(2)].map((_, i) => ( // Réduit de 3 à 2 anneaux
        <Float key={i} speed={0.8 + i * 0.2} rotationIntensity={hovered ? 0.6 : 0.2}>
          <mesh rotation={[Math.PI / 2 + i * 0.3, 0, i * Math.PI / 3]} position={[0, 0, 0]}>
            <torusGeometry args={[3 + i * 0.5, 0.05, 6, 64]} /> {/* Réduit les segments */}
            <meshStandardMaterial 
              color={`hsl(${180 + i * 60}, 80%, ${hovered ? 80 : 60}%)`} 
              emissive={`hsl(${180 + i * 60}, 80%, ${hovered ? 50 : 30}%)`}
              emissiveIntensity={hovered ? 1.2 : 0.8}
              transparent
              opacity={hovered ? 0.8 : 0.6}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Particules d'eau optimisées */}
      {hovered && (
        <group>
          {[...Array(4)].map((_, i) => ( // Réduit de 8 à 4 particules
            <Float key={`particle-${i}`} speed={1.2 + Math.random() * 0.8} rotationIntensity={0.6}>
              <mesh position={[
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
              ]}>
                <sphereGeometry args={[0.02, 4, 4]} /> {/* Réduit les segments */}
                <meshStandardMaterial
                  color="#00d4ff"
                  transparent
                  opacity={0.6}
                  emissive="#00d4ff"
                  emissiveIntensity={0.8}
                />
              </mesh>
            </Float>
          ))}
        </group>
      )}
    </group>
  )
}

// Cubes de code flottants optimisés
function FloatingCodeCubes() {
  const groupRef = useRef<THREE.Group>(null!)
  
  const cubePositions = useMemo(() => {
    return [...Array(12)].map(() => ({ // Réduit de 20 à 12 cubes
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 30,
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.01
    }))
  }, [])
  
  // Animation optimisée
  const animateCubes = useCallback((time: number) => {
    if (!groupRef.current) return
    
    groupRef.current.children.forEach((cube, i) => {
      const pos = cubePositions[i]
      
      cube.rotation.x = time * pos.speed * 0.5 // Réduit la vitesse
      cube.rotation.y = time * pos.speed * 0.8
      cube.position.y += Math.sin(time * 0.5 + i) * 0.005 // Réduit l'amplitude
    })
  }, [cubePositions])
  
  useFrame((state) => {
    animateCubes(state.clock.getElapsedTime())
  })
  
  return (
    <group ref={groupRef}>
      {cubePositions.map((pos, i) => (
        <Float key={i} speed={0.8 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.2}>
          <Box 
            position={[pos.x, pos.y, pos.z]} 
            scale={pos.scale}
            args={[1, 1, 1]}
          >
            <meshStandardMaterial 
              color={`hsl(${(i * 137.5) % 360}, 70%, 50%)`}
              transparent
              opacity={0.7}
              wireframe={i % 3 === 0}
              emissive={`hsl(${(i * 137.5) % 360}, 70%, 20%)`}
            />
          </Box>
        </Float>
      ))}
    </group>
  )
}

// Composant principal de la scène optimisé
function Scene() {
  return (
    <>
      {/* Éclairage optimisé */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ff0080" />
      <spotLight 
        position={[0, 20, 0]} 
        angle={Math.PI / 6} 
        penumbra={0.5} 
        intensity={1.2} 
        color="#ff6b35"
        castShadow
      />
      
      {/* Étoiles d'arrière-plan optimisées */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
      
      {/* Particules de données */}
      <DataParticles />
      
      {/* Hologramme central */}
      <CentralHologram />
      
      {/* Cubes de code flottants */}
      <FloatingCodeCubes />
      
      {/* Environnement HDR */}
      <Environment preset="city" background={false} />
      
      {/* Fog pour la profondeur */}
      <fog attach="fog" args={['#0a0a0a', 20, 100]} />
    </>
  )
}

// Composant principal exporté optimisé
export default function ThreeScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 5, isMobile ? 25 : 20], fov: isMobile ? 40 : 60 }}
        gl={{ 
          antialias: !isMobile, // Désactiver l'antialiasing sur mobile
          alpha: true,
          powerPreference: "high-performance",
          stencil: false, // Désactive le stencil pour les performances
          depth: true
        }}
        dpr={isMobile ? [1, 1] : [1, 2]} // Pas de DPR élevé sur mobile
        performance={{ min: isMobile ? 0.2 : 0.5 }} // Qualité très basse sur mobile
        style={{ 
          background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 70%)'
        }}
        shadows={!isMobile} // Pas d'ombres sur mobile
        frameloop={isMobile ? "demand" : "demand"} // Optimisation du frameloop
      >
        <Suspense fallback={<Loader />}>
          <Scene />
          <Preload all />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={!isMobile}
          enableRotate={!isMobile}
          autoRotate={!isMobile}
          autoRotateSpeed={0.3} // Réduit la vitesse
          maxDistance={isMobile ? 30 : 50}
          minDistance={isMobile ? 8 : 5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  )
} 