import { Link } from "react-router-dom";
import { ArrowRight, Zap, BarChart3, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-subtle" />

      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        {/* Main CTA Card */}
        <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 p-12 lg:p-20 backdrop-blur-xl overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                Kezd el előrejelzéseket készíteni
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Csatlakozz több ezer sikeres tippelőhöz. A WinMix AI rendszer
                segítségével azonosítsd a legjobb fogadási lehetőségeket és
                növeld profitod.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-400/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-slate-300">
                    Valós idejű AI előrejelzések
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="text-slate-300">
                    Részletes analytics és jellemzések
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-400/20 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-violet-400" />
                  </div>
                  <span className="text-slate-300">
                    Intelligens minta felismerés
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/predictions">
                  <Button className="w-full sm:w-auto bg-gradient-primary hover:shadow-glow text-white font-semibold py-3 px-8 rounded-lg group">
                    Kezdjünk neki
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                  >
                    Dashboard megtekintése
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-72 h-72">
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse-subtle" />
                <div className="absolute inset-4 rounded-full border-2 border-emerald-400/20 animate-spin-slow" />
                <div className="absolute inset-8 rounded-full border-2 border-cyan-400/10 animate-pulse-subtle" />

                {/* Center Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-primary/20 backdrop-blur-xl border border-cyan-400/30 flex items-center justify-center shadow-glow">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white mb-2">
                        87%
                      </div>
                      <div className="text-sm text-slate-300">
                        Pontossági ráta
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              number: "01",
              title: "Regisztráció",
              description: "Gyors és egyszerű regisztráció mindössze 2 lépésben",
            },
            {
              number: "02",
              title: "Elemzés",
              description: "Részletes mérkőzés elemzés és statisztikai adatok",
            },
            {
              number: "03",
              title: "Fogadás",
              description: "Az értékek alapján fogadj és nyerj konzisztensen",
            },
          ].map((feature) => (
            <div
              key={feature.number}
              className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group"
            >
              <div className="text-3xl font-bold text-cyan-400 mb-3">
                {feature.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
