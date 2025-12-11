# Register Page Documentation

## Overview

The Register page handles new user account creation. It provides a registration form and options to sign up using OAuth providers.

## Path

`src/app/auth/register/page.tsx`

## Type

- **Client Component** (`use client` directive used)

## Key Features

- **Registration Form**: Collects Name, Email, and Password.
- **Client-side Validation**: Handled by HTML5 attributes and `zod` via API response (indirectly).
- **Success Feedback**: specific view state upon successful registration (email verification prompt).
- **OAuth Integration**: "Sign up with Github/Google".
- **Navigation**: Link to Login page for existing users.

## Data Flow

1.  **Form Submission**: User submits the form.
2.  **API Request**: POST to `/api/auth/register` with user data.
3.  **Result Handling**:
    - **Success**: Sets `success` state message, clears form, shows checkmark view.
    - **Error**: Sets `error` state, displays alert.

## Dependencies

- `react`, `next/link`, `next/navigation`
- `lucide-react`: Icons (`Loader2`, `Github`, `CheckCircle2`, `ArrowRight`).
- `framer-motion`: Page transitions.
- `@/components/ui`: UI Building blocks.

## Error Handling

- Displays error messages from the server (e.g., "Email already in use").
- Handles network/unknown errors gracefully.
