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

interface IProps {
    columns: Column[]
    data: any
}

const Table: React.FC<IProps> = ({columns, data}) => {
    const defaultColumn = useMemo(
        () => ({
            Filter: GlobalFilter,
        }), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,

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
    
    return (
        <div className="custom-table">
            <div className="header-controls">
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <div className="btn btn-blue">Export as CSV<FontAwesomeIcon className="ml-1" icon={faFileExport} /></div>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                        ? column.isSortedDesc
                                            ? <FontAwesomeIcon className="ml-1" icon={faSortAmountDown} />
                                            : <FontAwesomeIcon className="ml-1" icon={faSortAmountUp} />
                                        : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
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