'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Header from '../../shared/Header';
import QuillEditor from './QuillEditor';
import { WorkspaceDocumentType } from '@/app/_types/workspaceDocumentTypes';
import { Loader2 } from 'lucide-react';
import useCreateWorkspaceDocument from '@/app/_hooks/workspace-documents/useCreateWorkspaceDocument';
import { useSession } from 'next-auth/react';

interface ICreateDocumentModalProps {
    workspaceId: string;
}

const CreateDocumentModal: FC<ICreateDocumentModalProps> = ({
    workspaceId,
}: ICreateDocumentModalProps) => {
    const { mutate: createDocument, isPending } = useCreateWorkspaceDocument();
    const { data: session } = useSession();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<WorkspaceDocumentType>({
        defaultValues: {
            name: '',
            content: '',
        },
    });

    const content = watch('content');

    const onSubmit = (data: WorkspaceDocumentType) => {
        const documentData = {
            ...data,
            workspaceId: workspaceId[0],
            userId: session?.user.id,
        };

        createDocument(documentData);
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Create new document</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[1000px] max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>
                        <Header text='New Document' />
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-5'>
                        <Input
                            placeholder='Document name'
                            {...register('name', {
                                required: 'Document name is required',
                            })}
                        />
                        {errors.name && (
                            <span className='text-red-600'>
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className='mt-5 h-[300px] overflow-y-auto break-words'>
                        <QuillEditor
                            value={content}
                            readOnly={false}
                            onChange={(value) => setValue('content', value)}
                        />
                        {errors.content && (
                            <span className='text-red-600'>
                                Content is required
                            </span>
                        )}
                    </div>

                    <DialogFooter>
                        <Button className='mt-5' type='submit' disabled={isPending}>
                            {isPending ? (
                                <Loader2 className='h-8 w-8 animate-spin' />
                            ) : (
                                'Save changes'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateDocumentModal;