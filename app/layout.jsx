"use client";

import { SearchProvider } from "@/utils/contexts/SearchContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Praca - WorkHunter",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <body /*className={inter.className}*/>{children}</body>
        </SearchProvider>
      </QueryClientProvider>
    </html>
  );
}
