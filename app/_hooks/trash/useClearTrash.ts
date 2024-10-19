'use client';

import { cleanTrash } from '@/app/_store/mutations/trashMutations';
import { queryClient } from '@/app/_store/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../shared/use-toast';

const useClearTrash = () => {
    const { toast } = useToast();

    return useMutation({
        mutationKey: ['clearTrash'],
        mutationFn: async () => {
            return await cleanTrash();
        },
        onSuccess: () => {
            toast({
                title: 'Trash was cleaned',
                duration: 2000,
                className: 'bg-green-800 text-white font-bold',
            });
            queryClient.invalidateQueries({
                queryKey: ['trashWorkspaces'],
            });
        },

        onError: () => {
            toast({
                title: 'Trash was not cleaned',
                duration: 2000,
                className: 'bg-red-800 text-white font-bold',
            });
        },
    });
};

export default useClearTrash;
