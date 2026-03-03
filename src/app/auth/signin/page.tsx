"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Eye, EyeOff, Loader2, CheckCircle, AlertTriangle, Mail } from "lucide-react";
import Link from "next/link";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check URL parameters for verification status
    const verified = searchParams.get('verified');
    const error = searchParams.get('error');

    if (verified === 'true') {
      setError(""); // Clear any existing errors
      // You could show a success message here if needed
    }

    if (error) {
      switch (error) {
        case 'missing_token':
          setError("Verificatie token ontbreekt");
          break;
        case 'invalid_token':
          setError("Verificatie token is ongeldig of verlopen");
          break;
        case 'verification_failed':
          setError("Email verificatie is mislukt. Probeer het opnieuw.");
          break;
        default:
          setError("Er is iets misgegaan tijdens de verificatie");
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Check if this is an email verification error
        if (result.error.includes("verification") || result.error.includes("email")) {
          setVerificationSent(true);
          setError(""); // Clear error since we're showing verification message
        } else {
          setError("Ongeldige inloggegevens");
        }
      } else {
        // Refresh session and redirect
        await getSession();
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Er is iets misgegaan tijdens het inloggen");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">GenPostAI</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Welkom terug</h1>
          <p className="text-gray-600 mt-2">Log in op je account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inloggen</CardTitle>
            <CardDescription>
              Voer je email en wachtwoord in om door te gaan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {verificationSent && (
              <Alert className="border-blue-200 bg-blue-50">
                <Mail className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Email verificatie verzonden!</strong><br />
                  We hebben een verificatie email gestuurd naar <strong>{email}</strong>.
                  Klik op de link in de email om je account te activeren.
                </AlertDescription>
              </Alert>
            )}

            {searchParams.get('verified') === 'true' && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Email succesvol geverifieerd!</strong><br />
                  Je kunt nu inloggen met je account.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jouw@email.nl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Wachtwoord</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Je wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Inloggen
              </Button>
            </form>


            <div className="text-center text-sm text-gray-600">
              Nog geen account?{" "}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Registreer je hier
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}