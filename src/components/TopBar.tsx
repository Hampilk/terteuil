import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, Settings, Bell, Home, ChevronRight } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";

const breadcrumbMap: Record<string, { label: string; href: string }[]> = {
  "/dashboard": [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  "/predictions": [
    { label: "Home", href: "/" },
    { label: "Predictions", href: "/predictions" },
  ],
  "/analytics": [
    { label: "Home", href: "/" },
    { label: "Analytics", href: "/analytics" },
  ],
  "/admin": [
    { label: "Home", href: "/" },
    { label: "Admin", href: "/admin" },
  ],
};

const TopBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

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

  const breadcrumbs = breadcrumbMap[location.pathname] || [];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 px-4 lg:px-6 transition-all duration-300",
        "lg:hidden",
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50 shadow-lg"
          : "bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/30"
      )}
    >
      {/* Left Section - Menu & Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-slate-800/50"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menü megnyitása</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-slate-900 border-slate-700">
            <div className="mt-6 space-y-2">
              <div className="px-3 py-2">
                <h2 className="text-sm font-semibold text-slate-300 mb-4">Menu</h2>
              </div>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
              >
                <Home className="h-4 w-4" />
                Főoldal
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
              >
                <span>📊</span>
                Dashboard
              </Link>
              <Link
                to="/predictions"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
              >
                <span>🧠</span>
                Predikciók
              </Link>
              <Link
                to="/matches"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
              >
                <span>🏆</span>
                Mérkőzések
              </Link>
              <Link
                to="/teams"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
              >
                <span>👥</span>
                Csapatok
              </Link>
              <Link
                to="/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
              >
                <span>📈</span>
                Analytics
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ml-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            WinMix
          </span>
        </Link>
      </div>

      {/* Center Section - Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <Link
                to={crumb.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-slate-800/50 hover:text-cyan-400"
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Értesítések</span>
          <div className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
        </Button>

        {/* User menu */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-slate-800/50 transition-colors"
              >
                <Avatar className="h-8 w-8 border border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                  <AvatarFallback className="bg-gradient-primary text-white text-xs font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-slate-900 border-slate-700"
            >
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium text-white">
                  {profile?.full_name || "Felhasználó"}
                </p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-slate-700/50" />
              <DropdownMenuItem
                onClick={() => navigate("/admin")}
                className="text-slate-300 hover:text-white focus:text-white cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Beállítások
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700/50" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Kijelentkezés
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate("/login")}
            className="bg-gradient-primary hover:shadow-glow"
          >
            <User className="mr-2 h-4 w-4" />
            Bejelentkezés
          </Button>
        )}
      </div>
    </header>
  );
};

export default TopBar;
