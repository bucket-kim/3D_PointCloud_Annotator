import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import PointCloud from './PointCloud/PointCloud';
import R3FStyleContainer from './R3FStyleContainer';

const R3F = () => {
  const cameraPos = useRef<THREE.Vector3>(new THREE.Vector3(3, 4, 5));

  return (
    <R3FStyleContainer>
      <Canvas camera={{ position: cameraPos.current }} raycaster={{
        params: {
          Points: { threshold: 0.05 },
          Mesh: undefined,
          Line: {
            threshold: 0
          },
          LOD: undefined,
          Sprite: undefined
        }
      }}>
        <OrbitControls />
        <PointCloud />
      </Canvas>
    </R3FStyleContainer>
  );
};

export default R3F;
