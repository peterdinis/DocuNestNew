'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Member = {
    id: string;
    name: string;
    email: string;
    role: string;
};

export type Document = {
    id: number;
    name: string;
    createdAt: string | Date;
    lastUpdate: string | Date;
};

export const documentColumns: ColumnDef<Document>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        cell: info => info.getValue(),
        
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: info => new Date(info.getValue() as any).toLocaleDateString(),
    },

    {
        accessorKey: 'lastUpdate',
        header: 'Last Update',
        cell: info => new Date(info.getValue() as any).toLocaleDateString(),
    },
];

export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
];
