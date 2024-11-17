"use client";

import useAllTrashWorkspaces from "@/app/_hooks/trash/useAllTrashWorkspaces";
import { type FC, useMemo } from "react";
import { GlobalTable } from "../shared/GlobalTable";
import Loading from "../shared/Loading";
import { trashColumns } from "../workspaces/columns";
import RestoreButton from "./RestoreButton";

const TrashWorkspaces: FC = () => {
	const { data, isLoading, isError, error } = useAllTrashWorkspaces();

	const trashWorkspacesData = useMemo(
		() => data?.trashWorkspaces ?? [],
		[data?.trashWorkspaces],
	);

	if (isLoading) return <Loading />;

	if (isError) {
		const errorMessage = (error as Error)?.message || "Something went wrong.";
		return <p className="text-xl font-bold text-red-700">{errorMessage}</p>;
	}

	return (
		<>
			{trashWorkspacesData.length > 0 ? (
				<GlobalTable
					data={trashWorkspacesData.map(
						(workspace: { id: { toString: () => string } }) => ({
							...workspace,
							restore: <RestoreButton id={workspace.id.toString()} />,
						}),
					)}
					columns={[...trashColumns]}
				/>
			) : (
				<p className="text-base font-bold">No workspaces in trash</p>
			)}
		</>
	);
};

export default TrashWorkspaces;
