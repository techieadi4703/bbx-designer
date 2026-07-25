import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, User, Palette } from "lucide-react";
import { logoIcon } from "@/lib/cdnImages";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const { isAuthenticated, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    navigate("/auth?mode=login");
  };

  return (
    <header className="border-b border-[#e5e2df] bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-lg md:text-xl font-headline font-bold text-[#1c1c1a] tracking-tight flex items-center gap-1.5 md:gap-2">
          <img src={logoIcon} alt="BuildBazaarX Logo" className="h-6 md:h-7 w-auto object-contain" />
          <span>BuildBazaarX</span>
          <span className="italic font-normal text-[#735c00]">Designer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              {hasRole("designer") && (
                <Link to="/dashboard" className="text-xs uppercase font-bold tracking-widest text-[#74777d] hover:text-[#1c1c1a] transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                </Link>
              )}
              {hasRole("customer") && (
                <Link to="/setup" className="text-xs uppercase font-bold tracking-widest text-[#74777d] hover:text-[#1c1c1a] transition-colors flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> Setup Practice
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-xs uppercase font-bold tracking-widest text-red-600 hover:text-red-800 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/auth" && (
                <Link to="/auth?mode=login" className="text-xs uppercase font-bold tracking-widest text-[#74777d] hover:text-[#1c1c1a] transition-colors">
                  Sign In
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Mobile Navigation / Actions */}
        <div className="md:hidden flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              {hasRole("designer") && (
                <Link
                  to="/dashboard"
                  className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 border border-[#1c1c1a] text-[#1c1c1a] hover:bg-[#1c1c1a] hover:text-white rounded-full transition-all duration-200 whitespace-nowrap"
                >
                  Dashboard
                </Link>
              )}
              {hasRole("customer") && (
                <Link
                  to="/setup"
                  className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 border border-[#1c1c1a] text-[#1c1c1a] hover:bg-[#1c1c1a] hover:text-white rounded-full transition-all duration-200 whitespace-nowrap"
                >
                  Setup
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all duration-200 whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            location.pathname !== "/auth" && (
              <Link
                to="/auth?mode=login"
                className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 border border-[#1c1c1a] text-[#1c1c1a] hover:bg-[#1c1c1a] hover:text-white rounded-full transition-all duration-200 whitespace-nowrap"
              >
                Sign In
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};
