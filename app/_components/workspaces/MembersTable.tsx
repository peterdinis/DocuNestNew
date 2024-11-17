import useDisplayWorkspaceMembers from "@/app/_hooks/workspace-mebers/useDisplayWorkspaceMembers";
import { type FC, useMemo } from "react";
import { GlobalTable } from "../shared/GlobalTable";
import Loading from "../shared/Loading";
import { columns } from "./columns";

interface IMemberTableProps {
	workspaceId: string;
}

type Member = {
	user: {
		name: string;
		email: string;
	};
	role: string;
};

const MembersTable: FC<IMemberTableProps> = ({
	workspaceId,
}: IMemberTableProps) => {
	const { data, isLoading, isError, error } = useDisplayWorkspaceMembers({
		id: workspaceId,
	});

	const membersData = useMemo(() => {
		return (
			data?.[0]?.members?.map((member: Member) => ({
				name: member.user.name,
				email: member.user.email,
				role: member.role,
			})) ?? []
		);
	}, [data]);

	if (isLoading) return <Loading />;

	if (isError) {
		const errorMessage = (error as Error)?.message || "Something went wrong.";
		return <p className="text-xl font-bold text-red-700">{errorMessage}</p>;
	}

	return (
		<>
			<h4 className="prose-h4: prose ml-1 dark:text-sky-50">Members</h4>
			<div className="mt-1">
				<GlobalTable data={membersData} columns={columns} />
			</div>
		</>
	);
};

export default MembersTable;
