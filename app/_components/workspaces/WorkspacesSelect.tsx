'use client';

import { FC, useMemo } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useDisplayAllWorkspaces from '@/app/_hooks/workspaces/useDisplayAllWorkspaces';
import { Loader2 } from 'lucide-react';

const WorkspacesSelect: FC = () => {
    const { data, isLoading, isError } = useDisplayAllWorkspaces();

    const allWorkspaces = useMemo(() => {
        return data?.workspaces;
    }, [data?.workspaces]);

    if (isLoading) return <Loader2 className='h-8 w-8 animate-spin' />;

    if (isError)
        return (
            <p className='prose-p: prose text-xl font-bold text-red-800'>
                Something went wrong
            </p>
        );

    return (
        <>
            <Select>
                <SelectTrigger className='mt-5 w-[470px]'>
                    <SelectValue placeholder='Select Workspace' />
                </SelectTrigger>
                <SelectContent>
                    {allWorkspaces &&
                        allWorkspaces.map(
                            (item: { id: string; name: string }) => {
                                return (
                                    <SelectItem value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                );
                            },
                        )}
                </SelectContent>
            </Select>
        </>
    );
};

export default WorkspacesSelect;
