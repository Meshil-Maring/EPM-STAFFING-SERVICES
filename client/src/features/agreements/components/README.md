# Agreement Component - Refactored Structure

## Overview
The Agreement component has been split into modular, maintainable files for better organization and reusability.

## File Structure

```
agreement/
├── Agreement.jsx                 # Original monolithic file (kept for reference)
├── Agreement.refactored.jsx      # New main component (use this)
├── api.js                        # API data fetching
├── constants.js                  # Default values and configuration
├── styles.js                     # CSS styles for document and print
├── pdfUtils.js                   # PDF generation configuration
├── hooks.js                      # Custom React hooks
├── components.jsx                # Reusable UI components
├── DocumentHeader.jsx            # Page header with logo and company info
├── Page1Content.jsx              # First page content (sections 1-4)
├── Page2Content.jsx              # Second page content (sections 4.1-7)
├── Toolbar.jsx                   # Top toolbar with download/close buttons
├── PdfLoadingOverlay.jsx         # Loading overlay during PDF generation
└── README.md                     # This file
```

## Component Breakdown

### Core Files

**Agreement.refactored.jsx**
- Main component that orchestrates all parts
- Handles data fetching with React Query
- Manages state and renders the document

**constants.js**
- Default agreement values
- Configuration settings
- Easy to modify without touching component logic

**api.js**
- API endpoint for fetching agreement data
- Centralized data fetching logic

### UI Components

**components.jsx**
- Reusable building blocks:
  - `Page` - Page wrapper with A4 dimensions
  - `TopBar` - Orange gradient bar
  - `PageFooter` - Page number footer
  - `Section` - Content section wrapper
  - `SectionHeading` - Section title
  - `SectionDivider` - Visual separator
  - `BodyText` - Paragraph text
  - `Underlined` - Underlined text
  - `BulletItem` - List item
  - `SignatureLine` - Signature field

**DocumentHeader.jsx**
- Company logo placeholder
- Company name and tagline
- Contact information
- Document number
- Agreement title

**Page1Content.jsx**
- Introduction and parties
- Section 1: Job Requirements
- Section 2: Candidate Submission
- Section 3: Hiring Confirmation
- Section 4: Payment Terms (with table)

**Page2Content.jsx**
- Section 4 continued (payment details)
- Section 4.1: Service Fee Eligibility
- Section 5: Legal Implications
- Section 5.1: Legal Recovery
- Section 6: Duration and Termination
- Section 7: Acknowledgement
- Signature block

**Toolbar.jsx**
- Floating toolbar at top
- Download PDF button
- Close button
- Loading indicators

**PdfLoadingOverlay.jsx**
- Full-screen overlay during PDF generation
- Animated spinner
- Status message

### Utilities

**styles.js**
- All CSS styles in one place
- Print media queries
- Page break rules
- Animations

**pdfUtils.js**
- PDF configuration settings
- html2pdf options
- Color variable overrides
- PDF generation function

**hooks.js**
- `useHtml2PdfScript` - Loads html2pdf library
- `usePdfDownload` - Handles PDF generation
- `useEscapeKey` - Close on Escape key
- `useBodyScrollLock` - Prevents background scroll

## Usage

### Basic Usage
```jsx
import EmpanelmentAgreement from './Components/agreement/Agreement.refactored';

function App() {
  return (
    <EmpanelmentAgreement 
      agreementId="015" 
      onClose={() => console.log('Closed')} 
    />
  );
}
```

### With React Router
```jsx
import { useNavigate } from 'react-router-dom';
import EmpanelmentAgreement from './Components/agreement/Agreement.refactored';

function AgreementPage() {
  const navigate = useNavigate();
  
  return (
    <EmpanelmentAgreement 
      agreementId="015" 
      onClose={() => navigate(-1)} 
    />
  );
}
```

## Benefits of Refactoring

1. **Maintainability** - Each file has a single responsibility
2. **Reusability** - Components can be used in other documents
3. **Testability** - Easier to write unit tests for isolated functions
4. **Readability** - Smaller files are easier to understand
5. **Collaboration** - Multiple developers can work on different sections
6. **Scalability** - Easy to add new pages or sections

## Migration Guide

To switch from the old to the new structure:

1. Replace import:
   ```jsx
   // Old
   import EmpanelmentAgreement from './Components/agreement/Agreement';
   
   // New
   import EmpanelmentAgreement from './Components/agreement/Agreement.refactored';
   ```

2. No changes needed to props or usage - the API is identical

3. Once tested, you can rename `Agreement.refactored.jsx` to `Agreement.jsx`

## Customization

### Changing Default Values
Edit `constants.js`:
```js
export const DEFAULTS = {
  documentNumber: "015/EPMSS-CMA/2026-27",
  serviceChargePercent: "___",
  // ... modify as needed
};
```

### Adding New Sections
1. Add content to `Page1Content.jsx` or `Page2Content.jsx`
2. Or create a new `Page3Content.jsx` file
3. Import and use in `Agreement.refactored.jsx`

### Styling Changes
Edit `styles.js` for global styles or modify Tailwind classes in components

### PDF Configuration
Edit `pdfUtils.js` to change PDF settings, margins, quality, etc.

## Notes

- The original `Agreement.jsx` is kept for reference
- All functionality remains identical
- No breaking changes to the component API
- PDF generation works exactly the same way
