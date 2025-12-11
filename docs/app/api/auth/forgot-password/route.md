# Forgot Password API Route Documentation

## Overview

The Forgot Password API route initiates the password reset process by finding the user and sending a reset token via email.

## Path

`src/app/api/auth/forgot-password/route.ts`

## Type

- **API Route** (POST)

## Key Features

- **User Lookup**: specific check for registered email.
- **Security**: Returns 200 OK even if the email doesn't exist to prevent email enumeration attacks.
- **Token Generation**: Creates a temporal password reset token.
- **Email Dispatch**: Sends the token via a formatted email.

## Data Flow

1.  **Request**: POST request with `{ email }`.
2.  **Validation**: Zod schema check.
3.  **User Check**: Queries database.
4.  **Handling**:
    - If user doesn't exist -> Return success message (fake).
    - If user exists -> Generate token -> Send Email -> Return success.

## Dependencies

- `zod`, `prisma`, `next/server`.
- `@/lib/tokens`.
- `@/lib/mail`.

## Error Handling

- **Security**: Masking user existence status.
- **Internal Errors**: Generic 500 response.
