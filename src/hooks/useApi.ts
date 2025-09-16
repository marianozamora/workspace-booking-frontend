import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services';
import type {
  CreateBookingRequest,
  UpdateBookingRequest,
  CreateSpaceRequest,
  UpdateSpaceRequest,
} from '../types';

// Query Keys
export const queryKeys = {
  spaces: ['spaces'] as const,
  space: (id: string) => ['spaces', id] as const,
  bookings: (params?: any) => ['bookings', params] as const,
  booking: (id: string) => ['bookings', id] as const,
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
      // Invalidate all bookings queries (with any parameters)
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
        exact: false, // This will invalidate all queries that start with ["bookings"]
      });
      // Also invalidate spaces to update availability
      queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.bookings.cancel(id),
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['bookings'] });

      // Snapshot the previous value
      const previousBookings = queryClient.getQueriesData({
        queryKey: ['bookings'],
      });

      // Optimistically update to the new value
      queryClient.setQueriesData({ queryKey: ['bookings'] }, (old: any) => {
        if (!old) return old;

        // Update bookings data to mark the booking as cancelled
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.map((booking: any) =>
              booking.id === id ? { ...booking, status: 'CANCELLED' } : booking
            ),
          };
        }
        return old;
      });

      // Return a context object with the snapshotted value
      return { previousBookings };
    },
    onError: (_err, _id, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousBookings) {
        context.previousBookings.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
        exact: false,
      });
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
      // Invalidate all bookings queries (with any parameters)
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
        exact: false, // This will invalidate all queries that start with ["bookings"]
      });
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
      // Invalidate all bookings queries (with any parameters)
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
        exact: false, // This will invalidate all queries that start with ["bookings"]
      });
      // Also invalidate spaces to update availability
      queryClient.invalidateQueries({ queryKey: queryKeys.spaces });
    },
  });
};
