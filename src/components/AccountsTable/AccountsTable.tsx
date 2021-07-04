import moment from "moment"
import React from "react"
import { isNull } from "../../helpers/helpers"
import Table from "../Table/Table"
import countryCodes from "../../assets/countryCodes/countryCodes.json"
import { headerLabels } from "./constants"

export interface IAccountDataRecord {
    Country: string
    "First Name": string
    "Last Name": string
    ReferredBy: string | null
    amt: number
    createdDate: string
    dob: string
    email: string
    mfa: string | null
}

interface IProps {
    data: IAccountDataRecord[]
}

type CountryCode = keyof typeof countryCodes

const AccountsTable: React.FC<IProps> = (props) => {
    const columns = React.useMemo(() => [
        {
            // Header: "Accounts",
            id: "accounts",
            columns: [
                {
                    Header: headerLabels["Country"],
                    id: "Country",
                    accessor: (row: IAccountDataRecord) => {
                        const code = row.Country as CountryCode
                        return countryCodes[code] || code
                    }
                },
                {
                    Header: headerLabels["First Name"],
                    id: "First Name",
                    accessor: "First Name"
                },
                {
                    Header: headerLabels["Last Name"],
                    id: "Last Name",
                    accessor: "Last Name"
                },
                {
                    Header: headerLabels["ReferredBy"],
                    id: "ReferredBy",
                    accessor: "ReferredBy"
                },
                {
                    Header: headerLabels["amt"],
                    id: "amt",
                    accessor: "amt"
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
                    accessor: (row: IAccountDataRecord) => (
                        isNull(row.mfa) ? "" : row.mfa
                    )
                },
            ],
        }
    ], [])

    return <Table columns={columns} data={props.data} />
}

export default AccountsTable