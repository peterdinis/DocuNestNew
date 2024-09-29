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
import Header from '../shared/Header';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUpdateWorkspace from '@/app/_hooks/workspaces/useUpdateWorkspace';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import EmojiPicker from 'emoji-picker-react';

interface UpdateWorkspaceFormInputs {
    name: string;
    description: string;
    emoji: string;
}

interface IUpdateWorkspaceModalProps {
    workspaceId: string;
}

const UpdateWorkspaceModal: FC<IUpdateWorkspaceModalProps> = ({workspaceId}: IUpdateWorkspaceModalProps) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const { handleSubmit, setValue, watch, control } = useForm<UpdateWorkspaceFormInputs>();
    const updateWorkspaceMutation = useUpdateWorkspace({ id: workspaceId }); 

    // Handle form submission
    const onSubmit: SubmitHandler<UpdateWorkspaceFormInputs> = (data) => {
        updateWorkspaceMutation.mutate({
            name: data.name,
            description: data.description,
            workspaceEmoji: selectedEmoji, // Use the selected emoji
        });
    };

    // Handle emoji selection
    const onEmojiClick = (emojiObject: { emoji: string }) => {
        setSelectedEmoji(emojiObject.emoji);
        setValue('emoji', emojiObject.emoji); // Set emoji value in form
        setShowEmojiPicker(false); // Close emoji picker after selection
    };

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
                        <Header text='Update Workspace' />
                    </DialogTitle>
                    <DialogDescription>
                        Update your workspace details. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                {/* Update Workspace Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Workspace Name</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        className="border rounded p-2 w-full"
                                        placeholder="Workspace Name"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <textarea
                                        {...field}
                                        className="border rounded p-2 w-full"
                                        placeholder="Workspace Description"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="emoji"
                        control={control}
                        render={() => (
                            <FormItem>
                                <FormLabel>Emoji</FormLabel>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        type="button"
                                    >
                                        {selectedEmoji || 'Select Emoji'}
                                    </Button>
                                    {watch('emoji') && (
                                        <span className="ml-2 text-lg">{watch('emoji')}</span>
                                    )}
                                </div>
                                {showEmojiPicker && (
                                    <div className="mt-2">
                                        <EmojiPicker onEmojiClick={onEmojiClick} />
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant="default">
                        Update Workspace
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateWorkspaceModal;