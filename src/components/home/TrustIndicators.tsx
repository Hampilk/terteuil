import AnimatedCounter from "./AnimatedCounter";
import { TrendingUp, Target, BarChart3 } from "lucide-react";

interface TrustIndicator {
  icon: React.ReactNode;
  label: string;
  value: number;
  format?: "number" | "percent" | "decimal";
  prefix?: string;
  suffix?: string;
}

const TrustIndicators = () => {
  const indicators: TrustIndicator[] = [
    {
      icon: <Target className="h-8 w-8" />,
      label: "Pontosság ráta",
      value: 87,
      format: "percent",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      label: "Összes előrejelzés",
      value: 15840,
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      label: "Elemzett mérkőzés",
      value: 2340,
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">
            Megbízható előrejelzések
          </h2>
          <p className="text-lg text-slate-400">
            Több millió elemzés alapján adott prognózisok a legjobb csapatokra
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-glow backdrop-blur-sm"
            >
              <div className="mb-6 p-4 rounded-xl bg-gradient-primary/10 border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-300">
                <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  {indicator.icon}
                </div>
              </div>

              <AnimatedCounter
                target={indicator.value}
                format={indicator.format}
                prefix={indicator.prefix}
                suffix={indicator.suffix}
              />

              <p className="mt-4 text-slate-400 text-center font-medium">
                {indicator.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
