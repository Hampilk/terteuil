import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatchCard from "./MatchCard";
import ConfidenceGauge from "./ConfidenceGauge";
import { cn } from "@/lib/utils";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  league: string;
  odds?: string;
}

interface League {
  id: string;
  name: string;
}

interface PredictionWizardProps {
  onComplete?: (selectedMatches: string[]) => void;
}

const PredictionWizard = ({ onComplete }: PredictionWizardProps) => {
  const [step, setStep] = useState(0);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedMatches, setSelectedMatches] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(75);

  const leagues: League[] = [
    { id: "pl", name: "Premier League" },
    { id: "la-liga", name: "La Liga" },
    { id: "bundesliga", name: "Bundesliga" },
    { id: "serie-a", name: "Serie A" },
    { id: "ligue-1", name: "Ligue 1" },
  ];

  const mockMatches: Match[] = [
    {
      id: "1",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      date: "2024-01-20T15:00",
      league: "Premier League",
      odds: "1.85",
    },
    {
      id: "2",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      date: "2024-01-21T12:00",
      league: "Premier League",
      odds: "2.10",
    },
    {
      id: "3",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      date: "2024-01-22T20:00",
      league: "La Liga",
      odds: "1.95",
    },
    {
      id: "4",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      date: "2024-01-23T19:30",
      league: "Bundesliga",
      odds: "2.05",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Válassz ligát",
      description: "Melyik ligában szeretnél előrejelzéseket készíteni?",
    },
    {
      number: 2,
      title: "Mérkőzések kiválasztása",
      description: "Válassz ki legalább 3 mérkőzést az előrejelzéshez",
    },
    {
      number: 3,
      title: "Bizalmi szint",
      description: "Állítsd be a modell konfidencia szintjét",
    },
    {
      number: 4,
      title: "Összefoglalás",
      description: "Ellenőrizd az előrejelzéseket",
    },
  ];

  const handleSelectMatch = (id: string) => {
    setSelectedMatches((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 0 && !selectedLeague) return;
    if (step === 1 && selectedMatches.length < 3) return;
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleComplete = () => {
    onComplete?.(selectedMatches);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          {steps.map((s, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                  index <= step
                    ? "bg-cyan-400 text-slate-900"
                    : "bg-slate-700/50 text-slate-400"
                )}
              >
                {index < step ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 w-8 transition-all duration-300",
                    index < step ? "bg-cyan-400" : "bg-slate-700/50"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Title */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {steps[step].title}
          </h2>
          <p className="text-slate-400">{steps[step].description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-96 mb-8">
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leagues.map((league) => (
              <div
                key={league.id}
                onClick={() => setSelectedLeague(league.id)}
                className={cn(
                  "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                  "bg-slate-800/50 backdrop-blur-sm",
                  selectedLeague === league.id
                    ? "border-cyan-400 shadow-glow bg-cyan-400/10"
                    : "border-slate-700/50 hover:border-slate-600"
                )}
              >
                <h3 className="text-lg font-bold text-white">{league.name}</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Válassz ez a ligáért
                </p>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            {mockMatches
              .filter(
                (m) =>
                  !selectedLeague ||
                  m.league === leagues.find((l) => l.id === selectedLeague)?.name
              )
              .map((match) => (
                <MatchCard
                  key={match.id}
                  id={match.id}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  date={match.date}
                  league={match.league}
                  odds={match.odds}
                  selected={selectedMatches.includes(match.id)}
                  onSelect={handleSelectMatch}
                />
              ))}

            {selectedMatches.length < 3 && (
              <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm">
                Legalább 3 mérkőzés szükséges az előrejelzéshez ({selectedMatches.length}/3)
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center">
              <ConfidenceGauge confidence={confidence} size="lg" />
            </div>

            <div className="w-full space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-white mb-3 block">
                  Szabályozd a bizalmi szintet
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </label>

              <div className="grid grid-cols-4 gap-2 text-xs text-slate-400 text-center">
                <div>Alacsony</div>
                <div>Közepes</div>
                <div>Magas</div>
                <div>Nagyon magas</div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <h3 className="text-lg font-bold text-white mb-4">
                Előrejelzés összegzése
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Kiválasztott liga:</span>
                  <span className="font-bold text-cyan-400">
                    {
                      leagues.find((l) => l.id === selectedLeague)?.name
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Mérkőzések száma:</span>
                  <span className="font-bold text-emerald-400">
                    {selectedMatches.length}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Bizalmi szint:</span>
                  <span className="font-bold text-violet-400">
                    {confidence}%
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <p className="text-sm text-emerald-400">
                  ✓ Minden adatok rendben vannak az előrejelzés indításához
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={step === 0}
          className="border-slate-600 hover:border-slate-500 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Vissza
        </Button>

        <div className="flex gap-4">
          {step < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 0 && !selectedLeague) ||
                (step === 1 && selectedMatches.length < 3)
              }
              className="bg-gradient-primary hover:shadow-glow disabled:opacity-50"
            >
              Tovább
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="bg-gradient-primary hover:shadow-glow"
            >
              <Check className="h-4 w-4 mr-2" />
              Előrejelzés indítása
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionWizard;
