import { FC } from 'react'
import { ButtonStyleContainer } from './ButtonStyleContainer';

interface ButtonProps {
    handleClick: () => void;
    buttonDisable: boolean;
    buttonLabel: string;
    icon?: string
    type: "primary" | "secondary"
}

const Button: FC<ButtonProps> = ({ handleClick, buttonDisable, buttonLabel, icon, type }) => {
    return (
        <ButtonStyleContainer onClick={handleClick} disabled={buttonDisable} $type={type}>
            {icon && (
                <img src={icon} alt="" />
            )}
            <p>
                {buttonLabel}
            </p>
        </ButtonStyleContainer>
    )
}

export default Button
