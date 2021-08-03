import React from "react"
import { useEffect } from "react"
import { useState } from "react"

interface IGlobalFilterProps {
    filter: string
    setFilter: (value: string) => void
}

const GlobalFilter: React.FC<IGlobalFilterProps> = (props) => {
    const { filter, setFilter } = props
    const [filterText, setFilterText] = useState<string>(filter)

    const onChangeHandler = (e: any) => {
        setFilterText(e.target.value)
    }

    // throttle the number of filtering requests
    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            setFilter(filterText)
        }, 500)
        return () => clearTimeout(typingTimeout)
    }, [setFilter, filterText])

    return (
        <div className="search">
            <input
                value={filterText || ""}
                onChange={onChangeHandler}
                placeholder={`Search...`}
            />
        </div>
    )
}

export default GlobalFilter