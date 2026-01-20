import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, FileText, TrendingUp, Users, Calendar, MessageSquare, CheckCircle, Star, Target, Lightbulb, Award, Zap, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TemplatesPage() {
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
                  <FileText className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
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
                📝 Content Templates
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Professionele templates voor{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  elke situatie
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Kies uit onze uitgebreide collectie bewezen templates en genereer content die engagement stimuleert.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12"
          >
            {[
              {
                icon: MessageSquare,
                title: "Engagement",
                count: "15 templates",
                description: "Start discussies en bouw community",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: TrendingUp,
                title: "Thought Leadership",
                count: "12 templates",
                description: "Toon expertise en visie",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Users,
                title: "Networking",
                count: "8 templates",
                description: "Maak connecties en bouw relaties",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Target,
                title: "Sales & Marketing",
                count: "10 templates",
                description: "Genereer leads en verkoop",
                color: "from-orange-500 to-orange-600"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <Badge variant="secondary" className="mb-2">{category.count}</Badge>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Popular Templates */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">
              🔥 Meest gebruikte templates
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Deze templates zorgen voor de hoogste engagement rates
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "🎭",
                title: "Storyline Serie",
                category: "Engagement",
                description: "Verhaal in delen voor diepe connecties met je publiek",
                features: [
                  "3-5 delen serie",
                  "Cliffhangers voor spanning",
                  "Call-to-action per deel",
                  "Visual storytelling"
                ],
                engagement: "85%",
                popular: true,
                example: "Dag 1: Het probleem dat iedereen kent..."
              },
              {
                icon: "💬",
                title: "Open Discussie",
                category: "Engagement",
                description: "Stel een vraag om discussie te stimuleren",
                features: [
                  "Gerichte vraagstelling",
                  "Context voor antwoord",
                  "Follow-up strategie",
                  "Community building"
                ],
                engagement: "92%",
                popular: true,
                example: "Wat is jullie grootste uitdaging deze maand?"
              },
              {
                icon: "🧵",
                title: "Thread Post",
                category: "Thought Leadership",
                description: "Gedetailleerde uitleg in thread formaat",
                features: [
                  "Stapsgewijze uitleg",
                  "Visuals per stap",
                  "CTA aan einde",
                  "Shareable content"
                ],
                engagement: "78%",
                popular: false,
                example: "Hoe digitalisering je business transformeert..."
              },
              {
                icon: "📊",
                title: "Data Insights",
                category: "Thought Leadership",
                description: "Deel interessante statistieken en inzichten",
                features: [
                  "Bronvermelding",
                  "Visualisatie",
                  "Context uitleg",
                  "Industry relevant"
                ],
                engagement: "76%",
                popular: false,
                example: "92% van de bedrijven ziet AI als concurrentievoordeel"
              },
              {
                icon: "🤝",
                title: "Connectie Verzoek",
                category: "Networking",
                description: "Persoonlijke connectie berichten voor networking",
                features: [
                  "Persoonlijke touch",
                  "Gemeenschappelijke interesse",
                  "Value proposition",
                  "Follow-up plan"
                ],
                engagement: "88%",
                popular: true,
                example: "Ik zag je post over digital marketing..."
              },
              {
                icon: "🎯",
                title: "Lead Generation",
                category: "Sales & Marketing",
                description: "Content die subtiel naar je diensten leidt",
                features: [
                  "Problem-solution format",
                  "Soft selling approach",
                  "Lead magnet",
                  "Nurturing funnel"
                ],
                engagement: "71%",
                popular: false,
                example: "Herken je dit probleem in je sales proces?"
              },
              {
                icon: "🏆",
                title: "Success Story",
                category: "Thought Leadership",
                description: "Deel successen en resultaten",
                features: [
                  "Concrete metrics",
                  "Before-after verhaal",
                  "Les geleerd",
                  "Inspiratie voor anderen"
                ],
                engagement: "83%",
                popular: true,
                example: "Hoe we 300% meer leads genereerden..."
              },
              {
                icon: "💡",
                title: "Quick Tip",
                category: "Thought Leadership",
                description: "Snelle, waardevolle tips voor je netwerk",
                features: [
                  "Praktische tip",
                  "Direct toepasbaar",
                  "Onderbouwd advies",
                  "Shareable format"
                ],
                engagement: "79%",
                popular: false,
                example: "Tip: Start elke sales call met deze vraag..."
              },
              {
                icon: "📅",
                title: "Event Announcement",
                category: "Networking",
                description: "Kondig events aan en bouw verwachting",
                features: [
                  "Event details",
                  "Value proposition",
                  "RSVP call-to-action",
                  "Teaser content"
                ],
                engagement: "65%",
                popular: false,
                example: "Komend webinar: AI in de praktijk..."
              }
            ].map((template, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{template.icon}</div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-gray-800 transition-colors">
                            {template.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      {template.popular && (
                        <Badge className="bg-gradient-to-r from-orange-400 to-red-400">
                          <Star className="h-3 w-3 mr-1" />
                          Populair
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base mb-4">
                      {template.description}
                    </CardDescription>

                    {/* Engagement Rate */}
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        {template.engagement} engagement rate
                      </span>
                    </div>

                    {/* Example */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-gray-700 italic">
                        "{template.example}"
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {template.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Builder Section */}
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
              🛠️ Template Builder
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Maak je eigen templates aan voor herhalende content types
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Lightbulb,
                  title: "Custom Templates",
                  description: "Maak templates voor je specifieke content behoeften",
                  features: ["Drag & drop builder", "Variabelen systeem", "Brand styling"]
                },
                {
                  icon: Award,
                  title: "Template Sharing",
                  description: "Deel templates met je team voor consistentie",
                  features: ["Team workspaces", "Template libraries", "Version control"]
                },
                {
                  icon: Zap,
                  title: "Smart Defaults",
                  description: "AI leert van je preferences en stelt templates voor",
                  features: ["Learning algorithm", "Personalized suggestions", "Auto-optimization"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center text-sm justify-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
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
              Start met professionele templates
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Kies uit 45+ bewezen templates of maak je eigen aan
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