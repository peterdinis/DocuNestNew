import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, Save, Trash } from 'lucide-react';
import { FC } from 'react';

const DocToolbar: FC = () => {
    return (
        <div className='flex items-center justify-between border-b bg-background p-4'>
            <div className='flex items-center space-x-2'>
                <Button variant='outline' size='icon'>
                    <Plus className='h-4 w-4' />
                    <span className='sr-only'>Add item</span>
                </Button>
                <Button variant='outline' size='icon'>
                    <Save className='h-4 w-4' />
                    <span className='sr-only'>Save</span>
                </Button>
                <Button variant='outline' size='icon'>
                    <Trash className='h-4 w-4' />
                    <span className='sr-only'>Delete</span>
                </Button>
            </div>
            <div className='flex items-center space-x-2'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline'>
                            Options
                            <ChevronDown className='ml-2 h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Option 1</DropdownMenuItem>
                        <DropdownMenuItem>Option 2</DropdownMenuItem>
                        <DropdownMenuItem>Option 3</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default DocToolbar;
