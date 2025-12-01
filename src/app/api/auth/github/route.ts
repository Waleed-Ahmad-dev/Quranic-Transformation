import { NextResponse } from "next/server";

export async function GET() {
     const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";

     const params = new URLSearchParams({
          client_id: process.env.GITHUB_CLIENT_ID!,
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
          scope: "user:email", // Request email access
     });

     return NextResponse.redirect(`${GITHUB_AUTH_URL}?${params.toString()}`);
}