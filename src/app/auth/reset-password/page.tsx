"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Missing reset token");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSuccess(result.message);
      event.currentTarget.reset();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return (
      <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
        <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Invalid Link</h3>
          <p className="text-zinc-400 text-center max-w-xs">
            This password reset link is invalid or has expired.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/auth/forgot-password">Request a new link</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
      <CardHeader className="space-y-1 flex flex-col items-center text-center pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight text-white">
          Reset Password
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Enter your new password below
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {success ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-lg text-emerald-400">
                Password Reset
              </h3>
              <p className="text-sm text-zinc-400 max-w-xs mx-auto">
                Your password has been successfully reset.
              </p>
            </div>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => router.push("/auth/login")}
            >
              Go to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-500/10 border-red-500/20 text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                New Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                disabled={isLoading}
                className="bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-zinc-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                disabled={isLoading}
                className="bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-500/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )}
      </CardContent>

      {!success && (
        <CardFooter className="flex justify-center pb-6">
          <Link
            href="/auth/login"
            className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
