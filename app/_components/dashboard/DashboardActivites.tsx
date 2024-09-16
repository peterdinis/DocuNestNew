import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { FC } from 'react';

const DashboardActivities: FC = () => {
    return (
        <>
            <Card className='mb-6'>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className='space-y-4'>
                        <li className='flex items-center'>
                            <Avatar className='h-9 w-9'>
                                <AvatarImage
                                    src='/placeholder.svg?height=36&width=36'
                                    alt='Avatar'
                                />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div className='ml-4'>
                                <p className='text-sm font-medium'>
                                    John Doe updated the project status
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    2 hours ago
                                </p>
                            </div>
                        </li>
                        <li className='flex items-center'>
                            <Avatar className='h-9 w-9'>
                                <AvatarImage
                                    src='/placeholder.svg?height=36&width=36'
                                    alt='Avatar'
                                />
                                <AvatarFallback>AS</AvatarFallback>
                            </Avatar>
                            <div className='ml-4'>
                                <p className='text-sm font-medium'>
                                    Alice Smith added a new task
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    5 hours ago
                                </p>
                            </div>
                        </li>
                        <li className='flex items-center'>
                            <Avatar className='h-9 w-9'>
                                <AvatarImage
                                    src='/placeholder.svg?height=36&width=36'
                                    alt='Avatar'
                                />
                                <AvatarFallback>RJ</AvatarFallback>
                            </Avatar>
                            <div className='ml-4'>
                                <p className='text-sm font-medium'>
                                    Robert Johnson commented on a document
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                    Yesterday
                                </p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </>
    );
};

export default DashboardActivities;
