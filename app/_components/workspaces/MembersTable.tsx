import { FC } from "react";
import { GlobalTable } from "../shared/GlobalTable";
import { columns } from "./columns";

const MembersTable: FC = () => {
    return (
        <>
            <h4 className="ml-1 prose prose-h4: dark:text-sky-50">Members</h4>
            <div className="mt-1">
                <GlobalTable data={[]} columns={columns} />
            </div>
        </>
    )
}

export default MembersTable;