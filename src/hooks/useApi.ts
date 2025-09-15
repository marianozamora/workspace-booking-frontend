import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services";
import type {
	CreateBookingRequest,
	UpdateBookingRequest,
	CreateSpaceRequest,
	UpdateSpaceRequest,
} from "../types";

// Query Keys
export const queryKeys = {
	spaces: ["spaces"] as const,
	space: (id: string) => ["spaces", id] as const,
	bookings: (params?: any) => ["bookings", params] as const,
	booking: (id: string) => ["bookings", id] as const,
};

// Spaces Hooks
export const useSpaces = () => {
	return useQuery({
		queryKey: queryKeys.spaces,
		queryFn: api.spaces.getAll,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const useSpace = (id: string) => {
	return useQuery({
		queryKey: queryKeys.space(id),
		queryFn: () => api.spaces.getById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Bookings Hooks
export const useBookings = (params?: {
	page?: number;
	limit?: number;
	spaceId?: string;
	status?: string;
}) => {
	return useQuery({
		queryKey: queryKeys.bookings(params),
		queryFn: () => api.bookings.getAll(params),
		staleTime: 30 * 1000, // 30 seconds (bookings change more frequently)
	});
};

export const useBooking = (id: string) => {
	return useQuery({
		queryKey: queryKeys.booking(id),
		queryFn: () => api.bookings.getById(id),
		enabled: !!id,
		staleTime: 30 * 1000, // 30 seconds
	});
};

// Booking Mutations
export const useCreateBooking = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateBookingRequest) => api.bookings.create(data),
		onSuccess: () => {
			// Invalidate and refetch bookings
			queryClient.invalidateQueries({ queryKey: queryKeys.bookings() });
			// Also invalidate spaces to update availability
			queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
		},
	});
};

export const useCancelBooking = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => api.bookings.cancel(id),
		onSuccess: () => {
			// Invalidate and refetch bookings
			queryClient.invalidateQueries({ queryKey: queryKeys.bookings() });
			// Also invalidate spaces to update availability
			queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
		},
	});
};

// Space Mutations
export const useCreateSpace = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateSpaceRequest) => api.spaces.create(data),
		onSuccess: () => {
			// Invalidate and refetch spaces
			queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
		},
	});
};

export const useUpdateSpace = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateSpaceRequest }) =>
			api.spaces.update(id, data),
		onSuccess: () => {
			// Invalidate and refetch spaces
			queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
		},
	});
};

export const useDeleteSpace = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => api.spaces.delete(id),
		onSuccess: () => {
			// Invalidate and refetch spaces
			queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
			// Also invalidate bookings in case some bookings referenced this space
			queryClient.invalidateQueries({ queryKey: queryKeys.bookings() });
		},
	});
};

// Additional Booking Mutations
export const useUpdateBooking = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateBookingRequest }) =>
			api.bookings.update(id, data),
		onSuccess: () => {
			// Invalidate and refetch bookings
			queryClient.invalidateQueries({ queryKey: queryKeys.bookings() });
			// Also invalidate spaces to update availability
			queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
		},
	});
};

export const useDeleteBooking = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => api.bookings.delete(id),
		onSuccess: () => {
			// Invalidate and refetch bookings
			queryClient.invalidateQueries({ queryKey: queryKeys.bookings() });
			// Also invalidate spaces to update availability
			queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
		},
	});
};
