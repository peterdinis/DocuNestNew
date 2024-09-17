'use client';

import { fetchWorkspaceDetail } from '@/app/_store/queries/workspaceQueries';
import { WorkspaceDetailType } from '@/app/_types/workspaceTypes';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceDetail = ({ id }: WorkspaceDetailType) => {
    return useQuery({
        queryKey: ['workspaceDetail', id],
        queryFn: async () => {
            if (!id) throw new Error('Invalid workspace ID');
            return fetchWorkspaceDetail(id);
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useWorkspaceDetail;
