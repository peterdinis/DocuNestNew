'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllWorkspaces } from '@/app/_store/queries/workspaceQueries';

const useDisplayAllWorkspaces = () => {
    return useQuery({
        queryKey: ['allWorkspaces'],
        queryFn: () => fetchAllWorkspaces(),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export default useDisplayAllWorkspaces;
