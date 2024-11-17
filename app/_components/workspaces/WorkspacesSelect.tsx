"use client";

import useDisplayAllWorkspaces from "@/app/_hooks/workspaces/useDisplayAllWorkspaces";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type FC, useMemo } from "react";
import Loading from "../shared/Loading";

const WorkspacesSelect: FC<{ onChange: (value: string) => void }> = ({
	onChange,
}) => {
	const { data, isLoading, isError, error } = useDisplayAllWorkspaces();

	const allWorkspaces = useMemo(() => data?.workspaces, [data?.workspaces]);

	if (isLoading) return <Loading />;

	if (isError) {
		const errorMessage = (error as Error)?.message || "Something went wrong.";
		return <p className="text-xl font-bold text-red-700">{errorMessage}</p>;
	}

	return (
		<Select onValueChange={onChange}>
			<SelectTrigger className="mt-5 w-[470px]">
				<SelectValue placeholder="Select Workspace" />
			</SelectTrigger>
			<SelectContent>
				{allWorkspaces?.map((item: { id: string; name: string }) => (
					<SelectItem key={item.id} value={item.id}>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default WorkspacesSelect;
