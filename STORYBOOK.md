# Storybook Documentation

## Overview
This project uses Storybook v9.1.6 to develop and document UI components in isolation.

## Getting Started

### Running Storybook
```bash
yarn storybook
```
This will start Storybook on `http://localhost:6006`

### Building Storybook
```bash
yarn build-storybook
```
This creates a static build of Storybook in the `storybook-static` directory.

## Available Components

### UI Components
All UI components have comprehensive stories with different variants and states:

- **Button** (`src/components/ui/Button.stories.tsx`)
  - Variants: primary, secondary, danger, ghost
  - Sizes: sm, md, lg
  - States: disabled, loading

- **Card** (`src/components/ui/Card.stories.tsx`)
  - Default card layout
  - With custom padding
  - Minimal variant

- **Modal** (`src/components/ui/Modal.stories.tsx`)
  - Interactive modal with trigger button
  - Form example
  - Different sizes: sm, md, lg, xl

- **Input & Textarea** (`src/components/ui/Input.stories.tsx`)
  - With/without labels
  - Error states
  - Helper text
  - Disabled states

- **Alert** (`src/components/ui/Alert.stories.tsx`)
  - Types: success, error, warning, info
  - With/without messages
  - NotificationContainer for multiple alerts

- **Loading** (`src/components/ui/Loading.stories.tsx`)
  - LoadingSpinner with different sizes
  - LoadingOverlay with custom messages

- **Pagination** (`src/components/ui/Pagination.stories.tsx`)
  - Different page counts
  - Interactive page navigation
  - Edge cases (first, middle, last page)

## Storybook Configuration

### Main Configuration (`.storybook/main.ts`)
- Configured for React + Vite
- TypeScript support with react-docgen-typescript
- Stories located in `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`

### Preview Configuration (`.storybook/preview.ts`)
- Global CSS imported from `src/index.css`
- Background controls (light/dark)
- Action controls for event handlers

## Writing Stories

### Basic Story Structure
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'UI/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

### Interactive Stories
For components with state (like modals), use wrapper components:
```typescript
const ModalWrapper = ({ ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...args} />
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <ModalWrapper {...args} />,
};
```

## Best Practices

1. **Component Isolation**: Each story should work independently
2. **Real Data**: Use realistic data in stories
3. **Edge Cases**: Include error states, empty states, loading states
4. **Accessibility**: Test components with screen readers
5. **Responsive Design**: Test different viewport sizes

## Addons Included

- **@storybook/addon-docs**: Auto-generated documentation
- **@storybook/addon-onboarding**: Welcome guide for new users

## Deployment
Storybook can be deployed as a static site. The build output in `storybook-static/` can be hosted on any static hosting service like Netlify, Vercel, or GitHub Pages.