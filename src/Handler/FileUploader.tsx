import { ChangeEvent, FC, useRef } from 'react';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

interface FileUploaderType {
  onLoad: (points: { x: number; y: number; z: number }[]) => void;
}

const FileUploader: FC<FileUploaderType> = ({ onLoad }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePLYFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const file = files[0];
    if (!file) return;

    const fileName = file.name.replace(/\.[^/.]+$/, '');

    const url = URL.createObjectURL(file);

    const plyLoader = new PLYLoader();

    plyLoader.load(
      url,
      (geometry: THREE.BufferGeometry) => {
        const position = geometry.attributes.position;
        const points = [];
        for (let i = 0; i < position.count; i++) {
          points.push({
            x: position.getX(i),
            y: position.getY(i),
            z: position.getZ(i),
            label: fileName,
          });
        }
        onLoad(points);
        URL.revokeObjectURL(url);
      },
      undefined,
      (err: any) => {
        console.error('Failed to load PLY', err);
        alert('Cloud not read .ply file.');
      },
    );
  };

  return (
    <input
      type="file"
      id="file-input"
      accept=".ply"
      ref={inputRef}
      onChange={handlePLYFileUpload}
    />
  );
};

export default FileUploader;
