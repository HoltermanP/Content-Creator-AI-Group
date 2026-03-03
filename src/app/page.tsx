"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Users,
  Calendar,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Target,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

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

  // Generate particles only on client-side to prevent hydration mismatch
  useEffect(() => {
    const particleArray = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3000}ms`,
      duration: `${2000 + Math.random() * 2000}ms`
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 relative overflow-hidden">
      {/* Moving background image at the top */}
      <div className="absolute top-0 left-0 w-full h-[90vh] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 opacity-90 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzk4N2JmYSIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxMjApIj4KPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iNDAiIGZpbGw9ImluaGVyaXQiLz4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjEiIGZpbGw9ImluaGVyaXQiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPgo8L2c+Cjwvc3ZnPg==')] animate-pulse"></div>
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-pink-400/25 to-red-600/25 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        {/* Moving particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white/60 rounded-full animate-float"></div>
          <div className="absolute top-40 right-40 w-1 h-1 bg-white/40 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-60 left-60 w-1.5 h-1.5 bg-white/50 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-60 right-20 w-1 h-1 bg-white/30 rounded-full animate-float animation-delay-3000"></div>
        </div>
      </div>
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
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                GenPostAI
              </span>
              <Badge variant="secondary" className="text-xs w-fit">AI-group.nl</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Inloggen</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Start nu - €14,95/maand</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center py-20 px-4 relative z-10 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          {/* Primary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40"></div>

          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/18 to-blue-400/18 rounded-full blur-3xl animate-float animation-delay-1000"></div>

          {/* Particle system */}
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-white/40 rounded-full animate-float`}
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-left"
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
                    🚀 AI-first platform
                  </Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20">
                    Onderdeel van AI-group.nl
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                  Transformeer je{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                      LinkedIn Presence
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-purple-300/20 to-pink-300/20 blur-xl animate-pulse"></div>
                  </span>{" "}
                  met AI
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl drop-shadow-md">
                  Genereer professionele LinkedIn content in minuten. Van storyline series tot engagement posts - powered by geavanceerde AI voor Nederlandse bedrijven.
                </p>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-8">
                  <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
                    <span className="font-semibold text-white">Onderdeel van AI-group.nl</span> - Dé specialist in AI-oplossingen voor het Nederlandse bedrijfsleven met bewezen track record sinds 2020.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/auth/signup">
                  <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-50 hover:to-white shadow-2xl shadow-black/30 hover:shadow-black/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 font-semibold">
                    Start nu - €14,95/maand
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/15 text-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                    <Play className="mr-2 h-5 w-5" />
                    Bekijk demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "⚡", text: "Direct toegang" },
                  { icon: "🎯", text: "Alle features" },
                  { icon: "🛡️", text: "30 dagen garantie" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white/90 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main AI Visualization */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                  {/* Outer rotating rings */}
                  <div className="absolute inset-0 border-2 border-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-4 border border-gradient-to-r from-cyan-400/30 via-blue-400/30 to-indigo-400/30 rounded-full animate-spin-reverse"></div>

                  {/* Central core */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-pink-500/30 rounded-full animate-pulse"></div>
                    <div className="absolute inset-6 bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full animate-bounce-slow backdrop-blur-sm">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-16 w-16 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Floating feature icons */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center animate-float shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center animate-float animation-delay-1000 shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center animate-float animation-delay-2000 shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center animate-float animation-delay-3000 shadow-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>

                  {/* Data flow connections */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-pulse animation-delay-1000"></div>
                    <div className="absolute left-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-pink-400/60 to-transparent animate-pulse animation-delay-2000"></div>
                    <div className="absolute right-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent animate-pulse animation-delay-3000"></div>
                  </div>
                </div>

                {/* Floating stats cards */}
                <div className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100+</div>
                    <div className="text-xs text-white/80">Bedrijven</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1K+</div>
                    <div className="text-xs text-white/80">Posts gegenereerd</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transition section for smooth color blending */}
      <div className="h-32 bg-gradient-to-b from-slate-50/30 via-blue-50/50 to-white"></div>

      {/* Content Strategy Preview */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Content Strategieën</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              📊 Bewezen content format dat werkt
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kies uit professionele content formaten die engagement stimuleren en je thought leadership versterken
            </motion.p>
          </motion.div>

          {/* Circular Template Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central connecting circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full border-4 border-white shadow-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-xs font-bold text-gray-700">Templates</div>
              </div>
            </div>

            {/* Template circles arranged in a circle */}
            <div className="relative h-96 md:h-[500px]">
              {[
                {
                  icon: "🎭",
                  title: "Storyline Serie",
                  description: "Verhaal in delen voor diepe connecties",
                  gradient: "from-blue-500 to-cyan-500",
                  position: "top-0 left-1/2 transform -translate-x-1/2 -translate-y-8",
                  examples: [
                    { text: "Dag 1: Het probleem", icon: "🔍" },
                    { text: "Dag 2: De oplossing", icon: "💡" }
                  ],
                  stats: "3x engagement"
                },
                {
                  icon: "💬",
                  title: "Engagement Thread",
                  description: "Start discussies en bouw community",
                  gradient: "from-purple-500 to-pink-500",
                  position: "top-1/4 right-0 transform translate-x-8 -translate-y-1/2",
                  examples: [
                    { text: "Strategische vraag", icon: "❓" },
                    { text: "Waardevolle inzichten", icon: "🎯" }
                  ],
                  stats: "5x reacties"
                },
                {
                  icon: "📰",
                  title: "Nieuws Update",
                  description: "Breaking news en ontwikkelingen",
                  gradient: "from-green-500 to-emerald-500",
                  position: "bottom-1/4 right-0 transform translate-x-8 translate-y-1/2",
                  examples: [
                    { text: "Marktontwikkelingen", icon: "📊" },
                    { text: "Expert insights", icon: "🔮" }
                  ],
                  stats: "2x shares"
                },
                {
                  icon: "💼",
                  title: "Case Study",
                  description: "Resultaten en klantverhalen delen",
                  gradient: "from-indigo-500 to-blue-500",
                  position: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8",
                  examples: [
                    { text: "Voor & na verhaal", icon: "📈" },
                    { text: "Concrete resultaten", icon: "✅" }
                  ],
                  stats: "4x leads"
                },
                {
                  icon: "💡",
                  title: "Expert Tip",
                  description: "Praktische tips en advies delen",
                  gradient: "from-orange-500 to-red-500",
                  position: "bottom-1/4 left-0 transform -translate-x-8 translate-y-1/2",
                  examples: [
                    { text: "Praktische tip", icon: "💡" },
                    { text: "Stapsgewijze aanpak", icon: "📝" }
                  ],
                  stats: "6x saves"
                },
                {
                  icon: "🎯",
                  title: "Industry Insight",
                  description: "Trends en marktontwikkelingen",
                  gradient: "from-teal-500 to-green-500",
                  position: "top-1/4 left-0 transform -translate-x-8 -translate-y-1/2",
                  examples: [
                    { text: "Toekomst trends", icon: "🔮" },
                    { text: "Markt analyse", icon: "📊" }
                  ],
                  stats: "3x reach"
                }
              ].map((template, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className={`absolute ${template.position} group`}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    {/* Main circular template */}
                    <div className={`w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br ${template.gradient} rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 border-4 border-white group-hover:border-gray-200`}>
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                        <div className="text-3xl md:text-4xl mb-2">{template.icon}</div>
                        <h3 className="text-sm md:text-base font-bold mb-1 leading-tight">{template.title}</h3>
                        <p className="text-xs opacity-90 leading-tight">{template.description}</p>
                      </div>

                      {/* Glow effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    </div>

                    {/* Stats badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-100">
                      <div className="text-xs font-bold text-gray-700">{template.stats}</div>
                    </div>

                    {/* Connecting line to center */}
                    <div className={`absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r ${template.gradient} transform -translate-x-1/2 -translate-y-1/2 ${
                      index === 0 ? 'rotate-0' :
                      index === 1 ? 'rotate-60' :
                      index === 2 ? 'rotate-120' :
                      index === 3 ? 'rotate-180' :
                      index === 4 ? '-rotate-120' :
                      '-rotate-60'
                    } origin-left opacity-60`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/50 shadow-lg max-w-2xl mx-auto">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Meer dan 20 content templates</h3>
              <p className="text-gray-600 mb-6">
                Van thought leadership posts tot klantcase studies - allemaal geoptimaliseerd voor maximale engagement
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Storyline Series", "Expert Insights", "Industry News", "Case Studies", "Tips & Tricks"].map((template, i) => (
                  <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {template}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Image Generation */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-float animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400/6 to-blue-400/6 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">AI Afbeeldingen</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              🎨 Professionele afbeeldingen in seconden
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              GenPostAI genereert automatisch professionele afbeeldingen die perfect passen bij je content.
              Van sociale media graphics tot infographics - alles met één klik.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "🖼️",
                title: "Social Media Graphics",
                description: "Eye-catchy visuals voor LinkedIn posts die onmiddellijk aandacht trekken",
                gradient: "from-blue-500 to-cyan-500",
                features: [
                  { icon: "🎨", text: "Custom branding & kleuren" },
                  { icon: "📱", text: "Responsive design" },
                  { icon: "⚡", text: "Instant generatie" }
                ],
                stats: "3x meer engagement"
              },
              {
                icon: "📊",
                title: "Infographics & Charts",
                description: "Transformeer complexe data in begrijpelijke en aantrekkelijke visuals",
                gradient: "from-purple-500 to-pink-500",
                features: [
                  { icon: "📈", text: "Data visualisatie" },
                  { icon: "📋", text: "Chart templates" },
                  { icon: "🏢", text: "Professionele layouts" }
                ],
                stats: "5x meer shares"
              },
              {
                icon: "🎯",
                title: "Brand Consistent",
                description: "Altijd perfect passend bij je huisstijl en merkidentiteit",
                gradient: "from-green-500 to-emerald-500",
                features: [
                  { icon: "🎨", text: "Kleur matching" },
                  { icon: "🏷️", text: "Logo integratie" },
                  { icon: "✨", text: "Stijl consistentie" }
                ],
                stats: "100% merkconsistent"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${feature.gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                      <div className="text-4xl mb-3">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/5 rounded-full blur-md"></div>
                  </div>

                  <CardContent className="p-6">
                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {feature.features.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-lg border border-gray-100 hover:bg-gray-100/80 transition-colors">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-sm">{item.icon}</span>
                          </div>
                          <span className="text-sm text-gray-700 font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{feature.stats}</div>
                          <div className="text-xs text-gray-600">Prestatie verbetering</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Visual Demo Section */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-200/50 shadow-xl">
              <div className="text-center mb-16">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Van tekst naar professionele visual</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Beschrijf wat je wilt zien en onze AI genereert binnen seconden een professionele afbeelding
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <span className="font-semibold text-gray-900">Beschrijf je afbeelding</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">"Genereer een professionele LinkedIn graphic over AI in het bedrijfsleven voor een consultancy bedrijf"</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">2</span>
                      </div>
                      <span className="font-semibold text-gray-900">AI genereert instant</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">Onze AI creëert een professionele visual met je branding, kleuren en boodschap</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">3</span>
                      </div>
                      <span className="font-semibold text-gray-900">Direct klaar voor publicatie</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">Download je afbeelding en plaats hem direct op LinkedIn</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                    <img
                      src="/ai-generated-graphic.svg"
                      alt="AI Generated Professional LinkedIn Graphic"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-gray-200">
                        <div className="text-xs font-medium text-gray-900">AI Generated</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      ⚡ Binnen 10 seconden klaar
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">Succesverhalen</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              💼 Klantverhalen & transformaties
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek hoe Nederlandse bedrijven hun LinkedIn presence transformeren met GenPostAI
            </motion.p>
          </motion.div>

          {/* Story Carousel */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  customer: "Consultancy bedrijf",
                  industry: "IT Consultancy",
                  journey: "Snelle groei in consultancy markt",
                  challenge: "Als snelgroeiende IT-consultancy hadden we geen tijd voor content creatie, maar wilden we wel thought leadership tonen op LinkedIn.",
                  solution: "GenPostAI genereert wekelijks 15 posts die onze technische expertise tonen en kwalitatieve leads genereren.",
                  results: [
                    { metric: "85%", label: "meer profile views" },
                    { metric: "120%", label: "meer connection requests" },
                    { metric: "€45K", label: "extra pipeline" }
                  ],
                  quote: "\"De AI helpt ons consistent goede content te maken. Het bespaart veel tijd in onze drukke agenda.\"",
                  avatar: "TF",
                  plan: "Premium",
                  testimonialIcon: "🚀",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  customer: "Medisch zorgbedrijf",
                  industry: "Healthcare",
                  journey: "Betere communicatie met patiënten",
                  challenge: "We wilden patiënten en verwijzers beter informeren over medische innovaties en onze expertise delen.",
                  solution: "Educatieve content over medische ontwikkelingen met AI-generatie en patiëntgerichte verhalen.",
                  results: [
                    { metric: "65%", label: "meer website traffic" },
                    { metric: "35%", label: "hogere patiënttevredenheid" },
                    { metric: "25%", label: "meer arts-verwijzingen" }
                  ],
                  quote: "\"Patiënten waarderen onze transparante communicatie over nieuwe behandelingen en voelen zich beter geïnformeerd.\"",
                  avatar: "MC",
                  plan: "Ultimate",
                  testimonialIcon: "🏥",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  customer: "Algemene financiële instantie",
                  industry: "Financial Services",
                  journey: "Sterkere positie in financiële markt",
                  challenge: "We wilden onze financiële expertise delen maar hadden geen consistent content plan voor thought leadership.",
                  solution: "Automated content calendar met marktinzichten, economische analyses en klantcase studies.",
                  results: [
                    { metric: "2x", label: "meer speaking opportunities" },
                    { metric: "180%", label: "meer nieuwe leningen" },
                    { metric: "85%", label: "meer social engagement" }
                  ],
                  quote: "\"Onze partners zien ons nu als de experts in digitale financiële transformatie. De resultaten zijn indrukwekkend.\"",
                  avatar: "FF",
                  plan: "Ultimate",
                  testimonialIcon: "💰",
                  gradient: "from-purple-500 to-pink-500"
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group-hover:border-blue-200">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-r ${story.gradient} p-6 text-white relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-14 w-14 border-2 border-white/30">
                              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                                {story.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-lg">{story.customer}</h3>
                              <p className="text-white/90 text-sm">{story.industry}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                            {story.plan}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{story.testimonialIcon}</span>
                          <h4 className="text-lg font-semibold">{story.journey}</h4>
                        </div>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>
                    </div>

                    <CardContent className="p-6 space-y-6">
                      {/* Challenge */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 font-bold text-sm">!</span>
                          </div>
                          <h5 className="font-semibold text-red-700">Uitdaging</h5>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed pl-10">{story.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Zap className="h-4 w-4 text-blue-600" />
                          </div>
                          <h5 className="font-semibold text-blue-700">Oplossing</h5>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed pl-10">{story.solution}</p>
                      </div>

                      {/* Results */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <h5 className="font-semibold text-green-700">Resultaten</h5>
                        </div>
                        <div className="pl-10">
                          <div className="grid grid-cols-1 gap-2">
                            {story.results.map((result, i) => (
                              <div key={i} className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                                <span className="font-bold text-green-800 text-sm">{result.metric}</span>
                                <span className="text-xs text-green-700">{result.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className={`bg-gradient-to-r ${story.gradient} p-4 rounded-xl border border-white/20 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white/10"></div>
                        <div className="relative z-10">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-sm">"</span>
                            </div>
                            <div>
                              <p className="text-sm text-white/95 italic leading-relaxed">{story.quote}</p>
                              <p className="text-xs text-white/80 mt-2 font-medium">- {story.customer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/50 shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Word onze volgende successtory</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Sluit je aan bij deze succesvolle bedrijven en transformeer ook jouw LinkedIn presence met AI
                </p>
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Start je transformatie
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-200/15 to-pink-300/15 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-100/10 to-blue-200/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Stapsgewijze workflow</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              ⚡ Hoe GenPostAI werkt
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Van eerste idee tot viral LinkedIn post - in slechts 5 eenvoudige stappen transformeer je je content strategie
            </motion.p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Connection line */}
                <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-300 to-indigo-300"></div>
                <div className="absolute top-20 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent blur-sm"></div>

                <div className="grid grid-cols-5 gap-8">
                  {[
                    {
                      step: "1",
                      title: "Bedrijf instellen",
                      description: "Vertel GenPostAI over je bedrijf, doelgroep en merkstem",
                      icon: "🏢",
                      color: "from-blue-500 to-blue-600",
                      bgColor: "from-blue-50 to-blue-100",
                      details: ["Bedrijfsprofiel aanmaken", "Merkstem definiëren", "Doelgroep specificeren"]
                    },
                    {
                      step: "2",
                      title: "Content plannen",
                      description: "Kies onderwerp, strategie en toon voor je volgende post",
                      icon: "🎯",
                      color: "from-purple-500 to-purple-600",
                      bgColor: "from-purple-50 to-purple-100",
                      details: ["Content strategie kiezen", "Onderwerp bepalen", "Tone instellen"]
                    },
                    {
                      step: "3",
                      title: "AI genereren",
                      description: "Onze AI creëert professionele content op maat",
                      icon: "🤖",
                      color: "from-indigo-500 to-indigo-600",
                      bgColor: "from-indigo-50 to-indigo-100",
                      details: ["AI content generatie", "Meerdere varianten", "Brand consistent"]
                    },
                    {
                      step: "4",
                      title: "Bewerken & optimaliseren",
                      description: "Pas aan, voeg hashtags toe en optimaliseer voor engagement",
                      icon: "✨",
                      color: "from-pink-500 to-pink-600",
                      bgColor: "from-pink-50 to-pink-100",
                      details: ["Content bewerken", "Hashtags toevoegen", "SEO optimalisatie"]
                    },
                    {
                      step: "5",
                      title: "Publiceren & analyseren",
                      description: "Deel op LinkedIn en bekijk performance metrics",
                      icon: "🚀",
                      color: "from-green-500 to-green-600",
                      bgColor: "from-green-50 to-green-100",
                      details: ["Direct publiceren", "Planning functie", "Analytics dashboard"]
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      className="text-center group"
                    >
                      <div className="relative">
                        {/* Step number with gradient background */}
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl mb-6 shadow-lg shadow-black/10 group-hover:shadow-xl group-hover:shadow-black/20 transition-all duration-500 group-hover:scale-110 relative z-10`}>
                          <span className="text-2xl font-bold text-white">{step.step}</span>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500`}></div>
                        </div>

                        {/* Main card */}
                        <div className={`bg-gradient-to-br ${step.bgColor} border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full backdrop-blur-sm`}>
                          {/* Icon with animation */}
                          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                            {step.icon}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                            {step.title}
                          </h3>

                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Additional details */}
                          <ul className="text-sm text-gray-600 space-y-1">
                            {step.details.map((detail, i) => (
                              <li key={i} className="flex items-center">
                                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${step.color} rounded-full mr-2`}></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Arrow connector for desktop */}
                        {index < 4 && (
                          <div className="hidden lg:block absolute top-20 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 ml-4 z-0">
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full shadow-sm">
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden">
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Bedrijf instellen",
                    description: "Vertel GenPostAI over je bedrijf, doelgroep en merkstem",
                    icon: "🏢",
                    color: "from-blue-500 to-blue-600",
                    bgColor: "from-blue-50 to-blue-100",
                    details: ["Bedrijfsprofiel aanmaken", "Merkstem definiëren", "Doelgroep specificeren"]
                  },
                  {
                    step: "2",
                    title: "Content plannen",
                    description: "Kies onderwerp, strategie en toon voor je volgende post",
                    icon: "🎯",
                    color: "from-purple-500 to-purple-600",
                    bgColor: "from-purple-50 to-purple-100",
                    details: ["Content strategie kiezen", "Onderwerp bepalen", "Tone instellen"]
                  },
                  {
                    step: "3",
                    title: "AI genereren",
                    description: "Onze AI creëert professionele content op maat",
                    icon: "🤖",
                    color: "from-indigo-500 to-indigo-600",
                    bgColor: "from-indigo-50 to-indigo-100",
                    details: ["AI content generatie", "Meerdere varianten", "Brand consistent"]
                  },
                  {
                    step: "4",
                    title: "Bewerken & optimaliseren",
                    description: "Pas aan, voeg hashtags toe en optimaliseer voor engagement",
                    icon: "✨",
                    color: "from-pink-500 to-pink-600",
                    bgColor: "from-pink-50 to-pink-100",
                    details: ["Content bewerken", "Hashtags toevoegen", "SEO optimalisatie"]
                  },
                  {
                    step: "5",
                    title: "Publiceren & analyseren",
                    description: "Deel op LinkedIn en bekijk performance metrics",
                    icon: "🚀",
                    color: "from-green-500 to-green-600",
                    bgColor: "from-green-50 to-green-100",
                    details: ["Direct publiceren", "Planning functie", "Analytics dashboard"]
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="flex items-start gap-4">
                      {/* Step indicator */}
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg shadow-black/10 relative z-10`}>
                          <span className="text-lg font-bold text-white">{step.step}</span>
                        </div>
                        {index < 4 && (
                          <div className="w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-200 mt-4"></div>
                        )}
                      </div>

                      {/* Content card */}
                      <div className={`bg-gradient-to-br ${step.bgColor} border border-white/50 rounded-2xl p-6 shadow-lg flex-1 hover:shadow-xl transition-all duration-300`}>
                        <div className="text-3xl mb-3">{step.icon}</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-700 mb-3 leading-relaxed">{step.description}</p>

                        <ul className="text-sm text-gray-600 space-y-1">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-center">
                              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${step.color} rounded-full mr-2`}></div>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto hover:shadow-2xl transition-all duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
                  <div className="text-4xl">⚡</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Eenvoudig & Efficiënt</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Van concept tot gepubliceerde post - professioneel en eenvoudig. Begin vandaag nog met je eerste post.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/demo">
                    <Button size="lg" variant="outline" className="px-8 py-3 border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <Play className="mr-2 h-5 w-5" />
                      Bekijk demo
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="lg" className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                      Start nu gratis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-indigo-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
              <span className="text-sm font-medium text-gray-700">Transparante prijzen</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              💰 Kies het perfecte plan voor jouw bedrijf
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van startup tot enterprise - wij hebben het juiste plan voor elke fase van je bedrijfsgroei
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Plus",
                subtitle: "Perfect voor starters",
                price: "€14,95",
                period: "/maand",
                credits: "50 credits",
                savings: "",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50/80 to-cyan-50/80",
                features: [
                  { icon: "🏢", text: "2 bedrijven beheren", highlight: false },
                  { icon: "🤖", text: "AI content generatie", highlight: false },
                  { icon: "📝", text: "5 LinkedIn content methodes", highlight: false },
                  { icon: "📋", text: "Template systeem", highlight: false },
                  { icon: "📅", text: "Content kalender", highlight: false },
                  { icon: "📧", text: "Email notificaties", highlight: false }
                ],
                cta: "Start met Plus",
                popular: false
              },
              {
                name: "Premium",
                subtitle: "Meest gekozen door groeiende bedrijven",
                price: "€24,95",
                period: "/maand",
                credits: "250 credits",
                savings: "€150 korting per jaar",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50/80 to-pink-50/80",
                aiAgent: {
                  title: "Persoonlijke AI-assistent",
                  description: "Strategisch advies voor content en optimalisatie"
                },
                features: [
                  { icon: "🏢", text: "5 bedrijven beheren", highlight: true },
                  { icon: "🤖", text: "Alles van Plus", highlight: false },
                  { icon: "🧠", text: "AI-Agent ondersteuning", highlight: true },
                  { icon: "📊", text: "Analytics dashboard", highlight: true },
                  { icon: "👥", text: "Team management", highlight: false },
                  { icon: "🧪", text: "A/B testing", highlight: false }
                ],
                cta: "Kies Premium",
                popular: true
              },
              {
                name: "Ultimate",
                subtitle: "Voor grote organisaties",
                price: "€39,95",
                period: "/maand",
                credits: "1000 credits",
                savings: "€300 korting per jaar",
                gradient: "from-indigo-500 to-purple-500",
                bgGradient: "from-indigo-50/80 to-purple-50/80",
                aiAgent: {
                  title: "Geavanceerde AI-assistent",
                  description: "Strategisch advies en marktinzichten"
                },
                features: [
                  { icon: "🏢", text: "10 bedrijven beheren", highlight: true },
                  { icon: "🤖", text: "Alles van Premium", highlight: false },
                  { icon: "🎯", text: "Uitgebreide AI-Agent", highlight: true },
                  { icon: "⭐", text: "Priority support", highlight: true },
                  { icon: "🏷️", text: "White-label optie", highlight: false },
                  { icon: "🔌", text: "API toegang", highlight: false },
                  { icon: "🔧", text: "Custom integraties", highlight: false }
                ],
                cta: "Kies Ultimate",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="group"
              >
                <Card className={`h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative ${plan.popular ? 'ring-2 ring-purple-400 shadow-purple-200/50' : ''}`}>
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-20">
                      <Badge className="bg-yellow-100 text-purple-800 border-3 border-purple-400 px-3 py-0.5 shadow-xl font-bold text-sm">
                        🔥 Meest gekozen
                      </Badge>
                    </div>
                  )}

                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${plan.gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold">{plan.name}</h3>
                          <p className="text-white/90 text-sm">{plan.subtitle}</p>
                        </div>
                        {plan.savings && (
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {plan.savings}
                          </Badge>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="text-4xl font-bold">{plan.price}</div>
                        <div className="text-white/90 text-sm">{plan.period}</div>
                        <div className="text-white/80 text-xs mt-1">{plan.credits} per maand</div>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full blur-md"></div>
                  </div>

                  <CardContent className="p-6">
                    {/* AI Agent section */}
                    {plan.aiAgent && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-purple-800">{plan.aiAgent.title}</div>
                            <div className="text-xs text-purple-600">{plan.aiAgent.description}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${feature.highlight ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' : 'bg-gray-50/80'}`}>
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-sm">{feature.icon}</span>
                          </div>
                          <span className={`text-sm font-medium ${feature.highlight ? 'text-green-800' : 'text-gray-700'}`}>
                            {feature.text}
                          </span>
                          {feature.highlight && (
                            <div className="ml-auto">
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                Pro
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
          {/* Animated shapes */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-float animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <span className="text-sm font-medium text-white">🚀 Start vandaag nog</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Transformeer je LinkedIn
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Presence in Minuten
                </span>
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Sluit je aan bij 100+ Nederlandse bedrijven die hun content strategie hebben gerevolutioneerd met AI
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { number: "100+", label: "Bedrijven" },
                { number: "1K+", label: "Posts gegenereerd" },
                { number: "300%", label: "Gemiddelde groei" },
                { number: "5★", label: "Klanttevredenheid" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/auth/signup">
                <Button size="lg" className="text-xl px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-50 hover:to-white shadow-2xl shadow-black/30 hover:shadow-black/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 font-bold border-2 border-white/30">
                  Start nu - €14,95/maand
                  <ArrowRight className="ml-2 h-6 w-6 text-blue-600" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-xl px-8 py-4 border-2 border-white/40 bg-white/5 backdrop-blur-sm hover:bg-white/15 text-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
                  <Play className="mr-2 h-6 w-6" />
                  Bekijk gratis demo
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Direct toegang tot alle features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Professionele AI ondersteuning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">24/7 klantenservice</span>
                </div>
              </div>

              {/* Company logos placeholder */}
              <div className="flex items-center gap-8 opacity-60">
                <div className="text-sm">Vertrouwd door bedrijven als:</div>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-8 bg-white/20 rounded border border-white/30 flex items-center justify-center">
                      <span className="text-xs text-white/60">Logo {i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-transparent"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse border-2 border-gray-900"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    GenPostAI
                  </span>
                  <span className="text-sm text-gray-400">Onderdeel van AI-group.nl</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Revolutionaire AI-powered content creation voor Nederlandse bedrijven die hun LinkedIn presence naar een hoger niveau willen tillen.
              </p>

              {/* Social proof stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-sm text-gray-400">Bedrijven</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-2xl font-bold text-white">1K+</div>
                  <div className="text-sm text-gray-400">Posts</div>
                </div>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-white">Product</h3>
              <ul className="space-y-3">
                {[
                  { name: "Features", href: "/features" },
                  { name: "Prijzen", href: "#pricing" },
                  { name: "Templates", href: "/templates" },
                  { name: "Demo", href: "/demo" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-white">Ondersteuning</h3>
              <ul className="space-y-3">
                {[
                  { name: "Help Center", href: "/contact" },
                  { name: "Contact", href: "/contact" },
                  { name: "Email Support", href: "mailto:support@ai-group.nl" },
                  { name: "Status Page", href: "/contact" }
                ].map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('mailto:') ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Resources */}
            <div>
              <h3 className="font-bold text-lg mb-6 text-white">Bedrijf</h3>
              <ul className="space-y-3">
                {[
                  { name: "Over AI-group.nl", href: "/over" },
                  { name: "LinkedIn Tips", href: "/linkedin-tips" },
                  { name: "Partners", href: "/contact" },
                  { name: "Nieuws", href: "/over" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-2xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-4 text-white">Blijf op de hoogte</h3>
              <p className="text-gray-300 mb-6">
                Ontvang de nieuwste LinkedIn tips, AI-updates en exclusieve content strategieën
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Je email adres"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                  Aanmelden
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

          {/* Bottom section */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center lg:text-left">
              <p className="text-gray-400">© 2025 GenPostAI - Onderdeel van AI-group.nl</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Made with</span>
                <span className="text-red-400">♥</span>
                <span>for Dutch businesses</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/privacy" },
                { name: "GDPR", href: "/privacy" }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
