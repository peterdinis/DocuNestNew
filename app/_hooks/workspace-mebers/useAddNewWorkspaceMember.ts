"use client";

import { addNewMemberToWorkspace } from "@/app/_store/mutations/workspaceMemberMutation";
import { queryClient } from "@/app/_store/queryClient";
import type { WorkspaceMemberType } from "@/app/_types/workspaceTypes";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../shared/use-toast";

const useAddNewWorkspaceMember = () => {
	const { toast } = useToast();
	return useMutation({
		mutationKey: ["newWorkspaceMember"],
		mutationFn: async (data: WorkspaceMemberType) => {
			return await addNewMemberToWorkspace(data);
		},
		onSuccess: () => {
			toast({
				title: "New member was added to workspace",
				duration: 2000,
				className: "bg-green-800 text-white font-bold",
			});
			queryClient.invalidateQueries({
				queryKey: ["workspaceDocuments"],
			});
		},

		onError: () => {
			toast({
				title: "New member was not added to workspace",
				duration: 2000,
				className: "bg-red-800 text-white font-bold",
			});
		},
	});
};

export default useAddNewWorkspaceMember;
