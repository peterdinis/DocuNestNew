import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { FC } from 'react';
import AllTeamMembers from '../teams/AllTeamMembers';
import AddNewMemberToWorkspaceModal from '../workspaces/AddNewMemberToWorkspaceModal';

const DashboardTeams: FC = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Workspace Members</CardTitle>
                    <CardDescription>
                        Your project collaborators
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
