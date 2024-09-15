'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { FC } from 'react';
import Header from '../shared/Header';
import { useSession } from 'next-auth/react';
import {format} from "date-fns";
import AllTeamMembers from '../teams/AllTeamMembers';

const DashboardContent: FC = () => {
    const { data: session } = useSession();

    const actualDate = format(new Date(), 'yyyy-MM-dd');
    return (
        <div>
            {/* Main content */}
            <main className='flex-1 overflow-auto p-8'>
                <div className='mx-auto max-w-4xl'>
                    <Header text={`Welcome ${session?.user.name}`} />
                    <br />
                    <span className='prose-p: prose pt-4 dark:text-sky-50'>
                        Actual time: {actualDate}
                    </span>

                    {/* Project Overview */}
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

                    {/* Recent Activities */}
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
                                            Robert Johnson commented on a
                                            document
                                        </p>
                                        <p className='text-sm text-muted-foreground'>
                                            Yesterday
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Team Members */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>
                                Your project collaborators
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-wrap gap-4'>
                                <AllTeamMembers />
                                <Button size='icon' variant='outline'>
                                    <Plus className='h-4 w-4' />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default DashboardContent;
