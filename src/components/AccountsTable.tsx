import moment from "moment"
import React from "react"
import { isNull } from "../helpers/helpers"
import Table from "./Table/Table"
import countryCodes from "../assets/countryCodes/countryCodes.json"

interface IAccountDataRecord {
    Country?: string
    "First Name"?: string
    "Last Name"?: string
    "ReferencedBy"?: string
    amt?: number
    createdDate?: string
    dob?: string
    email?: string
    mfa?: string
}

interface IProps {
    data: IAccountDataRecord[]
}

type CountryCode = keyof typeof countryCodes

const AccountsTable: React.FC<IProps> = (props) => {
    const columns = React.useMemo(() => [
        {
            Header: "Accounts",
            columns: [
                {
                    Header: 'Country',
                    id: 'Country',
                    accessor: (row: IAccountDataRecord) => {
                        const code = row.Country as CountryCode
                        return countryCodes[code] || code
                    }
                },
                {
                    Header: 'First Name',
                    id: 'First Name',
                    accessor: 'First Name'
                },
                {
                    Header: 'Last Name',
                    id: 'Last Name',
                    accessor: 'Last Name'
                },
                {
                    Header: 'Referred By',
                    id: 'ReferredBy',
                    accessor: 'ReferredBy'
                },
                {
                    Header: 'Amount',
                    id: "amt",
                    accessor: 'amt'
                },
                {
                    Header: 'Created',
                    id: 'createdDate',
                    accessor: (row: IAccountDataRecord) => (
                        moment(row.createdDate).format("L")
                    ),
                },
                {
                    Header: 'Date of Birth',
                    id: 'dob',
                    accessor: (row: IAccountDataRecord) => (
                        moment(row.dob).format("L")
                    ),
                },
                {
                    Header: 'Email',
                    id: 'email',
                    accessor: 'email'
                },
                {
                    Header: 'MFA',
                    id: 'mfa',
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