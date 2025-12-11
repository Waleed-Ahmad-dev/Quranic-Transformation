# Login API Route Documentation

## Overview

The Login API route handles user authentication using email and password. It validates credentials, verifies email status, and issues a secure session cookie.

## Path

`src/app/api/auth/login/route.ts`

## Type

- **API Route** (POST)

## Key Features

- **Input Validation**: Validates email format and password presence using Zod.
- **User Verification**: Checks if user exists and verifies password hash using bcrypt.
- **Email Verification Check**: Enforces email verification before allowing login.
- **Session Management**: Creates a JWT session containing user ID, email, and role.
- **Cookie Security**: Sets an HTTP-only, secure cookie with the session token.

## Data Flow

1.  **Request**: POST request with `{ email, password }`.
2.  **Validation**: `LoginSchema` checks input format.
3.  **Database Query**: Finds user by email in PostgreSQL via Prisma.
4.  **Checks**:
    - User existence.
    - Password match (`bcrypt.compare`).
    - Email verification status (`emailVerified` field).
5.  **Token Generation**: Encrypts session data into a JWT.
6.  **Response**: Returns 200 OK with user data and sets `session` cookie.

## Dependencies

- `next/server`, `next/headers`.
- `@/lib/prisma`: Database client.
- `@/lib/session`: JWT encryption.
- `bcryptjs`: Password hashing.
- `zod`: Schema validation.

## Error Handling

- **400 Bad Request**: Invalid inputs.
- **401 Unauthorized**: Invalid credentials.
- **403 Forbidden**: Email not verified.
- **500 Internal Server Error**: Database or server errors.
