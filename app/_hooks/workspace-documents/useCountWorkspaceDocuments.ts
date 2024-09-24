'use client';

import { fetchAllDocuments } from '@/app/_store/queries/workspaceDocumentQueries';
import { useQuery } from '@tanstack/react-query';

const useAllCountedWorkspaceDocuments = () => {
    return useQuery({
        queryKey: ['workspaceCountedDocuments'],
        queryFn: async () => {
            return await fetchAllDocuments();
        },
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true
    });
};

export default useAllCountedWorkspaceDocuments;
 