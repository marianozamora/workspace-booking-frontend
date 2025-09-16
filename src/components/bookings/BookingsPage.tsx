import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useBookings, useCancelBooking } from '../../hooks/useApi';
import { useErrorHandler } from '../../utils/errorHandling';
import { Card, CardContent, Input, LoadingSpinner, Pagination } from '../ui';
import { BookingCard } from './BookingCard';
import { BookingDetailsModal } from './BookingDetailsModal';
import { BookingStatus } from '../../types';
import type { Booking } from '../../types';

export const BookingsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'all'>(
    'all'
  );
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const pageSize = 12;

  // Build query parameters
  const queryParams = React.useMemo(() => {
    const params: any = {
      page: currentPage,
      limit: pageSize,
    };

    if (selectedStatus !== 'all') {
      params.status = selectedStatus;
    }

    return params;
  }, [currentPage, selectedStatus]);

  const { data: bookingsResponse, isLoading, error } = useBookings(queryParams);
  const cancelBookingMutation = useCancelBooking();
  const { handleError, handleSuccess } = useErrorHandler();

  // Handle error
  React.useEffect(() => {
    if (error) {
      handleError(error, 'Failed to load bookings');
    }
  }, [error, handleError]);

  // Filter bookings by search term (client-side filtering)
  const filteredBookings = React.useMemo(() => {
    if (!bookingsResponse?.data) return [];

    if (!searchTerm) return bookingsResponse.data;

    return bookingsResponse.data.filter(booking => {
      const searchLower = searchTerm.toLowerCase();
      return (
        booking.clientEmail.toLowerCase().includes(searchLower) ||
        booking.space.name.toLowerCase().includes(searchLower) ||
        booking.id.toLowerCase().includes(searchLower)
      );
    });
  }, [bookingsResponse?.data, searchTerm]);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  const handleCancelBooking = async (booking: Booking) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await cancelBookingMutation.mutateAsync(booking.id);
      handleSuccess('Booking cancelled successfully');
    } catch (error) {
      handleError(error, 'Failed to cancel booking');
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBooking(null);
  };

  const getStatusDisplay = (status: BookingStatus): string => {
    const statusMap = {
      [BookingStatus.CONFIRMED]: 'Confirmed',
      [BookingStatus.CANCELLED]: 'Cancelled',
      [BookingStatus.COMPLETED]: 'Completed',
    };
    return statusMap[status] || status;
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <LoadingSpinner size='lg' />
          <p className='mt-2 text-gray-600'>Loading bookings...</p>
        </div>
      </div>
    );
  }

  const totalPages = bookingsResponse?.pagination?.totalPages || 1;

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Bookings</h1>
        <p className='mt-2 text-gray-600'>Manage your workspace reservations</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className='space-y-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1'>
              <Input
                placeholder='Search bookings by email, space name, or booking ID...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full'
              />
            </div>

            {/* Status Filter */}
            <div className='sm:w-48'>
              <select
                value={selectedStatus}
                onChange={e => {
                  setSelectedStatus(e.target.value as BookingStatus | 'all');
                  setCurrentPage(1); // Reset to first page when filtering
                }}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
              >
                <option value='all'>All Statuses</option>
                {Object.values(BookingStatus).map(status => (
                  <option key={status} value={status}>
                    {getStatusDisplay(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-600'>
          {bookingsResponse?.pagination?.total || 0} booking
          {(bookingsResponse?.pagination?.total || 0) !== 1 ? 's' : ''} found
          {searchTerm && ` (${filteredBookings.length} matching search)`}
        </p>
        {bookingsResponse?.pagination && (
          <p className='text-sm text-gray-600'>
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <Card>
          <CardContent className='text-center py-12'>
            <Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No bookings found
            </h3>
            <p className='text-gray-600'>
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'No bookings match the selected filters'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onViewDetails={handleViewDetails}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className='mt-8'
            />
          )}
        </>
      )}

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        onCancel={handleCancelBooking}
      />
    </div>
  );
};
