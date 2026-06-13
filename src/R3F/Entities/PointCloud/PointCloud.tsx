import { Fragment, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { ThreeEvent } from '@react-three/fiber';
import { throttle } from 'lodash';
import { useGlobalState } from '../../../State/useGlobalState';
import fragmentShader from './PointMaterial/fragment.glsl?raw';
import vertexShader from './PointMaterial/vertex.glsl?raw';
import { usePointGeometry } from './hooks/usePointGeometry';
import { useSpatialGrid } from './hooks/useSpatialGrid';
import { useBoundingBox } from './hooks/useBoundingBox';
import BoundingBox from './BoundingBox';

const pointMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color(0x0000ff) },
    size: { value: 1.0 },
  },
  vertexShader,
  fragmentShader,
});

const PointCloud = () => {
  const { points, addSelectedIndex, selectedIndices, boundingBox, setBoundingBox } = useGlobalState(
    (state) => ({
      points: state.points,
      addSelectedIndex: state.addSelectedIndex,
      selectedIndices: state.selectedIndices,
      boundingBox: state.boundingBox,
      setBoundingBox: state.setBoundingBox,
    }),
    shallow,
  );

  const { pointRef, geometry } = usePointGeometry(points, selectedIndices);
  const { getPointAtCursor } = useSpatialGrid(points);
  useBoundingBox(points, selectedIndices, setBoundingBox);

  const handlePointerMove = useMemo(
    () =>
      throttle(() => {
        const index = getPointAtCursor();
        if (index === null) return;
        addSelectedIndex(index);
      }, 100),
    [getPointAtCursor],
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
