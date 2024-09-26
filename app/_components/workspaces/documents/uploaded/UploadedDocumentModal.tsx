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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UploadDropzone } from '@/app/_utils/uploadthing';

const UploadedDocumentModal: FC = () => {
    const { toast } = useToast();
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant={'ghost'}>
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Document</DialogTitle>
                        <DialogDescription>
                            <UploadDropzone
                                endpoint='fileUploader'
                                onClientUploadComplete={(res) => {
                                    toast({
                                        title: 'Document was uploaded',
                                        duration: 2000,
                                        className:
                                            'bg-green-800 text-white font-bold text-xl',
                                    });
                                }}
                                onUploadError={(error: Error) => {
                                    toast({
                                        title: `ERROR! ${error.message}`,
                                        duration: 2000,
                                        className:
                                            'bg-red-800 text-white font-bold text-xl',
                                    });
                                }}
                            />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UploadedDocumentModal;
