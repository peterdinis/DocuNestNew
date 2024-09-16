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

const DashboardTeams: FC = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                        Your project collaborators
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-wrap gap-4'>
                        <AllTeamMembers />
                        <Button size='icon' variant='outline'>
                            <Plus className='h-4 w-4' />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default DashboardTeams;
