'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { FC } from 'react';
import Header from '../shared/Header';
import { useSession } from 'next-auth/react';
import {format} from "date-fns";
import DashboardTeams from './DashboardTeams';
import DashboardActivities from './DashboardActivites';

const DashboardContent: FC = () => {
    const { data: session } = useSession();

    const actualDate = format(new Date(), 'yyyy-MM-dd');
    return (
        <div>
            <main className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Welcome ${session?.user.name}`} />
                    <br />
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

                    <DashboardActivities />
                    <DashboardTeams />
                </div>
            </main>
        </div>
    );
};

export default DashboardContent;
