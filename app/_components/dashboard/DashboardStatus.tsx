'use client';

import { FC } from 'react';
import { format } from 'date-fns';

const DashboardStatus: FC = () => {
    const actualDateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    return (
        <>
            <span className='prose-p: prose pt-4 dark:text-sky-50'>
                Actual date and time: {actualDateTime}
            </span>
        </>
    );
};

export default DashboardStatus;
