'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshDistortMaterial, Sphere, Box, Float, Stars, Html, useProgress, Preload } from '@react-three/drei'
import { useRef, useMemo, useState, Suspense } from 'react'
import * as THREE from 'three'
import Image from 'next/image'

// Composant de chargement 3D
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            <Image src="/Logo3.png" alt="Oxelya" width={32} height={32} />
            Oxelya
        </div>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
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

// Particules de données flottantes
function DataParticles() {
  const count = 1000
  const mesh = useRef<THREE.InstancedMesh>(null!)
  
  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Position aléatoire dans une sphère
      const radius = Math.random() * 25 + 10
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
  }, [])
  
  useFrame((state) => {
    if (!mesh.current) return
    
    const time = state.clock.getElapsedTime()
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      const z = positions[i3 + 2]
      
      // Animation organique
      const matrix = new THREE.Matrix4()
      const scale = Math.sin(time + i * 0.01) * 0.5 + 1
      
      matrix.makeTranslation(
        x + Math.sin(time * 0.5 + i * 0.01) * 2,
        y + Math.cos(time * 0.3 + i * 0.02) * 2,
        z + Math.sin(time * 0.7 + i * 0.015) * 2
      )
      matrix.scale(new THREE.Vector3(scale, scale, scale))
      
      mesh.current.setMatrixAt(i, matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial vertexColors />
    </instancedMesh>
  )
}

// Hologramme central d'Oxelya avec effet de vague
function CentralHologram() {
  const group = useRef<THREE.Group>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [, setMousePosition] = useState({ x: 0, y: 0 })
  const [distortIntensity, setDistortIntensity] = useState(0.3)
  const [speedIntensity, setSpeedIntensity] = useState(0.5)
  const [, setWaveCenter] = useState({ x: 0, y: 0, z: 0 })
  
  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.getElapsedTime()
    
    group.current.rotation.y = time * 0.2
    group.current.position.y = Math.sin(time * 0.5) * 0.5
    
    // Transition progressive de l'intensité
    if (hovered) {
      setDistortIntensity(prev => Math.min(prev + 0.01, 0.6))
      setSpeedIntensity(prev => Math.min(prev + 0.02, 1.5))
    } else {
      setDistortIntensity(prev => Math.max(prev - 0.005, 0.3))
      setSpeedIntensity(prev => Math.max(prev - 0.01, 0.5))
    }
  })
  
  const handlePointerMove = (event: any) => {
    if (hovered && sphereRef.current) {
      // Utiliser les coordonnées normalisées de Three.js
      const x = event.point.x / 2 // Normaliser par rapport au rayon de la sphère
      const y = event.point.y / 2
      const z = event.point.z / 2
      
      setMousePosition({ x, y })
      setWaveCenter({ x, y, z })
    }
  }
  
  return (
    <group ref={group}>
      {/* Sphère centrale avec effet de vague progressif */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere 
          ref={sphereRef}
          args={[2, 128, 128]} // Plus de segments pour un effet plus lisse
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onPointerMove={handlePointerMove}
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
      
      {/* Anneaux orbitaux avec réaction au survol */}
      {[...Array(3)].map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={hovered ? 0.8 : 0.3}>
          <mesh rotation={[Math.PI / 2 + i * 0.3, 0, i * Math.PI / 3]} position={[0, 0, 0]}>
            <torusGeometry args={[3 + i * 0.5, 0.05, 8, 100]} />
            <meshStandardMaterial 
              color={`hsl(${180 + i * 60}, 80%, ${hovered ? 80 : 60}%)`} 
              emissive={`hsl(${180 + i * 60}, 80%, ${hovered ? 50 : 30}%)`}
              emissiveIntensity={hovered ? 1.5 : 1}
              transparent
              opacity={hovered ? 0.9 : 0.7}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Particules d'eau plus subtiles et moins nombreuses */}
      {hovered && (
        <group>
          {[...Array(8)].map((_, i) => (
            <Float key={`particle-${i}`} speed={1.5 + Math.random() * 1.5} rotationIntensity={0.8}>
              <mesh position={[
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
              ]}>
                <sphereGeometry args={[0.02, 6, 6]} />
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

// Cubes de code flottants
function FloatingCodeCubes() {
  const groupRef = useRef<THREE.Group>(null!)
  
  const cubePositions = useMemo(() => {
    return [...Array(20)].map(() => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 30,
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.02 + 0.01
    }))
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    groupRef.current.children.forEach((cube, i) => {
      const pos = cubePositions[i]
      const time = state.clock.getElapsedTime()
      
      cube.rotation.x = time * pos.speed
      cube.rotation.y = time * pos.speed * 1.5
      cube.position.y += Math.sin(time + i) * 0.01
    })
  })
  
  return (
    <group ref={groupRef}>
      {cubePositions.map((pos, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.3}>
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

// Composant principal de la scène
function Scene() {
  return (
    <>
      {/* Éclairage avancé */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff0080" />
      <spotLight 
        position={[0, 20, 0]} 
        angle={Math.PI / 6} 
        penumbra={0.5} 
        intensity={1.5} 
        color="#ff6b35"
        castShadow
      />
      
      {/* Étoiles d'arrière-plan */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
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

// Composant principal exporté
export default function ThreeScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ 
          background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 70%)'
        }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          <Scene />
          <Preload all />
        </Suspense>
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxDistance={50}
          minDistance={5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  )
} 