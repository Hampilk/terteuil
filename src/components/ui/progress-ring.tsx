import { cn } from "@/lib/utils";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: "cyan" | "emerald" | "violet" | "pink";
}

const ProgressRing = ({
  percentage,
  size = 120,
  strokeWidth = 6,
  label,
  color = "cyan",
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    cyan: "#06b6d4",
    emerald: "#10b981",
    violet: "#a78bfa",
    pink: "#ec4899",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgb(71, 85, 105)"
            strokeWidth={strokeWidth}
            opacity="0.2"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colorClasses[color]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
            style={{ filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span
            className="text-2xl font-bold"
            style={{ color: colorClasses[color] }}
          >
            {percentage}%
          </span>
          {label && (
            <span className="text-xs text-slate-400 mt-1">{label}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressRing;
