"use client";

import "./globals.css";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "@/store";
import { CookingProvider, useCooking } from "@/context/CookingContext";
import { useAppSelector } from "@/hooks/useRedux";

function NavBar() {
  const { theme, toggleTheme } = useCooking();
  const saved = useAppSelector((s) => s.cookbook.savedIds.length);

  return (
    <nav className="flex justify-between p-4 border">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/recipes">Browse</Link>
        <Link href="/cookbook">Cookbook ({saved})</Link>
        <Link href="/manage">Manage</Link>
      </div>

      <button onClick={toggleTheme} className="border px-2">
        Theme: {theme}
      </button>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <CookingProvider>
            <NavBar />
            <div className="p-4">{children}</div>
          </CookingProvider>
        </Provider>
      </body>
    </html>
  );
}