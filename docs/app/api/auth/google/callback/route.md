# Google Callback API Route Documentation

## Overview

The Google Callback route handles the OAuth response from Google. It validates the code, retrieves user info, and creates/updates the user session.

## Path

`src/app/api/auth/google/callback/route.ts`

## Type

- **API Route** (GET)

## Key Features

- **Code Exchange**: Swaps authorization code for access token via `oauth2.googleapis.com`.
- **Profile Retrieval**: Fetches user info from `oauth2/v2/userinfo`.
- **User Upsert**: Creates or updates user record in PostgreSQL.
- **Session Management**: Issues secure HTTP-only cookie.
- **Auto-Verification**: Trusts Google's verified email status.

## Data Flow

1.  **Request**: GET with `code`.
2.  **Exchange**: POST to Google Token Endpoint.
3.  **Profile**: GET Google UserInfo Endpoint.
4.  **Database**: `prisma.user.upsert`.
5.  **Session**: Encrypt JWT -> Set Cookie.
6.  **Redirect**: To `/dashboard`.

## Dependencies

- `prisma`, `next/server`, `next/headers`.
- `@/lib/session`.

## Error Handling

- **Missing Code**: 400 Error.
- **Google API Error**: Throws specific description.
- **Database Error**: Catches failures during upsert.
- **Failure Redirect**: Redirects to `/auth/login?error=GoogleAuthFailed`.
