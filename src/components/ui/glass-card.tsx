import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "hover" | "interactive";
}

const GlassCard = ({
  children,
  className = "",
  variant = "default",
}: GlassCardProps) => {
  const variantClasses = {
    default:
      "bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm",
    hover:
      "bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/20 transition-all duration-300",
    interactive:
      "bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-cyan-400/50 hover:shadow-glow transition-all duration-300 cursor-pointer",
  };

  return (
    <div
      className={cn(
        "rounded-2xl",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
