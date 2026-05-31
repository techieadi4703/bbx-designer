import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, User, Palette } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
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
        <Link to="/" className="text-xl font-headline font-bold text-[#1c1c1a] tracking-tight flex items-center gap-2">
          <span>BuildBazaarX</span>
          <span className="italic font-normal text-[#735c00]">Designer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              {userRole === "designer" && (
                <Link to="/dashboard" className="text-xs uppercase font-bold tracking-widest text-[#74777d] hover:text-[#1c1c1a] transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                </Link>
              )}
              {userRole === "customer" && (
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
              <Link to="/auth?mode=login" className="text-xs uppercase font-bold tracking-widest text-[#74777d] hover:text-[#1c1c1a] transition-colors">
                Sign In
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 md:hidden text-[#1c1c1a] hover:bg-[#f6f3f0] rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white md:hidden border-t border-[#e5e2df] animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            {isAuthenticated ? (
              <>
                {userRole === "designer" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase font-bold tracking-widest text-[#1c1c1a] pb-2 border-b border-[#f6f3f0] flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#735c00]" /> Dashboard
                  </Link>
                )}
                {userRole === "customer" && (
                  <Link
                    to="/setup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase font-bold tracking-widest text-[#1c1c1a] pb-2 border-b border-[#f6f3f0] flex items-center gap-2"
                  >
                    <Palette className="w-4 h-4 text-[#735c00]" /> Setup Practice
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm uppercase font-bold tracking-widest text-red-600 flex items-center gap-2 pt-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase font-bold tracking-widest text-[#1c1c1a] pb-2 border-b border-[#f6f3f0]"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
