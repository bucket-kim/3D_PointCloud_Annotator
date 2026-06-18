import styled from "styled-components";

export const FooterStyleContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    color: white;
  

    .canvas-info {
        height: 4rem;
        background-color: #0F121A;
        border: 1px #272d38 solid;
        margin: 1.5rem;
        padding: 1.5rem;
        box-sizing: border-box;
        width: fit-content;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
        .info-label {
            display: flex;
            align-items: center;
            gap: 1rem;
            .circle {
                width: .75rem;
                height: .75rem;
            }
            span {
                margin: 0;
            }
        }
    }

    .data-info {
        width: calc(100vw - 24rem);
        background-color: #0F121A;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 3rem;
        border-top: 1px #272d38 solid;
        box-sizing: border-box;
        padding: 2rem;
        .center-label, .size-label{
            display: flex;
            align-items: center;
            gap: 1rem;
            p {
                color: #6D7278;
            }
        }
    }

`