import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC } from 'react';

const WorkspacesLists: FC = () => {
    return (
        <>
            <Card className='mb-6 mt-4'>
                <CardHeader>
                    <CardTitle className='prose prose-h2: font-bold text-xl'>My all Workspaces</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-3 gap-4 text-center'>
                        <div>
                            <p className='text-2xl font-bold'>12</p>
                            <p className='text-muted-foreground'>
                                Active Projects
                            </p>
                        </div>
                        <div>
                            <p className='text-2xl font-bold'>34</p>
                            <p className='text-muted-foreground'>
                                Team Members
                            </p>
                        </div>
                        <div>
                            <p className='text-2xl font-bold'>56</p>
                            <p className='text-muted-foreground'>
                                Tasks Completed
                            </p>
                        </div>
                        
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default WorkspacesLists;
