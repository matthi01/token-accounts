import classNames from "classnames"
import React from "react"

interface IProps {
    type: "light" | "dark"
}

const Spinner: React.FC<IProps> = (props) => {
    return (
        <div className={classNames("spinner", `type-${props.type}`)}>
            <div className="dot-pulse" />
        </div>
    )
}

export default Spinner