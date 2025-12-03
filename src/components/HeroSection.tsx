import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedCounter from "@/components/home/AnimatedCounter";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-slate-900">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-emerald-500/10 animate-gradient-shift" />

        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#10b981_1px,transparent_1px),linear-gradient(#10b981_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 lg:pt-40 pb-20">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm font-medium animate-fade-in">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            AI-Powered Predictions
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="text-white">Intelligens Futball</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Előrejelzési Rendszer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up">
            A WinMix a legmodernebb mesterséges intelligencia és gépi tanulási
            algoritmusokat használ a mérkőzések kimenetelének előrejelzésére.
            Valós idejű elemzés, 87% pontosság, és soha nem látott megbízhatóság.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-scale-in">
            <Button
              size="lg"
              onClick={() => navigate("/predictions")}
              className="group text-base bg-gradient-primary hover:shadow-glow text-white font-semibold h-12 px-8"
            >
              Új predikció készítése
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-base border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10 h-12 px-8"
            >
              Dashboard megtekintése
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center group-hover:bg-cyan-400/30 transition-colors">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-bold mb-2 text-white">AI Predikciók</h3>
              <p className="text-sm text-slate-400">
                Több modell együttes használata a pontosabb előrejelzésekért.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-emerald-400/50 transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center group-hover:bg-emerald-400/30 transition-colors">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-bold mb-2 text-white">Minta Felismerés</h3>
              <p className="text-sm text-slate-400">
                Történelmi adatok alapján mintázatok azonosítása.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-violet-400/50 transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-violet-400/20 border border-violet-400/30 flex items-center justify-center group-hover:bg-violet-400/30 transition-colors">
                <Zap className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="font-bold mb-2 text-white">Valós Idejű</h3>
              <p className="text-sm text-slate-400">
                Folyamatosan frissülő modellek és predikciók.
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto p-8 rounded-2xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
            <div className="text-center">
              <AnimatedCounter target={87} format="percent" />
              <p className="mt-2 text-slate-400 font-medium">Pontosság ráta</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={15840} />
              <p className="mt-2 text-slate-400 font-medium">Előrejelzés</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={2340} />
              <p className="mt-2 text-slate-400 font-medium">Elemzett mérkőzés</p>
            </div>
            <div className="text-center">
              <AnimatedCounter target={4200} />
              <p className="mt-2 text-slate-400 font-medium">Aktív felhasználó</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </section>
  );
};

export default HeroSection;
