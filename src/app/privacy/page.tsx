"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Eye, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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
                  <Shield className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Privacybeleid
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Je privacy is belangrijk voor ons. Lees hoe wij je gegevens beschermen en gebruiken.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welke gegevens verzamelen wij?</h2>
                    <p className="text-gray-600">
                      Om GenPostAI goed te laten werken, hebben we bepaalde informatie nodig. We verzamelen alleen wat noodzakelijk is.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Accountgegevens</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Naam en e-mailadres voor account aanmaken</li>
                      <li>• Bedrijfsnaam en branche voor gepersonaliseerde content</li>
                      <li>• Profielfoto (optioneel)</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">Gebruiksgegevens</h3>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Welke features je gebruikt en hoe vaak</li>
                      <li>• Content die je genereert (voor verbetering van onze AI)</li>
                      <li>• LinkedIn posts die je publiceert via ons platform</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Hoe beschermen wij je gegevens?</h2>
                    <p className="text-gray-600">
                      Jouw gegevens zijn veilig bij ons. We gebruiken moderne beveiligingsmaatregelen.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">Versleutelde dataopslag</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">SSL/TLS encryptie</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">Regelmatige beveiligingsaudits</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">Toegang op basis van rol</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">Automatische back-ups</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">✓</span>
                      </div>
                      <span className="text-sm">GDPR compliant</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Contact & rechten</h2>
                    <p className="text-gray-600">
                      Je hebt altijd controle over je gegevens en kunt contact met ons opnemen.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Je rechten</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Recht op inzage van je gegevens</li>
                        <li>• Recht op correctie van onjuiste gegevens</li>
                        <li>• Recht op verwijdering (recht om vergeten te worden)</li>
                      </ul>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Recht op beperking van verwerking</li>
                        <li>• Recht op overdraagbaarheid</li>
                        <li>• Recht van bezwaar tegen verwerking</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Neem contact met ons op</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        <strong>E-mail:</strong>{" "}
                        <a href="mailto:privacy@ai-group.nl" className="text-blue-600 hover:underline">
                          privacy@ai-group.nl
                        </a>
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Adres:</strong> AI-group.nl, [Adres], Nederland
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Reactietijd:</strong> Wij streven ernaar binnen 30 dagen te reageren op privacy gerelateerde vragen.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Back to top */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Terug naar GenPostAI
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}