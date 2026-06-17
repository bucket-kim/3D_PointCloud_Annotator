export type Point = {
  x: number;
  y: number;
  z: number;
  label?: string;
  selected?: boolean;
};

export type Annotation = {
  id: number;
  label: string;
  center: { x: number, y: number, z: number };
  size: { x: number, y: number, z: number };
  pointIndices: number[]
}

export type boudingBoxType = {
  center: {
    x: number, y: number, z: number
  },
  size: {
    x: number, y: number, z: number
  }
}

export interface R3FModuleTypes {
  points: Point[];
  setPoints: (points: Point[]) => void;
  updatePoint: (index: number, data: Partial<Point>) => void;

  selectedIndices: Set<number>;
  setSelectedIndices: (indices: Set<number>) => void;
  toggleSelectedIndex: (index: number) => void;
  addSelectedIndex: (index: number) => void;

  removeSelectedIndex: (index: number) => void;

  boundingBox: boudingBoxType | null;
  setBoundingBox: (boudingBox: boudingBoxType | null) => void;

  annotations: Record<number, Annotation>;
  addAnnotation: (label: string) => void;
  past: Record<number, Annotation>[];
  future: Record<number, Annotation>[];
  undo: () => void;
  redo: () => void;

}
