'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC, useState, useEffect, ChangeEvent } from 'react';
import CreateNewWorkspaceModal from './CreateNewWorkspaceModal';
import { useDebounce } from '@/app/_hooks/shared/useDebounce';
import usePaginatedWorkspaces from '@/app/_hooks/workspaces/usePaginatedWorkspaces';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import Loading from '../shared/Loading';
import { WorkspacePaginationType } from '@/app/_types/workspaceTypes';
import AppPagination from '../shared/AppPagination';

const WorkspacesLists: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data, isLoading, isError, error, refetch } = usePaginatedWorkspaces(
        {
            query: debouncedSearchQuery,
            page: currentPage,
        },
    );

    useEffect(() => {
        refetch();
    }, [debouncedSearchQuery, currentPage, refetch]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        const errorMessage =
            (error as Error)?.message || 'Something went wrong.';
        return <p className='text-xl font-bold text-red-700'>{errorMessage}</p>;
    }

    const workspaces = data?.workspaces || [];
    const totalWorkspaces = data?.totalWorkspaces || 0;
    const workspacesPerPage = 6; // Adjust based on your API response
    const totalPages = Math.ceil(totalWorkspaces / workspacesPerPage);

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Card className='mb-6 mt-4'>
                <Input
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <CardHeader>
                    <CardTitle className='prose-h2: prose text-xl font-bold dark:text-white'>
                        My All Workspaces
                    </CardTitle>
                </CardHeader>

                <div className='float-right'>
                    <CreateNewWorkspaceModal />
                </div>
                <CardContent>
                    <div className='grid grid-cols-3 gap-4'>
                        {workspaces.length > 0 ? (
                            workspaces.map(
                                (workspace: WorkspacePaginationType) => (
                                    <motion.div
                                        key={workspace.id}
                                        className='rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg dark:bg-zinc-800'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={`/workspaces/${workspace.id}`}
                                        >
                                            <p className='text-2xl'>
                                                {workspace.workspaceEmoji}
                                            </p>
                                            <CardTitle className='prose-p: prose text-lg font-bold dark:text-white'>
                                                {workspace.name}
                                            </CardTitle>
                                            <CardTitle className='prose-p: prose text-sm text-gray-600 dark:text-white'>
                                                {workspace.description ||
                                                    'No description'}
                                            </CardTitle>
                                            <CardTitle className='text-xs text-gray-400 dark:text-white'>
                                                Created at:{' '}
                                                {new Date(
                                                    workspace.createdAt,
                                                ).toLocaleDateString()}
                                            </CardTitle>
                                        </Link>
                                    </motion.div>
                                ),
                            )
                        ) : (
                            <p className='col-span-3 text-center'>
                                No workspaces found.
                            </p>
                        )}
                    </div>
                    <div className='mt-6 flex justify-center'>
                        <AppPagination
                            hasNextPage={currentPage < totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default WorkspacesLists;
