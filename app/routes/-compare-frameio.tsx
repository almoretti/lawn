import { Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

const FRAMEIO_PRICE_PER_USER = 19;
const LAWN_PRICE_FLAT = 5;

const comparisonRows = [
  {
    feature: "Price",
    frameio: "$19/user/month",
    lawn: "$5/month. Total.",
    note: "Math is hard, but not that hard.",
  },
  {
    feature: "Seats",
    frameio: "Limited by plan tier",
    lawn: "Unlimited",
    note: "Your intern deserves access too.",
  },
  {
    feature: "Speed",
    frameio: "It's... fine",
    lawn: "Actually fast",
    note: "We obsess over this so you don't wait.",
  },
  {
    feature: "Open source",
    frameio: "No",
    lawn: "Yes",
    note: "Read our code. Judge us.",
  },
  {
    feature: "Sharing",
    frameio: "Account required",
    lawn: "Just a link",
    note: "Your clients don't want another login.",
  },
  {
    feature: "Setup",
    frameio: "Call sales for enterprise",
    lawn: "Sign up and upload",
    note: "Under 60 seconds or your money back.",
  },
];

const teamSizes = [3, 5, 10, 20];

function annualSavings(teamSize: number) {
  return (FRAMEIO_PRICE_PER_USER * teamSize - LAWN_PRICE_FLAT) * 12;
}

const savingsCommentary: Record<number, string> = {
  3: "That's a lot of burritos.",
  5: "A nice weekend trip for the team.",
  10: "A used car. A really used car.",
  20: "You could hire another freelancer with that.",
};

export default function CompareFrameio() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--background)] px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[14vw] leading-[0.85] font-black tracking-tighter uppercase sm:text-[10vw] md:text-[8vw]">
            lawn vs
            <br />
            Frame.io
          </h1>
          <div className="mt-10 max-w-2xl md:mt-14">
            <p className="text-2xl leading-tight font-black tracking-tight uppercase md:text-3xl">
              We're not better.
              <br />
              We're cheaper and faster.
              <br />
              <span className="text-[var(--foreground-muted)]">That might be better.</span>
            </p>
            <p className="mt-6 max-w-lg text-lg font-medium text-[var(--foreground-muted)]">
              Frame.io is a great product built for enterprise teams with enterprise budgets. lawn
              is a scrappy little tool that does the important stuff for $5/month flat. No per-seat
              math. No PhD in procurement required.
            </p>
          </div>
        </div>
      </section>

      {/* Side-by-side comparison table */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            FEATURE
            <br />
            FIGHT.
          </h2>

          <div className="border-2 border-[var(--border)] bg-[var(--background)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
            {/* Header row */}
            <div className="grid grid-cols-3 border-b-2 border-[var(--border)] bg-[var(--surface-strong)] text-[var(--foreground-inverse)]">
              <div className="p-4 text-sm font-black tracking-wider uppercase md:p-6">Feature</div>
              <div className="border-l-2 border-[var(--border)] p-4 text-sm font-black tracking-wider uppercase md:p-6">
                Frame.io
              </div>
              <div className="border-l-2 border-[var(--border)] p-4 text-sm font-black tracking-wider text-[var(--accent-light)] uppercase md:p-6">
                lawn
              </div>
            </div>

            {/* Data rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i < comparisonRows.length - 1 ? "border-b-2 border-[var(--border)]" : ""}`}
              >
                <div className="flex flex-col justify-center p-4 md:p-6">
                  <span className="text-lg font-black tracking-tight uppercase">{row.feature}</span>
                  <span className="mt-1 hidden text-xs text-[var(--foreground-muted)] md:block">
                    {row.note}
                  </span>
                </div>
                <div className="flex items-center border-l-2 border-[var(--border)] p-4 font-medium text-[var(--foreground-muted)] md:p-6">
                  {row.frameio}
                </div>
                <div className="flex items-center border-l-2 border-[var(--border)] p-4 font-bold text-[var(--accent)] md:p-6">
                  {row.lawn}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-[var(--foreground-muted)] md:hidden">
            * Frame.io pricing based on their Team plan at $19/user/month.
          </p>
        </div>
      </section>

      {/* Cost savings calculator */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--background)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            DO THE
            <br />
            MATH.
          </h2>
          <p className="mx-auto mb-16 max-w-lg text-center text-lg font-medium text-[var(--foreground-muted)]">
            Frame.io charges $19 per user per month. lawn charges $5 per month. Not per user. Just
            $5. Here's what that means annually.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamSizes.map((size) => {
              const savings = annualSavings(size);
              const frameioAnnual = FRAMEIO_PRICE_PER_USER * size * 12;
              const lawnAnnual = LAWN_PRICE_FLAT * 12;

              return (
                <div
                  key={size}
                  className="flex flex-col border-2 border-[var(--border)] bg-[var(--background)] shadow-[6px_6px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]"
                >
                  <div className="border-b-2 border-[var(--border)] bg-[var(--surface-strong)] p-5 text-[var(--foreground-inverse)]">
                    <span className="text-4xl font-black">{size}</span>
                    <span className="ml-2 text-sm font-bold tracking-wider text-[var(--foreground-muted)] uppercase">
                      {size === 1 ? "person" : "people"}
                    </span>
                  </div>
                  <div className="flex flex-grow flex-col p-5">
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold tracking-wider text-[var(--foreground-muted)] uppercase">
                        Frame.io
                      </span>
                      <span className="font-black text-[var(--foreground-muted)] line-through">
                        ${frameioAnnual.toLocaleString()}/yr
                      </span>
                    </div>
                    <div className="mb-4 flex items-baseline justify-between">
                      <span className="text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
                        lawn
                      </span>
                      <span className="font-black text-[var(--accent)]">${lawnAnnual}/yr</span>
                    </div>
                    <div className="mt-auto border-t-2 border-[var(--border-subtle)] pt-4">
                      <div className="text-3xl font-black text-[var(--accent)]">
                        ${savings.toLocaleString()}
                      </div>
                      <div className="text-xs font-bold tracking-wider text-[var(--foreground-muted)] uppercase">
                        saved per year
                      </div>
                      <p className="mt-2 text-sm text-[var(--foreground-muted)] italic">
                        {savingsCommentary[size]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Honest "who should use what" */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            HONEST
            <br />
            ADVICE.
          </h2>
          <p className="mx-auto mb-16 max-w-lg text-center text-lg font-medium text-[var(--foreground-muted)]">
            We could trash-talk Frame.io but that would be dishonest and also they have way more
            employees than us. Here's the real deal.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Use Frame.io if... */}
            <div className="border-2 border-[var(--border)] bg-[var(--background)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              <div className="border-b-2 border-[var(--border)] p-6">
                <h3 className="text-2xl font-black tracking-tighter uppercase md:text-3xl">
                  Use Frame.io if...
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      You need enterprise compliance docs (SOC 2, etc.) for your procurement team to
                      approve anything
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      You're deeply embedded in Adobe Premiere and After Effects and need native
                      panel integration
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      You have 100+ people with complex multi-stage approval workflows and version
                      trees
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      Budget isn't a concern and you want every feature imaginable, even the ones
                      you'll never use
                    </span>
                  </li>
                </ul>
                <p className="mt-6 border-t-2 border-[var(--border-subtle)] pt-4 text-sm text-[var(--foreground-muted)]">
                  Genuinely, Frame.io is solid software. If this is you, go use it. We won't be
                  offended. (Okay maybe a little.)
                </p>
              </div>
            </div>

            {/* Use lawn if... */}
            <div className="border-2 border-[var(--border)] bg-[var(--surface-strong)] text-[var(--foreground-inverse)] shadow-[8px_8px_0px_0px_var(--shadow-accent)]">
              <div className="border-b-2 border-[var(--border)] p-6">
                <h3 className="text-2xl font-black tracking-tighter text-[var(--accent-light)] uppercase md:text-3xl">
                  Use lawn if...
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--accent-light)]">
                      --
                    </span>
                    <span className="font-medium">
                      You're a small-to-mid team that just needs to share cuts and collect feedback
                      without a NASA control panel
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--accent-light)]">
                      --
                    </span>
                    <span className="font-medium">
                      You're an agency tired of doing per-seat multiplication every time you onboard
                      a client
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--accent-light)]">
                      --
                    </span>
                    <span className="font-medium">
                      You're a freelancer who just needs to show a cut to a client without making
                      them create yet another account
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--accent-light)]">
                      --
                    </span>
                    <span className="font-medium">
                      You value speed and simplicity over a feature checklist that makes the
                      marketing site look impressive
                    </span>
                  </li>
                </ul>
                <p className="mt-6 border-t border-[#38366d] pt-4 text-sm text-[var(--foreground-muted)]">
                  We do less than Frame.io. Proudly. Turns out "upload, share, comment" is 90% of
                  what anyone actually needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--background)] px-6 py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-4 text-7xl leading-[0.8] font-black tracking-tighter uppercase md:text-9xl">
            START
            <br />
            NOW.
          </h2>
          <p className="mb-12 max-w-md text-xl font-medium text-[var(--foreground-muted)] md:text-2xl">
            $5/month. Unlimited seats. No sales call required. No credit card to start.
          </p>
          <Link
            to="/sign-up"
            className="border-2 border-[var(--border)] bg-[var(--surface-strong)] px-12 py-6 text-2xl font-black tracking-wider text-[var(--foreground-inverse)] uppercase shadow-[12px_12px_0px_0px_var(--shadow-accent)] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:shadow-[8px_8px_0px_0px_var(--shadow-accent)]"
          >
            TRY LAWN FREE
          </Link>
          <p className="mt-6 text-sm text-[var(--foreground-muted)]">
            Or keep paying $19/user/month. We don't judge.
            <br />
            (We judge a little.)
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
