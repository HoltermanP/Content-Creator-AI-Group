"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  CheckCircle,
  Calendar,
  TrendingUp,
  Plus,
  BarChart3,
  Building,
  Shield
} from "lucide-react";
import Link from "next/link";
import WorkflowHeader from "@/components/WorkflowHeader";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardParticles, setDashboardParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);

  // Generate particles only on client-side to prevent hydration mismatch
  useEffect(() => {
    const particleArray = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3000}ms`,
      duration: `${2000 + Math.random() * 2000}ms`
    }));
    setDashboardParticles(particleArray);
  }, []);

  useEffect(() => {
    if (status === "loading" || !session) return;

    const currentName = session.user?.name ?? null;
    setDisplayName(currentName);
    setNameDraft(currentName ?? "");
  }, [session, status]);

  const handleSaveName = async () => {
    const trimmed = nameDraft.trim();
    if (!trimmed) return;

    setIsSavingName(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: trimmed })
      });

      if (response.ok) {
        setDisplayName(trimmed);
      } else {
        console.error("Naam opslaan mislukt");
      }
    } catch (error) {
      console.error("Fout bij opslaan van naam:", error);
    } finally {
      setIsSavingName(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p>Dashboard laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/6 to-blue-400/6 rounded-full blur-3xl animate-float animation-delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {dashboardParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>

      <WorkflowHeader />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welkom terug, {displayName || session?.user?.name || "Gebruiker"}!
          </h1>
          <p className="text-gray-600">
            Hier is een overzicht van je LinkedIn content activiteit
          </p>
        </div>

        {/* Naam instellen voor persoonlijke begroeting */}
        {!displayName && !session?.user?.name && (
          <div className="mb-8 max-w-md">
            <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/70 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Hoe mogen we je noemen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Vul je naam in zodat we je overal in GenPostAI persoonlijk kunnen begroeten.
                </p>
                <div className="flex gap-3">
                  <Input
                    placeholder="Bijvoorbeeld: Jan"
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                  />
                  <Button
                    onClick={handleSaveName}
                    disabled={isSavingName || !nameDraft.trim()}
                  >
                    {isSavingName ? "Opslaan..." : "Opslaan"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Totaal Posts</CardTitle>
                <MessageSquare className="h-5 w-5 text-white/90" />
              </CardHeader>
            </div>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-600 mt-1">Nog geen posts gemaakt</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Gepubliceerd</CardTitle>
                <CheckCircle className="h-5 w-5 text-white/90" />
              </CardHeader>
            </div>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-600 mt-1">Nog geen posts gepubliceerd</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Gepland</CardTitle>
                <Calendar className="h-5 w-5 text-white/90" />
              </CardHeader>
            </div>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-600 mt-1">Nog geen posts gepland</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Credits</CardTitle>
                <TrendingUp className="h-5 w-5 text-white/90" />
              </CardHeader>
            </div>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900">50</div>
              <p className="text-xs text-gray-600 mt-1">Welkomstbonus credits</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 p-6 text-white">
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Recente Posts</CardTitle>
                    <Link href="/dashboard/posts">
                      <Button variant="outline" size="sm" className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white">
                        Alle posts bekijken
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </div>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Nog geen posts gemaakt</p>
                  <Link href="/dashboard/posts/new">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Maak je eerste post
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <CardHeader className="p-0">
                  <CardTitle className="text-white">Snel aan de slag</CardTitle>
                </CardHeader>
              </div>
              <CardContent className="space-y-3">
                <Link href="/dashboard/posts/new">
                  <Button className="w-full" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Nieuwe post maken
                  </Button>
                </Link>
                <Link href="/dashboard/calendar">
                  <Button variant="outline" className="w-full" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Content kalender bekijken
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <CardHeader className="p-0">
                  <CardTitle className="text-white">Bedrijven</CardTitle>
                </CardHeader>
              </div>
              <CardContent>
                <div className="text-center py-8">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Nog geen bedrijven toegevoegd</p>
                  <Link href="/dashboard/companies">
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Voeg bedrijf toe
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {(session?.user as { isBigBrother?: boolean })?.isBigBrother && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-amber-200">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
                  <CardHeader className="p-0">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Big Brother
                    </CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="pt-4">
                  <p className="text-gray-600 text-sm mb-3">Inzichten over gebruikers, rollen, credits en gebruik.</p>
                  <Link href="/dashboard/admin">
                    <Button variant="outline" className="w-full" size="sm">
                      <Shield className="mr-2 h-4 w-4" />
                      Naar Big Brother
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}