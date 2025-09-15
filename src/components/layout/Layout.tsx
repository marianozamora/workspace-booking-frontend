import React from "react";
import { NavLink } from "react-router-dom";
import { Building, Calendar, Plus, Menu, X } from "lucide-react";
import { useAppConfig } from "../../store/useAppStore";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	const config = useAppConfig();

	const navigation = [
		{ name: "Spaces", href: "/spaces", icon: Building },
		{ name: "Bookings", href: "/bookings", icon: Calendar },
		{ name: "New Booking", href: "/bookings/create", icon: Plus },
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Navigation */}
			<nav className='bg-white shadow-sm border-b border-gray-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between h-16'>
						{/* Logo and Desktop Navigation */}
						<div className='flex'>
							<div className='flex-shrink-0 flex items-center'>
								<h1 className='text-xl font-bold text-gray-900'>
									{config.appName}
								</h1>
							</div>
							<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
								{navigation.map((item) => {
									const Icon = item.icon;
									return (
										<NavLink
											key={item.name}
											to={item.href}
											className={({ isActive }) =>
												`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
													isActive
														? "border-primary-500 text-gray-900"
														: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
												}`
											}
										>
											<Icon className='h-4 w-4 mr-2' />
											{item.name}
										</NavLink>
									);
								})}
							</div>
						</div>

						{/* Mobile menu button */}
						<div className='sm:hidden flex items-center'>
							<button
								type='button'
								className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								<span className='sr-only'>Open main menu</span>
								{isMobileMenuOpen ? (
									<X className='block h-6 w-6' />
								) : (
									<Menu className='block h-6 w-6' />
								)}
							</button>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				{isMobileMenuOpen && (
					<div className='sm:hidden'>
						<div className='pt-2 pb-3 space-y-1'>
							{navigation.map((item) => {
								const Icon = item.icon;
								return (
									<NavLink
										key={item.name}
										to={item.href}
										className={({ isActive }) =>
											`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
												isActive
													? "bg-primary-50 border-primary-500 text-primary-700"
													: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
											}`
										}
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<div className='flex items-center'>
											<Icon className='h-4 w-4 mr-3' />
											{item.name}
										</div>
									</NavLink>
								);
							})}
						</div>
					</div>
				)}
			</nav>

			{/* Main Content */}
			<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				<div className='px-4 py-6 sm:px-0'>{children}</div>
			</main>

			{/* Footer */}
			<footer className='bg-white border-t border-gray-200 mt-12'>
				<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
					<div className='flex justify-between items-center'>
						<p className='text-sm text-gray-500'>
							© 2024 {config.appName}. All rights reserved.
						</p>
						<p className='text-sm text-gray-500'>Version {config.version}</p>
					</div>
				</div>
			</footer>
		</div>
	);
};
