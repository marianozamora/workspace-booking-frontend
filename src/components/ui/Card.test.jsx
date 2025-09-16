import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/utils';
import { Card } from './Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <Card>
        <h2>Card Title</h2>
        <p>Card content</p>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default styles', () => {
    renderWithProviders(<Card data-testid='card'>Content</Card>);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('bg-white', 'shadow-md', 'rounded-lg', 'border');
  });

  it('applies custom className', () => {
    renderWithProviders(
      <Card className='custom-card-class' data-testid='card'>
        Content
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-card-class');
  });

  it('passes through additional props', () => {
    renderWithProviders(
      <Card data-testid='card' role='article'>
        Content
      </Card>
    );

    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('role', 'article');
  });

  it('renders as a div by default', () => {
    renderWithProviders(<Card data-testid='card'>Content</Card>);

    const card = screen.getByTestId('card');
    expect(card.tagName).toBe('DIV');
  });
});
