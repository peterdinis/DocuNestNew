'use client';

import { restoreWorkspaceFromTrash } from '@/app/_store/mutations/trashMutations';
import { queryClient } from '@/app/_store/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type WorkspaceProps = {
    id: string;
};

const useRestoreWorkspaceFromTrash = ({ id }: WorkspaceProps) => {
    const { toast } = useToast();
    const router = useRouter();

    return useMutation({
        mutationKey: ['restoreTrash', id],
        mutationFn: async () => {
            return await restoreWorkspaceFromTrash(id);
        },
        onSuccess: () => {
            toast({
                title: 'Workspace was restore to trash',
                duration: 2000,
                className: 'bg-green-800 text-white font-bold',
            });
            router.push('/workspaces');
            queryClient.invalidateQueries({
                queryKey: ['trashWorkspaces'],
            });
        },

        onError: () => {
            toast({
                title: 'Workspace was not restore to trash',
                duration: 2000,
                className: 'bg-red-800 text-white font-bold',
            });
        },
    });
};

export default useRestoreWorkspaceFromTrash;
