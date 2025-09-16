import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { bookingsService } from './bookings';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('Bookings Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getBookings', () => {
    it('fetches bookings successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            {
              id: '1',
              space_id: '1',
              start_time: '2024-01-15T09:00:00Z',
              end_time: '2024-01-15T11:00:00Z',
              purpose: 'Team meeting',
              attendees_count: 5,
              total_cost: 100.0,
              status: 'confirmed',
            },
          ],
          pagination: {
            page: 1,
            per_page: 10,
            total: 1,
            total_pages: 1,
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await bookingsService.getBookings();

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/bookings', {
        params: {},
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('fetches bookings with query parameters', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [],
          pagination: {
            page: 2,
            per_page: 5,
            total: 0,
            total_pages: 0,
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const params = {
        page: 2,
        per_page: 5,
        status: 'confirmed',
        space_id: '1',
      };

      const result = await bookingsService.getBookings(params);

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/bookings', {
        params,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getBookingById', () => {
    it('fetches booking by id successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            space_id: '1',
            start_time: '2024-01-15T09:00:00Z',
            end_time: '2024-01-15T11:00:00Z',
            purpose: 'Team meeting',
            attendees_count: 5,
            total_cost: 100.0,
            status: 'confirmed',
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await bookingsService.getBookingById('1');

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/bookings/1');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('createBooking', () => {
    it('creates booking successfully', async () => {
      const newBooking = {
        space_id: '1',
        start_time: '2024-01-15T09:00:00Z',
        end_time: '2024-01-15T11:00:00Z',
        purpose: 'Team meeting',
        attendees_count: 5,
      };

      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            ...newBooking,
            total_cost: 100.0,
            status: 'confirmed',
          },
          message: 'Booking created successfully',
        },
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await bookingsService.createBooking(newBooking);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/v1/bookings',
        newBooking
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('handles validation errors', async () => {
      const invalidBooking = {
        space_id: '',
        start_time: '',
        end_time: '',
        purpose: '',
        attendees_count: 0,
      };

      const mockError = {
        response: {
          data: {
            success: false,
            message: 'Validation failed',
            errors: {
              space_id: ['Space ID is required'],
              start_time: ['Start time is required'],
            },
          },
          status: 400,
        },
      };

      mockedAxios.post.mockRejectedValueOnce(mockError);

      await expect(
        bookingsService.createBooking(invalidBooking)
      ).rejects.toThrow();
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/v1/bookings',
        invalidBooking
      );
    });
  });

  describe('cancelBooking', () => {
    it('cancels booking successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            status: 'cancelled',
          },
          message: 'Booking cancelled successfully',
        },
      };

      mockedAxios.patch.mockResolvedValueOnce(mockResponse);

      const result = await bookingsService.cancelBooking('1');

      expect(mockedAxios.patch).toHaveBeenCalledWith(
        '/api/v1/bookings/1/cancel'
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('handles cancel booking errors', async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: 'Cannot cancel booking - already started',
          },
          status: 400,
        },
      };

      mockedAxios.patch.mockRejectedValueOnce(mockError);

      await expect(bookingsService.cancelBooking('1')).rejects.toThrow();
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        '/api/v1/bookings/1/cancel'
      );
    });
  });
});
