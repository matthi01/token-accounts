import React from "react"
import LinkButton from "./LinkButton"
import LednLogo from "./images/LednLogo"
import Banner from "./Banner"

interface IProps {
    includeBanner?: boolean
    bannerTitle?: string
    bannerSubText?: string
}

const Header: React.FC<IProps> = (props) => {
    return (
        <>
            <header>
                <div className="width-control navigation-pane">
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
            {
                props.includeBanner && props.bannerTitle
                    ?   <Banner title={ props.bannerTitle } description={props.bannerSubText} />
                    :   null
            }
        </>
    )
}

export default Header