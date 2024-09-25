'use client';

import { allMyMemberWorkspaces } from '@/app/_store/queries/workspaeMemberQueries';
import { useQuery } from '@tanstack/react-query';

const useDisplayMyMemberWorkspaces = () => {
    return useQuery({
        queryKey: ['workspaceMembers'],
        queryFn: async () => {
            return await allMyMemberWorkspaces();
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useDisplayMyMemberWorkspaces;
