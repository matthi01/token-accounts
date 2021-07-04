import { 
    faFileExport, 
    faSortAmountDown, 
    faSortAmountUp
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useMemo } from "react"
import { useFilters, useGlobalFilter, usePagination, useTable, useSortBy, Column } from "react-table"
import GlobalFilter from "./GlobalFilter"
import Pagination from "./Pagination"
import { CSVLink } from "react-csv"
import { headerLabels } from "../AccountsTable/constants"
import moment from "moment"
import { IAccountDataRecord } from "../AccountsTable/AccountsTable"

interface IProps {
    columns: Column[]
    data: any
}

const Table: React.FC<IProps> = ({columns, data}) => {
    const defaultColumn = useMemo(() => ({ Filter: GlobalFilter }), [])

    const {
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
        // visibleColumns,
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

    // write a data model function which handles making these data changes 
    // (doing it in both the CSV and the table right now)
    // oh damn... this is the table component.. none of this logic should be in here!
    const csvData = rows.map(record => {
        const row = record.original as IAccountDataRecord
        row.dob = moment(row.dob).format("L")
        row.createdDate = moment(row.dob).format("L")
        return row
    })
    const headers = [
        { label: headerLabels["Country"], key: "Country" },
        { label: headerLabels["First Name"], key: "First Name" },
        { label: headerLabels["Last Name"], key: "Last Name" },
        { label: headerLabels["ReferredBy"], key: "ReferredBy" },
        { label: headerLabels["amt"], key: "amt" },
        { label: headerLabels["createdDate"], key: "createdDate" },
        { label: headerLabels["dob"], key: "dob" },
        { label: headerLabels["email"], key: "email" },
        { label: headerLabels["mfa"], key: "mfa" }
    ]

    return (
        <div className="custom-table">
            <div className="header-controls">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <CSVLink 
                    data={csvData} 
                    filename="lednTokenAccounts.csv" 
                    headers={headers}
                    className="btn btn-color"
                >
                    Export CSV<FontAwesomeIcon className="ml-1" icon={faFileExport} />
                </CSVLink>
            </div>
            <table {...getTableProps()}>
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
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr { ...row.getRowProps() }>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
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