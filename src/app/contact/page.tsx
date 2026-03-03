"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
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
                  <MessageSquare className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
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
                📞 Neem contact met ons op
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Laten we{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  praten
                </span>{" "}
                over jouw AI-toekomst
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Of je nu vragen hebt over GenPostAI, advies wilt over AI-implementatie, of gewoon wilt praten over de toekomst - wij horen graag van je.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
          >
            {[
              {
                icon: Mail,
                title: "E-mail",
                description: "Stuur ons een bericht",
                contact: "info@ai-group.nl",
                response: "Binnen 24 uur",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Phone,
                title: "Telefoon",
                description: "Bel ons direct",
                contact: "+31 (0)20 123 4567",
                response: "Ma-Vr 9:00-17:00",
                color: "from-green-500 to-green-600"
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                description: "Chat met onze AI-assistent",
                contact: "24/7 beschikbaar",
                response: "Direct",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: MapPin,
                title: "Bezoekadres",
                description: "Kom langs op kantoor",
                contact: "Amsterdam, Nederland",
                response: "Op afspraak",
                color: "from-orange-500 to-orange-600"
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900 mb-2">{method.contact}</p>
                    <p className="text-sm text-gray-600">{method.response}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form Placeholder */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">Stuur ons een bericht</CardTitle>
                  <CardDescription>
                    Vertel ons over je uitdagingen en hoe wij kunnen helpen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Form would go here - placeholder for now */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                      <Send className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Contactformulier</h3>
                      <p className="text-blue-700 mb-4">
                        Ons contactformulier wordt binnenkort gelanceerd. In de tussentijd kun je ons bereiken via:
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <strong>E-mail:</strong>{" "}
                          <a href="mailto:info@ai-group.nl" className="text-blue-600 hover:underline">
                            info@ai-group.nl
                          </a>
                        </p>
                        <p className="text-sm">
                          <strong>Telefoon:</strong>{" "}
                          <a href="tel:+310201234567" className="text-blue-600 hover:underline">
                            +31 (0)20 123 4567
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              🤔 Veelgestelde vragen
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Snelle antwoorden op de meest gestelde vragen
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Hoe snel kan ik starten met GenPostAI?",
                answer: "Direct! Na aanmelding heb je binnen 5 minuten toegang tot je dashboard. Geen installatie nodig, werkt in je browser."
              },
              {
                question: "Ondersteunen jullie ook grote bedrijven?",
                answer: "Absoluut! We hebben speciale enterprise oplossingen met dedicated support, custom integraties en white-label opties."
              },
              {
                question: "Kan ik mijn data migreren van andere tools?",
                answer: "Ja, we helpen je graag met het migreren van je bestaande content en data. Neem contact op voor een persoonlijk migratieplan."
              },
              {
                question: "Wat als ik niet tevreden ben?",
                answer: "We bieden 30 dagen geld-terug-garantie. Als het niet werkt zoals verwacht, krijg je je geld terug. Geen vragen gesteld."
              },
              {
                question: "Hebben jullie Nederlandse support?",
                answer: "Jazeker! Ons hele team spreekt Nederlands en begrijpt de Nederlandse markt. Support is beschikbaar van ma-vr 9:00-17:00."
              },
              {
                question: "Kan ik GenPostAI uitproberen voordat ik betaal?",
                answer: "Natuurlijk! Start je gratis proefperiode en ontdek zelf of GenPostAI bij je past. Geen creditcard nodig."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-600 font-bold text-sm">?</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3 text-gray-900">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Openingstijden</CardTitle>
                      <CardDescription>Wanneer je ons kunt bereiken</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maandag - Vrijdag</span>
                      <span className="font-semibold">9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Zaterdag</span>
                      <span className="font-semibold">Gesloten</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Zondag</span>
                      <span className="font-semibold">Gesloten</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Spoedeisende zaken</span>
                      <span className="font-semibold text-green-600">24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Support Levels</CardTitle>
                      <CardDescription>Afhankelijk van je abonnement</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Plus</span>
                        <Badge variant="outline">Standaard</Badge>
                      </div>
                      <p className="text-sm text-gray-600">E-mail support binnen 24 uur</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Premium</span>
                        <Badge>Meest gekozen</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Prioriteit support binnen 12 uur + live chat</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Ultimate</span>
                        <Badge variant="secondary">Enterprise</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Dedicated account manager + telefoon support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
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
              Start vandaag nog met je gratis proefperiode of neem contact op voor een demo
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                  Start gratis proefperiode
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white">
                  Bekijk demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}