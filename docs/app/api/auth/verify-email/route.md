# Verify Email API Route Documentation

## Overview

The Verify Email API route confirms the user's email address using a valid verification token.

## Path

`src/app/api/auth/verify-email/route.ts`

## Type

- **API Route** (POST)

## Key Features

- **Token Validation**: Verifies token existence and expiration.
- **User Update**: Marks `emailVerified` with current timestamp.
- **Email Update**: Updates user's email address if the token was associated with an email change.
- **Cleanup**: Deletes the used token.

## Data Flow

1.  **Request**: POST with `{ token }`.
2.  **Validation**: Check token presence.
3.  **Token Lookup**: Find in DB.
4.  **Expiry Check**: Compare token expiry with current time.
5.  **Action**:
    - Update User (`emailVerified = now()`, `email = token.email`).
    - Delete Token.
6.  **Response**: 200 OK.

## Dependencies

- `prisma`, `next/server`.

## Error Handling

- **Missing/Invalid/Expired Token**: Returns 400 or 404 errors.
- **User Not Found**: 404 Error.
