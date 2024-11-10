'use client';

import { FC, useState } from 'react';
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
import useCreateWorkspaceDocument from '@/app/_hooks/workspace-documents/useCreateWorkspaceDocument';
import { useSession } from 'next-auth/react';
import Loading from '../../shared/Loading';
import { useToast } from '@/app/_hooks/shared/use-toast';

interface ICreateDocumentModalProps {
    workspaceId: string;
}

const CreateDocumentModal: FC<ICreateDocumentModalProps> = ({
    workspaceId,
}: ICreateDocumentModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
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

        createDocument(documentData, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
            onError: (error: any) => {
                if (
                    error.response?.data?.error ===
                    'Document with the same name already exists in this workspace'
                ) {
                    toast({
                        title: 'Document with the same name already exists in this workspace',
                        duration: 2000,
                        className: 'bg-red-800 text-white font-bold text-xl',
                    });
                } else {
                    toast({
                        title: 'Failed to create new document for workspace',
                        duration: 2000,
                        className: 'bg-red-800 text-white font-bold text-xl',
                    });
                }
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setIsOpen(true)}>
                    Create new document
                </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[1000px]'>
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

                    <div className='mt-5 h-[300px] overflow-y-auto break-all'>
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
                        <Button
                            className='mt-5'
                            type='submit'
                            disabled={isPending}
                        >
                            {isPending ? <Loading /> : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateDocumentModal;
