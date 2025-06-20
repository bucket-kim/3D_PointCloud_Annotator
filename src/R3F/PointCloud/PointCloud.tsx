import { Fragment, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../State/useGlobalState';

const PointCloud = () => {
  const { points } = useGlobalState((state) => {
    return {
      points: state.points,
    };
  }, shallow);

  const pointGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  useEffect(() => {
    console.log(points);
  }, [points]);

  return (
    <Fragment>
      <mesh rotation={[Math.PI / -2, 0, 0]} scale={2}>
        <points geometry={pointGeometry}>
          <pointsMaterial color="red" size={0.025} />
        </points>
      </mesh>
    </Fragment>
  );
};

export default PointCloud;
