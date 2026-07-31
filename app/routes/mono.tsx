import { useState, useEffect } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mono")({
  component: HomepageMono,
});

export default function HomepageMono() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f9] font-mono text-[#272357]">
      {/* Minimal nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#f5f5f9] px-6 py-4">
        <div className="flex items-center gap-4">
          <span
            className={`text-xl font-black transition-opacity duration-200 ${scrolled ? "opacity-100" : "opacity-0"}`}
          >
            lawn
          </span>
          <span
            className={`hidden border-l border-[#dadae8] pl-4 text-xs text-[#6b6b8a] transition-opacity duration-200 sm:inline ${scrolled ? "opacity-100" : "opacity-0"}`}
          >
            video review
          </span>
        </div>
        <div className="flex gap-4 text-sm">
          <Link to="/sign-in" className="hover:underline">
            Sign In
          </Link>
          <Link to="/sign-up" className="font-bold underline underline-offset-4">
            Start
          </Link>
        </div>
      </nav>

      {/* Hero - Massive brand + clear statement */}
      <section className="px-6 pt-8 pb-16">
        <div className="mx-auto max-w-6xl">
          {/* Giant lawn */}
          <h1 className="text-[20vw] leading-[0.85] font-black tracking-tight sm:text-[18vw]">
            lawn
          </h1>

          {/* What it is - immediately clear */}
          <div className="mt-8 max-w-2xl">
            <p className="text-2xl leading-tight font-bold sm:text-3xl">
              Video review for creative teams.
              <br />
              <span className="text-[#5252e6]">Less features. No bull$#!t.</span>
            </p>
          </div>

          {/* Key differentiator */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="bg-[#5252e6] px-6 py-4 text-[#f5f5f9]">
              <span className="text-3xl font-black">$5/mo</span>
              <span className="ml-2 text-sm opacity-70">unlimited seats</span>
            </div>
            <Link
              to="/sign-up"
              className="border-2 border-[#272357] px-6 py-4 font-bold transition-colors hover:bg-[#272357] hover:text-[#f5f5f9]"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      {/* Simple value props */}
      <section className="border-y-2 border-[#272357]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Frame-accurate", desc: "Comments on exact frames" },
            { title: "Unlimited seats", desc: "One price for everyone" },
            { title: "0.3s response", desc: "Built for speed" },
            { title: "Any NLE", desc: "No lock-in" },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 ${i < 3 ? "border-r-2 border-[#272357]" : ""} ${i < 2 ? "lg:border-r-2" : "lg:border-r-0"}`}
            >
              <div className="font-black">{item.title}</div>
              <div className="text-sm text-[#6b6b8a]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison - straightforward */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-2xl font-black">How lawn compares</h2>
          <p className="mb-8 text-[#6b6b8a]">Frame.io is solid software. Here's where we differ.</p>

          <div className="space-y-6">
            {/* Pricing comparison - the big one */}
            <div className="bg-[#272357] p-8 text-[#f5f5f9]">
              <div className="mb-4 text-sm tracking-widest text-[#8c8cf0]">PRICING MODEL</div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <div className="mb-1 text-sm text-[#6b6b8a]">Frame.io</div>
                  <div className="text-2xl font-black">$19/editor/mo</div>
                  <div className="mt-2 text-sm text-[#6b6b8a]">Team of 5 = $1,140/year</div>
                </div>
                <div>
                  <div className="mb-1 text-sm text-[#8c8cf0]">Nu-Create</div>
                  <div className="text-2xl font-black text-[#8c8cf0]">$5/mo total</div>
                  <div className="mt-2 text-sm text-[#6b6b8a]">Team of 5 = $60/year</div>
                </div>
              </div>
              <div className="mt-6 border-t border-[#38366d] pt-6">
                <span className="text-sm text-[#6b6b8a]">Annual savings with 5 users: </span>
                <span className="text-xl font-black text-[#8c8cf0]">$1,080</span>
              </div>
            </div>

            {/* Other differences */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-2 border-[#272357] p-6">
                <div className="mb-2 font-black">Frame.io</div>
                <ul className="space-y-1 text-sm text-[#6b6b8a]">
                  <li>• Deep Adobe integration</li>
                  <li>• More enterprise features</li>
                  <li>• Larger ecosystem</li>
                </ul>
              </div>
              <div className="border-2 border-[#5252e6] p-6">
                <div className="mb-2 font-black text-[#5252e6]">Nu-Create</div>
                <ul className="space-y-1 text-sm">
                  <li>• Works with any software</li>
                  <li>• Simpler, faster interface</li>
                  <li>• No per-seat pricing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - visual */}
      <section className="bg-[#272357] px-6 py-16 text-[#f5f5f9]">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-2xl font-black">How it works</h2>

          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            {[
              { step: "1", action: "Upload", desc: "your video" },
              { step: "2", action: "Share", desc: "the link" },
              { step: "3", action: "Click", desc: "to comment" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center bg-[#5252e6] text-3xl font-black">
                  {item.step}
                </span>
                <div>
                  <div className="text-xl font-black">{item.action}</div>
                  <div className="text-sm text-[#6b6b8a]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-b-2 border-[#272357] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl leading-tight font-bold sm:text-3xl">
            "I built lawn because I got tired of waiting for Frame.io to load. Video review should
            be instant."
          </blockquote>
          <p className="mt-4 text-[#6b6b8a]">
            —{" "}
            <a
              href="https://x.com/theo"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#272357]"
            >
              Theo
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl font-black sm:text-6xl">Pick your plan</h2>
          <p className="mt-4 mb-8 text-xl text-[#6b6b8a]">Basic is $5/month. Pro is $25/month.</p>
          <Link
            to="/sign-up"
            className="inline-block bg-[#5252e6] px-12 py-5 text-xl font-black text-[#f5f5f9] transition-colors hover:bg-[#4343cf]"
          >
            Start with Basic
          </Link>
          <p className="mt-4 text-sm text-[#6b6b8a]">Upgrade to Pro anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#272357] px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-sm">
          <span className="text-xl font-black">Nu-Create</span>
          <div className="flex gap-6 text-[#6b6b8a]">
            <a href="/github" className="hover:text-[#272357]">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
