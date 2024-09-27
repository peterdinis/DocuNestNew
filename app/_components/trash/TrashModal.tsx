'use client';

import { FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Header from '../shared/Header';
import TrashWorkspaces from './TrashWorkspaces';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TrashModal: FC = () => {
    const { toast } = useToast();

    const clearTrash = () => {
        toast({
            title: 'Trash was cleaned',
            duration: 2000,
            className: 'bg-green-800 text-white font-bold text-xl',
        });
    };

    return (
        <>
            <Dialog>
                <DialogTrigger>Trash</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <Header text={'Trash'} />
                        </DialogTitle>
                        <DialogDescription>
                            <h5 className='prose-h5: prose font-bold dark:text-white'>
                                WORKSPACES
                            </h5>
                            <div className='mt-3'>
                                <TrashWorkspaces />
                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <Button onClick={clearTrash}>
                        <Trash />
                        Delete all Trash
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TrashModal;
