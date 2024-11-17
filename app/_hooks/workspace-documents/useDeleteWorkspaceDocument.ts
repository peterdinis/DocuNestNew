"use client";

import { deleteWorkspaceDocument } from "@/app/_store/mutations/workspaceDocumentMutations";
import { queryClient } from "@/app/_store/queryClient";
import type { WorkspaceDetailType } from "@/app/_types/workspaceTypes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "../shared/use-toast";

const useDeleteWorkspaceDocument = ({ id }: WorkspaceDetailType) => {
	const { toast } = useToast();
	const router = useRouter();

	const workspaceDetailId = sessionStorage.getItem("WorkspaceId");

	return useMutation({
		mutationKey: ["deleteWorkspaceDocument", id],
		mutationFn: async () => {
			if (!id) throw new Error("Invalid workspace ID");
			return deleteWorkspaceDocument(id);
		},

		onSuccess: () => {
			toast({
				title: "Document was deleted",
				duration: 2000,
				className: "bg-green-800 text-white font-bold",
			});
			queryClient.invalidateQueries({
				queryKey: ["workspaceDocuments"],
			});

			router.push(`/workspaces/${workspaceDetailId}`);
		},

		onError: () => {
			toast({
				title: "Document was not deleted",
				duration: 2000,
				className: "bg-red-800 text-white font-bold",
			});
		},
	});
};

export default useDeleteWorkspaceDocument;
