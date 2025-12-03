import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "default";
  icon?: ReactNode;
  animated?: boolean;
}

const AnimatedBadge = ({
  children,
  variant = "default",
  icon,
  animated = true,
}: AnimatedBadgeProps) => {
  const variantClasses = {
    success: "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400",
    warning: "bg-amber-500/20 border border-amber-500/30 text-amber-400",
    error: "bg-red-500/20 border border-red-500/30 text-red-400",
    info: "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400",
    default: "bg-slate-700/50 border border-slate-600/50 text-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
        variantClasses[variant],
        animated && "animate-fade-in"
      )}
    >
      {icon}
      {children}
    </span>
  );
};

export default AnimatedBadge;
