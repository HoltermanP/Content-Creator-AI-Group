"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Users, RefreshCw, CreditCard, UserCheck, BarChart3 } from "lucide-react";
import Link from "next/link";
import WorkflowHeader from "@/components/WorkflowHeader";

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: string;
  creditsRemaining: number;
  plan: string;
  creditsLimit: number;
  creditsUsed: number;
}

function planBadge(plan: string) {
  switch (plan) {
    case "ULTIMATE":
      return <Badge className="bg-amber-600">Ultimate</Badge>;
    case "PREMIUM":
      return <Badge className="bg-purple-600">Premium</Badge>;
    case "PLUS":
      return <Badge className="bg-blue-600">Plus</Badge>;
    default:
      return <Badge variant="secondary">Free</Badge>;
  }
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isBigBrother = (session?.user as { isBigBrother?: boolean })?.isBigBrother;

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    if (!isBigBrother) {
      router.push("/dashboard");
      return;
    }
  }, [session, status, router, isBigBrother]);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) {
        if (res.status === 403) setError("Geen toegang");
        else setError("Laden mislukt");
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Laden mislukt");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!session || !isBigBrother) return;
    fetchUsers();
  }, [session?.user?.email, isBigBrother]);

  if (status === "loading" || (session && !isBigBrother)) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

  const totalCreditsRemaining = users.reduce((s, u) => s + u.creditsRemaining, 0);
  const totalCreditsUsed = users.reduce((s, u) => s + u.creditsUsed, 0);
  const byRole = { ADMIN: 0, MEMBER: 0 };
  const byPlan: Record<string, number> = { FREE: 0, PLUS: 0, PREMIUM: 0, ULTIMATE: 0 };
  users.forEach((u) => {
    byRole[u.role === "ADMIN" ? "ADMIN" : "MEMBER"]++;
    byPlan[u.plan in byPlan ? u.plan : "FREE"]++;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-indigo-100 relative overflow-hidden">
      <WorkflowHeader currentPage="Big Brother" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Eye className="h-8 w-8 text-amber-600" />
              Big Brother
            </h1>
            <p className="text-gray-600 mt-1">
              Inzichten over gebruikers, rollen, credits en gebruik. Alleen zichtbaar voor jou.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Vernieuwen
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Naar dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Kpi-kaarten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/95 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Gebruikers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              <p className="text-xs text-gray-500">totaal geregistreerd</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Rollen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">
                {byRole.ADMIN} admin · {byRole.MEMBER} lid
              </p>
              <p className="text-xs text-gray-500">verdeling</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credits over
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{totalCreditsRemaining}</p>
              <p className="text-xs text-gray-500">totaal bij alle gebruikers</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Credits gebruikt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">{totalCreditsUsed}</p>
              <p className="text-xs text-gray-500">totaal verbruikt</p>
            </CardContent>
          </Card>
        </div>

        {/* Abonnementen verdeling */}
        <Card className="bg-white/95 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-base">Abonnementen</CardTitle>
            <CardDescription>
              Verdeling over Plus, Premium, Ultimate en Free
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="text-sm py-1.5 px-3">
                Free: {byPlan.FREE}
              </Badge>
              <Badge className="bg-blue-600 text-sm py-1.5 px-3">Plus: {byPlan.PLUS}</Badge>
              <Badge className="bg-purple-600 text-sm py-1.5 px-3">Premium: {byPlan.PREMIUM}</Badge>
              <Badge className="bg-amber-600 text-sm py-1.5 px-3">Ultimate: {byPlan.ULTIMATE}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gebruikers
            </CardTitle>
            <CardDescription>
              Overzicht van alle gebruikers met abotype, rol en credits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-gray-500">Laden...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && users.length === 0 && (
              <p className="text-gray-500">Geen gebruikers gevonden.</p>
            )}
            {!loading && !error && users.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Naam</th>
                      <th className="px-4 py-3 font-semibold">E-mail</th>
                      <th className="px-4 py-3 font-semibold">Rol</th>
                      <th className="px-4 py-3 font-semibold">Abonnement</th>
                      <th className="px-4 py-3 font-semibold">Credits (over)</th>
                      <th className="px-4 py-3 font-semibold">Limiet / gebruikt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((u) => {
                      const isAdmin = u.role === "ADMIN";
                      return (
                        <tr key={u.id} className="bg-white hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{u.name ?? "—"}</td>
                          <td className="px-4 py-3 text-gray-600">{u.email}</td>
                          <td className="px-4 py-3">
                            {isAdmin ? (
                              <Badge variant="default" className="bg-amber-600">Admin</Badge>
                            ) : (
                              <Badge variant="secondary">Lid</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3">{planBadge(u.plan)}</td>
                          <td className="px-4 py-3 font-medium">{isAdmin ? "∞" : u.creditsRemaining}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {isAdmin ? "Onbeperkt" : `${u.creditsLimit} / ${u.creditsUsed} gebruikt`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
