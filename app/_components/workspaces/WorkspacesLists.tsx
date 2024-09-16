import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC } from 'react';
import CreateNewWorkspaceModal from './CreateNewWorkspaceModal';

const WorkspacesLists: FC = () => {
    return (
        <>
            <Card className='mb-6 mt-4'>
                <CardHeader>
                    <CardTitle className='prose-h2: prose text-xl font-bold'>
                        My all Workspaces
                    </CardTitle>
                </CardHeader>
                <div className='float-right'>
                    <CreateNewWorkspaceModal />
                </div>
                <CardContent>
                    <div className='grid grid-cols-3 gap-4 text-center'>
                        Display data
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default WorkspacesLists;
