import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea } from './Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Must be at least 8 characters long',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

// Textarea Stories
const TextareaMeta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    rows: {
      control: { type: 'number' },
    },
  },
};

export const TextareaDefault: StoryObj<typeof Textarea> = {
  args: {
    placeholder: 'Enter your message here...',
    rows: 4,
  },
  parameters: TextareaMeta.parameters,
};

export const TextareaWithLabel: StoryObj<typeof Textarea> = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    rows: 5,
  },
  parameters: TextareaMeta.parameters,
};

export const TextareaWithError: StoryObj<typeof Textarea> = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    rows: 4,
    error: 'Description must be at least 10 characters long',
    value: 'Too short',
  },
  parameters: TextareaMeta.parameters,
};

export const TextareaWithHelperText: StoryObj<typeof Textarea> = {
  args: {
    label: 'Comments',
    placeholder: 'Share your thoughts...',
    rows: 6,
    helperText: 'Maximum 500 characters',
  },
  parameters: TextareaMeta.parameters,
};
