# GitHub Callback API Route Documentation

## Overview

The GitHub Callback route handles the response from GitHub after the user authorizes the app. It exchanges the code for an access token, fetches the user's profile, and manages their session.

## Path

`src/app/api/auth/github/callback/route.ts`

## Type

- **API Route** (GET)

## Key Features

- **Token Exchange**: Swaps the temporary authorization `code` for an `access_token`.
- **User Profile Fetch**: Retrieves public profile and email addresses from GitHub API.
- **User Sync**: Upserts (Create or Update) the user in the database based on email.
- **Auto-Verification**: Automatically marks GitHub-provided emails as verified.
- **Session Creation**: Logs the user in by creating a session cookie.

## Data Flow

1.  **Request**: GET with `code`.
2.  **Validation**: Ensure `code` exists.
3.  **Exchange**: POST to `github.com/login/oauth/access_token`.
4.  **Profile**: GET `api.github.com/user` & `api.github.com/user/emails`.
5.  **Database**: `prisma.user.upsert` using email as key.
6.  **Login**: Encrypt session JWT -> Set Cookie.
7.  **Redirect**: Send user to `/dashboard`.

## Dependencies

- `prisma`, `next/server`, `next/headers`.
- `@/lib/session`.

## Error Handling

- **Missing Code**: 400 Bad Request.
- **GitHub API Errors**: Catches upstream errors.
- **No Email**: Throws error if GitHub doesn't provide an email.
- **Failure Redirect**: Redirects to `/auth/login?error=GithubAuthFailed` on exception.
