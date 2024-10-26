'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { FC, useState } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import AppPagination from '../shared/AppPagination';
import useAllWorkspaceMessages from '@/app/_hooks/workspace-messages/useAllWorkspaceMessages';
import Loading from '../shared/Loading';

interface Activity {
    id: number;
    name: string;
    timeAgo: string;
}

const initialActivities: Activity[] = [
    {
        id: 1,
        name: 'John Doe updated the project status',
        timeAgo: '2 hours ago',
    },
    {
        id: 2,
        name: 'John Doe updated the project status',
        timeAgo: '2 hours ago',
    },
    {
        id: 3,
        name: 'John Doe updated the project status',
        timeAgo: '2 hours ago',
    },
    {
        id: 4,
        name: 'John Doe updated the project status',
        timeAgo: '2 hours ago',
    },
    {
        id: 5,
        name: 'John Doe updated the project status',
        timeAgo: '2 hours ago',
    },
];

const DashboardActivities: FC = () => {
    const workspaceID = sessionStorage.getItem('WorkspaceId');
    const { data, isLoading, isError, error } = useAllWorkspaceMessages({
        id: workspaceID!,
    });

    const [activities, setActivities] = useState<Activity[]>(initialActivities);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDelete = (id: number) => {
        setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.id !== id),
        );
    };

    if (isLoading) return <Loading />;

    if (isError || error) {
        const errorMessage =
            (error as Error)?.message || 'Something went wrong.';
        return <p className='text-xl font-bold text-red-700'>{errorMessage}</p>;
    }

    console.log('D', data);

    return (
        <Card className='mb-6'>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                {activities.length === 0 ? (
                    <p className='text-center text-sm text-muted-foreground'>
                        No messages found
                    </p>
                ) : (
                    <ul className='space-y-4'>
                        <AnimatePresence>
                            {activities.map((activity) => (
                                <motion.li
                                    key={activity.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className='flex items-center justify-between'
                                >
                                    <div className='flex items-center'>
                                        <Avatar className='h-9 w-9'>
                                            <AvatarImage
                                                className='rounded-lg'
                                                src='https://github.com/shadcn.png'
                                                alt='Avatar'
                                            />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div className='ml-4'>
                                            <p className='text-sm font-medium'>
                                                {activity.name}
                                            </p>
                                            <p className='text-sm text-muted-foreground'>
                                                {activity.timeAgo}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDelete(activity.id)
                                        }
                                        className='text-red-500 hover:text-red-700'
                                        aria-label='Delete activity'
                                    >
                                        <TrashIcon className='h-5 w-5' />
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                )}
            </CardContent>
            <AppPagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                hasNextPage={currentPage < totalPages}
            />
        </Card>
    );
};

export default DashboardActivities;
