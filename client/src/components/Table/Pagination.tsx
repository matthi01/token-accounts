import { faFastBackward, faFastForward, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

interface IPaginationProps {
    pageIndex: number
    setPageIndex: (pageIndex: number) => void
    pageSize: number
    setPageSize: (pageSize: number) => void
    totalRecords: number
}

const Pagination: React.FC<IPaginationProps> = (props) => {
    const totalPages = Math.ceil(props.totalRecords / props.pageSize)
    const lastPageIndex = totalPages - 1

    const goToPage = (page: number) => {
        props.setPageIndex(page)
    }

    const canPreviousPage = props.pageIndex === 0 ? false : true
    const canNextPage = props.pageIndex === lastPageIndex ? false : true

    const previousPage = () => {
        props.setPageIndex(props.pageIndex - 1)
    }
    const nextPage = () => {
        props.setPageIndex(props.pageIndex + 1)
    }

    return (
        <div className="pagination">
            <div className="page-navigation">
                <button onClick={() => goToPage(0)} disabled={!canPreviousPage}>
                    <FontAwesomeIcon icon={faFastBackward} />
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FontAwesomeIcon icon={faStepBackward} />
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    <FontAwesomeIcon icon={faStepForward} />
                </button>{" "}
                <button onClick={() => goToPage(lastPageIndex)} disabled={!canNextPage}>
                    <FontAwesomeIcon icon={faFastForward} />
                </button>
            </div>
            <span className="page-indicator">
                <strong>
                    {props.pageIndex + 1} of { totalPages }
                </strong>{" "}
            </span>
            <select
                className="page-size-select"
                value={props.pageSize}
                onChange={e => {
                    props.setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={ pageSize }>
                        Show { pageSize }
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Pagination