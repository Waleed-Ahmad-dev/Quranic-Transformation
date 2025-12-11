# Reset Password Page Documentation

## Overview

The Reset Password page allows users to set a new password after clicking a link sent to their email. It validates the reset token and updates the user's credentials.

## Path

`src/app/auth/reset-password/page.tsx`

## Type

- **Client Component** (`use client` directive used)

## Key Features

- **Token Validation**: Checks for the presence of a `token` query parameter.
- **Password Form**: Fields for "New Password" and "Confirm Password".
- **Match Validation**: Client-side check ensuring both password fields match.
- **Progressive Feedback**: Loading, different Error states (Invalid Link, mismatch), and Success.
- **Suspense Boundary**: Wrapped in `Suspense` because it uses `useSearchParams`.

## Data Flow

1.  **Initialization**: Component retrieves `token` from URL.
2.  **Validation**:
    - If no token, shows "Invalid Link" view.
    - On submit, checks `password === confirmPassword`.
3.  **API Call**: POST to `/api/auth/reset-password` with `{ token, password }`.
4.  **Completion**: On success, shows "Password Reset" confirmation and "Back to Login" button.

## Dependencies

- `react`: `useState`, `Suspense`.
- `next/navigation`: `useSearchParams`, `useRouter`.
- `lucide-react`: Icons.
- `framer-motion`: Animations.
- `@/components/ui`: UI components.

## Error Handling

- **Missing Token**: Specific UI state.
- **Password Mismatch**: Local validation error.
- **API Errors**: Displays server-side errors (e.g., "Token expired").
