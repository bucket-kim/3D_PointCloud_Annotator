import React from 'react'
import { TipsStyleContainer } from './TipsStyleContainer'

const Tips = () => {

    const INFO_DATA = [
        "Click on Right MB to rotate around the screen",
        " Use Middle MB to pan around the scene",
        " Hover your cursor over points to select Box Annotation",
        " Press Alt (Opt for mac) Key to remove point selection",
        " Click 'Save annotation' button to save boxes of data",
    ]

    return (
        <TipsStyleContainer>
            {INFO_DATA.map((info, index) => (
                <p key={index}>
                    <span>
                        -
                    </span>
                    {info}
                </p>
            ))}
        </TipsStyleContainer>
    )
}

export default Tips
