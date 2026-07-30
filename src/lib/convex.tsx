"use client";

import { ConvexReactClient, ConvexProviderWithAuth } from "convex/react";
import type { ReactNode } from "react";
import { AppAuthProvider, useConvexAuthBridge } from "@/lib/auth";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  throw new Error("Missing VITE_CONVEX_URL");
}

const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithAuth client={convex} useAuth={useConvexAuthBridge}>
      {children}
    </ConvexProviderWithAuth>
  );
}

export function AppConvexProvider({ children }: { children: ReactNode }) {
  return (
    <AppAuthProvider>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </AppAuthProvider>
  );
}

export { convex };
