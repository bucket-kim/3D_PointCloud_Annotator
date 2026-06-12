import React, { useState } from 'react'
import { useGlobalState } from '../../State/useGlobalState'

const AnnotationPanel = () => {

    const { annotations, addAnnotation } = useGlobalState((state) => {
        return {
            annotations: state.annotations,
            addAnnotation: state.addAnnotation
        }
    })

    const [label, setLabel] = useState<string>("")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === null) return;
        setLabel(e.target.value)
    }


    const handleSaveAnnotationClick = () => {
        if (label.trim() === "") return;
        addAnnotation(label)

    }

    return (
        <div>

            <div>
                <label >Name the label</label>
                <input value={label} onChange={handleInputChange} />
                <button onClick={handleSaveAnnotationClick}>Save Annotation</button>
            </div>
            <div>
                {Object.keys(annotations).length > 0 && (
                    <select name="labels" id="labels">
                        {Object.values(annotations).map((annotation, index) => {
                            console.log(annotation)
                            return (
                                <option key={index} value={annotation.label}>{annotation.label}</option>
                            )
                        })
                        }
                    </select>
                )}
            </div>
        </div>
    )
}

export default AnnotationPanel
