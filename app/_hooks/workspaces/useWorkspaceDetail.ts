'use client';

import { fetchWorkspaceDetail } from '@/app/_store/queries/workspaceQueries';
import { WorkspaceDetailType } from '@/app/_types/workspaceTypes';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceDetail = ({id}: WorkspaceDetailType) => {
    return useQuery({
        queryKey: ['workspaceDetail', id],
        queryFn: () => fetchWorkspaceDetail(id),
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useWorkspaceDetail;
