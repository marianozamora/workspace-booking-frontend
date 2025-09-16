import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/utils';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies primary variant styles', () => {
    renderWithProviders(<Button variant='primary'>Primary Button</Button>);

    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('bg-blue-600');
  });

  it('applies secondary variant styles', () => {
    renderWithProviders(<Button variant='secondary'>Secondary Button</Button>);

    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('bg-gray-600');
  });

  it('applies danger variant styles', () => {
    renderWithProviders(<Button variant='danger'>Delete</Button>);

    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('bg-red-600');
  });

  it('is disabled when disabled prop is true', () => {
    renderWithProviders(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('shows loading state', () => {
    renderWithProviders(<Button loading>Loading Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });

  it('applies full width styles', () => {
    renderWithProviders(<Button fullWidth>Full Width Button</Button>);

    const button = screen.getByRole('button', { name: /full width button/i });
    expect(button).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    renderWithProviders(
      <Button className='custom-class'>Custom Button</Button>
    );

    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });
});
