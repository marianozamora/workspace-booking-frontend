import React from "react";
import { Users, MapPin, Check, X } from "lucide-react";
import { Card, CardContent, Button } from "../ui";
import type { Space } from "../../types";

interface SpaceCardProps {
	space: Space;
	onViewDetails: (space: Space) => void;
	onBookNow: (space: Space) => void;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({
	space,
	onViewDetails,
	onBookNow,
}) => {
	return (
		<Card className='h-full hover:shadow-md transition-shadow duration-200'>
			<CardContent>
				<div className='flex justify-between items-start mb-3'>
					<h3 className='text-lg font-semibold text-gray-900 line-clamp-1'>
						{space.name}
					</h3>
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium ${
							space.isAvailable
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{space.isAvailable ? (
							<span className='flex items-center gap-1'>
								<Check className='w-3 h-3' />
								Available
							</span>
						) : (
							<span className='flex items-center gap-1'>
								<X className='w-3 h-3' />
								Unavailable
							</span>
						)}
					</span>
				</div>

				{space.description && (
					<p className='text-gray-600 text-sm mb-4 line-clamp-2'>
						{space.description}
					</p>
				)}

				<div className='space-y-2 mb-4'>
					<div className='flex items-center text-gray-600'>
						<Users className='h-4 w-4 mr-2' />
						<span className='text-sm'>Capacity: {space.capacity} people</span>
					</div>

					<div className='flex items-center text-gray-600'>
						<MapPin className='h-4 w-4 mr-2' />
						<span className='text-sm'>{space.location}</span>
					</div>
				</div>

				<div className='flex gap-2 pt-2'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => onViewDetails(space)}
						className='flex-1'
					>
						View Details
					</Button>
					<Button
						variant='primary'
						size='sm'
						onClick={() => onBookNow(space)}
						disabled={!space.isAvailable}
						className='flex-1'
					>
						Book Now
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
