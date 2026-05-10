# EPM Staffing Services - Project Structure

## 📁 New Project Structure

This project has been reorganized following modern React best practices with a feature-based architecture.

### Directory Overview

```
client/
├── e2e/                          # End-to-end tests (Playwright)
│   ├── fixtures/                 # Test fixtures
│   ├── tests/                    # Test specs
│   └── pages/                    # Page objects
│
├── scripts/                      # Build and utility scripts
│
├── tests/                        # Integration & unit tests
│   ├── integration/              # Integration tests
│   └── utils/                    # Test utilities
│
├── src/
│   ├── assets/                   # Static assets
│   │   ├── fonts/                # Font files
│   │   ├── icons/                # Icon components
│   │   └── images/               # Image files
│   │
│   ├── config/                   # App configuration
│   │   ├── app.config.ts         # App settings
│   │   └── env.ts                # Environment variables
│   │
│   ├── lib/                      # Third-party library configs
│   │
│   ├── mocks/                    # Mock data for testing
│   │   ├── handlers/             # MSW handlers
│   │   └── fixtures/             # Mock data fixtures
│   │
│   ├── api/                      # API layer
│   │   ├── client.ts             # API client setup
│   │   ├── interceptors/         # Request/response interceptors
│   │   └── features/             # Feature-specific API calls
│   │
│   ├── store/                    # State management
│   │   ├── index.ts              # Store configuration
│   │   └── slices/               # Redux slices
│   │
│   ├── router/                   # Routing configuration
│   │   ├── index.tsx             # Router setup
│   │   ├── guards/               # Route guards (auth, role)
│   │   ├── layouts/              # Layout components
│   │   └── routes/               # Route definitions
│   │
│   ├── features/                 # Feature modules
│   │   ├── auth/                 # Authentication
│   │   ├── candidates/           # Candidate management
│   │   ├── jobs/                 # Job management
│   │   ├── dashboard/            # Dashboard
│   │   ├── interviews/           # Interview scheduling
│   │   ├── offers/               # Offer management
│   │   └── settings/             # Settings
│   │
│   ├── shared/                   # Shared resources
│   │   ├── components/           # Reusable components
│   │   │   ├── ui/               # UI components
│   │   │   ├── layout/           # Layout components
│   │   │   ├── feedback/         # Feedback components
│   │   │   └── data-display/     # Data display components
│   │   ├── hooks/                # Custom hooks
│   │   ├── utils/                # Utility functions
│   │   ├── workers/              # Web workers
│   │   └── context/              # React contexts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── common.types.ts       # Common types
│   │   └── api.types.ts          # API types
│   │
│   ├── styles/                   # Global styles
│   │   ├── globals.css           # Global CSS
│   │   └── index.css             # Main CSS entry
│   │
│   ├── pages/                    # Top-level pages
│   │
│   ├── main.jsx                  # App entry point
│   └── App.jsx                   # Root component
│
├── _unused_old_files/            # Deprecated/unused files
│
├── public/                       # Public assets
├── .env.example                  # Environment variables template
├── package.json                  # Dependencies
├── vite.config.js                # Vite configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎯 Feature Structure

Each feature follows this structure:

```
feature/
├── index.ts                      # Public exports
├── components/                   # Feature components
├── hooks/                        # Feature hooks
├── services/                     # Feature services
├── constants/                    # Feature constants
├── types/                        # Feature types
├── schemas/                      # Validation schemas
└── pages/                        # Feature pages
```

## 📦 Key Features

### Auth Feature
- Login/Register components
- Authentication hooks
- Auth services and schemas

### Jobs Feature
- Organized by role (admin/client/shared)
- Job listing, creation, and management
- Job-specific hooks and services

### Candidates Feature
- Candidate cards and profiles
- Submission management
- Interview scheduling

### Dashboard Feature
- Overview cards and statistics
- Job cards and details
- Candidate management

### Settings Feature
- Company information
- Contact management
- Account settings

## 🔄 Migration Notes

### Old → New Mapping

- `src/Components/common/` → `src/shared/components/ui/`
- `src/Components/layouts/` → `src/features/*/components/`
- `src/services/` → `src/api/features/`
- `src/context/` → `src/shared/context/`
- `src/hooks/` → `src/shared/hooks/`
- `src/utils/` → `src/shared/utils/`
- `src/routes/` → `src/router/routes/`
- `src/pages/` → `src/features/*/pages/`

### Unused Files

All deprecated files have been moved to `_unused_old_files/` including:
- Dummy data structures
- Old test files
- Agreement components
- Documentation files
- Sections components

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   copy .env.example .env.local
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## 📝 Import Path Aliases

TypeScript path aliases are configured:

```typescript
import { Button } from '@/shared/components/ui';
import { useAuth } from '@/features/auth';
import { jobsApi } from '@/api/features';
import { APP_CONFIG } from '@/config/app.config';
```

## 🧪 Testing

- Unit tests: `npm run test`
- Integration tests: `npm run test:integration`
- E2E tests: `npm run test:e2e`

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Feature-Sliced Design](https://feature-sliced.design/)
