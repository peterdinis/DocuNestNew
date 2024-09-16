import { FC } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DashboardStatus: FC = () => {
    const actualDate = format(new Date(), 'yyyy-MM-dd');

    return (
        <>
            <span className='prose-p: prose pt-4 dark:text-sky-50'>
                Actual time: {actualDate}
            </span>

            <Card className='mb-6 mt-4'>
                <CardHeader>
                    <CardTitle>Project Overview</CardTitle>
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

export default DashboardStatus;
