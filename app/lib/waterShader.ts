import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// Shader material pour l'effet de vague
export const WaterMaterial = shaderMaterial(
  {
    time: 0,
    mousePosition: new THREE.Vector2(0, 0),
    hovered: 0,
    color: new THREE.Color(0x00d4ff),
    opacity: 0.8,
  },
  // Vertex shader
  `
    uniform float time;
    uniform vec2 mousePosition;
    uniform float hovered;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vWave;
    
    void main() {
      vPosition = position;
      vNormal = normal;
      vUv = uv;
      
      // Calculer la distance depuis le point de contact de la souris
      vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      float distanceFromMouse = length(worldPosition - vec3(mousePosition.x * 2.0, mousePosition.y * 2.0, 0.0));
      
      // Créer une onde qui se propage depuis le point de contact
      float wave = 0.0;
      if (hovered > 0.5) {
        wave = sin(distanceFromMouse * 10.0 - time * 5.0) * exp(-distanceFromMouse * 2.0) * 0.3;
        wave += sin(distanceFromMouse * 20.0 - time * 8.0) * exp(-distanceFromMouse * 3.0) * 0.1;
      }
      
      // Ajouter une distorsion générale
      wave += sin(time * 2.0 + position.x * 3.0) * sin(time * 1.5 + position.y * 3.0) * 0.1;
      
      vWave = wave;
      
      // Appliquer la distorsion
      vec3 distortedPosition = position + normal * wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform vec3 color;
    uniform float opacity;
    uniform float time;
    uniform float hovered;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vWave;
    
    void main() {
      // Calculer la fresnel pour l'effet de bordure
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - abs(dot(vNormal, viewDirection)), 3.0);
      
      // Effet de profondeur
      float depth = length(vPosition);
      float depthFactor = 1.0 - smoothstep(0.0, 2.0, depth);
      
      // Couleur de base avec variation
      vec3 baseColor = color;
      baseColor += sin(time * 2.0 + vUv.x * 10.0) * 0.1;
      
      // Effet de vague
      float waveIntensity = abs(vWave) * 2.0;
      vec3 waveColor = mix(baseColor, vec3(1.0, 1.0, 1.0), waveIntensity * 0.3);
      
      // Combiner tous les effets
      vec3 finalColor = mix(baseColor, waveColor, hovered);
      finalColor += fresnel * 0.5;
      
      // Transparence
      float alpha = opacity;
      alpha += fresnel * 0.3;
      alpha += waveIntensity * 0.2;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
)

extend({ WaterMaterial })

// Hook pour utiliser le shader
export const useWaterShader = () => {
  return new (WaterMaterial as typeof THREE.ShaderMaterial)()
} 