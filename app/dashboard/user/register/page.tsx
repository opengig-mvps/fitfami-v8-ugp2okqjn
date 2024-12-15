"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircleIcon } from "lucide-react";

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        setError(result?.error);
      } else {
        // Redirect to the dashboard
        window.location.href = "/dashboard/user";
      }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {error && (
          <Alert className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircleIcon className="animate-spin mr-2" />
              Signing in...
            </>
          ) : (
            "Sign in with Google"
          )}
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;