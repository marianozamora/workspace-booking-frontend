import React from 'react';
import { useNotifications } from '../store/useAppStore';
import type { ApiError } from '../types';

// Error handling utility functions
export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    // Handle axios errors
    if (
      'response' in error &&
      error.response &&
      typeof error.response === 'object'
    ) {
      const response = error.response as any;

      // Check for API error format
      if (response.data && typeof response.data === 'object') {
        const apiError = response.data as ApiError;
        if (apiError.message) {
          return apiError.message;
        }
        if (apiError.error) {
          return apiError.error;
        }
      }

      // Fallback to status text
      if (response.statusText) {
        return response.statusText;
      }

      // Fallback to status code
      if (response.status) {
        return `Error ${response.status}`;
      }
    }

    // Handle network errors
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    // Handle Error objects
    if (error instanceof Error) {
      return error.message;
    }
  }

  return 'An unexpected error occurred';
};

export const getErrorTitle = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as any).response;

    if (response?.status) {
      switch (response.status) {
        case 400:
          return 'Invalid Request';
        case 401:
          return 'Authentication Failed';
        case 403:
          return 'Access Denied';
        case 404:
          return 'Not Found';
        case 409:
          return 'Conflict';
        case 422:
          return 'Validation Error';
        case 429:
          return 'Too Many Requests';
        case 500:
          return 'Server Error';
        case 502:
          return 'Bad Gateway';
        case 503:
          return 'Service Unavailable';
        default:
          return 'Request Failed';
      }
    }
  }

  return 'Error';
};

// Custom hook for error handling
export const useErrorHandler = () => {
  const { addNotification } = useNotifications();

  const handleError = React.useCallback(
    (error: unknown, customTitle?: string) => {
      const title = customTitle || getErrorTitle(error);
      const message = getErrorMessage(error);

      addNotification({
        type: 'error',
        title,
        message,
        duration: 7000, // Longer duration for errors
      });
    },
    [addNotification]
  );

  const handleSuccess = React.useCallback(
    (message: string, title = 'Success') => {
      addNotification({
        type: 'success',
        title,
        message,
        duration: 4000,
      });
    },
    [addNotification]
  );

  const handleWarning = React.useCallback(
    (message: string, title = 'Warning') => {
      addNotification({
        type: 'warning',
        title,
        message,
        duration: 5000,
      });
    },
    [addNotification]
  );

  const handleInfo = React.useCallback(
    (message: string, title = 'Information') => {
      addNotification({
        type: 'info',
        title,
        message,
        duration: 4000,
      });
    },
    [addNotification]
  );

  return {
    handleError,
    handleSuccess,
    handleWarning,
    handleInfo,
  };
};

// Error boundary component

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
    // Error boundary caught an error - handle silently or with proper error reporting
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        );
      }

      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
          <div className='max-w-md w-full bg-white shadow-lg rounded-lg p-6'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-6 w-6 text-red-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-gray-800'>
                  Something went wrong
                </h3>
                <div className='mt-2 text-sm text-gray-500'>
                  <p>{this.state.error.message}</p>
                </div>
                <div className='mt-4'>
                  <button
                    type='button'
                    className='bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                    onClick={this.resetError}
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
