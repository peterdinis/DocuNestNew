import { FC } from 'react';
import { GlobalTable } from '../shared/GlobalTable';
import { columns } from '../workspaces/columns';

const TrashDocuments: FC = () => {
    return (
        <>
            <GlobalTable data={[]} columns={columns} />
        </>
    );
};

export default TrashDocuments;
