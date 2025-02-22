"use client";

import useMoveWorkspaceToTrash from "@/app/_hooks/trash/useMoveWorkspaceToTrash";
import useFindWorkspaceMember from "@/app/_hooks/workspace-mebers/useFindWorkspaceMember";
import useWorkspaceDetail from "@/app/_hooks/workspaces/useWorkspaceDetail";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React, { type FC } from "react";
import GlobalLayout from "../shared/GlobalLayout";
import Header from "../shared/Header";
import Loading from "../shared/Loading";
import TooltipWrapper from "../shared/TooltipWrapper";
import DocumentsTable from "./DocumentsTable";
import MembersTable from "./MembersTable";
import UpdateWorkspaceModal from "./UpdateWorkspaceModal";
import CreateDocumentModal from "./documents/CreateDocumentModal";
import UploadedDocumentModal from "./documents/uploaded/UploadedDocumentModal";
import UploadedDocumentsTable from "./documents/uploaded/UploadedDocumentsTable";
import AddNewMemberToWorkspaceModal from "./members/AddNewMemberToWorkspaceModal";
import UpdatePermissionModal from "./permissions/UpdatePermissionModal";

const WorkspaceDetail: FC = () => {
	const { id } = useParams<{ id: string }>();
	const {
		data: memberData,
		isLoading: memberLoading,
		error: memberError,
	} = useFindWorkspaceMember();

	sessionStorage.setItem("WorkspaceId", id);

	const { data, isLoading, isError, error } = useWorkspaceDetail({ id });
	const moveWorkspaceToTrash = useMoveWorkspaceToTrash({ id });

	if (!id) {
		return <p className="text-red-500">Workspace ID is missing.</p>;
	}

	if (isLoading || memberLoading) return <Loading />;

	if (isError || memberError) {
		const errorMessage = (error as Error)?.message || "Something went wrong.";
		return <p className="text-xl font-bold text-red-700">{errorMessage}</p>;
	}

	return (
		<GlobalLayout>
			<div className="flex-1 overflow-auto p-8">
				<div className="mx-auto max-w-4xl">
					<Header text={`Workspace Detail`} />
					<div className="float-right">
						<TooltipWrapper
							triggerChildren={
								<>
									<UpdateWorkspaceModal workspaceId={id} />
								</>
							}
							contentText={"Update Workspace"}
						/>
					</div>
					<br />
					<div className="mt-5">
						<span className="text-6xl">{data.workspaceEmoji}</span>
						<h2 className="mt-5 break-all text-left text-xl dark:text-sky-50 sm:text-2xl md:text-center md:text-3xl lg:text-4xl">
							{data.name}
						</h2>
						<p className="prose-p: prose mt-4 font-bold dark:text-white">
							{data.description}
						</p>
						<div className="prose-p: prose pt-5 dark:text-sky-50">
							Workspace was created at: {format(data.createdAt, "yyyy-MM-dd")}
						</div>
						<div className="flex justify-end space-x-4">
							<TooltipWrapper
								triggerChildren={
									<>
										<UpdatePermissionModal workspaceId={id} />
									</>
								}
								contentText="Update permission for user"
							/>

							<TooltipWrapper
								triggerChildren={
									<>
										{memberData.findMemberInWorkspace?.role === "admin" && (
											<AddNewMemberToWorkspaceModal />
										)}
									</>
								}
								contentText="Add new member to workspace"
							/>

							<TooltipWrapper
								triggerChildren={
									<>
										{memberData.findMemberInWorkspace?.role === "admin" ? (
											<Button
												variant={"ghost"}
												onClick={() => moveWorkspaceToTrash.mutate()}
												className="flex items-center justify-center rounded-md p-2 text-red-600"
											>
												<Trash className="h-6 w-6" />
											</Button>
										) : (
											<></>
										)}
									</>
								}
								contentText="Move workspace to trash"
							/>
						</div>
					</div>
					<div className="mt-5">
						<MembersTable workspaceId={id} />
					</div>
					<div className="mt-10">
						<div className="flex items-center justify-end space-x-4">
							<div className="flex items-center">
								<CreateDocumentModal workspaceId={id} />
							</div>
						</div>
						<DocumentsTable workspaceId={id} />
					</div>
					<div className="mt-10">
						<div className="flex items-center justify-end space-x-4">
							<TooltipWrapper
								triggerChildren={
									<>
										{memberData?.findMemberInWorkspace?.role === "admin" && (
											<UploadedDocumentModal />
										)}
									</>
								}
								contentText="Upload custom document"
							/>
						</div>
						<UploadedDocumentsTable workspaceId={id} />
					</div>
				</div>
			</div>
		</GlobalLayout>
	);
};

export default WorkspaceDetail;
