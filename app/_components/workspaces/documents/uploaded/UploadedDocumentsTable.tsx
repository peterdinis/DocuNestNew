"use client"

import { GlobalTable } from '@/app/_components/shared/GlobalTable';
import Loading from '@/app/_components/shared/Loading';
import useDisplayAllUploadedDocuments from '@/app/_hooks/uploaded-documents/useDisplayAllUploadedDocuments';
import { FC } from 'react';
import { uploadedDocumentColumns } from './columns';

interface IUploadDocumentsTableProps {
    workspaceId: string;
}

const UploadDocumentsTable: FC<IUploadDocumentsTableProps> = ({
    workspaceId,
}) => {

    const {data, isLoading, isError, error} = useDisplayAllUploadedDocuments();

    if(isLoading) return <Loading />

    if (isError) {
        const errorMessage =
            (error as Error)?.message || 'Something went wrong.';
        return <p className='text-xl font-bold text-red-700'>{errorMessage}</p>;
    }

    return (
        <>
            <h4 className='prose-h4: prose ml-1 dark:text-sky-50'>
                Uploaded Documents
            </h4>
            <div className='mt-1'>
                 <GlobalTable data={data?.data?.allUploadedDocuments} columns={uploadedDocumentColumns} />
            </div>
        </>
    );
};

export default UploadDocumentsTable;
