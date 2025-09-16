import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/utils';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders with correct placeholder', () => {
    renderWithProviders(<Input placeholder='Enter your name' />);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('renders with label', () => {
    renderWithProviders(<Input label='Name' placeholder='Enter your name' />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithProviders(
      <Input onChange={handleChange} placeholder='Type here' />
    );

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalledTimes(5); // Once for each character
  });

  it('displays error state', () => {
    renderWithProviders(
      <Input error='This field is required' placeholder='Input with error' />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Input with error');
    expect(input).toHaveClass('border-red-500');
  });

  it('applies required styles when required', () => {
    renderWithProviders(
      <Input label='Required Field' required placeholder='Required input' />
    );

    expect(screen.getByText('Required Field *')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithProviders(<Input disabled placeholder='Disabled input' />);

    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('bg-gray-100', 'cursor-not-allowed');
  });

  it('applies custom className', () => {
    renderWithProviders(
      <Input className='custom-input' placeholder='Custom input' />
    );

    const input = screen.getByPlaceholderText('Custom input');
    expect(input).toHaveClass('custom-input');
  });

  it('renders with different input types', () => {
    const { rerender } = renderWithProviders(
      <Input type='email' placeholder='Email input' />
    );

    expect(screen.getByPlaceholderText('Email input')).toHaveAttribute(
      'type',
      'email'
    );

    rerender(<Input type='password' placeholder='Password input' />);
    expect(screen.getByPlaceholderText('Password input')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('forwards ref correctly', () => {
    let inputRef;

    const TestComponent = () => {
      inputRef = React.useRef();
      return <Input ref={inputRef} placeholder='Ref input' />;
    };

    renderWithProviders(<TestComponent />);

    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
  });
});
