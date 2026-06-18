import styled from 'styled-components';

interface ButtonStyleProps {
  $type?: 'primary' | 'secondary';
}

export const ButtonStyleContainer = styled.button<ButtonStyleProps>`
  color: white;
  background: ${({ $type }) =>
    $type === 'primary' ? '#2961DC' : 'transparent'};
  border: ${({ $type }) =>
    $type === 'primary' ? 'none' : '1px solid #272d38'};
  padding: clamp(0rem, 0.00878477306 * var(--aspect-ratio-scale), 0.75rem)
    clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);

  img {
    height: clamp(0rem, 0.01171303075 * var(--aspect-ratio-scale), 1rem);
  }

  p {
    font-size: clamp(0rem, 0.014 * var(--aspect-ratio-scale), 1rem);
  }

  &:disabled {
    background: ${({ $type }) => ($type === 'primary' ? '#1d376e' : '#0F141B')};
    border: ${({ $type }) =>
      $type === 'primary' ? 'none' : '1px solid #14181E'};
    color: #6d7278;

    img {
      opacity: 40%;
    }
  }
`;
