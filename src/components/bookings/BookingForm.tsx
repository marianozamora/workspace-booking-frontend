import React, { useState, useEffect } from 'react';
import { Calendar, User, MapPin } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  LoadingSpinner,
} from '../ui';
import { useSpaces, useCreateBooking } from '../../hooks/useApi';
import { useErrorHandler } from '../../utils/errorHandling';
import { validateForm, getMinDateTime } from '../../utils/validation';
import type { CreateBookingRequest } from '../../types';

interface BookingFormData {
  spaceId: string;
  clientEmail: string;
  startTime: string;
  endTime: string;
}

interface BookingFormProps {
  preselectedSpaceId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedSpaceId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    spaceId: preselectedSpaceId || '',
    clientEmail: '',
    startTime: getMinDateTime(),
    endTime: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: spaces, isLoading: spacesLoading } = useSpaces();
  const createBookingMutation = useCreateBooking();
  const { handleError, handleSuccess } = useErrorHandler();

  // Set default end time when start time changes
  useEffect(() => {
    if (formData.startTime && !formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(start);
      end.setHours(end.getHours() + 1); // Default 1 hour duration

      setFormData(prev => ({
        ...prev,
        endTime: end.toISOString().slice(0, 16), // Format for datetime-local input
      }));
    }
  }, [formData.startTime, formData.endTime]);

  const selectedSpace = spaces?.find(space => space.id === formData.spaceId);

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateFormData = (): boolean => {
    const rules: Record<keyof BookingFormData, any> = {
      spaceId: { required: true },
      clientEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      startTime: { required: true },
      endTime: { required: true },
    };

    // Custom validation for endTime that considers startTime
    const validateEndTime = (endTime: string): string | null => {
      if (!endTime) return 'This field is required';

      if (formData.startTime) {
        const startDate = new Date(formData.startTime);
        const endDate = new Date(endTime);

        if (endDate <= startDate) {
          return 'End time must be after start time';
        }

        // Minimum 30 minutes duration
        const durationMs = endDate.getTime() - startDate.getTime();
        const minDurationMs = 30 * 60 * 1000; // 30 minutes

        if (durationMs < minDurationMs) {
          return 'Minimum booking duration is 30 minutes';
        }

        // Maximum 8 hours duration
        const maxDurationMs = 8 * 60 * 60 * 1000; // 8 hours

        if (durationMs > maxDurationMs) {
          return 'Maximum booking duration is 8 hours';
        }
      }

      return null;
    };

    // Run basic validation
    const result = validateForm(formData, rules);
    const newErrors = { ...result.errors };

    // Add custom endTime validation
    const endTimeError = validateEndTime(formData.endTime);
    if (endTimeError) {
      newErrors.endTime = endTimeError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Transform the form data to match backend expectations
      const startDateTime = new Date(formData.startTime);
      const endDateTime = new Date(formData.endTime);

      const transformedData: CreateBookingRequest = {
        spaceId: formData.spaceId,
        clientEmail: formData.clientEmail,
        date: startDateTime.toISOString().split('T')[0], // YYYY-MM-DD
        startTime: startDateTime.toTimeString().slice(0, 5), // HH:MM
        endTime: endDateTime.toTimeString().slice(0, 5), // HH:MM
      };

      await createBookingMutation.mutateAsync(transformedData);
      handleSuccess('Booking created successfully!');

      // Reset form
      setFormData({
        spaceId: preselectedSpaceId || '',
        clientEmail: '',
        startTime: getMinDateTime(),
        endTime: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      handleError(error, 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSpaces = spaces?.filter(space => space.isAvailable) || [];

  if (spacesLoading) {
    return (
      <Card>
        <CardContent>
          <div className='flex items-center justify-center py-12'>
            <div className='text-center'>
              <LoadingSpinner size='lg' />
              <p className='mt-2 text-gray-600'>Loading spaces...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Calendar className='h-5 w-5 mr-2' />
          Create New Booking
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Space Selection */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Select Space *
            </label>
            <select
              value={formData.spaceId}
              onChange={e => handleInputChange('spaceId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.spaceId ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={!!preselectedSpaceId}
            >
              <option value=''>Choose a space...</option>
              {availableSpaces.map(space => (
                <option key={space.id} value={space.id}>
                  {space.name} - {space.location} (Capacity: {space.capacity})
                </option>
              ))}
            </select>
            {errors.spaceId && (
              <p className='mt-1 text-sm text-red-600'>{errors.spaceId}</p>
            )}
          </div>

          {/* Selected Space Info */}
          {selectedSpace && (
            <div className='bg-primary-50 border border-primary-200 rounded-lg p-4'>
              <h4 className='font-medium text-primary-900 mb-2'>
                {selectedSpace.name}
              </h4>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div className='flex items-center text-primary-700'>
                  <MapPin className='h-4 w-4 mr-1' />
                  <span>{selectedSpace.location}</span>
                </div>
                <div className='flex items-center text-primary-700'>
                  <User className='h-4 w-4 mr-1' />
                  <span>Capacity: {selectedSpace.capacity}</span>
                </div>
              </div>
              {selectedSpace.description && (
                <p className='mt-2 text-sm text-primary-600'>
                  {selectedSpace.description}
                </p>
              )}
            </div>
          )}

          {/* Client Email */}
          <Input
            label='Client Email *'
            type='email'
            value={formData.clientEmail}
            onChange={e => handleInputChange('clientEmail', e.target.value)}
            error={errors.clientEmail}
            placeholder='client@example.com'
            helperText='Email address for booking confirmation'
          />

          {/* Date and Time Selection */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              label='Start Date & Time *'
              type='datetime-local'
              value={formData.startTime}
              onChange={e => handleInputChange('startTime', e.target.value)}
              error={errors.startTime}
              min={getMinDateTime()}
            />

            <Input
              label='End Date & Time *'
              type='datetime-local'
              value={formData.endTime}
              onChange={e => handleInputChange('endTime', e.target.value)}
              error={errors.endTime}
              min={formData.startTime || getMinDateTime()}
            />
          </div>

          {/* Form Actions */}
          <div className='flex gap-4 pt-6 border-t border-gray-200'>
            {onCancel && (
              <Button
                type='button'
                variant='ghost'
                onClick={onCancel}
                className='flex-1'
              >
                Cancel
              </Button>
            )}
            <Button
              type='submit'
              variant='primary'
              isLoading={isSubmitting}
              disabled={
                !formData.spaceId ||
                !formData.clientEmail ||
                !formData.startTime ||
                !formData.endTime
              }
              className='flex-1'
            >
              {isSubmitting ? 'Creating Booking...' : 'Create Booking'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
