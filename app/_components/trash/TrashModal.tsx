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
import useClearTrash from '@/app/_hooks/trash/useClearTrash';
import Loading from '../shared/Loading';

const TrashModal: FC = () => {
    const clearTrashMutation = useClearTrash();

    const handleClearTrash = () => {
        clearTrashMutation.mutate();
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

                    <Button
                        onClick={handleClearTrash}
                        disabled={clearTrashMutation.isPending}
                    >
                        <Trash />
                        {clearTrashMutation.isPending ? (
                            <Loading />
                        ) : (
                            'Delete all Trash'
                        )}
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TrashModal;
