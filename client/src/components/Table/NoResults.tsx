import React from "react"

interface IProps {}

const NoResults: React.FC<IProps> = (props) => {
    return (
        <div className="no-results">No Results Found</div>
    )
}
export default NoResults