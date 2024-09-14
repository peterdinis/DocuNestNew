import { FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Header from '../shared/Header';

const CreateNewWorkspaceModal: FC = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant={'link'} size='default'>
                    <Plus className='h-5 w-5 cursor-pointer text-gray-700 dark:text-white' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Header text='Create new workspace' />
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewWorkspaceModal;
