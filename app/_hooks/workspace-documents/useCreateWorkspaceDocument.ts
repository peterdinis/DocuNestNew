'use client';

import { newDocumentWorkspace } from '@/app/_store/mutations/workspaceDocumentMutations';
import { queryClient } from '@/app/_store/queryClient';
import { WorkspaceDocumentType } from '@/app/_types/workspaceDocumentTypes';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

const useCreateWorkspaceDocument = () => {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ['newWorkspaceDocument'],
        mutationFn: async (data: WorkspaceDocumentType) => {
            return await newDocumentWorkspace(data);
        },
        onSuccess: () => {
            toast({
                title: 'New workspace document was created',
                duration: 2000,
                className: 'bg-green-800 text-white font-bold',
            });
            queryClient.invalidateQueries({
                queryKey: ['workspaceDetail'],
            });
        },

        onError: () => {
            toast({
                title: 'New workspace document was not created',
                duration: 2000,
                className: 'bg-red-800 text-white font-bold',
            });
        },
    });
};

export default useCreateWorkspaceDocument;
