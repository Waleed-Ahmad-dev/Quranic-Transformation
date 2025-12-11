# Login Page Documentation

## Overview

The Login page provides the interface for users to authenticate into the application. It supports both traditional credentials-based login (Email/Password) and OAuth providers (GitHub, Google).

## Path

`src/app/auth/login/page.tsx`

## Type

- **Client Component** (`use client` directive used)

## Key Features

- **Credentials Login**: Email and password form authentication.
- **OAuth Login**: One-click login with GitHub and Google.
- **Form Validation**: HTML5 validation for required fields and email format.
- **Visual Feedback**: Loading states during form submission and OAuth redirection.
- **Error Display**: Shows authentication errors (e.g., invalid credentials).
- **Navigation**: Links to "Forgot Password" and "Register" pages.

## Data Flow

1.  **Credentials Login**:
    - User submits email/password.
    - `onSubmit` handler sends POST request to `/api/auth/login`.
    - On success, redirects user to `/dashboard` via `router.push`.
    - On failure, sets `error` state to display message.
2.  **OAuth Login**:
    - User clicks GitHub or Google button.
    - `handleOAuthLogin` redirects browser to `/api/auth/{provider}` to start OAuth flow.

## Dependencies

- `react`: `useState` hook.
- `next/link`, `next/navigation`: Routing and navigation.
- `lucide-react`: Icons.
- `framer-motion`: Animations.
- `@/components/ui`: Shared UI components.

## Error Handling

- Catches exceptions during the login API call.
- Displays specific error messages returned by the API or generic fallbacks.
- Uses `Alert` component for visual error reporting.
