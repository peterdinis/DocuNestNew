import { QueryClient } from '@tanstack/react-query';
import { mutationCache } from './cache/mutationCache';
import { queryCache } from './cache/queryCache';

export const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            staleTime: Infinity,
        },
        mutations: {
            networkMode: 'offlineFirst',
        },
    },
});
