# Google Auth API Route Documentation

## Overview

The Google Auth route initiates the OAuth 2.0 authentication flow with Google.

## Path

`src/app/api/auth/google/route.ts`

## Type

- **API Route** (GET)

## Key Features

- **OAuth Initialization**: Redirects to Google's consent screen.
- **Scopes**: Requests `openid`, `email`, and `profile`.
- **Offline Access**: Requests `access_type: "offline"` (though refresh tokens aren't currently stored).
- **Prompt**: Forces `consent` prompt to ensure account selection.

## Data Flow

1.  **Request**: GET request.
2.  **Action**: Construct `https://accounts.google.com/o/oauth2/v2/auth` URL.
3.  **Response**: 307 Temporary Redirect to Google.

## Dependencies

- `next/server`.
- Environment Variables: `GOOGLE_CLIENT_ID`, `GOOGLE_REDIRECT_URI`.

## Error Handling

- None required at this stage.
