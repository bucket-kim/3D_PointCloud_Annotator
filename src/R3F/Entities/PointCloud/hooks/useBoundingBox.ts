import { useEffect } from 'react';

export const useBoundingBox = (
  points: { x: number; y: number; z: number }[],
  selectedIndices: Set<number>,
  setBoundingBox: (box: { center: { x: number; y: number; z: number }; size: { x: number; y: number; z: number } } | null) => void,
) => {
  useEffect(() => {
    if (selectedIndices.size === 0) {
      setBoundingBox(null);
      return;
    }

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    selectedIndices.forEach((i) => {
      const { x, y, z } = points[i];
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
    });

    setBoundingBox({
      center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2, z: (minZ + maxZ) / 2 },
      size:   { x: maxX - minX,       y: maxY - minY,       z: maxZ - minZ },
    });
  }, [selectedIndices, points]);
};
