import { shallow } from 'zustand/shallow';
import FileUploader from '../Handler/FileUploader';
import { useGlobalState } from '../State/useGlobalState';
import UIStyleContainer from './UIStyleContainer';
import AnnotationPanel from './AnnotationPanel/AnnotationPanel';

const UI = () => {
  const { setPoints } = useGlobalState((state) => {
    return {
      setPoints: state.setPoints,
    };
  }, shallow);

  return (
    <UIStyleContainer>
      <FileUploader onLoad={setPoints} />
      <AnnotationPanel />
    </UIStyleContainer>
  );
};

export default UI;
