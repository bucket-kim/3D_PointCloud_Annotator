import { Fragment, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { throttle } from 'lodash';
import { useGlobalState } from '../../../State/useGlobalState';
import fragmentShader from './PointMaterial/fragment.glsl?raw';
import vertexShader from './PointMaterial/vertex.glsl?raw';
import { usePointGeometry } from './hooks/usePointGeometry';
import { useSpatialGrid } from './hooks/useSpatialGrid';
import { useBoundingBox } from './hooks/useBoundingBox';
import BoundingBox from './BoundingBox';
import useGroundCutoff from '../../../Handler/useGroundCutoff';
import { ThreeEvent } from '@react-three/fiber';

const PointCloud = () => {
  const { points, addSelectedIndex, removeSelectedIndex, selectedIndices, boundingBox, setBoundingBox } = useGlobalState(
    (state) => ({
      points: state.points,
      addSelectedIndex: state.addSelectedIndex,
      removeSelectedIndex: state.removeSelectedIndex,
      selectedIndices: state.selectedIndices,
      boundingBox: state.boundingBox,
      setBoundingBox: state.setBoundingBox,
    }),
    shallow,
  );

  const { pointRef, geometry } = usePointGeometry(points, selectedIndices);
  const { getPointAtCursor } = useSpatialGrid(points);
  useBoundingBox(points, selectedIndices, setBoundingBox);

  const groundCutOff = useGroundCutoff(points)


  const pointMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x0000ff) },
        size: { value: 1.0 },
        groundCutOff: { value: groundCutOff }
      },
      vertexShader,
      fragmentShader,
    })
  }, []);

  useEffect(() => {
    pointMaterial.uniforms.groundCutOff.value = groundCutOff;
  }, [groundCutOff, pointMaterial]);

  const handlePointerMove = useMemo(
    () =>
      throttle((e: ThreeEvent<PointerEvent>) => {
        const index = getPointAtCursor();
        const altKey = e.altKey

        if (index === null) return;

        if (altKey) {
          removeSelectedIndex(index)
        } else {
          addSelectedIndex(index);
        }
      }, 100),
    [getPointAtCursor, addSelectedIndex, removeSelectedIndex],
  );

  useEffect(() => () => handlePointerMove.cancel(), [handlePointerMove]);

  return (
    <Fragment>
      <mesh >
        <points ref={pointRef} geometry={geometry} material={pointMaterial} onPointerMove={handlePointerMove} />
      </mesh>
      {boundingBox && <BoundingBox center={boundingBox.center} size={boundingBox.size} />}
    </Fragment>
  );
};

export default PointCloud;
