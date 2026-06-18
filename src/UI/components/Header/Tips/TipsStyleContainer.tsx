import styled from 'styled-components';

export const TipsStyleContainer = styled.div`
  position: absolute;
  color: white;
  top: calc(
    1rem + clamp(0rem, 0.07027818448 * var(--aspect-ratio-scale), 6rem)
  );
  left: clamp(0rem, 0.02342606149 * var(--aspect-ratio-scale), 2rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    display: flex;
    gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
    font-weight: 100;
    font-size: clamp(0rem, 0.00878477306 * var(--aspect-ratio-scale), 0.75rem);
  }
`;
