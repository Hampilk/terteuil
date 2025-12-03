import { cn } from "@/lib/utils";

interface LoadingCardProps {
  className?: string;
  variant?: "small" | "medium" | "large";
}

const LoadingCard = ({
  className = "",
  variant = "medium",
}: LoadingCardProps) => {
  const heightClasses = {
    small: "h-24",
    medium: "h-48",
    large: "h-96",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden",
        heightClasses[variant],
        className
      )}
    >
      <div className="h-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
};

export default LoadingCard;
