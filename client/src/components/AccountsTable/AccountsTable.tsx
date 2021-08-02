import moment from "moment"
import React, { useState } from "react"
import Table, { IDataRecord } from "../Table/Table"
import { headerLabels } from "./constants"
import { useEffect } from "react"
import Pagination from "../Table/Pagination"
import GlobalFilter from "../Table/GlobalFilter"
import CSVExportButton from "../CSVExportButton"
import { fetchData } from "../../helpers/axios"
import NoResults from "../Table/NoResults"

export interface IAccountDataRecord extends IDataRecord {
    country: string
    firstName: string
    lastName: string
    referredBy: string
    amount: number
    createdDate: string
    dob: string
    email: string
    mfa: string
}

interface IProps {
    // data: IAccountDataRecord[]
}

const AccountsTable: React.FC<IProps> = (props) => {
    const [accountsData, setAccountsData] = useState<IAccountDataRecord[]>([])

    const [pageIndex, setPageIndex] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [totalRecords, setTotalRecords] = useState<number>(0)

    const [sortBy, setSortBy] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")

    const [filter, setFilter] = useState<string>("")

    const [exportAPIQuery, setExportAPIQuery] = useState<string>("")

    useEffect(() => {
        const skip = pageIndex * pageSize
        const limit = pageSize
        const sort = sortBy ? `${sortBy}:${sortOrder}` : ""
        const query = `?skip=${skip}&limit=${limit}&sort=${sort}&filter=${filter}`

        fetchData(`${process.env.REACT_APP_API_HOST}/api/accounts${query}`)
            .then(res => {
                setAccountsData(res.data.accounts)
                setTotalRecords(res.data.totalRecords)
                setExportAPIQuery(`${process.env.REACT_APP_API_HOST}/api/accounts?filter=${filter}`)
            })
            .catch(err => console.error("Error fetching accounts data:", err))
    }, [pageIndex, pageSize, sortBy, sortOrder, filter])

    const columns = React.useMemo(() => [
        {
            id: "accounts",
            columns: [
                {
                    Header: headerLabels["country"],
                    id: "country",
                    accessor: "country"
                },
                {
                    Header: headerLabels["firstName"],
                    id: "firstName",
                    accessor: "firstName"
                },
                {
                    Header: headerLabels["lastName"],
                    id: "lastName",
                    accessor: "lastName"
                },
                {
                    Header: headerLabels["referredBy"],
                    id: "referredBy",
                    accessor: "referredBy"
                },
                {
                    Header: headerLabels["amount"],
                    id: "amount",
                    accessor: "amount"
                },
                {
                    Header: headerLabels["createdDate"],
                    id: "createdDate",
                    accessor: (row: IAccountDataRecord) => (
                        moment(row.createdDate).format("L")
                    ),
                },
                {
                    Header: headerLabels["dob"],
                    id: "dob",
                    accessor: (row: IAccountDataRecord) => (
                        moment(row.dob).format("L")
                    ),
                },
                {
                    Header: headerLabels["email"],
                    id: "email",
                    accessor: "email"
                },
                {
                    Header: headerLabels["mfa"],
                    id: "mfa",
                    accessor: "mfa"
                },
            ],
        }
    ], [])

    const exportHeaders = [
        { label: headerLabels["countryCode"], key: "countryCode" },
        { label: headerLabels["country"], key: "country" },
        { label: headerLabels["firstName"], key: "firstName" },
        { label: headerLabels["lastName"], key: "lastName" },
        { label: headerLabels["referredBy"], key: "referredBy" },
        { label: headerLabels["amount"], key: "amount" },
        { label: headerLabels["createdDate"], key: "createdDate" },
        { label: headerLabels["dob"], key: "dob" },
        { label: headerLabels["email"], key: "email" },
        { label: headerLabels["mfa"], key: "mfa" }
    ]

    return (
        <div className="table-container">
            <h3 className="mb-3">Accounts</h3>
            <div className="header-controls">
                <GlobalFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                <CSVExportButton
                    fileName="accounts.csv"
                    headers={exportHeaders}
                    apiQuery={exportAPIQuery}
                    exportDataPath="accounts"
                />
            </div>
            <Table
                columns={columns}
                data={accountsData}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            {
                accountsData.length > 0
                    ?   <Pagination
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                            totalRecords={totalRecords}
                        />
                    : <NoResults />
            }
        </div>
    )
}

export default AccountsTable