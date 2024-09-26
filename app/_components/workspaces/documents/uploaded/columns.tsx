'use client';

import { ColumnDef } from '@tanstack/react-table';
import prettyBytes from 'pretty-bytes';

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
        cell: ({ getValue }) => {
            const sizeInBytes = getValue() as number;
            return prettyBytes(sizeInBytes);
        },
    },
];
