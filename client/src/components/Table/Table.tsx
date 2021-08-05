import { 
    faSortAmountDown, 
    faSortAmountUp
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useMemo } from "react"
import { useFilters, useGlobalFilter, useTable, Column } from "react-table"
import GlobalFilter from "./GlobalFilter"
import { useMediaQuery } from "react-responsive"

export interface IDataRecord {
    [key: string]: string | number | null
}

interface IProps {
    columns: Column[]
    data: any

    sortBy?: string
    setSortBy: (value: string) => void

    sortOrder?: string
    setSortOrder: (value: string) => void
}

const Table: React.FC<IProps> = (props) => {
    const { columns, data } = props
    const compact = useMediaQuery({ query: '(max-width: 960px)' })
    const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), [])

    const isSortedDesc = props.sortOrder === "desc"

    const {
        // table
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    const columnHeaderClickHandler = (columnId: string) => {
        // same column clicked
        // this would be perfect for a reducer
        if (props.sortBy && props.sortBy === columnId) {
            if (props.sortOrder === "desc") {
                props.setSortBy("")
                props.setSortOrder("")
            } else {
                props.setSortOrder("desc")
            }
        } else {
            props.setSortBy(columnId)
            props.setSortOrder("asc")
        }
    }

    return (
        <div className="table">
            {
                compact 
                    ? <div className="compact-table" { ...getTableBodyProps() }>
                        {
                            rows.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <div className="tr" { ...row.getRowProps() }>
                                        {
                                            row.cells.map(cell => {
                                                return (
                                                    <div className="td" {...cell.getCellProps() }>
                                                        <div className="cell header">
                                                            { cell.render("Header") }
                                                        </div>
                                                        <div className="cell value">
                                                            { cell.render("Cell") }
                                                        </div>
                                                    </ div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                    : <table { ...getTableProps() }>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr { ...headerGroup.getHeaderGroupProps() }>
                                    { 
                                        headerGroup.headers.map(column => {
                                            return (
                                                column.Header 
                                                ?   <th key={column.id} id={column.id} onClick={() => columnHeaderClickHandler(column.id)}>
                                                        { column.render("Header") }
                                                        <span>
                                                            {
                                                                props.sortBy === column.id
                                                                    ? isSortedDesc
                                                                        ? <FontAwesomeIcon className="ml-1" icon={faSortAmountDown} />
                                                                        : <FontAwesomeIcon className="ml-1" icon={faSortAmountUp} />
                                                                    : ""
                                                            }
                                                        </span>
                                                    </th>
                                                :   null 
                                            )
                                        })
                                    }
                                </tr>
                            ))}
                        </thead>
                        <tbody { ...getTableBodyProps() }>
                            {
                                rows.map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <tr { ...row.getRowProps() }>
                                            {
                                                row.cells.map(cell => (
                                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                ))
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default Table