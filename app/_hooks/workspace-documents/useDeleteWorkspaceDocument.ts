'use client';

import { deleteWorkspaceDocument } from '@/app/_store/mutations/workspaceDocumentMutations';
import { WorkspaceDetailType } from '@/app/_types/workspaceTypes';
import { useQuery } from '@tanstack/react-query';

const useDeleteWorkspaceDocument = ({ id }: WorkspaceDetailType) => {
    return useQuery({
        queryKey: ['deleteWorkspaceDocument', id],
        queryFn: async () => {
            if (!id) throw new Error('Invalid workspace ID');
            return deleteWorkspaceDocument(id);
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useDeleteWorkspaceDocument;