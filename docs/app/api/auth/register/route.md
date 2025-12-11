# Register API Route Documentation

## Overview

The Register API route handles the creation of new user accounts. It validates input, hashes passwords, creates the user record, and sends a verification email.

## Path

`src/app/api/auth/register/route.ts`

## Type

- **API Route** (POST)

## Key Features

- **Input Validation**: Enforces email format, minimum password length (6), and name.
- **Duplicate Check**: Prevents registration with an existing email address.
- **Security**: Hashes passwords using bcrypt before storage.
- **Verification Flow**: Generates a unique token and triggers a verification email.

## Data Flow

1.  **Request**: POST request with `{ email, password, name }`.
2.  **Validation**: Zod schema check.
3.  **Duplicate Check**: Queries database for existing user.
4.  **Creation**:
    - Hashes password.
    - Creates new User record in database.
5.  **Verification**:
    - Generates verification token (stored in DB).
    - Sends email via `@/lib/mail`.
6.  **Response**: Returns 201 Created.

## Dependencies

- `bcryptjs`: Password hashing.
- `@/lib/tokens`: Token generation logic.
- `@/lib/mail`: Email sending service.
- `prisma`, `zod`, `next/server`.

## Error Handling

- **400 Bad Request**: Validation failure (returns detailed Zod error format).
- **409 Conflict**: Email already registered.
- **500 Internal Server Error**: Unexpected failures.
