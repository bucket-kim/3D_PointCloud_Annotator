import { globalStateApiType } from '../GlobalStateTypes';
import { Point } from './R3FModuleTypes';

const R3FModule = ({ set }: globalStateApiType) => {
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
  };
};

export { R3FModule };
