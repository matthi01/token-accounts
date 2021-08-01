import { 
    faFileExport, 
    faSortAmountDown, 
    faSortAmountUp
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useMemo } from "react"
import { useFilters, useGlobalFilter, useTable, Column, Row } from "react-table"
import GlobalFilter from "./GlobalFilter"
import { CSVLink } from "react-csv"
import { useMediaQuery } from "react-responsive"

export interface IDataRecord {
    [key: string]: string | number | null
}

interface IExportConfig {
    fileName: string
    headers: {
        key: string,
        label: string
    }[]
    dataFormattingCallback: (rows: Row<{}>[]) => IDataRecord[]
}

interface IProps {
    columns: Column[]
    data: any
    title: string
    exportConfig: IExportConfig

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
        rows,
        state,

        // filtering
        preGlobalFilteredRows,
        setGlobalFilter,
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

    const csvData = props.exportConfig.dataFormattingCallback(rows)

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
        <div className="table-container">
            <h3 className="mb-3">{ props.title }</h3>
            <div className="header-controls">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <CSVLink 
                    data={csvData} 
                    filename={props.exportConfig.fileName} 
                    headers={props.exportConfig.headers}
                    className="export-btn btn btn-color"
                >
                    Export<FontAwesomeIcon className="ml-1" icon={ faFileExport } />
                </CSVLink>
            </div>
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
                                                ?   <th key={column.id} onClick={() => columnHeaderClickHandler(column.id)}>
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