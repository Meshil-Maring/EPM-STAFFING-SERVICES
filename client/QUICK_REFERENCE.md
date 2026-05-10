# Quick Reference Guide - Code Reorganization

## 🎯 What Changed

All `.js` files containing API calls and business logic have been reorganized into proper service layers following the feature structure.

---

## 📍 Where to Find Things Now

### Candidates Operations
```javascript
// OLD ❌
import { submitCandidates } from './components/end-point-function/client_management';

// NEW ✅
import { submitCandidateService } from '@/features/candidates/services';
```

**Location**: `src/features/candidates/services/`
- `candidate.service.js` - Submit, update, search candidates
- `clientManagement.service.js` - Client management operations

### Jobs Operations
```javascript
// NEW ✅
import { saveEditJob } from '@/features/jobs/services';
```

**Location**: `src/features/jobs/services/`
- `job.service.js` - Job CRUD operations

### Interview Operations
```javascript
// NEW ✅
import { scheduleInterview, rescheduleInterview, cancelInterview } from '@/features/interviews/services';
```

**Location**: `src/features/interviews/services/`
- `interview.service.js` - Interview scheduling & management

### Offer Operations
```javascript
// NEW ✅
import { offerReleased, getOfferReleaseInfo } from '@/features/offers/services';
```

**Location**: `src/features/offers/services/`
- `offer.service.js` - Offer release operations

### Settings Operations
```javascript
// NEW ✅
import { getUserInfo, updateUserContact, updatePassword } from '@/features/settings/services';
```

**Location**: `src/features/settings/services/`
- `settings.service.js` - User settings operations

### Shared Operations (Used Across Features)
```javascript
// NEW ✅
import { saveComment, getComments } from '@/shared/services';
import { pushNotification } from '@/shared/services';
```

**Location**: `src/shared/services/`
- `comment.service.js` - Comment operations
- `notification.service.js` - Notification operations

### Shared Utilities
```javascript
// NEW ✅
import { isValidDate, convertTo24Hour } from '@/shared/utils/timeValidation';
```

**Location**: `src/shared/utils/`
- `timeValidation.js` - Time/date validation utilities

---

## 🔄 Migration Examples

### Example 1: Submit Candidate

**Before**:
```javascript
import { submitCandidates } from '../components/end-point-function/client_management';

const result = await submitCandidates(
  job_id, user_id, active, candidate_name, email, phone, 
  location, job_type, expected_ctc, current_ctc, gender,
  date_of_birth, experience, linkedin, notice_period_days,
  skills, description, resumeFile, coverFile, portfolioFile
);
```

**After**:
```javascript
import { submitCandidateService } from '@/features/candidates/services';

const result = await submitCandidateService({
  job_id,
  user_id,
  active,
  candidate_name,
  email,
  phone,
  location,
  job_type,
  expected_ctc,
  current_ctc,
  gender,
  date_of_birth,
  experience,
  linkedin,
  notice_period_days,
  skills,
  description,
  resumeFile,
  coverFile,
  portfolioFile,
});
```

### Example 2: Schedule Interview

**Before**:
```javascript
import { scheduleInterview } from '../CandidateCard/candidateCard';

await scheduleInterview(application_id, user_id, data);
```

**After**:
```javascript
import { scheduleInterview } from '@/features/interviews/services';

await scheduleInterview(application_id, user_id, data);
```

### Example 3: Save Comment

**Before**:
```javascript
import { saveComment } from '../CandidateCard/candidateCard';

await saveComment(application_id, sender_id, type, sender_type, message, from);
```

**After**:
```javascript
import { saveComment } from '@/shared/services';

await saveComment({
  application_id,
  sender_id,
  type,
  sender_type,
  message,
  from,
});
```

---

## 📦 Service Functions Reference

### Candidates Service
- `submitCandidateService(candidateData)` - Submit new candidate
- `updateCandidateService(id, candidateData, applicationId)` - Update candidate
- `searchCandidateService(candidate_name)` - Search candidates

### Client Management Service
- `getClientManagementData(page)` - Get clients with pagination
- `updateFollowClient(clientId, adminId, followed)` - Follow/unfollow client
- `updateListJob(jobId, clientId, listed)` - Add/remove job from list
- `deleteClient(clientId)` - Delete client
- `saveClients(clientData)` - Update client information

### Job Service
- `saveEditJob(jobData)` - Save/update job details

### Interview Service
- `scheduleInterview(application_id, user_id, data)` - Schedule new interview
- `rescheduleInterview(id, user_id, application_id, data)` - Reschedule interview
- `cancelInterview(interviewId)` - Cancel interview
- `getInterviewCandidate(id, stage)` - Get interview data

### Offer Service
- `offerReleased(application_id, candidate_id, data, file)` - Release offer
- `getOfferReleaseInfo(page)` - Get offers with pagination

### Settings Service
- `getUserInfo(id)` - Get user information
- `updateUser(id, email)` - Update user email
- `upateCompanyInfo(companyData)` - Update company info
- `updateUserContact(contactData)` - Update contact info
- `updateUserAddress(addressData)` - Update address
- `verifyPassword(user_id, password)` - Verify password
- `updatePassword(user_id, password)` - Update password
- `updateEmail(user_id, email)` - Update email

### Comment Service (Shared)
- `saveComment(commentData)` - Save new comment
- `deleteComment(id)` - Delete comment
- `updateComment(id, text)` - Update comment
- `getComments(applicationId)` - Get comments for application

### Notification Service (Shared)
- `pushNotification(notificationData)` - Push new notification
- `getClientNotification(user_id)` - Get client notifications
- `getAdminNotification()` - Get admin notifications
- `updateNotification(notification_id)` - Mark notification as read

---

## ⚡ Quick Tips

1. **Use Barrel Exports**: Import from feature index
   ```javascript
   import { submitCandidateService, updateCandidateService } from '@/features/candidates/services';
   ```

2. **Object Parameters**: New services use object parameters for better readability
   ```javascript
   // Good ✅
   submitCandidateService({ job_id, user_id, candidate_name, ... });
   
   // Avoid ❌
   submitCandidateService(job_id, user_id, candidate_name, ...);
   ```

3. **Shared Services**: Use for cross-feature operations
   ```javascript
   import { saveComment, pushNotification } from '@/shared/services';
   ```

4. **Utilities**: Extract common logic to shared utils
   ```javascript
   import { isValidDate, convertTo24Hour } from '@/shared/utils/timeValidation';
   ```

---

## 🚨 Important Notes

1. **Old files still work** - They re-export from new services for backward compatibility
2. **Gradually migrate** - Update imports as you work on each component
3. **Remove old files later** - After all components are migrated
4. **Test thoroughly** - Ensure functionality remains the same

---

## 📚 Full Documentation

See `CODE_REORGANIZATION_SUMMARY.md` for complete details.

---

**Last Updated**: $(date)
**Status**: ✅ Ready to use
