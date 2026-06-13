import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CELL_SIZE = 0.1;
const MAX_DISTANCE = 50;
const THRESHOLD = 0.05;

export const useSpatialGrid = (
  points: { x: number; y: number; z: number }[],
) => {
  const grid = useRef(new Map<string, number[]>());
  const raycaster = useThree((state) => state.raycaster);
  const camera = useThree((state) => state.camera);
  const pointer = useThree((state) => state.pointer);

  const cellKey = (x: number, y: number, z: number) =>
    `${Math.floor(x / CELL_SIZE)},${Math.floor(y / CELL_SIZE)},${Math.floor(z / CELL_SIZE)}`;

  useEffect(() => {
    grid.current.clear();
    points.forEach((point, index) => {
      const key = cellKey(point.x, point.y, point.z);

      const cell = grid.current.get(key);
      if (cell) {
        cell.push(index);
      } else {
        grid.current.set(key, [index]);
      }
    });
  }, [points]);

  const getPointAtCursor = () => {
    raycaster.setFromCamera(pointer, camera);
    const samplePos = new THREE.Vector3();
    const candidates = new Set<number>();
    const origin = raycaster.ray.origin;
    const direction = raycaster.ray.direction;

    for (let t = 0; t < MAX_DISTANCE; t += CELL_SIZE) {
      samplePos.copy(direction).multiplyScalar(t).add(origin);
      const key = cellKey(samplePos.x, samplePos.y, samplePos.z);
      const cell = grid.current.get(key);
      if (cell) {
        cell.forEach((index) => candidates.add(index));
      }
    }

    let closestIndex: number | null = null;
    let closestDistance = Infinity;

    candidates.forEach((index) => {
      const p = points[index];
      const distance = raycaster.ray.distanceToPoint(
        new THREE.Vector3(p.x, p.y, p.z),
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestDistance > THRESHOLD) return null;

    return closestIndex;
  };
  return { getPointAtCursor };
};
