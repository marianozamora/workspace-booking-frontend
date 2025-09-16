import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui';
import { BookingForm } from './BookingForm';

export const CreateBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const spaceId = searchParams.get('spaceId') || undefined;

  const handleSuccess = () => {
    navigate('/bookings');
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center space-x-4'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => navigate(-1)}
          className='p-2'
        >
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Create Booking</h1>
          <p className='mt-2 text-gray-600'>
            Reserve a workspace for your needs
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <BookingForm
        preselectedSpaceId={spaceId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};
