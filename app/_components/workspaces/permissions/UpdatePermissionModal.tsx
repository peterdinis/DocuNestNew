'use client';

import { FC, Key, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useDisplayWorkspaceMembers from '@/app/_hooks/workspace-mebers/useDisplayWorkspaceMembers';
import Loading from '../../shared/Loading';

interface IUpdatePermissionModalProps {
    workspaceId: string;
}

const UpdatePermissionModal: FC<IUpdatePermissionModalProps> = ({
    workspaceId,
}: IUpdatePermissionModalProps) => {
    const { data, isLoading, isError, error } = useDisplayWorkspaceMembers({
        id: workspaceId,
    });

    const allMembersInWorkspace = useMemo(() => {
        return data && data[0]?.members || [];
    }, [data]);

    if (isLoading) return <Loading />;

    if (isError) {
        const errorMessage =
            (error as Error)?.message || 'Something went wrong.';
        return <p className='text-xl font-bold text-red-700'>{errorMessage}</p>;
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline'>
                        Update Permission for user
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Update Permission for user</DialogTitle>
                        <DialogDescription>
                            Make changes to user permissions here. Click save
                            when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        {allMembersInWorkspace.length === 0 ? (
                            <p className='text-center text-gray-500'>
                                No members found.
                            </p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Permission</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allMembersInWorkspace.map(
                                        (member: { id: Key; name: string }) => (
                                            <TableRow key={member.id}>
                                                <TableCell>
                                                    {member.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder='Select permission' />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value='admin'>
                                                                Admin
                                                            </SelectItem>
                                                            <SelectItem value='editor'>
                                                                Editor
                                                            </SelectItem>
                                                            <SelectItem value='viewer'>
                                                                Viewer
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                        ),
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type='submit'>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdatePermissionModal;
