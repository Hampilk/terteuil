import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  BarChart3,
  Trophy,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  LineChart,
  Layers,
  Activity,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const navigation = [
  { name: "Főoldal", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Predikciók", href: "/predictions", icon: Brain },
  { name: "Mérkőzések", href: "/matches", icon: Trophy },
  { name: "Csapatok", href: "/teams", icon: Users },
  { name: "Ligák", href: "/leagues", icon: Layers },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Monitoring", href: "/monitoring", icon: Activity },
  { name: "AI Chat", href: "/ai-chat", icon: MessageSquare },
];

const adminNavigation = [
  { name: "Admin", href: "/admin", icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || "U";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-smooth",
          collapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/20">
          <div className="flex h-20 shrink-0 items-center justify-between px-4">
            {!collapsed && (
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold bg-gradient-primary bg-clip-text text-transparent">
                    WinMix
                  </span>
                  <span className="text-xs text-cyan-400">Pro</span>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "h-8 w-8 transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-400",
                collapsed && "ml-auto"
              )}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50 px-3 pb-4 pt-6">
          <ScrollArea className="flex-1">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-lg p-2.5 text-sm font-medium transition-all duration-200 relative",
                          isActive
                            ? "bg-gradient-primary text-white shadow-glow"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full" />
                        )}
                        <item.icon className={cn(
                          "h-5 w-5 shrink-0 transition-all duration-200",
                          isActive && "scale-110"
                        )} />
                        {!collapsed && (
                          <span className="flex-1">{item.name}</span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}

                {/* Admin Section */}
                <li className="mt-6 pt-6 border-t border-slate-700/50">
                  {adminNavigation.map((item) => {
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-lg p-2.5 text-sm font-medium transition-all duration-200 relative",
                          isActive
                            ? "bg-gradient-primary text-white shadow-glow"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full" />
                        )}
                        <item.icon className={cn(
                          "h-5 w-5 shrink-0 transition-all duration-200",
                          isActive && "scale-110"
                        )} />
                        {!collapsed && (
                          <span className="flex-1">{item.name}</span>
                        )}
                      </NavLink>
                    );
                  })}
                </li>
              </ul>
            </nav>
          </ScrollArea>

          {/* User Profile Footer */}
          <div className="border-t border-slate-700/50 pt-4 mt-auto">
            <div className={cn(
              "flex items-center gap-3 rounded-lg bg-slate-800/50 p-3 transition-all duration-200 hover:bg-slate-700/50 cursor-pointer group",
              collapsed ? "justify-center" : ""
            )}>
              <Avatar className="h-8 w-8 border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors">
                <AvatarFallback className="bg-gradient-primary text-white text-xs font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {profile?.full_name || "User"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hover:bg-red-500/20 hover:text-red-400 transition-all"
                onClick={signOut}
                title="Kijelentkezés"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
