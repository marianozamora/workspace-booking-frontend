import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle modal state
const ModalWrapper = ({ isOpen: initialIsOpen = false, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className='p-8'>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    title: 'Sample Modal',
    children: (
      <div>
        <p className='mb-4'>This is a sample modal with some content.</p>
        <p>
          You can put any content here including forms, images, or other
          components.
        </p>
      </div>
    ),
  },
};

export const WithForm: Story = {
  render: args => <ModalWrapper {...args} />,
  args: {
    title: 'Contact Form',
    children: (
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Name</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Enter your name'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type='email'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Enter your email'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Message</label>
          <textarea
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            rows={4}
            placeholder='Enter your message'
          />
        </div>
        <div className='flex gap-2 justify-end'>
          <Button variant='ghost'>Cancel</Button>
          <Button variant='primary'>Submit</Button>
        </div>
      </form>
    ),
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Always Open Modal',
    onClose: () => console.log('Close clicked'),
    children: (
      <div>
        <p>This modal is always open for demonstration purposes.</p>
      </div>
    ),
  },
};
