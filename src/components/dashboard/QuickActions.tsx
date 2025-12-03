import { useState } from "react";
import { Plus, RotateCcw, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: "cyan" | "emerald" | "violet";
}

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const actions: QuickAction[] = [
    {
      id: "new-prediction",
      icon: <Plus className="h-5 w-5" />,
      label: "Új előrejelzés",
      color: "cyan",
      onClick: () => {
        navigate("/predictions");
        setIsOpen(false);
      },
    },
    {
      id: "refresh",
      icon: <RotateCcw className="h-5 w-5" />,
      label: "Frissítés",
      color: "emerald",
      onClick: () => {
        window.location.reload();
      },
    },
    {
      id: "export",
      icon: <Download className="h-5 w-5" />,
      label: "Exportálás",
      color: "violet",
      onClick: () => {
        // Export logic would go here
        console.log("Export data");
        setIsOpen(false);
      },
    },
  ];

  const colorClasses = {
    cyan: "bg-cyan-500 hover:bg-cyan-600 shadow-glow",
    emerald: "bg-emerald-500 hover:bg-emerald-600 shadow-glow-secondary",
    violet: "bg-violet-500 hover:bg-violet-600 shadow-glow-accent",
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-slide-up">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center gap-3 animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <span className="text-sm font-medium text-white bg-slate-800 px-3 py-2 rounded-lg whitespace-nowrap">
                {action.label}
              </span>
              <Button
                onClick={action.onClick}
                className={`h-12 w-12 rounded-full p-0 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  colorClasses[action.color || "cyan"]
                }`}
              >
                {action.icon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full p-0 text-white flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-slate-600 hover:bg-slate-700 rotate-45"
            : "bg-gradient-primary hover:shadow-glow"
        } shadow-lg`}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform" />
        ) : (
          <Plus className="h-6 w-6 transition-transform" />
        )}
      </Button>
    </div>
  );
};

export default QuickActions;
