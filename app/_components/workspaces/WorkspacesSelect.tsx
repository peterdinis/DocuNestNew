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
import Loading from '../shared/Loading';

const WorkspacesSelect: FC<{ onChange: (value: string) => void }> = ({
    onChange,
}) => {
    const { data, isLoading, isError } = useDisplayAllWorkspaces();

    const allWorkspaces = useMemo(() => data?.workspaces, [data?.workspaces]);

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <p className='prose-p: prose text-xl font-bold text-red-800'>
                Something went wrong
            </p>
        );

    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className='mt-5 w-[470px]'>
                <SelectValue placeholder='Select Workspace' />
            </SelectTrigger>
            <SelectContent>
                {allWorkspaces?.map((item: { id: string; name: string }) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default WorkspacesSelect;
