'use client';

import { fetchAllWorkspaceMessages } from '@/app/_store/queries/workspaceMessagesQueries';
import { useQuery } from '@tanstack/react-query';

interface Props {
    id: string;
}

const useAllWorkspaceMessages = ({ id }: Props) => {
    return useQuery({
        queryKey: ['workspaceMessages', id],
        queryFn: async () => {
            return await fetchAllWorkspaceMessages(id);
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useAllWorkspaceMessages;
