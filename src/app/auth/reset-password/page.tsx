"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
      return;
    }

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong");

      setSuccess(result.message);
      event.currentTarget.reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Invalid Token State
  if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-gulzar text-white">Invalid Link</h2>
          <p className="text-zinc-400 max-w-xs mx-auto">
            This password reset link is invalid or has expired.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          <Link href="/auth/forgot-password">Request a new link</Link>
        </Button>
      </motion.div>
    );
  }

  // Success State
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-gulzar text-white">Password Reset</h2>
          <p className="text-zinc-400">
            Your password has been successfully updated.
          </p>
        </div>
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11"
          onClick={() => router.push("/auth/login")}
        >
          Back to Login
        </Button>
      </motion.div>
    );
  }

  // Main Form
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-gulzar text-white tracking-wide">
          Set New Password
        </h1>
        <p className="text-zinc-400">Please enter your new password below.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <Alert
            variant="destructive"
            className="bg-red-500/10 border-red-500/20 text-red-400 text-sm py-2"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label className="text-zinc-400 text-xs uppercase tracking-wider">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              disabled={isLoading}
              className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 text-white h-11 pl-10"
            />
            <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-400 text-xs uppercase tracking-wider">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
              disabled={isLoading}
              className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500 text-white h-11 pl-10"
            />
            <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white h-11 shadow-lg shadow-emerald-900/20 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      <div className="flex justify-center pt-2">
        <Link
          href="/auth/login"
          className="flex items-center text-sm text-zinc-500 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="text-zinc-500 text-center animate-pulse">
          Loading...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}