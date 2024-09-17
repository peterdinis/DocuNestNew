import { FC } from "react";
import { GlobalTable } from "../shared/GlobalTable";
import { columns } from "./columns";

const DocumentsTable: FC = () => {
    return (
        <>
            <h4 className="ml-1 prose prose-h4: dark:text-sky-50">Documents</h4>
            <div className="mt-1">
                <GlobalTable data={[]} columns={columns} />
            </div>
        </>
    )
}

export default DocumentsTable;