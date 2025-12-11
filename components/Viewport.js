import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { Suspense } from 'react'

function Box({ position=[0,1,0] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={'#8b5cf6'} />
    </mesh>
  )
}
function Sphere({ position=[0,1,0] }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={'#06b6d4'} />
    </mesh>
  )
}
function Plane() {
  return (
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.5,0]} receiveShadow>
      <planeGeometry args={[50,50]} />
      <meshStandardMaterial color={'#111827'} />
    </mesh>
  )
}

export default function Viewport({ objects=[] }) {
  return (
    <Canvas shadows camera={{position:[5,3,5], fov:50}}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5,10,5]} castShadow intensity={1}/>
      <Suspense fallback={null}>
        <Plane />
        {objects.map((o,i)=>{
          if(o.type === 'box') return <Box key={o.id} position={[i*1.5,0.5,0]} />
          if(o.type === 'sphere') return <Sphere key={o.id} position={[i*1.5,0.7,0]} />
          if(o.type === 'plane') return <Plane key={o.id+''} />
          return null
        })}
      </Suspense>
      <OrbitControls />
      <Stats />
    </Canvas>
  )
}
