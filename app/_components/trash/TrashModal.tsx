"use client";

import useAllTrashWorkspaces from "@/app/_hooks/trash/useAllTrashWorkspaces";
import useClearTrash from "@/app/_hooks/trash/useClearTrash";
import useFindWorkspaceMember from "@/app/_hooks/workspace-mebers/useFindWorkspaceMember";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import type { FC } from "react";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import TrashWorkspaces from "./TrashWorkspaces";

const TrashModal: FC = () => {
	const clearTrashMutation = useClearTrash();

	const handleClearTrash = () => {
		clearTrashMutation.mutate();
	};

	const { data } = useAllTrashWorkspaces();

	const { data: memberData } = useFindWorkspaceMember();

	return (
		<>
			<Dialog>
				<DialogTrigger>Trash</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							<Header text={"Trash"} />
						</DialogTitle>
						<DialogDescription>
							<h5 className="prose-h5: prose mt-5 text-lg font-bold dark:text-white">
								Workspaces
							</h5>
							<div className="mt-3">
								<TrashWorkspaces />
							</div>
						</DialogDescription>
					</DialogHeader>

					{memberData?.findMemberInWorkspace?.role === "admin" ? (
						<Button
							onClick={handleClearTrash}
							disabled={
								!data?.trashWorkspaces || data?.trashWorkspaces.length === 0
							}
						>
							<Trash />
							{clearTrashMutation.isPending ? <Loading /> : "Delete all Trash"}
						</Button>
					) : (
						<></>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TrashModal;
