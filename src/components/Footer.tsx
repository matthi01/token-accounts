import React from "react"
import LednLogo from "./images/LednLogo"

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="width-control content">
                <a href="https://ledn.io/" target="blank" className="home"><LednLogo /></a>
            </div>
        </footer>
    )
}

export default Footer