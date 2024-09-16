"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC, useState, useEffect } from 'react';
import CreateNewWorkspaceModal from './CreateNewWorkspaceModal';
import { useDebounce } from '@/app/_hooks/shared/useDebounce';
import usePaginatedWorkspaces from '@/app/_hooks/workspaces/usePaginatedWorkspaces';
import { Loader2 } from 'lucide-react';
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink
} from '@/components/ui/pagination';
import { WorkspacePaginationType } from '@/app/_types/workspaceTypes';

const WorkspacesLists: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, isLoading, isError, refetch } = usePaginatedWorkspaces({
    query: debouncedSearchQuery,
    page: currentPage,
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

  const totalPages = data?.totalPages || 1;
  const workspaces = data?.workspaces || [];

  return (
    <>
      <Card className='mb-6 mt-4'>
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
              workspaces.map((workspace: WorkspacePaginationType) => (
                <div
                  key={workspace.id}
                  className='p-4 border rounded-lg bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition'
                >
                  <p className='text-2xl'>{workspace.workspaceEmoji}</p>
                  <p className='font-bold text-lg prose prose-p: dark:text-white'>{workspace.name}</p>
                  <p className='text-sm text-gray-600 dark:text-white prose prose-p:'>
                    {workspace.description || 'No description'}
                  </p>
                  <p className='text-xs text-gray-400 dark:text-white'>
                    Created at: {new Date(workspace.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className='col-span-3 text-center'>No workspaces found.</p>
            )}
          </div>
            <div className='mt-6 flex justify-center'>
              <Pagination>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationNext
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WorkspacesLists;