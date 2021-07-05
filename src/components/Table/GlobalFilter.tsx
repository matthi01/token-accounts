import { useState } from "react"
import { useAsyncDebounce, UseGlobalFiltersInstanceProps, UseGlobalFiltersState } from "react-table"

interface IGlobalFilterProps extends Partial<UseGlobalFiltersInstanceProps<any>>, UseGlobalFiltersState<any> {}

const GlobalFilter: React.FC<IGlobalFilterProps> = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
    const count = preGlobalFilteredRows?.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter && setGlobalFilter(value || undefined)
    }, 200)

    return (
        <div className="search">
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