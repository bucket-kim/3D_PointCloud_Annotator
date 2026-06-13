import { FC } from 'react';

interface BoundingBoxProps {
  center: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
}

const BoundingBox: FC<BoundingBoxProps> = ({ center, size }) => (
  <mesh
    position={[center.x, center.y, center.z]}

  >
    <boxGeometry args={[size.x, size.y, size.z]} />
    <meshBasicMaterial wireframe color="#000000" />
  </mesh>
);

export default BoundingBox;
