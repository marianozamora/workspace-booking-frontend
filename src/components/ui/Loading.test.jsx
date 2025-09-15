import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test/utils";
import { Loading } from "./Loading";

describe("Loading Component", () => {
	it("renders loading text by default", () => {
		renderWithProviders(<Loading />);

		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("renders custom text when provided", () => {
		renderWithProviders(<Loading text='Please wait...' />);

		expect(screen.getByText("Please wait...")).toBeInTheDocument();
	});

	it("renders inline variant", () => {
		renderWithProviders(<Loading variant='inline' data-testid='loading' />);

		const loading = screen.getByTestId("loading");
		expect(loading).toHaveClass("flex-row", "space-x-2");
	});

	it("renders centered variant", () => {
		renderWithProviders(<Loading variant='centered' data-testid='loading' />);

		const loading = screen.getByTestId("loading");
		expect(loading).toHaveClass("justify-center", "py-8");
	});

	it("renders fullscreen variant", () => {
		renderWithProviders(<Loading variant='fullscreen' data-testid='loading' />);

		const loading = screen.getByTestId("loading");
		expect(loading).toHaveClass(
			"fixed",
			"inset-0",
			"bg-white",
			"bg-opacity-75"
		);
	});

	it("applies small size", () => {
		renderWithProviders(<Loading size='small' data-testid='loading' />);

		const spinner = screen
			.getByTestId("loading")
			.querySelector(".animate-spin");
		expect(spinner).toHaveClass("w-4", "h-4");
	});

	it("applies medium size", () => {
		renderWithProviders(<Loading size='medium' data-testid='loading' />);

		const spinner = screen
			.getByTestId("loading")
			.querySelector(".animate-spin");
		expect(spinner).toHaveClass("w-6", "h-6");
	});

	it("applies large size", () => {
		renderWithProviders(<Loading size='large' data-testid='loading' />);

		const spinner = screen
			.getByTestId("loading")
			.querySelector(".animate-spin");
		expect(spinner).toHaveClass("w-8", "h-8");
	});

	it("applies custom className", () => {
		renderWithProviders(
			<Loading className='custom-loading' data-testid='loading' />
		);

		const loading = screen.getByTestId("loading");
		expect(loading).toHaveClass("custom-loading");
	});

	it("shows spinner element", () => {
		renderWithProviders(<Loading data-testid='loading' />);

		const spinner = screen
			.getByTestId("loading")
			.querySelector(".animate-spin");
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveClass("animate-spin");
	});
});
