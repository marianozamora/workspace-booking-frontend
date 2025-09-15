import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { DashboardPage } from "./dashboard/DashboardPage";
import { SpacesPage } from "./spaces/SpacesPage";
import { BookingsPage, CreateBookingPage } from "./bookings";
import { ErrorBoundary } from "../utils/errorHandling";

// 404 Page Component
const NotFoundPage: React.FC = () => (
	<div className='text-center py-12'>
		<h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
		<h2 className='text-xl text-gray-600 mb-8'>Page Not Found</h2>
		<p className='text-gray-500 mb-8'>
			The page you're looking for doesn't exist.
		</p>
		<a
			href='/'
			className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
		>
			Go Home
		</a>
	</div>
);

export const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<Layout>
					<Routes>
						{/* Dashboard/Home */}
						<Route path='/' element={<DashboardPage />} />
						<Route path='/dashboard' element={<Navigate to='/' replace />} />

						{/* Spaces */}
						<Route path='/spaces' element={<SpacesPage />} />

						{/* Bookings */}
						<Route path='/bookings' element={<BookingsPage />} />
						<Route path='/bookings/create' element={<CreateBookingPage />} />

						{/* 404 */}
						<Route path='*' element={<NotFoundPage />} />
					</Routes>
				</Layout>
			</ErrorBoundary>
		</BrowserRouter>
	);
};
