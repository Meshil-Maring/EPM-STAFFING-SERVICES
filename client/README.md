# Employee Staffing Services - Frontend

This is the React frontend for the Employee Staffing Services application, built with Vite for fast development and production builds.

## Project Overview

This template provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules. The application is a comprehensive job portal and staffing management system for companies and candidates.

## Key Features

- **Job Management**: Create, edit, and manage job postings
- **Candidate Tracking**: Track candidates through the hiring pipeline
- **Authentication**: OTP-based email authentication system
- **Responsive Design**: Mobile-first responsive design using Tailwind CSS
- **State Management**: Context API for global state management
- **Routing**: React Router for client-side navigation

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project Structure

```
client/
├── src/
│   ├── Components/          # Reusable UI components
│   ├── context/            # React Context providers for state management
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Main page components
│   ├── routes/             # Route configuration
│   ├── services/           # API service functions
│   ├── styles/             # Global styles and CSS
│   ├── utils/              # Utility functions and helpers
│   └── App.jsx             # Main application component
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Toastify** - Toast notifications
- **Framer Motion** - Animations
- **Axios** - HTTP client for API calls
- **Dicebear** - Avatar generation

## Application Architecture

### State Management

The application uses React Context API for global state management with the following contexts:

- **JobsContext**: Manages job postings and related operations
- **AccountsContext**: Handles company account data
- **CandidatesContext**: Manages candidate information and tracking
- **AdminAccountsContext**: Admin user management
- **LogState**: Authentication state management
- **SignupFormContext**: Multi-step signup form state
- **GridListViewContext**: View type preferences

### Component Structure

Components are organized into:

- **Common Components**: Reusable UI elements (Button, Input, Label, etc.)
- **Layout Components**: Page layouts and navigation
- **Section Components**: Feature-specific components
- **Dummy Data Structures**: Sample data for development

### Utility Functions

The utils directory contains:

- **API Services**: HTTP request handlers
- **Form Helpers**: Form validation and processing
- **State Management**: Session storage utilities
- **Toast Notifications**: User feedback system
- **Authentication**: Login/logout functionality
- **Data Validation**: Input validation helpers

## Development Guidelines

### Code Style

- Use consistent naming conventions
- Add JSDoc comments for all functions and components
- Follow React best practices
- Use TypeScript for type safety (recommended)

### Component Development

- Create reusable, composable components
- Use props for configuration
- Implement proper error boundaries
- Optimize for performance with memoization when needed

### State Management

- Use Context for global state
- Use local state for component-specific data
- Implement proper cleanup in useEffect hooks
- Avoid state mutations

### API Integration

- Use axios for HTTP requests
- Implement proper error handling
- Use environment variables for configuration
- Follow RESTful API conventions
