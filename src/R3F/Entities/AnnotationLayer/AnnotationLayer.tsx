import React, { Fragment } from 'react'
import { useGlobalState } from '../../../State/useGlobalState';
import { shallow } from 'zustand/shallow';

const AnnotationLayer = () => {

    const { annotations, } = useGlobalState((state) => {
        return {
            annotations: state.annotations,
        };
    }, shallow);

    return (
        <Fragment>

            {Object.keys(annotations).length > 0 && (
                Object.values(annotations).map((box) => {

                    console.log(box.color)
                    return (

                        <mesh key={box.id} position={[box.center.x, box.center.y, box.center.z]} >
                            <boxGeometry args={[box.size.x, box.size.y, box.size.z]} />
                            <meshBasicMaterial wireframe color={box.color} />
                        </mesh>
                    )
                })
            )}
        </Fragment>
    )
}

export default AnnotationLayer
