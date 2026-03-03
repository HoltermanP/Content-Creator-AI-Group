"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Play, ArrowRight, CheckCircle, MessageSquare, Calendar, BarChart3, ArrowLeft, Edit3, Clock, Send, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlanning, setShowPlanning] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company: "TechCorp Netherlands",
    topic: "AI analytics dashboard lancering",
    tone: "enthousiast",
    strategy: "nieuws_update"
  });

  const [generatedContent, setGeneratedContent] = useState("");

  const generateDemoContent = () => {
    setIsGenerating(true);
    // Simulate AI content generation
    setTimeout(() => {
      setGeneratedContent(`🚀 Vandaag lanceren we onze nieuwe AI-analytics dashboard!

Na maanden van intensieve ontwikkeling zijn we enorm trots op wat we hebben gebouwd. Het dashboard geeft real-time inzichten in klantgedrag en helpt bedrijven datagedreven beslissingen te nemen.

De eerste gebruikers melden al: 'Dit verandert hoe we werken!'

#AI #Analytics #SaaS #ProductLaunch

---
Dit is een demo van GenPostAI. In het echte systeem zou dit door AI gegenereerd worden gebaseerd op je input.`);
      setIsGenerating(false);
      setStep(3);
    }, 2500);
  };

  const handleEditContent = () => {
    setStep(2);
  };

  const handlePlanPost = () => {
    setShowPlanning(true);
  };

  const handlePublishNow = () => {
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      // Reset to step 1 for demo purposes
      setStep(1);
      setGeneratedContent("");
      setShowPlanning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <Link href="/">
              <span className="text-2xl font-bold text-gray-900 cursor-pointer">GenPostAI</span>
            </Link>
            <Badge variant="secondary">Demo</Badge>
          </div>
          <Link href="/auth/signup">
            <Button>Start nu - €14,95/maand</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                <span className="ml-3 text-sm font-medium">
                  {stepNumber === 1 && "Bedrijfsinfo"}
                  {stepNumber === 2 && "Content parameters"}
                  {stepNumber === 3 && "AI gegenereerde content"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Company Setup */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">🚀 Stap 1: Stel je bedrijf in</CardTitle>
                <CardDescription>
                  GenPostAI leert je bedrijf kennen om authentieke content te genereren
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">Bedrijfsnaam</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Jouw bedrijfsnaam"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industrie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer industrie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology/SaaS</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="retail">Retail/E-commerce</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Bedrijfsbeschrijving</Label>
                  <Textarea
                    id="description"
                    placeholder="Beschrijf kort wat je bedrijf doet en wat jullie unique selling points zijn..."
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Pro tip</h4>
                  <p className="text-sm text-blue-800">
                    Hoe meer details je geeft, hoe beter de AI je content kan personaliseren voor je doelgroep.
                  </p>
                </div>

                <Button onClick={() => setStep(2)} className="w-full">
                  Volgende stap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Content Parameters */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">🎯 Stap 2: Content parameters</CardTitle>
                <CardDescription>
                  Vertel GenPostAI wat voor content je wilt maken
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basis instellingen</TabsTrigger>
                    <TabsTrigger value="advanced">Geavanceerd</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="topic">Onderwerp</Label>
                        <Input
                          id="topic"
                          value={formData.topic}
                          onChange={(e) => setFormData({...formData, topic: e.target.value})}
                          placeholder="Waar gaat je post over?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tone">Tone/Stijl</Label>
                        <Select value={formData.tone} onValueChange={(value) => setFormData({...formData, tone: value})}>
                          <SelectTrigger>
                            <SelectValue />
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
                      <Label htmlFor="strategy">Content strategie</Label>
                      <Select value={formData.strategy} onValueChange={(value) => setFormData({...formData, strategy: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nieuws_update">Nieuws Update</SelectItem>
                          <SelectItem value="thought_leadership">Thought Leadership</SelectItem>
                          <SelectItem value="customer_story">Customer Story</SelectItem>
                          <SelectItem value="trend_update">Trend Update</SelectItem>
                          <SelectItem value="question_thread">Question Thread</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6 mt-6">
                    <div>
                      <Label htmlFor="target">Doelgroep</Label>
                      <Input placeholder="Bv. IT managers, startups, ondernemers..." />
                    </div>

                    <div>
                      <Label htmlFor="hashtags">Hashtags (optioneel)</Label>
                      <Input placeholder="#AI #Tech #Innovation" />
                    </div>

                    <div>
                      <Label htmlFor="callToAction">Call-to-action</Label>
                      <Input placeholder="Bv. Wat vind jij hiervan? Deel in de comments!" />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Vorige
                  </Button>
                  <Button onClick={generateDemoContent} className="flex-1" disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Genereert content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Genereer content met AI
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Generated Content */}
        {step === 3 && !showPlanning && !publishSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  AI-gegenereerde content
                </CardTitle>
                <CardDescription>
                  Hier is je professionele LinkedIn post, gegenereerd door GenPostAI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Content gegenereerd!</h4>
                      <p className="text-sm text-blue-700">De AI heeft een professionele post gemaakt gebaseerd op je input. Je kunt deze nu bewerken, plannen of direct publiceren.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Vorige stap
                  </Button>
                  <Button variant="outline" onClick={handleEditContent} className="flex-1">
                    <Edit3 className="mr-2 h-4 w-4" />
                    Bewerk content
                  </Button>
                  <Button variant="outline" onClick={handlePlanPost} className="flex-1">
                    <Clock className="mr-2 h-4 w-4" />
                    Plan post
                  </Button>
                  <Button onClick={handlePublishNow} className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Publiceer nu
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Planning Interface */}
            {showPlanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      Plan je LinkedIn post
                    </CardTitle>
                    <CardDescription>
                      Kies wanneer je deze post wilt publiceren voor maximale impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="schedule-date">Datum</Label>
                        <Input
                          id="schedule-date"
                          type="date"
                          defaultValue={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="schedule-time">Tijd</Label>
                        <Select defaultValue="09:00">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00 - Morgenochtend</SelectItem>
                            <SelectItem value="12:00">12:00 - Lunchtijd</SelectItem>
                            <SelectItem value="15:00">15:00 - Middag</SelectItem>
                            <SelectItem value="17:00">17:00 - Avond</SelectItem>
                            <SelectItem value="19:00">19:00 - Happy hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">📊 Optimalisatie tip</h4>
                      <p className="text-sm text-blue-800">
                        Posts die rond 9:00 of 17:00 worden geplaatst krijgen gemiddeld 23% meer engagement.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowPlanning(false)} className="flex-1">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Terug
                      </Button>
                      <Button onClick={() => {
                        setShowPlanning(false);
                        setPublishSuccess(true);
                        setTimeout(() => {
                          setPublishSuccess(false);
                          setStep(1);
                          setGeneratedContent("");
                        }, 3000);
                      }} className="flex-1">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Plan post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Success Message */}
            {publishSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="text-center py-12">
                    <div className="mb-4">
                      <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">
                      {showPlanning ? "Post gepland!" : "Post gepubliceerd!"}
                    </h3>
                    <p className="text-green-700">
                      {showPlanning
                        ? "Je LinkedIn post is succesvol gepland voor publicatie."
                        : "Je LinkedIn post is succesvol gepubliceerd op je profiel."
                      }
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Premium Features Teaser */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Ontgrendel premium features
                </CardTitle>
                <CardDescription>
                  Met Premium en Ultimate krijg je toegang tot AI-Agent ondersteuning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">🤖 AI-Agent (Premium)</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Persoonlijk content advies</li>
                      <li>• Optimalisatie suggesties</li>
                      <li>• Performance analyse</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">🎯 Advanced AI-Agent (Ultimate)</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Strategisch marktadvies</li>
                      <li>• Concurrentie analyse</li>
                      <li>• Custom content strategieën</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/auth/signup">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Start nu - €24,95/maand (Premium)
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}