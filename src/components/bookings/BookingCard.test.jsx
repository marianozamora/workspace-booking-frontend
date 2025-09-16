import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockBooking } from '../../test/utils';
import { BookingCard } from './BookingCard';

describe('BookingCard Component', () => {
  it('renders booking information correctly', () => {
    renderWithProviders(<BookingCard booking={mockBooking} />);

    expect(screen.getByText(mockBooking.space.name)).toBeInTheDocument();
    expect(screen.getByText(mockBooking.purpose)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockBooking.attendees_count} attendees`)
    ).toBeInTheDocument();
    expect(screen.getByText(`$${mockBooking.total_cost}`)).toBeInTheDocument();
  });

  it('displays formatted date and time', () => {
    renderWithProviders(<BookingCard booking={mockBooking} />);

    // The component should format and display start/end times
    // This would depend on your date formatting implementation
    expect(screen.getByText(/Jan 15, 2024/)).toBeInTheDocument();
  });

  it('displays booking status correctly', () => {
    const confirmedBooking = { ...mockBooking, status: 'confirmed' };
    const { rerender } = renderWithProviders(
      <BookingCard booking={confirmedBooking} />
    );

    expect(screen.getByText('confirmed')).toBeInTheDocument();
    expect(screen.getByText('confirmed')).toHaveClass('text-green-600');

    const cancelledBooking = { ...mockBooking, status: 'cancelled' };
    rerender(<BookingCard booking={cancelledBooking} />);

    expect(screen.getByText('cancelled')).toBeInTheDocument();
    expect(screen.getByText('cancelled')).toHaveClass('text-red-600');

    const pendingBooking = { ...mockBooking, status: 'pending' };
    rerender(<BookingCard booking={pendingBooking} />);

    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('pending')).toHaveClass('text-yellow-600');
  });

  it('calls onViewDetails when view details button is clicked', async () => {
    const user = userEvent.setup();
    const handleViewDetails = vi.fn();

    renderWithProviders(
      <BookingCard booking={mockBooking} onViewDetails={handleViewDetails} />
    );

    await user.click(screen.getByText('View Details'));
    expect(handleViewDetails).toHaveBeenCalledWith(mockBooking);
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    renderWithProviders(
      <BookingCard booking={mockBooking} onCancel={handleCancel} />
    );

    await user.click(screen.getByText('Cancel Booking'));
    expect(handleCancel).toHaveBeenCalledWith(mockBooking);
  });

  it('disables cancel button for cancelled bookings', () => {
    const cancelledBooking = { ...mockBooking, status: 'cancelled' };

    renderWithProviders(<BookingCard booking={cancelledBooking} />);

    const cancelButton = screen.getByText('Cancel Booking');
    expect(cancelButton).toBeDisabled();
  });

  it('shows loading state when cancelling', () => {
    renderWithProviders(
      <BookingCard booking={mockBooking} isCancelling={true} />
    );

    expect(screen.getByText('Cancelling...')).toBeInTheDocument();
    const cancelButton = screen.getByRole('button', { name: /cancelling/i });
    expect(cancelButton).toBeDisabled();
  });

  it('applies custom className', () => {
    renderWithProviders(
      <BookingCard
        booking={mockBooking}
        className='custom-booking-card'
        data-testid='booking-card'
      />
    );

    const bookingCard = screen.getByTestId('booking-card');
    expect(bookingCard).toHaveClass('custom-booking-card');
  });

  it('handles missing space information gracefully', () => {
    const bookingWithoutSpace = {
      ...mockBooking,
      space: null,
    };

    renderWithProviders(<BookingCard booking={bookingWithoutSpace} />);

    // Should render without crashing
    expect(screen.getByText(mockBooking.purpose)).toBeInTheDocument();
  });
});
