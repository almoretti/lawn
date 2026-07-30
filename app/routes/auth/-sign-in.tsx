import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useAppAuth } from "@/lib/auth";
import { AppAuthProvider } from "@/lib/auth";

// Sign-in is handled upstream of the app (Cloudflare Access at the edge in
// production; an always-on dev identity locally). This page just bounces
// authenticated visitors to their destination and explains itself to anyone
// who somehow reaches it unauthenticated.
function SignInContent() {
  const { isLoaded, userId } = useAppAuth();
  const search = useRouterState({
    select: (state) => state.location.searchStr,
  });
  const redirectUrl = new URLSearchParams(search).get("redirect_url") || "/dashboard";

  useEffect(() => {
    if (isLoaded && userId) {
      window.location.replace(redirectUrl);
    }
  }, [isLoaded, userId, redirectUrl]);

  return (
    <div className="border-2 border-[#272357] bg-[#f5f5f9] p-8 text-center shadow-[8px_8px_0px_0px_var(--shadow-color)]">
      {!isLoaded || userId ? (
        <p className="font-mono text-sm text-[#6b6b8a]">Signing you in...</p>
      ) : (
        <>
          <h1 className="font-mono text-2xl font-black tracking-tighter text-[#272357] uppercase">
            Access required
          </h1>
          <p className="mt-4 font-mono text-sm text-[#6b6b8a]">
            Sign-in is managed by your organisation&apos;s access layer. Reload the page to
            re-authenticate, or contact your administrator if the problem persists.
          </p>
          <a
            href={redirectUrl}
            className="mt-6 inline-block border-2 border-[#272357] bg-[#272357] px-6 py-2 font-mono text-sm font-bold text-[#f5f5f9] uppercase transition-all hover:bg-[#5252e6]"
          >
            Retry
          </a>
        </>
      )}
    </div>
  );
}

export default function SignInPage() {
  return (
    <AppAuthProvider>
      <SignInContent />
    </AppAuthProvider>
  );
}
