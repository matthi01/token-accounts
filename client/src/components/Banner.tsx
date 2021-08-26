import React from "react"
import LinkButton from "./LinkButton"

interface IProps {
    title: string
    description?: string
}

const Banner: React.FC<IProps> = (props) => {
    return (
        <div className="banner">
            <h1 className="title">{ props.title }</h1>
            {
                props.description
                    ?   <h3 className="description">{ props.description }</h3>
                    :   null
            }
            <div className="action-buttons">
                <LinkButton
                    text="Accounts"
                    type="transparent"
                    scrollToId="accounts"
                />
            </div>
        </div>
    )
}

export default Banner