# Implementation Guide - Candidate Submission Form

## Quick Start

### How to Use the Candidate Submission Form

**Location:** CompanyOverlay_SubmitCandidate component  
**Triggered from:** CompanyViewOverlay → Click "Submit" button on a job

### Form Features

#### 1. **Automatic Age Calculation**
```javascript
// User enters DOB → Age automatically calculated
Input: DOB = "1995-05-15"
Output: age = 28 (current year - birth year, adjusted for month/day)

// Supports both formats:
- YYYY-MM-DD (from date HTML5 input)
- DD/MM/YYYY (legacy format)
```

#### 2. **Mandatory Fields Validation**
```
All fields marked with * are required:
✓ Name of the Candidate *
✓ Email *
✓ Phone *
✓ Location *
✓ Job type *
✓ Current CTC *
✓ Expected CTC *
✓ D.O.B *
✓ Gender *
✓ LinkedIn *
✓ Notice Period *

Form submission blocked until all are filled.
```

#### 3. **Skills Management**
```javascript
// Add skill
Click "+ Add Skill" → New input field appears

// Edit skill
Click in any skill input → Type skill name → Saved to state

// Remove skill  
Click ✕ button next to skill → Only that skill removed
(Previously removed ALL skills - NOW FIXED)

// Example:
Start: []
Add: ["React"] → [" React"]
Add: ["Node.js"] → ["React", "Node.js"]
Edit 2nd: ["React", "Express.js"]
Remove 1st: ["Express.js"]
```

#### 4. **Form Submission**
```javascript
// Process:
1. User clicks "Submit"
2. Validation checks all required fields
3. If any missing → Alert shows missing field names
4. If all OK → Form submitted to CandidatesContext
5. New candidate added with:
   - All form data
   - Skills array
   - Job ID
   - Company ID
   - Auto-generated candidate ID
6. Overlay closes automatically

// Data structure example:
{
  name: "John Doe",
  email: "john@example.com",
  "phone number": "+918765432100",
  location: "Bangalore",
  gender: "Male",
  date: "1995-05-15",
  age: 28,
  skills: ["React", "Node.js", "MongoDB"],
  "job id": "job-123",
  "company id": "company-456",
  "current ctc": "50 LPA",
  "expected ctc": "70 LPA",
  "notice period": "30 days",
  linkedin: "linkedin.com/in/johndoe",
  resume: "", // File handling ready
  "cover letter": "",
  portfolio: ""
}
```

---

## Component Architecture

### Hierarchy
```
CompanyViewOverlay
↓
CompanyOverlay_SubmitCandidate (Main Form Container)
├── Header (company/job info)
├── Name Input (LabelInput)
├── Form Grid
│   ├── Email Input
│   ├── Phone Input
│   ├── Location Input
│   ├── Job Type Input
│   ├── Current CTC Input
│   ├── Expected CTC Input
│   ├── DOB Input (triggers age calc)
│   ├── Gender Input
│   ├── LinkedIn Input
│   └── Notice Period Input
├── SkillsSection (NEW)
│   ├── Skill Input Fields (dynamically added)
│   └── Add Skill Button
├── FileUploadSection (NEW)
│   ├── Resume Upload Zone
│   ├── Cover Letter Upload Zone
│   └── Portfolio Upload Zone
├── Description TextArea
└── Submit Button
```

### Key Files

#### 1. **CompanyOverlay_SubmitCandidate.jsx** (Main Component)
- Form state management
- Input change handlers
- Form submission logic
- Age calculation trigger

#### 2. **SkillsSection.jsx** (Extracted Component)
- Skills list display
- Add skill button
- Remove skill from index
- Skill input binding

#### 3. **FileUploadSection.jsx** (Extracted Component)
- PDF upload UI zones
- Animated file inputs
- File type validation (PDF)

#### 4. **candidateFormHelpers.js** (Utility Functions)
```javascript
// Age Calculation
computeAgeFromDOB(dob) 
  → Supports YYYY-MM-DD and DD/MM/YYYY
  → Returns integer age or empty string

// Validation
validateRequiredFields(candidateForm, requiredFieldIds)
  → Returns array of missing field IDs
  → Used for error messages

// Constants
CANDIDATE_FORM_INITIAL_STATE(jobId, companyId)
  → Factory function for form object
  
FORM_ELEMENTS
  → Array of form field definitions
  
getRequiredFieldIds()
  → Returns list of required field IDs
```

---

## Common Tasks

### Adding a New Form Field

```javascript
// 1. Update FORM_ELEMENTS in candidateFormHelpers.js
export const FORM_ELEMENTS = [
  // ... existing fields
  {
    label: "Experience*",
    id: "experience",
    type: "number"
  }
];

// 2. Update CANDIDATE_FORM_INITIAL_STATE
export const CANDIDATE_FORM_INITIAL_STATE = (jobId, companyId) => ({
  // ... existing fields
  experience: "",
  // ...
});

// 3. Add to component - will render automatically in the grid
// (Maps over FORM_ELEMENTS)
```

### Customizing Validation

```javascript
// In CompanyViewOverlay_SubmitCandidate.jsx
const handleSubmit = (e) => {
  // ... existing code
  
  // Add custom validation
  if (candidate_form.age < 18) {
    alert("Age must be 18 or above");
    return;
  }
  
  // ... rest of submission
};
```

### Changing Age Calculation Format

```javascript
// In candidateFormHelpers.js
export const computeAgeFromDOB = (dob) => {
  // Modify this function to change age calculation
  // Currently: simple year difference with month/day adjustment
  
  // Example: Add rounding logic
  const ageWithMonths = age + (months / 12);
  return Math.floor(ageWithMonths);
};
```

---

## Troubleshooting

### Issue: Age not calculating
**Solution:** Check date format matches YYYY-MM-DD or DD/MM/YYYY

### Issue: Skills not saving
**Solution:** Verify SkillsSection receives correct props and state updates

### Issue: Form won't submit
**Solution:**
1. Check browser console for validation errors
2. Verify all fields marked with * are filled
3. Check CandidatesContext is properly imported

### Issue: Missing imports
**Solution:** Update relative paths - components are in `../AdminClientManagement/`

---

## Performance Notes

- ✅ Skills array update: O(n) where n = number of skills
- ✅ Age calculation: O(1) - single date math
- ✅ Validation: O(n) where n = number of required fields
- ✅ Form submission: O(1) - direct context call

**Optimization:** Currently sufficient for 100+ skills without noticeable lag

---

## Future Enhancements

1. **File Upload Backend**
   - AWS S3 integration
   - File size validation
   - File type verification

2. **Advanced Validation**
   - Email format checking
   - Phone number verification
   - CTC range validation (current < expected)

3. **Form Persistence**
   - Auto-save to localStorage
   - Prevent data loss on accidental close
   - Resume form session

4. **User Feedback**
   - Toast notifications (success/error)
   - Field error visual indicators
   - Loading state during submission

5. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

---

## Related Documentation

- See [REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md) for detailed code changes
- See [TASK_COMPLETION_REPORT.md](TASK_COMPLETION_REPORT.md) for full project summary
- Check `src/context/CandidatesContext.jsx` for context API details
- Review `src/utils/candidateFormHelpers.js` for utility functions

---

**Last Updated:** February 18, 2026  
**Component Version:** 1.0  
**Status:** Production Ready ✅
