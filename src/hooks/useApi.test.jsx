import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useSpaces,
  useSpaceById,
  useBookings,
  useCreateBooking,
  useCancelBooking,
} from './useApi';
import * as spacesService from '../services/spaces';
import * as bookingsService from '../services/bookings';

// Mock the services
vi.mock('../services/spaces');
vi.mock('../services/bookings');

const mockedSpacesService = vi.mocked(spacesService);
const mockedBookingsService = vi.mocked(bookingsService);

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useApi hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useSpaces', () => {
    it('fetches spaces successfully', async () => {
      const mockSpacesResponse = {
        success: true,
        data: [
          {
            id: '1',
            name: 'Conference Room A',
            capacity: 10,
            location: 'Floor 1',
          },
        ],
        pagination: {
          page: 1,
          per_page: 10,
          total: 1,
          total_pages: 1,
        },
      };

      mockedSpacesService.getSpaces.mockResolvedValueOnce(mockSpacesResponse);

      const { result } = renderHook(() => useSpaces(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSpacesResponse);
      expect(mockedSpacesService.getSpaces).toHaveBeenCalledWith({});
    });

    it('fetches spaces with parameters', async () => {
      const params = { page: 2, location: 'Floor 1' };
      const mockSpacesResponse = {
        success: true,
        data: [],
        pagination: {
          page: 2,
          per_page: 10,
          total: 0,
          total_pages: 0,
        },
      };

      mockedSpacesService.getSpaces.mockResolvedValueOnce(mockSpacesResponse);

      const { result } = renderHook(() => useSpaces(params), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedSpacesService.getSpaces).toHaveBeenCalledWith(params);
    });

    it('handles errors', async () => {
      const mockError = new Error('Failed to fetch spaces');
      mockedSpacesService.getSpaces.mockRejectedValueOnce(mockError);

      const { result } = renderHook(() => useSpaces(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useSpaceById', () => {
    it('fetches space by id successfully', async () => {
      const spaceId = '1';
      const mockSpaceResponse = {
        success: true,
        data: {
          id: '1',
          name: 'Conference Room A',
          capacity: 10,
          location: 'Floor 1',
        },
      };

      mockedSpacesService.getSpaceById.mockResolvedValueOnce(mockSpaceResponse);

      const { result } = renderHook(() => useSpaceById(spaceId), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockSpaceResponse);
      expect(mockedSpacesService.getSpaceById).toHaveBeenCalledWith(spaceId);
    });

    it('does not fetch when spaceId is not provided', () => {
      const { result } = renderHook(() => useSpaceById(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.isIdle).toBe(true);
      expect(mockedSpacesService.getSpaceById).not.toHaveBeenCalled();
    });
  });

  describe('useBookings', () => {
    it('fetches bookings successfully', async () => {
      const mockBookingsResponse = {
        success: true,
        data: [
          {
            id: '1',
            space_id: '1',
            purpose: 'Team meeting',
            status: 'confirmed',
          },
        ],
        pagination: {
          page: 1,
          per_page: 10,
          total: 1,
          total_pages: 1,
        },
      };

      mockedBookingsService.getBookings.mockResolvedValueOnce(
        mockBookingsResponse
      );

      const { result } = renderHook(() => useBookings(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockBookingsResponse);
      expect(mockedBookingsService.getBookings).toHaveBeenCalledWith({});
    });
  });

  describe('useCreateBooking', () => {
    it('creates booking successfully', async () => {
      const newBooking = {
        space_id: '1',
        start_time: '2024-01-15T09:00:00Z',
        end_time: '2024-01-15T11:00:00Z',
        purpose: 'Team meeting',
        attendees_count: 5,
      };

      const mockResponse = {
        success: true,
        data: { id: '1', ...newBooking, status: 'confirmed' },
        message: 'Booking created successfully',
      };

      mockedBookingsService.createBooking.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useCreateBooking(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(newBooking);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockedBookingsService.createBooking).toHaveBeenCalledWith(
        newBooking
      );
    });
  });

  describe('useCancelBooking', () => {
    it('cancels booking successfully', async () => {
      const bookingId = '1';
      const mockResponse = {
        success: true,
        data: { id: '1', status: 'cancelled' },
        message: 'Booking cancelled successfully',
      };

      mockedBookingsService.cancelBooking.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useCancelBooking(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(bookingId);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(mockedBookingsService.cancelBooking).toHaveBeenCalledWith(
        bookingId
      );
    });
  });
});
