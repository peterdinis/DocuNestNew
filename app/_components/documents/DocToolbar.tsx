'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus, Trash, X, Text } from 'lucide-react';
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
import TooltipWrapper from '../shared/TooltipWrapper';
import useDeleteWorkspaceDocument from '@/app/_hooks/workspace-documents/useDeleteWorkspaceDocument';

interface DocToolbarProps {
    isEditMode: boolean;
    documentId: string;
    handleEditToggle: () => void;
    handleDownload: () => void;
    handleExportPDF: () => void;
    handleDocxDownload: () => void;
}

const DocToolbar: FC<DocToolbarProps> = ({
    isEditMode,
    documentId,
    handleEditToggle,
    handleDocxDownload,
    handleDownload,
    handleExportPDF,
}: DocToolbarProps) => {
    const deleteDocumentMutation = useDeleteWorkspaceDocument({
        id: documentId,
    });

    const handleDelete = () => {
        deleteDocumentMutation.mutate();
    };

    return (
        <div className='flex items-center justify-between border-b bg-background p-4'>
            <div className='flex items-center space-x-2'>
                <TooltipWrapper
                    triggerChildren={
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
                    }
                    contentText='Enable / Disable edit mode'
                />
                <TooltipWrapper
                    triggerChildren={
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
                                        This action cannot be undone. This will
                                        permanently delete this document.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    }
                    contentText='Delete file'
                />
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
