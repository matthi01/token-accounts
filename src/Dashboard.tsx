import React from "react"
import data from "./assets/data/accounts.json"
import AccountsTable from "./components/AccountsTable/AccountsTable"

const Dashboard: React.FC = () => {
    // set up an api to handle fetching the data - then put it in the store (once the table is done)
    // useEffect(() => {
    //     console.log("useEffect fired")
    //     console.log(data)
    // }, [])

    return (
        <>
            <h2>Token Dashboard</h2>
            <AccountsTable data={data} />
        </>
    )
}

export default Dashboard