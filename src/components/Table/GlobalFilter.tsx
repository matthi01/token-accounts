import { useState } from "react"
import { useAsyncDebounce } from "react-table"

interface IGlobalFilter {
    preGlobalFilteredRows: any
    globalFilter: any
    setGlobalFilter: any
}

const GlobalFilter: React.FC<IGlobalFilter> = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <div className="filter">
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Search ${count} records...`}
            />
        </div>
    )
}

export default GlobalFilter