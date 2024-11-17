"use client";

import { queryClient } from "@/app/_store/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FC, ReactNode } from "react";

interface IQueryProviderProps {
	children?: ReactNode;
}

const QueryProvider: FC<IQueryProviderProps> = ({
	children,
}: IQueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default QueryProvider;
