"use client"

import { FC, useMemo } from 'react';
import { GlobalTable } from '../shared/GlobalTable';
import { columns } from '../workspaces/columns';
import useAllTrashWorkspaces from '@/app/_hooks/trash/useAllTrashWorkspaces';
import Loading from '../shared/Loading';

const TrashWorkspaces: FC = () => {
    const { data, isLoading, isError, error } = useAllTrashWorkspaces();

    const trashWorkspacesData = useMemo(() => data?.trashWorkspaces ?? [], [data?.trashWorkspaces]);

    if (isLoading) return <Loading />;

    if (isError) {
        const errorMessage =
            (error as Error)?.message || 'Something went wrong.';
        return <p className='text-xl font-bold text-red-700'>{errorMessage}</p>;
    }
    
    console.log("D", data);

    return (
        <>
            <GlobalTable data={trashWorkspacesData} columns={columns} />
        </>
    );
};

export default TrashWorkspaces;