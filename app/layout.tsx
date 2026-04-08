"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { CookingProvider } from "@/context/CookingContext";

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
            <div className="min-h-screen">{children}</div>
          </CookingProvider>
        </Provider>
      </body>
    </html>
  );
}