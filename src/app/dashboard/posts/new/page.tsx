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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  ArrowLeft,
  Wand2,
  Save,
  Send,
  Calendar,
  Image as ImageIcon,
  Hash,
  Target,
  Lightbulb,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Loader2,
  Upload,
  X
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import WorkflowHeader from "@/components/WorkflowHeader";

interface Company {
  id: string;
  name: string;
  industry: string;
  description?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  content: string;
  variables: string[];
}

export default function NewPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    companyId: "",
    title: "",
    topic: "",
    strategy: "",
    tone: "professioneel",
    targetAudience: "",
    content: "",
    hashtags: "",
    callToAction: "",
    scheduledDate: "",
    scheduledTime: "",
    imageUrl: "",
    linkedInMethod: "COPY_PASTE"
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {
    if (currentStep === 5 && (!formData.scheduledDate || !formData.scheduledTime)) {
      const now = new Date();
      const date = now.toISOString().slice(0, 10);
      const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setFormData(prev => ({
        ...prev,
        scheduledDate: prev.scheduledDate || date,
        scheduledTime: prev.scheduledTime || time,
      }));
    }
  }, [currentStep]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    async function loadData() {
      try {
        const [companiesRes, templatesRes] = await Promise.all([
          fetch("/api/companies"),
          fetch("/api/templates"),
        ]);
        if (companiesRes.ok) {
          const data = await companiesRes.json();
          setCompanies(Array.isArray(data) ? data : data.companies ?? []);
        }
        if (templatesRes.ok) {
          const data = await templatesRes.json();
          setTemplates(Array.isArray(data) ? data : data.templates ?? []);
        }
      } catch {
        // Fallback mock data als API faalt (geen org of netwerk)
        setCompanies([
          { id: "1", name: "TechCorp Netherlands", industry: "Technology/SaaS", description: "AI-powered analytics platform" },
          { id: "2", name: "De Vries Consultancy", industry: "Consulting", description: "Management consulting services" },
        ]);
        setTemplates([
          { id: "1", name: "Nieuws Update", description: "Nieuws en updates delen", category: "Nieuws", content: "🚀 [Nieuws]\n\n[Details]\n\n#Innovation #Business", variables: ["Nieuws", "Details"] },
          { id: "2", name: "Thought Leadership", description: "Expertise delen", category: "Expertise", content: "💡 [Onderwerp]: [Inzicht]\n\n#ThoughtLeadership", variables: ["Onderwerp", "Inzicht"] },
          { id: "3", name: "Customer Story", description: "Klantverhalen", category: "Social Proof", content: "🎯 [Bedrijf] heeft resultaten behaald!\n\n#SuccessStory", variables: ["Bedrijf"] },
          { id: "4", name: "Vacature", description: "Deel een vacature en trek kandidaten aan", category: "Vacature", content: "💼 **We zoeken: [Functietitel]**\n\n[Bedrijf] zoekt een [Functietitel].\n\n#Vacature #Hiring", variables: ["Functietitel", "Bedrijf"] },
        ]);
      }
    }
    loadData();
  }, [session, status, router]);

  const steps = [
    { id: 1, name: "Bedrijf & Onderwerp", description: "Kies bedrijf en onderwerp" },
    { id: 2, name: "Strategie & Tone", description: "Bepaal strategie en toon" },
    { id: 3, name: "AI Generatie", description: "Genereer content met AI" },
    { id: 4, name: "Bewerken & Optimaliseren", description: "Bewerk en optimaliseer" },
    { id: 5, name: "Plannen & Publiceren", description: "Plan en publiceer" }
  ];

  const generateContent = async () => {
    if (!formData.companyId || !formData.topic || !formData.tone) {
      toast.error("Vul bedrijf, onderwerp en toon in.");
      return;
    }
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: formData.companyId,
          topic: formData.topic,
          strategy: formData.strategy || "STANDARD_POST",
          tone: formData.tone,
          targetAudience: formData.targetAudience || "Professionele LinkedIn gebruikers",
          callToAction: formData.callToAction || undefined,
          hashtags: formData.hashtags ? formData.hashtags.split(/\s+/).filter(Boolean) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Genereren mislukt");
        return;
      }
      const content = data.content ?? "";
      setGeneratedContent(content);
      setFormData(prev => ({ ...prev, content }));
      setCurrentStep(4);
      toast.success("Content succesvol gegenereerd met GPT-5.2!");
    } catch (error) {
      console.error("Generate content error:", error);
      toast.error("Er is iets misgegaan bij het genereren van content. Controleer of OPENAI_API_KEY in .env staat.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAsDraft = async () => {
    const title = formData.title?.trim() || formData.topic?.trim() || formData.content?.trim().split("\n")[0]?.slice(0, 80) || "Nieuwe post";
    const content = formData.content?.trim();
    if (!content) {
      toast.error("Vul eerst de content in (stap 4).");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/calendar/posts", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: content + (formData.hashtags ? "\n\n" + formData.hashtags.trim() : ""),
          companyId: formData.companyId || null,
          strategy: formData.strategy || "STANDARD_POST",
          tone: formData.tone || "PROFESSIONAL",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        toast.error(data.error || "Er is iets misgegaan bij het opslaan");
        return;
      }

      toast.success("Post opgeslagen als concept!");
      router.push("/dashboard/posts");
    } catch (error) {
      toast.error("Er is iets misgegaan bij het opslaan. Controleer je internetverbinding.");
    } finally {
      setIsSaving(false);
    }
  };

  const schedulePost = async () => {
    const title = formData.title?.trim() || formData.topic?.trim() || formData.content?.trim().split("\n")[0]?.slice(0, 80) || "Nieuwe post";
    const content = formData.content?.trim();
    if (!content) {
      toast.error("Vul eerst de content in (stap 4).");
      return;
    }
    const date = formData.scheduledDate?.trim() || new Date().toISOString().slice(0, 10);
    const time = formData.scheduledTime?.trim() || "12:00";
    const scheduledAt = `${date}T${time}:00`;

    setIsSaving(true);
    try {
      const response = await fetch("/api/calendar/posts", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: content + (formData.hashtags ? "\n\n" + formData.hashtags.trim() : ""),
          scheduledAt,
          companyId: formData.companyId?.trim() || null,
          strategy: formData.strategy || "STANDARD_POST",
          tone: formData.tone || "PROFESSIONAL",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        toast.error(data.error || "Er is iets misgegaan bij het plannen");
        return;
      }

      const scheduledDate = new Date(scheduledAt);
      const dateStr = scheduledDate.toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      const timeStr = scheduledDate.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
      toast.success(`Post gepland voor ${dateStr} om ${timeStr}. Bekijk je planning op de kalender.`);
      router.push("/dashboard/calendar");
    } catch (error) {
      console.error("Schedule post error:", error);
      toast.error("Er is iets misgegaan bij het plannen. Probeer het opnieuw.");
    } finally {
      setIsSaving(false);
    }
  };

  const publishNow = async () => {
    const title = formData.title?.trim() || formData.topic?.trim() || formData.content?.trim().split("\n")[0]?.slice(0, 80) || "Nieuwe post";
    const content = formData.content?.trim();
    if (!content) {
      toast.error("Vul eerst de content in (stap 4).");
      return;
    }

    const date = formData.scheduledDate?.trim() || new Date().toISOString().slice(0, 10);
    const time = formData.scheduledTime?.trim() || "12:00";
    const scheduledAt = `${date}T${time}:00`;

    setIsSaving(true);
    try {
      const createRes = await fetch("/api/calendar/posts", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: content + (formData.hashtags ? "\n\n" + formData.hashtags.trim() : ""),
          companyId: formData.companyId || null,
          strategy: formData.strategy || "STANDARD_POST",
          tone: formData.tone || "PROFESSIONAL",
          publishNow: true,
          scheduledAt,
        }),
      });

      const createData = await createRes.json().catch(() => ({}));
      if (!createRes.ok) {
        toast.error(createData.error || "Post kon niet worden gepubliceerd.");
        return;
      }

      toast.success("Post is gepubliceerd en staat in je overzicht en planning.");
      router.push("/dashboard/posts");
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("Er is iets misgegaan bij het publiceren");
    } finally {
      setIsSaving(false);
    }
  };

  const categoryToStrategy: Record<string, string> = {
    nieuws: "nieuws_update",
    expertise: "thought_leadership",
    "social proof": "customer_story",
    educatief: "educational",
    vacature: "STANDARD_POST",
    aankondiging: "nieuws_update",
    celebration: "STANDARD_POST",
    engagement: "question_thread",
    "behind the scenes": "STANDARD_POST",
    trends: "trend_update",
    "case study": "customer_story",
  };

  const applyTemplate = (template: Template) => {
    setSelectedTemplate(template);
    const key = template.category.toLowerCase().trim();
    const strategy = categoryToStrategy[key] || key.replace(/\s+/g, "_") || "STANDARD_POST";
    setFormData(prev => ({
      ...prev,
      content: template.content,
      strategy,
    }));
    toast.success(`Template "${template.name}" toegepast!`);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <WorkflowHeader currentPage="post" showBackButton backHref="/dashboard/posts" />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps – één kolom per stap zodat cirkel en label uitlijnen */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/dashboard/posts">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug naar posts
              </Button>
            </Link>
            <div className="text-sm text-gray-600">
              Stap {currentStep} van {steps.length}
            </div>
          </div>

          <div className="flex w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex flex-col items-center min-w-0">
                {/* Cirkel + halve lijnen links/rechts */}
                <div className="relative w-full flex justify-center" style={{ height: "2rem" }}>
                  {index > 0 && (
                    <div
                      className={`absolute left-0 top-1/2 h-0.5 w-1/2 -translate-y-1/2 ${
                        currentStep > steps[index - 1].id ? "bg-blue-600" : "bg-gray-200"
                      }`}
                      aria-hidden
                    />
                  )}
                  <div
                    className={`relative z-10 w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-1/2 h-0.5 w-1/2 -translate-y-1/2 ${
                        currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                      }`}
                      aria-hidden
                    />
                  )}
                </div>
                {/* Label direct onder de cirkel */}
                <div className="mt-2 text-center px-0.5 min-w-0 w-full">
                  <div
                    className={`text-sm font-medium truncate ${
                      currentStep >= step.id ? "text-blue-600" : "text-gray-600"
                    }`}
                    title={step.name}
                  >
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 truncate" title={step.description}>
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Verbindingslijnen tussen cirkels (boven de cirkels, onder de “Stap x van y”-rij) */}
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Stap 1: Bedrijf & Onderwerp</CardTitle>
                  <CardDescription>
                    Kies voor welk bedrijf je content wilt maken en waar het over gaat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="company">Bedrijf</Label>
                    <Select value={formData.companyId} onValueChange={(value) => setFormData(prev => ({ ...prev, companyId: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer een bedrijf" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.id} value={company.id}>
                            <div className="flex items-center gap-2">
                              <div>
                                <div className="font-medium">{company.name}</div>
                                <div className="text-sm text-gray-500">{company.industry}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="title">Post titel (optioneel)</Label>
                    <Input
                      id="title"
                      placeholder="Bv. Nieuwe AI-feature gelanceerd"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="topic">Onderwerp</Label>
                    <Textarea
                      id="topic"
                      placeholder="Beschrijf waar je post over gaat. Hoe specifieker, hoe beter de AI content kan genereren."
                      value={formData.topic}
                      onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.companyId || !formData.topic.trim()}
                    className="w-full"
                  >
                    Volgende stap
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Stap 2: Template & strategie</CardTitle>
                  <CardDescription>
                    Kies één template; daarmee kies je ook je contentstrategie. Of start leeg en laat de AI bepalen.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4" />
                      Template en strategie
                    </Label>
                    <p className="text-xs text-gray-500 mb-3">
                      Elke template heeft een vaste strategie. Kies er één of kies "Start leeg" voor een vrije AI-post.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTemplate(null);
                          setFormData(prev => ({
                            ...prev,
                            strategy: "STANDARD_POST",
                            content: prev.content || "",
                          }));
                        }}
                        className={`text-left p-3 rounded-lg border transition-colors hover:shadow-sm ${
                          !selectedTemplate
                            ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <h4 className="font-medium text-sm">Start leeg</h4>
                        <p className="text-xs text-gray-600 mt-1">Geen template; AI kiest strategie op basis van je onderwerp.</p>
                        <Badge variant="secondary" className="mt-2 text-xs">Vrij</Badge>
                      </button>
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          type="button"
                          onClick={() => applyTemplate(template)}
                          className={`text-left p-3 rounded-lg border transition-colors hover:shadow-sm ${
                            selectedTemplate?.id === template.id
                              ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <h4 className="font-medium text-sm">{template.name}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{template.description}</p>
                          <Badge variant="secondary" className="mt-2 text-xs">{template.category}</Badge>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="tone">Tone / stijl</Label>
                      <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kies een toon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professioneel">Professioneel</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="enthousiast">Enthousiast</SelectItem>
                          <SelectItem value="inspirerend">Inspirerend</SelectItem>
                          <SelectItem value="educatief">Educatief</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetAudience">Doelgroep (optioneel)</Label>
                      <Input
                        id="targetAudience"
                        placeholder="Bv. IT managers, startups..."
                        value={formData.targetAudience}
                        onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Vorige
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="flex-1">
                      Volgende stap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Stap 3: AI Content Generatie
                  </CardTitle>
                  <CardDescription>
                    GenPostAI gaat nu professionele content voor je genereren
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-3">📝 Jouw input:</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p><strong>Bedrijf:</strong> {companies.find(c => c.id === formData.companyId)?.name}</p>
                      <p><strong>Onderwerp:</strong> {formData.topic}</p>
                      <p><strong>Strategie:</strong> {formData.strategy}</p>
                      <p><strong>Tone:</strong> {formData.tone}</p>
                      {formData.targetAudience && (
                        <p><strong>Doelgroep:</strong> {formData.targetAudience}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Vorige
                    </Button>
                    <Button
                      onClick={generateContent}
                      disabled={isGenerating}
                      className="flex-1"
                    >
                      {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isGenerating ? "Content genereren..." : "Genereer content met AI"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Stap 4: Bewerk & Optimaliseer</CardTitle>
                  <CardDescription>
                    Bewerk de gegenereerde content en voeg optimalisaties toe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={12}
                      placeholder="Jouw LinkedIn post content..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="hashtags">Hashtags</Label>
                      <Input
                        id="hashtags"
                        placeholder="#AI #Innovation #Business"
                        value={formData.hashtags}
                        onChange={(e) => setFormData(prev => ({ ...prev, hashtags: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="callToAction">Call-to-action</Label>
                      <Input
                        id="callToAction"
                        placeholder="Bv. Wat vind jij hiervan?"
                        value={formData.callToAction}
                        onChange={(e) => setFormData(prev => ({ ...prev, callToAction: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Afbeelding uploaden (optioneel)</Label>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Afbeelding kiezen
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">
                        Ondersteunde formaten: JPG, PNG, GIF (max 10MB)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      Opnieuw genereren
                    </Button>
                    <Button onClick={() => setCurrentStep(5)} className="flex-1">
                      Naar planning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Stap 5: Plan & Publiceer</CardTitle>
                  <CardDescription>
                    Kies wanneer en hoe je de post wilt publiceren
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs defaultValue="schedule" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="schedule">Inplannen</TabsTrigger>
                      <TabsTrigger value="publish">Direct publiceren</TabsTrigger>
                    </TabsList>

                    <TabsContent value="schedule" className="space-y-6">
                      <p className="text-sm text-gray-600">
                        Kies datum en tijd. De post verschijnt in je planning; je kunt de content later kopiëren en plakken waar je wilt.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="scheduledDate">Datum</Label>
                          <Input
                            id="scheduledDate"
                            type="date"
                            value={formData.scheduledDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="scheduledTime">Tijd</Label>
                          <Input
                            id="scheduledTime"
                            type="time"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="publish" className="space-y-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800 mb-2">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Direct publiceren</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Je post wordt als gepubliceerd gemarkeerd en verschijnt in je overzicht en planning. Vul hieronder de datum en tijd in (wanneer de post als gepubliceerd telt).
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="publishDate">Datum</Label>
                          <Input
                            id="publishDate"
                            type="date"
                            value={formData.scheduledDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="publishTime">Tijd</Label>
                          <Input
                            id="publishTime"
                            type="time"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                          />
                        </div>
                      </div>
                      </TabsContent>
                    </Tabs>

                  <Separator />

                  {/* Preview */}
                  <div>
                    <Label>Voorvertoning</Label>
                    <Card className="mt-2">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session?.user?.image || ""} />
                            <AvatarFallback>
                              {session?.user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium">{session?.user?.name || "Gebruiker"}</span>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-500">Nu</span>
                            </div>
                            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed mb-3">
                              {formData.content}
                            </div>
                            {formData.hashtags && (
                              <div className="text-blue-600 mb-3">
                                {formData.hashtags}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(4)}>
                      Vorige
                    </Button>
                    <Button variant="outline" onClick={saveAsDraft} disabled={isSaving}>
                      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Opslaan als concept
                    </Button>
                    {formData.scheduledDate && formData.scheduledTime ? (
                      <Button onClick={schedulePost} disabled={isSaving} className="flex-1">
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Calendar className="mr-2 h-4 w-4" />
                        Inplannen
                      </Button>
                    ) : (
                      <Button onClick={publishNow} disabled={isSaving} className="flex-1">
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Send className="mr-2 h-4 w-4" />
                        Direct publiceren
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}