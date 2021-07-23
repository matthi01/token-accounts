import moment from "moment"
import React, { useState } from "react"
import Table, { IDataRecord } from "../Table/Table"
import countryCodes from "../../assets/countryCodes/countryCodes.json"
import { headerLabels } from "./constants"
import { Row } from "react-table"
import axios from "axios"
import { useEffect } from "react"
import ConditionalRender from "../ConditionalRender"

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

type CountryCode = keyof typeof countryCodes

const getAccounts = async (url: string) => {
    const data = await axios.get(url)
    return data
}

const AccountsTable: React.FC<IProps> = (props) => {
    const [accountsData, setAccountsData] = useState([])

    useEffect(() => {
        getAccounts(`${process.env.REACT_APP_API_HOST}/api/accounts`)
            .then(res => {
                setAccountsData(res.data)
            })
            .catch(err => console.error("Error fetching accounts data:", err))
    }, [])

    const columns = React.useMemo(() => [
        {
            id: "accounts",
            columns: [
                {
                    Header: headerLabels["country"],
                    id: "country",
                    accessor: (row: IAccountDataRecord) => {
                        const code = row.country as CountryCode
                        return countryCodes[code] || code
                    }
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

    const headers = [
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

    const accountDataFormatting = (rows: Row<{}>[]) => {
        return rows.map(record => {
            const row = record.original as IAccountDataRecord
            row.dob = moment(row.dob).format("L")
            row.createdDate = moment(row.createdDate).format("L")
            return row
        })
    }

    const exportConfig = {
        fileName: "accounts.csv",
        headers: headers,
        dataFormattingCallback: accountDataFormatting
    }

    return (
        <ConditionalRender render={accountsData.length > 0}>
            <Table title="Accounts" columns={columns} data={accountsData} exportConfig={exportConfig}/>
        </ConditionalRender>
    )
}

export default AccountsTable