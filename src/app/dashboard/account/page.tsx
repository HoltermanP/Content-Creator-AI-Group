"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WorkflowHeader from "@/components/WorkflowHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setName(session.user?.name || "");
  }, [session, status, router]);

  const handleSave = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Naam mag niet leeg zijn.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: trimmed })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        toast.error(data?.error || "Kon je naam niet opslaan.");
        return;
      }

      toast.success("Je naam is succesvol bijgewerkt.");
    } catch (error) {
      console.error("Fout bij opslaan van naam:", error);
      toast.error("Er ging iets mis bij het opslaan. Probeer het later opnieuw.");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <WorkflowHeader currentPage="account" showBackButton backHref="/dashboard" />
        <div className="container mx-auto px-4 py-16">
          <p className="text-gray-600">Accountgegevens laden...</p>
        </div>
      </div>
    );
  }

  const subscriptionPlan = (session.user as { subscriptionPlan?: string } | undefined)?.subscriptionPlan;
  const creditsRemaining = (session.user as { creditsRemaining?: number } | undefined)?.creditsRemaining;

  let planLabel: string | null = null;
  if (subscriptionPlan) {
    planLabel = subscriptionPlan === "PREMIUM" ? "Premium" : subscriptionPlan === "PLUS" ? "Plus" : "Free";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <WorkflowHeader currentPage="account" showBackButton backHref="/dashboard" />

      <div className="container mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account instellingen</h1>
          <p className="text-gray-600 max-w-2xl">
            Beheer hier je persoonlijke gegevens, abonnement en credits. Updates aan je naam worden direct gebruikt in
            de gehele applicatie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Profielgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Naam</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Je naam"
                    />
                    <p className="text-xs text-gray-500">
                      Deze naam gebruiken we in het dashboard en in communicatie.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Emailadres</Label>
                    <Input id="email" value={session.user?.email || ""} disabled className="bg-gray-50" />
                    <p className="text-xs text-gray-500">
                      Je emailadres is gekoppeld aan je account en kan niet worden gewijzigd vanuit de app.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Opslaan..." : "Wijzigingen opslaan"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Beveiliging</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p>
                  Wil je je wachtwoord aanpassen? Log uit en gebruik vervolgens de{" "}
                  <span className="font-semibold">wachtwoord vergeten</span> functie op de inlogpagina (indien
                  beschikbaar), of neem contact op met het supportteam.
                </p>
                <p>
                  We bevelen aan om regelmatig je wachtwoord te wijzigen en voor ieder platform een uniek wachtwoord te
                  gebruiken.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Abonnement & credits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Huidig abonnement</span>
                  {planLabel ? (
                    <Badge
                      variant="secondary"
                      className={
                        planLabel === "Premium"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : planLabel === "Plus"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }
                    >
                      {planLabel}
                    </Badge>
                  ) : (
                    <span className="text-sm text-gray-500">Onbekend</span>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="block text-sm text-gray-600">Beschikbare credits</span>
                    <p className="text-xs text-gray-500">
                      Credits worden maandelijks aangevuld op basis van je abonnement.
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {typeof creditsRemaining === "number" ? creditsRemaining : "—"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

