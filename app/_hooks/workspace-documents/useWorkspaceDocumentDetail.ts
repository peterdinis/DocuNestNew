"use client";

import { fetchWorkspaceDocument } from "@/app/_store/queries/workspaceDocumentQueries";
import type { WorkspaceDetailType } from "@/app/_types/workspaceTypes";
import { useQuery } from "@tanstack/react-query";

const useWorkspaceDocumentDetail = ({ id }: WorkspaceDetailType) => {
	return useQuery({
		queryKey: ["workspaceDocumentDetail", id],
		queryFn: async () => {
			if (!id) throw new Error("Invalid workspace ID");
			return fetchWorkspaceDocument(id);
		},
		staleTime: Number.POSITIVE_INFINITY,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default useWorkspaceDocumentDetail;
