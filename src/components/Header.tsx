import React from "react"
import LednLogo from "./images/LednLogo"

const Header: React.FC = () => {
    return (
        <header>
            <div className="width-control content">
                <a href="https://ledn.io/" target="blank" className="home"><LednLogo /></a>
                <a href="https://platform.ledn.io/signup" target="blank" className="join btn btn-white">Join</a>
            </div>
        </header>
    )
}

export default Header