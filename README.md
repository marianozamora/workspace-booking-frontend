# Workspace Booking Frontend

A modern React application built with Vite and TypeScript for managing workspace reservations.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Testing**: Vitest + Testing Library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── assets/            # Static assets
├── main.tsx           # Application entry point
├── App.tsx            # Main App component
├── App.css            # Global styles
├── index.css          # Base styles & Tailwind
└── vite-env.d.ts      # TypeScript environment definitions
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME="Workspace Booking System"
VITE_APP_VERSION="1.0.0"
VITE_ENABLE_DEV_TOOLS=true
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Lint and fix issues
- `npm run type-check` - Type check without emitting

## 🌟 Features

### Current Implementation

- ✅ Vite + React setup with Hot Module Replacement
- ✅ TypeScript configuration with strict mode
- ✅ Tailwind CSS for utility-first styling
- ✅ Component-based architecture
- ✅ Development environment configuration
- ✅ Path mapping for clean imports

### Planned Features

- 🔲 Backend API integration
- 🔲 Authentication system
- 🔲 Workspace booking interface
- 🔲 Calendar integration
- 🔲 User management
- 🔲 Real-time notifications

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd workspace-booking-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3001`

## 🔗 API Integration

The frontend is configured to connect to the backend API running on `http://localhost:3000`. Make sure the backend server is running for full functionality.

## � Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React functional component patterns
- Use custom hooks for reusable logic
- Implement proper error boundaries

### Component Structure

- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper prop validation
- Use composition over inheritance

### Testing

- Write unit tests for utilities and hooks
- Use integration tests for complex components
- Maintain good test coverage
- Test accessibility features

## 🤝 Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation as needed
4. Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License.

- **Reservation System**: Create, view, and delete reservations
- **Search & Filters**: Find spaces and reservations quickly
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Technical Features

- **React 18**: Modern React with hooks and functional components
- **API Integration**: RESTful API communication with error handling
- **State Management**: Context API for global state management
- **Form Validation**: Client-side validation with user-friendly error messages
- **Authentication**: API key-based authentication
- **Loading States**: Smooth loading indicators and feedback
- **Error Handling**: Comprehensive error handling and user notifications

## 📋 Requirements

- Node.js (v16.0 or higher)
- npm or yarn package manager
- Backend API server running (see API Integration section)

## 🛠️ Installation

### Option 1: Standard Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd workspace-reservation-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration:

   ```
   REACT_APP_API_BASE_URL=http://localhost:3001/api
   REACT_APP_API_KEY=your-api-key-here
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   The application will open at `http://localhost:3000`

### Option 2: Docker Installation (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd workspace-reservation-frontend
   ```

2. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration.

3. **Build and run with Docker**

   ```bash
   docker-compose up --build
   ```

   The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Common/
│   │   ├── LoadingSpinner.js
│   │   ├── ConfirmDialog.js
│   │   └── ...
│   ├── Dashboard/
│   │   ├── Dashboard.js
│   │   └── Dashboard.css
│   ├── Layout/
│   │   ├── Layout.js
│   │   └── Layout.css
│   ├── Reservations/
│   │   ├── ReservationsList.js
│   │   ├── CreateReservation.js
│   │   └── ...
│   └── Spaces/
│       ├── SpacesList.js
│       ├── SpaceDetails.js
│       └── ...
├── contexts/
│   ├── ApiContext.js
│   └── ErrorContext.js
├── App.js
├── App.css
└── index.js
```

## 📡 API Integration

### API Endpoints Used

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/espacios`     | Fetch all available spaces         |
| GET    | `/espacios/:id` | Fetch specific space details       |
| GET    | `/reservas`     | Fetch reservations with pagination |
| POST   | `/reservas`     | Create a new reservation           |
| DELETE | `/reservas/:id` | Delete a reservation               |

### API Configuration

The application expects the following API response formats:

**Spaces (GET /espacios)**

```json
{
	"data": [
		{
			"id": 1,
			"nombre": "Conference Room A",
			"descripcion": "Large conference room with projector",
			"tipo": "meeting",
			"capacidad": 12,
			"precio": 50,
			"disponible": true,
			"imagen": "https://example.com/image.jpg"
		}
	]
}
```

**Reservations (GET /reservas)**

```json
{
	"data": [
		{
			"id": 1,
			"cliente": "John Doe",
			"email": "john@example.com",
			"espacioId": 1,
			"fecha": "2024-03-15",
			"horaInicio": "09:00",
			"horaFin": "11:00",
			"estado": "confirmed"
		}
	],
	"total": 25,
	"page": 1,
	"limit": 10
}
```

### Authentication

The application uses API key authentication. Include the API key in your `.env` file:

```
REACT_APP_API_KEY=your-api-key-here
```

All API requests include the header:

```
X-API-Key: your-api-key-here
```

## 🎨 User Interface

### Dashboard

- Overview statistics (total spaces, available spaces, total reservations)
- Quick action buttons for common tasks
- Recent reservations list
- Responsive card-based layout

### Spaces

- Grid view of available spaces
- Search and filter functionality
- Detailed space information
- Direct reservation links
- High-quality images and space amenities

### Reservations

- Paginated table view of all reservations
- Search by client name or space
- Filter by reservation status
- Create new reservations with form validation
- Delete reservations with confirmation

## ✅ Testing

### Run Tests

```bash
npm test
# or
yarn test
```

### Test Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

### Manual Testing Checklist

1. **Navigation**

   - [ ] All navigation links work correctly
   - [ ] Active page is highlighted
   - [ ] Mobile navigation is responsive

2. **Spaces**

   - [ ] Spaces load and display correctly
   - [ ] Search functionality works
   - [ ] Filters apply correctly
   - [ ] Space details page loads
   - [ ] Reserve button navigates to reservation form

3. **Reservations**

   - [ ] Reservations list loads with pagination
   - [ ] Create reservation form validates input
   - [ ] Successful reservation creation
   - [ ] Delete reservation works with confirmation
   - [ ] Search and filter functionality

4. **Error Handling**
   - [ ] API errors display user-friendly messages
   - [ ] Loading states show during API calls
   - [ ] Form validation prevents invalid submissions

## 🐳 Docker Support

### Development with Docker

```bash
# Build development image
docker build -t workspace-frontend:dev .

# Run development container
docker run -p 3000:3000 workspace-frontend:dev
```

### Production with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop services
docker-compose down
```

## 🔧 Configuration

### Environment Variables

| Variable                 | Description            | Default                     |
| ------------------------ | ---------------------- | --------------------------- |
| `REACT_APP_API_BASE_URL` | Backend API base URL   | `http://localhost:3001/api` |
| `REACT_APP_API_KEY`      | API authentication key | `your-api-key-here`         |

### Customization

#### Styling

- **Tailwind CSS**: Utility-first CSS framework
  - Custom design system in `tailwind.config.js`
  - Custom components in `@layer components`
  - Responsive design with mobile-first approach
  - Dark mode support (optional)
- **Component Styles**: Organized using Tailwind utilities
- **Custom Components**: Button, form, card, and notification styles
- **Color Scheme**: Customizable primary colors and semantic colors

#### Tailwind Customization

- Modify `tailwind.config.js` for design tokens
- Add custom colors, fonts, and spacing
- Extend animations and shadows
- Configure responsive breakpoints

#### API Integration

- Update `src/contexts/ApiContext.js` for API configuration
- Modify request/response handling as needed
- Add new API endpoints following existing patterns

## 🚀 Deployment

### Production Build

```bash
npm run build
# or
yarn build
```

### Deployment Options

1. **Static Hosting** (Netlify, Vercel, GitHub Pages)

   - Build the project
   - Deploy the `build` folder
   - Configure environment variables

2. **Docker Deployment**

   - Use the provided Dockerfile
   - Deploy with docker-compose
   - Configure reverse proxy if needed

3. **Traditional Hosting**
   - Build the project
   - Upload `build` folder to web server
   - Configure web server for SPA routing

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend allows frontend origin
   - Check API base URL configuration

2. **API Connection Issues**

   - Verify backend is running
   - Check API key configuration
   - Confirm API endpoints are accessible

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Development Tips

- Use browser developer tools for debugging
- Check console for error messages
- Verify network requests in Network tab
- Use React Developer Tools extension

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ using React and modern web technologies**
