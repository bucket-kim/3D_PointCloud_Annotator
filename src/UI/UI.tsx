import { shallow } from 'zustand/shallow';
import FileUploader from '../Handler/FileUploader';
import { useGlobalState } from '../State/useGlobalState';
import UIStyleContainer from './UIStyleContainer';

const UI = () => {
  const { setPoints } = useGlobalState((state) => {
    return {
      setPoints: state.setPoints,
    };
  }, shallow);

  return (
    <UIStyleContainer>
      <FileUploader onLoad={setPoints} />
    </UIStyleContainer>
  );
};

export default UI;
