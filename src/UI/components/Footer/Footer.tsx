import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';
import { FooterStyleContainer } from './FooterStyleContainer';

const informationLabel = [
  {
    borderRadius: '99px',
    label: 'unselected',
    color: '#0000ff',
    border: 'none',
  },
  {
    borderRadius: '99px',
    label: 'selected',
    color: '#57B3EF',
    border: 'none',
  },
  {
    borderRadius: '2px',
    label: 'box',
    color: 'transparent',
    border: '2px #43954E solid',
  },
];

const Footer = () => {
  const { boundingBox, selectedIndices } = useGlobalState((state) => {
    return {
      boundingBox: state.boundingBox,
      selectedIndices: state.selectedIndices,
    };
  }, shallow);

  return (
    <FooterStyleContainer>
      <div className="canvas-info">
        {informationLabel.map((info, index) => (
          <div className="info-label" key={index}>
            <div
              className="circle"
              style={{
                borderRadius: `${info.borderRadius}`,
                backgroundColor: `${info.color}`,
                border: `${info.border}`,
              }}
            />
            <span>{info.label}</span>
          </div>
        ))}
      </div>
      <div className="data-info">
        <div className="points-label">
          <p>{selectedIndices.size} points selected</p>
        </div>
        <div className="center-label">
          <p>Center</p>
          {boundingBox ? (
            <span>
              {`(${boundingBox.center.x.toFixed(2)}, ${boundingBox.center.y.toFixed(2)}, ${boundingBox.center.z.toFixed(2)})`}
            </span>
          ) : (
            <span>(0, 0, 0)</span>
          )}
        </div>
        <div className="size-label">
          <p>Size</p>
          {boundingBox ? (
            <span>
              {`(${boundingBox.size.x.toFixed(2)}, ${boundingBox.size.y.toFixed(2)}, ${boundingBox.size.z.toFixed(2)})`}
            </span>
          ) : (
            <span>(0, 0, 0)</span>
          )}
        </div>
      </div>
    </FooterStyleContainer>
  );
};

export default Footer;
