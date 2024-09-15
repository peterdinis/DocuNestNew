'use client';

import { FC } from 'react';
import Sidebar from '../shared/Sidebar';
import DashboardContent from './DashboardContent';

const DashboardWrapper: FC = () => {
    return (
        <div className="flex min-h-screen dark:bg-dark dark:text-light">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardContent />
            </div>
        </div>
    );
};

export default DashboardWrapper;