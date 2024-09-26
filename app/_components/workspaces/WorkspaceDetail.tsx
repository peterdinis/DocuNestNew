'use client';

import { FC } from 'react';
import GlobalLayout from '../shared/GlobalLayout';
import Header from '../shared/Header';
import { useParams } from 'next/navigation';
import MembersTable from './MembersTable';
import DocumentsTable from './DocumentsTable';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import useWorkspaceDetail from '@/app/_hooks/workspaces/useWorkspaceDetail';
import { format } from 'date-fns';
import AddNewMemberToWorkspaceModal from './members/AddNewMemberToWorkspaceModal';
import UploadDocumentToWorkspaceModal from './documents/UploadDocumentToWroskacpeModal';
import CreateDocumentModal from './documents/CreateDocumentModal';
import Loading from '../shared/Loading';
import UploadedDocumentsTable from './documents/uploaded/UploadedDocumentsTable';
import UploadedDocumentModal from './documents/uploaded/UploadedDocumentModal';

const WorkspaceDetail: FC = () => {
    const { id } = useParams<{ id: string }>();

    sessionStorage.setItem('WorkspaceId', id);

    const { data, isLoading, isError, error } = useWorkspaceDetail({ id });

    if (!id) {
        return <p className='text-red-500'>Workspace ID is missing.</p>;
    }

    if (isLoading) return <Loading />;

    if (isError) {
        const errorMessage =
            (error as Error)?.message || 'Something went wrong.';
        return <p className='text-xl font-bold text-red-700'>{errorMessage}</p>;
    }

    return (
        <GlobalLayout>
            <div className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Workspace Detail`} />
                    <br />
                    <div className='mt-5'>
                        <span className='text-6xl'>{data.workspaceEmoji}</span>
                        <h2 className='break-all text-left text-xl dark:text-sky-50 sm:text-2xl md:text-center md:text-3xl lg:text-4xl'>
                            {data.name}
                        </h2>
                        <div className='prose-p: prose pt-5 dark:text-sky-50'>
                            Workspace was created at:{' '}
                            {format(data.createdAt, 'yyyy-MM-dd')}
                        </div>
                        <div className='flex justify-end'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <AddNewMemberToWorkspaceModal />
                                        <TooltipContent>
                                            Add new member to workspace
                                        </TooltipContent>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <MembersTable workspaceId={id} />
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center justify-end space-x-4'>
                            <div className='flex items-center'>
                                <CreateDocumentModal workspaceId={id} />
                            </div>
                        </div>
                        <DocumentsTable workspaceId={id} />
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center justify-end space-x-4'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <UploadedDocumentModal />
                                        <TooltipContent>
                                            Upload custom document
                                        </TooltipContent>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <UploadedDocumentsTable workspaceId={id} />
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default WorkspaceDetail;
