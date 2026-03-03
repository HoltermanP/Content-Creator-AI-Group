"use client";

import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Users, Target, MessageSquare, Calendar, Eye, Heart, Share2, Zap, CheckCircle, Star, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LinkedInTipsPage() {
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
                  <TrendingUp className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
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
                💡 LinkedIn Tips & Best Practices
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Haal meer uit{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LinkedIn
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Ontdek bewezen strategieën en tips om je LinkedIn presence te transformeren. Van beginners tot experts.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Wins */}
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
              ⚡ Snelle Winst
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              5 veranderingen die direct impact hebben op je LinkedIn performance
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Eye,
                title: "Complete je profiel",
                description: "Een volledig profiel krijgt 40% meer views",
                tips: [
                  "Professionele foto toevoegen",
                  "Banner uploaden",
                  "Over jezelf schrijven",
                  "Ervaring en opleiding invullen"
                ],
                impact: "40% meer views",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: MessageSquare,
                title: "Post regelmatig",
                description: "Consistent posten = consistente groei",
                tips: [
                  "Kies vaste posting dagen",
                  "4-5 posts per week",
                  "Meng verschillende formats",
                  "Blijf consistent met je niche"
                ],
                impact: "3x meer engagement",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Users,
                title: "Bouw je netwerk",
                description: "Quality connections over quantity",
                tips: [
                  "Personaliseer connectie verzoeken",
                  "Focus op je niche",
                  "Geef voordat je vraagt",
                  "Onderhoud bestaande connecties"
                ],
                impact: "5x meer reach",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Target,
                title: "Gebruik hashtags strategisch",
                description: "De juiste hashtags = juiste publiek",
                tips: [
                  "3-5 relevante hashtags per post",
                  "Meng populaire en niche hashtags",
                  "Onderzoek trending hashtags",
                  "Maak eigen branded hashtags"
                ],
                impact: "29% meer engagement",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Heart,
                title: "Interact met anderen",
                description: "Geven = krijgen op LinkedIn",
                tips: [
                  "Comment op relevante posts",
                  "Like en share waardevolle content",
                  "Stel vragen aan je netwerk",
                  "Reageer op comments bij je posts"
                ],
                impact: "2x meer connecties",
                color: "from-pink-500 to-pink-600"
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center`}>
                        <tip.icon className="h-7 w-7 text-white" />
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {tip.impact}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-gray-800 transition-colors">
                      {tip.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tip.tips.map((item, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
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
      </section>

      {/* Content Strategy */}
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
              📊 Content Strategie
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Bouw een content strategie die werkt voor jouw doelgroep
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto space-y-8">
            {[
              {
                title: "De 80/20 Regel voor Content",
                description: "80% waarde geven, 20% promoten",
                breakdown: [
                  { label: "Educatief (60%)", examples: "Tips, inzichten, how-to's", icon: "🎓" },
                  { label: "Entertainment (20%)", examples: "Stories, humor, relatable content", icon: "🎭" },
                  { label: "Promotion (20%)", examples: "Eigen diensten, producten, events", icon: "📢" }
                ],
                tip: "Focus eerst op waarde geven, dan komt de verkoop vanzelf"
              },
              {
                title: "Storytelling Framework",
                description: "Vertel verhalen die mensen raken",
                breakdown: [
                  { label: "Hook (5%)", examples: "Vraag of verrassend feit", icon: "🪝" },
                  { label: "Context (20%)", examples: "Waarom dit belangrijk is", icon: "📖" },
                  { label: "Story (60%)", examples: "Jouw ervaring of case study", icon: "📚" },
                  { label: "Takeaway (15%)", examples: "Wat leren we hieruit?", icon: "💡" }
                ],
                tip: "Goede verhalen verkopen zichzelf"
              },
              {
                title: "Content Calendar Planning",
                description: "Structureer je content voor maximale impact",
                breakdown: [
                  { label: "Maandag", examples: "Thought leadership, industry insights", icon: "📈" },
                  { label: "Woensdag", examples: "Tips, how-to's, educational content", icon: "🛠️" },
                  { label: "Vrijdag", examples: "Weekend content, fun facts, polls", icon: "🎉" }
                ],
                tip: "Verspreid je content voor consistente zichtbaarheid"
              }
            ].map((strategy, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-6">
                    <CardTitle className="text-2xl">{strategy.title}</CardTitle>
                    <CardDescription className="text-base">{strategy.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {strategy.breakdown.map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-semibold text-gray-900">{item.label}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.examples}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800 mb-1">Pro tip:</p>
                          <p className="text-sm text-yellow-700">{strategy.tip}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
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
              🎯 Best Practices
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Doe wat werkt en vermijd wat niet werkt
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div variants={fadeInUp}>
              <Card className="p-6 border-green-200 bg-green-50/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-green-800">Doen: Wat werkt</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">Post tussen 7:00-9:00 of 17:00-19:00 voor maximale reach</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">Gebruik emoji's strategisch (max 3 per post)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">Stel vragen om discussie te stimuleren</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">Personaliseer alle connectie verzoeken</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">Analyseer wat werkt en doe meer daarvan</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 border-red-200 bg-red-50/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">✗</span>
                    </div>
                    <CardTitle className="text-red-800">Niet doen: Wat niet werkt</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-sm text-red-800">Hard selling zonder waarde toe te voegen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-sm text-red-800">Te veel hashtags (meer dan 5)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-sm text-red-800">Alleen connectie verzoeken zonder personalisatie</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-sm text-red-800">Negatieve comments of discussies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span className="text-sm text-red-800">Inconsistente branding of stem</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
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
              Klaar voor de volgende stap?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              GenPostAI helpt je al deze tips automatisch toe te passen
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                  Start met GenPostAI
                  <Zap className="ml-2 h-5 w-5 text-blue-600" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}