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
import Header from '../../shared/Header';
import { Input } from '@/components/ui/input';
import { ConfettiButton } from '@/components/ui/confetti-button';
import WorkspacesSelect from '../WorkspacesSelect';
import WorkspaceSelectRoles from '../roles/WorkspaceSelectRoles';

const AddNewMemberToWorkspaceModal: FC = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button size='icon' variant='outline'>
                    <Plus className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Header text='Add new member to workspace' />
                    </DialogTitle>
                    <DialogDescription>
                        <form className='mt-5'>
                            <Input type='email' placeholder='User Email' />
                            <WorkspacesSelect />
                            <WorkspaceSelectRoles />
                            <ConfettiButton className='mt-5 bg-blue-600 hover:bg-blue-800 text-white font-bold'>
                                Add new member to workspace
                            </ConfettiButton>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewMemberToWorkspaceModal;
