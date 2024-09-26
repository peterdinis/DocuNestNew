import { FC } from 'react';
import useAllWorkspaceDocuments from '@/app/_hooks/workspace-documents/useAllWorkspaceDocuments';
import Loading from '@/app/_components/shared/Loading';
import { GlobalTable } from '@/app/_components/shared/GlobalTable';
import { documentColumns } from '../../columns';


interface IUploadDocumentsTableProps {
    workspaceId: string;
}

const UploadDocumentsTable: FC<IUploadDocumentsTableProps> = ({ workspaceId }) => {
    const { data, isLoading, isError } = useAllWorkspaceDocuments({
        id: workspaceId,
    });

    const workspaceDocumentData = data?.[0]?.workspaceDocuments ?? [];

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <p className='prose-p: prose text-xl font-bold text-red-800'>
                Something went wrong
            </p>
        );

    return (
        <>
            <h4 className='prose-h4: prose ml-1 dark:text-sky-50'>Uploaded Documents</h4>
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

export default UploadDocumentsTable;
