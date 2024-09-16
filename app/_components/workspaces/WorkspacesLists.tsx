"use client"

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC, useState, useEffect } from 'react';
import CreateNewWorkspaceModal from './CreateNewWorkspaceModal';
import { useDebounce } from '@/app/_hooks/shared/useDebounce';
import usePaginatedWorkspaces from '@/app/_hooks/workspaces/usePaginatedWorkspaces';
import { Loader2 } from 'lucide-react';

const WorkspacesLists: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const {data, isLoading, isError, refetch} = usePaginatedWorkspaces({
        query: debouncedSearchQuery,
        page: currentPage
    });

    useEffect(() => {
        refetch();
    }, [debouncedSearchQuery, currentPage, refetch]);

    if (isLoading) {
        return <Loader2 className='animate-spin w-8 h-8' />;
    }

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    console.log("D", data);
    
    return (
        <>
            <Card className='mb-6 mt-4'>
                <CardHeader>
                    <CardTitle className='prose-h2: prose text-xl font-bold'>
                        My all Workspaces
                    </CardTitle>
                </CardHeader>
                
                <div className='float-right'>
                    <CreateNewWorkspaceModal />
                </div>
                <CardContent>
                    <div className='grid grid-cols-3 gap-4 text-center'>
                        Display data
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default WorkspacesLists;
