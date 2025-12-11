# Forgot Password Page Documentation

## Overview

The Forgot Password page allows users to request a password reset link via email. It handles the user input, validation, and communication with the backend API to initiate the password reset process.

## Path

`src/app/auth/forgot-password/page.tsx`

## Type

- **Client Component** (`use client` directive used)

## Key Features

- **Email Input Form**: Users can enter their registered email address.
- **Loading State**: Displays a loading spinner while the request is being processed.
- **Error Handling**: Displays error messages if the request fails (e.g., network error).
- **Success State**: Shows a confirmation view when the reset email is successfully sent.
- **Navigation**: Links back to the Login page.

## Data Flow

1.  **User Input**: User enters email into the form.
2.  **Submission**: Form is submitted via `onSubmit` handler.
3.  **API Call**: A POST request is sent to `/api/auth/forgot-password` with the email address.
4.  **Response Handling**:
    - **Success**: The `success` state is updated, showing the success view.
    - **Error**: The `error` state is updated, showing an alert with the error message.

## Dependencies

- `react`: `useState` hook for state management.
- `next/link`: For navigation links.
- `lucide-react`: Icons (`Loader2`, `ArrowLeft`, `Mail`).
- `framer-motion`: For animations (`motion.div`).
- `@/components/ui`: UI components (`Button`, `Input`, `Label`, `Alert`).

## Error Handling

- Captures errors from the `fetch` request.
- Displays error messages in a destructive `Alert` component.
- Generic fallback error message: "An unknown error occurred".
