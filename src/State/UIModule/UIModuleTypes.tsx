export interface UIModuleTypes {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;

  fileName: string;
  setFileName: (fileName: string) => void;
}
