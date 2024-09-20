'use client';

import { fetchAllWorkspaceDocumentsForWorkspace } from '@/app/_store/queries/workspaceDocumentQueries';
import { useQuery } from '@tanstack/react-query';

interface Props {
    id: string;
}

const useAllWorkspaceDocuments = ({ id }: Props) => {
    return useQuery({
        queryKey: ['workspaceDocuments', id],
        queryFn: async () => {
            return await fetchAllWorkspaceDocumentsForWorkspace(id);
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useAllWorkspaceDocuments;
