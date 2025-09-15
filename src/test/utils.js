import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

// Test QueryClient with no retries to speed up tests
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
			mutations: {
				retry: false,
			},
		},
	});

// Custom render function that includes providers
export const renderWithProviders = (ui, options = {}) => {
	const { queryClient = createTestQueryClient(), ...renderOptions } = options;

	const Wrapper = ({ children }) => (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>{children}</BrowserRouter>
		</QueryClientProvider>
	);

	return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock data
export const mockSpace = {
	id: "1",
	name: "Conference Room A",
	description: "A large conference room with video conferencing capabilities",
	capacity: 10,
	location: "Floor 1",
	amenities: ["projector", "whiteboard", "video_conference"],
	is_available: true,
	hourly_rate: 50.0,
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
};

export const mockBooking = {
	id: "1",
	space_id: "1",
	start_time: "2024-01-15T09:00:00Z",
	end_time: "2024-01-15T11:00:00Z",
	purpose: "Team meeting",
	attendees_count: 5,
	total_cost: 100.0,
	status: "confirmed",
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
	space: mockSpace,
};

export const mockApiResponse = {
	success: true,
	data: [],
	message: "Success",
	pagination: {
		page: 1,
		per_page: 10,
		total: 0,
		total_pages: 1,
	},
};

// Common assertions
export const expectLoadingState = (element) => {
	expect(element).toBeInTheDocument();
};

export const expectErrorState = (container, message) => {
	expect(container).toHaveTextContent(message);
};
