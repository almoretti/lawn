import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { MarketingFooter } from "@/components/MarketingFooter";

function HomeNavActions({ scrolled }: { scrolled: boolean }) {
  const startClassName = `inline-flex min-w-[76px] justify-center px-4 py-2 border-2 transition-colors ${scrolled ? "border-[#272357] hover:bg-[#272357] hover:text-[#f5f5f9]" : "border-[#f5f5f9] hover:bg-[#f5f5f9] hover:text-[#272357]"}`;

  return (
    <Link to="/sign-in" className={startClassName}>
      Log in
    </Link>
  );
}

export default function Homepage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force light mode variables for the homepage to override the global app.css dark mode behavior
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

  return (
    <div
      className="min-h-screen font-mono selection:bg-[#5252e6] selection:text-[#f5f5f9]"
      style={{ ...lightModeVars, backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Minimal nav */}
      <nav
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-200 ${scrolled ? "border-b-2 border-[#272357] bg-[#f5f5f9] text-[#272357]" : "bg-transparent text-[#f5f5f9] drop-shadow-md"}`}
      >
        <div className="flex items-center gap-4">
          <span
            className={`text-xl font-black tracking-tighter transition-opacity duration-200 ${scrolled ? "opacity-100" : "opacity-0"}`}
          >
            lawn.
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm font-bold tracking-wide uppercase">
          <a href="#pricing" className="underline-offset-4 hover:underline">
            Pricing
          </a>
          <Link
            to="/compare/frameio"
            className={`hidden underline-offset-4 hover:underline sm:block`}
          >
            Compare
          </Link>
          <HomeNavActions scrolled={scrolled} />
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative flex min-h-[85vh] flex-col justify-end overflow-x-clip border-b-2 border-[#272357] bg-cover bg-center bg-no-repeat px-6 pt-32 pb-32 text-[#f5f5f9] md:pb-24"
        style={{ backgroundImage: `url('/grassy-bg.avif')` }}
      >
        {/* Lighter tint since text is now in highly contrasting blocks or heavily shadowed */}
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Massive Title with Brutalist Depth */}
          <h1
            className="ml-[-0.5vw] text-[25vw] leading-[0.75] font-black tracking-tighter sm:text-[22vw]"
            style={{
              textShadow: "8px 8px 0 #272357, 0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            lawn
          </h1>

          <div className="mt-20 flex flex-col gap-12 md:mt-24 lg:flex-row lg:items-end lg:justify-between">
            {/* Highly Creative Contrast Subheadline Blocks (Stickers) */}
            <div className="flex max-w-full flex-col items-start gap-4 md:gap-6">
              <div className="max-w-full origin-bottom-left -rotate-2 border-2 border-[#272357] bg-[#f5f5f9] px-5 py-3 text-[#272357] shadow-[6px_6px_0px_0px_var(--shadow-color)] md:px-8 md:py-4 md:shadow-[8px_8px_0px_0px_var(--shadow-color)]">
                <p className="text-2xl leading-tight font-black tracking-tight uppercase sm:text-3xl md:text-4xl md:leading-none">
                  Video review for creative teams.
                </p>
              </div>
              <div className="ml-2 max-w-full origin-top-left rotate-1 border-2 border-[#272357] bg-[#5252e6] px-5 py-3 text-[#f5f5f9] shadow-[6px_6px_0px_0px_var(--shadow-color)] md:ml-8 md:px-8 md:py-4 md:shadow-[8px_8px_0px_0px_var(--shadow-color)]">
                <p className="text-xl leading-tight font-black tracking-tight uppercase sm:text-2xl md:text-3xl md:leading-none">
                  Less features. No bull$#!t.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-6 pb-2 sm:flex-row lg:mt-0 lg:justify-end">
              <div className="self-start border-2 border-[#272357] bg-[#f5f5f9] px-6 py-4 text-[#272357] shadow-[6px_6px_0px_0px_var(--shadow-color)] sm:self-auto md:px-8 md:py-5 md:shadow-[8px_8px_0px_0px_var(--shadow-color)]">
                <span className="block text-3xl leading-none font-black md:text-4xl">$5/mo</span>
                <span className="mt-1 block text-xs font-bold tracking-wider text-[#6b6b8a] uppercase md:mt-2 md:text-sm">
                  Unlimited seats
                </span>
              </div>
              <Link
                to="/sign-up"
                className="flex items-center justify-center self-start border-2 border-[#272357] bg-[#272357] px-6 py-4 text-lg font-black text-[#f5f5f9] shadow-[6px_6px_0px_0px_var(--shadow-color)] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#5252e6] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] sm:self-auto md:px-8 md:py-5 md:text-xl md:shadow-[8px_8px_0px_0px_var(--shadow-color)] md:hover:shadow-[6px_6px_0px_0px_var(--shadow-color)]"
              >
                START FREE TRIAL →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brutalist Value Props Bar */}
      <section className="border-b-2 border-[#272357] bg-[#f5f5f9]">
        <div className="grid grid-cols-1 divide-y-2 divide-[#272357] md:grid-cols-2 md:divide-x-2 md:divide-y-0 xl:grid-cols-4">
          {[
            {
              id: "01",
              title: "OPEN SOURCE",
              desc: "Fully open source. Read the code, fork it, make it yours.",
            },
            {
              id: "02",
              title: "ACTUALLY FAST",
              desc: "Instant playback. Built for speed, not loading spinners.",
            },
            {
              id: "03",
              title: "FLAT PRICING",
              desc: "$5 covers the whole agency. Stop counting seats.",
            },
            {
              id: "04",
              title: "SIMPLE SHARING",
              desc: "Just copy the link and send it to your client.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group flex flex-col p-8 transition-colors hover:bg-[#272357] hover:text-[#f5f5f9] lg:p-12"
            >
              <div className="mb-8 text-sm font-black text-[#6b6b8a] group-hover:text-[#8c8cf0]">
                /{item.id}
              </div>
              <h3 className="mb-4 text-3xl leading-none font-black tracking-tighter uppercase lg:text-4xl">
                {item.title}
              </h3>
              <p className="mt-auto text-lg font-medium opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works - Completely Rethought */}
      <section className="border-b-2 border-[#272357] bg-[#e9e9f2] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            HOW IT WORKS.
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {[
              {
                step: "1",
                action: "UPLOAD",
                desc: "Drag and drop your cut. We process it instantly.",
              },
              { step: "2", action: "SHARE", desc: "Send a link. No account required for clients." },
              {
                step: "3",
                action: "REVIEW",
                desc: "Click to comment on exact frames. Export to your NLE.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col border-2 border-[#272357] bg-[#f5f5f9] shadow-[12px_12px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]"
              >
                <div className="flex items-end justify-between border-b-2 border-[#272357] bg-[#272357] p-6 text-[#f5f5f9]">
                  <span className="text-7xl leading-none font-black">{item.step}</span>
                  <span className="mb-1 text-xl font-bold tracking-widest text-[#6b6b8a]">STEP</span>
                </div>
                <div className="flex flex-grow flex-col p-8">
                  <h3 className="mb-4 text-3xl font-black tracking-tighter text-[#5252e6] uppercase md:text-4xl">
                    {item.action}
                  </h3>
                  <p className="text-lg font-medium text-[#272357]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-b-2 border-[#272357] bg-[#f5f5f9] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-16 lg:flex-row">
            <div className="lg:w-1/3">
              <h2 className="mb-6 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
                THE
                <br />
                RIVAL.
              </h2>
              <p className="max-w-sm text-xl font-medium text-[#6b6b8a]">
                Frame.io is solid software. But you're paying for enterprise features you don't
                need.
              </p>
            </div>

            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 border-2 border-[#272357] shadow-[12px_12px_0px_0px_var(--shadow-color)] md:grid-cols-2">
                {/* Competitor */}
                <div className="border-b-2 border-[#272357] bg-[#ffffff] p-8 md:border-r-2 md:border-b-0 md:p-12">
                  <div className="mb-2 text-sm font-bold tracking-widest text-[#6b6b8a]">
                    THE OTHER GUYS
                  </div>
                  <div className="mb-8 text-5xl font-black tracking-tighter">Frame.io</div>

                  <div className="mb-8">
                    <div className="text-3xl font-black">$19</div>
                    <div className="text-sm font-bold tracking-wider text-[#6b6b8a] uppercase">
                      Per user / month
                    </div>
                  </div>

                  <ul className="space-y-4 text-lg font-medium text-[#272357]">
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#e50000]">×</span>
                      Complex interface
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#e50000]">×</span>
                      Punishes you for growing
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#e50000]">×</span>
                      Bloated ecosystem
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#e50000]">×</span>
                      Closed source
                    </li>
                  </ul>
                </div>

                {/* Us */}
                <div className="bg-[#272357] p-8 text-[#f5f5f9] md:p-12">
                  <div className="mb-2 text-sm font-bold tracking-widest text-[#8c8cf0]">
                    THE SOLUTION
                  </div>
                  <div className="mb-8 text-5xl font-black tracking-tighter text-[#8c8cf0]">
                    lawn
                  </div>

                  <div className="mb-8">
                    <div className="text-3xl font-black text-[#8c8cf0]">$5</div>
                    <div className="text-sm font-bold tracking-wider text-[#6b6b8a] uppercase">
                      Flat total / month
                    </div>
                  </div>

                  <ul className="space-y-4 text-lg font-medium">
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#8c8cf0]">✓</span>
                      Stupidly fast
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#8c8cf0]">✓</span>
                      Invite the whole team
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#8c8cf0]">✓</span>
                      Just what you need
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-black text-[#8c8cf0]">✓</span>
                      Fully open source
                    </li>
                  </ul>

                  <div className="mt-12 border-t border-[#38366d] pt-6">
                    <span className="mb-1 block text-sm font-bold tracking-wider text-[#6b6b8a] uppercase">
                      Yearly savings (5 users)
                    </span>
                    <span className="text-4xl font-black text-[#8c8cf0]">$1,080</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-b-2 border-[#272357] bg-[#5252e6] px-6 py-32 text-[#f5f5f9]">
        <div className="mx-auto max-w-5xl text-center">
          <blockquote className="mb-8 text-4xl leading-tight font-black tracking-tighter uppercase md:text-6xl">
            "I built lawn because I got tired of waiting for Frame.io to load. Video review should
            be instant."
          </blockquote>
          <a
            href="https://x.com/theo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[#f5f5f9] px-6 py-3 font-bold tracking-wider uppercase transition-colors hover:bg-[#f5f5f9] hover:text-[#5252e6]"
          >
            — Theo
          </a>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="border-b-2 border-[#272357] bg-[#e9e9f2] px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            PRICING.
          </h2>

          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {/* $5 Plan */}
            <div className="flex w-full max-w-md flex-col border-2 border-[#272357] bg-[#f5f5f9] p-8 shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]">
              <div className="mb-2 text-xl font-bold tracking-widest text-[#6b6b8a] uppercase">
                Basic
              </div>
              <div className="mb-4 text-6xl font-black tracking-tighter">
                $5<span className="text-2xl text-[#6b6b8a]">/mo</span>
              </div>
              <p className="mb-8 text-lg font-medium text-[#272357]">
                Unlimited everything, except storage.
              </p>

              <ul className="mb-8 flex-grow space-y-4 text-lg font-bold">
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#5252e6]">✓</span> Unlimited seats
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#5252e6]">✓</span> Unlimited projects
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#5252e6]">✓</span> Unlimited clients
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#5252e6]">✓</span> 100GB Storage
                </li>
              </ul>

              <Link
                to="/sign-up"
                className="border-2 border-[#272357] bg-[#272357] py-4 text-center font-black text-[#f5f5f9] uppercase transition-colors hover:bg-[#5252e6]"
              >
                Get Basic
              </Link>
            </div>

            {/* $25 Plan */}
            <div className="flex w-full max-w-md transform flex-col border-2 border-[#272357] bg-[#272357] p-8 text-[#f5f5f9] shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-2 hover:-translate-y-6 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)] md:-translate-y-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="text-xl font-bold tracking-widest text-[#8c8cf0] uppercase">
                  Pro
                </div>
                <div className="-rotate-3 bg-[#5252e6] px-2 py-1 text-xs font-black tracking-wider uppercase">
                  Big files
                </div>
              </div>
              <div className="mb-4 text-6xl font-black tracking-tighter">
                $25<span className="text-2xl text-[#6b6b8a]">/mo</span>
              </div>
              <p className="mb-8 text-lg font-medium">
                Literally the exact same thing but more space.
              </p>

              <ul className="mb-8 flex-grow space-y-4 text-lg font-bold">
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#8c8cf0]">✓</span> Unlimited seats
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#8c8cf0]">✓</span> Unlimited projects
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#8c8cf0]">✓</span> Unlimited clients
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#8c8cf0]">✓</span> 1TB Storage (Whoa)
                </li>
              </ul>

              <Link
                to="/sign-up"
                className="border-2 border-[#f5f5f9] bg-[#f5f5f9] py-4 text-center font-black text-[#272357] uppercase transition-colors hover:bg-[#dadae8]"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA */}
      <section className="bg-[#f5f5f9] px-6 py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-8 text-7xl leading-[0.8] font-black tracking-tighter uppercase md:text-9xl">
            START
            <br />
            NOW.
          </h2>
          <p className="mb-12 text-2xl font-medium text-[#6b6b8a]">
            Basic is $5/month. Pro is $25/month.
          </p>
          <Link
            to="/sign-up"
            className="border-2 border-[#272357] bg-[#272357] px-12 py-6 text-2xl font-black tracking-wider text-[#f5f5f9] uppercase shadow-[12px_12px_0px_0px_var(--shadow-accent)] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#5252e6] hover:bg-[#5252e6] hover:shadow-[8px_8px_0px_0px_var(--shadow-accent)]"
          >
            CREATE YOUR TEAM
          </Link>
        </div>
      </section>

      <MarketingFooter />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Nu-Create",
            description:
              "Video review and collaboration for creative teams. Frame-accurate comments, unlimited seats, flat pricing.",
            url: "https://lawn.video",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web",
            offers: [
              {
                "@type": "Offer",
                name: "Basic",
                price: "5.00",
                priceCurrency: "USD",
                description:
                  "Unlimited seats, unlimited projects, unlimited clients, 100GB storage",
              },
              {
                "@type": "Offer",
                name: "Pro",
                price: "25.00",
                priceCurrency: "USD",
                description: "Unlimited seats, unlimited projects, unlimited clients, 1TB storage",
              },
            ],
            creator: {
              "@type": "Person",
              name: "Theo",
              url: "https://x.com/theo",
            },
          }),
        }}
      />
    </div>
  );
}
