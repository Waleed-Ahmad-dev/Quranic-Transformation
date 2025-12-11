# Verify Email Page Documentation

## Overview

The Verify Email page handles the confirmation of a user's email address using a token from the verification link. It automatically attempts verification upon loading.

## Path

`src/app/auth/verify-email/page.tsx`

## Type

- **Client Component** (`use client` directive used)

## Key Features

- **Automatic Verification**: Triggers `useEffect` on mount to verify token.
- **Status States**: `loading` (spinner), `success` (checkmark), `error` (X icon).
- **Feedback**: Dynamic message display based on verification result.
- **Suspense Boundary**: Wrapped in `Suspense` for `useSearchParams` usage.

## Data Flow

1.  **Mount**: Component reads `token` from URL query params.
2.  **Effect**:
    - If token missing -> Set status `error`.
    - If token present -> POST `/api/auth/verify-email` with `{ token }`.
3.  **Result**:
    - Updates status to `success` or `error` based on API response.
    - Updates message content from server response.

## Dependencies

- `react`, `next/navigation`.
- `lucide-react`.
- `framer-motion`.
- `@/components/ui`.

## Error Handling

- Handles missing token gracefully.
- Catches fetch errors and displays user-friendly messages.
