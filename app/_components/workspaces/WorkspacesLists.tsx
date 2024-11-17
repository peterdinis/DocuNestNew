"use client";

import { workspacesPerPage } from "@/app/_constants/applicationConstants";
import { useDebounce } from "@/app/_hooks/shared/useDebounce";
import usePaginatedWorkspaces from "@/app/_hooks/workspaces/usePaginatedWorkspaces";
import type { WorkspacePaginationType } from "@/app/_types/workspaceTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { type ChangeEvent, type FC, useEffect, useMemo, useState } from "react";
import AppPagination from "../shared/AppPagination";
import Loading from "../shared/Loading";
import CreateNewWorkspaceModal from "./CreateNewWorkspaceModal";

const WorkspacesLists: FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	const { data, isLoading, isError, error, refetch } = usePaginatedWorkspaces({
		query: debouncedSearchQuery,
		page: currentPage,
	});

	useEffect(() => {
		refetch();
	}, [debouncedSearchQuery, currentPage, refetch]);

	const filteredWorkspaces = useMemo(() => {
		return (
			data?.workspaces?.filter(
				(workspace: WorkspacePaginationType) => !workspace.inTrash,
			) || []
		);
	}, [data?.workspaces]);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		const errorMessage = (error as Error)?.message || "Something went wrong.";
		return <p className="text-xl font-bold text-red-700">{errorMessage}</p>;
	}

	const totalWorkspaces = data?.totalWorkspaces || 0;
	const totalPages = Math.ceil(totalWorkspaces / workspacesPerPage);

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<>
			<Card className="mb-6 mt-4">
				<Input
					placeholder="Search..."
					value={searchQuery}
					onChange={handleSearchInputChange}
				/>
				<CardHeader>
					<CardTitle className="prose-h2: prose text-xl font-bold dark:text-white">
						My All Workspaces
					</CardTitle>
				</CardHeader>

				<div className="float-right">
					<CreateNewWorkspaceModal />
				</div>
				<CardContent>
					<div className="grid grid-cols-3 gap-4">
						<AnimatePresence>
							{filteredWorkspaces.length > 0 ? (
								filteredWorkspaces.map((workspace: WorkspacePaginationType) => (
									<motion.div
										key={workspace.id}
										className="overflow-x-scroll rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg dark:bg-zinc-800"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
									>
										<Link href={`/workspaces/${workspace.id}`}>
											<p className="text-2xl">{workspace.workspaceEmoji}</p>
											<CardTitle className="prose-p: prose break-all text-lg font-bold dark:text-white">
												{workspace.name}
											</CardTitle>
											<CardTitle className="prose-p: prose break-all text-sm text-gray-600 dark:text-white">
												{workspace.description || "No description"}
											</CardTitle>
											<CardTitle className="break-all text-xs text-gray-400 dark:text-white">
												Created at:{" "}
												{format(new Date(workspace.createdAt), "MMMM dd, yyyy")}
											</CardTitle>
										</Link>
									</motion.div>
								))
							) : (
								<motion.p
									className="prose-p prose col-span-3 text-center text-zinc-600 dark:text-white"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									No workspaces found. 😔
								</motion.p>
							)}
						</AnimatePresence>
					</div>
					<div className="mt-6 flex justify-center">
						<AppPagination
							hasNextPage={currentPage < totalPages}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default WorkspacesLists;
