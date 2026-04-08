
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChefHat, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.dispatchEvent(new Event("chef-auth"));
        // Force refresh the router state to recognize the new cookie
        router.refresh();
        setTimeout(() => {
          router.push("/manage");
        }, 100);
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md space-y-8 bg-card/60 backdrop-blur-2xl border p-12 rounded-[3rem] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-700">
        <div className="absolute top-0 right-0 p-4 bg-primary/5 rounded-bl-[2rem] text-[10px] font-black uppercase tracking-widest text-primary/40">
           Secure Portal
        </div>

        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mx-auto shadow-tiny group">
             <ChefHat size={40} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase italic">Admin <span className="text-primary">Vault</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1 opacity-60">Authentication required for management</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Archive Identity</label>
               <div className="relative">
                 <Input 
                   type="email" 
                   placeholder="admin@recipe.app" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="h-12 pl-12 rounded-2xl bg-muted/20 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                   required
                 />
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={18} />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Cipher Key</label>
               <div className="relative">
                 <Input 
                   type="password" 
                   placeholder="••••••••" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="h-12 pl-12 rounded-2xl bg-muted/20 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                   required
                 />
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={18} />
               </div>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-black uppercase tracking-widest p-4 rounded-xl text-center">
               {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {loading ? "Authenticating..." : "Unlock Archives"}
            {!loading && <ShieldCheck size={18} className="ml-3" />}
          </Button>
        </form>

        <p className="text-center text-[9px] text-muted-foreground font-medium uppercase tracking-widest opacity-40">
          Strictly for culinary authorization members only.
        </p>
      </div>
    </div>
  );
}
