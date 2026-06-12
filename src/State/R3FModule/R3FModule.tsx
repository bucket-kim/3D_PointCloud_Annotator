import { globalStateApiType } from '../GlobalStateTypes';
import { Annotation, boudingBoxType, Point } from './R3FModuleTypes';

const R3FModule = ({ set, get }: globalStateApiType) => {
  return {
    points: [],
    setPoints: (points: Point[]) => {
      set({ points: points });
    },
    updatePoint: (index: number, data: any) =>
      set((state) => {
        const updatePoints = [...state.points];
        if (index >= 0 && index < updatePoints.length) {
          updatePoints[index] = { ...updatePoints[index], ...data };
        }

        return { points: updatePoints };
      }),

    selectedIndices: new Set<number>(),
    setSelectedIndices: (indicies: Set<number>) => {
      set({ selectedIndices: indicies })
    },
    toggleSelectedIndex: (index: number) => {
      set((state) => {
        const next = new Set(state.selectedIndices)

        if (next.has(index)) {
          next.delete(index)
        } else {
          next.add(index)
        }

        return { selectedIndices: next }
      })
    },

    boundingBox: null,
    setBoundingBox: (boundingBox: boudingBoxType | null) => {
      set({ boundingBox: boundingBox })
    },

    annotations: {},
    addAnnotation: (label: string) => {
      const { selectedIndices, boundingBox, annotations } = get()

      if (!boundingBox) return;

      const id = Object.keys(annotations).length

      const newAnnotation: Annotation = {
        id,
        label,
        center: boundingBox.center,
        size: boundingBox.size,
        pointIndices: [...selectedIndices]
      }

      set({ annotations: { ...annotations, [id]: newAnnotation }, selectedIndices: new Set(), boundingBox: null })
    }
  };

};

export { R3FModule };
