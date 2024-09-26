import { FC } from 'react';

interface IUploadDocumentsTableProps {
    workspaceId: string;
}

const UploadDocumentsTable: FC<IUploadDocumentsTableProps> = ({
    workspaceId,
}) => {
    return (
        <>
            <h4 className='prose-h4: prose ml-1 dark:text-sky-50'>
                Uploaded Documents
            </h4>
            <div className='mt-1'>
                {/*   {workspaceDocumentData.length > 0 ? (
                    <GlobalTable
                        data={workspaceDocumentData}
                        columns={documentColumns}
                    />
                ) : (
                    <p className='text-center'>No documents available.</p>
                )} */}
            </div>
        </>
    );
};

export default UploadDocumentsTable;
