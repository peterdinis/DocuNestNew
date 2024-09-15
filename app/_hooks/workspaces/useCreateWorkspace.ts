"use client"

import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { queryClient } from "@/app/_store/queryClient"
import { WorkspaceType } from "@/app/_types/workspaceTypes"
import { createWorkspace } from "@/app/_store/mutations/workspaceMutations"

const useCreateWorkspace = () => {
    const {toast} = useToast();
    return useMutation({
        mutationKey: ["newWorkspace"],
        mutationFn: async(data: WorkspaceType) => {
            return await createWorkspace(data);
        },
        onSuccess: () => {
            toast({
                title: "New workspace was created",
                duration: 2000,
                className: "bg-green-800 text-white font-bold"
            })
        },

        onError: () => {
            toast({
                title: "New workspace was not created",
                duration: 2000,
                className: "bg-red-800 text-white font-bold"
            })
        }
    })
}

export default useCreateWorkspace;