import { FC } from 'react';
import { GlobalTable } from '../shared/GlobalTable';
import { documentColumns } from './columns';
import useAllWorkspaceDocuments from '@/app/_hooks/workspace-documents/useAllWorkspaceDocuments';
import { Loader2 } from 'lucide-react';

interface IDocumentsTableProps {
    workspaceId: string;
}

const DocumentsTable: FC<IDocumentsTableProps> = ({ workspaceId }) => {
    const { data, isLoading, isError } = useAllWorkspaceDocuments({
        id: workspaceId,
    });
    
    const workspaceDocumentData = data?.[0]?.workspaceDocuments ?? [];

    if (isLoading) return <Loader2 className="animate-spin w-8 h-8" />;

    if (isError) return <p className="text-red-800 prose prose-p: font-bold text-xl">Something went wrong</p>;

    return (
        <>
            <h4 className="prose-h4: prose ml-1 dark:text-sky-50">Documents</h4>
            <div className="mt-1">
                {workspaceDocumentData.length > 0 ? (
                    <GlobalTable data={workspaceDocumentData} columns={documentColumns} />
                ) : (
                    <p className="text-center">No documents available.</p>
                )}
            </div>
        </>
    );
};

export default DocumentsTable;