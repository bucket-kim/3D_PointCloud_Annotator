import styled from 'styled-components';

export const FooterStyleContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  color: white;

  .canvas-info {
    height: clamp(0rem, 0.04685212299 * var(--aspect-ratio-scale), 4rem);
    background-color: #0f121a;
    border: 1px #272d38 solid;
    margin: clamp(0rem, 0.01756954612 * var(--aspect-ratio-scale), 1.5rem);
    padding: clamp(0rem, 0.01756954612 * var(--aspect-ratio-scale), 1.5rem);
    box-sizing: border-box;
    width: fit-content;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: clamp(0rem, 0.01756954612 * var(--aspect-ratio-scale), 1.5rem);
    .info-label {
      display: flex;
      align-items: center;
      gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
      .circle {
        width: clamp(0rem, 0.009956076135 * var(--aspect-ratio-scale), 0.85rem);
        height: clamp(
          0rem,
          0.009956076135 * var(--aspect-ratio-scale),
          0.85rem
        );
      }
      span {
        font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
        margin: 0;
      }
    }
  }

  .data-info {
    width: calc(100vw - clamp(0rem, 26vw, 28rem));
    background-color: #0f121a;
    height: clamp(0rem, 0.07027818448 * var(--aspect-ratio-scale), 6rem);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: clamp(0rem, 0.03513909224 * var(--aspect-ratio-scale), 3rem);
    border-top: 1px #272d38 solid;
    box-sizing: border-box;
    padding: clamp(0rem, 0.02342606149 * var(--aspect-ratio-scale), 2rem);
    .points-label {
      p {
        font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
      }
    }
    .center-label,
    .size-label {
      font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
      display: flex;
      align-items: center;
      gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
      p {
        color: #6d7278;
      }
    }
  }
`;
