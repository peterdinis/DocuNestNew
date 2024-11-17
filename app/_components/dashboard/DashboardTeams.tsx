import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { FC } from "react";
import AllTeamMembers from "../teams/AllTeamMembers";
import AddNewMemberToWorkspaceModal from "../workspaces/members/AddNewMemberToWorkspaceModal";

const DashboardTeams: FC = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>All my members</CardTitle>
					<CardDescription>Your members in all workspaces</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						<AllTeamMembers />
						<AddNewMemberToWorkspaceModal />
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default DashboardTeams;
