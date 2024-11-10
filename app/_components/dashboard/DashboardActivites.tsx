'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppPagination from '../shared/AppPagination';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useToast } from '@/app/_hooks/shared/use-toast';
import { TrashIcon } from 'lucide-react';

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
    const totalPages = 5; // Example value
    const { toast } = useToast();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) return;

        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/api/notifications/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();

        const newSocket = io("http://localhost:3001", {
            transports: ['websocket'],
        });

        setSocket(newSocket);

        newSocket.on('notification', (notification: Notification) => {
            setNotifications((prev) => [notification, ...prev]);
        });

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [userId]);

    const handleDelete = async (notificationId: string) => {
        try {
            await axios.delete(`/api/notifications/${notificationId}`);
            toast({
                title: 'Notification removed',
                duration: 2000,
                className: 'bg-green-600 text-white font-bold',
            });
            setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
                {notifications.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground">
                        No messages found
                    </p>
                ) : (
                    <ul className="space-y-4">
                        <AnimatePresence>
                            {notifications.map((notification) => (
                                <motion.li
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {notification.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(notification.id)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Delete notification"
                                    >
                                        <TrashIcon className="h-5 w-5" />
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
