"use client";

import { updateDocumentWorkspace } from "@/app/_store/mutations/workspaceDocumentMutations";
import { queryClient } from "@/app/_store/queryClient";
import type { UpdateWorkspaceDocumentType } from "@/app/_types/workspaceDocumentTypes";
import type { WorkspaceDetailType } from "@/app/_types/workspaceTypes";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../shared/use-toast";

const useUpdateWorkspaceDocument = ({ id }: WorkspaceDetailType) => {
	const { toast } = useToast();
	return useMutation({
		mutationKey: ["updateWorkspaceDocument", id],
		mutationFn: async (data: UpdateWorkspaceDocumentType) => {
			return await updateDocumentWorkspace(id, data);
		},
		onSuccess: () => {
			toast({
				title: "Workspace document was updated",
				duration: 2000,
				className: "bg-green-800 text-white font-bold",
			});
			queryClient.invalidateQueries({
				queryKey: ["workspaceDocumentDetail", id],
			});
		},

		onError: () => {
			toast({
				title: "Workspace document was not updated",
				duration: 2000,
				className: "bg-red-800 text-white font-bold",
			});
		},
	});
};

export default useUpdateWorkspaceDocument;
