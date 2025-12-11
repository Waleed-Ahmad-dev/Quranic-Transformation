# Reset Password API Route Documentation

## Overview

The Reset Password API route completes the password recovery flow. It verifies the reset token and updates the user's password in the database.

## Path

`src/app/api/auth/reset-password/route.ts`

## Type

- **API Route** (POST)

## Key Features

- **Token Validation**: Checks existence and expiration of the reset token.
- **User Association**: Links token back to the user.
- **Password Hashing**: Securely hashes the new password.
- **Transactional Update**: Updates password and deletes the token atomically.

## Data Flow

1.  **Request**: POST with `{ token, password }`.
2.  **Validation**: Schema check.
3.  **Token Check**: Find token -> Check Expiry.
4.  **User Check**: ensure user still exists.
5.  **Update**:
    - Hash password.
    - `prisma.$transaction`: Update User password + Delete Token.
6.  **Response**: 200 OK.

## Dependencies

- `prisma`, `bcryptjs`, `zod`.
- `next/server`.

## Error Handling

- **Invalid/Expired Token**: Specific error messages (400).
- **User Not Found**: 404 Error.
