'use client';

import { FC } from 'react';
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

const CreateDocumentModal: FC = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline'>Create new document</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>
                            <Header text='New Document' />
                        </DialogTitle>
                    </DialogHeader>
                    <div className='mt-5'>
                        <Input placeholder='Title' />
                    </div>
                    <div className='mt-5'>
                        <QuillEditor
                            value={''}
                            readOnly={false}
                            onChange={function (content: string): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <Button type='submit'>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateDocumentModal;
