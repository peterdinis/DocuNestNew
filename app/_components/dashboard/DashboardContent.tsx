'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FC } from 'react';

const DashboardContent: FC = () => {
    return (
        <div className='mt-20 flex flex-1 justify-center align-top'>
            <div className='text-center'>
                <h2 className='prose-h2: prose mt-6 text-3xl font-extrabold text-gray-900 dark:text-sky-50'>
                    Welcome to DocuNest
                </h2>
                <p className='mt-2 text-sm font-bold text-gray-600 dark:text-sky-50'>
                    Get started by creating your first workspace. You can add
                    notes and invite collaborators to your workspace.
                </p>
                <div className='mt-8'>
                    <Button className='inline-flex items-center px-4 py-2'>
                        <Plus className='mr-2 h-5 w-5' />
                        Create Your First Workspace
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
