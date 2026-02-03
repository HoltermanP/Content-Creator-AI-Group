"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, ArrowLeft, Home, LogOut, Settings, Eye } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  href: string;
}

interface WorkflowHeaderProps {
  currentPage?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function WorkflowHeader({
  currentPage,
  showBackButton = false,
  backHref = "/dashboard"
}: WorkflowHeaderProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [liveCredits, setLiveCredits] = useState<{ creditsRemaining?: number; subscriptionPlan?: string } | null>(null);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) return;
    fetch("/api/user/credits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setLiveCredits({ creditsRemaining: data.creditsRemaining, subscriptionPlan: data.subscriptionPlan }))
      .catch(() => {});
  }, [status, session?.user?.email]);

  useEffect(() => {
    if (status === "loading" || !session) return;

    // TODO: Fetch actual user progress from API
    // Voor nu gebruiken we een combinatie van (toekomstige) API-data en lokale flags
    const hasCompaniesFromLocalStorage =
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined" &&
      window.localStorage.getItem("onboarding_company_completed") === "true";

    // Deze waarden zouden uiteindelijk uit de database/API moeten komen
    const hasCompanies = hasCompaniesFromLocalStorage;
    const hasPosts = false; // This would be fetched from API
    const hasScheduledPosts = false; // This would be fetched from API
    const hasAnalytics = false; // This would be fetched from API

    setWorkflowSteps([
      {
        id: "company",
        title: "Bedrijf",
        description: "Voeg je bedrijf toe zodat AI je content kan personaliseren",
        completed: hasCompanies,
        href: "/dashboard/companies"
      },
      {
        id: "post",
        title: "Nieuwe Post",
        description: "Maak je eerste LinkedIn post met slimme AI hulp",
        completed: hasPosts,
        href: "/dashboard/posts/new"
      },
      {
        id: "schedule",
        title: "Planning",
        description: "Stel een content schema op voor regelmatige posts",
        completed: hasScheduledPosts,
        href: "/dashboard/calendar"
      },
      {
        id: "analytics",
        title: "Analytics",
        description: "Leer van je prestaties en verbeter je strategie",
        completed: hasAnalytics,
        href: "/dashboard/analytics"
      }
    ]);
  }, [session, status]);

  if (status === "loading") {
    return (
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  const completedSteps = workflowSteps.filter(step => step.completed).length;
  const progress = workflowSteps.length > 0 ? (completedSteps / workflowSteps.length) * 100 : 0;
  const isNewUser = completedSteps === 0;

  // Abonnement + credits: actueel uit API, anders uit sessie
  const subscriptionPlan = (liveCredits?.subscriptionPlan ?? (session?.user as { subscriptionPlan?: string } | undefined)?.subscriptionPlan) ?? "FREE";
  const creditsRemaining = liveCredits?.creditsRemaining ?? (session?.user as { creditsRemaining?: number } | undefined)?.creditsRemaining;

  const planLabel =
    subscriptionPlan === "ULTIMATE"
      ? "Ultimate"
      : subscriptionPlan === "PREMIUM"
      ? "Premium"
      : subscriptionPlan === "PLUS"
      ? "Plus"
      : "Free";
  const planClass =
    subscriptionPlan === "ULTIMATE"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : subscriptionPlan === "PREMIUM"
      ? "bg-purple-100 text-purple-800 border-purple-200"
      : subscriptionPlan === "PLUS"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-gray-100 text-gray-700 border-gray-200";

  // Eenvoudige berekening: aanvulling op de eerste van de volgende maand
  const nextRefillLabel = (() => {
    const now = new Date();
    const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const month = (now.getMonth() + 1) % 12;
    const nextFirst = new Date(year, month, 1);
    try {
      return nextFirst.toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch {
      // fallback, mocht locale niet werken
      const d = String(nextFirst.getDate()).padStart(2, "0");
      const m = String(nextFirst.getMonth() + 1).padStart(2, "0");
      const y = nextFirst.getFullYear();
      return `${d}-${m}-${y}`;
    }
  })();

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/5">
      <div className="container mx-auto px-4 py-3">
        {/* Top Bar: logo, account-progress, nav */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
            {showBackButton && (
              <Link href={backHref}>
                <Button variant="outline" size="sm" className="border-gray-300 bg-white hover:bg-gray-50 text-gray-800 shrink-0">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Terug
                </Button>
              </Link>
            )}
            <Link href="/dashboard" className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-lg flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
                  </div>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                  GenPostAI
                </span>
                <Badge variant="secondary" className="text-xs w-fit bg-gray-100 text-gray-700 border-gray-200">AI-group.nl</Badge>
              </div>
            </Link>
            {currentPage && (
              <>
                <span className="text-gray-400 shrink-0">/</span>
                <span className="text-gray-600 capitalize text-sm sm:text-base truncate">{currentPage}</span>
              </>
            )}
          </div>

          {/* Account progress geïntegreerd in de balk */}
          {completedSteps < workflowSteps.length && (
            <div className="flex items-center gap-3 py-1 px-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">🚀 Account</span>
                <Badge variant="outline" className="bg-white/80 text-blue-700 border-blue-300 text-xs shrink-0">
                  {completedSteps}/{workflowSteps.length}
                </Badge>
              </div>
              <div className="w-20 sm:w-24 h-2 rounded-full bg-white/60 overflow-hidden shrink-0">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-blue-600 font-medium whitespace-nowrap shrink-0">{Math.round(progress)}%</span>
            </div>
          )}

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-medium"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            {/* Abonnement + credits altijd zichtbaar in de header */}
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-1.5">
              <Badge variant="secondary" className={planClass}>
                {planLabel}
              </Badge>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                {typeof creditsRemaining === "number" ? (
                  <>{creditsRemaining} credits</>
                ) : (
                  <>— credits</>
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center space-x-2 bg-gray-100 rounded-full pl-1 pr-3 py-1.5 border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    <Avatar className="h-8 w-8 border-2 border-gray-200">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-gray-200 text-gray-700 font-medium">
                        {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-800 max-w-[140px] truncate">
                      {session?.user?.name || session?.user?.email || "Gebruiker"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-gray-900">
                        {session?.user?.name || "Gebruiker"}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {session?.user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 pb-1 pt-1.5 text-xs text-gray-600 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Abonnement</span>
                      <Badge variant="secondary" className={planClass}>
                        {planLabel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Credits</span>
                      <span className="font-medium text-gray-800">
                        {typeof creditsRemaining === "number"
                          ? `${creditsRemaining} · aanvulling ${nextRefillLabel}`
                          : `— · aanvulling ${nextRefillLabel}`}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {(session?.user as { isBigBrother?: boolean })?.isBigBrother && (
                    <>
                      <Link href="/dashboard/admin">
                        <DropdownMenuItem inset>
                          <Eye className="h-4 w-4" />
                          <span>Big Brother</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <Link href="/dashboard/account">
                    <DropdownMenuItem inset>
                      <Settings className="h-4 w-4" />
                      <span>Account instellingen</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    inset
                    variant="destructive"
                    onSelect={(event) => {
                      event.preventDefault();
                      signOut({ callbackUrl: "/auth/signin" });
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Uitloggen</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Workflow Steps - compacte rij onder de balk */}
        {true && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="flex items-center shrink-0">
                  <Link href={step.href}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:opacity-90 ${
                      step.completed
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : currentPage === step.id
                        ? "bg-blue-50 text-blue-800 border border-blue-200"
                        : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : currentPage === step.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}>
                        {step.completed ? "✓" : index + 1}
                      </div>
                      <span className="text-xs font-medium whitespace-nowrap">{step.title}</span>
                    </div>
                  </Link>
                  {index < workflowSteps.length - 1 && (
                    <div className={`w-4 sm:w-6 h-0.5 mx-0.5 sm:mx-1 rounded-full shrink-0 ${
                      step.completed ? "bg-green-400" : "bg-gray-300"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            {completedSteps < workflowSteps.length && (
              <p className="text-xs text-gray-500 mt-1.5 text-center">
                Klik op een stap om daarheen te gaan
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}