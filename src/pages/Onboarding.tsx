import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, PORTAL_ROLE } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Palette } from "lucide-react";

export default function DesignerOnboarding() {
  const { user, isAuthenticated, isLoading, roles, refreshRoles } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // A signed-in user who lacks the 'designer' role is not an error — they are a
  // valid BuildBazaarX account (e.g. a customer) that simply hasn't onboarded here.
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate("/auth", { replace: true });
      return;
    }
    if (roles.includes(PORTAL_ROLE)) {
      navigate("/setup", { replace: true });
    }
  }, [isLoading, isAuthenticated, roles, navigate]);

  const handleAddProfile = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.rpc("grant_self_role", { p_role: PORTAL_ROLE });
      if (error) throw error;
      await refreshRoles();
      toast({ title: "Designer profile added ✨", description: "Let's set up your studio." });
      navigate("/setup");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Couldn't add designer profile",
        description: error.message || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseAnotherAccount = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <Layout>
      <div className="bg-[#fcf9f6] text-[#1c1c1a] min-h-screen font-body w-full relative overflow-hidden flex items-center justify-center p-6">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e2df 1px, transparent 1px), linear-gradient(90deg, #e5e2df 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }} />

        <div className="w-full max-w-lg relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e5e2df] p-6 md:p-12 rounded-sm shadow-sm"
          >
            <span className="font-body uppercase tracking-[0.2em] text-[10px] text-[#735c00] mb-4 block font-bold">
              Creative Network
            </span>

            <div className="flex items-center justify-center w-14 h-14 rounded-sm bg-[#fcf9f6] border border-[#735c00]/30 text-[#735c00] mb-6">
              <Palette className="w-6 h-6" />
            </div>

            <h1 className="text-3xl md:text-4xl font-headline tracking-tight leading-tight mb-3">
              Add a <span className="italic">designer</span> profile
            </h1>

            <p className="text-sm md:text-base font-body text-[#44474c] leading-relaxed mb-8">
              You're signed in as{" "}
              <span className="font-bold text-[#1c1c1a] break-all">{user?.email}</span>. Add a designer
              profile to your existing BuildBazaarX account to publish your studio — your other roles
              stay exactly as they are.
            </p>

            <button
              type="button"
              onClick={handleAddProfile}
              disabled={isSubmitting}
              className="w-full h-14 bg-[#1c1c1a] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#735c00] transition-all flex items-center justify-center gap-3 group disabled:opacity-60"
            >
              {isSubmitting ? "Synchronizing…" : "Add designer profile"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleUseAnotherAccount}
              className="w-full mt-4 text-[10px] uppercase font-bold tracking-widest text-[#74777d] hover:text-[#1c1c1a] transition-colors"
            >
              Not you? Use a different account
            </button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
