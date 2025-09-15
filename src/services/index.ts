import { apiClient } from "./api";
import type {
	Space,
	Booking,
	CreateBookingRequest,
	UpdateBookingRequest,
	CreateSpaceRequest,
	UpdateSpaceRequest,
	PaginatedResponse,
	ApiResponse,
} from "../types";
import {
	transformSpacesData,
	transformSpaceData,
	transformBookingsData,
	transformBookingData,
	BackendBooking,
} from "../utils/dataTransformers";
import type { BackendSpace } from "../utils/dataTransformers";

// Spaces Service
export const spacesService = {
	// Get all spaces
	getAll: async (): Promise<Space[]> => {
		const response = await apiClient.get<ApiResponse<BackendSpace[]>>(
			"/api/v1/spaces"
		);
		return transformSpacesData(response.data.data);
	},

	// Get space by ID
	getById: async (id: string): Promise<Space> => {
		const response = await apiClient.get<ApiResponse<BackendSpace>>(
			`/api/v1/spaces/${id}`
		);
		return transformSpaceData(response.data.data);
	},

	// Create new space
	create: async (spaceData: CreateSpaceRequest): Promise<Space> => {
		const response = await apiClient.post<ApiResponse<Space>>(
			"/api/v1/spaces",
			spaceData
		);
		return response.data.data;
	},

	// Update space
	update: async (id: string, spaceData: UpdateSpaceRequest): Promise<Space> => {
		const response = await apiClient.put<ApiResponse<Space>>(
			`/api/v1/spaces/${id}`,
			spaceData
		);
		return response.data.data;
	},

	// Delete space
	delete: async (id: string): Promise<void> => {
		await apiClient.delete(`/api/v1/spaces/${id}`);
	},
};

// Bookings Service
export const bookingsService = {
	// Get all bookings with pagination
	getAll: async (params?: {
		page?: number;
		limit?: number;
		spaceId?: string;
		status?: string;
	}): Promise<PaginatedResponse<Booking>> => {
		const queryParams = new URLSearchParams();

		if (params?.page) queryParams.append("page", params.page.toString());
		if (params?.limit) queryParams.append("limit", params.limit.toString());
		if (params?.spaceId) queryParams.append("spaceId", params.spaceId);
		if (params?.status) queryParams.append("status", params.status);

		const url = `/api/v1/bookings${
			queryParams.toString() ? `?${queryParams.toString()}` : ""
		}`;
		const response = await apiClient.get<PaginatedResponse<BackendBooking>>(
			url
		);

		return {
			...response.data,
			data: transformBookingsData(response.data.data),
		};
	},

	// Get booking by ID
	getById: async (id: string): Promise<Booking> => {
		const response = await apiClient.get<ApiResponse<BackendBooking>>(
			`/api/v1/bookings/${id}`
		);
		return transformBookingData(response.data.data);
	},

	// Create new booking
	create: async (bookingData: CreateBookingRequest): Promise<Booking> => {
		const response = await apiClient.post<ApiResponse<BackendBooking>>(
			"/api/v1/bookings",
			bookingData
		);
		return transformBookingData(response.data.data);
	},

	// Update booking
	update: async (
		id: string,
		bookingData: UpdateBookingRequest
	): Promise<Booking> => {
		const response = await apiClient.put<ApiResponse<BackendBooking>>(
			`/api/v1/bookings/${id}`,
			bookingData
		);
		return transformBookingData(response.data.data);
	},

	// Delete booking
	delete: async (id: string): Promise<void> => {
		await apiClient.delete(`/api/v1/bookings/${id}`);
	},

	// Cancel booking
	cancel: async (id: string): Promise<Booking> => {
		const response = await apiClient.patch<ApiResponse<Booking>>(
			`/api/v1/bookings/${id}/cancel`
		);
		return response.data.data;
	},
};

// Export all services
export const api = {
	spaces: spacesService,
	bookings: bookingsService,
};
