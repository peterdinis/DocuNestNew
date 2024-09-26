'use client';

import { fetchAllWorkspaceMembersForWorkspace } from '@/app/_store/queries/workspaeMemberQueries';
import { useQuery } from '@tanstack/react-query';

interface MemberProps {
    id: string;
}

const useDisplayWorkspaceMembers = ({ id }: MemberProps) => {
    return useQuery({
        queryKey: ['workspaceMembers', id],
        queryFn: async () => {
            return await fetchAllWorkspaceMembersForWorkspace(id);
        },
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export default useDisplayWorkspaceMembers;
