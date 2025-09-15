import React from "react";
import { Calendar, Clock, User, MapPin, Hash, DollarSign } from "lucide-react";
import { Modal, Button } from "../ui";
import { BookingStatus } from "../../types";
import type { Booking } from "../../types";

interface BookingDetailsModalProps {
	booking: Booking | null;
	isOpen: boolean;
	onClose: () => void;
	onCancel: (booking: Booking) => void;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
	booking,
	isOpen,
	onClose,
	onCancel,
}) => {
	if (!booking) return null;

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
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZoneName: "short",
		});
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return "Invalid Date";
		}
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
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
			return `${minutes} minutes`;
		}

		return `${durationHours.toFixed(1)} hour${durationHours !== 1 ? "s" : ""}`;
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
		<Modal isOpen={isOpen} onClose={onClose} size='lg' title='Booking Details'>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex items-start justify-between'>
					<div>
						<h2 className='text-xl font-bold text-gray-900'>
							{booking.space.name}
						</h2>
						<p className='text-sm text-gray-600 mt-1'>
							{booking.space.location}
						</p>
					</div>
					<span
						className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
							booking.status
						)}`}
					>
						{getStatusDisplay(booking.status)}
					</span>
				</div>

				{/* Booking Information */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-4'>
						<h3 className='text-lg font-medium text-gray-900'>
							Booking Information
						</h3>

						<div className='space-y-3'>
							<div className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<Hash className='h-5 w-5 text-gray-600 mr-3' />
								<div>
									<p className='text-sm font-medium text-gray-900'>
										Booking ID
									</p>
									<p className='text-sm text-gray-600'>{booking.id}</p>
								</div>
							</div>

							<div className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<User className='h-5 w-5 text-primary-600 mr-3' />
								<div>
									<p className='text-sm font-medium text-gray-900'>
										Client Email
									</p>
									<p className='text-sm text-gray-600'>{booking.clientEmail}</p>
								</div>
							</div>

							<div className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<DollarSign className='h-5 w-5 text-green-600 mr-3' />
								<div>
									<p className='text-sm font-medium text-gray-900'>
										Total Cost
									</p>
									<p className='text-sm text-gray-600'>
										${displayCost.toFixed(2)}
										{booking.totalCost === 0 && (
											<span className='text-xs text-gray-500 ml-1'>
												(estimated)
											</span>
										)}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='text-lg font-medium text-gray-900'>Schedule</h3>

						<div className='space-y-3'>
							<div className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<Calendar className='h-5 w-5 text-purple-600 mr-3' />
								<div>
									<p className='text-sm font-medium text-gray-900'>Date</p>
									<p className='text-sm text-gray-600'>
										{formatDate(booking.startTime)}
									</p>
								</div>
							</div>

							<div className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<Clock className='h-5 w-5 text-orange-600 mr-3' />
								<div>
									<p className='text-sm font-medium text-gray-900'>
										Start Time
									</p>
									<p className='text-sm text-gray-600'>
										{formatDateTime(booking.startTime)}
									</p>
								</div>
							</div>

							<div className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<Clock className='h-5 w-5 text-orange-600 mr-3' />
								<div>
									<p className='text-sm font-medium text-gray-900'>End Time</p>
									<p className='text-sm text-gray-600'>
										{formatDateTime(booking.endTime)}
									</p>
								</div>
							</div>

							<div className='flex items-center p-3 bg-gray-50 rounded-lg'>
								<Clock className='h-5 w-5 text-indigo-600 mr-3' />
								<div>
									<p className='text-sm font-medium text-gray-900'>Duration</p>
									<p className='text-sm text-gray-600'>{calculateDuration()}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Space Information */}
				<div>
					<h3 className='text-lg font-medium text-gray-900 mb-3'>
						Space Information
					</h3>
					<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
						<div className='text-center p-3 bg-gray-50 rounded-lg'>
							<MapPin className='h-5 w-5 text-gray-600 mx-auto mb-1' />
							<p className='text-xs text-gray-500'>Location</p>
							<p className='text-sm font-medium text-gray-900'>
								{booking.space.location}
							</p>
						</div>

						<div className='text-center p-3 bg-gray-50 rounded-lg'>
							<User className='h-5 w-5 text-gray-600 mx-auto mb-1' />
							<p className='text-xs text-gray-500'>Capacity</p>
							<p className='text-sm font-medium text-gray-900'>
								{booking.space.capacity}
							</p>
						</div>

						<div className='text-center p-3 bg-gray-50 rounded-lg'>
							<Clock className='h-5 w-5 text-gray-600 mx-auto mb-1' />
							<p className='text-xs text-gray-500'>Status</p>
							<p className='text-sm font-medium text-gray-900'>
								{booking.space.isAvailable ? "Available" : "Unavailable"}
							</p>
						</div>
					</div>
				</div>

				{/* Space Description */}
				{booking.space.description && (
					<div>
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							Space Description
						</h3>
						<p className='text-gray-600'>{booking.space.description}</p>
					</div>
				)}

				{/* Timestamps */}
				<div className='text-xs text-gray-500 border-t pt-4'>
					<p>Created: {formatDateTime(booking.createdAt)}</p>
					<p>Last updated: {formatDateTime(booking.updatedAt)}</p>
				</div>

				{/* Actions */}
				<div className='flex gap-3 pt-4 border-t border-gray-200'>
					<Button variant='ghost' onClick={onClose} className='flex-1'>
						Close
					</Button>
					{canCancel() && (
						<Button
							variant='danger'
							onClick={() => {
								onCancel(booking);
								onClose();
							}}
							className='flex-1'
						>
							Cancel Booking
						</Button>
					)}
				</div>
			</div>
		</Modal>
	);
};
