import React from "react"
import LinkButton from "./LinkButton"
import LednLogo from "./images/LednLogo"

const Header: React.FC = () => {
    return (
        <header>
            <div className="width-control content">
                <LinkButton
                    href="https://ledn.io/"
                    openNewTab
                    className="p-0"
                >
                    <LednLogo />
                </LinkButton>
                <div>
                    <LinkButton
                        text="Login"
                        type="transparent"
                        href="https://platform.ledn.io/"
                        openNewTab
                        className="mr-2"
                    />
                    <LinkButton
                        text="Join"
                        type="white"
                        href="https://platform.ledn.io/signup"
                        openNewTab
                    />
                </div>
            </div>
        </header>
    )
}

export default Header