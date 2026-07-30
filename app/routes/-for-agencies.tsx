import { Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

const painPoints = [
  {
    id: "01",
    title: "ADDING A FREELANCER SHOULDN'T COST $19/MO",
    description:
      'You hired them for a two-week project. Why are you paying a monthly seat fee? lawn is $5/month total. Unlimited seats. Add your whole roster — full-timers, freelancers, that one intern who\'s "really good at Premiere."',
  },
  {
    id: "02",
    title: "CLIENTS NEED NO-ACCOUNT REVIEW",
    description:
      "Your client doesn't want to create an account. They want to watch the video, leave a comment at 0:47 that says \"make it pop more,\" and move on with their day. Send a link. That's it.",
  },
  {
    id: "03",
    title: "MANAGING 12 CLIENTS SHOULDN'T REQUIRE A PM TOOL",
    description:
      "Unlimited projects, organized by team. No per-project limits, no storage gotchas. Every client gets their own space. You get your sanity back.",
  },
  {
    id: "04",
    title: "FAST TURNAROUND MEANS FAST TOOLS",
    description:
      'Client says "I need to see it by 3pm." It\'s 2:47pm. You upload the cut, it plays instantly. No transcoding queue. No "processing your video" spinner. Just playback.',
  },
];

const comparisons = [
  {
    size: "5-PERSON TEAM",
    competitor: "$95",
    lawn: "$5",
    saved: "$1,080",
    commentary: "That's a lot of coffee.",
  },
  {
    size: "10-PERSON TEAM",
    competitor: "$190",
    lawn: "$5",
    saved: "$2,220",
    commentary: "A nice camera lens, actually.",
  },
  {
    size: "15 + FREELANCERS",
    competitor: "$285+",
    lawn: "$5",
    saved: "$3,360+",
    commentary: "Almost enough for one more freelancer.",
  },
];

export default function ForAgencies() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b-2 border-[#272357] bg-[#f5f5f9] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <span className="text-sm font-bold tracking-widest text-[#6b6b8a] uppercase">
              /FOR AGENCIES
            </span>
          </div>
          <h1 className="text-5xl leading-[0.85] font-black tracking-tighter uppercase sm:text-7xl md:text-8xl lg:text-9xl">
            STOP PAYING
            <br />
            PER SEAT.
            <br />
            <span className="text-[#5252e6]">START SHIPPING</span>
            <br />
            WORK.
          </h1>
          <div className="mt-12 max-w-2xl">
            <p className="text-xl font-medium text-[#272357] md:text-2xl">
              You're a 15-person agency with 30 freelancers rotating through. Per-seat pricing
              wasn't built for you. It was built to charge you more.
            </p>
            <p className="mt-4 text-lg font-medium text-[#6b6b8a]">
              lawn is video review for creative teams. Unlimited seats. $5/month. The whole agency,
              not per editor.
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/sign-up"
              className="border-2 border-[#272357] bg-[#272357] px-8 py-5 text-center text-lg font-black tracking-wider text-[#f5f5f9] uppercase shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#5252e6] hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]"
            >
              START YOUR TEAM
            </Link>
            <div className="border-2 border-[#272357] bg-[#f5f5f9] px-8 py-5 shadow-[8px_8px_0px_0px_var(--shadow-color)]">
              <span className="block text-3xl leading-none font-black">$5/mo</span>
              <span className="mt-1 block text-xs font-bold tracking-wider text-[#6b6b8a] uppercase">
                Unlimited seats. Seriously.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="border-b-2 border-[#272357] bg-[#e9e9f2] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            AGENCY LIFE
            <br />
            IS HARD ENOUGH.
          </h2>
          <p className="mb-16 max-w-2xl text-xl font-medium text-[#6b6b8a]">
            Your video review tool shouldn't make it harder. Here are the problems we actually
            solve.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {painPoints.map((point) => (
              <div
                key={point.id}
                className="flex flex-col border-2 border-[#272357] bg-[#f5f5f9] shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]"
              >
                <div className="flex items-center gap-4 border-b-2 border-[#272357] bg-[#272357] px-6 py-4 text-[#f5f5f9]">
                  <span className="text-sm font-black text-[#8c8cf0]">/{point.id}</span>
                </div>
                <div className="flex-grow p-6 md:p-8">
                  <h3 className="mb-4 text-xl leading-tight font-black tracking-tight uppercase md:text-2xl">
                    {point.title}
                  </h3>
                  <p className="text-base leading-relaxed font-medium text-[#272357]">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="border-b-2 border-[#272357] bg-[#f5f5f9] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-16 lg:flex-row">
            <div className="lg:w-1/3">
              <h2 className="mb-6 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
                DO THE
                <br />
                MATH.
              </h2>
              <p className="max-w-sm text-xl font-medium text-[#6b6b8a]">
                Frame.io charges $19/user/month. lawn charges $5/month total. Here's what that looks
                like at agency scale.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:w-2/3">
              {comparisons.map((row) => (
                <div
                  key={row.size}
                  className="border-2 border-[#272357] shadow-[8px_8px_0px_0px_var(--shadow-color)] transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Team size label */}
                    <div className="flex flex-col justify-center border-b-2 border-[#272357] bg-[#272357] p-6 text-[#f5f5f9] md:w-1/3 md:border-r-2 md:border-b-0 md:p-8">
                      <span className="mb-1 text-xs font-bold tracking-widest text-[#8c8cf0]">
                        TEAM SIZE
                      </span>
                      <span className="text-2xl leading-none font-black tracking-tight uppercase md:text-3xl">
                        {row.size}
                      </span>
                    </div>

                    {/* Comparison numbers */}
                    <div className="flex flex-grow flex-col sm:flex-row">
                      <div className="flex-1 border-b-2 border-[#272357] bg-[#ffffff] p-6 sm:border-r-2 sm:border-b-0 md:p-8">
                        <span className="mb-1 block text-xs font-bold tracking-widest text-[#6b6b8a]">
                          FRAME.IO
                        </span>
                        <span className="text-3xl font-black text-[#e50000]">{row.competitor}</span>
                        <span className="text-sm font-bold text-[#6b6b8a]">/mo</span>
                      </div>
                      <div className="flex-1 border-b-2 border-[#272357] bg-[#f5f5f9] p-6 sm:border-r-2 sm:border-b-0 md:p-8">
                        <span className="mb-1 block text-xs font-bold tracking-widest text-[#6b6b8a]">
                          LAWN
                        </span>
                        <span className="text-3xl font-black text-[#5252e6]">{row.lawn}</span>
                        <span className="text-sm font-bold text-[#6b6b8a]">/mo</span>
                      </div>
                      <div className="flex-1 bg-[#f5f5f9] p-6 md:p-8">
                        <span className="mb-1 block text-xs font-bold tracking-widest text-[#6b6b8a]">
                          YOU SAVE / YEAR
                        </span>
                        <span className="text-3xl font-black text-[#5252e6]">{row.saved}</span>
                        <p className="mt-2 text-sm font-bold text-[#6b6b8a]">{row.commentary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-2 border-[#272357] bg-[#272357] p-6 text-[#f5f5f9] md:p-8">
                <p className="text-lg font-bold">
                  <span className="text-[#8c8cf0]">The pattern:</span> They charge more as you grow.
                  We don't. Your 50th seat costs the same as your first — $0 extra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b-2 border-[#272357] bg-[#5252e6] px-6 py-32 text-[#f5f5f9]">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-8 text-6xl leading-[0.85] font-black tracking-tighter uppercase md:text-8xl lg:text-9xl">
            START YOUR
            <br />
            TEAM.
          </h2>
          <p className="mb-4 max-w-lg text-xl font-medium md:text-2xl">
            $5/month. Unlimited seats. Unlimited projects. No per-user pricing. Ever.
          </p>
          <p className="mb-12 text-lg font-medium text-[#f5f5f9]/60">
            Set up takes about 2 minutes. Your first freelancer will thank you.
          </p>
          <Link
            to="/sign-up"
            className="border-2 border-[#f5f5f9] bg-[#f5f5f9] px-12 py-6 text-2xl font-black tracking-wider text-[#272357] uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#f5f5f9] hover:bg-[#272357] hover:text-[#f5f5f9] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
          >
            START YOUR TEAM
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
