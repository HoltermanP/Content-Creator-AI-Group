"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

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

  useEffect(() => {
    if (status === "loading" || !session) return;

    // TODO: Fetch actual user progress from API
    // For now, simulate based on user state
    const hasCompanies = false; // This would be fetched from API
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
        title: "Eerste Post",
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

  return (
    <header className="border-b border-white/20 bg-white/10 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/5">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link href={backHref}>
                <Button variant="outline" size="sm" className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/15 text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Terug
                </Button>
              </Link>
            )}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  GenPostAI
                </span>
                <Badge variant="secondary" className="text-xs w-fit bg-white/20 text-white border-white/20">AI-group.nl</Badge>
              </div>
            </Link>
            {currentPage && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600 capitalize">{currentPage}</span>
              </>
            )}
            {isNewUser && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Onboarding
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/15 text-white">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
              <Avatar className="h-8 w-8 border-2 border-white/30">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-white/20 text-white">
                  {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-white">{session?.user?.name || "Gebruiker"}</span>
            </div>
          </div>
        </div>

        {/* Workflow Progress Bar */}
        {isNewUser && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200/50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">🚀 Account Instellen</h3>
                  <p className="text-xs text-gray-600">Voltooi deze stappen om optimaal gebruik te maken van GenPostAI</p>
                </div>
                <Badge variant="outline" className="bg-white/80 text-blue-700 border-blue-300">
                  {completedSteps} / {workflowSteps.length} klaar
                </Badge>
              </div>
              <Progress value={progress} className="h-3 bg-white/50" />
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-gray-600">
                  {completedSteps === 0
                    ? "Begin met je eerste stap!"
                    : completedSteps === workflowSteps.length
                    ? "🎉 Gefeliciteerd! Je account is klaar voor gebruik."
                    : `${workflowSteps.length - completedSteps} stappen te gaan`}
                </span>
                <span className="text-blue-600 font-medium">{Math.round(progress)}% compleet</span>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Steps - Always visible for better guidance */}
        {true && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              {completedSteps === workflowSteps.length
                ? "✅ Account volledig ingesteld"
                : "📋 Volgende stappen om te voltooien:"}
            </h4>
            <div className="flex items-center justify-between">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <Link href={step.href}>
                    <div className={`px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                      step.completed
                        ? 'bg-green-50 backdrop-blur-sm text-green-800 hover:bg-green-100 border border-green-200'
                        : currentPage === step.id
                        ? 'bg-blue-50 backdrop-blur-sm text-blue-800 border border-blue-200 shadow-lg shadow-blue-500/20'
                        : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-white/30'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                          step.completed
                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                            : currentPage === step.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-pulse'
                            : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                        }`}>
                          {step.completed ? '✓' : index + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${
                            step.completed
                              ? 'text-green-800'
                              : currentPage === step.id
                              ? 'text-blue-800'
                              : 'text-gray-800'
                          }`}>{step.title}</span>
                          <p className={`text-xs leading-tight mt-0.5 ${
                            step.completed
                              ? 'text-green-700'
                              : currentPage === step.id
                              ? 'text-blue-700'
                              : 'text-gray-600'
                          }`}>{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {index < workflowSteps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 rounded-full ${
                      step.completed ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-gray-300 to-gray-400'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            {completedSteps < workflowSteps.length && (
              <p className="text-xs text-gray-500 mt-3 text-center">
                Klik op een stap om direct daarheen te gaan
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}