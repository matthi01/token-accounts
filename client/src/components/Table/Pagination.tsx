import { faFastBackward, faFastForward, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { UsePaginationInstanceProps } from "react-table"

interface IPaginationProps extends UsePaginationInstanceProps<any> {
    pageIndex: number
    pageSize: number
}

const Pagination: React.FC<IPaginationProps> = (props) => {
    return (
        <div className="pagination">
            <div className="page-navigation">
                <button onClick={() => props.gotoPage(0)} disabled={!props.canPreviousPage}>
                    <FontAwesomeIcon icon={faFastBackward} />
                </button>{" "}
                <button onClick={() => props.previousPage()} disabled={!props.canPreviousPage}>
                    <FontAwesomeIcon icon={faStepBackward} />
                </button>{" "}
                <button onClick={() => props.nextPage()} disabled={!props.canNextPage}>
                    <FontAwesomeIcon icon={faStepForward} />
                </button>{" "}
                <button onClick={() => props.gotoPage(props.pageCount - 1)} disabled={!props.canNextPage}>
                    <FontAwesomeIcon icon={faFastForward} />
                </button>
            </div>
            <span className="page-indicator">
                <strong>
                    {props.pageIndex + 1} of {props.pageOptions.length}
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
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Pagination