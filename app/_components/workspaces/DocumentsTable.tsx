import { FC } from 'react';
import { GlobalTable } from '../shared/GlobalTable';
import { documentColumns } from './columns';
import useAllWorkspaceDocuments from '@/app/_hooks/workspace-documents/useAllWorkspaceDocuments';
import { Loader2 } from 'lucide-react';

interface IDocumentsTableProps {
    workspaceId: string;
}

const DocumentsTable: FC<IDocumentsTableProps> = ({workspaceId}: IDocumentsTableProps) => {
    
    const {data, isLoading, isError} = useAllWorkspaceDocuments({
        id: workspaceId
    });

    console.log("D", data)

    if(isLoading) return <Loader2 className='animate-spin w-8 h-8' />
    
    if(isError) return <p className='text-red-800 prose prose-p: font-bold text-xl'>Something went wrongs</p>

    return (
        <>
            <h4 className='prose-h4: prose ml-1 dark:text-sky-50'>Documents</h4>
            <div className='mt-1'>
                <GlobalTable data={data} columns={documentColumns} />
            </div>
        </>
    );
};

export default DocumentsTable;
