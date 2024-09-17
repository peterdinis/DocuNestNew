import { FC } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import useDisplayAllWorkspaces from '@/app/_hooks/workspaces/useDisplayAllWorkspaces';
import { Loader2 } from 'lucide-react';

const DashboardStatus: FC = () => {
    const {data, isLoading, isError} = useDisplayAllWorkspaces();
    const actualDate = format(new Date(), 'yyyy-MM-dd');

    if(isLoading) return <Loader2 className='animate-spin w-8 h-8' />

    if(isError) {
        return <p className='prose prose-p: font-bold text-red-800 text-2xl'>Something went wrong</p>
    }

    console.log("D", data);

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
                            <p className='text-2xl font-bold'>{data?.totalCount}</p>
                            <p className='text-muted-foreground'>Workspaces</p>
                        </div>
                        <div>
                            <p className='text-2xl font-bold'>20</p>
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
