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
    linkedInMethod: "DIRECT_API"
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [generatedContent, setGeneratedContent] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // TODO: Fetch companies and templates from API
    const mockCompanies: Company[] = [
      { id: "1", name: "TechCorp Netherlands", industry: "Technology/SaaS", description: "AI-powered analytics platform" },
      { id: "2", name: "De Vries Consultancy", industry: "Consulting", description: "Management consulting services" }
    ];

    const mockTemplates: Template[] = [
      {
        id: "1",
        name: "Nieuws Update",
        description: "Nieuws en updates delen",
        category: "Nieuws",
        content: "🚀 [Nieuws]\n\n[Details over de update]\n\nWat vind jij hiervan?\n\n#Innovation #Business",
        variables: ["Nieuws", "Details over de update"]
      },
      {
        id: "2",
        name: "Thought Leadership",
        description: "Expertise en inzichten delen",
        category: "Expertise",
        content: "💡 [Onderwerp]: [Inzicht]\n\n[Verdere uitleg]\n\nWat is jouw ervaring hiermee?\n\n#ThoughtLeadership #Expertise",
        variables: ["Onderwerp", "Inzicht", "Verdere uitleg"]
      },
      {
        id: "3",
        name: "Customer Story",
        description: "Klantverhalen delen",
        category: "Social Proof",
        content: "🎯 [Bedrijfsnaam] heeft geweldige resultaten behaald!\n\n[Uitleg over het succes]\n\n[Quote van klant]\n\n#SuccessStory #Growth",
        variables: ["Bedrijfsnaam", "Uitleg over het succes", "Quote van klant"]
      }
    ];

    setCompanies(mockCompanies);
    setTemplates(mockTemplates);
  }, [session, status, router]);

  const steps = [
    { id: 1, name: "Bedrijf & Onderwerp", description: "Kies bedrijf en onderwerp" },
    { id: 2, name: "Strategie & Tone", description: "Bepaal strategie en toon" },
    { id: 3, name: "AI Generatie", description: "Genereer content met AI" },
    { id: 4, name: "Bewerken & Optimaliseren", description: "Bewerk en optimaliseer" },
    { id: 5, name: "Plannen & Publiceren", description: "Plan en publiceer" }
  ];

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      const content = `🚀 ${formData.topic}

Na maanden van intensieve ontwikkeling zijn we enorm trots op wat we hebben gebouwd. ${formData.topic} gaat onze manier van werken volledig veranderen.

De eerste gebruikers melden al: 'Dit verandert hoe we werken!'

${formData.callToAction || "Wat vind jij van deze ontwikkeling?"}

#AI #Innovation #Business #${companies.find(c => c.id === formData.companyId)?.name?.replace(/\s+/g, "") || "Company"}`;

      setGeneratedContent(content);
      setFormData(prev => ({ ...prev, content }));
      setCurrentStep(4);
      toast.success("Content succesvol gegenereerd!");
    } catch (error) {
      toast.error("Er is iets misgegaan bij het genereren van content");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAsDraft = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Post opgeslagen als concept!");
      router.push("/dashboard/posts");
    } catch (error) {
      toast.error("Er is iets misgegaan bij het opslaan");
    } finally {
      setIsSaving(false);
    }
  };

  const schedulePost = async () => {
    setIsSaving(true);
    try {
      // TODO: Schedule post via API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Post succesvol gepland!");
      router.push("/dashboard/posts");
    } catch (error) {
      toast.error("Er is iets misgegaan bij het plannen");
    } finally {
      setIsSaving(false);
    }
  };

  const publishNow = async () => {
    setIsSaving(true);
    try {
      // TODO: Publish immediately via API
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Post succesvol gepubliceerd!");
      router.push("/dashboard/posts");
    } catch (error) {
      toast.error("Er is iets misgegaan bij het publiceren");
    } finally {
      setIsSaving(false);
    }
  };

  const applyTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      content: template.content,
      strategy: template.category.toLowerCase().replace(/\s+/g, '_')
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
        {/* Progress Steps */}
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

          <div className="flex items-center space-x-2 mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex-1 text-center">
                <div className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {step.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
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
                  <CardTitle>Stap 2: Strategie & Tone</CardTitle>
                  <CardDescription>
                    Bepaal de content strategie en toon van je post
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="strategy">Content strategie</Label>
                      <Select value={formData.strategy} onValueChange={(value) => setFormData(prev => ({ ...prev, strategy: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Kies een strategie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nieuws_update">Nieuws Update</SelectItem>
                          <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                          <SelectItem value="customer_story">Customer Story</SelectItem>
                          <SelectItem value="trend_update">Trend Update</SelectItem>
                          <SelectItem value="question_thread">Question Thread</SelectItem>
                          <SelectItem value="educational">Educatief</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tone">Tone/Stijl</Label>
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
                  </div>

                  <div>
                    <Label htmlFor="targetAudience">Doelgroep (optioneel)</Label>
                    <Input
                      id="targetAudience"
                      placeholder="Bv. IT managers, startups, ondernemers..."
                      value={formData.targetAudience}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    />
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

              {/* Templates Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Templates
                  </CardTitle>
                  <CardDescription>
                    Gebruik een template als startpunt voor je content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => applyTemplate(template)}
                      >
                        <CardContent className="pt-4">
                          <h4 className="font-medium mb-2">{template.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          <Badge variant="secondary">{template.category}</Badge>
                        </CardContent>
                      </Card>
                    ))}
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

                      <div>
                        <Label htmlFor="method">Publicatie methode</Label>
                        <Select value={formData.linkedInMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, linkedInMethod: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DIRECT_API">Direct LinkedIn API</SelectItem>
                            <SelectItem value="SHARE_API_V2">LinkedIn Share API v2</SelectItem>
                            <SelectItem value="BUFFER">Buffer</SelectItem>
                            <SelectItem value="ZAPIER">Zapier</SelectItem>
                            <SelectItem value="MAKE_COM">Make.com</SelectItem>
                            <SelectItem value="COPY_PASTE">Kopieer & Plak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    <TabsContent value="publish" className="space-y-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800 mb-2">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Direct publiceren</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Je post wordt direct gepubliceerd op LinkedIn. Zorg ervoor dat je content klaar is!
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="method">Publicatie methode</Label>
                        <Select value={formData.linkedInMethod} onValueChange={(value) => setFormData(prev => ({ ...prev, linkedInMethod: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="DIRECT_API">Direct LinkedIn API</SelectItem>
                              <SelectItem value="SHARE_API_V2">LinkedIn Share API v2</SelectItem>
                              <SelectItem value="BUFFER">Buffer</SelectItem>
                              <SelectItem value="ZAPIER">Zapier</SelectItem>
                              <SelectItem value="MAKE_COM">Make.com</SelectItem>
                              <SelectItem value="COPY_PASTE">Kopieer & Plak</SelectItem>
                            </SelectContent>
                          </Select>
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