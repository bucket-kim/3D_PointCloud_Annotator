import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export const usePointGeometry = (
  points: { x: number; y: number; z: number }[],
  selectedIndices: Set<number>,
) => {
  const pointRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));
    const selected = new Float32Array(points.length);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('selected', new THREE.BufferAttribute(selected, 1));
    return geo;
  }, [points]);

  useEffect(() => {
    if (!pointRef.current) return;
    const selectedArray = pointRef.current.geometry.attributes.selected;
    (selectedArray.array as Float32Array).fill(0);
    selectedIndices.forEach((i) => {
      (selectedArray.array as Float32Array)[i] = 1.0;
    });
    selectedArray.needsUpdate = true;
  }, [selectedIndices]);

  return { pointRef, geometry };
};
