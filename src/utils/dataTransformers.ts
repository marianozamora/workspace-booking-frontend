import type {
	Space as FrontendSpace,
	Booking as FrontendBooking,
} from "../types";
import { BookingStatus as FrontendBookingStatus } from "../types";

// Backend space structure (what we actually receive)
export interface BackendSpace {
	id: string;
	name: string;
	location: string;
	capacity: number;
	description: string | null;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

// Backend booking structure (what we actually receive)
export interface BackendBooking {
	id: string;
	spaceId: string;
	space: BackendSpace | null;
	clientEmail: string;
	date: string;
	startTime: string;
	endTime: string;
	status: "ACTIVE" | "CANCELLED" | "COMPLETED";
	createdAt: string;
	updatedAt: string;
}

// Transform backend space data to match frontend expectations
export const transformSpaceData = (
	backendSpace: BackendSpace
): FrontendSpace => {
	return {
		id: backendSpace.id,
		name: backendSpace.name,
		description: backendSpace.description || undefined,
		location: backendSpace.location,
		capacity: backendSpace.capacity,
		isAvailable: backendSpace.active, // Map 'active' to 'isAvailable'
		createdAt: backendSpace.createdAt,
		updatedAt: backendSpace.updatedAt,
	};
};

// Transform array of backend spaces
export const transformSpacesData = (
	backendSpaces: BackendSpace[]
): FrontendSpace[] => {
	return backendSpaces.map(transformSpaceData);
};

// Map backend booking status to frontend status
const mapBookingStatus = (
	backendStatus: BackendBooking["status"]
): FrontendBookingStatus => {
	switch (backendStatus) {
		case "ACTIVE":
			return FrontendBookingStatus.CONFIRMED;
		case "CANCELLED":
			return FrontendBookingStatus.CANCELLED;
		case "COMPLETED":
			return FrontendBookingStatus.COMPLETED;
		default:
			return FrontendBookingStatus.CONFIRMED;
	}
};

// Transform backend booking data to match frontend expectations
export const transformBookingData = (
	backendBooking: BackendBooking
): FrontendBooking => {
	// Combine date and time to create proper ISO datetime strings
	const createDateTime = (dateIsoString: string, time: string): string => {
		// Backend sends date as ISO string and time as HH:MM
		// Extract just the date part and combine with time
		const datePart = dateIsoString.split("T")[0]; // Get YYYY-MM-DD
		return `${datePart}T${time}:00.000Z`;
	};

	const startDateTime =
		backendBooking.date && backendBooking.startTime
			? createDateTime(backendBooking.date, backendBooking.startTime)
			: backendBooking.startTime;

	const endDateTime =
		backendBooking.date && backendBooking.endTime
			? createDateTime(backendBooking.date, backendBooking.endTime)
			: backendBooking.endTime;

	return {
		id: backendBooking.id,
		spaceId: backendBooking.spaceId,
		space: backendBooking.space
			? transformSpaceData(backendBooking.space)
			: {
					id: backendBooking.spaceId,
					name: "Unknown Space",
					location: "Unknown Location",
					capacity: 0,
					isAvailable: false,
					createdAt: backendBooking.createdAt,
					updatedAt: backendBooking.updatedAt,
			  },
		clientEmail: backendBooking.clientEmail,
		date: backendBooking.date,
		startTime: startDateTime,
		endTime: endDateTime,
		status: mapBookingStatus(backendBooking.status),
		totalCost: 0, // Default value since backend doesn't provide this
		createdAt: backendBooking.createdAt,
		updatedAt: backendBooking.updatedAt,
	};
};

// Transform array of backend bookings
export const transformBookingsData = (
	backendBookings: BackendBooking[]
): FrontendBooking[] => {
	return backendBookings.map(transformBookingData);
};
