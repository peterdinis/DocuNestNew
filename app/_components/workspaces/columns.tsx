'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

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
};

export const documentColumns: ColumnDef<Document>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const documentId = row.original.id;
            const documentName = row.original.name;
            return (
                <Link href={`/documents/${documentId}`}>{documentName}</Link>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: (info) => new Date(info.getValue() as any).toLocaleDateString(),
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
