"use client"

import { FC, useState } from 'react';
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
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import styles from "./Documents.module.css"

const CreateDocumentModal: FC = () => {
    const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

    const editor = useEditor({
        editorProps: {
          attributes: {
            // Add styles to editor element
            class: styles.editor,
          },
        },
        extensions: [
          StarterKit.configure({
            // The Collaboration extension comes with its own history handling
            history: false,
          }),
          // Register the document with Tiptap
          Collaboration.configure({
            document: doc,
          }),
          // Attach provider and user info
          CollaborationCursor.configure({
            provider: provider,
          }),
        ],
      });

      
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
                    <EditorContent editor={editor} />
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
