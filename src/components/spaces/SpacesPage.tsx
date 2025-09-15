import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Grid, List } from "lucide-react";
import { useSpaces } from "../../hooks/useApi";
import { useErrorHandler } from "../../utils/errorHandling";
import { Card, CardContent, Input, Button, LoadingSpinner } from "../ui";
import { SpaceCard } from "./SpaceCard";
import { SpaceDetailsModal } from "./SpaceDetailsModal";
import type { Space } from "../../types";

export const SpacesPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [showAvailableOnly, setShowAvailableOnly] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

	const { data: spaces, isLoading, error } = useSpaces();
	const { handleError } = useErrorHandler();

	// Handle error
	React.useEffect(() => {
		if (error) {
			handleError(error, "Failed to load spaces");
		}
	}, [error, handleError]);

	// Filter spaces based on search and filters
	const filteredSpaces = React.useMemo(() => {
		if (!spaces) return [];

		return spaces.filter((space) => {
			// Search filter
			const matchesSearch =
				space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				space.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(space.description &&
					space.description.toLowerCase().includes(searchTerm.toLowerCase()));

			// Availability filter
			const matchesAvailability = !showAvailableOnly || space.isAvailable;

			return matchesSearch && matchesAvailability;
		});
	}, [spaces, searchTerm, showAvailableOnly]);

	const handleViewDetails = (space: Space) => {
		setSelectedSpace(space);
		setIsDetailsModalOpen(true);
	};

	const handleBookNow = (space: Space) => {
		navigate(`/bookings/create?spaceId=${space.id}`);
	};

	const handleCloseDetailsModal = () => {
		setIsDetailsModalOpen(false);
		setSelectedSpace(null);
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-96'>
				<div className='text-center'>
					<LoadingSpinner size='lg' />
					<p className='mt-2 text-gray-600'>Loading spaces...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div>
				<h1 className='text-3xl font-bold text-gray-900'>Available Spaces</h1>
				<p className='mt-2 text-gray-600'>
					Find and book the perfect workspace for your needs
				</p>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className='space-y-4'>
					<div className='flex flex-col sm:flex-row gap-4'>
						{/* Search */}
						<div className='flex-1'>
							<Input
								placeholder='Search spaces by name, location, or description...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full'
							/>
						</div>

						{/* View Mode Toggle */}
						<div className='flex'>
							<Button
								variant={viewMode === "grid" ? "primary" : "ghost"}
								size='sm'
								onClick={() => setViewMode("grid")}
								className='rounded-r-none'
							>
								<Grid className='h-4 w-4' />
							</Button>
							<Button
								variant={viewMode === "list" ? "primary" : "ghost"}
								size='sm'
								onClick={() => setViewMode("list")}
								className='rounded-l-none'
							>
								<List className='h-4 w-4' />
							</Button>
						</div>
					</div>

					{/* Additional Filters */}
					<div className='flex items-center space-x-4'>
						<label className='flex items-center'>
							<input
								type='checkbox'
								checked={showAvailableOnly}
								onChange={(e) => setShowAvailableOnly(e.target.checked)}
								className='rounded border-gray-300 text-primary-600 focus:ring-primary-500'
							/>
							<span className='ml-2 text-sm text-gray-700'>Available only</span>
						</label>
					</div>
				</CardContent>
			</Card>

			{/* Results Summary */}
			<div className='flex items-center justify-between'>
				<p className='text-sm text-gray-600'>
					{filteredSpaces.length} space{filteredSpaces.length !== 1 ? "s" : ""}{" "}
					found
				</p>
			</div>

			{/* Spaces Grid/List */}
			{filteredSpaces.length === 0 ? (
				<Card>
					<CardContent className='text-center py-12'>
						<Search className='h-12 w-12 text-gray-400 mx-auto mb-4' />
						<h3 className='text-lg font-medium text-gray-900 mb-2'>
							No spaces found
						</h3>
						<p className='text-gray-600'>
							Try adjusting your search criteria or filters
						</p>
					</CardContent>
				</Card>
			) : (
				<div
					className={
						viewMode === "grid"
							? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
							: "space-y-4"
					}
				>
					{filteredSpaces.map((space) => (
						<SpaceCard
							key={space.id}
							space={space}
							onViewDetails={handleViewDetails}
							onBookNow={handleBookNow}
						/>
					))}
				</div>
			)}

			{/* Space Details Modal */}
			<SpaceDetailsModal
				space={selectedSpace}
				isOpen={isDetailsModalOpen}
				onClose={handleCloseDetailsModal}
				onBookNow={handleBookNow}
			/>
		</div>
	);
};
