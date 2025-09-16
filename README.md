# Workspace Booking Frontend

A modern React application for managing workspace reservations, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v22.0 or higher) 
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workspace-booking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file with your configuration
   VITE_API_BASE_URL=http://localhost:3000
   VITE_API_KEY=your-api-key-here
   ```

4. **Start development server**
   ```bash
   npm run dev
   
   # Or use Makefile for quick start
   make start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3001`

## 📋 Available Scripts

### NPM Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run unit tests |
| `npm run test:ui` | Run tests with interactive UI |
| `npm run test:coverage` | Generate test coverage report |
| `npm run type-check` | Type check without emitting files |
| `npm run lint` | Lint code for errors and style issues |
| `npm run lint:fix` | Auto-fix linting issues |

### Makefile Commands
| Command | Description |
|---------|-------------|
| `make start` | Quick start: install dependencies and run dev server |
| `make start-docker` | Quick start with Docker |
| `make dev` | Start development server |
| `make build` | Build for production |
| `make test` | Run tests |
| `make docker-prod` | Run production with Docker |
| `make docker-dev` | Run development with Docker |
| `make clean` | Clean build artifacts |
| `make help` | Show all available commands |

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **TypeScript** | Type Safety | 5.2.2 |
| **Vite** | Build Tool & Dev Server | 5.0.0 |
| **Tailwind CSS** | Styling Framework | 3.3.5 |
| **TanStack Query** | Data Fetching & Caching | 5.8.4 |
| **React Router** | Client-side Routing | 6.20.0 |
| **Zustand** | State Management | 4.4.7 |
| **Axios** | HTTP Client | 1.6.0 |
| **Lucide React** | Icon Library | 0.294.0 |
| **Vitest** | Testing Framework | 0.34.6 |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, etc.)
│   ├── layout/         # Layout components
│   ├── dashboard/      # Dashboard specific components
│   ├── spaces/         # Space management components
│   └── bookings/       # Booking management components
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── store/              # Zustand state stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── test/               # Test utilities and setup
├── providers/          # React context providers
├── main.tsx           # Application entry point
└── App.tsx            # Root component
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_API_KEY=your-api-key-here

# App Configuration
VITE_APP_NAME="Workspace Booking System"
VITE_APP_VERSION="1.0.0"
```

### Backend Integration

The frontend connects to a backend API running on `http://localhost:3000`. Ensure your backend server is running and configured with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/spaces` | Fetch available workspaces |
| `GET` | `/api/v1/spaces/:id` | Get workspace details |
| `GET` | `/api/v1/bookings` | Fetch bookings with pagination |
| `POST` | `/api/v1/bookings` | Create new booking |
| `PUT` | `/api/v1/bookings/:id` | Update booking |
| `DELETE` | `/api/v1/bookings/:id` | Cancel booking |

## ✨ Features

### Current Implementation
- ✅ **Workspace Management** - Browse and view workspace details
- ✅ **Booking System** - Create, view, and manage reservations
- ✅ **Dashboard** - Overview statistics and quick actions
- ✅ **Responsive Design** - Mobile-first design approach
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Modern UI** - Clean interface with Tailwind CSS
- ✅ **Data Caching** - Optimized API calls with TanStack Query
- ✅ **Error Handling** - Comprehensive error boundaries
- ✅ **Testing Suite** - Unit and integration tests

### Technical Features
- **Hot Module Replacement** - Instant development feedback
- **Code Splitting** - Optimized bundle loading
- **API Integration** - RESTful API with error handling  
- **Form Validation** - Client-side validation with user feedback
- **State Management** - Global and local state handling
- **Accessibility** - WCAG compliant components

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Watch mode during development
npm run test -- --watch

# Generate coverage report
npm run test:coverage

# Interactive test UI
npm run test:ui
```

### Test Structure

- **Unit Tests** - Component and utility testing
- **Integration Tests** - API and user interaction testing
- **Setup** - Configured with Testing Library and jsdom

## 🐳 Docker Support

### Production with Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Development with Docker

```bash
# Run development environment
docker-compose --profile dev up

# Or build development image manually
docker build -f Dockerfile.dev -t workspace-frontend:dev .
docker run -p 3001:3001 -v $(pwd):/app workspace-frontend:dev
```

### Docker Commands

```bash
# Build production image
docker build -t workspace-frontend:prod .

# Run production container
docker run -p 3001:80 workspace-frontend:prod

# View logs
docker-compose logs -f frontend

# Access container shell
docker-compose exec frontend sh
```

## 🚀 Production Build

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Build Output

```
dist/
├── index.html          # Entry HTML file
├── assets/
│   ├── index-[hash].js    # Main application bundle
│   ├── vendor-[hash].js   # Third-party dependencies
│   ├── ui-[hash].js       # UI components bundle
│   └── index-[hash].css   # Compiled styles
└── [other static assets]
```

### Deployment Options

1. **Docker** (Recommended)
   ```bash
   # Production build and run
   docker-compose up --build
   
   # Or use Makefile
   make start-docker
   
   # Access at http://localhost:3001
   ```

2. **Vercel**
   - Connect your repository
   - Automatic deployments on push
   - Environment variables in dashboard

3. **Netlify**
   - Drag & drop `dist` folder
   - Or connect repository for CI/CD

4. **Static Hosting**
   - Upload `dist` folder contents
   - Configure for SPA routing

## 🐛 Troubleshooting

### Common Issues

**Development server won't start**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API connection errors**
- Verify backend server is running on port 3000
- Check `VITE_API_BASE_URL` in `.env` file  
- Ensure API key is correctly configured

**Build errors**
- Run `npm run type-check` to identify TypeScript issues
- Check for missing dependencies
- Verify Node.js version (v22.0+ required)

**CORS issues**
- Configure backend to allow frontend origin
- Check API proxy configuration in `vite.config.js`

### Development Tips

- Use React Developer Tools browser extension
- Check browser console for detailed error messages
- Monitor network requests in browser DevTools
- Use `npm run type-check` for TypeScript validation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use semantic commit messages
- Update documentation for significant changes

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**