import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner, LoadingOverlay } from './Loading';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/Loading',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithCustomColor: Story = {
  args: {
    size: 'md',
    className: 'text-red-500',
  },
};

// LoadingOverlay Stories
const OverlayMeta: Meta<typeof LoadingOverlay> = {
  title: 'UI/LoadingOverlay',
  component: LoadingOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: { type: 'boolean' },
    },
    message: {
      control: { type: 'text' },
    },
  },
};

export const OverlayDefault: StoryObj<typeof LoadingOverlay> = {
  args: {
    isLoading: true,
    children: (
      <div className='w-80 h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'>
        <p className='text-gray-500'>Content behind overlay</p>
      </div>
    ),
  },
  parameters: OverlayMeta.parameters,
};

export const OverlayWithCustomMessage: StoryObj<typeof LoadingOverlay> = {
  args: {
    isLoading: true,
    message: 'Saving your changes...',
    children: (
      <div className='w-80 h-40 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center'>
        <p className='text-gray-500'>Form content here</p>
      </div>
    ),
  },
  parameters: OverlayMeta.parameters,
};

export const OverlayNotLoading: StoryObj<typeof LoadingOverlay> = {
  args: {
    isLoading: false,
    children: (
      <div className='w-80 h-40 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center'>
        <p className='text-green-700'>Content is visible when not loading</p>
      </div>
    ),
  },
  parameters: OverlayMeta.parameters,
};
