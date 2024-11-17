"use client";

import { fetchWorkspaceDetail } from "@/app/_store/queries/workspaceQueries";
import type { WorkspaceDetailType } from "@/app/_types/workspaceTypes";
import { useQuery } from "@tanstack/react-query";

const useWorkspaceDetail = ({ id }: WorkspaceDetailType) => {
	return useQuery({
		queryKey: ["workspaceDetail", id],
		queryFn: async () => {
			if (!id) throw new Error("Invalid workspace ID");
			return fetchWorkspaceDetail(id);
		},
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default useWorkspaceDetail;
