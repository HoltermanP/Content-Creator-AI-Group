"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Users, Target, Award, TrendingUp, Heart, Lightbulb, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
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
                  <Globe className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                AI-group.nl
              </span>
              <span className="text-xs text-gray-600">Dé specialist in AI voor Nederlandse bedrijven</span>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Terug naar GenPostAI
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
                🤖 AI Innovation sinds 2020
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                AI-group.nl -{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI voor Nederlandse bedrijven
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Wij maken AI toegankelijk en praktisch voor het Nederlandse bedrijfsleven. Van content creatie tot procesoptimalisatie.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Onze Missie</h2>
              <p className="text-xl text-gray-600">
                AI democratiseren voor Nederlandse bedrijven
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Het begon met een visie</h3>
                      <p className="text-gray-700">
                        In 2020 zagen we hoe AI de wereld veranderde, maar Nederlandse bedrijven hadden moeite om mee te doen. Te complex, te duur, te eng. Dat moest anders.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Focus op praktische oplossingen</h3>
                      <p className="text-gray-700">
                        We bouwden geen fancy AI-tools voor techgiganten. We creëerden praktische oplossingen voor het Nederlandse MKB die direct waarde toevoegen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Mensgericht en betrouwbaar</h3>
                      <p className="text-gray-700">
                        AI moet mensen helpen, niet vervangen. We zorgen voor transparante, ethische AI die aansluit bij Nederlandse waarden en wetgeving.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Onze aanpak</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">Gebruiksvriendelijke interfaces</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">Nederlandse taal ondersteuning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">Lokale datacenters</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">GDPR compliant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">24/7 Nederlandse support</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Products */}
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
              🎯 Onze Producten
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Praktische AI-oplossingen voor Nederlandse bedrijven
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "GenPostAI",
                description: "AI-powered LinkedIn content creatie voor professionals",
                status: "Live",
                users: "500+ bedrijven",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: TrendingUp,
                title: "AI Analytics Pro",
                description: "Geavanceerde data analyse met natuurlijke taal queries",
                status: "In ontwikkeling",
                users: "Coming soon",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Users,
                title: "AI HR Assistant",
                description: "Intelligente HR-tools voor werving en onboarding",
                status: "Planning",
                users: "Q1 2026",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Target,
                title: "AI Sales Coach",
                description: "Persoonlijke verkoop coaching met AI inzichten",
                status: "Planning",
                users: "Q2 2026",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: Shield,
                title: "AI Compliance Guard",
                description: "Automatische compliance monitoring en rapportage",
                status: "In ontwikkeling",
                users: "Coming soon",
                color: "from-red-500 to-red-600"
              },
              {
                icon: Lightbulb,
                title: "AI Innovation Lab",
                description: "Custom AI-oplossingen voor specifieke bedrijfsuitdagingen",
                status: "Op aanvraag",
                users: "Enterprise",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <product.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-gray-800 transition-colors">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={product.status === "Live" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{product.users}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              💎 Onze Waarden
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              De principes die ons dagelijks werk bepalen
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: "Vertrouwen",
                description: "Transparante, ethische AI die je kunt vertrouwen",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Users,
                title: "Mensgericht",
                description: "AI versterkt mensen, vervangt ze niet",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Award,
                title: "Kwaliteit",
                description: "Alleen de beste oplossingen voor Nederlandse bedrijven",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Heart,
                title: "Passie",
                description: "We geloven in de kracht van AI voor positief verandering",
                color: "from-pink-500 to-pink-600"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              👥 Ons Team
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Experts met passie voor AI en Nederlandse bedrijven
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Jan van der Berg",
                role: "CEO & Oprichter",
                description: "20+ jaar ervaring in technologie en digitale transformatie. Expert in AI-implementatie.",
                expertise: ["AI Strategy", "Digital Transformation", "Enterprise Solutions"]
              },
              {
                name: "Maria Jansen",
                role: "CTO & AI Expert",
                description: "PhD in Machine Learning. Bouwt de brug tussen cutting-edge AI en praktische toepassingen.",
                expertise: ["Machine Learning", "NLP", "AI Ethics"]
              },
              {
                name: "Peter de Vries",
                role: "Head of Customer Success",
                description: "Zorgt ervoor dat Nederlandse bedrijven succesvol worden met onze AI-oplossingen.",
                expertise: ["Customer Success", "Change Management", "Dutch Market"]
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{member.description}</p>
                    <div className="space-y-2">
                      {member.expertise.map((skill, i) => (
                        <Badge key={i} variant="outline" className="mr-2 mb-2">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Klaar voor de toekomst?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl mb-8 opacity-90">
              Sluit je aan bij 500+ Nederlandse bedrijven die AI-group.nl vertrouwen
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact">
                <Button size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-xl mr-4">
                  Neem contact op
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white">
                  Ontdek GenPostAI
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}