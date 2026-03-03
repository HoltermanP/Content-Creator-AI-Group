import { motion } from "framer-motion";
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
                  <Scale className="h-4 w-4 text-transparent bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text" />
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
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Algemene Voorwaarden
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              De regels en afspraken voor het gebruik van GenPostAI
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">1. Algemene bepalingen</h2>
                    <p className="text-gray-600">
                      Deze algemene voorwaarden zijn van toepassing op alle diensten van GenPostAI.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">1.1 Dienstverlening</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      GenPostAI is een AI-powered platform voor het genereren van LinkedIn content. Wij bieden verschillende abonnementen aan met verschillende features en limieten.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">1.2 Overeenkomst</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Door je aan te melden voor GenPostAI ga je akkoord met deze algemene voorwaarden. De overeenkomst wordt aangegaan voor minimaal 1 maand.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">1.3 Prijzen</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Alle prijzen zijn inclusief BTW. Wij behouden ons het recht voor prijzen aan te passen met 30 dagen van tevoren schriftelijke kennisgeving.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">2. Gebruiksvoorwaarden</h2>
                    <p className="text-gray-600">
                      Wat je wel en niet mag doen met GenPostAI
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-700">✅ Toegestaan</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Professionele LinkedIn content genereren</li>
                      <li>• Content gebruiken voor zakelijke doeleinden</li>
                      <li>• Account delen met teamleden (Premium/Ultimate)</li>
                      <li>• Feedback geven voor verbetering</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-red-700">❌ Niet toegestaan</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Illegale of schadelijke content genereren</li>
                      <li>• Misbruik van AI voor spam</li>
                      <li>• Account delen buiten je bedrijf</li>
                      <li>• Reverse engineering van onze systemen</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Belangrijke waarschuwing</h4>
                      <p className="text-sm text-yellow-700">
                        GenPostAI is ontworpen voor professionele LinkedIn content. Wij zijn niet verantwoordelijk voor misbruik van gegenereerde content.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Scale className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">3. Intellectueel eigendom</h2>
                    <p className="text-gray-600">
                      Wie eigenaar is van welke content
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Jouw content</h3>
                    <p className="text-sm text-blue-800">
                      Alle content die je uploadt of invoert blijft jouw eigendom. Je geeft ons alleen toestemming om deze te gebruiken voor het leveren van onze dienst.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">Gegenereerde content</h3>
                    <p className="text-sm text-purple-800">
                      De door AI gegenereerde content is voor jou om te gebruiken zoals je wilt. Je bent verantwoordelijk voor het naleven van LinkedIn's regels.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">Ons platform</h3>
                    <p className="text-sm text-gray-800">
                      Het GenPostAI platform, inclusief de AI-modellen, blijft ons eigendom. Je mag het platform gebruiken volgens je abonnement, maar niet kopiëren of verspreiden.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">4. Beëindiging & opzegging</h2>
                    <p className="text-gray-600">
                      Wanneer en hoe de overeenkomst kan eindigen
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">4.1 Opzegging door jou</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Je kunt je abonnement maandelijks opzeggen via je dashboard. Er is geen opzegtermijn, maar je betaalt altijd voor de huidige maand.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">4.2 Beëindiging door ons</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Wij kunnen de overeenkomst direct beëindigen bij schending van deze voorwaarden of illegaal gebruik. Je ontvangt dan een schriftelijke waarschuwing.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">4.3 Gevolgen van beëindiging</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Bij beëindiging verlies je toegang tot je account. Je kunt je data downloaden binnen 30 dagen na beëindiging.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Scale className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">5. Aansprakelijkheid & garantie</h2>
                    <p className="text-gray-600">
                      Wat je kunt verwachten van onze dienst
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">Service Level Agreement</h3>
                    <p className="text-sm text-green-800">
                      Wij garanderen 99.5% uptime voor ons platform. Bij langdurige uitval bieden wij krediet aan als compensatie.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Beperkte aansprakelijkheid</h3>
                    <p className="text-sm text-blue-800">
                      Onze aansprakelijkheid is beperkt tot het bedrag dat je het afgelopen jaar hebt betaald. Wij zijn niet aansprakelijk voor indirecte schade.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-2">AI beperkingen</h3>
                    <p className="text-sm text-purple-800">
                      AI gegenereerde content is niet perfect. Je bent verantwoordelijk voor het controleren en aanpassen van content voordat je het publiceert.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">6. Contact & klachten</h2>
                    <p className="text-gray-600">
                      Hoe je contact met ons kunt opnemen
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Neem contact met ons op</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Algemene vragen</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>E-mail:</strong>{" "}
                        <a href="mailto:support@ai-group.nl" className="text-blue-600 hover:underline">
                          support@ai-group.nl
                        </a>
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Reactietijd:</strong> Binnen 24 uur
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Juridische zaken</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>E-mail:</strong>{" "}
                        <a href="mailto:legal@ai-group.nl" className="text-blue-600 hover:underline">
                          legal@ai-group.nl
                        </a>
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Reactietijd:</strong> Binnen 48 uur
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Klachtprocedure:</strong> Bij klachten kun je altijd terecht bij onze klantenservice. Wij streven naar een oplossing binnen 7 werkdagen.
                    </p>
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