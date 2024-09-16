'use client';

import { FC, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import Header from '../shared/Header';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
} from '@/components/ui/form';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import useCreateWorkspace from '@/app/_hooks/workspaces/useCreateWorkspace';
import { WorkspaceFormData } from '@/app/_types/workspaceTypes';

const CreateNewWorkspaceModal: FC = () => {
    const [selectedEmoji, setSelectedEmoji] = useState<string>('😊');
    const { mutate: createWorkspace, isPending } = useCreateWorkspace();
    const form = useForm<WorkspaceFormData>();

    const onSubmit: SubmitHandler<WorkspaceFormData> = (data) => {
        createWorkspace({
            name: data.name,
            description: data.description,
            workspaceEmoji: selectedEmoji,
        });
        form.reset();
    };

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
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Workspace Name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name='description'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Workspace Description'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Emoji</FormLabel>
                            <EmojiPicker
                                onEmojiClick={(emojiObject: EmojiClickData) =>
                                    setSelectedEmoji(emojiObject.emoji)
                                }
                            />
                            <FormDescription>
                                Selected Emoji: {selectedEmoji}
                            </FormDescription>
                        </FormItem>

                        <Button type='submit' disabled={isPending}>
                            {isPending ? (
                                <Loader2 className='h-8 w-8 animate-spin' />
                            ) : (
                                'Create Workspace'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewWorkspaceModal;
