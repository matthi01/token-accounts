import React from "react"
import LednLogo from "./images/LednLogo"
import LinkButton from "./LinkButton"

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="width-control navigation-pane">
            <LinkButton
                href="https://ledn.io/"
                openNewTab
                className="p-0"
            >
                <LednLogo />
            </LinkButton>
            </div>
        </footer>
    )
}

export default Footer