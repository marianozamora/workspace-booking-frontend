import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import {
  handleApiError,
  getErrorMessage,
  ErrorBoundary,
} from './errorHandling';

describe('Error Handling Utilities', () => {
  describe('getErrorMessage', () => {
    it('returns generic message for unknown error', () => {
      const message = getErrorMessage(null);
      expect(message).toBe('An unexpected error occurred');
    });

    it('returns error message from response data', () => {
      const error = {
        response: {
          data: {
            message: 'Custom error message',
          },
        },
      };
      const message = getErrorMessage(error);
      expect(message).toBe('Custom error message');
    });

    it('returns error message from error object', () => {
      const error = {
        message: 'Network error',
      };
      const message = getErrorMessage(error);
      expect(message).toBe('Network error');
    });

    it('returns string error as is', () => {
      const error = 'Simple error string';
      const message = getErrorMessage(error);
      expect(message).toBe('Simple error string');
    });

    it('handles validation errors', () => {
      const error = {
        response: {
          data: {
            message: 'Validation failed',
            errors: {
              email: ['Email is required'],
              password: ['Password must be at least 8 characters'],
            },
          },
        },
      };
      const message = getErrorMessage(error);
      expect(message).toBe('Validation failed');
    });
  });

  describe('handleApiError', () => {
    it('handles network errors', () => {
      const mockAddNotification = vi.fn();
      const error = {
        code: 'NETWORK_ERROR',
        message: 'Network Error',
      };

      handleApiError(error, mockAddNotification);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Connection Error',
        message: 'Please check your internet connection and try again.',
        duration: 5000,
      });
    });

    it('handles 401 unauthorized errors', () => {
      const mockAddNotification = vi.fn();
      const error = {
        response: {
          status: 401,
          data: {
            message: 'Unauthorized',
          },
        },
      };

      handleApiError(error, mockAddNotification);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Authentication Error',
        message: 'Please check your API key configuration.',
        duration: 5000,
      });
    });

    it('handles 403 forbidden errors', () => {
      const mockAddNotification = vi.fn();
      const error = {
        response: {
          status: 403,
          data: {
            message: 'Forbidden',
          },
        },
      };

      handleApiError(error, mockAddNotification);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Access Denied',
        message: "You don't have permission to perform this action.",
        duration: 5000,
      });
    });

    it('handles 404 not found errors', () => {
      const mockAddNotification = vi.fn();
      const error = {
        response: {
          status: 404,
          data: {
            message: 'Not found',
          },
        },
      };

      handleApiError(error, mockAddNotification);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Not Found',
        message: 'The requested resource was not found.',
        duration: 5000,
      });
    });

    it('handles 400 validation errors', () => {
      const mockAddNotification = vi.fn();
      const error = {
        response: {
          status: 400,
          data: {
            message: 'Validation failed',
            errors: {
              email: ['Email is required'],
            },
          },
        },
      };

      handleApiError(error, mockAddNotification);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Validation Error',
        message: 'Validation failed',
        duration: 5000,
      });
    });

    it('handles 500 server errors', () => {
      const mockAddNotification = vi.fn();
      const error = {
        response: {
          status: 500,
          data: {
            message: 'Internal server error',
          },
        },
      };

      handleApiError(error, mockAddNotification);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.',
        duration: 5000,
      });
    });

    it('handles generic errors', () => {
      const mockAddNotification = vi.fn();
      const error = {
        message: 'Something went wrong',
      };

      handleApiError(error, mockAddNotification);

      expect(mockAddNotification).toHaveBeenCalledWith({
        type: 'error',
        title: 'Error',
        message: 'Something went wrong',
        duration: 5000,
      });
    });
  });

  describe('ErrorBoundary', () => {
    // Mock console.error to avoid noise in tests
    const originalError = console.error;
    beforeEach(() => {
      console.error = vi.fn();
    });

    afterEach(() => {
      console.error = originalError;
    });

    it('renders children when there is no error', () => {
      const TestComponent = () => <div>Test content</div>;

      renderWithProviders(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders error fallback when there is an error', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      renderWithProviders(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(
        screen.getByText(/An unexpected error occurred/)
      ).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      const CustomFallback = ({ error }) => (
        <div>Custom error: {error.message}</div>
      );

      renderWithProviders(
        <ErrorBoundary fallback={CustomFallback}>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Custom error: Test error')).toBeInTheDocument();
    });

    it('logs error to console', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      renderWithProviders(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(console.error).toHaveBeenCalled();
    });
  });
});
