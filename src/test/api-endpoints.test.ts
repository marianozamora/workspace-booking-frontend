import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiClient } from '../services/api';
import { api } from '../services';
import type {
  CreateSpaceRequest,
  UpdateSpaceRequest,
  CreateBookingRequest,
  UpdateBookingRequest,
  BookingStatus,
} from '../types';

// Mock axios
vi.mock('../services/api', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('API Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Spaces Service', () => {
    it('should call GET /api/v1/spaces', async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: '1',
              name: 'Meeting Room A',
              location: 'Floor 2',
              capacity: 10,
              description: 'Modern meeting room',
              isAvailable: true,
              createdAt: '2024-01-01',
              updatedAt: '2024-01-01',
            },
          ],
        },
      };

      (apiClient.get as any).mockResolvedValue(mockResponse);

      await api.spaces.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/spaces');
    });

    it('should call GET /api/v1/spaces/{id}', async () => {
      const mockResponse = {
        data: {
          data: {
            id: '1',
            name: 'Meeting Room A',
            location: 'Floor 2',
            capacity: 10,
            description: 'Modern meeting room',
            isAvailable: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        },
      };

      (apiClient.get as any).mockResolvedValue(mockResponse);

      await api.spaces.getById('1');

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/spaces/1');
    });

    it('should call POST /api/v1/spaces', async () => {
      const mockRequest: CreateSpaceRequest = {
        name: 'New Room',
        location: 'Floor 3',
        capacity: 8,
        description: 'New meeting room',
        isAvailable: true,
      };

      const mockResponse = {
        data: {
          data: {
            id: '2',
            ...mockRequest,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        },
      };

      (apiClient.post as any).mockResolvedValue(mockResponse);

      await api.spaces.create(mockRequest);

      expect(apiClient.post).toHaveBeenCalledWith(
        '/api/v1/spaces',
        mockRequest
      );
    });

    it('should call PUT /api/v1/spaces/{id}', async () => {
      const mockRequest: UpdateSpaceRequest = {
        name: 'Updated Room',
        capacity: 12,
      };

      const mockResponse = {
        data: {
          data: {
            id: '1',
            name: 'Updated Room',
            location: 'Floor 2',
            capacity: 12,
            description: 'Updated meeting room',
            isAvailable: true,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-02',
          },
        },
      };

      (apiClient.put as any).mockResolvedValue(mockResponse);

      await api.spaces.update('1', mockRequest);

      expect(apiClient.put).toHaveBeenCalledWith(
        '/api/v1/spaces/1',
        mockRequest
      );
    });

    it('should call DELETE /api/v1/spaces/{id}', async () => {
      (apiClient.delete as any).mockResolvedValue({});

      await api.spaces.delete('1');

      expect(apiClient.delete).toHaveBeenCalledWith('/api/v1/spaces/1');
    });
  });

  describe('Bookings Service', () => {
    it('should call GET /api/v1/bookings', async () => {
      const mockResponse = {
        data: {
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        },
      };

      (apiClient.get as any).mockResolvedValue(mockResponse);

      await api.bookings.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/bookings');
    });

    it('should call GET /api/v1/bookings/{id}', async () => {
      const mockResponse = {
        data: {
          data: {
            id: '1',
            spaceId: '1',
            space: {} as any,
            clientEmail: 'test@example.com',
            startTime: '2024-01-01T10:00:00Z',
            endTime: '2024-01-01T11:00:00Z',
            status: 'CONFIRMED' as BookingStatus,
            totalCost: 50,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        },
      };

      (apiClient.get as any).mockResolvedValue(mockResponse);

      await api.bookings.getById('1');

      expect(apiClient.get).toHaveBeenCalledWith('/api/v1/bookings/1');
    });

    it('should call POST /api/v1/bookings', async () => {
      const mockRequest: CreateBookingRequest = {
        spaceId: '1',
        clientEmail: 'test@example.com',
        date: '2024-01-01',
        startTime: '2024-01-01T10:00:00Z',
        endTime: '2024-01-01T11:00:00Z',
      };

      const mockResponse = {
        data: {
          data: {
            id: '1',
            ...mockRequest,
            space: {} as any,
            status: 'CONFIRMED' as BookingStatus,
            totalCost: 50,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        },
      };

      (apiClient.post as any).mockResolvedValue(mockResponse);

      await api.bookings.create(mockRequest);

      expect(apiClient.post).toHaveBeenCalledWith(
        '/api/v1/bookings',
        mockRequest
      );
    });

    it('should call PUT /api/v1/bookings/{id}', async () => {
      const mockRequest: UpdateBookingRequest = {
        startTime: '2024-01-01T14:00:00Z',
        endTime: '2024-01-01T15:00:00Z',
      };

      const mockResponse = {
        data: {
          data: {
            id: '1',
            spaceId: '1',
            space: {} as any,
            clientEmail: 'test@example.com',
            startTime: '2024-01-01T14:00:00Z',
            endTime: '2024-01-01T15:00:00Z',
            status: 'CONFIRMED' as BookingStatus,
            totalCost: 50,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-02',
          },
        },
      };

      (apiClient.put as any).mockResolvedValue(mockResponse);

      await api.bookings.update('1', mockRequest);

      expect(apiClient.put).toHaveBeenCalledWith(
        '/api/v1/bookings/1',
        mockRequest
      );
    });

    it('should call DELETE /api/v1/bookings/{id}', async () => {
      (apiClient.delete as any).mockResolvedValue({});

      await api.bookings.delete('1');

      expect(apiClient.delete).toHaveBeenCalledWith('/api/v1/bookings/1');
    });

    it('should call PATCH /api/v1/bookings/{id}/cancel', async () => {
      const mockResponse = {
        data: {
          data: {
            id: '1',
            spaceId: '1',
            space: {} as any,
            clientEmail: 'test@example.com',
            startTime: '2024-01-01T10:00:00Z',
            endTime: '2024-01-01T11:00:00Z',
            status: 'CANCELLED' as BookingStatus,
            totalCost: 50,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        },
      };

      (apiClient.patch as any).mockResolvedValue(mockResponse);

      await api.bookings.cancel('1');

      expect(apiClient.patch).toHaveBeenCalledWith('/api/v1/bookings/1/cancel');
    });
  });
});
