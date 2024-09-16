"use client"

import { FC } from 'react';
import GlobalLayout from '../shared/GlobalLayout';
import Header from '../shared/Header';
import { useParams } from 'next/navigation';
import MembersTable from './MembersTable';
import DocumentsTable from './DocumentsTable';
import UpdateWorkspaceModal from './UpdateWorkspaceModal';
import useWorkspaceDetail from '@/app/_hooks/workspaces/useWorkspaceDetail';
import { Loader2 } from 'lucide-react';

const WorkspaceDetail: FC = () => {
    
    const {id} = useParams();

    const { data, isLoading, isError } = useWorkspaceDetail({ id: Number(id) });

    if(isLoading) return <Loader2 className='animate-spin w-8 h-8' />

    if(isError) {
        return <p className='prose prose-p: font-bold text-red-800'>Something went wrong</p>
    }

    console.log("D", data);
    return (
        <GlobalLayout>
            <div className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Workspace Detail`} />
                    <br />
                   <div className='mt-5'>
                        DETAIL
                        <div className='flex justify-end'>
                            <UpdateWorkspaceModal />
                        </div>
                   </div>
                   <div className='mt-5'>
                        <MembersTable />
                   </div>

                   <div className='mt-10'>
                        <DocumentsTable />
                   </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default WorkspaceDetail;
