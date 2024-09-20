'use client';

import { FC } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import useDisplayAllWorkspaces from '@/app/_hooks/workspaces/useDisplayAllWorkspaces';
import { Loader2 } from 'lucide-react';
import useAllCountedWorkspaceDocuments from '@/app/_hooks/workspace-documents/useCountWorkspaceDocuments';

const DashboardStatus: FC = () => {
    const { data, isLoading, isError } = useDisplayAllWorkspaces();
    const {
        data: documentData,
        isLoading: documentLoading,
        isError: documentEror,
    } = useAllCountedWorkspaceDocuments();

    const actualDate = format(new Date(), 'yyyy-MM-dd');

    if (isLoading || documentLoading)
        return <Loader2 className='h-8 w-8 animate-spin' />;

    if (isError || documentEror) {
        return (
            <p className='prose-p: prose text-2xl font-bold text-red-800'>
                Something went wrong
            </p>
        );
    }

    return (
        <>
            <span className='prose-p: prose pt-4 dark:text-sky-50'>
                Actual time: {actualDate}
            </span>

            <Card className='mb-6 mt-4'>
                <CardHeader>
                    <CardTitle>Project Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-3 gap-4 text-center'>
                        <div>
                            <p className='text-2xl font-bold'>
                                {data?.totalCount}
                            </p>
                            <p className='text-muted-foreground'>Workspaces</p>
                        </div>
                        {/* TODO: Later add simular things for members */}
                        <div>
                            <p className='text-2xl font-bold'>
                                {documentData?.totalCount}
                            </p>
                            <p className='text-muted-foreground'>
                                Workspace documents created
                            </p>
                        </div>
                        <div>
                            <p className='text-2xl font-bold'>6</p>
                            <p className='text-muted-foreground'>
                                Workspaces Members
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default DashboardStatus;
