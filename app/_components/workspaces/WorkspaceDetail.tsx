"use client"

import { FC } from 'react';
import GlobalLayout from '../shared/GlobalLayout';
import Header from '../shared/Header';
import { useParams } from 'next/navigation';

const WorkspaceDetail: FC = () => {
    const {id} = useParams();
    return (
        <GlobalLayout>
            <div className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Workspace Detail`} />
                    <br />
                   <div className='mt-5'>
                        DETAIL
                        <div className='flex justify-end'>
                            Button
                        </div>
                   </div>
                   <div className='mt-5'>
                        MEMBERS TABLE
                   </div>

                   <div className='mt-10'>
                        DOCUMENTS TABLE
                   </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default WorkspaceDetail;
