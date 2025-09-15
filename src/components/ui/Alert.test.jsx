import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test/utils";
import { Alert } from "./Alert";

describe("Alert Component", () => {
	it("renders alert message", () => {
		renderWithProviders(<Alert message='This is an alert message' />);

		expect(screen.getByText("This is an alert message")).toBeInTheDocument();
	});

	it("applies success variant styles", () => {
		renderWithProviders(
			<Alert message='Success message' variant='success' data-testid='alert' />
		);

		const alert = screen.getByTestId("alert");
		expect(alert).toHaveClass(
			"bg-green-50",
			"border-green-200",
			"text-green-800"
		);
	});

	it("applies error variant styles", () => {
		renderWithProviders(
			<Alert message='Error message' variant='error' data-testid='alert' />
		);

		const alert = screen.getByTestId("alert");
		expect(alert).toHaveClass("bg-red-50", "border-red-200", "text-red-800");
	});

	it("applies warning variant styles", () => {
		renderWithProviders(
			<Alert message='Warning message' variant='warning' data-testid='alert' />
		);

		const alert = screen.getByTestId("alert");
		expect(alert).toHaveClass(
			"bg-yellow-50",
			"border-yellow-200",
			"text-yellow-800"
		);
	});

	it("applies info variant styles", () => {
		renderWithProviders(
			<Alert message='Info message' variant='info' data-testid='alert' />
		);

		const alert = screen.getByTestId("alert");
		expect(alert).toHaveClass("bg-blue-50", "border-blue-200", "text-blue-800");
	});

	it("shows close button when onClose is provided", () => {
		const handleClose = vi.fn();

		renderWithProviders(
			<Alert message='Closable alert' onClose={handleClose} />
		);

		expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
	});

	it("handles close button click", async () => {
		const user = userEvent.setup();
		const handleClose = vi.fn();

		renderWithProviders(
			<Alert message='Closable alert' onClose={handleClose} />
		);

		await user.click(screen.getByRole("button", { name: /close/i }));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("does not show close button when onClose is not provided", () => {
		renderWithProviders(<Alert message='Non-closable alert' />);

		expect(
			screen.queryByRole("button", { name: /close/i })
		).not.toBeInTheDocument();
	});

	it("renders with title and message", () => {
		renderWithProviders(<Alert title='Alert Title' message='Alert message' />);

		expect(screen.getByText("Alert Title")).toBeInTheDocument();
		expect(screen.getByText("Alert message")).toBeInTheDocument();
	});

	it("applies custom className", () => {
		renderWithProviders(
			<Alert
				message='Custom alert'
				className='custom-alert'
				data-testid='alert'
			/>
		);

		const alert = screen.getByTestId("alert");
		expect(alert).toHaveClass("custom-alert");
	});
});
