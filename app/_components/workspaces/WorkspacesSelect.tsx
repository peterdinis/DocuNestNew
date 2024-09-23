"use client"

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
    const {data, isLoading, isError} = useDisplayAllWorkspaces();

    if(isLoading) return <Loader2 className='animate-spin w-8 h-8' />;

    if(isError) return <p className="text-red-800 text-xl font-bold prose prose-p:">Something went wrong</p>
    
    const allWorkspaces = useMemo(() => {
        return data?.workspaces;
    }, [data?.workspaces]);
    
    return (
        <>
            <Select>
                <SelectTrigger className='mt-5 w-[470px]'>
                    <SelectValue placeholder='Select Workspace' />
                </SelectTrigger>
                <SelectContent>
                    {allWorkspaces && allWorkspaces.map((item:{id: string, name: string}) => {
                        return (
                            <SelectItem value={item.id}>
                                {item.name}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </>
    );
};

export default WorkspacesSelect;
