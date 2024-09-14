import { FC } from 'react';
import Sidebar from '../shared/Sidebar';
import DashboardContent from './DashboardContent';

const DashboardWrapper: FC = () => {
    return (
        <div className='dark:bg-dark dark:text-light flex bg-gray-100 text-gray-900 dark:bg-background'>
            <Sidebar />
            <DashboardContent />
        </div>
    );
};

export default DashboardWrapper;
