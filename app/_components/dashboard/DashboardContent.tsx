'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import { useSession } from 'next-auth/react';
import DashboardTeams from './DashboardTeams';
import DashboardActivities from './DashboardActivites';
import DashboardStatus from './DashboardStatus';

const DashboardContent: FC = () => {
    const { data: session } = useSession();

    return (
        <div>
            <main className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Welcome ${session?.user.name}`} />
                    <br />
                    <DashboardStatus />
                    <DashboardActivities />
                    <DashboardTeams />
                </div>
            </main>
        </div>
    );
};

export default DashboardContent;
