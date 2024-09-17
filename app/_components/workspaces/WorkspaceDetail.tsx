'use client';

import { FC } from 'react';
import GlobalLayout from '../shared/GlobalLayout';
import Header from '../shared/Header';
import { useParams } from 'next/navigation';
import MembersTable from './MembersTable';
import DocumentsTable from './DocumentsTable';
import UpdateWorkspaceModal from './UpdateWorkspaceModal';
import useWorkspaceDetail from '@/app/_hooks/workspaces/useWorkspaceDetail';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import UploadDocumentToWorkspaceModal from './documents/UploadDocumentToWroskacpeModal';

const WorkspaceDetail: FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <p className='text-red-500'>Workspace ID is missing.</p>;
    }

    const { data, isLoading, isError } = useWorkspaceDetail({ id });

    if (isLoading) return <Loader2 className='h-8 w-8 animate-spin' />;

    if (isError) {
        return (
            <p className='prose font-bold text-red-800'>Something went wrong</p>
        );
    }

    return (
        <GlobalLayout>
            <div className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Workspace Detail`} />
                    <br />
                    <div className='mt-5'>
                        <span className='text-3xl'>{data.workspaceEmoji}</span>
                        <h2 className='prose-h2: prose text-2xl dark:text-sky-50'>
                            {data.name}
                        </h2>
                        <div className='prose-p: prose pt-5 dark:text-sky-50'>
                            Workspace was created at:{' '}
                            {format(data.createdAt, 'yyyy-MM-dd')}
                        </div>
                        <div className='flex justify-end'>
                            <UpdateWorkspaceModal />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <MembersTable />
                    </div>
                    <div className='mt-10'>
                        <div className='flex justify-end'>
                            <UploadDocumentToWorkspaceModal />
                        </div>
                        <DocumentsTable />
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default WorkspaceDetail;
