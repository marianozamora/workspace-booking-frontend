import React from "react";
import { Calendar, Clock, MapPin, DollarSign, User } from "lucide-react";
import { Card, CardContent, Button } from "../ui";
import { BookingStatus } from "../../types";
import type { Booking } from "../../types";

interface BookingCardProps {
	booking: Booking;
	onViewDetails: (booking: Booking) => void;
	onCancel: (booking: Booking) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
	booking,
	onViewDetails,
	onCancel,
}) => {
	const getStatusColor = (status: BookingStatus): string => {
		const colorMap = {
			[BookingStatus.CONFIRMED]: "bg-green-100 text-green-800",
			[BookingStatus.CANCELLED]: "bg-red-100 text-red-800",
			[BookingStatus.COMPLETED]: "bg-primary-100 text-primary-800",
		};
		return colorMap[status] || "bg-gray-100 text-gray-800";
	};

	const getStatusDisplay = (status: BookingStatus): string => {
		const statusMap = {
			[BookingStatus.CONFIRMED]: "Confirmed",
			[BookingStatus.CANCELLED]: "Cancelled",
			[BookingStatus.COMPLETED]: "Completed",
		};
		return statusMap[status] || status;
	};

	const formatDateTime = (dateString: string): string => {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const calculateDuration = (): string => {
		const start = new Date(booking.startTime);
		const end = new Date(booking.endTime);

		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			return "N/A";
		}

		const durationMs = end.getTime() - start.getTime();
		const durationHours = durationMs / (1000 * 60 * 60);

		if (durationHours < 1) {
			const minutes = Math.round(durationMs / (1000 * 60));
			return `${minutes} min`;
		}

		return `${durationHours.toFixed(1)} hr${durationHours !== 1 ? "s" : ""}`;
	};

	const calculateMockCost = (): number => {
		const start = new Date(booking.startTime);
		const end = new Date(booking.endTime);

		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			return 0;
		}

		const durationMs = end.getTime() - start.getTime();
		const durationHours = durationMs / (1000 * 60 * 60);

		// Mock hourly rates based on space capacity
		const capacity = booking.space.capacity;
		let hourlyRate = 25; // Default rate

		if (capacity <= 4) {
			hourlyRate = 20; // Small spaces
		} else if (capacity <= 12) {
			hourlyRate = 35; // Medium spaces
		} else {
			hourlyRate = 50; // Large spaces
		}

		return Math.round(durationHours * hourlyRate * 100) / 100; // Round to 2 decimals
	};

	const displayCost =
		booking.totalCost > 0 ? booking.totalCost : calculateMockCost();
	const canCancel = () => {
		if (booking.status !== BookingStatus.CONFIRMED) {
			return false;
		}

		const startDate = new Date(booking.startTime);
		if (isNaN(startDate.getTime())) {
			return false;
		}

		return startDate > new Date();
	};

	return (
		<Card className='hover:shadow-md transition-shadow duration-200'>
			<CardContent>
				<div className='flex justify-between items-start mb-4'>
					<div>
						<h3 className='text-lg font-semibold text-gray-900 mb-1'>
							{booking.space.name}
						</h3>
						<p className='text-sm text-gray-600'>
							Booking #{booking.id.slice(-8)}
						</p>
					</div>
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
							booking.status
						)}`}
					>
						{getStatusDisplay(booking.status)}
					</span>
				</div>

				<div className='space-y-3 mb-4'>
					{/* Date and Time */}
					<div className='flex items-center text-gray-600'>
						<Calendar className='h-4 w-4 mr-2' />
						<span className='text-sm'>
							{formatDate(booking.startTime)} • {calculateDuration()}
						</span>
					</div>

					{/* Time Range */}
					<div className='flex items-center text-gray-600'>
						<Clock className='h-4 w-4 mr-2' />
						<span className='text-sm'>
							{formatDateTime(booking.startTime)} -{" "}
							{formatDateTime(booking.endTime)}
						</span>
					</div>

					{/* Client Email */}
					<div className='flex items-center text-gray-600'>
						<User className='h-4 w-4 mr-2' />
						<span className='text-sm'>{booking.clientEmail}</span>
					</div>

					{/* Space Type */}
					<div className='flex items-center text-gray-600'>
						<MapPin className='h-4 w-4 mr-2' />
						<span className='text-sm'>{booking.space.location}</span>
					</div>

					{/* Cost */}
					<div className='flex items-center text-gray-600'>
						<DollarSign className='h-4 w-4 mr-2' />
						<span className='text-sm font-medium'>
							${displayCost.toFixed(2)}
							{booking.totalCost === 0 && (
								<span className='text-xs text-gray-500 ml-1'>(est.)</span>
							)}
						</span>
					</div>
				</div>

				<div className='flex gap-2 pt-3 border-t border-gray-200'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => onViewDetails(booking)}
						className='flex-1'
					>
						View Details
					</Button>
					{canCancel() && (
						<Button
							variant='danger'
							size='sm'
							onClick={() => onCancel(booking)}
							className='flex-1'
						>
							Cancel
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
