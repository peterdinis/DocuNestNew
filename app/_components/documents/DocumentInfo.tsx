"use client"

import useWorkspaceDocumentDetail from "@/app/_hooks/workspace-documents/useWorkspaceDocumentDetail";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import DocToolbar from "./DocToolbar";

const DocumentInfo: FC = () => {
    const {id} = useParams<{id: string}>();
    const [isEditMode, setIsEditMode] = useState(false);

    const {data, isLoading, isError} = useWorkspaceDocumentDetail({
        id
    });

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
        </>
    )
}

export default DocumentInfo;