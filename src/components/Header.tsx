import React from "react"
import LednLogo from "./LednLogo"

const Header: React.FC = () => {
    return (
        <header>
            <div className="width-control content">
                <div className="title"><LednLogo /></div>
                <div className="join btn btn-white">Join</div>
            </div>
        </header>
    )
}

export default Header