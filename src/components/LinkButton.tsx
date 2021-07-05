import React from "react"
import classNames from "classnames"

type ButtonStyle = "white" | "color" | "transparent" 

interface IProps {
    type?: ButtonStyle
    text?: string
    href: string
    openNewTab?: boolean
    className?: string | string[]
}

const LinkButton: React.FC<IProps> = (props) => {
    return (
        <a 
            href={ props.href }
            target={ props.openNewTab ? "blank" : "self" }
            className={classNames(`btn btn-${props.type}`, props.className)}
        >
            { 
                props.text 
                    ? props.text
                    : props.children
            }
        </a>
    )
}

export default LinkButton