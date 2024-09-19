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
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created',
    },

    {
        accessorKey: 'lastUpdate',
        header: 'Last Update',
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
