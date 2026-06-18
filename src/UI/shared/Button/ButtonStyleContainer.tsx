import styled from "styled-components";

interface ButtonStyleProps {
    $type?: "primary" | "secondary";
}

export const ButtonStyleContainer = styled.button<ButtonStyleProps>`
    color: white;
    background: ${({ $type }) => ($type === "primary" ? "#2961DC" : "transparent")};
    border: ${({ $type }) => ($type === "primary" ? "none" : "1px solid #272d38")};
    padding: .75rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
        height: 1rem;
    }

    p {
        font-size: 1rem;
    }

    &:disabled {
        background: ${({ $type }) => ($type === "primary" ? "#1d376e" : "#0F141B")};
        border: ${({ $type }) => ($type === "primary" ? "none" : "1px solid #14181E")};
        color: #6D7278;

        img {
            opacity: 40%;
        } 
    }
`