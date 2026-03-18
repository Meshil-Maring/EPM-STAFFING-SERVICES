# Account Creation Process

## Multi-Step Registration Flow

The account creation process is implemented as a multi-step form that guides users through the company registration process.

### Step 1: Company Information

**URL:** `/auth/signup_form` (index)

**Form Fields:**

- **Company Name** (Text) - Legal name of the company
- **Industry Type** (Text) - Primary business sector
- **Registration Number** (Text) - Company registration/registration number
- **Description** (Textarea) - Company overview and description

### Step 2: Contact Information

**URL:** `/auth/signup_form/contact_information`

**Form Fields:**

- **Mobile Number** (Phone) - Primary contact number
- **Contact Information** (Array) - Additional contact details
  - Contact person name
  - Contact email
  - Contact phone number
  - Contact role/position

### Step 3: Address Information

**URL:** `/auth/signup_form/address_information`

**Form Fields:**

- **Address** (Textarea) - Complete business address
- **City** (Text) - City name
- **State** (Text) - State or province
- **Pin Code** (Text) - Postal/ZIP code

### Step 4: Account Credentials

**URL:** `/auth/signup_form/account_credentials`

**Form Fields:**

- **Email** (Email) - Company email address for login
- **Password** (Password) - Secure password (hidden input)
- **Confirm Password** (Password) - Password confirmation
- **Terms Agreement** (Checkbox) - Acceptance of terms and conditions

## Registration Process Flow

1. **Form Initialization**: Context provider manages multi-step state
2. **Step-by-Step Validation**: Each step validates before proceeding
3. **Data Persistence**: Form data saved to sessionStorage between steps
4. **OTP Verification**: Email verification via OTP system
5. **Account Creation**: Final step creates user account in database

## Technical Implementation

### State Management

- **SignupFormContext**: Manages form data across steps
- **Session Storage**: Persists data during multi-step process
- **Validation**: Client-side validation for each step

### Security Features

- **Password Hashing**: bcrypt for secure password storage
- **Email Verification**: OTP-based email confirmation
- **Input Validation**: Comprehensive validation rules
- **Session Management**: Secure session handling

### Error Handling

- **Validation Errors**: Clear error messages for invalid inputs
- **Network Errors**: Graceful handling of API failures
- **OTP Errors**: Specific handling for OTP-related issues
- **User Feedback**: Toast notifications for all operations

## API Integration

### User Creation

- **Endpoint**: `POST /api/users`
- **Data**: Complete company and user information
- **Response**: Success message with user ID and email
- **Session**: Automatic session creation on successful registration

### OTP System

- **Send OTP**: `POST /auth/send-otp`
- **Verify OTP**: `POST /auth/verify-otp`
- **Resend OTP**: `POST /auth/resend-otp`
- **Expiration**: 5-minute OTP validity period

## User Experience

### Progress Indicators

- Visual progress bar showing current step
- Step navigation with clear labels
- Back/Next navigation buttons

### Form Validation

- Real-time validation feedback
- Required field indicators
- Password strength requirements
- Email format validation

### Accessibility

- Keyboard navigation support
- Screen reader compatibility
- Clear form labels and instructions
- Error message accessibility

## Success Flow

1. **Form Completion**: All steps completed successfully
2. **OTP Verification**: Email verification completed
3. **Account Creation**: User account created in database
4. **Session Setup**: User session established
5. **Redirect**: Automatic redirect to dashboard
6. **Welcome**: Success message and next steps guidance
