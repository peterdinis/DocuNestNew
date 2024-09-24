'use client';

import { fetchAllDocuments } from '@/app/_store/queries/workspaceDocumentQueries';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

const useAllCountedWorkspaceDocuments = () => {
    const {status} = useSession();
    return useQuery({
        queryKey: ['workspaceCountedDocuments'],
        queryFn: async () => {
            return await fetchAllDocuments();
        },
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        enabled: status === "loading" ? true : false
    });
};

export default useAllCountedWorkspaceDocuments;
 