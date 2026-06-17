import { useMemo } from 'react'
import { Point } from '../State/R3FModule/R3FModuleTypes';

const BIN_SIZE = 0.03;

const useGroundCutoff = (points: Point[]) => {

    return useMemo(() => {
        if (points.length === 0) return -1.7;

        let minY = Infinity, maxY = -Infinity;

        points.forEach((p) => {
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        })

        const binCount = Math.ceil((maxY - minY) / BIN_SIZE);
        const histogram = new Array(binCount).fill(0);

        points.forEach(p => {
            const binIndex = Math.floor((p.y - minY) / BIN_SIZE);
            histogram[binIndex]++;
        })

        let maxCount = -Infinity;
        let groundBinIndex = 0;

        for (let i = 0; i < histogram.length; i++) {
            if (histogram[i] > maxCount) {
                maxCount = histogram[i];
                groundBinIndex = i;
            }
        }

        const groundHeight = groundBinIndex * BIN_SIZE + minY;

        const groundCutOff = groundHeight + .2;

        return groundCutOff;

    }, [points])
}

export default useGroundCutoff
