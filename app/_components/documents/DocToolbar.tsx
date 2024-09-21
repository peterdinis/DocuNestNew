import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronDown, Plus, Trash, X, Text, MoveLeft } from 'lucide-react';
import { FC } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FaRegFilePdf } from 'react-icons/fa6';
import { FaFileWord } from 'react-icons/fa';
import Link from 'next/link';

interface DocToolbarProps {
    isEditMode: boolean;
    handleEditToggle: () => void;
    handleDownload: () => void;
    handleExportPDF: () => void;
    handleDocxDownload: () => void;
}

const DocToolbar: FC<DocToolbarProps> = ({
    isEditMode,
    handleEditToggle,
    handleDocxDownload,
    handleDownload,
    handleExportPDF,
}: DocToolbarProps) => {
    return (
        <div className='flex items-center justify-between border-b bg-background p-4'>
            <div className='flex items-center space-x-2'>
                <Button variant='outline' size='icon'>
                    <Link href='/todo'>
                        <MoveLeft />
                    </Link>
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                onClick={handleEditToggle}
                                variant='outline'
                                size='icon'
                            >
                                {isEditMode ? (
                                    <Plus className='h-4 w-4' />
                                ) : (
                                    <X className='h-4 w-4' />
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Enable / Disable edit mode
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button variant='outline' size='icon'>
                                        <Trash className='h-4 w-4' />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </TooltipTrigger>
                        <TooltipContent>Delete file</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
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
                        <DropdownMenuItem onClick={handleDownload}>
                            <div className='flex items-center'>
                                <Text className='mr-2' /> Text File
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportPDF}>
                            <div className='flex items-center'>
                                <FaRegFilePdf className='mr-2' /> Pdf File
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDocxDownload}>
                            <div className='flex items-center'>
                                <FaFileWord className='mr-2' /> Word file
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default DocToolbar;
