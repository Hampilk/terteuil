import { cn } from "@/lib/utils";

interface ConfidenceGaugeProps {
  confidence: number;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const ConfidenceGauge = ({
  confidence,
  label = "Bizalmi szint",
  size = "md",
}: ConfidenceGaugeProps) => {
  const sizeClasses = {
    sm: { container: "w-24 h-24", text: "text-sm" },
    md: { container: "w-40 h-40", text: "text-2xl" },
    lg: { container: "w-56 h-56", text: "text-4xl" },
  };

  const getGaugeColor = (confidence: number) => {
    if (confidence >= 80) return "#10b981";
    if (confidence >= 60) return "#06b6d4";
    if (confidence >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const getGaugeLabel = (confidence: number) => {
    if (confidence >= 80) return "Nagyon magas";
    if (confidence >= 60) return "Magas";
    if (confidence >= 40) return "Közepes";
    return "Alacsony";
  };

  const gaugeColor = getGaugeColor(confidence);
  const gaugeLabel = getGaugeLabel(confidence);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={cn("relative flex items-center justify-center", sizeClasses[size].container)}>
        <svg
          className="w-full h-full drop-shadow-lg"
          viewBox="0 0 100 100"
          style={{ transform: "rotateY(180deg)" }}
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gaugeColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={gaugeColor} stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgb(71, 85, 105)"
            strokeWidth="3"
            opacity="0.2"
          />

          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={gaugeColor}
            strokeWidth="4"
            strokeDasharray={`${(confidence / 100) * 283} 283`}
            strokeLinecap="round"
            className="transition-all duration-1000"
            filter="url(#glow)"
            style={{
              transform: "rotate(-180deg)",
              transformOrigin: "50% 50%",
            }}
          />

          {/* Inner highlight */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={gaugeColor}
            strokeWidth="1"
            opacity="0.2"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "font-bold leading-none text-center",
              sizeClasses[size].text
            )}
            style={{ color: gaugeColor }}
          >
            {confidence}%
          </span>
          <span className="text-xs text-slate-400 mt-2">{gaugeLabel}</span>
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className="text-center">
          <p className="text-sm font-medium text-slate-300">{label}</p>
          <div className="mt-2 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-2 rounded-full transition-all",
                  i < Math.ceil((confidence / 100) * 5)
                    ? `bg-[${gaugeColor}]`
                    : "bg-slate-700/50"
                )}
                style={{
                  backgroundColor:
                    i < Math.ceil((confidence / 100) * 5)
                      ? gaugeColor
                      : "rgb(71, 85, 105)",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfidenceGauge;
