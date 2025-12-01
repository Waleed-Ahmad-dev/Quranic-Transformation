"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }
    const verify = async () => {
      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setStatus("success");
        setMessage(result.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "Verification failed"
        );
      }
    };
    verify();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8 py-8"
    >
      {status === "loading" && (
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
          <Loader2 className="w-16 h-16 text-emerald-500 animate-spin relative z-10 mx-auto" />
        </div>
      )}

      {status === "success" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 shadow-[0_0_40px_-10px_rgba(239,68,68,0.5)]"
        >
          <XCircle className="w-10 h-10 text-red-500" />
        </motion.div>
      )}

      <div className="space-y-2">
        <h2 className="text-2xl font-gulzar text-white">
          {status === "loading"
            ? "Verifying..."
            : status === "success"
            ? "Verified!"
            : "Error"}
        </h2>
        <p className={status === "error" ? "text-red-400" : "text-zinc-400"}>
          {message}
        </p>
      </div>

      {status !== "loading" && (
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11"
          onClick={() => router.push("/auth/login")}
        >
          Proceed to Login
        </Button>
      )}
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={<div className="text-zinc-500 text-center">Loading...</div>}
    >
      <VerifyEmailContent />
    </Suspense>
  );
}