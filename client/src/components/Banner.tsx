import React from "react"

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
        </div>
    )
}

export default Banner