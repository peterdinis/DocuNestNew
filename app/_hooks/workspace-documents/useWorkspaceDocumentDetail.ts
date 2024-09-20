'use client';

import { fetchWorkspaceDocument } from '@/app/_store/queries/workspaceDocumentQueries';
import { WorkspaceDetailType } from '@/app/_types/workspaceTypes';
import { useQuery } from '@tanstack/react-query';

const useWorkspaceDocumentDetail = ({ id }: WorkspaceDetailType) => {
    return useQuery({
        queryKey: ['workspaceDocumentDetail', id],
        queryFn: async () => {
            if (!id) throw new Error('Invalid workspace ID');
            return fetchWorkspaceDocument(id);
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useWorkspaceDocumentDetail;
