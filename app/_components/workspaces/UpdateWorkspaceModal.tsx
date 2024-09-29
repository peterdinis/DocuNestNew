'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Header from '../shared/Header';
import useUpdateWorkspace from '@/app/_hooks/workspaces/useUpdateWorkspace';
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Loading from '../shared/Loading';

interface IUpdateWorkspaceModalProps {
    workspaceId: string;
}

const UpdateWorkspaceModal: FC<IUpdateWorkspaceModalProps> = ({
    workspaceId,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    // Call useUpdateWorkspace and handle success/error in the mutation
    const updateWorkspaceMutation = useUpdateWorkspace({ id: workspaceId });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateWorkspaceMutation.mutate(
            {
                name: formData.name,
                description: formData.description,
                workspaceEmoji: selectedEmoji,
            },
            {
                // Reset form and close modal on successful mutation
                onSuccess: () => {
                    setFormData({ name: '', description: '' });
                    setSelectedEmoji('');
                    setIsOpen(false);
                },
            },
        );
    };

    const onEmojiClick = (emojiObject: { emoji: string }) => {
        setSelectedEmoji(emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size='icon' variant='outline'>
                    <Plus className='h-4 w-4' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Header text='Update Workspace' />
                    </DialogTitle>
                    <DialogDescription>
                        Update your workspace details. This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>

                {/* Update Workspace Form */}
                <form onSubmit={onSubmit}>
                    <div>
                        <label className='mb-2 block'>Workspace Name</label>
                        <Input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full rounded border p-2'
                            placeholder='Workspace Name'
                        />
                    </div>

                    <div className='mt-4'>
                        <label className='mb-2 block'>Description</label>
                        <Textarea
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            className='w-full rounded border p-2'
                            placeholder='Workspace Description'
                        />
                    </div>

                    <div className='mt-4'>
                        <label className='mb-2 block'>Emoji</label>
                        <div className='flex items-center'>
                            <Button
                                variant='outline'
                                size='sm'
                                onClick={() =>
                                    setShowEmojiPicker(!showEmojiPicker)
                                }
                                type='button'
                            >
                                {selectedEmoji || 'Select Emoji'}
                            </Button>
                            {selectedEmoji && (
                                <span className='ml-2 text-lg'>
                                    {selectedEmoji}
                                </span>
                            )}
                        </div>
                        {showEmojiPicker && (
                            <div className='mt-2'>
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </div>

                    <Button
                        type='submit'
                        variant='default'
                        className='mt-4'
                        disabled={updateWorkspaceMutation.isPending}
                    >
                        {updateWorkspaceMutation.isPending ? (
                            <Loading />
                        ) : (
                            'Update Workspace'
                        )}
                    </Button>
                </form>

                <DialogClose asChild>
                    <Button variant='outline' className='mt-4'>
                        Close
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateWorkspaceModal;
