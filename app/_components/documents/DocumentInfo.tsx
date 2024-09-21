'use client';

import useWorkspaceDocumentDetail from '@/app/_hooks/workspace-documents/useWorkspaceDocumentDetail';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useState, useEffect } from 'react';
import DocToolbar from './DocToolbar';
import { Input } from '@/components/ui/input';
import QuillEditor from '../workspaces/documents/QuillEditor';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
/* @ts-ignore */
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DocumentInfo: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const { data, isLoading, isError } = useWorkspaceDocumentDetail({
        id,
    });

    useEffect(() => {
        if (data) {
            setName(data.name);
            setContent(data.content);
        }
    }, [data]);

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleDownload = () => {
        // Create a temporary HTML element to handle the content
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;

        // Extract only the plain text content (removes all HTML tags)
        const plainTextContent =
            tempElement.textContent || tempElement.innerText || '';

        // Create a Blob and trigger the download
        const blob = new Blob([plainTextContent], {
            type: 'text/plain;charset=utf-8',
        });
        saveAs(blob, `${name}.txt`);
    };

    const handleExportPDF = () => {
        const pdfContent = htmlToPdfmake(content);
        const documentDefinition = { content: pdfContent };
        pdfMake.createPdf(documentDefinition).download(`${name}.pdf`);
    };

    const handleDocxDownload = () => {
        const converted = htmlDocx.asBlob(content);
        saveAs(converted, `${name}.docx`);
    };

    if (isLoading) return <Loader2 className='h-8 w-8 animate-spin' />;

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    return (
        <>
            <h2 className='mt-5 flex justify-center align-top text-3xl dark:text-blue-50'>
                Document Info
            </h2>
            <DocToolbar
                isEditMode={isEditMode}
                handleEditToggle={handleEditToggle}
                handleDownload={handleDownload}
                handleExportPDF={handleExportPDF}
                handleDocxDownload={handleDocxDownload}
            />

            <div className='ml-4 mt-4'>
                <form>
                    <Input
                        value={name}
                        disabled={!isEditMode}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {isEditMode && (
                        <Button variant={'default'} className='mt-4'>
                            Save document
                        </Button>
                    )}
                    <div className='mt-4'>
                        <QuillEditor
                            value={content}
                            readOnly={!isEditMode}
                            onChange={setContent}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default DocumentInfo;
