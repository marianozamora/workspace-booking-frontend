import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockSpace } from '../../test/utils';
import { SpaceCard } from './SpaceCard';

describe('SpaceCard Component', () => {
  it('renders space information correctly', () => {
    renderWithProviders(<SpaceCard space={mockSpace} />);

    expect(screen.getByText(mockSpace.name)).toBeInTheDocument();
    expect(screen.getByText(mockSpace.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Capacity: ${mockSpace.capacity} people`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${mockSpace.location}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockSpace.hourly_rate}/hour`)
    ).toBeInTheDocument();
  });

  it('displays availability status correctly', () => {
    const availableSpace = { ...mockSpace, is_available: true };
    const { rerender } = renderWithProviders(
      <SpaceCard space={availableSpace} />
    );

    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Available')).toHaveClass('text-green-600');

    const unavailableSpace = { ...mockSpace, is_available: false };
    rerender(<SpaceCard space={unavailableSpace} />);

    expect(screen.getByText('Unavailable')).toBeInTheDocument();
    expect(screen.getByText('Unavailable')).toHaveClass('text-red-600');
  });

  it('renders amenities when provided', () => {
    const spaceWithAmenities = {
      ...mockSpace,
      amenities: ['projector', 'whiteboard', 'video_conference'],
    };

    renderWithProviders(<SpaceCard space={spaceWithAmenities} />);

    expect(screen.getByText('projector')).toBeInTheDocument();
    expect(screen.getByText('whiteboard')).toBeInTheDocument();
    expect(screen.getByText('video_conference')).toBeInTheDocument();
  });

  it('handles missing amenities gracefully', () => {
    const spaceWithoutAmenities = {
      ...mockSpace,
      amenities: [],
    };

    renderWithProviders(<SpaceCard space={spaceWithoutAmenities} />);

    // Should still render the space without errors
    expect(screen.getByText(mockSpace.name)).toBeInTheDocument();
  });

  it('calls onViewDetails when button is clicked', async () => {
    const user = userEvent.setup();
    const handleViewDetails = vi.fn();

    renderWithProviders(
      <SpaceCard space={mockSpace} onViewDetails={handleViewDetails} />
    );

    await user.click(screen.getByText('View Details'));
    expect(handleViewDetails).toHaveBeenCalledWith(mockSpace);
  });

  it('calls onBookSpace when book button is clicked', async () => {
    const user = userEvent.setup();
    const handleBookSpace = vi.fn();

    renderWithProviders(
      <SpaceCard space={mockSpace} onBookSpace={handleBookSpace} />
    );

    await user.click(screen.getByText('Book Space'));
    expect(handleBookSpace).toHaveBeenCalledWith(mockSpace);
  });

  it('disables book button when space is unavailable', () => {
    const unavailableSpace = { ...mockSpace, is_available: false };

    renderWithProviders(<SpaceCard space={unavailableSpace} />);

    const bookButton = screen.getByText('Book Space');
    expect(bookButton).toBeDisabled();
  });

  it('applies custom className', () => {
    renderWithProviders(
      <SpaceCard
        space={mockSpace}
        className='custom-space-card'
        data-testid='space-card'
      />
    );

    const spaceCard = screen.getByTestId('space-card');
    expect(spaceCard).toHaveClass('custom-space-card');
  });
});
