import { Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

const WIPSTER_PRICE_PER_USER = 15;
const LAWN_PRICE_FLAT = 5;

const comparisonRows = [
  {
    feature: "Pricing",
    wipster: "Per-user/month",
    lawn: "$5/month. Total.",
    note: "Your accountant will love you.",
  },
  {
    feature: "Open source",
    wipster: "No",
    lawn: "Yes",
    note: "You can literally read our code.",
  },
  {
    feature: "Speed",
    wipster: "Solid, no complaints",
    lawn: "Instant Mux playback",
    note: "We're unreasonably competitive about this.",
  },
  {
    feature: "Sharing",
    wipster: "Invite to workspace",
    lawn: "Just a link",
    note: "Your clients don't want another login.",
  },
  {
    feature: "Simplicity",
    wipster: "Full-featured platform",
    lawn: "Fewer features (on purpose)",
    note: "We call this a feature, not a bug.",
  },
  {
    feature: "Approvals",
    wipster: "Built-in workflows",
    lawn: "Comments + thumbs up",
    note: "If that's not enough, we respect that.",
  },
];

const teamSizes = [3, 5, 10, 25];

function annualSavings(teamSize: number) {
  return (WIPSTER_PRICE_PER_USER * teamSize - LAWN_PRICE_FLAT) * 12;
}

const savingsCommentary: Record<number, string> = {
  3: "A very nice dinner for the team.",
  5: "That's a new camera lens.",
  10: "A weekend at a cabin to celebrate shipping.",
  25: "Genuinely, that's a lot of money.",
};

export default function CompareWipster() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--background)] px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[14vw] leading-[0.85] font-black tracking-tighter uppercase sm:text-[10vw] md:text-[8vw]">
            lawn vs
            <br />
            Wipster
          </h1>
          <div className="mt-10 max-w-2xl md:mt-14">
            <p className="text-2xl leading-tight font-black tracking-tight uppercase md:text-3xl">
              Two video review tools
              <br />
              walk into a bar.
              <br />
              <span className="text-[var(--foreground-muted)]">
                One costs less. That's the whole joke.
              </span>
            </p>
            <p className="mt-6 max-w-lg text-lg font-medium text-[var(--foreground-muted)]">
              Wipster is a solid tool with real approval workflows and a proper feature set. lawn is
              smaller, cheaper, and open source. We do less for less money, and that's the whole
              pitch.
            </p>
          </div>
        </div>
      </section>

      {/* Side-by-side comparison table */}
      <section className="border-b-2 border-[var(--border)] bg-[var(--surface-alt)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            SIDE BY
            <br />
            SIDE.
          </h2>

          <div className="border-2 border-[var(--border)] bg-[var(--background)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
            {/* Header row */}
            <div className="grid grid-cols-3 border-b-2 border-[var(--border)] bg-[var(--surface-strong)] text-[var(--foreground-inverse)]">
              <div className="p-4 text-sm font-black tracking-wider uppercase md:p-6">Feature</div>
              <div className="border-l-2 border-[var(--border)] p-4 text-sm font-black tracking-wider uppercase md:p-6">
                Wipster
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
                  {row.wipster}
                </div>
                <div className="flex items-center border-l-2 border-[var(--border)] p-4 font-bold text-[var(--accent)] md:p-6">
                  {row.lawn}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-[var(--foreground-muted)] md:hidden">
            * Wipster pricing based on their per-user model. Actual pricing may vary by plan.
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
            Wipster charges per user. lawn charges $5 per month total. Not per user. Just $5. The
            math gets increasingly silly as your team grows.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamSizes.map((size) => {
              const savings = annualSavings(size);
              const wipsterAnnual = WIPSTER_PRICE_PER_USER * size * 12;
              const lawnAnnual = LAWN_PRICE_FLAT * 12;

              return (
                <div
                  key={size}
                  className="flex flex-col border-2 border-[var(--border)] bg-[var(--background)] shadow-[6px_6px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]"
                >
                  <div className="border-b-2 border-[var(--border)] bg-[var(--surface-strong)] p-5 text-[var(--foreground-inverse)]">
                    <span className="text-4xl font-black">{size}</span>
                    <span className="ml-2 text-sm font-bold tracking-wider text-[var(--foreground-muted)] uppercase">
                      people
                    </span>
                  </div>
                  <div className="flex flex-grow flex-col p-5">
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold tracking-wider text-[var(--foreground-muted)] uppercase">
                        Wipster
                      </span>
                      <span className="font-black text-[var(--foreground-muted)] line-through">
                        ${wipsterAnnual.toLocaleString()}/yr
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

          {/* Open source callout */}
          <div className="mt-16 border-2 border-[var(--accent)] bg-[var(--accent)] p-8 text-[var(--foreground-inverse)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
            <p className="mb-3 text-sm font-bold tracking-widest text-[var(--accent-light)] uppercase">
              THE OPEN SOURCE THING
            </p>
            <p className="mb-3 text-xl leading-tight font-black tracking-tight uppercase md:text-2xl">
              You can literally read our code.
            </p>
            <p className="max-w-2xl text-base font-medium opacity-90">
              lawn is fully open source. Every line. The elegant parts and the parts where we left a
              TODO from three months ago. No black box. No trust required. Just code you can read,
              fork, and judge silently.
            </p>
            <a
              href="https://github.com/pingdotgg/lawn"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-black tracking-wider uppercase underline underline-offset-4 transition-colors hover:text-[var(--accent-light)]"
            >
              View on GitHub
            </a>
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
            Wipster is genuinely good software built by people who care about video review. We just
            think there's room for something simpler. Here are the facts.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Use Wipster if... */}
            <div className="border-2 border-[var(--border)] bg-[var(--background)] shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              <div className="border-b-2 border-[var(--border)] p-6">
                <h3 className="text-2xl font-black tracking-tighter uppercase md:text-3xl">
                  Use Wipster if...
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      You need built-in approval workflows with multiple review stages, status
                      tracking, and the whole production pipeline
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      You're an established media team that's already invested in a full review
                      ecosystem and switching costs are real
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      You want deep review stages with version comparisons, granular permissions,
                      and structured feedback rounds
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--foreground-muted)]">
                      --
                    </span>
                    <span className="font-medium">
                      Per-user pricing is fine because your budget is already approved and nobody's
                      counting
                    </span>
                  </li>
                </ul>
                <p className="mt-6 border-t-2 border-[var(--border-subtle)] pt-4 text-sm text-[var(--foreground-muted)]">
                  Seriously, Wipster is good. If this is you, go use it. We'll be here if you change
                  your mind later.
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
                      You're a small team or agency that just needs to share cuts and collect
                      feedback without a 45-minute onboarding
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--accent-light)]">
                      --
                    </span>
                    <span className="font-medium">
                      You hate per-seat pricing with a passion that concerns your friends and family
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--accent-light)]">
                      --
                    </span>
                    <span className="font-medium">
                      You want clients to review with just a link, no account creation, no "please
                      check your email" nonsense
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-lg font-black text-[var(--accent-light)]">
                      --
                    </span>
                    <span className="font-medium">
                      You value open source and want to know exactly what software you're trusting
                      with your work
                    </span>
                  </li>
                </ul>
                <p className="mt-6 border-t border-[#38366d] pt-4 text-sm text-[var(--foreground-muted)]">
                  We do less than Wipster. Proudly. Upload, share, comment. Go home. That's 90% of
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
            $5/month. Unlimited seats. Open source. No per-user nonsense.
          </p>
          <Link
            to="/sign-up"
            className="border-2 border-[var(--border)] bg-[var(--surface-strong)] px-12 py-6 text-2xl font-black tracking-wider text-[var(--foreground-inverse)] uppercase shadow-[12px_12px_0px_0px_var(--shadow-accent)] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:shadow-[8px_8px_0px_0px_var(--shadow-accent)]"
          >
            START FREE TRIAL
          </Link>
          <p className="mt-6 text-sm text-[var(--foreground-muted)]">
            No credit card required. No per-seat gotchas.
            <br />
            Just video review that doesn't require a spreadsheet to budget.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
