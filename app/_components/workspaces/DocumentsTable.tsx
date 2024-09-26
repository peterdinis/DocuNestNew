import { FC } from 'react';
import { GlobalTable } from '../shared/GlobalTable';
import { documentColumns } from './columns';
import useAllWorkspaceDocuments from '@/app/_hooks/workspace-documents/useAllWorkspaceDocuments';
import Loading from '../shared/Loading';

interface IDocumentsTableProps {
    workspaceId: string;
}

const DocumentsTable: FC<IDocumentsTableProps> = ({ workspaceId }) => {
    const { data, isLoading, isError, error } = useAllWorkspaceDocuments({
        id: workspaceId,
    });

    const workspaceDocumentData = data?.[0]?.workspaceDocuments ?? [];

    if (isLoading) return <Loading />;

    if (isError) {
        const errorMessage = (error as Error)?.message || 'Something went wrong.';
        return (
            <p className='text-xl font-bold text-red-700'>
                {errorMessage}
            </p>
        );
    }
    return (
        <>
            <h4 className='prose-h4: prose ml-1 dark:text-sky-50'>
                Created Documents
            </h4>
            <div className='mt-1'>
                {workspaceDocumentData.length > 0 ? (
                    <GlobalTable
                        data={workspaceDocumentData}
                        columns={documentColumns}
                    />
                ) : (
                    <p className='text-center'>No documents available.</p>
                )}
            </div>
        </>
    );
};

export default DocumentsTable;
