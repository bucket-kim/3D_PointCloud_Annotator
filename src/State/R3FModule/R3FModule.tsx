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
        const newPoints = [...state.points];
        newPoints[index] = { ...newPoints[index], ...data };

        return { points: newPoints };
      }),
  };
};

export { R3FModule };
