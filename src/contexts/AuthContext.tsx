import { createContext, useCallback, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userId: string | null;
  roles: string[];
  hasRole: (role: string) => boolean;
  refreshRoles: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  // `authLoading` tracks session resolution; `rolesLoading` tracks the my_roles()
  // lookup. isLoading (below) stays true until BOTH settle for a signed-in user —
  // otherwise ProtectedRoute would evaluate hasRole() against an empty roles array
  // and bounce a legitimate portal member to /onboarding on every page load.
  const [authLoading, setAuthLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);

  // Monotonic id so only the most recently initiated role fetch may write state.
  // This matters right after grant_self_role during account-linking: the manual
  // refreshRoles() runs once the grant has committed and must win over any fetch
  // a concurrent session-change effect kicked off before the grant landed.
  const rolesFetchId = useRef(0);

  // Roles come exclusively from the database via the my_roles() RPC. No signup
  // metadata (frozen at account creation, so wrong for anyone arriving via a
  // second portal) and no profiles.role. On any failure we fail CLOSED (empty
  // roles), so a network blip can never silently grant access to this portal.
  // The live session is read from supabase (not React state) so external callers
  // are never blocked by a stale closure in the moment right after sign-in.
  const refreshRoles = useCallback(async () => {
    const fetchId = ++rolesFetchId.current;
    const { data: { session: live } } = await supabase.auth.getSession();
    if (!live?.user) {
      if (fetchId === rolesFetchId.current) setRoles([]);
      return;
    }
    try {
      const { data, error } = await supabase.rpc("my_roles");
      if (fetchId !== rolesFetchId.current) return; // superseded by a newer refresh
      if (error) {
        logger.error("my_roles RPC error:", error);
        setRoles([]);
      } else {
        setRoles(data ?? []);
      }
    } catch (err) {
      if (fetchId === rolesFetchId.current) {
        logger.error("my_roles failed:", err);
        setRoles([]);
      }
    }
  }, []);

  const hasRole = (role: string) => roles.includes(role);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        logger.error("Error getting session:", error);
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setAuthLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Re-fetch roles whenever the authenticated user changes, holding rolesLoading
  // for the duration so the combined isLoading gate below waits it out.
  useEffect(() => {
    let active = true;
    setRolesLoading(true);
    refreshRoles().finally(() => {
      if (active) setRolesLoading(false);
    });
    return () => {
      active = false;
    };
  }, [session?.user?.id, refreshRoles]);

  const value = {
    session,
    user,
    userId: user?.id ?? null,
    roles,
    hasRole,
    refreshRoles,
    isAuthenticated: !!user,
    // Anonymous visitors don't need roles; only gate on rolesLoading when signed in.
    isLoading: authLoading || (!!user && rolesLoading),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
