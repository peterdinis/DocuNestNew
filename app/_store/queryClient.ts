import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			staleTime: Number.POSITIVE_INFINITY,
		},
		mutations: {
			networkMode: "offlineFirst",
		},
	},
});
