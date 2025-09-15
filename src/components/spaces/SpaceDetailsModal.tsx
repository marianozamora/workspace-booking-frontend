import React from "react";
import { Users, Calendar, MapPin, Check, X } from "lucide-react";
import { Modal, Button } from "../ui";
import type { Space } from "../../types";

interface SpaceDetailsModalProps {
	space: Space | null;
	isOpen: boolean;
	onClose: () => void;
	onBookNow: (space: Space) => void;
}

export const SpaceDetailsModal: React.FC<SpaceDetailsModalProps> = ({
	space,
	isOpen,
	onClose,
	onBookNow,
}) => {
	if (!space) return null;

	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size='lg'>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex items-start justify-between'>
					<div>
						<h2 className='text-2xl font-bold text-gray-900'>{space.name}</h2>
					</div>
					<div className='flex items-center'>
						<span
							className={`px-3 py-1 rounded-full text-sm font-medium ${
								space.isAvailable
									? "bg-green-100 text-green-800"
									: "bg-red-100 text-red-800"
							}`}
						>
							{space.isAvailable ? "Available" : "Unavailable"}
						</span>
					</div>
				</div>

				{/* Description */}
				{space.description && (
					<div>
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							Description
						</h3>
						<p className='text-gray-600'>{space.description}</p>
					</div>
				)}

				{/* Details Grid */}
				<div className='grid grid-cols-2 gap-4'>
					<div className='flex items-center p-4 bg-gray-50 rounded-lg'>
						<Users className='h-5 w-5 text-primary-600 mr-3' />
						<div>
							<p className='text-sm font-medium text-gray-900'>Capacity</p>
							<p className='text-sm text-gray-600'>{space.capacity} people</p>
						</div>
					</div>

					<div className='flex items-center p-4 bg-gray-50 rounded-lg'>
						<MapPin className='h-5 w-5 text-blue-600 mr-3' />
						<div>
							<p className='text-sm font-medium text-gray-900'>Location</p>
							<p className='text-sm text-gray-600'>{space.location}</p>
						</div>
					</div>

					<div className='flex items-center p-4 bg-gray-50 rounded-lg'>
						<Calendar className='h-5 w-5 text-purple-600 mr-3' />
						<div>
							<p className='text-sm font-medium text-gray-900'>Created</p>
							<p className='text-sm text-gray-600'>
								{formatDate(space.createdAt)}
							</p>
						</div>
					</div>

					<div className='flex items-center p-4 bg-gray-50 rounded-lg'>
						<Calendar className='h-5 w-5 text-orange-600 mr-3' />
						<div>
							<p className='text-sm font-medium text-gray-900'>Last Updated</p>
							<p className='text-sm text-gray-600'>
								{formatDate(space.updatedAt)}
							</p>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className='flex gap-3 pt-4 border-t border-gray-200'>
					<Button variant='ghost' onClick={onClose} className='flex-1'>
						Close
					</Button>
					<Button
						variant='primary'
						onClick={() => {
							onBookNow(space);
							onClose();
						}}
						disabled={!space.isAvailable}
						className='flex-1'
					>
						Book This Space
					</Button>
				</div>
			</div>
		</Modal>
	);
};
