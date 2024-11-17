"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import RestoreButton from "../trash/RestoreButton";

export type Member = {
	id: string;
	name: string;
	email: string;
	role: string;
};

export type Workspace = {
	id: number;
	name: string;
};

export type Document = {
	id: number;
	name: string;
	createdAt: string | Date;
};

export const trashColumns: ColumnDef<Workspace>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: (info) => info.getValue(),
	},

	{
		accessorKey: "name",
		header: "Name",
		cell: (info) => info.getValue(),
	},

	// Nový stĺpec pre tlačidlo "Restore"
	{
		header: "Actions",
		cell: ({ row }) => {
			const workspaceId = row.original.id.toString();
			return <RestoreButton id={workspaceId} />;
		},
	},
];

export const documentColumns: ColumnDef<Document>[] = [
	{
		accessorKey: "id",
		header: "Id",
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			const documentId = row.original.id;
			const documentName = row.original.name;
			return <Link href={`/documents/${documentId}`}>{documentName}</Link>;
		},
	},
	{
		accessorKey: "createdAt",
		header: "Created",
		cell: (info) => {
			const dateValue = info.getValue() as string | Date;
			return new Date(dateValue).toLocaleDateString();
		},
	},
];

export const columns: ColumnDef<Member>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
];
