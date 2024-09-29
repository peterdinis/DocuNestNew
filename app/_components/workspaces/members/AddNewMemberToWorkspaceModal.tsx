'use client';

import { FC, useState } from 'react';
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
import useAddNewWorkspaceMember from '@/app/_hooks/workspace-mebers/useAddNewWorkspaceMember';
import Loading from '../../shared/Loading';

const AddNewMemberToWorkspaceModal: FC = () => {
    const [email, setEmail] = useState('');
    const [workspaceId, setWorkspaceId] = useState('');
    const [role, setRole] = useState('');
    const [open, setOpen] = useState(false); // State to control modal open/close

    const { mutate: addMember, isPending } = useAddNewWorkspaceMember();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !workspaceId || !role) {
            // Handle form validation
            return;
        }

        addMember(
            {
                email,
                workspaceId,
                role,
            },
            {
                onSuccess: () => {
                    setOpen(false); // Close the modal on success
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                        <form onSubmit={handleSubmit} className='mt-5'>
                            <Input
                                type='email'
                                placeholder='User Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <WorkspacesSelect
                                onChange={(value) => setWorkspaceId(value)}
                            />
                            <WorkspaceSelectRoles
                                onChange={(value) => setRole(value)}
                            />
                            <ConfettiButton
                                type='submit'
                                className='mt-5 bg-blue-600 font-bold text-white hover:bg-blue-800'
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <Loading />
                                ) : (
                                    'Add new member to workspace'
                                )}
                            </ConfettiButton>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewMemberToWorkspaceModal;