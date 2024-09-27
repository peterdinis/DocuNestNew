'use client';

import { moveWorkspaceToTrash } from '@/app/_store/mutations/trashMutations';
import { queryClient } from '@/app/_store/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

type WorkspaceProps = {
    id: string;
};

const useMoveWorkspaceToTrash = ({ id }: WorkspaceProps) => {
    const { toast } = useToast();
    return useMutation({
        mutationKey: ['moveToTrash', id],
        mutationFn: async () => {
            return await moveWorkspaceToTrash(id);
        },
        onSuccess: () => {
            toast({
                title: 'Workspace was moved to trash',
                duration: 2000,
                className: 'bg-green-800 text-white font-bold',
            });
            queryClient.invalidateQueries({
                queryKey: ['trashWorkspaces'],
            });
        },

        onError: () => {
            toast({
                title: 'Workspace was not moved to trash',
                duration: 2000,
                className: 'bg-red-800 text-white font-bold',
            });
        },
    });
};

export default useMoveWorkspaceToTrash;
