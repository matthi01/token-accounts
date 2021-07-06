import { 
    faFileExport, 
    faSortAmountDown, 
    faSortAmountUp
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useMemo } from "react"
import { useFilters, useGlobalFilter, usePagination, useTable, useSortBy, Column, Row } from "react-table"
import GlobalFilter from "./GlobalFilter"
import Pagination from "./Pagination"
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
}

const Table: React.FC<IProps> = (props) => {
    const { columns, data } = props
    const compact = useMediaQuery({ query: '(max-width: 960px)' })
    const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), [])

    const {
        // table
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,

        // pagination
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
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
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const csvData = props.exportConfig.dataFormattingCallback(rows)

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
                            page.map((row, i) => {
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
                                        headerGroup.headers.map(column => (
                                            column.Header 
                                                ?   <th { ...column.getHeaderProps(column.getSortByToggleProps()) }>
                                                        { column.render("Header") }
                                                        <span>
                                                            {
                                                                column.isSorted
                                                                    ? column.isSortedDesc
                                                                        ? <FontAwesomeIcon className="ml-1" icon={faSortAmountDown} />
                                                                        : <FontAwesomeIcon className="ml-1" icon={faSortAmountUp} />
                                                                    : ""
                                                            }
                                                        </span>
                                                    </th>
                                                :   null 
                                        ))
                                    }
                                </tr>
                            ))}
                        </thead>
                        <tbody { ...getTableBodyProps() }>
                            {
                                page.map((row, i) => {
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
            <Pagination
                page={page}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageOptions={pageOptions}
                pageCount={pageCount}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
                setPageSize={setPageSize}
                pageIndex={state.pageIndex}
                pageSize={state.pageSize}
            />
        </div>
    )
}

export default Table