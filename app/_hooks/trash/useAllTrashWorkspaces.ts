"use client";

import { allTrashWorkspaces } from "@/app/_store/queries/trashQueries";
import { useQuery } from "@tanstack/react-query";

const useAllTrashWorkspaces = () => {
	return useQuery({
		queryKey: ["trashWorkspaces"],
		queryFn: () => allTrashWorkspaces(),
		staleTime: Number.POSITIVE_INFINITY,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus: true,
		refetchOnMount: true,
	});
};

export default useAllTrashWorkspaces;
