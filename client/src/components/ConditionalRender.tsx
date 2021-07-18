import React from "react"

interface IProps {
    render: boolean
}

const ConditionalRender: React.FC<IProps> = (props) => {
    return (
        <>
            {
                props.render ? props.children : null
            }
        </>
    )
}

export default ConditionalRender