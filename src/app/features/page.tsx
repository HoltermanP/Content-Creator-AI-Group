import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Zap, Users, Calendar, BarChart3, MessageSquare, CheckCircle, Star, Target, Brain, Image, TrendingUp, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeaturesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                GenPostAI
              </span>
              <span className="text-xs text-gray-600">Onderdeel van AI-group.nl</span>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Terug naar home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-indigo-900/10"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <Badge variant="outline" className="mb-4">
                🚀 Alle features overzicht
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Alles wat je nodig hebt voor{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LinkedIn succes
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Ontdek alle krachtige features die GenPostAI biedt om je LinkedIn presence naar een hoger niveau te tillen.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {[
              {
                icon: Brain,
                title: "AI Content Generatie",
                description: "Geavanceerde AI die professionele LinkedIn content creëert op basis van je input",
                features: [
                  "Meerdere content formaten",
                  "Persoonlijke tone of voice",
                  "Brand consistentie",
                  "Realtime optimalisatie"
                ],
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100"
              },
              {
                icon: Image,
                title: "AI Afbeeldingen",
                description: "Genereer professionele visuals die perfect passen bij je LinkedIn posts",
                features: [
                  "Social media graphics",
                  "Infographics",
                  "Brand consistent design",
                  "Instant generatie"
                ],
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100"
              },
              {
                icon: Calendar,
                title: "Content Kalender",
                description: "Plan en beheer al je LinkedIn content in één overzichtelijk dashboard",
                features: [
                  "Drag & drop planning",
                  "Automatische scheduling",
                  "Performance tracking",
                  "Team collaboration"
                ],
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100"
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Volledige inzichten in je LinkedIn performance en content effectiviteit",
                features: [
                  "Engagement metrics",
                  "Content performance",
                  "Audience insights",
                  "ROI berekeningen"
                ],
                color: "from-indigo-500 to-indigo-600",
                bgColor: "from-indigo-50 to-indigo-100"
              },
              {
                icon: Users,
                title: "Team Management",
                description: "Werk samen met je team aan één gedeelde LinkedIn strategie",
                features: [
                  "Rollen en permissies",
                  "Content approval flow",
                  "Brand guidelines",
                  "Performance rapporten"
                ],
                color: "from-pink-500 to-pink-600",
                bgColor: "from-pink-50 to-pink-100"
              },
              {
                icon: Target,
                title: "LinkedIn Integratie",
                description: "Direct publiceren naar LinkedIn met één klik",
                features: [
                  "Auto-posting",
                  "Hashtag optimalisatie",
                  "Link tracking",
                  "Performance monitoring"
                ],
                color: "from-orange-500 to-orange-600",
                bgColor: "from-orange-50 to-orange-100"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              📝 Ondersteunde Content Types
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              GenPostAI ondersteunt alle populaire LinkedIn content formaten voor maximale engagement
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "🎭",
                title: "Storyline Series",
                description: "Verhalende content in delen voor diepe connecties",
                examples: ["Dag 1: Het probleem", "Dag 2: De oplossing"]
              },
              {
                icon: "💬",
                title: "Engagement Posts",
                description: "Discussie starters voor community building",
                examples: ["Stel een vraag", "Deel inzichten"]
              },
              {
                icon: "📰",
                title: "Nieuws Updates",
                description: "Breaking news en bedrijfsupdates",
                examples: ["Nieuwe feature", "Marktontwikkeling"]
              },
              {
                icon: "📊",
                title: "Data Insights",
                description: "Visualisaties en statistieken",
                examples: ["Markt analyse", "Bedrijfscijfers"]
              },
              {
                icon: "🎯",
                title: "Tips & Advies",
                description: "Waardevolle inzichten voor je netwerk",
                examples: ["Best practices", "Industry tips"]
              },
              {
                icon: "🏆",
                title: "Success Stories",
                description: "Resultaten en case studies delen",
                examples: ["Klant success", "Team achievements"]
              },
              {
                icon: "🔄",
                title: "Behind the Scenes",
                description: "Menselijke kant van je bedrijf tonen",
                examples: ["Dagelijks leven", "Team cultuur"]
              },
              {
                icon: "💡",
                title: "Thought Leadership",
                description: "Expertise en visie delen",
                examples: ["Industry trends", "Future outlook"]
              }
            ].map((type, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-2">{type.icon}</div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {type.examples.map((example, i) => (
                        <div key={i} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                          • {example}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              📊 Vergelijk Abonnementen
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Kies het plan dat past bij jouw behoeften en budget
            </motion.p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Plus",
                  price: "€14,95",
                  credits: "50 credits/maand",
                  features: [
                    "AI content generatie",
                    "2 bedrijven",
                    "5 LinkedIn methodes",
                    "Content kalender",
                    "Email notificaties"
                  ],
                  popular: false
                },
                {
                  name: "Premium",
                  price: "€24,95",
                  credits: "250 credits/maand",
                  aiAgent: "Persoonlijke AI-assistent",
                  features: [
                    "Alles van Plus",
                    "🤖 AI-Agent ondersteuning",
                    "5 bedrijven",
                    "Analytics dashboard",
                    "Team management",
                    "A/B testing"
                  ],
                  popular: true
                },
                {
                  name: "Ultimate",
                  price: "€39,95",
                  credits: "1000 credits/maand",
                  aiAgent: "Geavanceerde AI-assistent",
                  features: [
                    "Alles van Premium",
                    "🎯 Uitgebreide AI-Agent",
                    "10 bedrijven",
                    "Priority support",
                    "White-label optie",
                    "API toegang"
                  ],
                  popular: false
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative"
                >
                  <Card className={`h-full ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                    <CardHeader className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        {plan.popular && <Badge className="ml-2">Meest gekozen</Badge>}
                      </div>
                      <div className="text-3xl font-bold">
                        {plan.price}
                        <span className="text-base font-normal text-gray-500">/maand</span>
                      </div>
                      <p className="text-sm text-gray-600">{plan.credits}</p>
                      {plan.aiAgent && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                          <div className="flex items-center gap-2 mb-1">
                            <Brain className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">AI Agent</span>
                          </div>
                          <p className="text-xs text-purple-700">{plan.aiAgent}</p>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                        Kies {plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              Klaar om te beginnen?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Start vandaag nog met GenPostAI en transformeer je LinkedIn presence
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                  Start je gratis proefperiode
                  <Sparkles className="ml-2 h-5 w-5 text-blue-600" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}