# Migration Guide

## 🔄 Import Path Updates

When updating your code to use the new structure, update imports as follows:

### Common Components
```javascript
// OLD
import Button from '../Components/common/Button';
import Input from '../Components/common/Input';

// NEW
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
```

### Services
```javascript
// OLD
import { authService } from '../services/auth.services';
import { jobsService } from '../services/jobs.services';

// NEW
import { authService } from '@/api/features/auth.services';
import { jobsService } from '@/api/features/jobs.services';
```

### Hooks
```javascript
// OLD
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

// NEW
import { useAuth } from '@/shared/hooks/useAuth';
import { useFetch } from '@/shared/hooks/useFetch';
```

### Context
```javascript
// OLD
import { AuthContext } from '../context/AuthContext';

// NEW
import { AuthContext } from '@/shared/context/AuthContext';
```

### Utils
```javascript
// OLD
import { formatDate } from '../utils/formatDate';

// NEW
import { formatDate } from '@/shared/utils/formatDate';
```

### Routes
```javascript
// OLD
import AppRoutes from './routes/AppRoutes';

// NEW
import AppRoutes from '@/router';
```

### Feature Components
```javascript
// OLD
import LoginForm from '../Components/layouts/SigningpagesLayouts/Signin_form';

// NEW
import { LoginForm } from '@/features/auth/components/Signin_form';
```

## 📁 File Location Changes

### Components
- **Auth Components**: `src/features/auth/components/`
- **Job Components**: `src/features/jobs/components/`
- **Candidate Components**: `src/features/candidates/components/`
- **Dashboard Components**: `src/features/dashboard/components/`
- **Settings Components**: `src/features/settings/components/`
- **Shared UI Components**: `src/shared/components/ui/`
- **Layout Components**: `src/shared/components/layout/`

### Pages
- All pages moved to respective feature folders under `pages/` subdirectory
- Example: `src/features/dashboard/pages/Dashboard.jsx`

### Services
- All services moved to `src/api/features/`
- Keep the same filename

### Hooks
- Feature-specific hooks: `src/features/*/hooks/`
- Shared hooks: `src/shared/hooks/`

### Utils
- All utilities moved to `src/shared/utils/`

## 🗑️ Deprecated Files

The following have been moved to `_unused_old_files/`:

1. **Dummy Data**: All JSON dummy data files
2. **Test Files**: Old test implementations
3. **Agreement Components**: PDF agreement components
4. **Documentation**: Old markdown documentation files
5. **Sections**: Old section components
6. **InputElements.json**: Input configuration file

## ⚠️ Breaking Changes

1. **Import paths**: All relative imports need to be updated to use path aliases
2. **Component exports**: Components should be exported as named exports
3. **Service structure**: Services are now under `api/features/` instead of `services/`

## ✅ Checklist for Migration

- [ ] Update all import statements
- [ ] Test all routes still work
- [ ] Verify API calls function correctly
- [ ] Check authentication flow
- [ ] Test all features (jobs, candidates, dashboard, etc.)
- [ ] Verify shared components render properly
- [ ] Test form submissions
- [ ] Check file uploads
- [ ] Verify settings page functionality
- [ ] Test responsive design

## 🔧 Configuration Updates

### Vite Config
Path aliases are configured in `vite.config.js`:
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@/features': path.resolve(__dirname, './src/features'),
    '@/shared': path.resolve(__dirname, './src/shared'),
    '@/api': path.resolve(__dirname, './src/api'),
    '@/config': path.resolve(__dirname, './src/config'),
  }
}
```

### TypeScript Config
Path aliases are also in `tsconfig.json` for TypeScript support.

## 📞 Support

If you encounter issues during migration:
1. Check the `PROJECT_STRUCTURE.md` for directory layout
2. Verify import paths match the new structure
3. Ensure all dependencies are installed
4. Clear cache: `npm run clean` (if available)

## 🎯 Next Steps

1. Update all component imports
2. Test the application thoroughly
3. Update any documentation
4. Remove old unused files after verification
5. Update CI/CD pipelines if needed
