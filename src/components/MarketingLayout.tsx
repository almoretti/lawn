import type { ReactNode } from "react";
import { MarketingNav } from "./MarketingNav";
import { MarketingFooter } from "./MarketingFooter";

const lightModeVars = {
  "--background": "#f5f5f9",
  "--background-alt": "#272357",
  "--surface": "#ffffff",
  "--surface-alt": "#e9e9f2",
  "--surface-strong": "#272357",
  "--surface-muted": "#dadae8",
  "--foreground": "#272357",
  "--foreground-muted": "#6b6b8a",
  "--foreground-subtle": "#9a9ab5",
  "--foreground-inverse": "#f5f5f9",
  "--border": "#272357",
  "--border-subtle": "#dadae8",
  "--accent": "#5252e6",
  "--accent-hover": "#4343cf",
  "--accent-light": "#8c8cf0",
  "--shadow-color": "#272357",
  "--shadow-accent": "rgba(82,82,230,1)",
} as React.CSSProperties;

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen font-mono selection:bg-[#5252e6] selection:text-[#f5f5f9]"
      style={{
        ...lightModeVars,
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <MarketingNav />
      <main className="pt-16">{children}</main>
      <MarketingFooter />
    </div>
  );
}
