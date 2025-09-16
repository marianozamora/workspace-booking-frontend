// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Space types
export interface Space {
  id: string;
  name: string;
  description?: string;
  location: string;
  capacity: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// Booking types
export interface Booking {
  id: string;
  spaceId: string;
  space: Space;
  clientEmail: string;
  date?: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

// Form types
export interface CreateBookingRequest {
  spaceId: string;
  clientEmail: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface UpdateBookingRequest {
  spaceId?: string;
  clientEmail?: string;
  startTime?: string;
  endTime?: string;
  status?: BookingStatus;
}

export interface CreateSpaceRequest {
  name: string;
  description?: string;
  location: string;
  capacity: number;
  isAvailable?: boolean;
}

export interface UpdateSpaceRequest {
  name?: string;
  description?: string;
  location?: string;
  capacity?: number;
  isAvailable?: boolean;
}

// Error types
export interface ApiError {
  error: string;
  message: string;
  statusCode?: number;
  details?: Record<string, any>;
}
