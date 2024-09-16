import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { FC } from 'react';
import AllTeamMembers from '../teams/AllTeamMembers';
import AddNewMemberToWorkspaceModal from '../workspaces/AddNewMemberToWorkspaceModal';

const DashboardTeams: FC = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>All my members</CardTitle>
                    <CardDescription>
                        Your members in all workspaces
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-wrap gap-4'>
                        <AllTeamMembers />
                        <AddNewMemberToWorkspaceModal />
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default DashboardTeams;
