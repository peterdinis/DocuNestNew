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

const TrashModal: FC = () => {
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

                    <Button>
                        <Trash />
                        Delete all Trash
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TrashModal;
