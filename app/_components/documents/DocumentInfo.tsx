'use client';

import { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DocToolbar from './DocToolbar';
import { Input } from '@/components/ui/input';
import QuillEditor from '../workspaces/documents/QuillEditor';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import { saveAs } from 'file-saver';
import pdfFonts from 'pdfmake/build/vfs_fonts';
// @ts-expect-error: This import may not have TypeScript definitions available.
import htmlDocx from 'html-docx-js/dist/html-docx';
import useWorkspaceDocumentDetail from '@/app/_hooks/workspace-documents/useWorkspaceDocumentDetail';
import useUpdateWorkspaceDocument from '@/app/_hooks/workspace-documents/useUpdateWorkspaceDocument';
import Loading from '../shared/Loading';
import { ConfettiButton } from '@/components/ui/confetti-button';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DocumentInfo: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const { data, isLoading, isError, error } = useWorkspaceDocumentDetail({ id });
    const { mutate: updateDocument } = useUpdateWorkspaceDocument({ id });

    useEffect(() => {
        if (data) {
            setName(data.name);
            setContent(data.content);
        }
    }, [data]);

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSave = () => {
        if (isEditMode) {
            updateDocument({ name, content });
            setIsEditMode(false);
        }
    };

    const handleDownload = () => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;
        const plainTextContent = tempElement.textContent || tempElement.innerText || '';
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

    const handlePublish = () => {
        // Simulate publishing logic
        console.log(`Publishing document: ${name}`);
        // Optionally, call an API endpoint to publish the document
    };

    if (isLoading) return <Loading />;

    if (isError) {
        const errorMessage = (error as Error)?.message || 'Something went wrong.';
        return <p className='text-xl font-bold text-red-700'>{errorMessage}</p>;
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
                handlePublish={handlePublish}
                documentId={id}
            />
            <div className='ml-4 mt-4'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input
                        value={name}
                        disabled={!isEditMode}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {isEditMode && (
                        <ConfettiButton
                            variant={'default'}
                            className='mt-4'
                            onClick={handleSave}
                        >
                            Save document
                        </ConfettiButton>
                    )}
                    <ConfettiButton
                        variant={'outline'}
                        className='mt-4 ml-2'
                        onClick={handlePublish}
                    >
                        Publish document
                    </ConfettiButton>
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
