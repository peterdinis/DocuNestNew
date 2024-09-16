'use client';

import { fetchAllPaginatedWorkspaces } from '@/app/_store/queries/workspaceQueries';
import { PaginatedWorkspace } from '@/app/_types/workspaceTypes';
import { useQuery } from '@tanstack/react-query';

const usePaginatedWorkspaces = ({ query, page }: PaginatedWorkspace) => {
    return useQuery({
        queryKey: ['myPaginatedWorkspaces', query, page],
        queryFn: () => fetchAllPaginatedWorkspaces({ query, page }),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default usePaginatedWorkspaces;
