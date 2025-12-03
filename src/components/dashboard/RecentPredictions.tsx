import { CheckCircle, XCircle, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Prediction {
  id: string;
  match: {
    home_team: string;
    away_team: string;
    match_date: string;
    league: string;
  };
  predicted_outcome: string;
  confidence_score: number;
  actual_outcome: string | null;
  was_correct: boolean | null;
}

interface RecentPredictionsProps {
  predictions: Prediction[];
}

const RecentPredictions = ({ predictions }: RecentPredictionsProps) => {
  const formatOutcome = (outcome: string) => {
    switch (outcome) {
      case "home_win":
        return "Hazai győzelem";
      case "away_win":
        return "Vendég győzelem";
      case "draw":
        return "Döntetlen";
      default:
        return outcome;
    }
  };

  const getStatusConfig = (wasCorrect: boolean | null) => {
    if (wasCorrect === null)
      return {
        icon: <Clock className="h-5 w-5" />,
        label: "Függőben",
        bg: "bg-amber-500/20",
        border: "border-amber-500/30",
        color: "text-amber-400",
      };
    return wasCorrect
      ? {
          icon: <CheckCircle className="h-5 w-5" />,
          label: "✓ Helyes",
          bg: "bg-emerald-500/20",
          border: "border-emerald-500/30",
          color: "text-emerald-400",
        }
      : {
          icon: <XCircle className="h-5 w-5" />,
          label: "✗ Hibás",
          bg: "bg-red-500/20",
          border: "border-red-500/30",
          color: "text-red-400",
        };
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-700/50 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Legutóbbi előrejelzések</h2>
      </div>

      {/* Content */}
      <div className="divide-y divide-slate-700/50">
        {predictions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400 font-medium">
              Még nincsenek előrejelzések
            </p>
          </div>
        ) : (
          predictions.map((prediction) => {
            const statusConfig = getStatusConfig(prediction.was_correct);
            const confidence = Math.round(prediction.confidence_score);

            return (
              <div
                key={prediction.id}
                className="group p-4 hover:bg-slate-700/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Match Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-bold text-white truncate">
                        {prediction.match.home_team}{" "}
                        <span className="text-slate-500">vs</span>{" "}
                        {prediction.match.away_team}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{prediction.match.league}</span>
                      <span>•</span>
                      <span>
                        {new Date(
                          prediction.match.match_date
                        ).toLocaleDateString("hu-HU")}
                      </span>
                    </div>
                  </div>

                  {/* Prediction Outcome Pill */}
                  <div className="px-3 py-1.5 rounded-full bg-slate-700/50 border border-slate-600/50 flex-shrink-0">
                    <span className="text-xs font-medium text-slate-300">
                      {formatOutcome(prediction.predicted_outcome)}
                    </span>
                  </div>

                  {/* Confidence Circular Progress */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                      {/* Background circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="rgb(71, 85, 105)"
                        strokeWidth="3"
                        opacity="0.3"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke={cn(
                          confidence >= 80
                            ? "rgb(16, 185, 129)"
                            : confidence >= 60
                              ? "rgb(34, 197, 94)"
                              : "rgb(249, 115, 22)"
                        )}
                        strokeWidth="3"
                        strokeDasharray={`${(confidence / 100) * 176} 176`}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {confidence}%
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={cn(
                      "px-3 py-1.5 rounded-full border flex items-center gap-2 flex-shrink-0",
                      statusConfig.bg,
                      statusConfig.border,
                      statusConfig.color
                    )}
                  >
                    {statusConfig.icon}
                    <span className="text-xs font-medium whitespace-nowrap">
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentPredictions;
