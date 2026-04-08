
import Link from "next/link";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { ChefHat, Utensils, Star, ArrowRight, Sparkles, TrendingUp, Search } from "lucide-react";
import Image from "next/image";
import { getBaseUrl } from "@/lib/utils";

async function getFeatured(): Promise<Recipe[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/recipes?published=true`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const recipes = await res.json();
  return recipes.slice(0, 3);
}

export default async function HomePage() {
  const featured = await getFeatured();

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] -z-20" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
               <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-2.5 rounded-full font-black uppercase tracking-[0.25em] text-[10px] shadow-sm border border-primary/20">
                  <Sparkles size={14} className="animate-pulse" /> The Future of Culinary Art
               </div>
               
               <h1 className="text-9xl font-black tracking-tighter leading-none italic uppercase">
                  Elevate <br />
                  <span className="text-primary not-italic tracking-normal lowercase font-normal italic">Every</span> <br />
                  Bite
               </h1>
               
               <p className="text-xl text-muted-foreground leading-relaxed max-w-lg font-medium">
                  A professional ecosystem for chefs and enthusiasts. Scale recipes, track macros, and master every step with our precision cooking engine.
               </p>
               
               <div className="flex gap-6">
                  <Link href="/recipes">
                    <Button className="h-16 px-12 rounded-3xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                       Explore Gallery <ArrowRight size={18} className="ml-3" />
                    </Button>
                  </Link>
                  <Link href="/manage">
                    <Button variant="outline" className="h-16 px-10 rounded-3xl border-2 font-black uppercase tracking-widest text-sm hover:bg-background/80">
                       Chef Portal
                    </Button>
                  </Link>
               </div>
               
               <div className="flex gap-12 pt-8 border-t border-dashed">
                  <div>
                    <div className="text-3xl font-black tracking-tight">12k+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">Happy Chefs</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black tracking-tight">500+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">Premium Recipes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black tracking-tight">4.9/5</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">Avg Rating</div>
                  </div>
               </div>
            </div>

            <div className="relative h-[600px] w-full rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border-[16px] border-card/40 backdrop-blur-3xl animate-in zoom-in-95 duration-1000 delay-200">
               <Image 
                src="https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2671&auto=format&fit=crop" 
                alt="Chef Cooking" 
                fill 
                className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <div className="absolute bottom-10 left-10 p-8 bg-black/30 backdrop-blur-xl rounded-[2.5rem] border border-white/10 text-white max-w-xs shadow-2xl">
                  <div className="flex items-center gap-2 mb-3 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-sm font-medium italic opacity-90 leading-relaxed mb-4">"The scaling engine changed how I manage my professional kitchen. Absolute game changer."</p>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-black text-xs">JD</div>
                     <div>
                        <div className="text-xs font-black uppercase tracking-widest">Julian Drake</div>
                        <div className="text-[9px] opacity-60 font-bold uppercase tracking-widest leading-none">Michelin Chef</div>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="max-w-7xl mx-auto px-6 w-full space-y-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
           <div>
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.25em] text-[10px] mb-4">
                 <TrendingUp size={14} /> Curated Selection
              </div>
              <h2 className="text-6xl font-black tracking-tighter uppercase italic">Trending <span className="text-foreground not-italic tracking-normal lowercase font-normal italic">Creations</span></h2>
           </div>
           <Link href="/recipes" className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors pb-2">
              View All Masterpieces <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {featured.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
           ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 w-full pb-32">
         <div className="bg-primary rounded-[4rem] p-24 text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
               <ChefHat size={300} strokeWidth={1} />
            </div>
            
            <div className="max-w-2xl space-y-8 relative z-10">
               <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none">Become <br /> The Master</h2>
               <p className="text-xl opacity-80 leading-relaxed font-medium">Join our elite community of chefs. Create, manage, and share your recipes with professional-grade tools.</p>
               <div className="pt-4">
                  <Link href="/manage">
                    <Button variant="secondary" className="h-16 px-16 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
                       Initialize Chef Node
                    </Button>
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
