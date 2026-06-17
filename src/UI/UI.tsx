import { shallow } from 'zustand/shallow';
import FileUploader from '../Handler/FileUploader';
import { useGlobalState } from '../State/useGlobalState';
import UIStyleContainer from './UIStyleContainer';
import AnnotationPanel from './AnnotationPanel/AnnotationPanel';
import Button from './DownloadButton/Button';

const UI = () => {
  const { setPoints, annotations, undo, redo, past, future } = useGlobalState((state) => {
    return {
      setPoints: state.setPoints,
      annotations: state.annotations,
      undo: state.undo,
      redo: state.redo,
      past: state.past,
      future: state.future,
    };
  }, shallow);

  const handleExport = () => {

    const exportData = Object.values(annotations).map((annotation) => {
      return {
        id: annotation.id,
        category: annotation.label,
        center: annotation.center,
        dimensions: annotation.size,
        yaw: 0
      }
    })

    const data = JSON.stringify(exportData, null, 2);

    const blob = new Blob([data], { type: "application/json" })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url;
    link.download = "annotations.json"

    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <UIStyleContainer>
      <FileUploader onLoad={setPoints} />
      <AnnotationPanel />

      <div>
        <button onClick={undo} disabled={past.length === 0}>Undo</button>
        <button onClick={redo} disabled={future.length === 0}>Redo</button>
      </div>

      <Button handleExport={handleExport} annotations={annotations} />
    </UIStyleContainer>
  );
};

export default UI;
