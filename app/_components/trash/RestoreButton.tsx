"use client"

import useRestoreWorkspaceFromTrash from "@/app/_hooks/trash/useRestoreWorkspaceFromTrash";
import { FC } from "react";
import Loading from "../shared/Loading";

type RestoreButtonProps = {
    id: string;
};

const RestoreButton: FC<RestoreButtonProps> = ({ id }) => {
    const restoreMutation = useRestoreWorkspaceFromTrash({ id });

    return (
        <button
            onClick={() => restoreMutation.mutate()}
            disabled={restoreMutation.isPending}
            className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
            {restoreMutation.isPending ? <Loading /> : 'Restore'}
        </button>
    );
};

export default RestoreButton