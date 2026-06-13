import { FC } from 'react'
import { Annotation } from '../../State/R3FModule/R3FModuleTypes';

interface ButtonProps {
    handleExport: () => void;
    annotations: Record<number, Annotation>;
}

const Button: FC<ButtonProps> = ({ handleExport, annotations }) => {
    return (
        <button onClick={handleExport} disabled={Object.values(annotations).length === 0}>
            Download Annotation Data
        </button>
    )
}

export default Button
