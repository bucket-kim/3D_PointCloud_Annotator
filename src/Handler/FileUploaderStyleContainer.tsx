import styled from 'styled-components';

export const FileUploaderStyleContainer = styled.div`
  label {
    display: inline-flex;
    align-items: center;
    color: white;
    background: #2961dc;
    border: none;
    padding: clamp(0rem, 0.00878477306 * var(--aspect-ratio-scale), 0.75rem)
      clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
    border-radius: 0.5rem;
    cursor: pointer;
    p {
      font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
    }
    input {
      display: none;
    }
  }
`;
