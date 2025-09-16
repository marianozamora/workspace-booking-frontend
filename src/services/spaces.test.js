import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { spacesService } from './spaces';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('Spaces Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getSpaces', () => {
    it('fetches spaces successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: [
            {
              id: '1',
              name: 'Conference Room A',
              description: 'A large conference room',
              capacity: 10,
              location: 'Floor 1',
              amenities: ['projector'],
              is_available: true,
              hourly_rate: 50.0,
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

      const result = await spacesService.getSpaces();

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/spaces', {
        params: {},
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('fetches spaces with query parameters', async () => {
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
        location: 'Floor 1',
        min_capacity: 5,
      };

      const result = await spacesService.getSpaces(params);

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/spaces', {
        params,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('handles API errors', async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: 'Internal server error',
          },
          status: 500,
        },
      };

      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(spacesService.getSpaces()).rejects.toThrow();
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/spaces', {
        params: {},
      });
    });
  });

  describe('getSpaceById', () => {
    it('fetches space by id successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            name: 'Conference Room A',
            description: 'A large conference room',
            capacity: 10,
            location: 'Floor 1',
            amenities: ['projector'],
            is_available: true,
            hourly_rate: 50.0,
          },
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await spacesService.getSpaceById('1');

      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/spaces/1');
      expect(result).toEqual(mockResponse.data);
    });

    it('handles not found error', async () => {
      const mockError = {
        response: {
          data: {
            success: false,
            message: 'Space not found',
          },
          status: 404,
        },
      };

      mockedAxios.get.mockRejectedValueOnce(mockError);

      await expect(spacesService.getSpaceById('999')).rejects.toThrow();
      expect(mockedAxios.get).toHaveBeenCalledWith('/api/v1/spaces/999');
    });
  });
});
