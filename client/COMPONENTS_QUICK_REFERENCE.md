# Components Migration Quick Reference

## Where Did My Component Go?

### Quick Lookup Table

| Old Location | New Location | Type |
|-------------|--------------|------|
| `Components/agreement/*` | `features/agreements/components/*` | Feature |
| `Components/common/*` | `shared/components/ui/*` | Shared UI |
| `Components/dummy_data_structures/*` | `shared/constants/dummy_data/*` | Constants |
| `Components/InputElements.json` | `shared/constants/InputElements.json` | Constants |
| `Components/layouts/Admin/AdminClientManagement/*` | `features/candidates/components/*` | Feature |
| `Components/layouts/Admin/AdminCompanyOverview/*` | `features/candidates/components/admin/AdminCompanyOverview/*` | Feature |
| `Components/layouts/Admin/JobOverview/*` | `features/jobs/components/admin/JobOverview/*` | Feature |
| `Components/layouts/Admin/ListedJobs/*` | `features/jobs/components/admin/*` | Feature |
| `Components/layouts/Admin/SubmittedCondidates/*` | `features/candidates/components/*` | Feature |
| `Components/layouts/Admin/common/*` | `shared/components/ui/*` | Shared UI |
| `Components/layouts/Client/CandidateCard/*` | `features/candidates/components/client/CandidateCard/*` | Feature |
| `Components/layouts/Client/InterviewPipeine/*` | `features/interviews/components/client/*` | Feature |
| `Components/layouts/Client/JobOverview/*` | `features/jobs/components/client/JobOverview/*` | Feature |
| `Components/layouts/Client/OfferReleased/*` | `features/offers/components/client/*` | Feature |
| `Components/layouts/Client/Setting/*` | `features/settings/components/client/*` | Feature |
| `Components/layouts/Dashboard/*` | `features/dashboard/components/*` | Feature |
| `Components/layouts/Home/*` | `features/auth/pages/*` | Feature |
| `Components/layouts/Settings/*` | `features/settings/components/*` | Feature |
| `Components/layouts/SigningpagesLayouts/*` | `features/auth/components/*` | Feature |
| `Components/layouts/Notifications/*` | `shared/components/notifications/*` | Shared |
| `Components/layouts/CommonLayouts/*` | `shared/components/layout/*` | Shared |
| `Components/layouts/JobCard/*` | `features/jobs/components/shared/JobCard/*` | Feature |
| `Components/layouts/common_function/*` | `shared/utils/*` | Shared Utils |
| `Components/sections/*` | `features/jobs/components/sections/*` | Feature |

## Import Examples

### Before (Old Structure)
```javascript
// Agreement
import Agreement from '../Components/agreement/Agreement';

// Common UI
import Button from '../Components/common/Button';
import Input from '../Components/common/Input';

// Dummy Data
import Jobs from '../Components/dummy_data_structures/Jobs.json';
import InputElements from '../Components/InputElements.json';

// Admin Components
import AdminCompanyOverview from '../Components/layouts/Admin/AdminCompanyOverview/AdminCompanyOverview';
import JobOverviewMain from '../Components/layouts/Admin/JobOverview/JobOverviewMain';

// Client Components
import CandidateCard from '../Components/layouts/Client/CandidateCard/CandidateCard';
import InterviewPipelineMain from '../Components/layouts/Client/InterviewPipeine/InterviewPipelineMain';
import OfferReleasedMain from '../Components/layouts/Client/OfferReleased/OfferReleasedMain';

// Notifications
import Notifications from '../Components/layouts/Notifications/Notifications';

// Sections
import JobForm from '../Components/sections/JobForm';
```

### After (New Structure)
```javascript
// Agreement
import Agreement from '../features/agreements/components/Agreement';
// OR using index
import { Agreement } from '../features/agreements';

// Common UI
import Button from '../shared/components/ui/Button';
import Input from '../shared/components/ui/Input';

// Dummy Data & Constants
import Jobs from '../shared/constants/dummy_data/Jobs.json';
import InputElements from '../shared/constants/InputElements.json';
// OR using index
import { Jobs, InputElements } from '../shared/constants';

// Admin Components
import AdminCompanyOverview from '../features/candidates/components/admin/AdminCompanyOverview/AdminCompanyOverview';
import JobOverviewMain from '../features/jobs/components/admin/JobOverview/JobOverviewMain';

// Client Components
import CandidateCard from '../features/candidates/components/client/CandidateCard/CandidateCard';
import InterviewPipelineMain from '../features/interviews/components/client/InterviewPipelineMain';
import OfferReleasedMain from '../features/offers/components/client/OfferReleasedMain';

// Notifications
import Notifications from '../shared/components/notifications/Notifications';
// OR using index
import { Notifications } from '../shared/components/notifications';

// Sections
import JobForm from '../features/jobs/components/sections/JobForm';
```

## Feature Structure Template

Each feature follows this structure:
```
features/[feature-name]/
├── components/          # React components
│   ├── admin/          # Admin-specific components
│   ├── client/         # Client-specific components
│   └── shared/         # Shared within feature
├── services/           # API calls & business logic
├── hooks/              # Custom React hooks
├── constants/          # Feature constants
├── utils/              # Feature utilities
├── schemas/            # Validation schemas
├── types/              # TypeScript types
├── pages/              # Page components
└── index.js            # Feature exports
```

## Shared Structure

```
shared/
├── components/
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   ├── notifications/  # Notification components
│   └── data-display/   # Data display components
├── services/           # Shared services
├── hooks/              # Shared hooks
├── utils/              # Shared utilities
├── context/            # React contexts
└── constants/          # Shared constants
```

## Search & Replace Patterns

Use these regex patterns in your IDE for bulk updates:

### Pattern 1: Agreement
```
Find:    from ['"](.*)Components/agreement/(.*)['"]
Replace: from '$1features/agreements/components/$2'
```

### Pattern 2: Common Components
```
Find:    from ['"](.*)Components/common/(.*)['"]
Replace: from '$1shared/components/ui/$2'
```

### Pattern 3: Dummy Data
```
Find:    from ['"](.*)Components/dummy_data_structures/(.*)['"]
Replace: from '$1shared/constants/dummy_data/$2'
```

### Pattern 4: Admin Components
```
Find:    from ['"](.*)Components/layouts/Admin/(.*)['"]
Replace: from '$1features/[FEATURE]/components/admin/$2'
Note: Replace [FEATURE] with appropriate feature (candidates, jobs, etc.)
```

### Pattern 5: Client Components
```
Find:    from ['"](.*)Components/layouts/Client/(.*)['"]
Replace: from '$1features/[FEATURE]/components/client/$2'
Note: Replace [FEATURE] with appropriate feature
```

### Pattern 6: Notifications
```
Find:    from ['"](.*)Components/layouts/Notifications/(.*)['"]
Replace: from '$1shared/components/notifications/$2'
```

### Pattern 7: Sections
```
Find:    from ['"](.*)Components/sections/(.*)['"]
Replace: from '$1features/jobs/components/sections/$2'
```

## Testing Checklist

After migration, test these areas:

- [ ] Agreement/Terms page loads
- [ ] All admin pages load (Client Management, Job Overview, Listed Jobs, Submitted Candidates)
- [ ] All client pages load (Dashboard, Candidate Cards, Interview Pipeline, Offers)
- [ ] Settings page loads for both admin and client
- [ ] Notifications work
- [ ] Job forms and sections work
- [ ] All modals open correctly
- [ ] No console errors for missing imports
- [ ] All dummy data loads correctly

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Check the import path matches the new structure. Use the lookup table above.

### Issue: "Default export not found"
**Solution:** Check if the component uses named exports. Update import statement accordingly.

### Issue: "Circular dependency"
**Solution:** Use index files for cleaner imports and avoid circular references.

### Issue: "Component not rendering"
**Solution:** Verify the component file was moved correctly and all its dependencies are updated.

## Benefits Summary

✅ **Clear Organization**: Features are self-contained
✅ **Easy Navigation**: Intuitive folder structure
✅ **Better Scalability**: Add features without affecting others
✅ **Improved Collaboration**: Teams can work on separate features
✅ **Cleaner Imports**: Use index files for shorter import paths
✅ **Shared Resources**: Common components in dedicated location

## Need Help?

Refer to:
- `COMPONENTS_MIGRATION_SUMMARY.md` - Detailed migration information
- `PROJECT_STRUCTURE.md` - Overall project structure
- `MIGRATION_GUIDE.md` - Step-by-step migration guide

## Last Updated
${new Date().toISOString().split('T')[0]}
