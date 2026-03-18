# API Routes Documentation

## Main Application Routes

### Public Routes

- **Home** | `/home` - Landing page with application overview
- **Signin** | `/auth/signin` - User authentication page

### Authentication Routes

- **Signup Form** | `/auth/signup_form` - Multi-step registration process
  - Company Information | `/auth/signup_form` (index)
  - Contact Information | `/auth/signup_form/contact_information`
  - Address Information | `/auth/signup_form/address_information`
  - Account Credentials | `/auth/signup_form/account_credentials`

### Protected Routes (Require Authentication)

- **Dashboard** | `/client/dashboard` - Main application dashboard
  - Jobs | `/client/dashboard` (index) - Job management interface
  - Offer Released | `/client/dashboard/offer_released` - Offer management
  - Interview Pipeline | `/client/dashboard/interview_pipeline` - Candidate tracking
  - Settings | `/client/dashboard/settings` - User/company settings

### Admin Routes (Require Admin Privileges)

- **Admin Management** | `/admin/management` - Administrative interface
  - Content Apps View | `/admin/management` (index)
  - Submitted Candidates | `/admin/management/submitted_candidates`
  - Admin Company Overview | `/admin/management/admin_company_overview`
  - Admin Settings | `/admin/management/admin_settings`

### API Endpoints

#### User Management (`/api`)

- **GET** `/users` - Retrieve all users
- **GET** `/users/:id` - Retrieve specific user by ID
- **POST** `/users` - Create new user account

#### Authentication (`/auth`)

- **POST** `/auth/send-otp` - Send OTP to user's email
- **POST** `/auth/verify-otp` - Verify OTP code
- **POST** `/auth/resend-otp` - Resend OTP

### Catch-All Route

- **404 Page** | `*` - Handles invalid routes with custom error page

## Route Protection

- **Public Routes**: Accessible without authentication
- **Protected Routes**: Require valid user session (company users)
- **Admin Routes**: Require admin privileges and authentication

## URL Structure

All routes follow a consistent pattern:

- Public: `/` (root level)
- Authentication: `/auth/*`
- Client Dashboard: `/client/dashboard/*`
- Admin Panel: `/admin/management/*`
- API: `/api/*`
