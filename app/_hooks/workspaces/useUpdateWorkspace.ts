"use client";

import { updateWorkspace } from "@/app/_store/mutations/workspaceMutations";
import { queryClient } from "@/app/_store/queryClient";
import type { UpdateWorkspaceType } from "@/app/_types/workspaceTypes";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../shared/use-toast";

type UpdateWorkspaceProps = {
	id: string;
};

const useUpdateWorkspace = ({ id }: UpdateWorkspaceProps) => {
	const { toast } = useToast();
	return useMutation({
		mutationKey: ["updateWorkspace", id],
		mutationFn: async (data: UpdateWorkspaceType) => {
			return await updateWorkspace(id, data);
		},
		onSuccess: () => {
			toast({
				title: "Workspace was updated",
				duration: 2000,
				className: "bg-green-800 text-white font-bold",
			});
			queryClient.invalidateQueries({
				queryKey: ["myPaginatedWorkspaces"],
			});
		},

		onError: () => {
			toast({
				title: "Workspace was not updated",
				duration: 2000,
				className: "bg-red-800 text-white font-bold",
			});
		},
	});
};

export default useUpdateWorkspace;
