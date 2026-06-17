import { ChangeEvent, FC, useRef } from 'react';

interface pointData {
  x: number;
  y: number;
  z: number;
  label: string;
}

type PointArray = pointData[]

interface FileUploaderType {
  onLoad: (points: { x: number; y: number; z: number }[]) => void;
}

const FileUploader: FC<FileUploaderType> = ({ onLoad }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // handlePLYFielUpload

  const handleBinFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const file = files[0];
    if (!file) return;

    if (!file.name.endsWith(".bin")) {
      alert('Please upload a .bin file.');
      return;
    }

    const fileName = file.name.replace(/\.[^/.]+$/, '');

    const arrayBuffer = await file.arrayBuffer();

    if (arrayBuffer.byteLength % 16 !== 0) {
      alert('File does not match expected point cloud format.');
      return;
    }

    const floatBuffer = new Float32Array(arrayBuffer);

    const points: PointArray = [];

    for (let i = 0; i < floatBuffer.length; i += 4) {
      points.push({
        x: floatBuffer[i],
        y: floatBuffer[i + 2],
        z: -floatBuffer[i + 1],
        label: fileName
      })
    }

    // let minY = Infinity, maxY = -Infinity;
    // points.forEach(p => { minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y) })


    onLoad(points)
    // const url = URL.createObjectURL(file);
    // const plyLoader = new PLYLoader();
    // plyLoader.load(
    //   url,
    //   (geometry: THREE.BufferGeometry) => {
    //     const position = geometry.attributes.position;
    //     const points = [];
    //     for (let i = 0; i < position.count; i++) {
    //       points.push({
    //         x: position.getX(i),
    //         y: position.getY(i),
    //         z: position.getZ(i),
    //         label: fileName,
    //       });
    //     }
    //     onLoad(points);
    //     URL.revokeObjectURL(url);
    //   },
    //   undefined,
    //   (err: any) => {
    //     console.error('Failed to load PLY', err);
    //     alert('Cloud not read .ply file.');
    //   },
    // );
  };

  return (
    <input
      type="file"
      id="file-input"
      accept=".bin"
      ref={inputRef}
      onChange={handleBinFileUpload}
    />
  );
};

export default FileUploader;
