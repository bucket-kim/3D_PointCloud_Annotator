import React, { useState } from 'react'
import { useGlobalState } from '../../../State/useGlobalState'
import { AnnotationPanelStyleContainer } from './AnnotationPanelStyleContainer'
import Button from '../../shared/Button/Button'

const AnnotationPanel = () => {

    const { annotations, addAnnotation, fileName, points, selectedIndices } = useGlobalState((state) => {
        return {
            annotations: state.annotations,
            addAnnotation: state.addAnnotation,
            fileName: state.fileName,
            points: state.points,
            selectedIndices: state.selectedIndices,
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

    const AnnotationLength = Object.keys(annotations).length;

    const formatCount = (num: number): string => {
        if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
        if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
        if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
        return `${num}`;
    };

    const formatWithCommas = (num: number): string => num.toLocaleString("en-US");

    return (
        <AnnotationPanelStyleContainer>
            <div className="file-panel-container">
                <h3>dataset</h3>
                <div className="file-conatiner">
                    {fileName && (
                        <p>{fileName}.bin</p>
                    )}
                    <span> {formatWithCommas(points.length)} points</span>
                </div>
            </div>
            <div className="stat-panel-container">
                <div className="title">
                    <h3>stats</h3>
                </div>
                <div className="data-container">
                    <div className="data-label">
                        <p>Points</p>
                        <span>{formatCount(points.length)}</span>
                    </div>
                    <div className="data-label">
                        <p>Annotations</p>
                        <span>{AnnotationLength}</span>
                    </div>
                </div>
            </div>
            <div className='save-panel-container'>
                <div className="title">
                    <h3>New Annotation</h3>
                </div>
                <label >Label</label>
                <input value={label} onChange={handleInputChange} />
                <Button handleClick={handleSaveAnnotationClick} buttonLabel={"Save annotation"} buttonDisable={!label} type="primary" icon='/img/svg/check.svg' />
                <span>
                    {selectedIndices.size} points seleced
                </span>
            </div>
            <div className='result-container'>
                <h3>Annotations ({AnnotationLength})</h3>
                {AnnotationLength > 0 && (
                    <div className='annotation-lists'>
                        <ul>
                            {Object.values(annotations).map((annotation, index) => {
                                return (
                                    <li key={index} value={annotation.label}>

                                        <div style={{ height: "1rem", width: "1rem", backgroundColor: `${annotation.color}`, borderRadius: "0.2rem" }} />

                                        <p>
                                            <span>
                                                {annotation.label}

                                            </span>
                                            <span>
                                                {annotation.pointIndices.length} pts
                                            </span>
                                        </p>

                                    </li>
                                )
                            })
                            }
                        </ul>
                    </div>
                )}
            </div>
        </AnnotationPanelStyleContainer>
    )
}

export default AnnotationPanel
