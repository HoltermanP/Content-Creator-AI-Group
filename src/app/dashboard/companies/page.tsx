"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Plus,
  Building,
  Edit,
  Trash2,
  Settings,
  Users,
  MessageSquare,
  TrendingUp,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Save,
  X,
  Globe,
  Wand2
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import WorkflowHeader from "@/components/WorkflowHeader";

interface Company {
  id: string;
  name: string;
  industry: string;
  description?: string;
  website?: string;
  logo?: string;
  location?: string;
  employeeCount?: string;
  founded?: string;
  targetAudience?: string;
  brandVoice?: string;
  keyTopics?: string[];
  socialLinks?: {
    linkedin?: string;
  };
  createdAt: string;
  updatedAt: string;
  postCount: number;
  publishedPostCount: number;
}

interface CompanyFormData {
  name: string;
  industry: string;
  description: string;
  website: string;
  location: string;
  employeeCount: string;
  founded: string;
  targetAudience: string;
  brandVoice: string;
  keyTopics: string;
  linkedinUrl: string;
}

const DOELGROEP_OPTIES = [
  "ZZP'ers & freelancers",
  "MKB-bedrijven",
  "Corporate / enterprise",
  "Startups & scale-ups",
  "Non-profit / maatschappelijke organisaties",
  "Overheid / publieke sector",
  "HR & recruitment",
  "Marketing & sales professionals",
];

export default function CompaniesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingFromWeb, setIsFetchingFromWeb] = useState(false);
  const [fetchWebsiteUrl, setFetchWebsiteUrl] = useState("");
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [otherAudience, setOtherAudience] = useState("");

  const [formData, setFormData] = useState<CompanyFormData>({
    name: "",
    industry: "",
    description: "",
    website: "",
    location: "",
    employeeCount: "",
    founded: "",
    targetAudience: "",
    brandVoice: "",
    keyTopics: "",
    linkedinUrl: ""
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchCompanies();
  }, [session, status, router]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies', { credentials: 'include' });
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setCompanies(data);
      } else {
        setCompanies([]);
      }
    } catch {
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      industry: "",
      description: "",
      website: "",
      location: "",
      employeeCount: "",
      founded: "",
      targetAudience: "",
      brandVoice: "",
      keyTopics: "",
      linkedinUrl: ""
    });
    setFetchWebsiteUrl("");
    setSelectedAudiences([]);
    setOtherAudience("");
  };

  const syncAudienceState = (rawAudience: string | undefined | null) => {
    const value = rawAudience || "";
    if (!value.trim()) {
      setSelectedAudiences([]);
      setOtherAudience("");
      return;
    }

    const parts = value
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const selected = parts.filter((p) => DOELGROEP_OPTIES.includes(p));
    const rest = parts.filter((p) => !DOELGROEP_OPTIES.includes(p));

    setSelectedAudiences(selected);
    setOtherAudience(rest.join(", "));
  };

  const openCreateDialog = () => {
    resetForm();
    setEditingCompany(null);
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (company: Company) => {
    setFormData({
      name: company.name,
      industry: company.industry,
      description: company.description || "",
      website: company.website || "",
      location: company.location || "",
      employeeCount: company.employeeCount || "",
      founded: company.founded || "",
      targetAudience: company.targetAudience || "",
      brandVoice: company.brandVoice || "",
      keyTopics: company.keyTopics?.join(", ") || "",
      linkedinUrl: company.socialLinks?.linkedin || ""
    });
    syncAudienceState(company.targetAudience);
    setEditingCompany(company);
    setIsCreateDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const combinedAudience = [
        ...selectedAudiences,
        otherAudience.trim(),
      ]
        .filter(Boolean)
        .join(", ");

      const companyData = {
        name: formData.name,
        industry: formData.industry,
        description: formData.description,
        website: formData.website,
        targetAudience: combinedAudience,
        linkedinUrl: formData.linkedinUrl,
        socialLinks: {
          linkedin: formData.linkedinUrl
        }
      };

      if (editingCompany) {
        // Update company via API
        const response = await fetch(`/api/companies/${editingCompany.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(companyData),
        });

        const dataUpdate = await response.json().catch(() => ({}));
        if (response.ok) {
          setCompanies(prev => prev.map(c => c.id === editingCompany.id ? dataUpdate : c));
          toast.success("Bedrijf bijgewerkt!");
        } else {
          toast.error(dataUpdate.error || "Bijwerken mislukt");
          // Niet meer automatisch redirecten; gebruiker ziet nu duidelijke melding
          return;
        }
      } else {
        // Create company via API
        const response = await fetch('/api/companies', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(companyData),
        });

        const data = await response.json().catch(() => ({}));
        if (response.ok) {
          setCompanies(prev => [...prev, data]);
          toast.success("Bedrijf toegevoegd!");
          localStorage.setItem('onboarding_company_completed', 'true');
        } else {
          toast.error(data.error || "Aanmaken mislukt");
          // Niet meer automatisch redirecten; gebruiker ziet nu duidelijke melding
          return;
        }
      }

      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving company:', error);
      toast.error(error instanceof Error ? error.message : "Er is iets misgegaan");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFetchFromWebsite = async () => {
    if (!fetchWebsiteUrl.trim()) {
      toast.error("Voer een website URL in");
      return;
    }
    setIsFetchingFromWeb(true);
    try {
      const response = await fetch('/api/companies/fetch-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website: fetchWebsiteUrl,
          companyName: formData.name || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Er is iets misgegaan');
      }

      // Update form with extracted information
      setFormData(prev => ({
        ...prev,
        name: prev.name || data.company?.name || data.extractedInfo?.name || prev.name,
        description: data.extractedInfo.description || prev.description,
        industry: data.extractedInfo.industry || prev.industry,
        targetAudience: data.extractedInfo.targetAudience || prev.targetAudience,
        brandVoice: data.extractedInfo.values || prev.brandVoice,
        keyTopics: data.extractedInfo.usp || prev.keyTopics,
        website: fetchWebsiteUrl
      }));

      syncAudienceState(data.extractedInfo.targetAudience || formData.targetAudience);

      toast.success("Bedrijfsinfo succesvol opgehaald van website!");
      setFetchWebsiteUrl(""); // Clear the fetch URL after successful fetch
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Kon bedrijfsinfo niet ophalen");
    } finally {
      setIsFetchingFromWeb(false);
    }
  };

  const handleDelete = async (companyId: string) => {
    if (!confirm("Weet je zeker dat je dit bedrijf wilt verwijderen?")) return;

    try {
      const response = await fetch(`/api/companies/${companyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCompanies(prev => prev.filter(c => c.id !== companyId));
        toast.success("Bedrijf verwijderd!");
      } else {
        throw new Error('Failed to delete company');
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error("Er is iets misgegaan bij het verwijderen");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Bedrijven laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <WorkflowHeader currentPage="company" />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bedrijven Beheren</h1>
            <p className="text-gray-600">Beheer je bedrijf profielen voor gepersonaliseerde content</p>
          </div>
          <Button
            onClick={openCreateDialog}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Bedrijf toevoegen
          </Button>
        </div>

        {/* Companies Grid */}
        {companies.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen bedrijven</h3>
              <p className="text-gray-600 mb-6">
                Voeg je eerste bedrijf toe en laat AI automatisch de basisinformatie invullen via je website.
              </p>

              <div className="space-y-4 max-w-md mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Bedrijf toevoegen (met AI)</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Vul je website in en GenPostAI haalt automatisch naam, beschrijving en andere gegevens op. Je kunt alles daarna handmatig aanpassen.
                  </p>
                  <Button
                    onClick={openCreateDialog}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Bedrijf toevoegen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                            {company.name.split(" ").map(word => word[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <Badge variant="secondary">{company.industry}</Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acties</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditDialog(company)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Bewerken
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Instellingen
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(company.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Verwijderen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Posts:</span>
                          <div className="font-medium">{company.postCount}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Gepubliceerd:</span>
                          <div className="font-medium text-green-600">{company.publishedPostCount}</div>
                        </div>
                      </div>

                      {company.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="h-4 w-4" />
                          {company.location}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Link href={`/dashboard/posts?company=${company.id}`}>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Posts
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create/Edit Company Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? "Bedrijf bewerken" : "Nieuw bedrijf toevoegen"}
              </DialogTitle>
              <DialogDescription>
                Configureer je bedrijf profiel voor betere AI content generatie
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basis informatie</TabsTrigger>
                <TabsTrigger value="branding">Branding & Stem</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Bedrijfsnaam *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => {
                        console.log('Name input changed:', e.target.value);
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                      }}
                      placeholder="Jouw bedrijfsnaam"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industrie *</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer industrie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology/SaaS">Technology/SaaS</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                        <SelectItem value="Retail/E-commerce">Retail/E-commerce</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Website Info Fetch Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-3">
                    <Wand2 className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Auto-fill van website</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Laat AI automatisch bedrijfsinformatie ophalen van je website voor snellere setup.
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="https://jouwbedrijf.nl"
                        value={fetchWebsiteUrl}
                        onChange={(e) => setFetchWebsiteUrl(e.target.value)}
                        className="bg-white/80"
                      />
                    </div>
                    <Button
                      onClick={handleFetchFromWebsite}
                      disabled={isFetchingFromWeb || !fetchWebsiteUrl.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isFetchingFromWeb && <Wand2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Globe className="mr-2 h-4 w-4" />
                      {isFetchingFromWeb ? "Bezig..." : "Haal info op"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Vul je website in; de bedrijfsnaam en overige informatie worden automatisch voorgesteld.
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Bedrijfsbeschrijving</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Beschrijf kort wat je bedrijf doet..."
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://jouwbedrijf.nl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Locatie</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Amsterdam, Nederland"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeCount">Aantal medewerkers</Label>
                    <Select value={formData.employeeCount} onValueChange={(value) => setFormData(prev => ({ ...prev, employeeCount: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer grootte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="10-50">10-50</SelectItem>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100-500">100-500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="branding" className="space-y-6 mt-6">
                <div className="space-y-3">
                  <Label>Doelgroep</Label>
                  <p className="text-sm text-gray-500">
                    Kies één of meerdere doelgroepen die je wilt bereiken. Vul &quot;Overig&quot; in voor een specifieke doelgroep.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {DOELGROEP_OPTIES.map((optie) => (
                      <label
                        key={optie}
                        className="flex items-start gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedAudiences.includes(optie)}
                          onCheckedChange={(checked) => {
                            setSelectedAudiences((prev) =>
                              checked
                                ? [...prev, optie]
                                : prev.filter((v) => v !== optie)
                            );
                          }}
                          className="mt-0.5"
                        />
                        <span>{optie}</span>
                      </label>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="targetAudienceOther">Overig (vrij veld)</Label>
                    <Input
                      id="targetAudienceOther"
                      value={otherAudience}
                      onChange={(e) => setOtherAudience(e.target.value)}
                      placeholder="Bijvoorbeeld: HR-managers in de zorg, SaaS-founders in de Benelux..."
                    />
                    <p className="text-xs text-gray-500">
                      Deze tekst wordt samen met de geselecteerde vakjes opgeslagen als volledige doelgroepbeschrijving.
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="brandVoice">Merkstem / Tone of voice</Label>
                  <Textarea
                    id="brandVoice"
                    value={formData.brandVoice}
                    onChange={(e) => setFormData(prev => ({ ...prev, brandVoice: e.target.value }))}
                    placeholder="Bv. Professioneel, innovatief, behulpzaam, vertrouwd..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="keyTopics">Key topics & expertise (kommagescheiden)</Label>
                  <Textarea
                    id="keyTopics"
                    value={formData.keyTopics}
                    onChange={(e) => setFormData(prev => ({ ...prev, keyTopics: e.target.value }))}
                    placeholder="AI, Analytics, SaaS, Business Intelligence..."
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Deze topics helpen de AI relevante content te genereren
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                    placeholder="https://linkedin.com/company/jouw-bedrijf"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Alleen LinkedIn wordt ondersteund voor dit bedrijf
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1"
              >
                Annuleren
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !formData.name || !formData.industry}
                className="flex-1"
              >
                {isSaving && <Save className="mr-2 h-4 w-4 animate-spin" />}
                {editingCompany ? "Bijwerken" : "Toevoegen"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}