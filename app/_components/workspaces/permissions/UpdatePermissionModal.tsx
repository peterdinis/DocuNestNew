import { FC } from 'react';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UpdatePermissionModal: FC = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline'>Update Permission for member</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Update Permission for member</DialogTitle>
                        <DialogDescription>
                            Make changes to user permissions here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        {/* Permissions Table */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Permission</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Pedro Duarte</TableCell>
                                    <TableCell>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select permission" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="editor">Editor</SelectItem>
                                                <SelectItem value="viewer">Viewer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                                {/* Add more rows here if needed */}
                            </TableBody>
                        </Table>
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
