import styled from 'styled-components';

export const AnnotationPanelStyleContainer = styled.div`
  position: absolute;
  right: 0;
  width: clamp(0rem, 26vw, 28rem);
  height: 100vh;
  box-sizing: border-box;
  /* padding: 1rem; */
  border-left: 1px solid #272d38;
  background-color: #0f121a;
  color: white;
  display: flex;
  flex-direction: column;
  gap: clamp(0rem, 0.005856515373 * var(--aspect-ratio-scale), 0.5rem);
  .file-panel-container {
    display: flex;
    flex-direction: column;
    gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
    border-bottom: 1px solid #272d38;
    padding: clamp(0rem, 0.01756954612 * var(--aspect-ratio-scale), 1.5rem);
    h3 {
      text-transform: uppercase;
      color: #6d7278;
      font-size: clamp(0rem, 0.015 * var(--aspect-ratio-scale), 1.25rem);
      font-weight: 500;
    }
    .file-conatiner {
      background-color: #131921;
      padding: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
      border-radius: 0.5rem;
      border: #272d38 1px solid;
      display: flex;
      flex-direction: column;
      gap: clamp(0rem, 0.005856515373 * var(--aspect-ratio-scale), 0.5rem);

      span {
        font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
      }
    }
  }

  .stat-panel-container {
    display: flex;
    flex-direction: column;
    gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
    border-bottom: 1px solid #272d38;
    padding: clamp(0rem, 0.01756954612 * var(--aspect-ratio-scale), 1.5rem);
    .title {
      h3 {
        text-transform: uppercase;
        color: #6d7278;
        font-size: clamp(0rem, 0.015 * var(--aspect-ratio-scale), 1.25rem);
        font-weight: 500;
      }
    }
    .data-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
      .data-label {
        padding: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
        border-radius: 0.5rem;
        border: #272d38 1px solid;
        display: flex;
        flex-direction: column;
        gap: clamp(0rem, 0.005856515373 * var(--aspect-ratio-scale), 0.5rem);
        p {
          color: #6d7278;
          font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
        }
        span {
          font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
        }
      }
    }
  }

  .save-panel-container {
    display: flex;
    flex-direction: column;
    gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
    border-bottom: 1px solid #272d38;
    padding: clamp(0rem, 0.01756954612 * var(--aspect-ratio-scale), 1.5rem);
    .title {
      h3 {
        text-transform: uppercase;
        color: #6d7278;
        font-size: clamp(0rem, 0.015 * var(--aspect-ratio-scale), 1.25rem);
        font-weight: 500;
      }
    }

    label {
      color: #6d7278;
      font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
    }

    input {
      background-color: transparent;
      padding: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
      border-radius: 0.5rem;
      border: #272d38 1px solid;
      color: white;
      outline: none;
      font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
    }

    span {
      color: #43954e;
      font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
    }
  }

  .result-container {
    display: flex;
    flex-direction: column;
    gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
    /* border-bottom: 1px solid #272d38; */
    padding: clamp(0rem, 0.01756954612 * var(--aspect-ratio-scale), 1.5rem);

    h3 {
      text-transform: uppercase;
      color: #6d7278;
      font-size: clamp(0rem, 0.015 * var(--aspect-ratio-scale), 1.25rem);
      font-weight: 500;
    }

    .annotation-lists {
      ul {
        display: flex;
        flex-direction: column;
        gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
        li {
          list-style: none;
          padding: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
          border-radius: 0.5rem;
          border: #272d38 1px solid;
          display: flex;
          align-items: center;
          gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);

          p {
            display: flex;
            flex-direction: column;
            gap: clamp(
              0rem,
              0.005856515373 * var(--aspect-ratio-scale),
              0.5rem
            );

            span:nth-child(2) {
              color: #6d7278;
            }
          }
        }
      }
    }
  }
`;
