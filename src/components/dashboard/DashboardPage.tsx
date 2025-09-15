import React from "react";
import { Link } from "react-router-dom";
import { Building, Calendar, Plus, TrendingUp } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Button,
	LoadingSpinner,
} from "../ui";
import { useSpaces, useBookings } from "../../hooks/useApi";
import { BookingStatus } from "../../types";

export const DashboardPage: React.FC = () => {
	const { data: spaces, isLoading: spacesLoading } = useSpaces();
	const { data: bookingsData, isLoading: bookingsLoading } = useBookings({
		limit: 5,
	});

	const availableSpaces = spaces?.filter((space) => space.isAvailable) || [];
	const recentBookings = bookingsData?.data || [];

	const getBookingStatusCount = (status: BookingStatus) => {
		return (
			recentBookings?.filter((booking) => booking.status === status).length || 0
		);
	};

	const quickStats = [
		{
			name: "Available Spaces",
			value: availableSpaces.length,
			icon: Building,
			color: "text-primary-600",
			bgColor: "bg-primary-100",
		},
		{
			name: "Total Bookings",
			value: bookingsData?.pagination?.total || 0,
			icon: Calendar,
			color: "text-green-600",
			bgColor: "bg-green-100",
		},
		{
			name: "Confirmed Bookings",
			value: getBookingStatusCount(BookingStatus.CONFIRMED),
			icon: TrendingUp,
			color: "text-purple-600",
			bgColor: "bg-purple-100",
		},
	];

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div>
				<h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
				<p className='mt-2 text-gray-600'>
					Welcome to the Workspace Booking System
				</p>
			</div>

			{/* Quick Actions */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				<Link to='/spaces'>
					<Card className='hover:shadow-md transition-shadow cursor-pointer'>
						<CardContent className='flex items-center p-6'>
							<Building className='h-8 w-8 text-primary-600 mr-4' />
							<div>
								<h3 className='text-lg font-medium text-gray-900'>
									Browse Spaces
								</h3>
								<p className='text-sm text-gray-500'>
									View available workspaces
								</p>
							</div>
						</CardContent>
					</Card>
				</Link>

				<Link to='/bookings'>
					<Card className='hover:shadow-md transition-shadow cursor-pointer'>
						<CardContent className='flex items-center p-6'>
							<Calendar className='h-8 w-8 text-green-600 mr-4' />
							<div>
								<h3 className='text-lg font-medium text-gray-900'>
									View Bookings
								</h3>
								<p className='text-sm text-gray-500'>
									Manage your reservations
								</p>
							</div>
						</CardContent>
					</Card>
				</Link>

				<Link to='/bookings/create'>
					<Card className='hover:shadow-md transition-shadow cursor-pointer'>
						<CardContent className='flex items-center p-6'>
							<Plus className='h-8 w-8 text-purple-600 mr-4' />
							<div>
								<h3 className='text-lg font-medium text-gray-900'>
									New Booking
								</h3>
								<p className='text-sm text-gray-500'>Reserve a workspace</p>
							</div>
						</CardContent>
					</Card>
				</Link>
			</div>

			{/* Stats Overview */}
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
				{quickStats.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.name}>
							<CardContent className='p-6'>
								<div className='flex items-center'>
									<div className={`p-2 rounded-lg ${stat.bgColor}`}>
										<Icon className={`h-6 w-6 ${stat.color}`} />
									</div>
									<div className='ml-4'>
										<p className='text-sm font-medium text-gray-600'>
											{stat.name}
										</p>
										<p className='text-2xl font-bold text-gray-900'>
											{spacesLoading || bookingsLoading ? (
												<LoadingSpinner size='sm' />
											) : (
												stat.value
											)}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Space Types Breakdown */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<Card>
					<CardHeader>
						<CardTitle>Available Spaces by Type</CardTitle>
					</CardHeader>
					<CardContent>
						{spacesLoading ? (
							<div className='flex justify-center py-4'>
								<LoadingSpinner />
							</div>
						) : (
							<div className='space-y-3'>
								<div className='flex justify-between items-center'>
									<span className='text-sm text-gray-600'>Total Spaces</span>
									<span className='text-sm font-medium text-gray-900'>
										{spaces?.length || 0}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-sm text-gray-600'>
										Available Spaces
									</span>
									<span className='text-sm font-medium text-green-600'>
										{availableSpaces.length}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-sm text-gray-600'>
										Unavailable Spaces
									</span>
									<span className='text-sm font-medium text-red-600'>
										{(spaces?.length || 0) - availableSpaces.length}
									</span>
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Bookings</CardTitle>
					</CardHeader>
					<CardContent>
						{bookingsLoading ? (
							<div className='flex justify-center py-4'>
								<LoadingSpinner />
							</div>
						) : recentBookings.length > 0 ? (
							<div className='space-y-3'>
								{recentBookings.slice(0, 5).map((booking) => (
									<div
										key={booking.id}
										className='flex justify-between items-center'
									>
										<div>
											<p className='text-sm font-medium text-gray-900'>
												{booking.space.name}
											</p>
											<p className='text-xs text-gray-500'>
												{booking.clientEmail}
											</p>
										</div>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												booking.status === BookingStatus.CONFIRMED
													? "bg-green-100 text-green-800"
													: booking.status === BookingStatus.CANCELLED
													? "bg-red-100 text-red-800"
													: "bg-primary-100 text-primary-800"
											}`}
										>
											{booking.status}
										</span>
									</div>
								))}
							</div>
						) : (
							<p className='text-sm text-gray-500 text-center py-4'>
								No recent bookings
							</p>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions Footer */}
			<Card>
				<CardContent className='text-center py-8'>
					<h3 className='text-lg font-medium text-gray-900 mb-4'>
						Ready to get started?
					</h3>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link to='/spaces'>
							<Button className='w-full sm:w-auto'>
								Browse Available Spaces
							</Button>
						</Link>
						<Link to='/bookings/create'>
							<Button variant='ghost' className='w-full sm:w-auto'>
								Create New Booking
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
