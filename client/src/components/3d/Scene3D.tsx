import { Suspense, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import FloatingHair from './FloatingHair';

interface Scene3DProps {
  className?: string;
  enableControls?: boolean;
}

// Simple Error Boundary for 3D Scene
class Scene3DErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('3D Scene Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback component for 3D errors
const Scene3DFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-gold/10 to-transparent">
    <div className="text-luxury-gold/50 text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-2 border-luxury-gold/30 rounded-full animate-pulse" />
      <p className="text-sm">Loading 3D Scene...</p>
    </div>
  </div>
);

const Scene3D = ({ className = "", enableControls = false }: Scene3DProps) => {
  return (
    <div className={`${className}`}>
      <Scene3DErrorBoundary fallback={<Scene3DFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            
            {/* Environment */}
            <Environment preset="studio" />
            
            {/* 3D Content */}
            <FloatingHair />
            
            {/* Controls */}
            {enableControls && (
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            )}
          </Suspense>
        </Canvas>
      </Scene3DErrorBoundary>
    </div>
  );
};

export default Scene3D;