'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC, useState, useEffect } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import AppPagination from '../shared/AppPagination';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Notification {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

const DashboardActivities: FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [, setSocket] = useState<Socket | null>(null);
    const { data: session } = useSession();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const userId = session?.user.id!;

    useEffect(() => {
        // Fetch initial notifications
        const fetchNotifications = async () => {
            const response = await axios.get(`/api/notifications/${userId!}`);
            setNotifications(response.data);
        };
        fetchNotifications();

        // Connect to Socket.IO server
        const newSocket = io('http://localhost:3001', {
            transports: ['websocket'],
        });
        setSocket(newSocket);

        // Listen for new notifications
        newSocket.on('notification', (notification: Notification) => {
            setNotifications((prev) => [notification, ...prev]);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [userId]);

    console.log('N', notifications);

    return (
        <Card className='mb-6'>
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                {/* {activities.length === 0 ? (
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
                )} */}
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
