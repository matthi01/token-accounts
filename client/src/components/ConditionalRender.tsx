import React from "react"

interface IProps {
    show: boolean
}

const ConditionalRender: React.FC<IProps> = (props) => {
    return (
        <>
            {
                props.show ? props.children : null
            }
        </>
    )
}

export default ConditionalRender