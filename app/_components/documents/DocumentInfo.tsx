"use client"

import useWorkspaceDocumentDetail from "@/app/_hooks/workspace-documents/useWorkspaceDocumentDetail";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { FC, useState, useEffect } from "react";
import DocToolbar from "./DocToolbar";
import { Input } from "@/components/ui/input";
import QuillEditor from "../workspaces/documents/QuillEditor";

const DocumentInfo: FC = () => {
    const {id} = useParams<{id: string}>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const {data, isLoading, isError} = useWorkspaceDocumentDetail({
        id
    });

    useEffect(() => {
        if (data) {
            setName(data.name);
            setContent(data.content);
        }
    }, [data]);

    if(isLoading) return <Loader2 className="animate-spin w-8 h-8" />

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
            <DocToolbar />

            <div className="mt-4 ml-4">
                <form>
                    <Input 
                        value={name}
                    />

                    <div className="mt-4">
                    <QuillEditor
                        value={content}
                        readOnly={false}
                        onChange={setContent}
                    />
                    </div>
                </form>
            </div>
        </>
    )
}

export default DocumentInfo;