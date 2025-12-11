# Resend Verification API Route Documentation

## Overview

The Resend Verification API route allows users to request a new email verification link if the previous one expired or was lost.

## Path

`src/app/api/auth/resend/route.ts`

## Type

- **API Route** (POST)

## Key Features

- **Idempotency**: Checks if the user is already verified before sending a new token.
- **Token Refresh**: Generates a fresh verification token.
- **Security**: Masks user existence (returns 200 even if user not found).

## Data Flow

1.  **Request**: POST with `{ email }`.
2.  **Validation**: Zod check.
3.  **User Check**:
    - If not found -> Return generic success message.
    - If verified -> Return 400 Bad Request ("Email is already verified").
4.  **Action**: Generate new token -> Send Email.
5.  **Response**: 200 OK.

## Dependencies

- `prisma`, `zod`, `next/server`.
- `@/lib/tokens`, `@/lib/mail`.

## Error Handling

- **Already Verified**: Explicit error.
- **User Not Found**: Silent success (security).
