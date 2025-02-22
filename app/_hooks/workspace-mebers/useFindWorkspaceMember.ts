"use client";

import { findMemberInWorkspace } from "@/app/_store/queries/workspaeMemberQueries";
import { useQuery } from "@tanstack/react-query";

const useFindWorkspaceMember = () => {
	return useQuery({
		queryKey: ["findWorkspaceMember"],
		queryFn: async () => {
			return await findMemberInWorkspace();
		},
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default useFindWorkspaceMember;
