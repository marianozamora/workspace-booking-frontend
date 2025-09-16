import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle pagination state
const PaginationWrapper = ({
  currentPage: initialPage = 1,
  totalPages = 10,
  ...args
}: any) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <div className='space-y-4'>
      <div className='text-center text-sm text-gray-600'>
        Page {currentPage} of {totalPages}
      </div>
      <Pagination
        {...args}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const SmallPagination: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

export const LargePagination: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 5,
    totalPages: 20,
  },
};

export const FirstPage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 15,
  },
};

export const MiddlePage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 8,
    totalPages: 15,
  },
};

export const LastPage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 15,
    totalPages: 15,
  },
};

export const SinglePage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const VeryLargePagination: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 50,
    totalPages: 100,
  },
};
