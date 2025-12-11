# Logout API Route Documentation

## Overview

The Logout API route terminates the user's session by deleting the session cookie.

## Path

`src/app/api/auth/logout/route.ts`

## Type

- **API Route** (POST)

## Key Features

- **Session Termination**: Removes the `session` cookie from the user's browser.

## Data Flow

1.  **Request**: POST request (no body required).
2.  **Action**: Accesses `cookies()` store and calls `.delete("session")`.
3.  **Response**: Returns 200 OK `{ success: true }`.

## Dependencies

- `next/server`, `next/headers`.

## Error Handling

- Minimal error handling needed as cookie deletion is generally safe.
