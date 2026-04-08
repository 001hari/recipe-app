
'use client';

import './globals.css';
import Link from 'next/link';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { CookingProvider, useCooking } from '@/context/CookingContext';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { useEffect, useState } from 'react';
import { setSavedIds } from '@/store/cookbookSlice';
import { Button } from '@/components/ui/button';
import { ChefHat, Heart, LayoutGrid, Search, Moon, Sun, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

function NavBar() {
	const { theme, toggleTheme } = useCooking();
	const savedCount = useAppSelector((s) => s.cookbook.savedIds.length);
    const pathname = usePathname();
    const router = useRouter();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const isSessionActive = document.cookie.includes('chef_session=active');
            setIsAuth(isSessionActive);
        };
        
        checkAuth();
        
        // Listen for log-in events without refresh
        window.addEventListener("chef-auth", checkAuth);
        return () => window.removeEventListener("chef-auth", checkAuth);
    }, [pathname]);

    const handleLogout = async () => {
        await fetch('/api/auth', { method: 'DELETE' });
        // Clear both possible cookies
        document.cookie = "chef_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "chef_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    };

    const navLinks = [
        { href: "/", label: "Home", icon: Sparkles },
        { href: "/recipes", label: "Gallery", icon: Search },
        { href: "/cookbook", label: "Cookbook", icon: Heart },
        { href: "/manage", label: "Console", icon: LayoutGrid },
    ];

	return (
		<div className="fixed top-0 left-0 w-full z-50 px-8 py-6 pointer-events-none">
            <nav className="max-w-6xl mx-auto bg-card/60 backdrop-blur-3xl border-2 border-background/50 rounded-[2.5rem] px-10 h-20 flex items-center justify-between shadow-2xl pointer-events-auto relative overflow-hidden group">
                
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3 group/logo">
                   <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 group-hover/logo:rotate-12 transition-transform">
                      <ChefHat size={22} />
                   </div>
                   <span className="text-2xl font-black tracking-tighter uppercase italic text-foreground leading-none">Yum<span className="text-primary not-italic lowercase font-normal italic group-hover/logo:text-foreground transition-colors">my</span></span>
                </Link>

                {/* LINKS */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all",
                                pathname === link.href 
                                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" 
                                    : "hover:bg-background/80 hover:scale-105"
                            )}
                        >
                            <link.icon size={12} strokeWidth={pathname === link.href ? 3 : 2} />
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                    {isAuth ? (
                         <Button 
                            onClick={handleLogout}
                            variant="destructive"
                            className="rounded-2xl px-6 h-12 font-black uppercase tracking-widest text-[9px] shadow-xl shadow-destructive/20 active:scale-95 transition-all"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button 
                            onClick={() => router.push('/manage')}
                            className="rounded-2xl px-6 h-12 bg-primary text-primary-foreground font-black uppercase tracking-widest text-[9px] shadow-xl shadow-primary/20 active:scale-95 transition-all"
                        >
                            Chef
                        </Button>
                    )}
                </div>
            </nav>
        </div>
	);
}

function InitCookbook() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const saved = localStorage.getItem('cookbook');
		if (saved) {
			dispatch(setSavedIds(JSON.parse(saved)));
		}
	}, [dispatch]);

	return null;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<Provider store={store}>
					<CookingProvider>
						<InitCookbook />
						<NavBar />
						<main className="pt-32 min-h-screen">
                            {children}
                        </main>
                        <footer className="py-20 text-center border-t border-dashed mt-20 opacity-30">
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-primary">Yummy Culinary Protocol</div>
                            <p className="text-[9px] font-medium">&copy; 2026 Advanced Cooking Systems. All rights reserved.</p>
                        </footer>
					</CookingProvider>
				</Provider>
			</body>
		</html>
	);
}
