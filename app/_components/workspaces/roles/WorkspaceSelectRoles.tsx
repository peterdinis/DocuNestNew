import { FC } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const WorkspaceSelectRoles: FC<{ onChange: (value: string) => void }> = ({
    onChange,
}) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className='mt-5 w-[470px]'>
                <SelectValue placeholder='Select role' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='member'>Member</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default WorkspaceSelectRoles;
