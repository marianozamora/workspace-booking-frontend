import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert, NotificationContainer } from './Alert';
import type { Notification } from '../../store/useAppStore';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    notification: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNotification: Notification = {
  id: '1',
  type: 'success',
  title: 'Success!',
  message: 'Your action has been completed successfully.',
};

export const Success: Story = {
  args: {
    notification: {
      id: '1',
      type: 'success',
      title: 'Success!',
      message: 'Your booking has been created successfully.',
    },
    onClose: () => console.log('Alert closed'),
  },
};

export const Error: Story = {
  args: {
    notification: {
      id: '2',
      type: 'error',
      title: 'Error occurred',
      message: 'There was an error processing your request. Please try again.',
    },
    onClose: () => console.log('Alert closed'),
  },
};

export const Warning: Story = {
  args: {
    notification: {
      id: '3',
      type: 'warning',
      title: 'Warning',
      message: 'This action cannot be undone. Please proceed with caution.',
    },
    onClose: () => console.log('Alert closed'),
  },
};

export const Info: Story = {
  args: {
    notification: {
      id: '4',
      type: 'info',
      title: 'Information',
      message: 'Your session will expire in 5 minutes. Please save your work.',
    },
    onClose: () => console.log('Alert closed'),
  },
};

export const WithoutMessage: Story = {
  args: {
    notification: {
      id: '5',
      type: 'success',
      title: 'Simple success notification',
    },
    onClose: () => console.log('Alert closed'),
  },
};

// Story for NotificationContainer
const ContainerMeta: Meta<typeof NotificationContainer> = {
  title: 'UI/NotificationContainer',
  component: NotificationContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Container: StoryObj<typeof NotificationContainer> = {
  args: {
    notifications: [
      {
        id: '1',
        type: 'success',
        title: 'Success!',
        message: 'Your booking has been created.',
      },
      {
        id: '2',
        type: 'warning',
        title: 'Warning',
        message: 'Please check your email for confirmation.',
      },
      {
        id: '3',
        type: 'error',
        title: 'Error',
        message: 'Failed to save changes.',
      },
    ],
    onClose: (id: string) => console.log('Closed notification:', id),
  },
};
