import { shallow } from 'zustand/shallow';
import FileUploader from '../../../Handler/FileUploader';
import { useGlobalState } from '../../../State/useGlobalState';
import Button from '../../shared/Button/Button';
import { HeaderStyleContainer } from './HeaderStyleContainer';
import Tips from './Tips/Tips';

const Header = () => {
  const { undo, redo, past, future, points, setPoints, annotations } =
    useGlobalState((state) => {
      return {
        undo: state.undo,
        redo: state.redo,
        past: state.past,
        future: state.future,
        points: state.points,
        setPoints: state.setPoints,
        annotations: state.annotations,
      };
    }, shallow);

  const handleExport = () => {
    const exportData = Object.values(annotations).map((annotation) => {
      return {
        id: annotation.id,
        category: annotation.label,
        center: annotation.center,
        dimensions: annotation.size,
        yaw: 0,
      };
    });

    const data = JSON.stringify(exportData, null, 2);

    const blob = new Blob([data], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'annotations.json';

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <HeaderStyleContainer>
      <main>
        <div className="header-left-container">
          <div className="logo-container">
            <img src="/img/logo/annotator_logo_white.png" alt="" />
          </div>
          <div className="text-container">
            <h3>Point Annotation</h3>
            <p>3D point labeling studio</p>
          </div>
        </div>

        <div className="header-right-container">
          {points.length === 0 ? (
            <div>
              <FileUploader onLoad={setPoints} />
            </div>
          ) : (
            // Object.values(annotations).length === 0
            <div className="header-right-container">
              <div className="action-buttons">
                <Button
                  handleClick={undo}
                  buttonDisable={past.length === 0}
                  buttonLabel="Undo"
                  type="secondary"
                  icon="/img/svg/undo.svg"
                />
                <Button
                  handleClick={redo}
                  buttonDisable={future.length === 0}
                  buttonLabel="Redo"
                  type="secondary"
                  icon="/img/svg/redo.svg"
                />
              </div>
              <Button
                handleClick={handleExport}
                buttonLabel={'Export Annotations'}
                buttonDisable={Object.values(annotations).length === 0}
                type="primary"
                icon="/img/svg/export.svg"
              />
            </div>
          )}
        </div>
      </main>
      <Tips />
    </HeaderStyleContainer>
  );
};

export default Header;
