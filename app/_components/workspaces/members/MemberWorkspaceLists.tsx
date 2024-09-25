"use client"

import useDisplayMyMemberWorkspaces from '@/app/_hooks/workspace-mebers/useDisplayMyMemberWorkspaces';
import { FC } from 'react';
import Loading from '../../shared/Loading';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {motion} from "framer-motion";
import Link from 'next/link';
import { WorkspacePaginationType } from '@/app/_types/workspaceTypes';

const MemberWorskapceLists: FC = () => {
    const {data, isLoading, isError} = useDisplayMyMemberWorkspaces();

    if(isLoading) return <Loading />

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    return (
        <>
            <Card className='mb-6 mt-4'>
                <Input
                    placeholder='Search...'
                    value={""}
                    onChange={() => {
                        console.log("Do nothing");
                    }}
                />
                <CardHeader>
                    <CardTitle className='prose-h2: prose text-xl font-bold dark:text-white'>
                        My Members Workspacexs
                    </CardTitle>
                </CardHeader>

                <CardContent>
                <div className='grid grid-cols-3 gap-4'>
                    {data?.data.length > 0 ? (
                        data?.data.map((workspace: WorkspacePaginationType) => (
                            <motion.div
                                key={workspace.id}
                                className='rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg dark:bg-zinc-800'
                                whileHover={{ scale: 1.05 }} // Zoom effect on hover
                                whileTap={{ scale: 0.95 }}   // Scale down on tap
                            >
                                <Link href={`/workspaces/${workspace.id}`}>
                                    <p className='text-2xl'>
                                        {workspace.workspaceEmoji}
                                    </p>
                                    <p className='prose-p: prose text-lg font-bold dark:text-white'>
                                        {workspace.name}
                                    </p>
                                    <p className='prose-p: prose text-sm text-gray-600 dark:text-white'>
                                        {workspace.description || 'No description'}
                                    </p>
                                    <p className='text-xs text-gray-400 dark:text-white'>
                                        Created at:{' '}
                                        {new Date(workspace.createdAt).toLocaleDateString()}
                                    </p>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <p className='col-span-3 text-center'>
                            No workspaces found.
                        </p>
                    )}
                </div>
            </CardContent>
            </Card>
        </>
    )
};

export default MemberWorskapceLists;