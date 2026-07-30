"use client";

// App-level auth, replacing Clerk. The browser fetches a JWT from
// /api/auth/token — in production that's the Cloudflare Access assertion the
// edge already attached to the request; in local dev it's a token minted by
// devAuth.server.ts. User info is decoded from the token's claims and the
// token is handed to Convex, which validates it against the issuer's JWKS
// (see convex/auth.config.ts).
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
};

type AuthState = {
  isLoaded: boolean;
  token: string | null;
  user: AppUser | null;
};

type AuthContextValue = AuthState & {
  refresh: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue>({
  isLoaded: false,
  token: null,
  user: null,
  refresh: async () => null,
});

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split(".")[1];
    const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function userFromToken(token: string): AppUser | null {
  const claims = decodeJwtPayload(token);
  if (!claims || typeof claims.sub !== "string") return null;
  const email = typeof claims.email === "string" ? claims.email : "";
  const name = typeof claims.name === "string" && claims.name ? claims.name : email || "User";
  const imageUrl =
    typeof claims.pictureUrl === "string"
      ? claims.pictureUrl
      : typeof claims.picture === "string"
        ? claims.picture
        : undefined;
  return { id: claims.sub, name, email, imageUrl };
}

async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/auth/token", { credentials: "include" });
    if (!res.ok) return null;
    const data = (await res.json()) as { token?: string | null };
    return data.token ?? null;
  } catch {
    return null;
  }
}

export function AppAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ isLoaded: false, token: null, user: null });

  const refresh = useCallback(async () => {
    const token = await fetchToken();
    setState({ isLoaded: true, token, user: token ? userFromToken(token) : null });
    return token;
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(() => ({ ...state, refresh }), [state, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Clerk `useUser` replacement: `{ user, isLoaded }`. */
export function useAppUser() {
  const { user, isLoaded } = useContext(AuthContext);
  return { user, isLoaded };
}

/** Clerk `useAuth` replacement: `{ isLoaded, userId }`. */
export function useAppAuth() {
  const { user, isLoaded } = useContext(AuthContext);
  return { isLoaded, userId: user?.id ?? null };
}

/** Adapter for Convex's `ConvexProviderWithAuth`. */
export function useConvexAuthBridge() {
  const { isLoaded, token, refresh } = useContext(AuthContext);
  const fetchAccessToken = useCallback(async () => await refresh(), [refresh]);
  return {
    isLoading: !isLoaded,
    isAuthenticated: isLoaded && token !== null,
    fetchAccessToken,
  };
}
