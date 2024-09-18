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
import { Loader2, Plus } from 'lucide-react';
import { format } from 'date-fns';
import AddNewMemberToWorkspaceModal from './members/AddNewMemberToWorkspaceModal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UploadDocumentToWorkspaceModal from './documents/UploadDocumentToWroskacpeModal';
import CreateDocumentModal from './documents/CreateDocumentModal';

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
                        <MembersTable />
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center justify-end space-x-4'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <UploadDocumentToWorkspaceModal />
                                        <TooltipContent>
                                            Upload document to workspace
                                        </TooltipContent>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                            <div className='flex items-center'>
                               <CreateDocumentModal />
                            </div>
                        </div>
                        <DocumentsTable />
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default WorkspaceDetail;