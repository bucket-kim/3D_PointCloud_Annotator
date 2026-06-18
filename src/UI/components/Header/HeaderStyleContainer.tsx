import styled from 'styled-components';

export const HeaderStyleContainer = styled.div`
  main {
    width: 100vw;
    height: clamp(0rem, 0.07027818448 * var(--aspect-ratio-scale), 6rem);
    background-color: #0f121a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: clamp(0rem, 0.02342606149 * var(--aspect-ratio-scale), 2rem);
    border-bottom: 1px #272d38 solid;
    color: white;
    .header-left-container {
      height: 100%;
      display: flex;
      align-items: center;
      gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
      .logo-container {
        height: clamp(0rem, 0.03513909224 * var(--aspect-ratio-scale), 3rem);
        width: clamp(0rem, 0.03513909224 * var(--aspect-ratio-scale), 3rem);
        background-color: #2961dc;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        img {
          object-fit: cover;
          height: 60%;
        }
      }
      .text-container {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        h3 {
          font-size: clamp(0rem, 0.015 * var(--aspect-ratio-scale), 1.25rem);
          font-weight: 500;
        }
        p {
          font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 0.85rem);
          color: #6d7278;
        }
      }
    }

    .header-right-container {
      display: flex;
      align-items: center;
      gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`;
