'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Document = {
    id: number;
    name: string;
    size: string;
};

export const uploadedDocumentColumns: ColumnDef<Document>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'size',
        header: 'Size',
    },
];
