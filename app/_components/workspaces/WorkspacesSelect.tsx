import { FC } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const WorkspacesSelect: FC = () => {
    return (
        <>
            <Select>
                <SelectTrigger className='mt-5 w-[470px]'>
                    <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='light'>Light</SelectItem>
                    <SelectItem value='dark'>Dark</SelectItem>
                    <SelectItem value='system'>System</SelectItem>
                </SelectContent>
            </Select>
        </>
    );
};

export default WorkspacesSelect;
