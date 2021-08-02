import React, { useRef, useState } from "react"
import { CSVLink } from "react-csv"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileExport } from "@fortawesome/free-solid-svg-icons"
import { fetchData } from "../helpers/axios"
import { get } from "lodash"

interface IHeader {
    label: string
    key: string
}

interface IProps {
    headers: IHeader[]
    fileName: string
    apiQuery: string
    exportDataPath?: string
}

const CSVExportButton: React.FC<IProps> = (props) => {
    const csvLinkRef = useRef<any>(null)
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState<boolean>(false)

    const fetchDownloadData = async () => (
        await fetchData(props.apiQuery)
    )

    const downloadClickHandler = () => {
        setFetching(true)
        fetchDownloadData()
            .then((results) => {
                if (props.exportDataPath) {
                    setData(get(results.data, props.exportDataPath))
                } else {
                    setData(results.data)
                }
                if (csvLinkRef.current) {
                    csvLinkRef.current.link.click()
                }   
            })
            .catch((err) => {
                console.log("Error fetching export data. Error:", err)
            })
            .finally(() => {
                setFetching(false)
            })
    }
    
    return (
        <>
            <div className="export-btn btn btn-color" onClick={downloadClickHandler}>
                {
                    fetching
                        ? <span>Fetching...</span>
                        : <span>Export<FontAwesomeIcon className="ml-1" icon={ faFileExport } /></span>
                }
                
            </div>
            {
                data
                    ?   <CSVLink
                            data={data}
                            headers={props.headers}
                            filename={props.fileName}
                            className="hidden"
                            ref={csvLinkRef}
                            target="_blank" 
                        />
                    :   null
            }
        </>
    )
}

export default CSVExportButton
