import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-slate-800/30 border border-slate-700/30",
        className
      )}
    >
      {icon && (
        <div className="mb-4 w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center text-2xl">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-bold text-white mb-2 text-center">
        {title}
      </h3>

      {description && (
        <p className="text-slate-400 text-center mb-6 max-w-sm">
          {description}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 rounded-lg bg-gradient-primary text-white font-medium transition-all duration-300 hover:shadow-glow"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
