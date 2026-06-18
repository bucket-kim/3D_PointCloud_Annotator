import styled from 'styled-components';

export const HeaderStyleContainer = styled.div`
  main {
    width: 100vw;
    height: 6rem;
    background-color: #0f121a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 2rem;
    border-bottom: 1px #272d38 solid;
    color: white;
    .header-left-container {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      .logo-container {
        height: 3rem;
        width: 3rem;
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
          font-weight: 500;
        }
        p {
          font-size: 0.9rem;
          color: #6d7278;
        }
      }
    }

    .header-right-container {
      display: flex;
      align-items: center;
      gap: 1rem;

      .action-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`;
