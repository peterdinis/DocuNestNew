'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllWorkspaces } from '@/app/_store/queries/workspaceQueries';
import { useSession } from 'next-auth/react';

const useDisplayAllWorkspaces = () => {
    const {status} = useSession();
    return useQuery({
        queryKey: ['allWorkspaces'],
        queryFn: () => fetchAllWorkspaces(),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        enabled: status === "loading"  ? true : false
    });
};

export default useDisplayAllWorkspaces;
