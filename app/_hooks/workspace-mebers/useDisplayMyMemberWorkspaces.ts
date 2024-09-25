'use client';

import { allMyMemberWorkspaces } from '@/app/_store/queries/workspaeMemberQueries';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useDisplayMyMemberWorkspaces = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);

    const query = useQuery({
        queryKey: ['workspaceMembers', currentPage, limit],
        queryFn: () => allMyMemberWorkspaces(currentPage, limit),
        staleTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    return {
        ...query,
        currentPage,
        setCurrentPage,
    };
};

export default useDisplayMyMemberWorkspaces;
