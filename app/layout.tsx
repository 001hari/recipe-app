"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="min-h-screen">{children}</div>
        </Provider>
      </body>
    </html>
  );
}