import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedPrediction {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  prediction: string;
  confidence: number;
  outcome: "win" | "loss" | "pending";
  odds: string;
}

const FeaturedPredictions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  const predictions: FeaturedPrediction[] = [
    {
      id: "1",
      league: "Premier League",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      date: "2024-01-15",
      prediction: "Over 2.5",
      confidence: 92,
      outcome: "win",
      odds: "1.85",
    },
    {
      id: "2",
      league: "La Liga",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      date: "2024-01-14",
      prediction: "Home Win",
      confidence: 88,
      outcome: "win",
      odds: "2.10",
    },
    {
      id: "3",
      league: "Bundesliga",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      date: "2024-01-13",
      prediction: "Draw",
      confidence: 75,
      outcome: "loss",
      odds: "3.50",
    },
    {
      id: "4",
      league: "Serie A",
      homeTeam: "Juventus",
      awayTeam: "Inter Milan",
      date: "2024-01-12",
      prediction: "Over 1.5",
      confidence: 85,
      outcome: "pending",
      odds: "1.95",
    },
  ];

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % predictions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoScroll, predictions.length]);

  const goToPrevious = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) =>
      prev === 0 ? predictions.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setAutoScroll(false);
    setCurrentIndex((prev) => (prev + 1) % predictions.length);
  };

  const prediction = predictions[currentIndex];

  const outcomeConfig = {
    win: {
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      label: "✓ Nyert",
    },
    loss: {
      icon: <AlertCircle className="h-6 w-6" />,
      color: "text-red-400",
      bg: "bg-red-400/10",
      label: "✗ Veszített",
    },
    pending: {
      icon: <AlertCircle className="h-6 w-6" />,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      label: "⏳ Függőben",
    },
  };

  const config = outcomeConfig[prediction.outcome];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-800/50 to-transparent">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-white">
            Kiemelt előrejelzések
          </h2>
          <p className="text-lg text-slate-400">
            Legújabb sikeres predikciók a világ legjobb ligáiból
          </p>
        </div>

        <div
          className="relative h-80 lg:h-96 rounded-2xl overflow-hidden"
          onMouseEnter={() => setAutoScroll(false)}
          onMouseLeave={() => setAutoScroll(true)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />

          {/* Card */}
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-sm text-slate-400 font-medium mb-2">
                    {prediction.league}
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl lg:text-4xl font-bold text-white">
                      {prediction.homeTeam} vs {prediction.awayTeam}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-400">
                    {new Date(prediction.date).toLocaleDateString("hu-HU", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Outcome Badge */}
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.color}`}
                >
                  {config.icon}
                  <span className="font-medium text-sm">{config.label}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-2">Előrejelzés</p>
                  <p className="text-3xl font-bold text-cyan-400">
                    {prediction.prediction}
                  </p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-slate-400">Bizalmi szint</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-cyan-400">
                        {prediction.confidence}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Szorzó</p>
                    <p className="text-2xl font-bold text-emerald-400">
                      {prediction.odds}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="border-slate-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 border border-slate-700/50 rounded-2xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </div>

        {/* Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {predictions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoScroll(false);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-cyan-400"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to prediction ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPredictions;
