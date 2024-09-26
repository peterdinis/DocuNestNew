import { FC } from 'react';
import { GlobalTable } from '../shared/GlobalTable';
import { columns } from '../workspaces/columns';

const TrashWorkspaces: FC = () => {
    return (
        <>
            <GlobalTable data={[]} columns={columns} />
        </>
    );
};

export default TrashWorkspaces;
