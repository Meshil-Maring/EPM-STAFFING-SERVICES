# Signin Form

**POST URL:** `/api/auth/signin`

## Form Fields

| Field Name | Type     | Required | Description                             |
| ---------- | -------- | -------- | --------------------------------------- |
| email      | Email    | Yes      | User's email address for authentication |
| password   | Password | Yes      | User password (hidden input field)      |

## Authentication Process

1. **Form Submission**: User enters email and password
2. **Validation**: Frontend validates email format and password presence
3. **API Request**: POST request sent to `/api/auth/signin`
4. **Server Processing**: Backend verifies credentials against database
5. **Session Creation**: Successful login creates user session
6. **Redirect**: User redirected to dashboard or appropriate page

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **Session Management**: User sessions managed via express-session
- **Input Validation**: Email format validation and required field checks
- **Error Handling**: Graceful error messages for invalid credentials

## Error Responses

- **400 Bad Request**: Invalid email format or missing fields
- **401 Unauthorized**: Invalid email or password
- **500 Internal Server Error**: Server-side processing errors

## Success Response

- **200 OK**: Authentication successful
- **Session Cookie**: User session established
- **Redirect**: User redirected to protected area
