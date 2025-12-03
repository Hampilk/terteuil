import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  hideAnimation?: boolean;
}

const PageLayout = ({
  children,
  className = "",
  hideAnimation = false,
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <TopBar />
      <main
        className={`lg:ml-64 pt-16 lg:pt-0 transition-all duration-300 ${
          !hideAnimation ? "animate-fade-in" : ""
        } ${className}`}
      >
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
