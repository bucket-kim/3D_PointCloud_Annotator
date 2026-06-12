import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../State/useGlobalState';
import fragmentShader from './PointMaterial/fragment.glsl?raw';
import vertexShader from './PointMaterial/vertex.glsl?raw';
import { ThreeEvent } from '@react-three/fiber';


const PointCloud = () => {
  const { points, toggleSelectedIndex, selectedIndices, boundingBox, setBoundingBox } = useGlobalState((state) => {
    return {
      points: state.points,
      toggleSelectedIndex: state.toggleSelectedIndex,
      selectedIndices: state.selectedIndices,
      boundingBox: state.boundingBox,
      setBoundingBox: state.setBoundingBox,
    };
  }, shallow);


  const pointRef = useRef<THREE.Points>(null);

  const pointGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]));
    const selected = new Float32Array(points.length);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('selected', new THREE.BufferAttribute(selected, 1));

    return geometry;
  }, [points]);

  useEffect(() => {
    if (!pointRef.current) return;

    const selectedArray = pointRef.current.geometry.attributes.selected;

    selectedArray.array.fill(0);

    selectedIndices.forEach((i) => {
      (selectedArray.array as Float32Array)[i] = 1.0;
    });

    selectedArray.needsUpdate = true;
  }, [selectedIndices]);

  useEffect(() => {
    if (selectedIndices.size === 0) {
      setBoundingBox(null)
      return
    };

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    selectedIndices.forEach((pointIndex) => {
      const { x, y, z } = points[pointIndex];
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      minZ = Math.min(minZ, z);
      maxZ = Math.max(maxZ, z);
    });

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const centerZ = (minZ + maxZ) / 2;

    const sizeX = maxX - minX;
    const sizeY = maxY - minY;
    const sizeZ = maxZ - minZ;

    setBoundingBox({
      center: { x: centerX, y: centerY, z: centerZ },
      size: { x: sizeX, y: sizeY, z: sizeZ },
    });

  }, [selectedIndices, points]);

  const pointMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0x000ff) },
      size: { value: 1.0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  return (
    <Fragment>
      <mesh rotation={[Math.PI / -2, 0, 0]} scale={2}>
        <points ref={pointRef} geometry={pointGeometry} material={pointMaterial} onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation()

          const index = e.intersections[0]?.index;

          if (index === undefined) return;

          // setDebugSphere(e.point.clone());
          toggleSelectedIndex(index)
        }} />
      </mesh>
      {boundingBox && (
        <mesh position={[boundingBox.center.x, boundingBox.center.y, boundingBox.center.z]} rotation={[Math.PI / -2, 0, 0]} scale={2}>
          <boxGeometry args={[boundingBox.size.x, boundingBox.size.y, boundingBox.size.z]} />
          <meshBasicMaterial wireframe />
        </mesh>
      )}
    </Fragment>
  );
};

export default PointCloud;
