import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MatchCardProps {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  league: string;
  odds?: string;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

const MatchCard = ({
  id,
  homeTeam,
  awayTeam,
  date,
  league,
  odds,
  selected = false,
  onSelect,
}: MatchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("hu-HU", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => onSelect?.(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group",
        "bg-slate-800/50 backdrop-blur-sm",
        selected
          ? "border-cyan-400 shadow-glow bg-cyan-400/10"
          : "border-slate-700/50 hover:border-slate-600"
      )}
    >
      {/* Checkmark Icon */}
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center animate-scale-in">
          <Check className="h-4 w-4 text-slate-900" />
        </div>
      )}

      {/* League Badge */}
      <div className="mb-3 inline-block">
        <span className="px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600/50 text-xs font-medium text-slate-300">
          {league}
        </span>
      </div>

      {/* Match Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex-1">
            <p className="text-sm font-bold text-white truncate">
              {homeTeam}
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">vs</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-white truncate text-right">
              {awayTeam}
            </p>
          </div>
        </div>

        {/* Date */}
        <p className="text-xs text-slate-400 text-center">
          {formattedDate}
        </p>
      </div>

      {/* Odds (if provided) */}
      {odds && (
        <div className="mb-3 p-2 rounded-lg bg-slate-700/20 border border-slate-600/30">
          <p className="text-xs text-slate-400 mb-1">Tipikus szorzó</p>
          <p className="text-lg font-bold text-emerald-400">{odds}</p>
        </div>
      )}

      {/* Hover Effect Border */}
      {isHovered && (
        <div
          className={cn(
            "absolute inset-0 rounded-2xl pointer-events-none",
            "bg-gradient-to-br from-cyan-500/10 to-emerald-500/10",
            "border border-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
          )}
        />
      )}
    </div>
  );
};

export default MatchCard;
