import { globalStateApiType } from '../GlobalStateTypes';
import { Annotation, boudingBoxType, Point } from './R3FModuleTypes';

const R3FModule = ({ set, get }: globalStateApiType) => {
  return {
    points: [],
    setPoints: (points: Point[]) => {
      set({
        points,
        annotations: {},
        past: [],
        future: [],
        selectedIndices: new Set(),
        boundingBox: null
      });
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
    addSelectedIndex: (index: number) => {
      set((state) => {
        const next = new Set(state.selectedIndices)
        next.add(index)
        return { selectedIndices: next }
      })
    },

    removeSelectedIndex: (index: number) => {
      set((state) => {
        const next = new Set(state.selectedIndices)
        next.delete(index)
        return { selectedIndices: next }
      })
    },

    boundingBox: null,
    setBoundingBox: (boundingBox: boudingBoxType | null) => {
      set({ boundingBox: boundingBox })
    },

    annotations: {},
    past: [],
    future: [],
    addAnnotation: (label: string) => {
      const { selectedIndices, boundingBox, annotations, past } = get()

      if (!boundingBox) return;

      const id = Object.keys(annotations).length

      const color = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`

      const newAnnotation: Annotation = {
        id,
        label,
        color,
        center: boundingBox.center,
        size: boundingBox.size,
        pointIndices: [...selectedIndices]
      }

      set({
        annotations: { ...annotations, [id]: newAnnotation },
        past: [...past, annotations],
        future: [],
        selectedIndices: new Set(),
        boundingBox: null
      })
    },

    undo: () => {
      const { past, future, annotations } = get()
      if (past.length === 0) return;

      const nextPast = [...past];
      const previous = nextPast.pop();

      set({
        annotations: previous,
        past: nextPast,
        future: [...future, annotations],
        selectedIndices: new Set(),
        boundingBox: null
      })
    },

    redo: () => {
      const { past, future, annotations } = get();
      if (future.length === 0) return;

      const nextFuture = [...future];
      const redoFuture = nextFuture.pop()


      set({
        annotations: redoFuture,
        past: [...past, annotations],
        future: nextFuture,
        selectedIndices: new Set(),
        boundingBox: null
      })
    }
  };

};

export { R3FModule };
