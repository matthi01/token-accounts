import React from "react"
import AccountsTable from "./AccountsTable/AccountsTable"
import InfoBlock from "./InfoBlock"

const Dashboard: React.FC = () => {
    return (
        <>
            <InfoBlock 
                title="Description of Token" 
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate arcu purus, in dapibus mi mattis non. Nulla condimentum lorem turpis, nec lobortis ex placerat at. Mauris pellentesque lacus felis, ut finibus lacus egestas ac. Donec nec leo libero. Maecenas et ipsum sit amet nunc vestibulum dignissim. Donec hendrerit dui." 
            />
            <AccountsTable />
        </>
    )
}

export default Dashboard