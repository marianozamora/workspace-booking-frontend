import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2'>Card Title</h3>
        <p className='text-gray-600'>
          This is a sample card with some content. It demonstrates how the card
          component looks with text content.
        </p>
      </div>
    ),
  },
};

export const WithPadding: Story = {
  args: {
    className: 'p-6',
    children: (
      <div>
        <h3 className='text-xl font-bold mb-3'>Padded Card</h3>
        <p className='text-gray-700 mb-4'>
          This card has extra padding applied through the className prop.
        </p>
        <div className='flex gap-2'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded'>
            Action
          </button>
          <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded'>
            Cancel
          </button>
        </div>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    children: (
      <div className='p-3'>
        <p className='text-sm text-gray-500'>Minimal card content</p>
      </div>
    ),
  },
};
