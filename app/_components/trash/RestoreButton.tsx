"use client";

import useRestoreWorkspaceFromTrash from "@/app/_hooks/trash/useRestoreWorkspaceFromTrash";
import { Button } from "@/components/ui/button";
import type { FC } from "react";
import Loading from "../shared/Loading";

type RestoreButtonProps = {
	id: string;
};

const RestoreButton: FC<RestoreButtonProps> = ({ id }) => {
	const restoreMutation = useRestoreWorkspaceFromTrash({ id });

	return (
		<Button
			onClick={() => restoreMutation.mutate()}
			disabled={restoreMutation.isPending}
			className="rounded-md px-4 py-2"
			variant={"secondary"}
			size={"sm"}
		>
			{restoreMutation.isPending ? <Loading /> : "Restore"}
		</Button>
	);
};

export default RestoreButton;
