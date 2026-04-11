# Settings Components Data Structure Guide

## Backend Data Structure

The settings components are designed to work with the following backend data structure:

```javascript
{
  id: "b68f0e1a-fd37-47b9-ba69-f249531155fa",
  email: "musarafudesire36@gmail.com",
  role: "user",
  active: true,
  signup_stage: "completed",
  user_created_at: "2026-04-09T18:13:51.649Z",
  user_updated_at: "2026-04-09T18:15:45.390Z",
  contact_email: "musarafudesire36@gmail.com",
  phone: "+91-8942530948",
  others: {},
  street: "234, Mazoe",
  city: "Chandigarh",
  state: "Punjab",
  pin_code: "140307",
  company_name: "MusaTech",
  industry_type: "Banking",
  registration_number: "1239234-CN",
  company_description: "The mind"
}
```

## Component Data Mapping

### 1. Settings.jsx (Main Component)

- **Purpose**: Main container for all settings sections
- **Data Flow**: Fetches user data via `getUserInfo(user.id)` and distributes to child components
- **Key Fields Used**: All fields from backend
- **Fallback Values**: Uses optional chaining (`?.`) and `|| "N/A"` pattern

### 2. CompanyInformation.jsx

- **Purpose**: Display and edit company-related information
- **Mapped Fields**:
  - `company_name` → Company Name field
  - `registration_number` → Registration Number field
  - `city` → City field
  - `state` → State field
  - `industry_type` → Available but not currently displayed (commented out)
  - `company_description` → Available but not currently displayed
- **Update Mechanism**: Uses `onCompanyUpdate` callback to update parent state

### 3. ContactInformation.jsx

- **Purpose**: Display and edit contact information
- **Mapped Fields**:
  - `contact_email` → Contact Email field (primary contact email)
  - `phone` → Phone number field
  - `others` → Dynamic contact fields stored as array of objects: `[{label_name: string, value: string}]`
  - `website` → Website field (available but not in current backend structure)
  - `linkedIn` → LinkedIn field (available but not in current backend structure)
- **Note**: Uses `contact_email` instead of `email` to distinguish from user authentication email
- **Dynamic Contacts**: The `others` array is automatically synced with parent state when contacts are added, removed, or modified

### 4. MainTop.jsx

- **Purpose**: Handle OTP verification and account actions
- **Data Usage**: Uses `logged_user_data` prop for password verification
- **Key Functions**:
  - `handleSendOTP()`: Sends OTP to new email address
  - `handleVerifyPassword()`: Verifies current password from backend data
  - `handleVerifyOTP()`: Verifies OTP for email change

### 5. AccountActions.jsx

- **Purpose**: UI for email OTP and password verification
- **Data Source**: Uses context as fallback when direct data not passed
- **Key Fields**:
  - `password`: Used for password verification
  - `email`: Used as reference for current email

## Data Update Flow

1. User modifies field in CompanyInformation or ContactInformation
2. `onChange` event triggers `onCompanyUpdate` callback
3. Parent component (Settings.jsx) updates `userInformation` state
4. Updated state flows back down to child components
5. On save, authentication modal verifies password
6. Changes are ready to be saved to backend

## Fallback Values Strategy

All data display points use the pattern: `data?.field || "N/A"`

This ensures:

- No undefined/null values displayed to users
- Graceful degradation if backend data is incomplete
- Consistent user experience

## Important Notes

1. **Email Distinction**:
   - `email`: User authentication email (from auth context)
   - `contact_email`: Company contact email (for public display)

2. **Dynamic Fields**:
   - `others`: Object for storing additional contact methods
   - Can be extended with custom fields via AddOtherContactInfo component

3. **Available but Unused Fields**:
   - `industry_type`: Company industry classification
   - `company_description`: Company description
   - `pin_code`: Postal code
   - `street`: Street address
   - These can be added to UI as needed

4. **Password Verification**:
   - Required before saving changes (security measure)
   - Uses backend password field for verification

## Future Enhancements

To add more fields from the backend:

1. Add new field to appropriate component (CompanyInformation or ContactInformation)
2. Use same update pattern: `onChange={onCompanyUpdate}`
3. Set proper fallback: `value={data?.field || "N/A"}`
4. Update this documentation

## Testing Checklist

- [ ] All fields display correctly with backend data
- [ ] Fallback values show when data is missing
- [ ] Updates flow correctly to parent state
- [ ] Password verification works
- [ ] OTP verification works
- [ ] Dynamic contact fields work
- [ ] No console errors
