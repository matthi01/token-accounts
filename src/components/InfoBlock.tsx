import React from "react"

interface IProps {
    title: string
    text: string
}

const InfoBlock: React.FC<IProps> = (props) => {
    return (
        <div className="info-block">
            <h3 className="title">{ props.title }</h3>
            <span className="text">{ props.text }</span>
        </div>
    )
}

export default InfoBlock