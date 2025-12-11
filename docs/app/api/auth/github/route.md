# GitHub Auth API Route Documentation

## Overview

The GitHub Auth route initiates the OAuth 2.0 authentication flow with GitHub. It constructs the authorization URL and redirects the user to GitHub to grant permissions.

## Path

`src/app/api/auth/github/route.ts`

## Type

- **API Route** (GET)

## Key Features

- **OAuth Initialization**: Builds the standard OAuth 2.0 authorization URL.
- **Scope Management**: Requests `user:email` scope to ensure we get an email address.
- **Redirect**: Sends user to GitHub's login page.

## Data Flow

1.  **Request**: GET request.
2.  **Action**: Construct `https://github.com/login/oauth/authorize` URL with `client_id` and `redirect_uri`.
3.  **Response**: 307 Temporary Redirect to GitHub.

## Dependencies

- `next/server`.
- Environment Variables: `GITHUB_CLIENT_ID`, `NEXT_PUBLIC_APP_URL`.

## Error Handling

- None required at this stage; errors happen at the callback or provider level.
