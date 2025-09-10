import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function EcoParticles() {
  const ref = useRef<THREE.Points>(null!)
  
  // Generate random positions for leaves/particles
  const particleCount = 300
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
      
      // Gentle floating animation
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.001
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22c55e"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

export default function EcoBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <EcoParticles />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-light opacity-50" />
    </div>
  )
}