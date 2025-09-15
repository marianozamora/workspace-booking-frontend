import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error: any) => {
				// Don't retry on 4xx errors except 401
				if (
					error?.response?.status >= 400 &&
					error?.response?.status < 500 &&
					error?.response?.status !== 401
				) {
					return false;
				}
				return failureCount < 3;
			},
			staleTime: 60 * 1000, // 1 minute default
			gcTime: 5 * 60 * 1000, // 5 minutes (previously cacheTime)
		},
		mutations: {
			retry: (failureCount, error: any) => {
				// Don't retry mutations on client errors
				if (error?.response?.status >= 400 && error?.response?.status < 500) {
					return false;
				}
				return failureCount < 2;
			},
		},
	},
});

interface QueryProviderProps {
	children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
};

export { queryClient };
