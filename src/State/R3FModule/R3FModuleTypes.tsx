export type Point = {
  x: number;
  y: number;
  z: number;
};

export interface R3FModuleTypes {
  points: Point[];
  setPoints: (points: Point[]) => void;
  updatePoint: (index: number, data: Partial<Point>) => void;
}
