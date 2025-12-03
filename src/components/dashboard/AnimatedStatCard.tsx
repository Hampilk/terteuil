import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedStatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  gradient?: "cyan" | "emerald" | "violet" | "pink";
  onClick?: () => void;
  sparkline?: number[];
}

const AnimatedStatCard = ({
  label,
  value,
  icon,
  trend,
  trendLabel = "vs last month",
  gradient = "cyan",
  onClick,
  sparkline,
}: AnimatedStatCardProps) => {
  const gradientClasses = {
    cyan: "from-cyan-500 to-blue-500",
    emerald: "from-emerald-500 to-teal-500",
    violet: "from-violet-500 to-purple-500",
    pink: "from-pink-500 to-rose-500",
  };

  const iconBgClasses = {
    cyan: "bg-cyan-400/20 border-cyan-400/30 text-cyan-400",
    emerald: "bg-emerald-400/20 border-emerald-400/30 text-emerald-400",
    violet: "bg-violet-400/20 border-violet-400/30 text-violet-400",
    pink: "bg-pink-400/20 border-pink-400/30 text-pink-400",
  };

  const gradientBgClasses = {
    cyan: "from-cyan-500/10 to-blue-500/5",
    emerald: "from-emerald-500/10 to-teal-500/5",
    violet: "from-violet-500/10 to-purple-500/5",
    pink: "from-pink-500/10 to-rose-500/5",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative p-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm transition-all duration-300",
        "hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/20",
        onClick && "cursor-pointer hover:bg-slate-800/70"
      )}
    >
      {/* Gradient background on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl",
          `bg-gradient-to-br ${gradientBgClasses[gradient]}`
        )}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">
              {label}
            </p>
            <h3 className={cn(
              "text-3xl lg:text-4xl font-bold text-white",
              "group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300",
              `group-hover:${gradientClasses[gradient]}`
            )}>
              {value}
            </h3>
          </div>

          <div
            className={cn(
              "p-3 rounded-xl border transition-all duration-300",
              iconBgClasses[gradient]
            )}
          >
            {icon}
          </div>
        </div>

        {/* Sparkline Chart (mini representation) */}
        {sparkline && sparkline.length > 0 && (
          <div className="mb-4 h-10 flex items-end gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
            {sparkline.map((value, index) => {
              const max = Math.max(...sparkline);
              const min = Math.min(...sparkline);
              const range = max - min || 1;
              const height = ((value - min) / range) * 100;

              return (
                <div
                  key={index}
                  className={cn(
                    "flex-1 rounded-t-sm transition-all duration-300",
                    `bg-gradient-to-t ${gradientClasses[gradient]}`,
                    "hover:opacity-80"
                  )}
                  style={{ height: `${Math.max(20, height)}%` }}
                />
              );
            })}
          </div>
        )}

        {/* Trend Info */}
        {trend !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <div
              className={cn(
                "flex items-center gap-1 font-medium",
                trend >= 0 ? "text-emerald-400" : "text-red-400"
              )}
            >
              {trend >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
            <span className="text-slate-500">{trendLabel}</span>
          </div>
        )}
      </div>

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none",
          "bg-gradient-to-br from-transparent via-transparent to-transparent",
          `shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]`
        )}
      />
    </div>
  );
};

export default AnimatedStatCard;
